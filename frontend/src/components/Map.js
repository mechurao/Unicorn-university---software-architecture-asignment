import React, { useState } from 'react';
import { GoogleMap, useLoadScript, MarkerF, InfoWindow, Circle } from '@react-google-maps/api';
import {Rating} from "@mui/material";

const libraries = ['places'];
const mapContainerStyle = {
    width: '100vw',
    height: '80vh',
};


const toiletMarkerColors = {
    0: 'red',    // free
    1: 'orange', // code
    2: 'green',  // paid
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

function Map({ location, toilets }) {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: 'AIzaSyBP8NPW4lmtUS2JM47Qs_ViycFVkzQyaCY',
        libraries,
    });

    console.log(JSON.stringify(toilets));

    const [selected, setSelected] = useState(null);

    if (loadError) {
        return <div>Error loading maps</div>;
    }

    if (!isLoaded) {
        return <div>Loading maps</div>;
    }

    // Zobrazení extra informací na základě typu toalety
    const renderExtraInfo = (toilet) => {
        if (toilet.type === 0) {
            // Typ 0: Zdarma
            return null;
        } else if (toilet.type === 2) {
            // Typ 2: Placená
            return (
                <p>
                    <strong>{toilet.extra_info}</strong>
                </p>
            );
        } else if (toilet.type === 1) {
            // Typ 1: S kódem
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
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={12}
                center={location}
            >
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
                {toilets.map((toilet) => (
                    <MarkerF
                        key={toilet.tID}
                        position={{ lat: toilet.latitude, lng: toilet.longitude }}
                        icon={createToiletIcon(toiletMarkerColors[toilet.type] || 'black')}
                        onClick={() => setSelected(toilet)}
                    />
                ))}

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
        </div>
    );
}

export default Map;
