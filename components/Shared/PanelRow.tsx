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
import { calcularDatosPartido, jugadoresPut_amarillas, jugadoresPut_asistencias, jugadoresPut_azul, jugadoresPut_figura, jugadoresPut_gol, jugadoresPut_rojas } from '../../service/jugadores';
import { status } from '../../utils/utils';
import { datosDelPartidoHome, editarAmarilla, editarAsistencia, editarAzul, editarFigura, editarGoles, editarRoja } from '../../utils/utilsPanelJugadores';

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
    const queryClient = useQueryClient();
    const [isLoadinng, setIsLoadinng] = useState(false);

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
                <Button 
                    sx={{ color: 'var(--primario)', marginBottom:'10px' }}
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
                    )
                }}
                    >
                        Calcular partido
                </Button>
                    <Grid container gap={6}>
                        <Grid item>
                            <Grid mb={2} item sx={{ background: 'var(--primario)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--cero)', padding: '2px' }}>{homeTeam?.name}</Grid>
                            {homeTeam?.jugadores.map((jugador, index) => {
                                return (
                                    <>
                                        <Grid item gap={2} container alignItems={'center'} sx={{ color: light ? 'var(--dark2)' : 'var(--gris)' }}>
                                            <Grid item sx={{ fontSize: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', fontWeight: 600 }}>#{jugador.dorsal} </Grid>
                                            <Grid item width={'150px'} sx={{ cursor: 'pointer' }}>{jugador.name} </Grid>
                                            <Grid 
                                                item 
                                                sx={{ cursor: 'pointer' }} 
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
                                            <Grid 
                                                item 
                                                sx={{ cursor: 'pointer' }}
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
                                                )}}
                                                >
                                                <Asistir />
                                            </Grid>
                                            <Grid 
                                                item 
                                                sx={{ cursor: 'pointer' }}
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
                                                    queryClient
                                                )}}
                                                >
                                                <Tarjeta color={'var(--warnning)'} />
                                            </Grid>
                                            <Grid 
                                                item 
                                                sx={{ cursor: 'pointer' }}
                                                onClick={()=>{editarRoja(
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
                                                )}}
                                                >
                                                <Tarjeta color={'var(--danger)'} />
                                            </Grid>
                                            <Grid 
                                                item 
                                                sx={{ cursor: 'pointer' }}
                                                onClick={()=>{editarAzul(
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
                                                )}}
                                                >
                                                <Tarjeta color={'var(--primario)'} />
                                            </Grid>
                                            <Grid 
                                                item 
                                                sx={{ cursor: 'pointer' }}
                                                onClick={()=>{editarFigura(
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
                                                )}}
                                                >
                                                <Figura/>
                                            </Grid>
                                        </Grid>
                                    </>
                                )
                            })}
                        </Grid>
                        <Grid>
                            <Grid mb={2} item sx={{ background: 'var(--check)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--cero)', padding: '2px' }}>{awayTeam?.name}</Grid>
                            {awayTeam?.jugadores.map((jugador, index) => {
                                return (
                                    <>
                                        <Grid item gap={2} container alignItems={'center'} sx={{ color: light ? 'var(--dark2)' : 'var(--gris)' }}>
                                            <Grid item sx={{ fontSize: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', fontWeight: 600 }}>#{jugador.dorsal} </Grid>
                                            <Grid item width={'150px'} sx={{ cursor: 'pointer' }}>{jugador.name} </Grid>
                                            <Grid 
                                                item 
                                                sx={{ cursor: 'pointer' }}
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
                                                )}}
                                                >
                                                <Gol />
                                            </Grid>
                                            <Grid 
                                                item 
                                                sx={{ cursor: 'pointer' }}
                                                onClick={()=>{editarAsistencia(
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
                                                )}}
                                                >
                                                <Asistir />
                                            </Grid>
                                            <Grid 
                                                item 
                                                sx={{ cursor: 'pointer' }}
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
                                                    queryClient
                                                )}}
                                                >
                                                <Tarjeta color={'var(--warnning)'} />
                                            </Grid>
                                            <Grid 
                                                item
                                                sx={{ cursor: 'pointer' }}
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
                                                )}}
                                                >
                                                <Tarjeta color={'var(--danger)'} />
                                            </Grid>
                                            <Grid 
                                                item 
                                                sx={{ cursor: 'pointer' }}
                                                onClick={()=>{editarAzul(
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
                                                )}}
                                                >
                                                <Tarjeta color={'var(--primario)'} />
                                            </Grid>
                                            <Grid 
                                                item 
                                                sx={{ cursor: 'pointer' }}
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
                                                )}}
                                                >
                                                <Figura/>
                                            </Grid>
                                        </Grid>
                                    </>
                                )
                            })}
                        </Grid>
                    </Grid>
                </Grid>
            </Collapse>
        </>
    )
}