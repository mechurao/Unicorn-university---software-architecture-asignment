import Map from "../components/Map";
import NavBar from "../components/NavBar";


function Toilets() {

    const  userLocation = {
        lat: 7.2905715, // default latitude
        lng: 80.6337262, // default longitude
    };

    return <>

        <NavBar/>
        <Map location = {userLocation} />
    </>
}

export default Toilets

//< div > Map < /div>