import React from "react";
import { Avatar, Grid, Paper } from "@mui/material";
import { MdOutlineLockReset } from "react-icons/md";
import { InputFields } from "../Material/InputFields";
import { InputPassword } from "../Material/InputPassword";
import { ButtomPrimario } from "../Material/ButtonSend";
import { MdSettingsBackupRestore as Restore } from "react-icons/md";
import { FormResetProps } from "../../interfaces/general";

export const FormReset: React.FC<FormResetProps> = ({
    mobile,
    light,
    email,
    password,
    repeated_password,
    cargando,
    errorEmail,
    textErrorEmail,
    PasswordError,
    PasswordErrorText,
    Repeated_passwordError,
    Repeated_passwordErrorText,
    setEmail,
    setPassword,
    setRepeated_password,
    handleResetPassword,
    handleAtrasClick,
    handleEmail,
    handlePassword,
    handleRepeatedPassword,
}) => {
    return (
        <Paper elevation={3} sx={{ padding: mobile ? "20px" : "40px", display: "flex", flexDirection: "column", alignItems: "center", background: light ? 'var(--gris)' : 'var(--dark2)' }}>
            <Grid item container>
                <Grid item md={6} container alignItems={'center'} justifyContent={'center'}>
                    <img style={{ height: mobile ? '150px' : '' }} src={`/images/${light ? 'logoLight.png' : 'logoDark1.png'}`} alt="logo" />
                </Grid>
                <Grid item md={6} gap={2} container alignItems={'center'} justifyContent={'center'} flexDirection={'column'} sx={{ padding: '20px' }}>
                    <Avatar sx={{ m: 1, bgcolor: !light ? "#aab4be" : 'var(--dark2)' }}>
                        <MdOutlineLockReset color={light ? '#aab4be' : 'var(--dark2)'} />
                    </Avatar>
                    <Grid item sx={{ color: light ? "var(--dark2)" : "var(--cero)", letterSpacing: '2px', fontSize: '20px', fontWeight: '500' }}>
                        Restablecer contraseña
                    </Grid>
                    <Grid item sx={{ width: '100%' }}>
                        <InputFields
                            title="Email"
                            placeholder="example@example.com"
                            type="email"
                            descripcion="Escribir un email"
                            value={email}
                            setValue={setEmail}
                            error={errorEmail}
                            textError={textErrorEmail}
                            handleActive
                            handleChange={handleEmail}
                        />
                    </Grid>
                    <Grid item sx={{ width: '100%' }}>
                        <InputPassword
                            title="Nueva Contraseña"
                            descripcion="Escribir una nueva contraseña"
                            placeholder="contraseña"
                            value={password}
                            setValue={setPassword}
                            error={PasswordError}
                            textError={PasswordErrorText}
                            handleActive
                            handleChange={handlePassword}
                        />
                    </Grid>
                    <Grid item sx={{ width: '100%' }}>
                        <InputPassword
                            title="Repetir Contraseña"
                            descripcion="Escribir y repita la contraseña"
                            placeholder="contraseña"
                            value={repeated_password}
                            setValue={setRepeated_password}
                            error={Repeated_passwordError}
                            textError={Repeated_passwordErrorText}
                            handleActive
                            handleChange={handleRepeatedPassword}
                        />
                    </Grid>
                    <Grid item container mt={2}>
                        <ButtomPrimario
                            title="Restablecer contraseña"
                            handleclick={handleResetPassword}
                            icon={Restore}
                            isLoading={cargando}
                        />
                    </Grid>
                    <Grid item mt={2}>
                        <Grid item sx={{ color: light ? "#444748" : 'var(--gris)', fontSize: '14px', fontWeight: '500', cursor: 'pointer', textDecoration: 'underline' }} onClick={handleAtrasClick}>
                            Volver atrás
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    )
}