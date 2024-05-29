import React, {useState} from "react";
import {Navigator} from "../helpers/Navigator";
import {APIService} from "../helpers/APIService";
import TokenHelper from "../helpers/TokenHelper";
import NavBar from "../components/NavBar";
import styles from "../styles/sign-up.module.css";
import TextField from "@mui/material/TextField";
import {textfieldStyle} from "../styles/textFieldStyles";
import PrimaryButton from "../components/buttons/primaryButton";
import SecondaryButton from "../components/buttons/secondaryButton";

function SignIn(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const  {openHome, openToilets} = Navigator();
    const  {signIn} = APIService();

    const handleSubmit = async(event) => {
        event.preventDefault();

        setEmailError(!email);
        setPassword(!password);

        let valid = true;
        if(!email || !password){
            valid = false;
        }

        if(valid){
            let user = {
                email: email,
                password:password
            }

            let res = await  signIn(user);
            let status = res.status;
            if(status !== 200){
                alert("An error occured");
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
            <NavBar title="Sign in" />
            <form onSubmit={handleSubmit} id={styles.sign_up_form}>

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

                <PrimaryButton
                    title="Log in"
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

export default SignIn;