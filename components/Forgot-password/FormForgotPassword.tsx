import React from "react";
import { Avatar, Grid, Paper } from "@mui/material";
import { PiPasswordLight } from "react-icons/pi";
import { InputFields } from "../Material/InputFields";
import { ButtomPrimario } from "../Material/ButtonSend";
import { MdSettingsBackupRestore as Restore } from "react-icons/md";
import { FormForgotPasswordProps } from "../../interfaces/general";

export const FormForgotPassword: React.FC<FormForgotPasswordProps> = ({
    mobile,
    light,
    email,
    error,
    textError,
    cargando,
    setEmail,
    handleSolicitarPassword,
    navigateToLogin,
    handleChange,
}) => {
    return (
        <Paper elevation={3} sx={{ padding: mobile ? "20px" : "40px", display: "flex", flexDirection: "column", alignItems: "center", background: light ? 'var(--gris)' : 'var(--dark2)' }}>
            <Grid item container>
                <Grid item md={6} container alignItems={'center'} justifyContent={'center'}>
                    <img style={{ height: mobile ? '150px' : '' }} src={`/images/${light ? 'logoLight.png' : 'logoDark1.png'}`} alt="logo" />
                </Grid>
                <Grid item md={6} gap={2} container alignItems={'center'} justifyContent={'center'} flexDirection={'column'} sx={{ padding: '20px' }}>
                    <Avatar sx={{ m: 1, bgcolor: !light ? "#aab4be" : 'var(--dark2)' }}>
                        <PiPasswordLight color={light ? '#aab4be' : 'var(--dark2)'} />
                    </Avatar>
                    <Grid item sx={{ color: light ? "var(--dark2)" : "var(--cero)", letterSpacing: '2px', fontSize: '20px', fontWeight: '500' }}>
                        Olvidé mi contraseña
                    </Grid>
                    <Grid item sx={{ width: '100%' }}>
                        <InputFields
                            title="Email"
                            placeholder="example@example.com"
                            type="email"
                            descripcion="Escribir un email"
                            value={email}
                            setValue={setEmail}
                            error={error}
                            textError={textError}
                            handleActive
                            handleChange={handleChange}
                        />
                    </Grid>
                    <Grid item container mt={2}>
                        <ButtomPrimario
                            title="Restablecer contraseña"
                            handleclick={handleSolicitarPassword}
                            icon={Restore}
                            isLoading={cargando}
                        />
                    </Grid>
                    <Grid item mt={2}>
                        <Grid item sx={{ color: light ? "#444748" : 'var(--gris)', fontSize: '14px', fontWeight: '500', cursor: 'pointer', textDecoration: 'underline' }} onClick={navigateToLogin}>
                            Volver a iniciar sesión
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    )
}