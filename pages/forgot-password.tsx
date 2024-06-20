import React, { useContext, useState } from "react";
import { Grid, useMediaQuery, Typography, Paper, Avatar, CircularProgress } from "@mui/material";
import { useRouter } from 'next/router';
import { ButtonSend } from "../components/Material/ButtonSend";
import { InputText } from "../components/Material/InputTex";
import { useMutation, useQueryClient } from "react-query";
import { SolicitarContraseñaRequest } from "../service/session";
import { handleSolicitarPassword } from "../utils/utilsUser";
import { CiLock as Lock } from "react-icons/ci";
import Context from "../context/contextPrincipal";

const ForgotPassword = () => {
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });
    const [light] = useContext(Context);
    const [email, setEmail] = useState("");
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false)
    const { mutate: solicitarContraseña } = useMutation(SolicitarContraseñaRequest);
    const queryClient = useQueryClient();

    const navigateToLogin = () => {
        router.push("/login");
    };

    return (
        <Grid container direction="column" alignItems="center" justifyContent="center" height="100vh" gap={2} style={{ padding: mobile ? "0 20px" : "0 50px" }}>
            <Paper elevation={3} sx={{ padding: mobile ? "20px" : "40px", display: "flex", flexDirection: "column", alignItems: "center", background: light ? 'var(--gris)' : 'var(--dark2)' }}>
                <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
                    <Lock />
                </Avatar>
                <Typography variant="h5" component="h1" gutterBottom sx={{ color: light ? "var(--dark2)" : "var(--cero)" }}>
                    Olvidé mi contraseña
                </Typography>
                <Grid item sx={{ width: '100%' }}>
                    <InputText disable={false} label="Email" placeholder="Email" setValue={setEmail} value={email} />
                </Grid>
                <Grid item mt={2}>
                    <ButtonSend disable={false} icon="" iconColor="" iconSize={20} title="Restablecer contraseña" handle={() => { handleSolicitarPassword(setIsLoading, solicitarContraseña, email, queryClient, router) }} />
                </Grid>
                <Grid item mt={2}>
                    <Typography variant="body2" sx={{ color: light ? "var(--dark3)" : "var(--gris2)", cursor: 'pointer', textDecoration: 'underline' }} onClick={navigateToLogin}>
                        Volver a iniciar sesión
                    </Typography>
                </Grid>
            </Paper>
            {isLoading && (
                <Grid sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: !mobile ? '160vh' : '130vh', backgroundColor: 'rgba(2, 2, 2, 0.488)', zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <CircularProgress style={{ color: light ? 'var(--dark2)' : 'var(--cero)' }} />
                </Grid>
            )}
        </Grid>
    );
};

export default ForgotPassword;