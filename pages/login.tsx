import React, { useContext, useState } from "react";
import { Grid, useMediaQuery } from "@mui/material";
import { useRouter } from 'next/router';
import { FormLogin } from "../components/Login/FormLogin";
import ContextRefac from "../context/contextLogin";
import Context from "../context/contextPrincipal";
import Head from "next/head";

const Login = () => {
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });
    const [light] = useContext(Context);
    const [emailOrUsername, setEmailOrUsername] = useState("");
    const [password, setPassword] = useState("");
    const { state: { user }, SignIn }: any = useContext(ContextRefac);
    const router = useRouter();

    const handleLogin = async () => {
        await SignIn({ email: emailOrUsername, password });
    };

    const navigateToForgotPassword = () => {
        router.push("/forgot-password");
    };

    const navigateToRegister = () => {
        router.push("/register");
    };

    return (
        <>
            <Head>
                <title>Ligamaster | Login</title>
            </Head>
            <Grid item container sx={{ padding: mobile ? "100px 20px 60px 20px" : "80px 120px 60px 120px", height: mobile ? '100%' : '110vh' }}>
                <Grid item xs={12}>
                    <FormLogin
                        mobile={mobile}
                        light={light}
                        password={password}
                        emailOrUsername={emailOrUsername}
                        setPassword={setPassword}
                        setEmailOrUsername={setEmailOrUsername}
                        handleLogin={handleLogin}
                        navigateToForgotPassword={navigateToForgotPassword}
                        navigateToRegister={navigateToRegister}
                    />
                </Grid>
            </Grid>
        </>
    );
};

export default Login;