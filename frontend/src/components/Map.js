import React, { useState } from 'react';
import { GoogleMap, useLoadScript, MarkerF, InfoWindow } from '@react-google-maps/api';
import styles from '../styles/map.module.css';

const libraries = ['places'];
const mapContainerStyle = {
    width: '100vw',
    height: '80vh',
};

function Map({ location }) {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: 'AIzaSyBP8NPW4lmtUS2JM47Qs_ViycFVkzQyaCY',
        libraries,
    });

    const [selected, setSelected] = useState(null);

    if (loadError) {
        return <div>Error loading maps</div>;
    }

    if (!isLoaded) {
        return <div>Loading maps</div>;
    }

    return (
        <div>
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={10}
                center={location}
            >
                <MarkerF
                    position={location}
                    onClick={() => setSelected(location)} // Set selected marker to show InfoWindow
                />

                {selected && (
                    <InfoWindow
                        position={selected}
                        onCloseClick={() => setSelected(null)} // Close InfoWindow
                    >
                        <div>
                            <h2>Marker Position</h2>
                            <p>Latitude: {selected.lat}</p>
                            <p>Longitude: {selected.lng}</p>
                        </div>
                    </InfoWindow>
                )}
            </GoogleMap>
        </div>
    );
}

export default Map;
