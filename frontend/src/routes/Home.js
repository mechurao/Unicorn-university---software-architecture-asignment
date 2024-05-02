
import * as React from 'react';
import NavBar from "../components/NavBar";
import PrimaryButton from "../components/buttons/primaryButton";
import SecondaryButton from "../components/buttons/secondaryButton";
import styles from "../styles/home.module.css";
import {Navigator} from "../helpers/Navigator";

function Home(){
    const { openSignIn, openSignUp } = Navigator();

    return <>
        <NavBar title="test"></NavBar>
        <div id={styles.auth_wrapper}>
            <PrimaryButton title="Sign in" callback={openSignIn} />
            <br/>
            <SecondaryButton title="Sign up" callback={openSignUp} />
        </div>

    </>
}



export default Home;