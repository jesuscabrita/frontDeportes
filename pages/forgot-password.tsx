import React, { useContext, useState } from "react";
import { Grid, useMediaQuery } from "@mui/material";
import { useRouter } from 'next/router';
import { useMutation, useQueryClient } from "react-query";
import { SolicitarContraseñaRequest } from "../service/session";
import { handleSolicitarPassword } from "../utils/utilsUser";
import { FormForgotPassword } from "../components/Forgot-password/FormForgotPassword";
import { LoadingScreen } from "../components/Shared/LoadingScreen";
import Context from "../context/contextPrincipal";
import Head from "next/head";

const ForgotPassword = () => {
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });
    const [light] = useContext(Context);
    const [email, setEmail] = useState("");
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false)
    const { mutate: solicitarContraseña, isLoading: cargando } = useMutation(SolicitarContraseñaRequest);
    const queryClient = useQueryClient();
    const [emailError, setEmailError] = useState(false);
    const [emailErrorText, setEmailErrorText] = useState('');

    const handlePassword = (event: any) => {
        setEmailError(false)
        setEmailErrorText('')
        setEmail(event.target.value)
    }

    const navigateToLogin = () => {
        router.push("/login");
    };

    return (
        <>
            <Head>
                <title>Ligamaster | Olvidé mi contraseña</title>
            </Head>
            <Grid item container sx={{ padding: mobile ? "100px 20px 60px 20px" : "80px 200px 60px 200px", height: mobile ? '100vh' : '110vh' }}>
                <Grid item xs={12}>
                    <FormForgotPassword
                        light={light}
                        mobile={mobile}
                        email={email}
                        setEmail={setEmail}
                        handleSolicitarPassword={() => { handleSolicitarPassword(setIsLoading, solicitarContraseña, email, queryClient, router, setEmailError, setEmailErrorText) }}
                        navigateToLogin={navigateToLogin}
                        error={emailError}
                        textError={emailErrorText}
                        handleChange={handlePassword}
                        cargando={cargando}
                    />
                </Grid>
            </Grid>
            {isLoading && <LoadingScreen />}
        </>
    );
};

export default ForgotPassword;