import React, { useState, useEffect, useRef } from 'react';
import { GoogleMap, useLoadScript, MarkerF, InfoWindow, Circle, DirectionsRenderer, DirectionsService } from '@react-google-maps/api';
import { Rating, Dialog, DialogTitle, DialogContent, IconButton, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const libraries = ['places'];
const mapContainerStyle = {
    width: '100vw',
    height: '80vh',
};

// Barvy markerů podle typu toalety
const toiletMarkerColors = {
    0: 'red',    // Typ 0 - zdarma
    1: 'orange', // Typ 1 - s kódem
    2: 'green',  // Typ 2 - placená
};

// Funkce pro vytvoření ikony markeru
function createToiletIcon(color) {
    return {
        path: 'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z',
        fillColor: color,
        fillOpacity: 0.8,
        scale: 1.5,
        strokeColor: 'white',
        strokeWeight: 2
    };
}

function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

function Map({ location, toilets }) {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: 'AIzaSyBP8NPW4lmtUS2JM47Qs_ViycFVkzQyaCY',
        libraries,
    });

    const [selected, setSelected] = useState(null);
    const [nearestToilet, setNearestToilet] = useState(null);
    const [directions, setDirections] = useState(null);
    const [navigating, setNavigating] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [distance, setDistance] = useState(0);
    const [filteredToilets, setFilteredToilets] = useState(toilets);
    const mapRef = useRef(null);

    useEffect(() => {
        setFilteredToilets(toilets);
    }, [toilets]);

    if (loadError) {
        return <div>Error loading maps</div>;
    }

    if (!isLoaded) {
        return <div>Loading maps</div>;
    }

    const handleFindNearest = () => {
        let minDistance = Infinity;
        let closestToilet = null;

        toilets.forEach((toilet) => {
            const distance = calculateDistance(
                location.lat,
                location.lng,
                toilet.latitude,
                toilet.longitude
            );

            if (distance < minDistance) {
                minDistance = distance;
                closestToilet = toilet;
            }
        });

        setNearestToilet(closestToilet);
        setDistance(minDistance);
        setNavigating(true);
        setDialogOpen(true);


        const directionsService = new window.google.maps.DirectionsService();
        directionsService.route(
            {
                origin: { lat: location.lat, lng: location.lng },
                destination: { lat: closestToilet.latitude, lng: closestToilet.longitude },
                travelMode: window.google.maps.TravelMode.WALKING,
            },
            (result, status) => {
                if (status === window.google.maps.DirectionsStatus.OK) {
                    setDirections(result);
                } else {
                    console.error(`Error fetching directions ${result}`);
                }
            }
        );


        setFilteredToilets([closestToilet]);

        if (mapRef.current) {
            mapRef.current.panTo({ lat: closestToilet.latitude, lng: closestToilet.longitude });
            mapRef.current.setZoom(15);
        }
    };

    const handleCloseDialog = () => {
        setNavigating(false);
        setDialogOpen(false);
        setDirections(null);
        setFilteredToilets(toilets);

        if (mapRef.current) {
            mapRef.current.panTo(location);
            mapRef.current.setZoom(12);
        }
    };


    const renderExtraInfo = (toilet) => {
        if(toilet.type === 0){return  null;}
        if (toilet.type === 2) {
            return (
                <p>
                    <strong>{toilet.extra_info}</strong>
                </p>
            );
        } else if (toilet.type === 1) {
            return (
                <p>
                    <strong>Code: </strong>
                    {toilet.extra_info}
                </p>
            );
        }
        return null;
    };

    return (
        <div>
            <Dialog open={dialogOpen} onClose={handleCloseDialog}>
                <DialogTitle>
                    Navigating to: {nearestToilet?.name}
                    <IconButton
                        aria-label="close"
                        onClick={handleCloseDialog}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <p>Distance: {distance.toFixed(2)} km</p>
                </DialogContent>
            </Dialog>

            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={12}
                center={location}
                ref={mapRef}
            >
                {}
                <Circle
                    center={location}
                    radius={100}
                    options={{
                        fillColor: 'blue',
                        fillOpacity: 0.3,
                        strokeColor: 'blue',
                        strokeOpacity: 0.5,
                        strokeWeight: 1
                    }}
                />

                {}
                {navigating && directions && (
                    <DirectionsRenderer
                        directions={directions}
                    />
                )}

                {/* Markery pro jednotlivé toalety */}
                {filteredToilets.map((toilet) => (
                    <MarkerF
                        key={toilet.tID}
                        position={{ lat: toilet.latitude, lng: toilet.longitude }}
                        icon={createToiletIcon(toiletMarkerColors[toilet.type] || 'black')}
                        onClick={() => setSelected(toilet)}
                    />
                ))}

                {}
                {selected && (
                    <InfoWindow
                        position={{ lat: selected.latitude, lng: selected.longitude }}
                        onCloseClick={() => setSelected(null)}
                    >
                        <div>
                            <h2>{selected.name}</h2>
                            <p>Popis: {selected.description}</p>
                            {renderExtraInfo(selected)}
                            <Rating name="read-only" value={3.6} precision={0.1} readOnly />
                        </div>
                    </InfoWindow>
                )}
            </GoogleMap>

            {/* Tlačítko pro nalezení nejbližší toalety */}
            <Button
                variant="contained"
                color="primary"
                onClick={handleFindNearest}
                style={{ marginTop: '20px' }}
            >
                Find nearest
            </Button>
        </div>
    );
}

export default Map;
