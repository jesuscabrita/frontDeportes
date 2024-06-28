import React, { useContext, useState } from "react";
import { Grid, SelectChangeEvent, useMediaQuery } from "@mui/material";
import { RegisterRequest } from "../service/session";
import { useMutation, useQueryClient } from "react-query";
import { crearUser } from "../utils/utilsUser";
import { useRouter } from "next/router";
import { RegisterUser } from "../components/RegistrarUsuario/RegisterUser";
import { LoadingScreen } from "../components/Shared/LoadingScreen";
import Context from "../context/contextPrincipal";
import Head from "next/head";
import moment from "moment";

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
    const [selectCategoria, setSelectCategoria] = useState('Elija una opción');

    const navigateToLogin = () => {
        router.push("/login");
    };

    const handleSelectChange = (event: SelectChangeEvent<string>) => {
        setSelectCategoria(event.target.value)
    }

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
                        handleRegistrar={() => { crearUser(nombre, apellido, moment(fecha_de_nacimiento).format('YYYY-MM-DD'), email, password, repeated_password, equipo, setIsLoading, crearUsers, queryClient, router, selectCategoria) }}
                        navigateToLogin={navigateToLogin}
                        cargando={cargando}
                        categoria={selectCategoria}
                        handleSelect={handleSelectChange}
                    />
                </Grid>
            </Grid>
            {isLoading && <LoadingScreen />}
        </>
    );
};

export default Register;