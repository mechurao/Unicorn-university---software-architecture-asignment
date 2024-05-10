import React, { useState, useEffect } from 'react';
import Map from "../components/Map";
import NavBar from "../components/NavBar";
import PrimaryButton from "../components/buttons/primaryButton";
import AddToiletForm from "../components/AddToiletForm";

function Toilets() {
    const defaultLocation = {
        lat: 7.2905715, // default latitude
        lng: 80.6337262, // default longitude
    };

    function addToiletForm() {
        setShowAddToiletForm(true);
    }

    function handleFormClose() {
        setShowAddToiletForm(false);
    }



    const [userLocation, setUserLocation] = useState(defaultLocation);
    const [showAddToiletForm, setShowAddToiletForm] = useState(false);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setUserLocation({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    });
                },
                () => {
                    // Pokud uživatel přístup zamítne nebo dojde k chybě, zůstane výchozí poloha
                    setUserLocation(defaultLocation);
                }
            );
        } else {
            setUserLocation(defaultLocation);
        }
    }, []);

    return (
        <>
            <NavBar title="Toilets" />
            <Map location={userLocation} />
            <PrimaryButton title="Add" callback={addToiletForm} />
            {showAddToiletForm && <AddToiletForm onClose={handleFormClose} />}
        </>
    );
}

export default Toilets;
