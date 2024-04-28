
import * as React from 'react';
import NavBar from "../components/NavBar";
import PrimaryButton from "../components/buttons/primaryButton";
import SecondaryButton from "../components/buttons/secondaryButton";
function Home(){
    return <>
        <NavBar title="test"></NavBar>
        <PrimaryButton title="Sign in" callback={signIn}></PrimaryButton>
        <br/>
        <SecondaryButton title="Sign up" callback={signUp}></SecondaryButton>
    </>
}

function signIn() {
    console.log("Sign in");
}

function signUp(){
    console.log("Sign up");
}

export default Home;