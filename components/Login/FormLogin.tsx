import React from "react";
import { Avatar, Grid, Paper } from "@mui/material";
import { CiLock as Lock } from "react-icons/ci";
import { CiLogin } from "react-icons/ci";
import { InputFields } from "../Material/InputFields";
import { InputPassword } from "../Material/InputPassword";
import { ButtomPrimario } from "../Material/ButtonSend";

interface FormLoginProps {
    mobile: boolean;
    light: boolean;
    emailOrUsername: string;
    setEmailOrUsername: React.Dispatch<React.SetStateAction<any>>;
    password: any;
    setPassword: React.Dispatch<React.SetStateAction<any>>;
    handleLogin: () => void;
    navigateToForgotPassword: () => void;
    navigateToRegister: () => void;
}

export const FormLogin: React.FC<FormLoginProps> = ({ mobile, light, emailOrUsername, setEmailOrUsername, password, setPassword, handleLogin, navigateToForgotPassword, navigateToRegister }) => {
    return (
        <Paper elevation={3} sx={{ padding: mobile ? "20px" : "40px", display: "flex", flexDirection: "column", alignItems: "center", background: light ? 'var(--gris)' : 'var(--dark2)' }}>
            <Grid item container>
                <Grid item md={6} container alignItems={'center'} justifyContent={'center'}>
                    <img style={{ height: mobile ? '150px' : '' }} src={`/images/${light ? 'logoLight.png' : 'logoDark1.png'}`} alt="logo" />
                </Grid>
                <Grid item md={6} gap={2} container alignItems={'center'} justifyContent={'center'} flexDirection={'column'} sx={{ padding: '20px' }}>
                    <Avatar sx={{ m: 1, bgcolor: !light ? "#aab4be" : 'var(--dark2)' }}>
                        <Lock color={light ? '#aab4be' : 'var(--dark2)'} />
                    </Avatar>
                    <Grid item sx={{ color: light ? "var(--dark2)" : "var(--cero)", letterSpacing: '2px', fontSize: '20px', fontWeight: '500' }}>
                        Iniciar sesión
                    </Grid>
                    <Grid item sx={{ width: '100%' }}>
                        <InputFields
                            title="Usuario"
                            placeholder="example@example.com"
                            type="text"
                            descripcion="Escribir un email"
                            value={emailOrUsername}
                            setValue={setEmailOrUsername}
                        />
                    </Grid>
                    <Grid item mt={2} sx={{ width: '100%' }}>
                        <InputPassword
                            title="Contraseña"
                            placeholder="Contraseña"
                            descripcion="Escribir contraseña"
                            value={password}
                            setValue={setPassword}
                        />
                    </Grid>
                    <Grid item container mt={2}>
                        <ButtomPrimario
                            title="Iniciar sesión"
                            handleclick={handleLogin}
                            icon={CiLogin}
                        />
                    </Grid>
                    <Grid item mt={2}>
                        <Grid item sx={{ color: light ? "#444748" : 'var(--gris)', fontSize: '14px', fontWeight: '500', cursor: 'pointer', textDecoration: 'underline' }} onClick={navigateToForgotPassword}>
                            ¿Olvidaste tu contraseña?
                        </Grid>
                    </Grid>
                    <Grid item mt={2}>
                        <Grid item sx={{ color: light ? "#444748" : 'var(--gris)', fontSize: '14px', fontWeight: '500', cursor: 'pointer', textDecoration: 'underline' }} onClick={navigateToRegister}>
                            ¿No tienes una cuenta? Regístrate aquí
                        </Grid >
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    )
}