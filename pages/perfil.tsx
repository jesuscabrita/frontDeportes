import React, { useContext } from "react";
import { Grid, Typography, Avatar, CircularProgress, useMediaQuery } from "@mui/material";
import Context from "../context/contextPrincipal";
import ContextRefac from "../context/contextLogin";
import { useRouter } from "next/router";
import { alertaSubmit } from "../utils/alert";
import { useQuery } from "react-query";
import { UserGetById } from "../service/session";
import { TbError404 as Err404 } from 'react-icons/tb';
import { FaArrowAltCircleLeft as Atras } from 'react-icons/fa';

const Perfil = () => {
    const [light] = useContext(Context);
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });
    const { state: { user } }: any = useContext(ContextRefac);
    const router = useRouter();

    const handleAtrasClick = () => {
        router.back();
    };

    const { data, isLoading, isError } = useQuery(["usuario", user?._id], () => UserGetById(user?._id), {
        refetchOnWindowFocus: false,
        onError: (err: any) => {
            const errorMessage = `No se encontró el usuario con el ID: ${user?._id}`
            alertaSubmit(false, errorMessage);
        }
    });
    const usuario = data?.data?.data;

    return (
        <>
            {isLoading ?
                <Grid item height="100vh" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', color: light ? 'var(--dark2)' : 'var(--cero)', gap: '16px' }}>
                    Cargando usuario..! <CircularProgress style={{ color: light ? 'var(--dark2)' : 'var(--cero)' }} size={30} />
                </Grid>
                : isError ?
                    <Grid item height="100vh" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', color: light ? 'var(--dark2)' : 'var(--cero)', }}>
                        Ha ocurrido un error al cargar el usuario <Err404 size={45} />
                    </Grid>
                    : <Grid container direction="column" alignItems="center" justifyContent="center" height="100vh" style={{ padding: "0 50px" }}>
                        <Grid width={'100%'} sx={{ display: 'flex' }}>
                            <Grid sx={{ paddingLeft: !mobile ? '80px' : '16px' }}>
                                <Atras size={30} style={{ cursor: 'pointer', color: light ? 'var(--dark2)' : 'var(--cero)' }} onClick={handleAtrasClick} />
                            </Grid>
                        </Grid>
                        <Avatar alt={`${usuario?.nombre} ${usuario?.apellido}`} src={''} sx={{ width: 100, height: 100, marginBottom: 5 }} />
                        <Typography variant="h5" component="h1" gutterBottom sx={{ color: light ? 'var(--dark2)' : 'var(--cero)' }}>
                            {usuario?.nombre} {usuario?.apellido}
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom sx={{ color: light ? 'var(--dark2)' : 'var(--cero)', display: 'flex', gap: '10px', fontWeight: '700' }}>
                            Rol: <Grid item sx={{ color: light ? 'var(--dark)' : 'var(--neutral)', fontWeight: '500' }}>{usuario?.role}</Grid>
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom sx={{ color: light ? 'var(--dark2)' : 'var(--cero)', display: 'flex', gap: '10px', fontWeight: '700' }}>
                            Email: <Grid item sx={{ color: light ? 'var(--dark)' : 'var(--neutral)', fontWeight: '500' }}>{usuario?.email}</Grid>
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom sx={{ color: light ? 'var(--dark2)' : 'var(--cero)', display: 'flex', gap: '10px', fontWeight: '700' }}>
                            Fecha de nacimiento: <Grid item sx={{ color: light ? 'var(--dark)' : 'var(--neutral)', fontWeight: '500' }}>{usuario?.fecha_de_nacimiento}</Grid>
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom sx={{ color: light ? 'var(--dark2)' : 'var(--cero)', display: 'flex', gap: '10px', fontWeight: '700' }}>
                            Edad: <Grid item sx={{ color: light ? 'var(--dark)' : 'var(--neutral)', fontWeight: '500' }}>{usuario?.edad}</Grid>
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom sx={{ color: light ? 'var(--dark2)' : 'var(--cero)', display: 'flex', gap: '10px', fontWeight: '700' }}>
                            Equipo: <Grid item sx={{ color: light ? 'var(--dark)' : 'var(--neutral)', fontWeight: '500' }}>{usuario?.equipo}</Grid>
                        </Typography>
                    </Grid>}
        </>
    );
};

export default Perfil;