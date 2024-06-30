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
    const [loading, setLoading] = useState(false);
    const { state: { user }, SignIn }: any = useContext(ContextRefac);
    const router = useRouter();

    const handleLogin = async () => {
        setLoading(true)
        setTimeout(async () => {
            setLoading(false)
            await SignIn({ email: emailOrUsername, password });
        }, 2000);
    };

    const navigateToForgotPassword = () => {
        router.push("/forgot-password");
    };

    const navigateToRegister = () => {
        router.push("/register");
    };

    if (user) {
        router.push('/')
        return null;
    }

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
                        loading={loading}
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