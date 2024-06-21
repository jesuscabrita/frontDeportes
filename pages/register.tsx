import React, { useContext, useState } from "react";
import { Grid, useMediaQuery, Typography, Paper, Avatar, CircularProgress, Icon } from "@mui/material";
import { InputText } from "../components/Material/InputTex";
import { InputFecha } from "../components/Material/InputFecha";
import { ButtonSend } from "../components/Material/ButtonSend";
import { RegisterRequest } from "../service/session";
import { useMutation, useQueryClient } from "react-query";
import { crearUser } from "../utils/utilsUser";
import { FaRegistered as Reg } from 'react-icons/fa';
import { useRouter } from "next/router";
import Context from "../context/contextPrincipal";
import Head from "next/head";
import moment from "moment";
import { RegisterUser } from "../components/Registrar/RegisterUser/RegisterUser";
import { LoadingScreen } from "../components/Shared/LoadingScreen";

const Register = () => {
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });
    const [light] = useContext(Context);
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [fecha_de_nacimiento, setFecha_de_nacimiento] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeated_password, setRepeated_password] = useState('');
    const [equipo, setEquipo] = useState('');
    const [isLoading, setIsLoading] = useState(false)
    const { mutate: crearUsers, isLoading: cargando } = useMutation(RegisterRequest);
    const queryClient = useQueryClient();
    const router = useRouter();

    const navigateToLogin = () => {
        router.push("/login");
    };

    return (
        <>
            <Head>
                <title>Ligamaster | Registro</title>
            </Head>
            <Grid item container sx={{ padding: mobile ? "100px 20px 60px 20px" : "80px 120px 60px 120px", height: mobile ? '100%' : '100%' }}>
                <Grid item xs={12}>
                    <RegisterUser
                        light={light}
                        mobile={mobile}
                        nombre={nombre}
                        setNombre={setNombre}
                        apellido={apellido}
                        email={email}
                        setApellido={setApellido}
                        setEmail={setEmail}
                        fecha_de_nacimiento={fecha_de_nacimiento}
                        setFecha_de_nacimiento={setFecha_de_nacimiento}
                        password={password}
                        repeated_password={repeated_password}
                        setPassword={setPassword}
                        setRepeated_password={setRepeated_password}
                        equipo={equipo}
                        setEquipo={setEquipo}
                        handleRegistrar={() => { crearUser(nombre, apellido, moment(fecha_de_nacimiento).format('YYYY-MM-DD'), email, password, repeated_password, equipo, setIsLoading, crearUsers, queryClient, router) }}
                        navigateToLogin={navigateToLogin}
                        cargando={cargando}
                    />
                </Grid>
            </Grid>
            {isLoading && <LoadingScreen />}
        </>
        // <Grid item pb={5} sx={{ height: '100%', paddingTop: '100px' }}>
        //     <Grid container direction="column" alignItems="center" justifyContent="center" gap={2} style={{ height: '100%', padding: mobile ? "0 20px" : "0 50px" }}>
        //         <Paper
        //             elevation={3}
        //             sx={{ width: mobile ? '100%' : '60%', height: "100%", padding: mobile ? "20px" : "40px", display: "flex", flexDirection: "column", alignItems: "center", background: light ? "var(--gris)" : "var(--dark2)", }}>
        //             <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
        //                 <Icon><Reg /></Icon>
        //             </Avatar>
        //             <Typography variant="h5" component="h1" gutterBottom sx={{ color: light ? "var(--dark2)" : "var(--cero)" }}>
        //                 Registro
        //             </Typography>
        //             <Grid item gap={2} sx={{ width: "100%" }}>
        //                 <InputText disable={false} label="Nombre" placeholder="Nombre" setValue={setNombre} value={nombre} />
        //             </Grid>
        //             <Grid item gap={2} sx={{ width: "100%" }}>
        //                 <InputText disable={false} label="Apellido" placeholder="Apellido" setValue={setApellido} value={apellido} />
        //             </Grid>
        //             <Grid item gap={2} sx={{ width: "100%" }}>
        //                 <InputText disable={false} label="Email" placeholder="Email" setValue={setEmail} value={email} />
        //             </Grid>
        //             <Grid item gap={2} sx={{ width: "100%" }}>
        //                 <InputFecha label="Fecha de nacimiento" value={fecha_de_nacimiento} setValue={setFecha_de_nacimiento} />
        //             </Grid>
        //             <Grid item gap={2} sx={{ width: "100%" }}>
        //                 <InputText disable={false} label="Contraseña" placeholder="Contraseña" setValue={setPassword} value={password} />
        //             </Grid>
        //             <Grid item gap={2} sx={{ width: "100%" }}>
        //                 <InputText disable={false} label="Repetir contraseña" placeholder="Repetir contraseña" setValue={setRepeated_password} value={repeated_password} />
        //             </Grid>
        //             <Grid item gap={2} sx={{ width: "100%" }}>
        //                 <InputText disable={false} label="Nombre de tu equipo" placeholder="Nombre de tu equipo" setValue={setEquipo} value={equipo} />
        //             </Grid>
        //             <Grid item mt={2}>
        //                 <ButtonSend disable={false} icon="" iconColor="" iconSize={20} title="Registrar" handle={() => { crearUser(nombre, apellido, moment(fecha_de_nacimiento).format('YYYY-MM-DD'), email, password, repeated_password, equipo, setIsLoading, crearUsers, queryClient, router) }} />
        //             </Grid>
        //             <Grid item mt={2}>
        //                 <Typography variant="body2" sx={{ color: light ? "var(--dark3)" : "var(--gris2)", cursor: 'pointer', textDecoration: 'underline' }} onClick={navigateToLogin}>
        //                     Volver a iniciar sesión
        //                 </Typography>
        //             </Grid>
        //         </Paper>
        //         {isLoading && (
        //             <Grid sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: !mobile ? '160vh' : '130vh', backgroundColor: 'rgba(2, 2, 2, 0.488)', zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        //                 <CircularProgress style={{ color: light ? 'var(--dark2)' : 'var(--cero)' }} />
        //             </Grid>
        //         )}
        //     </Grid>
        // </Grid>
    );
};

export default Register;