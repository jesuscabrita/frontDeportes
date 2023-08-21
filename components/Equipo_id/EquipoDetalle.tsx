import { Button, CircularProgress, Grid, useMediaQuery } from "@mui/material"
import { useContext, useEffect, useState } from "react";
import Context from "../../context/contextPrincipal";
import { TbRectangleVertical as Tarjeta } from 'react-icons/tb';
import { BsArrowsCollapse as Position } from 'react-icons/bs';
import { GrInstagram as Instagram } from 'react-icons/gr';
import { BsCashCoin as Cash } from 'react-icons/bs';
import { BiCategoryAlt as Categoria } from 'react-icons/bi';
import { TbSoccerField as Estadio } from 'react-icons/tb';
import { MdOutlineManageAccounts as Delegado } from 'react-icons/md';
import { AiOutlineNumber as Puntos } from 'react-icons/ai';
import { FaEquals as Empate } from 'react-icons/fa';
import { MdVerified as Ganado } from 'react-icons/md';
import { AiOutlineCloseCircle as Perdido } from 'react-icons/ai';
import { MenuTabla } from "../Material/MenuTabla";
import { TbTemplate as Plantilla } from 'react-icons/tb';
import { GiSoccerKick as Asistir } from 'react-icons/gi';
import { GiSoccerBall as Goles } from 'react-icons/gi';
import { BiTransfer as Fichaje } from 'react-icons/bi';
import SwipeableViews from "react-swipeable-views";
import { useTheme } from '@mui/material/styles';
import { TabPanel } from "../Material/TabPanel";
import { ModalCrearJugador } from "../modals/Jugador/ModalCrearJugador";
import { TablaPlantilla } from "./TablaPlantilla";
import { TablaEstadisticas } from "./TablaEstadisticas";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { equiposGet } from "../../service/equipos";
import { filterEstado, filterLibreJugador, formatoPesosArgentinos, ordenPosition, seleccionarData } from "../../utils/utils";
import { ArrowP } from "../Shared/ArrowP";
import { IoIosCreate as CreatePlayer } from 'react-icons/io';
import { ModalDT } from "../modals/DT/ModalDT";
import { DelegadoDelete } from "../../service/delegado";
import { MdDelete as Borrar } from 'react-icons/md';
import Tooltip from '@mui/material/Tooltip';
import { ModalDelegado } from "../modals/Delegado/ModalDelegado";
import { AiOutlineEdit as Editar } from 'react-icons/ai';
import { ModalDelegadoEditar } from "../modals/Delegado/ModalDelegadoEdit";
import { BsFillChatLeftDotsFill as Chat } from "react-icons/bs";
import { ModalChatDelegado } from "../modals/Delegado/ModalChat";
import { eliminarDelegados } from "../../utils/utilsDelegado";
import { ButtonSend } from "../Material/ButtonSend";
import ContextRefac from "../../context/contextLogin";
import { FaFileContract as Contra } from 'react-icons/fa';
import { TablaContratos } from "./TablaContratos";
import { TablaFichajes } from "./TablaFichajes";
import { GiArchiveRegister as Regis } from 'react-icons/gi';
import { TablaInscripcion } from "./Tabla.Inscripcion";

const opcionSelectEquipo = [
    { id: 0, name: 'Plantilla', icono: <Plantilla size={30} /> },
    { id: 1, name: 'Goles', icono: <Goles size={30} /> },
    { id: 2, name: 'Asistencias', icono: <Asistir size={30} /> },
    { id: 3, name: 'Amarillas', icono: <Tarjeta color={'var(--warnning)'} size={30} /> },
    { id: 4, name: 'Rojas', icono: <Tarjeta color={'var(--danger)'} size={30} /> },
    { id: 5, name: 'Contratos', icono: <Contra size={25} /> },
    { id: 6, name: 'Fichajes', icono: <Fichaje size={30} /> },
    { id: 7, name: 'Inscripción', icono: <Regis size={25} /> },
]

export const EquipoDetalle = ({ data, isLoading, equipo_id }) => {
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });
    const [light] = useContext(Context);
    const [showImage, setShowImage] = useState(false);
    const [value, setValue] = useState(0);
    const theme = useTheme();
    const [modalJugador, setModalJugador] = useState(false);
    const [modalDT, setModalDT] = useState(false);
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

    const { isError } = useQuery(["/api/liga"], equiposGet, {
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

    return (
        <>
            <Grid container sx={{
                border: light ? '1px solid var(--dark2)' : '1px solid var(--neutral)',
                borderRadius: '8px',
                padding: '8px',
                flexDirection: 'row',
                gap: '20px',
                alignItems: 'center',
            }}>
                <Grid sx={{ fontSize: !mobile ? '20px' : '12px', display: 'flex', flexDirection: 'row', gap: '20px', alignItems: 'center', whiteSpace: 'nowrap' }}>
                    <Grid container flexDirection={'column'} justifyContent={'center'} alignItems={'center'} sx={{
                        borderRadius: '8px',
                        height: '150px',
                        width: '150px',
                        background: light ? 'var(--gris)' : 'var(--dark2)',
                    }}>
                        <Grid item>
                            {isLoading || !showImage ?
                                (<CircularProgress style={{ color: light ? 'var(--dark2)' : 'var(--cero)' }} size={30} />)
                                : showImage ? <img src={data?.logo} alt={data?.name} style={{ height: '80px' }} />
                                    : null}
                        </Grid>
                    </Grid>
                    <Grid sx={{ display: 'flex', flexDirection: 'column', color: light ? 'var(--dark2)' : 'var(--neutral)' }}>
                        <Grid sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px' }}><Position color={light ? 'var(--dark2)' : 'var(--cero)'} />
                            Posicion: # {equipoIndex + 1}
                            {data.partidosJugados >= 1 &&
                                <Grid item container alignItems={'center'} justifyContent={'center'} sx={{ whiteSpace: 'nowrap', width: '30px' }}>
                                    <ArrowP currentPos={equipoIndex} prevPos={data.puntaje_anterior} />
                                </Grid>}
                        </Grid>
                        {!mobile ? 
                            <a href={`https://www.instagram.com/${data?.instagram}`} target="_blank">
                                <Grid sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px' }}>
                                    <Instagram size={!mobile ? 17 : 10} color={light ? 'var(--dark2)' : 'var(--cero)'} />
                                    Intagram:  @{!data?.instagram ? 'No definido' : data?.instagram}
                                </Grid>
                            </a>
                            :
                            <a href={`https://www.instagram.com/${data?.instagram}`} target="_blank">
                                <Grid sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px' }}>
                                    <Instagram size={!mobile ? 17 : 10} color={light ? 'var(--dark2)' : 'var(--cero)'} />
                                    @{!data?.instagram ? 'No definido' : data?.instagram}
                                </Grid>
                            </a>
                        }
                        {isSameEmail && <Grid sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px' }}><Cash color={light ? 'var(--dark2)' : 'var(--cero)'} /> {formatoPesosArgentinos(data?.banco_fondo)}</Grid>}
                        {isUserAdmin && <Grid sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px' }}><Cash color={light ? 'var(--dark2)' : 'var(--cero)'} /> {formatoPesosArgentinos(data?.banco_fondo)}</Grid>}
                    </Grid>
                </Grid>
                <Grid sx={{ display: 'flex', flexDirection: 'column', color: light ? 'var(--dark2)' : 'var(--neutral)', fontSize: !mobile ? '20px' : '14px' }}>
                    <Grid sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px' }}><Categoria color={light ? 'var(--dark2)' : 'var(--cero)'} />categoria: {!data?.categoria ? 'No definido' : data?.categoria}</Grid>
                    <Grid sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px' }}><Estadio color={light ? 'var(--dark2)' : 'var(--cero)'} />Estadio: {!data?.estadio ? 'No definido' : data?.estadio}</Grid>
                    <Grid sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px' }}><Delegado color={light ? 'var(--dark2)' : 'var(--cero)'} />
                        delegado:
                        {data?.delegado.length === 0 ? ' No definido' : ' ' + data?.delegado[0].name}
                        {isUserAdmin && (data?.delegado.length > 0) &&
                            <Tooltip title="Elimina el delegado" placement="top">
                                <Grid sx={{ cursor: 'pointer' }} onClick={() => { eliminarDelegados(equipo_id, data?.delegado[0]._id, eliminarDelegado, queryClient) }}>
                                    <Borrar size={20} color={'var(--danger)'} />
                                </Grid>
                            </Tooltip>}
                        {isUserAdmin && (data?.delegado.length > 0) &&
                            <Tooltip title="Editar el delegado" placement="top">
                                <Grid sx={{ cursor: 'pointer' }} onClick={() => { seleccionarData(data?.delegado, setDelegadoSeleccionado, setModalDelegadoEditar) }}>
                                    <Editar size={20} />
                                </Grid>
                            </Tooltip>}
                        <Tooltip title="Contactar al delegado del equipo" placement="top">
                            <Grid sx={{ cursor: 'pointer' }} onClick={() => { seleccionarData(data?.delegado, setDelegadoSeleccionado, setModalDelegadoChat) }}>
                                <Chat size={20} />
                            </Grid>
                        </Tooltip>
                    </Grid>
                </Grid>
                <Grid sx={{ display: 'flex', flexDirection: 'column', color: light ? 'var(--dark2)' : 'var(--neutral)', fontSize: !mobile ? '20px' : '14px' }}>
                    <Grid sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px' }}><Tarjeta color={'var(--warnning)'} />tarjetas amarillas:{data?.tarjetasAmarillas}</Grid>
                    <Grid sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px' }}><Tarjeta color={'var(--danger)'} />tarjetas rojas: {data?.tarjetasRojas}</Grid>
                    <Grid sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px' }}><Puntos color={light ? 'var(--dark2)' : 'var(--cero)'} />puntos: {data?.puntos}</Grid>
                </Grid>
                <Grid sx={{ display: 'flex', flexDirection: 'column', color: light ? 'var(--dark2)' : 'var(--neutral)', fontSize: !mobile ? '20px' : '14px' }}>
                    <Grid sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px' }}><Empate color={light ? 'var(--dark2)' : 'var(--cero)'} />Empates:{data?.empates}</Grid>
                    <Grid sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px' }}><Ganado color={light ? 'var(--dark2)' : 'var(--cero)'} />Ganados: {data?.ganados}</Grid>
                    <Grid sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px' }}><Perdido color={light ? 'var(--dark2)' : 'var(--cero)'} />perdidos: {data?.perdidos}</Grid>
                </Grid>
                <Grid sx={{ display: 'flex', flexDirection: 'column', color: light ? 'var(--dark2)' : 'var(--neutral)', fontSize: !mobile ? '20px' : '14px' }}>
                    <Grid sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px' }}><Empate color={light ? 'var(--dark2)' : 'var(--cero)'} />Goles en total:{data?.goles_a_Favor}</Grid>
                    <Grid sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px' }}><Ganado color={light ? 'var(--dark2)' : 'var(--cero)'} />Goles en contra: {data?.goles_en_Contra}</Grid>
                    <Grid sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px' }}><Perdido color={light ? 'var(--dark2)' : 'var(--cero)'} />Diferencia de goles: {data?.diferencia_de_Goles}</Grid>
                </Grid>
            </Grid>
            <Grid mt={3} item container sx={{ height: 'min-content' }}>
                {opcionSelectEquipo.map(opcion => (
                    <MenuTabla opcion={opcion} valueSelect={value} handleChange={handleChange} />
                ))}
                <Grid container sx={{ borderBottom: light ? '2px solid var(--gris)' : '2px solid var(--neutral)', marginTop: '-10px' }}></Grid>
            </Grid>
            <SwipeableViews axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'} index={value} onChangeIndex={handleChangeIndex}>
                <TabPanel value={value} index={0} dir={theme.direction}>
                    <Grid item mt={1} mb={1} sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px' }}>
                        {isUserAdmin && <ButtonSend title={!mobile ?'Fichar jugador libre' : 'Jugador'} icon={CreatePlayer} disable={false} handle={() => { setModalJugador(!modalJugador) }} iconSize={20} iconColor={'var(--check)'} />}
                        {isUserAdmin && <ButtonSend title={!mobile ?'Fichar DT': 'DT'} icon={CreatePlayer} disable={data.director_tecnico.length > 0} handle={() => { setModalDT(!modalDT) }} iconSize={20} iconColor={'var(--check)'} />}
                        {isUserAdmin && <ButtonSend title={!mobile ?'Fichar Delegado': 'Delegado'} icon={CreatePlayer} disable={data?.delegado.length > 0} handle={() => { setModalDelegado(!modalDelegado) }} iconSize={20} iconColor={'var(--check)'} />}

                        {isSameEmail && <ButtonSend title={!mobile ?'Fichar jugador libre' : 'Jugador'} icon={CreatePlayer} disable={false} handle={() => { setModalJugador(!modalJugador) }} iconSize={20} iconColor={'var(--check)'} />}
                        {isSameEmail && <ButtonSend title={!mobile ?'Fichar DT': 'DT'} icon={CreatePlayer} disable={data.director_tecnico.length > 0} handle={() => { setModalDT(!modalDT) }} iconSize={20} iconColor={'var(--check)'} />}
                        {isSameEmail && <ButtonSend title={!mobile ?'Fichar Delegado': 'Delegado'} icon={CreatePlayer} disable={data?.delegado.length > 0} handle={() => { setModalDelegado(!modalDelegado) }} iconSize={20} iconColor={'var(--check)'} />}
                    </Grid>
                    <TablaPlantilla jugadores={filterLibreJugador(data.jugadores, 'No')} equipo={data} isLoading={isLoading} director_tecnico={data.director_tecnico} />
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                    <TablaEstadisticas jugadores={data.jugadores} label={'Goles'} isLoading={isLoading} goles={true} amarillas={false} asistencias={false} rojas={false} />
                </TabPanel>
                <TabPanel value={value} index={2} dir={theme.direction}>
                    <TablaEstadisticas jugadores={data.jugadores} label={'Asistencias'} isLoading={isLoading} asistencias={true} amarillas={false} goles={false} rojas={false} />
                </TabPanel>
                <TabPanel value={value} index={3} dir={theme.direction}>
                    <TablaEstadisticas jugadores={data.jugadores} label={'Tarjetas amarillas'} isLoading={isLoading} amarillas={true} asistencias={false} goles={false} rojas={false} />
                </TabPanel>
                <TabPanel value={value} index={4} dir={theme.direction}>
                    <TablaEstadisticas jugadores={data.jugadores} label={'Tarjetas rojas'} isLoading={isLoading} rojas={true} amarillas={false} asistencias={false} goles={false} />
                </TabPanel>
                <TabPanel value={value} index={5} dir={theme.direction}>
                    {isSameEmail && <TablaContratos jugadores={data.jugadores} isLoading={isLoading} equipoId={equipo_id}/>}
                    {isUserAdmin && <TablaContratos jugadores={data.jugadores} isLoading={isLoading} equipoId={equipo_id}/>}
                    {!isSameEmail && !isUserAdmin &&
                    <Grid mt={8} item sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '16px',
                        minWidth: !mobile ? '960px' : '100%',
                        height: mobile && '300px',
                        justifyContent: 'center',
                        color: light ? 'var(--dark2)' : 'var(--cero)'
                    }}>
                        {`Solo el administrador del  ${data.name} puede ver este panel`}
                    </Grid>}
                </TabPanel>
                <TabPanel value={value} index={6} dir={theme.direction}>
                    {user ? <TablaFichajes jugadores={data.jugadores} isLoading={isLoading} equipoId={equipo_id} data={data}/>
                    : <Grid mt={8} item sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '16px',
                        minWidth: !mobile ? '960px' : '100%',
                        height: mobile && '300px',
                        justifyContent: 'center',
                        color: light ? 'var(--dark2)' : 'var(--cero)'
                    }}>
                        {`Solo los usuarios pueden ver este panel`}
                    </Grid>}
                </TabPanel>
                <TabPanel value={value} index={7} dir={theme.direction}>
                    {isSameEmail && <TablaInscripcion jugadores={data.jugadores} isLoading={isLoading} equipoId={equipo_id}/>}
                    {isUserAdmin && <TablaInscripcion jugadores={data.jugadores} isLoading={isLoading} equipoId={equipo_id}/>}
                    {!isSameEmail && !isUserAdmin &&
                    <Grid mt={8} item sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '16px',
                        minWidth: !mobile ? '960px' : '100%',
                        height: mobile && '300px',
                        justifyContent: 'center',
                        color: light ? 'var(--dark2)' : 'var(--cero)'
                    }}>
                        {`Solo el administrador del  ${data.name} puede ver este panel`}
                    </Grid>}
                </TabPanel>
            </SwipeableViews>
            {modalJugador && <ModalCrearJugador open={modalJugador} setOpen={setModalJugador} id={data?._id} />}
            {modalDT && <ModalDT open={modalDT} setOpen={setModalDT} id={data?._id} />}
            {modalDelegado && <ModalDelegado open={modalDelegado} setOpen={setModalDelegado} id={data?._id} />}
            {delegadoSeleccionado && <ModalDelegadoEditar open={modalDelegadoEditar} setOpen={setModalDelegadoEditar} id={data?._id} data={data?.delegado[0]} />}
            {delegadoSeleccionado && <ModalChatDelegado open={modalDelegadoChat} setOpen={setModalDelegadoChat} data={data?.delegado[0]} />}
        </>
    )
}