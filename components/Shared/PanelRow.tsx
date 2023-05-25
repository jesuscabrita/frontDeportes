import { CircularProgress, Grid, useMediaQuery } from '@mui/material';
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
import { useMutation, useQueryClient } from 'react-query';
import { jugadoresPut_gol } from '../../service/jugadores';
import { alertaSubmit } from '../../utils/alert';
import { status } from '../../utils/utils';

export const PanelRow = ({ homeTeam, awayTeam, currentRound, isLoading, index }) => {
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
    const queryClient = useQueryClient();
    const [isLoadinng, setIsLoadinng] = useState(false);

    const [goles, setGoles] = useState(0);

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

    const editarGoles = (equipoId: string, jugadorId: string, gol_partido: number, index: number, jugador_gol: number, jugador_name: string, currentIndex: number, goles: number, equipo, golesAFavor: number) => {
        setIsLoadinng(true);
        let updatedGolpartidoArr = [...homeTeam.jugadores[currentIndex].gol_partido];
        let updatedGolpartido = jugador_gol + gol_partido;
        updatedGolpartidoArr[index] = updatedGolpartido;
        
        let sumaGolesaFavor = golesAFavor + gol_partido

        let updatedGolEquipoArr = [...homeTeam.gol_partido];
        let updatedGolEquipo = equipo + gol_partido;
        updatedGolEquipoArr[index] = updatedGolEquipo;

        let sumaGoles = goles + gol_partido;       
        const formData = {
            jugadores: {
                gol_partido: updatedGolpartidoArr,
                goles: sumaGoles,
            },
            gol_partido: updatedGolEquipoArr,
            goles: sumaGoles,
            goles_a_Favor: sumaGolesaFavor === null ? 0 : sumaGolesaFavor,
        };
        editarGol({ form: formData, equipoId, jugadorId }, {
            onSuccess: (success) => {
                queryClient.invalidateQueries(["/api/liga"]);
                alertaSubmit(true, `Golll! de ${jugador_name}`);
                setIsLoadinng(false);
            },
            onError: (err: any) => {
                const errorMessage = err?.response?.data?.message || err.message;
                alertaSubmit(false, errorMessage);
                setIsLoadinng(false);
            },
        });
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
                    <Grid container gap={6}>
                        <Grid item>
                            <Grid mb={2} item sx={{ background: 'var(--primario)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--cero)', padding: '2px' }}>{homeTeam?.name}</Grid>
                            {homeTeam?.jugadores.map((jugador, index) => {
                                console.log('gola a favor :' ,jugador.goles_a_Favor);
                                
                                return (
                                    <>
                                        <Grid item gap={2} container alignItems={'center'} sx={{ color: light ? 'var(--dark2)' : 'var(--gris)' }}>
                                            <Grid item sx={{ fontSize: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', fontWeight: 600 }}>#{jugador.dorsal} </Grid>
                                            <Grid item width={'150px'} sx={{ cursor: 'pointer' }}>{jugador.name} </Grid>
                                            <Grid item sx={{ cursor: 'pointer' }} onClick={() => { editarGoles(homeTeam._id, jugador._id, 1, currentRound, jugador.gol_partido[currentRound], jugador.name, index, jugador.goles, homeTeam.gol_partido[currentRound],homeTeam.goles_a_Favor) }}><Gol /></Grid>
                                            <Grid item sx={{ cursor: 'pointer' }}><Tarjeta color={'var(--warnning)'} /></Grid>
                                            <Grid item sx={{ cursor: 'pointer' }}><Tarjeta color={'var(--danger)'} /></Grid>
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
                                            <Grid item sx={{ cursor: 'pointer' }}><Gol /></Grid>
                                            <Grid item sx={{ cursor: 'pointer' }}><Tarjeta color={'var(--warnning)'} /></Grid>
                                            <Grid item sx={{ cursor: 'pointer' }}><Tarjeta color={'var(--danger)'} /></Grid>
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