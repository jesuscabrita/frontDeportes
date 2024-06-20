import React, { useContext, useEffect, useState } from "react";
import { CircularProgress, Grid, Tooltip, useMediaQuery } from "@mui/material";
import { Form } from "../../components/Registrar/Form/Form";
import { ListaEquipoRegistro } from "../../components/Registrar/ListaEquipos/ListaEquipoRegistro";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { equiposGet, resetEquiposJugador } from "../../service/equipos";
import { GiSandsOfTime as Espera } from 'react-icons/gi';
import { useTheme } from '@mui/material/styles';
import { TabPanel } from "../../components/Material/TabPanel";
import { FaRegistered as Register } from 'react-icons/fa';
import { TbMoodEmpty as Vacio } from 'react-icons/tb';
import { MenuTabla } from "../../components/Material/MenuTabla";
import { LogoRegister } from "../../components/Shared/LogoRegister";
import { TbError404 as Err404 } from 'react-icons/tb';
import { filterEstado } from "../../utils/utils";
import { BiReset as Reset } from 'react-icons/bi'
import { AiOutlineWarning as Warning } from 'react-icons/ai'
import { editarReset } from "../../utils/utilsEquipos";
import { devolverJugadorPrestamo, jugadoresContratoCalculo } from "../../service/jugadores";
import { ButtonSend } from "../../components/Material/ButtonSend";
import { calculoContratosJugadores, devolverJugador } from "../../utils/utilsPanelJugadores";
import { FaFileContract as Contra } from 'react-icons/fa';
import SwipeableViews from "react-swipeable-views";
import ContextRefac from "../../context/contextLogin";
import Context from "../../context/contextPrincipal";

const opcionSelectEquipos = [
    { id: 0, name: 'Equipos en la liga', icono: <Register size={30} /> },
    { id: 1, name: 'Equipos en cola', icono: <Espera size={20} /> }
]

const Registrar = () => {
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });
    const [light] = useContext(Context);
    const [data, setData] = useState([]);
    const [value, setValue] = useState(0);
    const theme = useTheme();
    const { mutate: reseteoEquipos } = useMutation(resetEquiposJugador);
    const { mutate: devolver } = useMutation(devolverJugadorPrestamo);
    const { mutate: calculo } = useMutation(jugadoresContratoCalculo);
    const queryClient = useQueryClient();
    const [isLoadinng, setIsLoadinng] = useState(false);
    const { state: { user } }: any = useContext(ContextRefac);
    const [isUserAdmin, setIsUserAdmin] = useState(false);
    const [superAdmin, setSuperAdmin] = useState(false);

    useEffect(() => {
        setIsUserAdmin(user?.role === 'super_admin' || user?.role === 'admin');
        setSuperAdmin(user?.role === 'super_admin')
    }, [user]);

    const { isLoading, isError } = useQuery(["/api/liga"], equiposGet, {
        refetchOnWindowFocus: false,
        onSuccess: (data) => {
            setData(data);
        },
    })

    const isUserEmailInData = filterEstado(data, 'registrado').some((equipo) => equipo.correo === user?.email);
    const isUserEmailInDataEnCola = filterEstado(data, 'enCola').some((equipo) => equipo.correo === user?.email);

    const handleChange = (newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index: number) => {
        setValue(index);
    };

    const stylesRow = {
        display: 'flex',
        flexDirection: 'row',
        gap: '16px',
        minWidth: !mobile ? '960px' : '100%',
        height: mobile ? '300px' : '',
        justifyContent: 'center',
        color: light ? 'var(--dark2)' : 'var(--cero)'
    }

    const stylesColumn = {
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        minWidth: !mobile ? '960px' : '100%',
        height: mobile ? '300px' : '',
        justifyContent: 'center',
        alignItems: 'center',
        color: light ? 'var(--dark2)' : 'var(--cero)'
    }

    return (
        <Grid sx={{ height: !mobile ? '290vh' : isUserAdmin ? '100%' : '120vh' }}>
            <Grid container flexDirection={'column'} sx={{ paddingTop: !mobile ? '100px' : '90px', paddingBottom: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
                <LogoRegister name={'Registrar equipo'} />
                {(!isUserEmailInData && !isUserEmailInDataEnCola) || isUserAdmin ?
                    <Form /> :
                    <Grid item sx={{ color: light ? 'var(--dark2)' : 'var(--cero)', fontSize: '18px', height: mobile ? '100vh' : '100vh' }}>{isUserEmailInDataEnCola ? 'Tu equipo paso a lista de espera' : 'Ya tienes un equipo registrado'}</Grid>
                }
                {isUserAdmin &&
                    <Grid item mt={4}>
                        <Grid item container sx={{ height: 'min-content' }}>
                            {opcionSelectEquipos.map(opcion => (
                                <MenuTabla opcion={opcion} valueSelect={value} handleChange={handleChange} />
                            ))}
                            <Grid container sx={{ borderBottom: light ? '2px solid var(--gris)' : '2px solid var(--neutral)', marginTop: '-10px' }}></Grid>
                        </Grid>
                        <SwipeableViews axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'} index={value} onChangeIndex={handleChangeIndex}>
                            <TabPanel value={value} index={0} dir={theme.direction}>
                                {superAdmin &&
                                    <Grid mt={1} container gap={1}>
                                        <Tooltip title="Resetea los datos de los equipos, es recomendable al terminar la liga o temporada" placement="top">
                                            <Grid item>
                                                <ButtonSend disable={false} handle={() => { editarReset(setIsLoadinng, queryClient, data, reseteoEquipos) }} title={'Reset'} icon={Warning} iconColor={'var(--warnning)'} iconSize={20} />
                                            </Grid>
                                        </Tooltip>
                                        <Tooltip title="Devuelve a los jugadores que se encuentran en calidad de PRESTAMO a sus equipos de origen" placement="top">
                                            <Grid item>
                                                <ButtonSend disable={false} handle={() => { devolverJugador(data, devolver, queryClient, setIsLoadinng) }} title={'D. Prestamos'} icon={Reset} iconColor={'var(--check)'} iconSize={20} />
                                            </Grid>
                                        </Tooltip>
                                        <Tooltip title="Calcula y analiza los contratos de los jugadores" placement="top">
                                            <Grid item>
                                                <ButtonSend disable={false} handle={() => { calculoContratosJugadores(data, calculo, queryClient, setIsLoadinng) }} title={'C.Contratos'} icon={Contra} iconColor={'var(--check)'} iconSize={20} />
                                            </Grid>
                                        </Tooltip>
                                    </Grid>
                                }
                                <Grid mt={2} sx={{ width: '100%', display: filterEstado(data, 'registrado').length === 0 || isError || isLoading ? 'flex' : 'grid', gridTemplateColumns: !mobile ? 'repeat(5, 1fr)' : 'repeat(2, 1fr)', gap: '20px', }}>
                                    {isLoading ?
                                        <Grid mt={8} item sx={stylesRow}>
                                            <CircularProgress style={{ color: light ? 'var(--dark2)' : 'var(--cero)' }} />
                                        </Grid>
                                        : isError ?
                                            <Grid mt={mobile ? 0 : 8} item sx={stylesColumn}>
                                                Ha ocurrido un error al cargar los equipos <Err404 size={85} />
                                            </Grid>
                                            : filterEstado(data, 'registrado').length === 0 ?
                                                <Grid mt={8} item sx={stylesRow}>
                                                    No hay equipos en la liga <Vacio size={25} />
                                                </Grid>
                                                : filterEstado(data, 'registrado').map((equipo, index) => (
                                                    <Grid key={index}>
                                                        <ListaEquipoRegistro data={equipo} isLoading={isLoading} />
                                                    </Grid>
                                                ))
                                    }
                                </Grid>
                            </TabPanel>
                            <TabPanel value={value} index={1} dir={theme.direction} >
                                <Grid mt={2} sx={{ width: '100%', display: filterEstado(data, 'enCola').length === 0 || isError || isLoading ? 'flex' : 'grid', gridTemplateColumns: !mobile ? 'repeat(5, 1fr)' : 'repeat(2, 1fr)', gap: '20px' }}>
                                    {isLoading ?
                                        <Grid mt={8} item sx={stylesRow}>
                                            <CircularProgress style={{ color: light ? 'var(--dark2)' : 'var(--cero)' }} />
                                        </Grid>
                                        : isError ?
                                            <Grid mt={mobile ? 0 : 8} item sx={stylesColumn}>
                                                Ha ocurrido un error al cargar los equipos <Err404 size={85} />
                                            </Grid>
                                            : filterEstado(data, 'enCola').length === 0 ?
                                                <Grid mt={8} item sx={stylesRow}>
                                                    No hay equipos en cola <Vacio size={25} />
                                                </Grid>
                                                : filterEstado(data, 'enCola').map((equipo, index) => (
                                                    <Grid key={index}>
                                                        <ListaEquipoRegistro data={equipo} isLoading={isLoading} />
                                                    </Grid>
                                                ))
                                    }
                                </Grid>
                            </TabPanel>
                        </SwipeableViews>
                    </Grid>}
            </Grid>
            {isLoadinng && (
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: !mobile ? '180vh' : '180vh', backgroundColor: 'rgba(2, 2, 2, 0.488)', zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <CircularProgress color="primary" />
                </div>
            )}
        </Grid>
    );
};
export default Registrar;