import { Button, CircularProgress, Grid, useMediaQuery } from '@mui/material';
import Collapse from '@mui/material/Collapse';
import moment from 'moment';
import { useContext, useEffect, useState } from 'react';
import Context from '../../context/contextPrincipal';
import { ButtonStatus } from './ButtonStatus';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { GiSoccerBall as Gol } from 'react-icons/gi';
import { TbRectangleVertical as Tarjeta } from 'react-icons/tb';
import { GiSoccerKick as Asistir } from 'react-icons/gi';
import { BsFillStarFill as Figura } from 'react-icons/bs';
import { useMutation, useQueryClient } from 'react-query';
import { calcularDatosPartido, edit_autogol, jugadoresPut_amarillas, jugadoresPut_asistencias, jugadoresPut_azul, jugadoresPut_figura, jugadoresPut_gol, jugadoresPut_rojas, jugadoresPut_suspencion } from '../../service/jugadores';
import { status } from '../../utils/utils';
import { datosDelPartidoHome, editarAmarilla, editarAsistencia, editarAutoGol, editarAzul, editarFigura, editarGoles, editarRoja, editarSuspencion } from '../../utils/utilsPanelJugadores';
import { anularAmarilla, anularAsistencia, anularAutoGol, anularAzul, anularFigura, anularGoles, anularRoja } from '../../utils/utilsPanelAnular';
import Tooltip from '@mui/material/Tooltip';
import { FaListAlt as Lista } from 'react-icons/fa';
import { ModalLista } from '../modals/ModalLista';

export const PanelRow = ({ homeTeam, awayTeam, currentRound, isLoading, index, data }) => {
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });
    const [light] = useContext(Context);
    const [showImage, setShowImage] = useState(false);
    const [open, setOpen] = useState(false);
    const [hoy, setHoy] = useState(moment())
    const [minutosTranscurridos, setMinutosTranscurridos] = useState(0);
    const fecha_home = homeTeam?.fecha[currentRound];
    const arbitro_home = homeTeam?.arbitro[currentRound];
    const formatoFecha = moment(fecha_home, 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY');
    const formatoHora = moment(fecha_home, 'YYYY-MM-DD HH:mm:ss').format('HH:mm a');
    const gol_home = homeTeam?.gol_partido[currentRound];
    const gol_away = awayTeam?.gol_partido[currentRound];
    const fechaBD = moment(fecha_home, 'YYYY-MM-DD HH:mm:ss')
    const TIEMPO_PARTIDO = 55;
    const tiempoRestante = fechaBD.diff(hoy, 'minutes') + TIEMPO_PARTIDO;
    const fechaFinalPartido = fechaBD.clone().add(TIEMPO_PARTIDO, 'minutes');
    const { mutate: editarGol } = useMutation(jugadoresPut_gol);
    const { mutate: calcularDatosPartidos } = useMutation(calcularDatosPartido);
    const { mutate: editarAmarillas } = useMutation(jugadoresPut_amarillas);
    const { mutate: editarRojas } = useMutation(jugadoresPut_rojas);
    const { mutate: editarAzules } = useMutation(jugadoresPut_azul);
    const { mutate: editarAsistencias } = useMutation(jugadoresPut_asistencias);
    const { mutate: editarFiguras } = useMutation(jugadoresPut_figura);
    const { mutate: editarAutogoles } = useMutation(edit_autogol);
    const { mutate: editarSuspendido } = useMutation(jugadoresPut_suspencion);
    const queryClient = useQueryClient();
    const [isLoadinng, setIsLoadinng] = useState(false);
    const [modalLista, setModalLista] = useState(false);
    const [modalListaAway, setModalListaAway] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {
            setHoy(moment());
        }, 5000);
        return () => {
            clearInterval(timer);
        };
    }, [hoy]);

    useEffect(() => {
        const tiempoRestante = fechaBD.diff(hoy, "minutes") + TIEMPO_PARTIDO;
        const minutos = TIEMPO_PARTIDO - tiempoRestante;
        setMinutosTranscurridos(minutos);
    }, [hoy]);

    useEffect(() => {
        if (!isLoading) {
            const timeoutId = setTimeout(() => {
                setShowImage(true);
            }, 2000);
            return () => clearTimeout(timeoutId);
        }
    }, [isLoading]);

    const filterPartido = (array, partido, index) => {
        const newFilter = array.filter((data) => data.partidos_individual[index] === partido);
        return newFilter;
    };
    
    return (
    <>
        <Grid item gap={!mobile ? 4 : 0} container width={'100%'} flexDirection={'row'} alignItems={'center'} sx={{ padding: '20px' }}>
            <Grid item>
                <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)} sx={{ color: light ? 'black' : 'var(--cero)' }}>
                    {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
            </Grid>
            <Grid item sx={{ color: light ? 'var(--dark2)' : 'var(--cero)' }}>
                <Grid item width={!mobile ? '110px' : '80px'} container flexDirection={'column'} alignItems={'center'} justifyContent={'center'}>
                    <Grid item>Partido {index + 1}</Grid>
                    <Grid item sx={{ fontSize: !mobile ? '16px' : '14px' }}>{homeTeam?.fecha[currentRound] === 'No definido' ? 'No definido' : formatoFecha}</Grid>
                    <Grid item sx={{ fontSize: !mobile ? '12px' : '10px' }}>{homeTeam?.fecha[currentRound] === 'No definido' ? 'No definida' : formatoHora}</Grid>
                </Grid>
            </Grid>
            <Grid container width={!mobile ? '470px' : '210px'} flexDirection={'row'} alignItems={'center'} sx={{ color: light ? 'var(--dark2)' : 'var(--cero)' }}>
                {!mobile &&
                    <Grid item container alignItems={'center'} justifyContent={'end'} sx={{ whiteSpace: 'nowrap', width: '130px' }}>
                        {homeTeam?.name}
                    </Grid>}
                <Grid item container alignItems={'center'} justifyContent={'center'} sx={{ width: '55px', height: '35px' }}>
                    {isLoading || !showImage ?
                        (<CircularProgress style={{ color: light ? 'var(--dark2)' : 'var(--cero)' }} size={20} />)
                        : showImage ? <img style={{ height: '30px' }} src={homeTeam?.logo} alt={homeTeam?.name} />
                            : null}
                </Grid>
                <Grid item>
                    <ButtonStatus status={status(hoy, fechaFinalPartido, tiempoRestante, TIEMPO_PARTIDO)} gol_away={gol_away} gol_home={gol_home} minutosTranscurridos={minutosTranscurridos} />
                </Grid>
                <Grid item container alignItems={'center'} justifyContent={'center'} sx={{ width: '55px', height: '35px' }}>
                    {isLoading || !showImage ?
                        (<CircularProgress style={{ color: light ? 'var(--dark2)' : 'var(--cero)' }} size={20} />)
                        : showImage ? <img style={{ height: '30px' }} src={awayTeam?.logo} alt={awayTeam?.name} />
                            : null}
                </Grid>
                {!mobile &&
                    <Grid item container alignItems={'center'} sx={{ whiteSpace: 'nowrap', width: '130px' }}>
                        {awayTeam?.name}
                    </Grid>}
            </Grid>
        </Grid>
        <Collapse in={open} timeout="auto" unmountOnExit>
            <Grid p={5}>
                <Tooltip title="Calcular los datos del partidos, se recomienda usarlo despues de terminado" placement="top">
                <Button sx={{ color: 'var(--primario)', marginBottom:'10px' }}
                    disabled={
                        status(hoy, fechaFinalPartido, tiempoRestante, TIEMPO_PARTIDO) === 'noEmpezado' ||
                        (status(hoy, fechaFinalPartido, tiempoRestante, TIEMPO_PARTIDO) === 'fechaInvalida') ||
                        (status(hoy, fechaFinalPartido, tiempoRestante, TIEMPO_PARTIDO) === 'finPartido' && tiempoRestante <= -5) 
                    }
                    onClick={()=> {datosDelPartidoHome(
                        homeTeam._id,
                        homeTeam.partidosJugados,
                        homeTeam.gol_partido[currentRound],
                        awayTeam.gol_partido[currentRound],
                        homeTeam.ganados,
                        homeTeam.empates,
                        homeTeam.perdidos,
                        homeTeam.goles_en_Contra,
                        homeTeam.goles_a_Favor,
                        homeTeam.puntos,
                        homeTeam.last5,
                        currentRound,
                        setIsLoadinng,
                        data,
                        calcularDatosPartidos,
                        queryClient
                    ),datosDelPartidoHome(
                        awayTeam._id,
                        awayTeam.partidosJugados,
                        awayTeam.gol_partido[currentRound],
                        homeTeam.gol_partido[currentRound],
                        awayTeam.ganados,
                        awayTeam.empates,
                        awayTeam.perdidos,
                        awayTeam.goles_en_Contra,
                        awayTeam.goles_a_Favor,
                        awayTeam.puntos,
                        awayTeam.last5,
                        currentRound,
                        setIsLoadinng,
                        data,
                        calcularDatosPartidos,
                        queryClient
                    ),
                    homeTeam?.jugadores.forEach(jugador => {
                        editarSuspencion(
                        homeTeam._id,
                        jugador._id,
                        jugador.suspendido,
                        jugador.name,
                        jugador.jornadas_suspendido,
                        setIsLoadinng,
                        editarSuspendido,
                        queryClient,
                        jugador.tarjetas_acumuladas
                        );}),
                        awayTeam?.jugadores.forEach(jugador => {
                            editarSuspencion(
                            awayTeam._id,
                            jugador._id,
                            jugador.suspendido,
                            jugador.name,
                            jugador.jornadas_suspendido,
                            setIsLoadinng,
                            editarSuspendido,
                            queryClient,
                            jugador.tarjetas_acumuladas
                            );});
                }}>
                    Calcular partido
                </Button>
                </Tooltip>
                <Grid container gap={6}>
                    <Grid item>
                        <Grid container gap={2} flexDirection={'row'} alignItems={'center'}>
                            <Tooltip title="Autogol: sumara un gol pero no es de ningun jugador de la plantilla" placement="top">
                            <Button sx={{ color:light? 'var(--primario)': 'var(--cero)', marginBottom:'10px', gap:'6px' }}
                                onClick={()=>{editarAutoGol(
                                    homeTeam._id,
                                    1,
                                    currentRound,
                                    homeTeam.gol_partido[currentRound],
                                    homeTeam.autogol_partido[currentRound],
                                    homeTeam.goles_a_Favor,
                                    homeTeam.gol_partido,
                                    homeTeam.autogol_partido,
                                    setIsLoadinng,
                                    editarAutogoles,
                                    queryClient
                                )}}>
                                Auto gol <Gol/>
                            </Button>
                            </Tooltip>
                            <Tooltip title="Anulara el autogol del partido" placement="top">
                            <Button sx={{ color:'var(--danger)', marginBottom:'10px', gap:'6px' }}
                                disabled={homeTeam.autogol_partido[currentRound] === 0}
                                onClick={()=>{anularAutoGol(
                                    homeTeam._id,
                                    1,
                                    currentRound,
                                    homeTeam.gol_partido[currentRound],
                                    homeTeam.autogol_partido[currentRound],
                                    homeTeam.goles_a_Favor,
                                    homeTeam.gol_partido,
                                    homeTeam.autogol_partido,
                                    setIsLoadinng,
                                    editarAutogoles,
                                    queryClient
                                )}}>
                                - Anular auto gol <Gol/>
                            </Button>
                            </Tooltip>
                            <Tooltip title="Lista de convocados: podes pasar lista y verificar jugadores" placement="top">
                            <Button sx={{ color:'var(--primario)', marginBottom:'10px', gap:'6px' }}
                                onClick={()=>{
                                    setModalLista(!modalLista)
                                }}>
                                Convocados <Lista/>
                            </Button>
                            </Tooltip>
                        </Grid>
                        <Grid mb={2} item sx={{ background: 'var(--primario)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--cero)', padding: '2px' }}>{homeTeam?.name}</Grid>
                        {filterPartido(homeTeam?.director_tecnico,'Si',currentRound).map((dt)=>{
                            return(
                                <>
                                <Grid mt={1} item gap={2} sx={{ color: light ? 'var(--dark2)' : 'var(--gris)', display:'flex', flexDirection:!mobile ?'row':'column', alignItems:'center', background: dt.suspendido === 'Si' ? 'var(--danger2)' : dt.azul_partido[currentRound] === 1 ? 'var(--primario2)' : dt.amarilla_partido[currentRound] === 1 ? 'var(--warnning2)' : '', borderRadius:'8px' }}>
                                    <Grid item sx={{display:'flex', gap:'8px'}}>
                                        <Grid item sx={{ fontSize: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', fontWeight: 600 }}>..DT</Grid>
                                        <Grid item width={!mobile?'250px':'150px'} sx={{ cursor: 'pointer', display: 'flex', alignItems:'center', gap:'6px', justifyContent:mobile && 'center' }}>{dt.name} {dt.figura_partido[currentRound] === 1 && <Figura style={{color:'var(--warnning)'}}/>}</Grid>
                                    </Grid>
                                    <Grid item container flexDirection={'column'} alignItems={'center'}>
                                        <Grid item container flexDirection={'row'} alignItems={'center'} gap={mobile ?2: 3} p={1} sx={{borderBottom:light ? '1px solid var(--dark3)' :'1px solid var(--cero)',justifyContent:mobile && 'center'}}>
                                            <Tooltip title="Tarjeta amarilla" placement="top">
                                                <Grid item sx={{ cursor: 'pointer' }}
                                                    onClick={()=>{}}>
                                                    <Tarjeta color={'var(--warnning)'} />
                                                </Grid>
                                            </Tooltip>
                                            <Tooltip title="Tarjeta roja" placement="top">
                                                <Grid item sx={{ cursor: 'pointer' }}
                                                    onClick={()=>{ }}>
                                                    <Tarjeta color={'var(--danger)'} />
                                                </Grid>
                                            </Tooltip>
                                            <Tooltip title="Tarjeta azul" placement="top">
                                                <Grid item sx={{ cursor: 'pointer' }}
                                                    onClick={()=>{ }}>
                                                    <Tarjeta color={'var(--primario)'} />
                                                </Grid>
                                            </Tooltip>
                                            <Tooltip title="Director tecnico figura" placement="top">
                                                <Grid item sx={{ cursor: 'pointer','&:hover':{color:light?'var(--neutral)':'var(--dark3)'} }}
                                                    onClick={()=>{ }}>
                                                    <Figura/>
                                                </Grid>
                                            </Tooltip>
                                        </Grid>
                                        <Grid item container flexDirection={'row'} alignItems={'center'} gap={mobile ?2: 3} p={1} sx={{justifyContent:mobile && 'center'}} >
                                            <Tooltip title="Anular tarjeta amarilla" placement="top">
                                                <Grid item sx={{ cursor: 'pointer' }}
                                                    onClick={()=>{ }}>
                                                    <Tarjeta color={'var(--warnning)'} />
                                                </Grid>
                                            </Tooltip>
                                            <Tooltip title="Anular tarjeta roja" placement="top">
                                                <Grid item sx={{ cursor: 'pointer' }}
                                                    onClick={()=>{ }}>
                                                    <Tarjeta color={'var(--danger)'} />
                                                </Grid>
                                            </Tooltip>
                                            <Tooltip title="Anular tarjeta azul" placement="top">
                                                <Grid item sx={{ cursor: 'pointer' }}
                                                    onClick={()=>{ }}>
                                                    <Tarjeta color={'var(--primario)'} />
                                                </Grid>
                                            </Tooltip>
                                            <Tooltip title="Anular director tecnico figura" placement="top">
                                                <Grid item sx={{ cursor: 'pointer',color:'var(--danger)','&:hover':{color:light?'var(--neutral)':'var(--dark3)'} }}
                                                    onClick={()=>{ }}>
                                                    <Figura/>
                                                </Grid>
                                            </Tooltip>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item sx={{borderTop:light ? '1px solid var(--dark3)' :'1px solid var(--cero)'}}></Grid>
                                </>
                            )
                        })}
                        {filterPartido(homeTeam?.jugadores,'Si',currentRound).map((jugador, index) => {
                            return (
                                <>
                                <Grid mt={1} item gap={2} sx={{ color: light ? 'var(--dark2)' : 'var(--gris)', display:'flex', flexDirection:!mobile ?'row':'column', alignItems:'center', background: jugador.suspendido === 'Si' ? 'var(--danger2)' : jugador.azul_partido_individual[currentRound] === 1 ? 'var(--primario2)' : jugador.amarilla_partido_individual[currentRound] === 1 ? 'var(--warnning2)' : '', borderRadius:'8px' }}>
                                    <Grid item sx={{display:'flex', gap:'8px'}}>
                                        <Grid item sx={{ fontSize: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', fontWeight: 600 }}>#{jugador.dorsal}</Grid>
                                        <Grid item width={!mobile?'250px':'150px'} sx={{ cursor: 'pointer', display: 'flex', alignItems:'center', gap:'6px', justifyContent:mobile && 'center' }}>{jugador.name} {jugador.jugador_figura_individual[currentRound] === 1 && <Figura style={{color:'var(--warnning)'}}/>} </Grid>
                                    </Grid>
                                    <Grid item container flexDirection={'column'} alignItems={'center'}>
                                        <Grid item container flexDirection={'row'} alignItems={'center'} gap={mobile ?2: 3} p={1} sx={{borderBottom:light ? '1px solid var(--dark3)' :'1px solid var(--cero)',justifyContent:mobile && 'center'}}>
                                            <Tooltip title="Gol" placement="top">
                                            <Grid item sx={{ cursor: 'pointer','&:hover':{color:light?'var(--neutral)':'var(--dark3)'} }} 
                                                onClick={() => { editarGoles(
                                                    homeTeam._id, 
                                                    jugador._id, 
                                                    1,
                                                    currentRound, 
                                                    jugador.gol_partido_individual[currentRound], 
                                                    jugador.name, 
                                                    jugador.goles, 
                                                    homeTeam.gol_partido[currentRound],
                                                    homeTeam.goles_a_Favor, 
                                                    homeTeam.jugadores[index].gol_partido_individual,
                                                    homeTeam.gol_partido,
                                                    setIsLoadinng,
                                                    editarGol,
                                                    queryClient
                                                )}}>
                                                <Gol />
                                            </Grid>
                                            </Tooltip>
                                            <Tooltip title="Asistencia" placement="top">
                                            <Grid item sx={{ cursor: 'pointer','&:hover':{color:light?'var(--neutral)':'var(--dark3)'} }}
                                                onClick={()=>{editarAsistencia(
                                                    homeTeam._id, 
                                                    jugador._id, 
                                                    currentRound,
                                                    jugador.asistencia_partido_individual[currentRound],
                                                    jugador.name, 
                                                    jugador.asistencias,
                                                    homeTeam.jugadores[index].asistencia_partido_individual,
                                                    setIsLoadinng,
                                                    editarAsistencias,
                                                    queryClient
                                                )}}>
                                                <Asistir />
                                            </Grid>
                                            </Tooltip>
                                            <Tooltip title="Tarjeta amarilla" placement="top">
                                            <Grid item sx={{ cursor: 'pointer' }}
                                                onClick={()=>{ editarAmarilla(
                                                    homeTeam._id, 
                                                    jugador._id, 
                                                    1,
                                                    currentRound,
                                                    jugador.amarilla_partido_individual[currentRound],
                                                    jugador.name, 
                                                    jugador.tarjetas_amarillas,
                                                    homeTeam.tarjetasAmarillas,
                                                    homeTeam.jugadores[index].amarilla_partido_individual,
                                                    homeTeam.jugadores[index].roja_partido_individual,
                                                    jugador.roja_partido_individual[currentRound],
                                                    homeTeam.tarjetasRojas,
                                                    jugador.tarjetas_roja,
                                                    jugador.suspendido,
                                                    jugador.suspendido_numero,
                                                    setIsLoadinng,
                                                    editarAmarillas,
                                                    queryClient,
                                                    jugador.tarjetas_acumuladas
                                                )}}>
                                                <Tarjeta color={'var(--warnning)'} />
                                            </Grid>
                                            </Tooltip>
                                            <Tooltip title="Tarjeta roja" placement="top">
                                            <Grid item sx={{ cursor: 'pointer' }}
                                                onClick={()=>{ editarRoja(
                                                    homeTeam._id, 
                                                    jugador._id, 
                                                    currentRound,
                                                    jugador.roja_partido_individual[currentRound],
                                                    jugador.name, 
                                                    jugador.tarjetas_roja,
                                                    homeTeam.tarjetasRojas,
                                                    homeTeam.jugadores[index].roja_partido_individual,
                                                    jugador.suspendido_numero,
                                                    setIsLoadinng,
                                                    editarRojas,
                                                    queryClient
                                                )}}>
                                                <Tarjeta color={'var(--danger)'} />
                                            </Grid>
                                            </Tooltip>
                                            <Tooltip title="Tarjeta azul" placement="top">
                                            <Grid item sx={{ cursor: 'pointer' }}
                                                onClick={()=>{ editarAzul(
                                                    homeTeam._id, 
                                                    jugador._id, 
                                                    currentRound,
                                                    jugador.azul_partido_individual[currentRound],
                                                    jugador.name, 
                                                    jugador.tarjetas_azul,
                                                    homeTeam.jugadores[index].azul_partido_individual,
                                                    setIsLoadinng,
                                                    editarAzules,
                                                    queryClient
                                                )}}>
                                                <Tarjeta color={'var(--primario)'} />
                                            </Grid>
                                            </Tooltip>
                                            <Tooltip title="Jugador figura" placement="top">
                                            <Grid item sx={{ cursor: 'pointer','&:hover':{color:light?'var(--neutral)':'var(--dark3)'} }}
                                                onClick={()=>{ editarFigura(
                                                    homeTeam._id, 
                                                    jugador._id, 
                                                    currentRound,
                                                    jugador.jugador_figura_individual[currentRound],
                                                    jugador.name, 
                                                    jugador.figura,
                                                    homeTeam.jugadores[index].jugador_figura_individual,
                                                    setIsLoadinng,
                                                    editarFiguras,
                                                    queryClient
                                                )}}>
                                                <Figura/>
                                            </Grid>
                                            </Tooltip>
                                        </Grid>
                                        <Grid item container flexDirection={'row'} alignItems={'center'} gap={mobile ?2: 3} p={1} sx={{justifyContent:mobile && 'center'}} >
                                            <Tooltip title="Anular gol" placement="top">
                                            <Grid item sx={{ cursor: 'pointer',color:'var(--danger)','&:hover':{color:light?'var(--neutral)':'var(--dark3)'} }}
                                                onClick={()=>{ anularGoles(
                                                    homeTeam._id,
                                                    jugador._id,
                                                    1,
                                                    currentRound,
                                                    jugador.gol_partido_individual[currentRound], 
                                                    jugador.name, 
                                                    jugador.goles,
                                                    homeTeam.gol_partido[currentRound],
                                                    homeTeam.goles_a_Favor, 
                                                    homeTeam.jugadores[index].gol_partido_individual,
                                                    homeTeam.gol_partido,
                                                    setIsLoadinng,
                                                    editarGol,
                                                    queryClient 
                                                )}}>
                                                <Gol />
                                            </Grid>
                                            </Tooltip>
                                            <Tooltip title="Anular asistencia" placement="top">
                                            <Grid item sx={{ cursor: 'pointer',color:'var(--danger)','&:hover':{color:light?'var(--neutral)':'var(--dark3)'} }}
                                                onClick={()=>{anularAsistencia(
                                                    homeTeam._id, 
                                                    jugador._id, 
                                                    currentRound,
                                                    jugador.asistencia_partido_individual[currentRound],
                                                    jugador.name, 
                                                    jugador.asistencias,
                                                    homeTeam.jugadores[index].asistencia_partido_individual,
                                                    setIsLoadinng,
                                                    editarAsistencias,
                                                    queryClient
                                                )}}>
                                                <Asistir />
                                            </Grid>
                                            </Tooltip>
                                            <Tooltip title="Anular tarjeta amarilla" placement="top">
                                            <Grid item sx={{ cursor: 'pointer' }}
                                                onClick={()=>{ anularAmarilla(
                                                    homeTeam._id, 
                                                    jugador._id, 
                                                    1,
                                                    currentRound,
                                                    jugador.amarilla_partido_individual[currentRound],
                                                    jugador.name, 
                                                    jugador.tarjetas_amarillas,
                                                    homeTeam.tarjetasAmarillas,
                                                    homeTeam.jugadores[index].amarilla_partido_individual,
                                                    homeTeam.jugadores[index].roja_partido_individual,
                                                    jugador.roja_partido_individual[currentRound],
                                                    homeTeam.tarjetasRojas,
                                                    jugador.tarjetas_roja,
                                                    jugador.suspendido,
                                                    jugador.suspendido_numero,
                                                    setIsLoadinng,
                                                    editarAmarillas,
                                                    queryClient,
                                                    jugador.tarjetas_acumuladas
                                                )}}>
                                                <Tarjeta color={'var(--warnning)'} />
                                            </Grid>
                                            </Tooltip>
                                            <Tooltip title="Anular tarjeta roja" placement="top">
                                            <Grid item sx={{ cursor: 'pointer' }}
                                                onClick={()=>{ anularRoja(
                                                    homeTeam._id, 
                                                    jugador._id, 
                                                    currentRound,
                                                    jugador.roja_partido_individual[currentRound],
                                                    jugador.name, 
                                                    jugador.tarjetas_roja,
                                                    homeTeam.tarjetasRojas,
                                                    homeTeam.jugadores[index].roja_partido_individual,
                                                    jugador.suspendido_numero,
                                                    setIsLoadinng,
                                                    editarRojas,
                                                    queryClient
                                                )}}>
                                                <Tarjeta color={'var(--danger)'} />
                                            </Grid>
                                            </Tooltip>
                                            <Tooltip title="Anular tarjeta azul" placement="top">
                                            <Grid item sx={{ cursor: 'pointer' }}
                                                onClick={()=>{ anularAzul(
                                                    homeTeam._id, 
                                                    jugador._id, 
                                                    currentRound,
                                                    jugador.azul_partido_individual[currentRound],
                                                    jugador.name, 
                                                    jugador.tarjetas_azul,
                                                    homeTeam.jugadores[index].azul_partido_individual,
                                                    setIsLoadinng,
                                                    editarAzules,
                                                    queryClient
                                                )}}>
                                                <Tarjeta color={'var(--primario)'} />
                                            </Grid>
                                            </Tooltip>
                                            <Tooltip title="Anular jugador figura" placement="top">
                                            <Grid item sx={{ cursor: 'pointer',color:'var(--danger)','&:hover':{color:light?'var(--neutral)':'var(--dark3)'} }}
                                                onClick={()=>{ anularFigura(
                                                    homeTeam._id, 
                                                    jugador._id, 
                                                    currentRound,
                                                    jugador.jugador_figura_individual[currentRound],
                                                    jugador.name, 
                                                    jugador.figura,
                                                    homeTeam.jugadores[index].jugador_figura_individual,
                                                    setIsLoadinng,
                                                    editarFiguras,
                                                    queryClient
                                                )}}>
                                                <Figura/>
                                            </Grid>
                                            </Tooltip>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item sx={{borderTop:light ? '1px solid var(--dark3)' :'1px solid var(--cero)'}}></Grid>
                                </>
                                )
                            })}
                    </Grid>
                    <Grid item>
                        <Tooltip title="Autogol: sumara un gol pero no es de ningun jugador de la plantilla" placement="top">
                        <Button sx={{ color:light? 'var(--primario)': 'var(--cero)', marginBottom:'10px', gap:'6px' }}
                            onClick={()=>{editarAutoGol(
                                awayTeam._id,
                                1,
                                currentRound,
                                awayTeam.gol_partido[currentRound],
                                awayTeam.autogol_partido[currentRound],
                                awayTeam.goles_a_Favor,
                                awayTeam.gol_partido,
                                awayTeam.autogol_partido,
                                setIsLoadinng,
                                editarAutogoles,
                                queryClient
                            )}}>
                            Auto gol <Gol/>
                        </Button>
                        </Tooltip>
                        <Tooltip title="Anulara el autogol del partido" placement="top">
                        <Button sx={{ color:'var(--danger)', marginBottom:'10px', gap:'6px' }}
                            disabled={awayTeam.autogol_partido[currentRound] === 0}
                            onClick={()=>{anularAutoGol(
                                awayTeam._id,
                                1,
                                currentRound,
                                awayTeam.gol_partido[currentRound],
                                awayTeam.autogol_partido[currentRound],
                                awayTeam.goles_a_Favor,
                                awayTeam.gol_partido,
                                awayTeam.autogol_partido,
                                setIsLoadinng,
                                editarAutogoles,
                                queryClient
                            )}}>
                            - Anular auto gol <Gol/>
                        </Button>
                        </Tooltip>
                        <Tooltip title="Lista de convocados: podes pasar lista y verificar jugadores" placement="top">
                            <Button sx={{ color:'var(--primario)', marginBottom:'10px', gap:'6px' }}
                                onClick={()=>{
                                    setModalListaAway(!modalListaAway)
                                }}>
                                Convocados <Lista/>
                            </Button>
                            </Tooltip>
                        <Grid mb={2} item sx={{ background: 'var(--check)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--cero)', padding: '2px' }}>{awayTeam?.name}</Grid>
                        {filterPartido(awayTeam?.director_tecnico,'Si',currentRound).map((dt)=>{
                            return(
                                <>
                                <Grid mt={1} item gap={2} sx={{ color: light ? 'var(--dark2)' : 'var(--gris)', display:'flex', flexDirection:!mobile ?'row':'column', alignItems:'center', background: dt.suspendido === 'Si' ? 'var(--danger2)' : dt.azul_partido[currentRound] === 1 ? 'var(--primario2)' : dt.amarilla_partido[currentRound] === 1 ? 'var(--warnning2)' : '', borderRadius:'8px' }}>
                                    <Grid item sx={{display:'flex', gap:'8px'}}>
                                        <Grid item sx={{ fontSize: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', fontWeight: 600 }}>..DT</Grid>
                                        <Grid item width={!mobile?'250px':'150px'} sx={{ cursor: 'pointer', display: 'flex', alignItems:'center', gap:'6px', justifyContent:mobile && 'center' }}>{dt.name} {dt.figura_partido[currentRound] === 1 && <Figura style={{color:'var(--warnning)'}}/>}</Grid>
                                    </Grid>
                                    <Grid item container flexDirection={'column'} alignItems={'center'}>
                                        <Grid item container flexDirection={'row'} alignItems={'center'} gap={mobile ?2: 3} p={1} sx={{borderBottom:light ? '1px solid var(--dark3)' :'1px solid var(--cero)',justifyContent:mobile && 'center'}}>
                                            <Tooltip title="Tarjeta amarilla" placement="top">
                                                <Grid item sx={{ cursor: 'pointer' }}
                                                    onClick={()=>{}}>
                                                    <Tarjeta color={'var(--warnning)'} />
                                                </Grid>
                                            </Tooltip>
                                            <Tooltip title="Tarjeta roja" placement="top">
                                                <Grid item sx={{ cursor: 'pointer' }}
                                                    onClick={()=>{ }}>
                                                    <Tarjeta color={'var(--danger)'} />
                                                </Grid>
                                            </Tooltip>
                                            <Tooltip title="Tarjeta azul" placement="top">
                                                <Grid item sx={{ cursor: 'pointer' }}
                                                    onClick={()=>{ }}>
                                                    <Tarjeta color={'var(--primario)'} />
                                                </Grid>
                                            </Tooltip>
                                            <Tooltip title="Director tecnico figura" placement="top">
                                                <Grid item sx={{ cursor: 'pointer','&:hover':{color:light?'var(--neutral)':'var(--dark3)'} }}
                                                    onClick={()=>{ }}>
                                                    <Figura/>
                                                </Grid>
                                            </Tooltip>
                                        </Grid>
                                        <Grid item container flexDirection={'row'} alignItems={'center'} gap={mobile ?2: 3} p={1} sx={{justifyContent:mobile && 'center'}} >
                                            <Tooltip title="Anular tarjeta amarilla" placement="top">
                                                <Grid item sx={{ cursor: 'pointer' }}
                                                    onClick={()=>{ }}>
                                                    <Tarjeta color={'var(--warnning)'} />
                                                </Grid>
                                            </Tooltip>
                                            <Tooltip title="Anular tarjeta roja" placement="top">
                                                <Grid item sx={{ cursor: 'pointer' }}
                                                    onClick={()=>{ }}>
                                                    <Tarjeta color={'var(--danger)'} />
                                                </Grid>
                                            </Tooltip>
                                            <Tooltip title="Anular tarjeta azul" placement="top">
                                                <Grid item sx={{ cursor: 'pointer' }}
                                                    onClick={()=>{ }}>
                                                    <Tarjeta color={'var(--primario)'} />
                                                </Grid>
                                            </Tooltip>
                                            <Tooltip title="Anular director tecnico figura" placement="top">
                                                <Grid item sx={{ cursor: 'pointer',color:'var(--danger)','&:hover':{color:light?'var(--neutral)':'var(--dark3)'} }}
                                                    onClick={()=>{ }}>
                                                    <Figura/>
                                                </Grid>
                                            </Tooltip>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item sx={{borderTop:light ? '1px solid var(--dark3)' :'1px solid var(--cero)'}}></Grid>
                                </>
                            )
                        })}
                        {filterPartido(awayTeam?.jugadores,'Si',currentRound).map((jugador, index) => {
                            return (
                                <>
                                <Grid mt={1} item gap={2} sx={{ color: light ? 'var(--dark2)' : 'var(--gris)', display:'flex', flexDirection:!mobile ?'row':'column', alignItems:'center', background: jugador.suspendido === 'Si' ? 'var(--danger2)' : jugador.azul_partido_individual[currentRound] === 1 ? 'var(--primario2)' : jugador.amarilla_partido_individual[currentRound] === 1 ? 'var(--warnning2)' : '', borderRadius:'8px' }}>
                                    <Grid item sx={{display:'flex', gap:'8px'}}>
                                        <Grid item sx={{ fontSize: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', fontWeight: 600 }}>#{jugador.dorsal}</Grid>
                                        <Grid item width={!mobile?'250px':'150px'} sx={{ cursor: 'pointer', display: 'flex', alignItems:'center', gap:'6px', justifyContent:mobile && 'center' }}>{jugador.name} {jugador.jugador_figura_individual[currentRound] === 1 && <Figura style={{color:'var(--warnning)'}}/>} </Grid>
                                    </Grid>
                                    <Grid item container flexDirection={'column'} alignItems={'center'}>
                                        <Grid item container flexDirection={'row'} alignItems={'center'} gap={mobile ?2: 3} p={1} sx={{borderBottom:light ? '1px solid var(--dark3)' :'1px solid var(--cero)',justifyContent:mobile && 'center'}}>
                                            <Tooltip title="Gol" placement="top">
                                            <Grid item sx={{ cursor: 'pointer','&:hover':{color:light?'var(--neutral)':'var(--dark3)'} }}
                                                onClick={()=>{ editarGoles(
                                                    awayTeam._id,
                                                    jugador._id,
                                                    1,
                                                    currentRound,
                                                    jugador.gol_partido_individual[currentRound], 
                                                    jugador.name, 
                                                    jugador.goles,
                                                    awayTeam.gol_partido[currentRound],
                                                    awayTeam.goles_a_Favor, 
                                                    awayTeam.jugadores[index].gol_partido_individual,
                                                    awayTeam.gol_partido,
                                                    setIsLoadinng,
                                                    editarGol,
                                                    queryClient 
                                                )}}>
                                                <Gol />
                                            </Grid>
                                            </Tooltip>
                                            <Tooltip title="Asistencia" placement="top">
                                            <Grid item sx={{ cursor: 'pointer','&:hover':{color:light?'var(--neutral)':'var(--dark3)'} }}
                                                onClick={()=>{ editarAsistencia(
                                                    awayTeam._id, 
                                                    jugador._id, 
                                                    currentRound,
                                                    jugador.asistencia_partido_individual[currentRound],
                                                    jugador.name, 
                                                    jugador.asistencias,
                                                    awayTeam.jugadores[index].asistencia_partido_individual,
                                                    setIsLoadinng,
                                                    editarAsistencias,
                                                    queryClient
                                                )}}>
                                                <Asistir />
                                            </Grid>
                                            </Tooltip>
                                            <Tooltip title="Tarjeta amarilla" placement="top">
                                            <Grid item sx={{ cursor: 'pointer' }}
                                                onClick={()=>{ editarAmarilla(
                                                    awayTeam._id, 
                                                    jugador._id, 
                                                    1,
                                                    currentRound,
                                                    jugador.amarilla_partido_individual[currentRound],
                                                    jugador.name, 
                                                    jugador.tarjetas_amarillas,
                                                    awayTeam.tarjetasAmarillas,
                                                    awayTeam.jugadores[index].amarilla_partido_individual,
                                                    awayTeam.jugadores[index].roja_partido_individual,
                                                    jugador.roja_partido_individual[currentRound],
                                                    awayTeam.tarjetasRojas,
                                                    jugador.tarjetas_roja,
                                                    jugador.suspendido,
                                                    jugador.suspendido_numero,
                                                    setIsLoadinng,
                                                    editarAmarillas,
                                                    queryClient,
                                                    jugador.tarjetas_acumuladas
                                                )}}>
                                                <Tarjeta color={'var(--warnning)'} />
                                            </Grid>
                                            </Tooltip>
                                            <Tooltip title="Tarjeta roja" placement="top">
                                            <Grid item sx={{ cursor: 'pointer' }}
                                                onClick={()=>{editarRoja(
                                                    awayTeam._id, 
                                                    jugador._id, 
                                                    currentRound,
                                                    jugador.roja_partido_individual[currentRound],
                                                    jugador.name, 
                                                    jugador.tarjetas_roja,
                                                    awayTeam.tarjetasRojas,
                                                    awayTeam.jugadores[index].roja_partido_individual,
                                                    jugador.suspendido_numero,
                                                    setIsLoadinng,
                                                    editarRojas,
                                                    queryClient
                                                )}}>
                                                <Tarjeta color={'var(--danger)'} />
                                            </Grid>
                                            </Tooltip>
                                            <Tooltip title="Tarjeta azul" placement="top">
                                            <Grid item sx={{ cursor: 'pointer' }}
                                                onClick={()=>{ editarAzul(
                                                    awayTeam._id, 
                                                    jugador._id, 
                                                    currentRound,
                                                    jugador.azul_partido_individual[currentRound],
                                                    jugador.name, 
                                                    jugador.tarjetas_azul,
                                                    awayTeam.jugadores[index].azul_partido_individual,
                                                    setIsLoadinng,
                                                    editarAzules,
                                                    queryClient
                                                )}}>
                                                <Tarjeta color={'var(--primario)'} />
                                            </Grid>
                                            </Tooltip>
                                            <Tooltip title="Jugador figura" placement="top">
                                            <Grid item sx={{ cursor: 'pointer','&:hover':{color:light?'var(--neutral)':'var(--dark3)'} }}
                                                onClick={()=>{editarFigura(
                                                    awayTeam._id, 
                                                    jugador._id, 
                                                    currentRound,
                                                    jugador.jugador_figura_individual[currentRound],
                                                    jugador.name, 
                                                    jugador.figura,
                                                    awayTeam.jugadores[index].jugador_figura_individual,
                                                    setIsLoadinng,
                                                    editarFiguras,
                                                    queryClient
                                                )}}>
                                                <Figura/>
                                            </Grid>
                                            </Tooltip>
                                        </Grid>
                                        <Grid item container flexDirection={'row'} alignItems={'center'} gap={mobile ?2: 3} p={1} sx={{justifyContent:mobile && 'center'}} >
                                            <Tooltip title="Anular gol" placement="top">
                                            <Grid item sx={{ cursor: 'pointer',color:'var(--danger)','&:hover':{color:light?'var(--neutral)':'var(--dark3)'} }}
                                                onClick={()=>{ anularGoles(
                                                    awayTeam._id,
                                                    jugador._id,
                                                    1,
                                                    currentRound,
                                                    jugador.gol_partido_individual[currentRound], 
                                                    jugador.name, 
                                                    jugador.goles,
                                                    awayTeam.gol_partido[currentRound],
                                                    awayTeam.goles_a_Favor, 
                                                    awayTeam.jugadores[index].gol_partido_individual,
                                                    awayTeam.gol_partido,
                                                    setIsLoadinng,
                                                    editarGol,
                                                    queryClient 
                                                )}}>
                                                <Gol />
                                            </Grid>
                                            </Tooltip>
                                            <Tooltip title="Anular asistencia" placement="top">
                                            <Grid item sx={{ cursor: 'pointer',color:'var(--danger)','&:hover':{color:light?'var(--neutral)':'var(--dark3)'} }}
                                                onClick={()=>{anularAsistencia(
                                                    awayTeam._id, 
                                                    jugador._id, 
                                                    currentRound,
                                                    jugador.asistencia_partido_individual[currentRound],
                                                    jugador.name, 
                                                    jugador.asistencias,
                                                    awayTeam.jugadores[index].asistencia_partido_individual,
                                                    setIsLoadinng,
                                                    editarAsistencias,
                                                    queryClient
                                                )}}>
                                                <Asistir />
                                            </Grid>
                                            </Tooltip>
                                            <Tooltip title="Anular tarjeta amarilla" placement="top">
                                            <Grid item sx={{ cursor: 'pointer' }}
                                                onClick={()=>{ anularAmarilla(
                                                    awayTeam._id, 
                                                    jugador._id, 
                                                    1,
                                                    currentRound,
                                                    jugador.amarilla_partido_individual[currentRound],
                                                    jugador.name, 
                                                    jugador.tarjetas_amarillas,
                                                    awayTeam.tarjetasAmarillas,
                                                    awayTeam.jugadores[index].amarilla_partido_individual,
                                                    awayTeam.jugadores[index].roja_partido_individual,
                                                    jugador.roja_partido_individual[currentRound],
                                                    awayTeam.tarjetasRojas,
                                                    jugador.tarjetas_roja,
                                                    jugador.suspendido,
                                                    jugador.suspendido_numero,
                                                    setIsLoadinng,
                                                    editarAmarillas,
                                                    queryClient,
                                                    jugador.tarjetas_acumuladas
                                                )}}>
                                                <Tarjeta color={'var(--warnning)'} />
                                            </Grid>
                                            </Tooltip>
                                            <Tooltip title="Anular tarjeta roja" placement="top">
                                            <Grid item sx={{ cursor: 'pointer' }}
                                                onClick={()=>{ anularRoja(
                                                    awayTeam._id, 
                                                    jugador._id, 
                                                    currentRound,
                                                    jugador.roja_partido_individual[currentRound],
                                                    jugador.name, 
                                                    jugador.tarjetas_roja,
                                                    awayTeam.tarjetasRojas,
                                                    awayTeam.jugadores[index].roja_partido_individual,
                                                    jugador.suspendido_numero,
                                                    setIsLoadinng,
                                                    editarRojas,
                                                    queryClient
                                                )}}>
                                                <Tarjeta color={'var(--danger)'} />
                                            </Grid>
                                            </Tooltip>
                                            <Tooltip title="Anular tarjeta azul" placement="top">
                                            <Grid item sx={{ cursor: 'pointer' }}
                                                onClick={()=>{ anularAzul(
                                                    awayTeam._id, 
                                                    jugador._id, 
                                                    currentRound,
                                                    jugador.azul_partido_individual[currentRound],
                                                    jugador.name, 
                                                    jugador.tarjetas_azul,
                                                    awayTeam.jugadores[index].azul_partido_individual,
                                                    setIsLoadinng,
                                                    editarAzules,
                                                    queryClient
                                                )}}>
                                                <Tarjeta color={'var(--primario)'} />
                                            </Grid>
                                            </Tooltip>
                                            <Tooltip title="Anular jugador figura" placement="top">
                                            <Grid item sx={{ cursor: 'pointer',color:'var(--danger)','&:hover':{color:light?'var(--neutral)':'var(--dark3)'} }}
                                                onClick={()=>{ anularFigura(
                                                    awayTeam._id, 
                                                    jugador._id, 
                                                    currentRound,
                                                    jugador.jugador_figura_individual[currentRound],
                                                    jugador.name, 
                                                    jugador.figura,
                                                    awayTeam.jugadores[index].jugador_figura_individual,
                                                    setIsLoadinng,
                                                    editarFiguras,
                                                    queryClient
                                                )}}>
                                                <Figura/>
                                            </Grid>
                                            </Tooltip>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item sx={{borderTop:light ? '1px solid var(--dark3)' :'1px solid var(--cero)'}}></Grid>
                                </>
                                )
                            })}
                    </Grid>
                </Grid>
            </Grid>
        </Collapse>
        {isLoadinng && ( 
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: !mobile ? '180vh' : '100%', backgroundColor: 'rgba(2, 2, 2, 0.488)', zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <CircularProgress color="primary" />
                </div>
            )}
        {modalLista && <ModalLista open={modalLista} setOpen={setModalLista} data={homeTeam} currentRound={currentRound}/>}
        {modalListaAway && <ModalLista open={modalListaAway} setOpen={setModalListaAway} data={awayTeam} currentRound={currentRound} />}
    </>
    )
}