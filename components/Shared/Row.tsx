import React, { useContext, useEffect, useState } from "react";
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { CircularProgress, Grid, useMediaQuery } from "@mui/material";
import Context from "../../context/contextPrincipal";
import { MdOutlineEditCalendar as Edit } from 'react-icons/md';
import moment from "moment";
import { ButtonStatus } from "./ButtonStatus";
import { GiSoccerBall as Gol } from 'react-icons/gi';
import { CgUser as Dt } from 'react-icons/cg';
import { FaUserEdit as Arbitro } from 'react-icons/fa';
import { ModalEdit } from "../modals/Modal";
import { ModalArbitro } from "../modals/ModalArbitro";

export const Row = ({ homeTeam, awayTeam, currentRound,isLoading }) => {
    const [light] = useContext(Context);
    const [open, setOpen] = useState(false);
    const [openFecha, setOpenFecha] = useState(false);
    const [openArbitro, setOpenArbitro] = useState(false);
    const [hoy, setHoy] = useState(moment())
    const [minutosTranscurridos, setMinutosTranscurridos] = useState(0);
    const [showImage, setShowImage] = useState(false);
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });
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

    const status = () => {
        if (hoy.diff(fechaFinalPartido, 'days') === 0) {
            const enVivo = tiempoRestante <= TIEMPO_PARTIDO && tiempoRestante > 0
            if (enVivo) {
                return 'enVivo'
            } else if (tiempoRestante <= 0) {
                return 'finPartido'
            } else {
                return 'agendar'
            }
        } else if (hoy.diff(fechaFinalPartido, 'days') < 0) {
            return 'noEmpezado'
        }
        else if (!hoy.diff(fechaFinalPartido, 'days')) {
            return 'fechaInvalida'
        } else {
            return 'finPartido'
        }
    }

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
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset', background: light ? 'rgba(0, 0, 0, 0.04)' : 'var(--dark3)', cursor: 'pointer' } }} onClick={() => setOpen(!open)}>
                <TableCell sx={{ color: light ? 'var(--dark2)' : 'var(--cero)', whiteSpace: 'nowrap' }}>
                    <Grid container width={'190px'} flexDirection={'row'} alignItems={'center'}>
                        <Grid item>
                            <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)} sx={{ color: light ? 'black' : 'var(--cero)' }}>
                                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                            </IconButton>
                        </Grid>
                        <Grid item width={'110px'} container flexDirection={'column'} alignItems={'center'} justifyContent={'center'}>
                            <Grid item sx={{fontSize:'16px'}}>{homeTeam?.fecha[currentRound] === 'No definido' ? 'No definido': formatoFecha}</Grid>
                            <Grid item sx={{fontSize:'12px'}}>{homeTeam?.fecha[currentRound] === 'No definido' ? 'No definida': formatoHora}</Grid>
                        </Grid>
                        <Grid item>
                            <Edit style={{ cursor: 'pointer' }} fontSize={20} onClick={() => { setOpenFecha(!openFecha) }} />
                        </Grid>
                    </Grid>
                </TableCell>
                {!mobile &&
                <TableCell align="center" sx={{ whiteSpace: 'nowrap', color: light ? 'var(--dark2)' : 'var(--cero)'}}>{homeTeam?.estadio}</TableCell>}
                <TableCell align="center" sx={{ color: light ? 'var(--dark2)' : 'var(--cero)' }}>
                    <Grid container width={'470px'} flexDirection={'row'} alignItems={'center'}>
                        <Grid item container alignItems={'center'} justifyContent={'end'} sx={{ whiteSpace: 'nowrap', width: '130px'}}>
                            {homeTeam?.name}
                        </Grid>
                        <Grid item container alignItems={'center'} justifyContent={'center'} sx={{ width: '55px', height: '35px' }}>
                            {isLoading || !showImage ?
                                (<CircularProgress style={{ color: light ? 'var(--dark2)' : 'var(--cero)' }} size={20} />)
                            : showImage ? <img style={{ height: '30px' }} src={homeTeam?.logo} alt={homeTeam?.name} />
                            : null}
                        </Grid>
                        <Grid item>
                            <ButtonStatus status={status()} gol_away={gol_away} gol_home={gol_home} minutosTranscurridos={minutosTranscurridos} />
                        </Grid>
                        <Grid item container alignItems={'center'} justifyContent={'center'} sx={{ width: '55px', height: '35px' }}>
                            {isLoading || !showImage ?
                                (<CircularProgress style={{ color: light ? 'var(--dark2)' : 'var(--cero)' }} size={20} />)
                            : showImage ? <img style={{ height: '30px' }} src={awayTeam?.logo} alt={awayTeam?.name} />
                            : null}
                        </Grid>
                        <Grid item container alignItems={'center'} sx={{ whiteSpace: 'nowrap', width: '130px' }}>
                            {awayTeam?.name}
                        </Grid>
                    </Grid>
                </TableCell>
                {!mobile &&
                <TableCell align="left" sx={{ whiteSpace: 'nowrap', color: light ? 'var(--dark2)' : 'var(--cero)' }}>
                    <Grid container alignItems={'center'} gap={2} width={'140px'}>
                        <Grid item>{arbitro_home}</Grid>
                        <Grid item>
                            <Arbitro style={{ cursor: 'pointer' }} fontSize={20} onClick={() => { setOpenArbitro(!openArbitro) }} />
                        </Grid>
                        
                    </Grid>
                </TableCell>}
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0, background: light ? 'var(--cero)' : 'var(--dark)' }} colSpan={8}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div" sx={{ color: light ? 'var(--dark2)' : 'var(--cero)' }}>
                                Historial
                            </Typography>
                            <Grid container gap={6}>
                                <Grid>
                                    <img style={{ height: '30px' }} src={homeTeam?.logo} alt="" />
                                    {homeTeam?.director_tecnico.map((tecnico) => {
                                        return (
                                            <>
                                                {tecnico.amarilla_partido[currentRound] !== 0 ?
                                                    <Grid item container alignItems={'center'} sx={{ color: light ? 'var(--dark2)' : 'var(--gris)' }}>
                                                        <Grid item sx={{ color: light ? 'var(--dark2)' : 'var(--cero)' }}>{tecnico.amarilla_partido[currentRound]}</Grid>
                                                        <Grid sx={{ background: 'var(--warnning)', height: '13px', width: '9px', borderRadius: '2px' }} />
                                                        <Grid item ml={2} sx={{ display: 'flex', alignItems: 'center' }}>{tecnico.name} <Dt size={16} color={light ? 'var(--dark2)' : 'var(--cero)'} />DT </Grid>
                                                    </Grid> :
                                                    null}
                                                {tecnico.roja_partido[currentRound] !== 0 ?
                                                    <Grid item container alignItems={'center'} sx={{ color: light ? 'var(--dark2)' : 'var(--gris)' }}>
                                                        <Grid item sx={{ color: light ? 'var(--dark2)' : 'var(--cero)' }}>{tecnico.roja_partido[currentRound]}</Grid>
                                                        <Grid sx={{ background: 'var(--danger)', height: '13px', width: '9px', borderRadius: '2px' }} />
                                                        <Grid item ml={2} sx={{ display: 'flex', alignItems: 'center' }}>{tecnico.name} <Dt size={16} color={light ? 'var(--dark2)' : 'var(--cero)'} />DT </Grid>
                                                    </Grid> :
                                                    null}
                                            </>
                                        )
                                    })}
                                    {homeTeam?.jugadores.map((jugador) => {
                                        return (
                                            <>
                                                {jugador.gol_partido_individual[currentRound] !== 0 ?
                                                    <Grid item container alignItems={'center'} sx={{ color: light ? 'var(--dark2)' : 'var(--gris)' }}>
                                                        <Grid sx={{ color: light ? 'var(--dark2)' : 'var(--cero)' }}>{jugador.gol_partido_individual[currentRound]}</Grid>
                                                        <Gol color={light ? 'var(--dark2)' : 'var(--cero)'} />
                                                        <Grid ml={2} item>{jugador.name} </Grid>
                                                    </Grid> :
                                                    null}
                                                {jugador.amarilla_partido_individual[currentRound] !== 0 ?
                                                    <Grid item container alignItems={'center'} sx={{ color: light ? 'var(--dark2)' : 'var(--gris)' }}>
                                                        <Grid sx={{ color: light ? 'var(--dark2)' : 'var(--cero)' }}>{jugador.amarilla_partido_individual[currentRound]}</Grid>
                                                        <Grid sx={{ background: 'var(--warnning)', height: '13px', width: '9px', borderRadius: '2px' }} />
                                                        <Grid ml={2} item>{jugador.name} </Grid>
                                                    </Grid> :
                                                    null}
                                                {jugador.roja_partido_individual[currentRound] !== 0 ?
                                                    <Grid item container alignItems={'center'} sx={{ color: light ? 'var(--dark2)' : 'var(--gris)' }}>
                                                        <Grid sx={{ color: light ? 'var(--dark2)' : 'var(--cero)' }}>{jugador.roja_partido_individual[currentRound]}</Grid>
                                                        <Grid sx={{ background: 'var(--danger)', height: '13px', width: '9px', borderRadius: '2px' }} />
                                                        <Grid ml={2} item>{jugador.name} </Grid>
                                                    </Grid> :
                                                    null}
                                                {jugador.azul_partido_individual[currentRound] !== 0 ?
                                                    <Grid item container alignItems={'center'} sx={{ color: light ? 'var(--dark2)' : 'var(--gris)' }}>
                                                        <Grid sx={{ color: light ? 'var(--dark2)' : 'var(--cero)' }}>{jugador.azul_partido_individual[currentRound]}</Grid>
                                                        <Grid sx={{ background: 'var(--primario)', height: '13px', width: '9px', borderRadius: '2px' }} />
                                                        <Grid ml={2} item>{jugador.name} </Grid>
                                                    </Grid> :
                                                    null}
                                            </>
                                        )
                                    })}
                                </Grid>
                                <Grid>
                                    <img style={{ height: '30px' }} src={awayTeam?.logo} alt="" />
                                    {awayTeam?.director_tecnico.map((tecnico) => {
                                        return (
                                            <>
                                                {tecnico.amarilla_partido[currentRound] !== 0 ?
                                                    <Grid item container alignItems={'center'} sx={{ color: light ? 'var(--dark2)' : 'var(--gris)' }}>
                                                        <Grid item sx={{ color: light ? 'var(--dark2)' : 'var(--cero)' }}>{tecnico.amarilla_partido[currentRound]}</Grid>
                                                        <Grid sx={{ background: 'var(--warnning)', height: '13px', width: '9px', borderRadius: '2px' }} />
                                                        <Grid item ml={2} sx={{ display: 'flex', alignItems: 'center' }}>{tecnico.name} <Dt size={16} color={light ? 'var(--dark2)' : 'var(--cero)'} />DT </Grid>
                                                    </Grid> :
                                                    null}
                                                {tecnico.roja_partido[currentRound] !== 0 ?
                                                    <Grid item container alignItems={'center'} sx={{ color: light ? 'var(--dark2)' : 'var(--gris)' }}>
                                                        <Grid item sx={{ color: light ? 'var(--dark2)' : 'var(--cero)' }}>{tecnico.roja_partido[currentRound]}</Grid>
                                                        <Grid sx={{ background: 'var(--danger)', height: '13px', width: '9px', borderRadius: '2px' }} />
                                                        <Grid item ml={2} sx={{ display: 'flex', alignItems: 'center' }}>{tecnico.name} <Dt size={16} color={light ? 'var(--dark2)' : 'var(--cero)'} />DT </Grid>
                                                    </Grid> :
                                                    null}
                                            </>
                                        )
                                    })}
                                    {awayTeam?.jugadores.map((jugador) => {
                                        return (
                                            <>
                                                {jugador.amarilla_partido_individual[currentRound] !== 0 ?
                                                    <Grid item container alignItems={'center'} sx={{ color: light ? 'var(--dark2)' : 'var(--gris)' }}>
                                                        <Grid sx={{ color: light ? 'var(--dark2)' : 'var(--cero)' }}>{jugador.gol_partido_individual[currentRound]}</Grid>
                                                        <Gol color={light ? 'var(--dark2)' : 'var(--cero)'} />
                                                        <Grid ml={2} item>{jugador.name} </Grid>
                                                    </Grid> :
                                                    null}
                                                {jugador.amarilla_partido_individual[currentRound] !== 0 ?
                                                    <Grid item container alignItems={'center'} sx={{ color: light ? 'var(--dark2)' : 'var(--gris)' }}>
                                                        <Grid sx={{ color: light ? 'var(--dark2)' : 'var(--cero)' }}>{jugador.amarilla_partido_individual[currentRound]}</Grid>
                                                        <Grid sx={{ background: 'var(--warnning)', height: '13px', width: '9px', borderRadius: '2px' }} />
                                                        <Grid ml={2} item>{jugador.name} </Grid>
                                                    </Grid> :
                                                    null}
                                                {jugador.roja_partido_individual[currentRound] !== 0 ?
                                                    <Grid item container alignItems={'center'} sx={{ color: light ? 'var(--dark2)' : 'var(--gris)' }}>
                                                        <Grid sx={{ color: light ? 'var(--dark2)' : 'var(--cero)' }}>{jugador.roja_partido_individual[currentRound]}</Grid>
                                                        <Grid sx={{ background: 'var(--danger)', height: '13px', width: '9px', borderRadius: '2px' }} />
                                                        <Grid ml={2} item>{jugador.name} </Grid>
                                                    </Grid> :
                                                    null}
                                                {jugador.azul_partido_individual[currentRound] !== 0 ?
                                                    <Grid item container alignItems={'center'} sx={{ color: light ? 'var(--dark2)' : 'var(--gris)' }}>
                                                        <Grid sx={{ color: light ? 'var(--dark2)' : 'var(--cero)' }}>{jugador.azul_partido_individual[currentRound]}</Grid>
                                                        <Grid sx={{ background: 'var(--primario)', height: '13px', width: '9px', borderRadius: '2px' }} />
                                                        <Grid ml={2} item>{jugador.name} </Grid>
                                                    </Grid> :
                                                    null}
                                            </>
                                        )
                                    })}
                                </Grid>
                            </Grid>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
            {openFecha && <ModalEdit open={openFecha} setOpen={setOpenFecha} id={homeTeam._id} data={homeTeam} index={currentRound} />}
            {openArbitro && <ModalArbitro open={openArbitro} setOpen={setOpenArbitro} id={homeTeam._id} data={homeTeam} index={currentRound} />}
        </React.Fragment>
    );
}