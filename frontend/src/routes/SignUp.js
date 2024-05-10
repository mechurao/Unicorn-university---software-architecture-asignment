import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import PrimaryButton from "../components/buttons/primaryButton";
import NavBar from "../components/NavBar";
import styles from "../styles/sign-up.module.css"
import {textfieldStyle} from "../styles/textFieldStyles";
import SecondaryButton from "../components/buttons/secondaryButton";
import {Navigator} from "../helpers/Navigator";
import {APIService} from "../helpers/APIService";
import TokenHelper from "../helpers/TokenHelper";

function SignUp() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordAgain, setPasswordAgain] = useState("");

    const [usernameError, setUsernameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [passwordAgainError, setPasswordAgainError] = useState(false);

    const  {openHome, openToilets} = Navigator();

    const handleSubmit = async (event) => {
        event.preventDefault();


        setUsernameError(!username);
        setEmailError(!email);
        setPasswordError(!password);
        setPasswordAgainError(!passwordAgain);

        let valid = true;
        if (!username || !email || !password || !passwordAgain) {
            valid = false;
        }

        if (valid && password !== passwordAgain) {
            setPasswordAgainError(true);
            alert("Passwords must match");
            valid = false;
        }

        if (valid) {
            let user = {
                username: username,
                email: email,
                password: password
            }
            const {signUp} = APIService();
            let res = await signUp(user);
            let status = res.status;
            if(status !== 200){
                alert("Server error");
                return;
            }

            let token = res.data.token;
            TokenHelper.saveToken(token);
            openToilets();


        }
    };

    const handleChange = (setValue, setError) => (event) => {
        setValue(event.target.value);
        setError(false);
    };


    return (
        <>
            <NavBar title="Sign up" />
            <form onSubmit={handleSubmit} id={styles.sign_up_form}>
                <TextField
                    id="username-input"
                    variant="outlined"
                    label="Username"
                    error={usernameError}
                    sx = {textfieldStyle}
                    helperText={usernameError ? "Username is required" : ""}
                    onChange={handleChange(setUsername, setUsernameError)}
                /><br/>
                <TextField
                    id="email-input"
                    variant="outlined"
                    label="E-mail"
                    type="email"
                    error={emailError}
                    sx = {textfieldStyle}
                    helperText={emailError ? "Email is required" : ""}
                    onChange={handleChange(setEmail, setEmailError)}
                /><br/>
                <TextField
                    id="password-input"
                    variant="outlined"
                    label="Password"
                    type="password"
                    error={passwordError}
                    sx = {textfieldStyle}
                    helperText={passwordError ? "Password is required" : ""}
                    onChange={handleChange(setPassword, setPasswordError)}
                /><br/>
                <TextField
                    id="password-again-input"
                    variant="outlined"
                    label="Password again"
                    type="password"
                    error={passwordAgainError}
                    sx = {textfieldStyle}
                    helperText={passwordAgainError ? "Please confirm your password" : ""}
                    onChange={handleChange(setPasswordAgain, setPasswordAgainError)}
                /><br/>
                <PrimaryButton
                    title="Create an account"
                    inputType="submit"
                />
                <SecondaryButton
                    title="Back"
                    callback={openHome}
                />
            </form>
        </>
    );
}

export default SignUp;
