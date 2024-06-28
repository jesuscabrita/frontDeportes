import React from "react";
import { Avatar, Grid, Paper } from "@mui/material";
import { PiTrademarkRegistered } from "react-icons/pi";
import { dataCategoria } from "../../utils/arrays";
import { RegisterUserProps } from "../../interfaces/general";
import { InputFields } from "../Material/InputFields";
import { InputDate } from "../Material/InputFecha";
import { ButtomPrimario } from "../Material/ButtonSend";
import { InputSelects } from "../Material/InputSelect";

export const RegisterUser: React.FC<RegisterUserProps> = ({
    mobile,
    light,
    nombre,
    apellido,
    email,
    fecha_de_nacimiento,
    password,
    repeated_password,
    equipo,
    cargando,
    categoria,
    setNombre,
    setApellido,
    setEmail,
    setFecha_de_nacimiento,
    setPassword,
    setRepeated_password,
    setEquipo,
    handleRegistrar,
    navigateToLogin,
    handleSelect,
}) => {
    return (
        <Paper elevation={3} sx={{ padding: mobile ? "20px" : "40px", display: "flex", flexDirection: "column", alignItems: "center", background: light ? 'var(--gris)' : 'var(--dark2)' }}>
            <Grid item container>
                <Grid item md={6} container alignItems={'center'} justifyContent={'center'}>
                    <img style={{ height: mobile ? '150px' : '' }} src={`/images/${light ? 'logoLight.png' : 'logoDark1.png'}`} alt="logo" />
                </Grid>
                <Grid item md={6} gap={2} container alignItems={'center'} justifyContent={'center'} flexDirection={'column'} sx={{ padding: '20px' }}>
                    <Avatar sx={{ m: 1, bgcolor: !light ? "#aab4be" : 'var(--dark2)' }}>
                        <PiTrademarkRegistered color={light ? '#aab4be' : 'var(--dark2)'} />
                    </Avatar>
                    <Grid item sx={{ color: light ? "var(--dark2)" : "var(--cero)", letterSpacing: '2px', fontSize: '20px', fontWeight: '500' }}>
                        Registro
                    </Grid>
                    <Grid item sx={{ width: '100%' }}>
                        <InputFields
                            title="Nombre"
                            placeholder="Nombre"
                            type="text"
                            descripcion="Escribir un nombre"
                            value={nombre}
                            setValue={setNombre}
                        />
                    </Grid>
                    <Grid item sx={{ width: '100%' }}>
                        <InputFields
                            title="Apellido"
                            placeholder="Apellido"
                            type="text"
                            descripcion="Escribir un apellido"
                            value={apellido}
                            setValue={setApellido}
                        />
                    </Grid>
                    <Grid item sx={{ width: '100%' }}>
                        <InputFields
                            title="Email"
                            placeholder="example@example.com"
                            type="email"
                            descripcion="Escribir un email"
                            value={email}
                            setValue={setEmail}
                        />
                    </Grid>
                    <Grid item sx={{ width: '100%' }}>
                        <InputDate
                            title="Fecha de nacimiento"
                            value={fecha_de_nacimiento}
                            setValue={setFecha_de_nacimiento}
                            descripcion="Seleccionar una fecha"
                        />
                    </Grid>
                    <Grid item sx={{ width: '100%' }}>
                        <InputFields
                            title="Contraseña"
                            placeholder="Contraseña"
                            type="text"
                            descripcion="Escribir una contraseña"
                            value={password}
                            setValue={setPassword}
                        />
                    </Grid>
                    <Grid item sx={{ width: '100%' }}>
                        <InputFields
                            title="Repetir contraseña"
                            placeholder="contraseña"
                            type="text"
                            descripcion="Escribir una contraseña repetida"
                            value={repeated_password}
                            setValue={setRepeated_password}
                        />
                    </Grid>
                    <Grid item sx={{ width: '100%' }}>
                        <InputFields
                            title="Nombre de tu equipo"
                            placeholder="Equipo"
                            type="text"
                            descripcion="Escribir un nombre para tu equipo"
                            value={equipo}
                            setValue={setEquipo}
                        />
                    </Grid>
                    <Grid item sx={{ width: '100%' }}>
                        <InputSelects
                            title="Categoria"
                            descripcion="Seleccionar una categoria"
                            value={categoria}
                            handleSelect={handleSelect}
                            data={dataCategoria}
                        />
                    </Grid>
                    <Grid item container mt={2}>
                        <ButtomPrimario
                            title="Registrar"
                            handleclick={handleRegistrar}
                            icon={PiTrademarkRegistered}
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