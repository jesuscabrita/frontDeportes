import React, { useContext, useEffect, useState } from "react";
import { Grid, Paper, useMediaQuery } from "@mui/material"
import { MenuTabla } from "../Material/MenuTabla";
import { useTheme } from '@mui/material/styles';
import { TabPanel } from "../Material/TabPanel";
import { ModalCrearJugador } from "../modals/Jugador/ModalCrearJugador";
import { TablaPlantilla } from "./TablaPlantilla";
import { TablaEstadisticas } from "./TablaEstadisticas";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { equiposGet } from "../../service/equipos";
import { filterEstado, filterLibreJugador, ordenPosition } from "../../utils/utils";
import { DelegadoDelete } from "../../service/delegado";
import { ModalDelegado } from "../modals/Delegado/ModalDelegado";
import { ModalDelegadoEditar } from "../modals/Delegado/ModalDelegadoEdit";
import { ModalChatDelegado } from "../modals/Delegado/ModalChat";
import { TablaFichajes } from "./TablaFichajes";
import { Carga } from "../Shared/Carga";
import { ErrorCarga } from "../Shared/ErrorCarga";
import { TbMoodEmpty as Vacio } from 'react-icons/tb';
import { DatosEquipo } from "./DatosEquipo";
import { JugadorEquipoDetalle } from "../../interfaces/general";
import { ModalEditarJugador } from "../modals/Jugador/ModalEditarJugador";
import { ModalRecindir } from "../modals/Jugador/ModalRecindir";
import { ModalRenovarJugador } from "../modals/Jugador/ModalRenovar";
import { ModalDorsal } from "../modals/Jugador/ModalDorsal";
import { ModalJugadorCapitan } from "../modals/Jugador/ModalCapital";
import { ModalJornada } from "../modals/Jugador/ModalJornada";
import { ModalJugadorInfo } from "../modals/Jugador/ModalInfoJugador";
import { JugadorDelete, jugadoresInscribir, jugadoresListaTransferible, jugadoresPut_lesion, ofertaDelete } from "../../service/jugadores";
import { LoadingScreen } from "../Shared/LoadingScreen";
import { AccionesAdmin } from "./AccionesAdmin";
import { opcionSelectEquipoID } from "../../utils/arrays";
import { ModalOferta } from "../modals/Jugador/ModalOferta";
import { ModalOfertaRecibida } from "../modals/Jugador/ModalOfertaRecibida";
import { ModalAceptarOferta } from "../modals/Jugador/ModalAceptarOferta";
import { ModalNegociar } from "../modals/Jugador/ModalNegociar";
import { ModalPrestamo } from "../modals/Jugador/ModalPrestamo";
import ContextRefac from "../../context/contextLogin";
import Context from "../../context/contextPrincipal";
import SwipeableViews from "react-swipeable-views";

interface EquipoDetalleProps {
    isError: boolean;
    data: {
        correo: string;
        name: string;
        logo: string;
        partidosJugados: number;
        puntaje_anterior: number;
        instagram: string;
        banco_fondo: number;
        categoria: string;
        tarjetasAmarillas: number;
        tarjetasRojas: number;
        puntos: number;
        empates: number;
        ganados: number;
        perdidos: number;
        goles_a_Favor: number;
        goles_en_Contra: number;
        diferencia_de_Goles: number;
        delegado: { name: string; _id: string; }[];
        jugadores: {}[];
        director_tecnico: {}[];
        _id: string;
    };
    equipo_id: any;
    isLoading: boolean;
}

export const EquipoDetalle: React.FC<EquipoDetalleProps> = ({
    data,
    isLoading,
    equipo_id,
    isError
}) => {
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });
    const [light] = useContext(Context);
    const [showImage, setShowImage] = useState(false);
    const [value, setValue] = useState(0);
    const theme = useTheme();
    const [modalJugador, setModalJugador] = useState(false);
    const [modalDelegado, setModalDelegado] = useState(false);
    const [modalDelegadoEditar, setModalDelegadoEditar] = useState(false);
    const [equipo, setEquipo] = useState([]);
    const { mutate: eliminarDelegado } = useMutation(DelegadoDelete);
    const queryClient = useQueryClient();
    const [delegadoSeleccionado, setDelegadoSeleccionado] = useState(null);
    const [modalDelegadoChat, setModalDelegadoChat] = useState(false);
    const { state: { user } }: any = useContext(ContextRefac);
    const [isUserAdmin, setIsUserAdmin] = useState(false);
    const [isSameEmail, setIsSameEmail] = useState(false);
    const [jugadorSeleccionado, setJugadorSeleccionado] = useState<JugadorEquipoDetalle | null>(null);
    const [modalEditarJugador, setModalEditarJugador] = useState(false);
    const [modalRecindir, setModalRecindir] = useState(false);
    const [modalRenovar, setModalRenovar] = useState(false);
    const [modalDorsal, setModalDorsal] = useState(false);
    const [modalJugadorCapitan, setModalJugadorCapitan] = useState(false);
    const [modalEditarJornada, setModalEditarJornada] = useState(false);
    const [modalJugadorInfo, setModalJugadorInfo] = useState(false);
    const [isLoadinng, setIsLoadinng] = useState(false);
    const [modalOferta, setModalOferta] = useState(false);
    const [modalOfertaRecibida, setModalOfertaRecibida] = useState(false);
    const [modalPrestamo, setModalPrestamo] = useState(false);
    const [modalNegociar, setModalNegociar] = useState(false);
    const [modalAceptarOferta, setModalAceptarOferta] = useState(false);
    const { mutate: eliminarJugador } = useMutation(JugadorDelete);
    const { mutate: lesion_jugador } = useMutation(jugadoresPut_lesion);
    const { mutate: inscribir } = useMutation(jugadoresInscribir);
    const { mutate: listaTransferibleJugador } = useMutation(jugadoresListaTransferible);
    const { mutate: eliminarOfert } = useMutation(ofertaDelete);

    useEffect(() => {
        if (user?.email === data?.correo) {
            setIsSameEmail(true);
        } else {
            setIsSameEmail(false);
        }
    }, [user, data]);

    useEffect(() => {
        setIsUserAdmin(user?.role === 'super_admin' || user?.role === 'admin');
    }, [user]);

    const { isError: isErrorGet } = useQuery(["/api/liga"], equiposGet, {
        refetchOnWindowFocus: false,
        onSuccess: (data) => {
            setEquipo(data);
        },
    })

    const equipoIndex = ordenPosition(filterEstado(equipo, 'registrado')).findIndex((equipo) => equipo._id === equipo_id);

    const handleChange = (newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index: number) => {
        setValue(index);
    };

    useEffect(() => {
        if (!isLoading) {
            const timeoutId = setTimeout(() => {
                setShowImage(true);
            }, 1500);
            return () => clearTimeout(timeoutId);
        }
    }, [isLoading]);

    const filterLibreJugadorData = (array, estado) => {
        const newFilter = array.filter(data => data.libre == estado && data.inscrito === 'Si');
        return newFilter;
    }

    return (
        <Paper elevation={3} sx={{ padding: mobile ? "20px" : "40px", display: "flex", flexDirection: "column", alignItems: "center", background: light ? 'var(--gris)' : 'var(--dark2)' }}>
            {isLoading ?
                <Grid item height={mobile ? "75vh" : '65vh'} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', color: light ? 'var(--dark2)' : 'var(--cero)', gap: '16px' }}>
                    <Carga />
                </Grid>
                : !data ?
                    <Grid item height={mobile ? "75vh" : '65vh'} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', color: light ? 'var(--dark2)' : 'var(--cero)', gap: '16px' }}>
                        <Vacio size={140} />
                        {`No se encontró el equipo con el ID: ${equipo_id}`}
                    </Grid>
                    : isError ?
                        <Grid item height={mobile ? "75vh" : '60vh'} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', color: light ? "var(--dark2)" : "var(--gris)", flexDirection: 'column', fontSize: mobile ? '14px' : '16px' }}>
                            <ErrorCarga />
                        </Grid>
                        :
                        <Grid item container alignItems={'center'} justifyContent={'center'}>
                            <Grid item container alignItems={'center'} justifyContent={'center'}>
                                <img style={{ height: mobile ? '80px' : '120px' }} src={data.logo} alt="logo" />
                            </Grid>
                            <Grid item container alignItems={'center'} justifyContent={'center'} sx={{ color: light ? "var(--dark2)" : "var(--cero)", letterSpacing: '2px', fontSize: !mobile ? '20px' : '13px', fontWeight: '500' }}>
                                {`Detalles del ${data.name}`}
                            </Grid>
                            <Grid item container mt={2} xs={12} md={9} gap={2} alignItems={'center'} justifyContent={'center'}>
                                <Paper elevation={3} sx={{ padding: mobile ? "20px" : "40px", display: "flex", flexDirection: "column", alignItems: "center", background: light ? 'var(--gris3)' : 'var(--dark4)', width: '100%' }}>
                                    <DatosEquipo
                                        data={data}
                                        eliminarDelegado={eliminarDelegado}
                                        equipoIndex={equipoIndex}
                                        equipo_id={equipo_id}
                                        isSameEmail={isSameEmail}
                                        isUserAdmin={isUserAdmin}
                                        light={light}
                                        mobile={mobile}
                                        queryClient={queryClient}
                                        setDelegadoSeleccionado={setDelegadoSeleccionado}
                                        setModalDelegadoChat={setModalDelegadoChat}
                                        setModalDelegadoEditar={setModalDelegadoEditar}
                                    />
                                </Paper>
                                {(isUserAdmin || isSameEmail) &&
                                    <Grid item container alignItems={'center'} justifyContent={'center'} sx={{ color: light ? "var(--dark2)" : "var(--cero)", letterSpacing: '2px', fontSize: !mobile ? '20px' : '13px', fontWeight: '500' }}>
                                        {`Acciones`}
                                    </Grid>}
                                {(isUserAdmin || isSameEmail) &&
                                    <AccionesAdmin
                                        light={light}
                                        mobile={mobile}
                                        data={data}
                                        modalDelegado={modalDelegado}
                                        modalJugador={modalJugador}
                                        setModalDelegado={setModalDelegado}
                                        setModalJugador={setModalJugador}
                                    />}
                                <Grid item container mt={4} alignItems={'center'} justifyContent={'center'} sx={{ height: 'min-content' }}>
                                    {opcionSelectEquipoID?.map(opcion => (
                                        <MenuTabla opcion={opcion} valueSelect={value} handleChange={handleChange} />
                                    ))}
                                    <Grid container sx={{ borderBottom: light ? '2px solid var(--dark2)' : '2px solid var(--gris)', marginTop: '0px' }}></Grid>
                                </Grid>
                                <SwipeableViews axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'} index={value} onChangeIndex={handleChangeIndex}>
                                    <TabPanel value={value} index={0} dir={theme.direction}>
                                        <Grid item mt={4} xs={12} md={12} container sx={{ width: '120vh', }} >
                                            <TablaPlantilla
                                                jugadores={(isUserAdmin || isSameEmail) ? filterLibreJugador(data.jugadores, 'No') : filterLibreJugadorData(data.jugadores, 'No')}
                                                equipo={data}
                                                light={light}
                                                mobile={mobile}
                                                queryClient={queryClient}
                                                isSameEmail={isSameEmail}
                                                isUserAdmin={isUserAdmin}
                                                setJugadorSeleccionado={setJugadorSeleccionado}
                                                setModalEditarJugador={setModalEditarJugador}
                                                setModalRecindir={setModalRecindir}
                                                setModalRenovar={setModalRenovar}
                                                setModalDorsal={setModalDorsal}
                                                setModalJugadorCapitan={setModalJugadorCapitan}
                                                setModalEditarJornada={setModalEditarJornada}
                                                setModalJugadorInfo={setModalJugadorInfo}
                                                eliminarJugador={eliminarJugador}
                                                lesion_jugador={lesion_jugador}
                                                inscribir={inscribir}
                                                listaTransferibleJugador={listaTransferibleJugador}
                                                setIsLoadinng={setIsLoadinng}
                                            />
                                        </Grid>
                                    </TabPanel>
                                    <TabPanel value={value} index={1} dir={theme.direction}>
                                        <Grid item mt={4} xs={12} md={12} container sx={{ width: '120vh', }} >
                                            <TablaEstadisticas
                                                jugadores={data.jugadores}
                                                label="Tabla de goleadores del equipo"
                                                light={light}
                                                mobile={mobile}
                                                goles
                                            />
                                        </Grid>
                                    </TabPanel>
                                    <TabPanel value={value} index={2} dir={theme.direction}>
                                        <Grid item mt={4} xs={12} md={12} container sx={{ width: '120vh', }} >
                                            <TablaEstadisticas
                                                jugadores={data.jugadores}
                                                label="Tabla de asistidores del equipo"
                                                light={light}
                                                mobile={mobile}
                                                asistencias
                                            />
                                        </Grid>
                                    </TabPanel>
                                    <TabPanel value={value} index={3} dir={theme.direction}>
                                        <Grid item mt={4} xs={12} md={12} container sx={{ width: '120vh', }} >
                                            <TablaEstadisticas
                                                jugadores={data.jugadores}
                                                label="Tabla de tarjetas amarillas del equipo"
                                                light={light}
                                                mobile={mobile}
                                                amarillas
                                            />
                                        </Grid>
                                    </TabPanel>
                                    <TabPanel value={value} index={4} dir={theme.direction}>
                                        <Grid item mt={4} xs={12} md={12} container sx={{ width: '120vh', }} >
                                            <TablaEstadisticas
                                                jugadores={data.jugadores}
                                                label="Tabla de tarjetas rojas del equipo"
                                                light={light}
                                                mobile={mobile}
                                                rojas
                                            />
                                        </Grid>
                                    </TabPanel>
                                    <TabPanel value={value} index={5} dir={theme.direction}>
                                        <Grid item mt={4} xs={12} md={12} container sx={{ width: '120vh', }} >
                                            <TablaFichajes
                                                jugadores={data.jugadores}
                                                equipoId={equipo_id}
                                                data={data}
                                                light={light}
                                                mobile={mobile}
                                                user={user}
                                                queryClient={queryClient}
                                                setIsLoadinng={setIsLoadinng}
                                                setModalJugadorInfo={setModalJugadorInfo}
                                                setJugadorSeleccionado={setJugadorSeleccionado}
                                                setModalOferta={setModalOferta}
                                                setModalOfertaRecibida={setModalOfertaRecibida}
                                                setModalAceptarOferta={setModalAceptarOferta}
                                                setModalNegociar={setModalNegociar}
                                                setModalPrestamo={setModalPrestamo}
                                                eliminarOfert={eliminarOfert}
                                            />
                                        </Grid>
                                    </TabPanel>
                                </SwipeableViews>
                            </Grid>
                        </Grid>
            }
            {jugadorSeleccionado && (<ModalOferta open={modalOferta} setOpen={setModalOferta} equipoId={data?._id} data={jugadorSeleccionado} jugadorId={jugadorSeleccionado._id} />)}
            {jugadorSeleccionado && <ModalOfertaRecibida open={modalOfertaRecibida} setOpen={setModalOfertaRecibida} equipoId={data?._id} data={jugadorSeleccionado} jugadorId={jugadorSeleccionado._id} />}
            {jugadorSeleccionado && (<ModalAceptarOferta open={modalAceptarOferta} setOpen={setModalAceptarOferta} equipoId={data?._id} data={jugadorSeleccionado} jugadorId={jugadorSeleccionado._id} />)}
            {jugadorSeleccionado && (<ModalNegociar open={modalNegociar} setOpen={setModalNegociar} equipoId={data?._id} data={jugadorSeleccionado} jugadorId={jugadorSeleccionado._id} />)}
            {jugadorSeleccionado && (<ModalPrestamo open={modalPrestamo} setOpen={setModalPrestamo} equipoId={data?._id} data={jugadorSeleccionado} jugadorId={jugadorSeleccionado._id} />)}

            {isLoadinng && <LoadingScreen />}
            {jugadorSeleccionado && (<ModalEditarJugador open={modalEditarJugador} setOpen={setModalEditarJugador} equipoId={data?._id} jugadorId={jugadorSeleccionado._id} data={jugadorSeleccionado} />)}
            {jugadorSeleccionado && <ModalRecindir open={modalRecindir} setOpen={setModalRecindir} data={jugadorSeleccionado} equipoId={data?._id} />}
            {jugadorSeleccionado && (<ModalRenovarJugador open={modalRenovar} setOpen={setModalRenovar} data={jugadorSeleccionado} jugadorId={jugadorSeleccionado?._id} equipoId={data?._id} />)}
            {jugadorSeleccionado && (<ModalDorsal open={modalDorsal} setOpen={setModalDorsal} data={jugadorSeleccionado} equipoId={data?._id} jugadorId={jugadorSeleccionado._id} />)}
            {jugadorSeleccionado && (<ModalJugadorCapitan open={modalJugadorCapitan} setOpen={setModalJugadorCapitan} jugador={jugadorSeleccionado} equipoId={data?._id} />)}
            {jugadorSeleccionado && (<ModalJornada open={modalEditarJornada} setOpen={setModalEditarJornada} id={jugadorSeleccionado._id} equipoId={data?._id} data={jugadorSeleccionado} />)}
            {jugadorSeleccionado && (<ModalJugadorInfo open={modalJugadorInfo} setOpen={setModalJugadorInfo} jugador={jugadorSeleccionado} />)}

            {modalJugador && <ModalCrearJugador open={modalJugador} setOpen={setModalJugador} id={data?._id} />}
            {modalDelegado && <ModalDelegado open={modalDelegado} setOpen={setModalDelegado} id={data?._id} />}
            {delegadoSeleccionado && <ModalDelegadoEditar open={modalDelegadoEditar} setOpen={setModalDelegadoEditar} id={data?._id} data={data?.delegado[0]} />}
            {delegadoSeleccionado && <ModalChatDelegado open={modalDelegadoChat} setOpen={setModalDelegadoChat} data={data?.delegado[0]} />}
        </Paper >
    )
}