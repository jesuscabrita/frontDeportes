import React, { useContext, useState } from "react";
import { Grid, useMediaQuery } from "@mui/material";
import { useRouter } from 'next/router';
import { useMutation, useQueryClient } from "react-query";
import { CambiarContraseñaRequest } from "../../service/session";
import { handleResetPassword } from "../../utils/utilsUser";
import { FormReset } from "../../components/Reset/FormReset";
import { LoadingScreen } from "../../components/Shared/LoadingScreen";
import Context from "../../context/contextPrincipal";
import Head from "next/head";

const ResetToken = () => {
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });
    const [light] = useContext(Context);
    const router = useRouter();
    const resetToken = router.query.resetToken;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeated_password, setRepeated_password] = useState("");
    const [isLoading, setIsLoading] = useState(false)
    const { mutate: cambiarContraseñas, isLoading: cargando } = useMutation(CambiarContraseñaRequest);
    const queryClient = useQueryClient();
    const [emailError, setEmailError] = useState(false);
    const [emailErrorText, setEmailErrorText] = useState('');
    const [PasswordError, setPasswordError] = useState(false);
    const [PasswordErrorText, setPasswordErrorText] = useState('');
    const [Repeated_passwordError, setRepeated_passwordError] = useState(false);
    const [Repeated_passwordErrorText, setRepeated_passwordErrorText] = useState('');

    const handleAtrasClick = () => {
        router.back();
    };

    const handleEmail = (event: any) => {
        setEmailError(false)
        setEmailErrorText('')
        setEmail(event.target.value)
    }

    const handlePassword = (event: any) => {
        setPasswordError(false)
        setPasswordErrorText('')
        setPassword(event.target.value)
    }

    const handleRepeatedPassword = (event: any) => {
        setRepeated_passwordError(false)
        setRepeated_passwordErrorText('')
        setRepeated_password(event.target.value)
    }

    return (
        <>
            <Head>
                <title>Ligamaster | Cambiar contraseña</title>
            </Head>
            <Grid item container sx={{ padding: mobile ? "100px 20px 60px 20px" : "80px 200px 60px 200px", height: mobile ? '100%' : '110vh' }}>
                <Grid item xs={12}>
                    <FormReset
                        light={light}
                        mobile={mobile}
                        email={email}
                        setEmail={setEmail}
                        password={password}
                        repeated_password={repeated_password}
                        setPassword={setPassword}
                        setRepeated_password={setRepeated_password}
                        cargando={cargando}
                        handleResetPassword={() => { handleResetPassword(setIsLoading, cambiarContraseñas, email, password, repeated_password, queryClient, router, setEmailError, setEmailErrorText, setPasswordError, setPasswordErrorText, setRepeated_passwordError, setRepeated_passwordErrorText) }}
                        handleAtrasClick={handleAtrasClick}
                        errorEmail={emailError}
                        textErrorEmail={emailErrorText}
                        handleEmail={handleEmail}
                        PasswordError={PasswordError}
                        PasswordErrorText={PasswordErrorText}
                        handlePassword={handlePassword}
                        Repeated_passwordError={Repeated_passwordError}
                        Repeated_passwordErrorText={Repeated_passwordErrorText}
                        handleRepeatedPassword={handleRepeatedPassword}
                    />
                </Grid>
            </Grid>
            {isLoading && <LoadingScreen />}
        </>
    );
}

export default ResetToken;