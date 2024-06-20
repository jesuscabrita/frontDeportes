import React, { useContext, useEffect, useState } from "react";
import { MdKeyboardArrowDown as ArrowDown } from "react-icons/md";
import { MdKeyboardArrowUp as ArrowUp } from "react-icons/md";
import { Box, CircularProgress, Collapse, Grid, IconButton, TableCell, TableRow, Typography, useMediaQuery } from "@mui/material";
import { MdOutlineEditCalendar as Edit } from 'react-icons/md';
import { ButtonStatus } from "../Shared/ButtonStatus";
import { GiSoccerBall as Gol } from 'react-icons/gi';
import { CgUser as Dt } from 'react-icons/cg';
import { FaUserEdit as Arbitro } from 'react-icons/fa';
import { ModalEdit } from "../modals/Calendario/Modal";
import { ModalArbitro } from "../modals/Calendario/ModalArbitro";
import { GiSoccerKick as Asistir } from 'react-icons/gi';
import { BsFillStarFill as Figura } from 'react-icons/bs';
import { status } from "../../utils/utils";
import Context from "../../context/contextPrincipal";
import moment from "moment";
import ContextRefac from "../../context/contextLogin";

export const Row = ({ homeTeam, awayTeam, currentRound, isLoading }) => {
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
    const { state: { user } }: any = useContext(ContextRefac);
    const [isUserAdmin, setIsUserAdmin] = useState(false);

    useEffect(() => {
        setIsUserAdmin(user?.role === 'super_admin' || user?.role === 'admin');
    }, [user]);

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
            }, 1000);
            return () => clearTimeout(timeoutId);
        }
    }, [isLoading]);

    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset', background: light ? 'rgba(0, 0, 0, 0.04)' : 'var(--dark3)', cursor: 'pointer' } }} onClick={() => setOpen(!open)}>
                {!mobile &&
                    <TableCell sx={{ color: light ? 'var(--dark2)' : 'var(--cero)', whiteSpace: 'nowrap' }}>
                        <Grid container width={'190px'} flexDirection={'row'} alignItems={'center'}>
                            <Grid item>
                                <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)} sx={{ color: light ? 'black' : 'var(--cero)' }}>
                                    {open ? <ArrowUp /> : <ArrowDown />}
                                </IconButton>
                            </Grid>
                            <Grid item width={'110px'} container flexDirection={'column'} alignItems={'center'} justifyContent={'center'}>
                                <Grid item sx={{ fontSize: '16px' }}>{homeTeam?.fecha[currentRound] === 'No definido' ? 'No definido' : formatoFecha}</Grid>
                                <Grid item sx={{ fontSize: '12px' }}>{homeTeam?.fecha[currentRound] === 'No definido' ? 'No definida' : formatoHora}</Grid>
                            </Grid>
                            {isUserAdmin &&
                                <Grid item>
                                    <Edit style={{ cursor: 'pointer' }} fontSize={20} onClick={() => { setOpenFecha(!openFecha) }} />
                                </Grid>}
                        </Grid>
                    </TableCell>}
                {mobile && isUserAdmin &&
                    <TableCell sx={{ color: light ? 'var(--dark2)' : 'var(--cero)', whiteSpace: 'nowrap' }}>
                        <Grid sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%', justifyContent: 'center' }}>
                            <Grid item>
                                <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)} sx={{ color: light ? 'black' : 'var(--cero)' }}>
                                    {open ? <ArrowUp /> : <ArrowDown />}
                                </IconButton>
                            </Grid>
                            <Grid item>
                                <Edit style={{ cursor: 'pointer' }} fontSize={20} onClick={() => { setOpenFecha(!openFecha) }} />
                            </Grid>
                        </Grid>
                    </TableCell>}
                {!mobile && <TableCell align="center" sx={{ whiteSpace: 'nowrap', color: light ? 'var(--dark2)' : 'var(--cero)' }}>{homeTeam?.estadio}</TableCell>}
                <TableCell align="center" sx={{ color: light ? 'var(--dark2)' : 'var(--cero)', width: '100%', whiteSpace: 'nowrap' }}>
                    <Grid sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: !mobile ? '100%' : '100%', whiteSpace: 'nowrap' }}>
                        {!mobile &&
                            <Grid item container alignItems={'center'} justifyContent={'end'} sx={{ whiteSpace: 'nowrap', width: '130px' }}>
                                {homeTeam?.name}
                            </Grid>}
                        <Grid mr={mobile ? 1 : 0} item container alignItems={'center'} justifyContent={'center'} sx={{ width: '55px', height: '35px' }}>
                            {isLoading || !showImage ?
                                (<CircularProgress style={{ color: light ? 'var(--dark2)' : 'var(--cero)' }} size={20} />)
                                : showImage ? <img style={{ height: '30px' }} src={homeTeam?.logo} alt={homeTeam?.name} />
                                    : null}
                            {mobile && <Grid item sx={{ fontSize: '8px', whiteSpace: 'nowrap', color: light ? 'var(--dark2)' : 'var(--gris)' }}>{homeTeam?.name}</Grid>}
                        </Grid>
                        <Grid item>
                            {mobile && <Grid item sx={{ fontSize: '7px', whiteSpace: 'nowrap', color: light ? 'var(--dark2)' : 'var(--gris)' }}>{homeTeam?.fecha[currentRound] === 'No definido' ? 'No definido' : formatoFecha}</Grid>}
                            {mobile && <Grid item sx={{ fontSize: '6px', whiteSpace: 'nowrap', color: light ? 'var(--dark2)' : 'var(--gris)' }}>{homeTeam?.fecha[currentRound] === 'No definido' ? 'No definida' : formatoHora}</Grid>}
                            <ButtonStatus status={status(hoy, fechaFinalPartido, tiempoRestante, TIEMPO_PARTIDO)} gol_away={gol_away} gol_home={gol_home} minutosTranscurridos={minutosTranscurridos} />
                            {mobile && <Grid item sx={{ fontSize: '7px', whiteSpace: 'nowrap', color: light ? 'var(--dark2)' : 'var(--gris)' }}>Arbitro:</Grid>}
                            {mobile && <Grid item sx={{ fontSize: '6px', whiteSpace: 'nowrap', color: light ? 'var(--dark2)' : 'var(--gris)' }}>{arbitro_home}</Grid>}
                        </Grid>
                        <Grid ml={mobile ? 1 : 0} item container alignItems={'center'} justifyContent={'center'} sx={{ width: '55px', height: '35px' }}>
                            {isLoading || !showImage ?
                                (<CircularProgress style={{ color: light ? 'var(--dark2)' : 'var(--cero)' }} size={20} />)
                                : showImage ? <img style={{ height: '30px' }} src={awayTeam?.logo} alt={awayTeam?.name} />
                                    : null}
                            {mobile && <Grid item sx={{ fontSize: '8px', whiteSpace: 'nowrap', color: light ? 'var(--dark2)' : 'var(--gris)' }}>{awayTeam?.name}</Grid>}
                        </Grid>
                        {!mobile &&
                            <Grid item container alignItems={'center'} sx={{ whiteSpace: 'nowrap', width: '130px' }}>
                                {awayTeam?.name}
                            </Grid>}
                    </Grid>
                </TableCell>
                {!mobile &&
                    <TableCell align="left" sx={{ whiteSpace: 'nowrap', color: light ? 'var(--dark2)' : 'var(--cero)' }}>
                        <Grid container alignItems={'center'} gap={2} width={'140px'}>
                            <Grid item>{arbitro_home}</Grid>
                            {isUserAdmin &&
                                <Grid item>
                                    <Arbitro style={{ cursor: 'pointer' }} fontSize={20} onClick={() => { setOpenArbitro(!openArbitro) }} />
                                </Grid>}
                        </Grid>
                    </TableCell>}
                {mobile && isUserAdmin &&
                    <TableCell align="center" sx={{ whiteSpace: 'nowrap', color: light ? 'var(--dark2)' : 'var(--cero)' }}>
                        <Grid item sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Arbitro style={{ cursor: 'pointer' }} fontSize={20} onClick={() => { setOpenArbitro(!openArbitro) }} />
                        </Grid>
                    </TableCell>}
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0, background: light ? 'var(--cero)' : 'var(--dark)' }} colSpan={8}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div" sx={{ color: light ? 'var(--dark2)' : 'var(--cero)', fontSize: mobile ? '13px' : '18px' }}>
                                Historial
                            </Typography>
                            <Grid container gap={mobile ? 3 : 6}>
                                <Grid>
                                    <img style={{ height: '30px' }} src={homeTeam?.logo} alt="" />
                                    {homeTeam?.director_tecnico.map((tecnico) => {
                                        return (
                                            <>
                                                {tecnico.amarilla_partido[currentRound] !== 0 &&
                                                    <Grid item container alignItems={'center'} sx={{ color: light ? 'var(--dark2)' : 'var(--gris)' }}>
                                                        <Grid item sx={{ color: light ? 'var(--dark2)' : 'var(--cero)' }}>{tecnico.amarilla_partido[currentRound]}</Grid>
                                                        <Grid sx={{ background: 'var(--warnning)', height: '13px', width: '9px', borderRadius: '2px' }} />
                                                        <Grid item ml={2.5} sx={{ display: 'flex', alignItems: 'center', fontSize: mobile ? '9px' : '14px' }}>{tecnico.name} <Dt size={16} color={light ? 'var(--dark2)' : 'var(--cero)'} />DT </Grid>
                                                    </Grid>}
                                                {tecnico.roja_partido[currentRound] !== 0 &&
                                                    <Grid item container alignItems={'center'} sx={{ color: light ? 'var(--dark2)' : 'var(--gris)' }}>
                                                        <Grid item sx={{ color: light ? 'var(--dark2)' : 'var(--cero)' }}>{tecnico.roja_partido[currentRound]}</Grid>
                                                        <Grid sx={{ background: 'var(--danger)', height: '13px', width: '9px', borderRadius: '2px' }} />
                                                        <Grid item ml={2.5} sx={{ display: 'flex', alignItems: 'center', fontSize: mobile ? '9px' : '14px' }}>{tecnico.name} <Dt size={16} color={light ? 'var(--dark2)' : 'var(--cero)'} />DT </Grid>
                                                    </Grid>}
                                                {tecnico.azul_partido[currentRound] !== 0 &&
                                                    <Grid item container alignItems={'center'} sx={{ color: light ? 'var(--dark2)' : 'var(--gris)' }}>
                                                        <Grid item sx={{ color: light ? 'var(--dark2)' : 'var(--cero)' }}>{tecnico.azul_partido[currentRound]}</Grid>
                                                        <Grid sx={{ background: 'var(--primario)', height: '13px', width: '9px', borderRadius: '2px' }} />
                                                        <Grid item ml={2.5} sx={{ display: 'flex', alignItems: 'center', fontSize: mobile ? '9px' : '14px' }}>{tecnico.name} <Dt size={16} color={light ? 'var(--dark2)' : 'var(--cero)'} />DT </Grid>
                                                    </Grid>}
                                                {tecnico.figura_partido[currentRound] !== 0 &&
                                                    <Grid item container alignItems={'center'} sx={{ color: light ? 'var(--dark2)' : 'var(--gris)' }}>
                                                        <Grid sx={{ color: light ? 'var(--dark2)' : 'var(--cero)' }}>{tecnico.figura_partido[currentRound]}</Grid>
                                                        <Figura color={'var(--warnning)'} />
                                                        <Grid ml={2} item sx={{ display: 'flex', alignItems: 'center', fontSize: mobile ? '9px' : '14px' }}>{tecnico.name} </Grid>
                                                    </Grid>}
                                            </>
                                        )
                                    })}
                                    {homeTeam?.jugadores.map((jugador) => {
                                        return (
                                            <>
                                                {jugador.gol_partido_individual[currentRound] !== 0 &&
                                                    <Grid item container alignItems={'center'} sx={{ color: light ? 'var(--dark2)' : 'var(--gris)' }}>
                                                        <Grid sx={{ color: light ? 'var(--dark2)' : 'var(--cero)' }}>{jugador.gol_partido_individual[currentRound]}</Grid>
                                                        <Gol color={light ? 'var(--dark2)' : 'var(--cero)'} />
                                                        <Grid ml={2} item sx={{ display: 'flex', alignItems: 'center', fontSize: mobile ? '9px' : '14px' }}>{jugador.name} </Grid>
                                                    </Grid>}
                                                {jugador.asistencia_partido_individual[currentRound] !== 0 &&
                                                    <Grid item container alignItems={'center'} sx={{ color: light ? 'var(--dark2)' : 'var(--gris)' }}>
                                                        <Grid sx={{ color: light ? 'var(--dark2)' : 'var(--cero)' }}>{jugador.asistencia_partido_individual[currentRound]}</Grid>
                                                        <Asistir color={light ? 'var(--dark2)' : 'var(--cero)'} />
                                                        <Grid ml={2} item sx={{ display: 'flex', alignItems: 'center', fontSize: mobile ? '9px' : '14px' }}>{jugador.name} </Grid>
                                                    </Grid>}
                                                {jugador.amarilla_partido_individual[currentRound] !== 0 &&
                                                    <Grid item container alignItems={'center'} sx={{ color: light ? 'var(--dark2)' : 'var(--gris)' }}>
                                                        <Grid sx={{ color: light ? 'var(--dark2)' : 'var(--cero)' }}>{jugador.amarilla_partido_individual[currentRound]}</Grid>
                                                        <Grid sx={{ background: 'var(--warnning)', height: '13px', width: '9px', borderRadius: '2px' }} />
                                                        <Grid ml={2.5} item sx={{ display: 'flex', alignItems: 'center', fontSize: mobile ? '9px' : '14px' }}>{jugador.name} </Grid>
                                                    </Grid>}
                                                {jugador.roja_partido_individual[currentRound] !== 0 &&
                                                    <Grid item container alignItems={'center'} sx={{ color: light ? 'var(--dark2)' : 'var(--gris)' }}>
                                                        <Grid sx={{ color: light ? 'var(--dark2)' : 'var(--cero)' }}>{jugador.roja_partido_individual[currentRound]}</Grid>
                                                        <Grid sx={{ background: 'var(--danger)', height: '13px', width: '9px', borderRadius: '2px' }} />
                                                        <Grid ml={2.5} item sx={{ display: 'flex', alignItems: 'center', fontSize: mobile ? '9px' : '14px' }}>{jugador.name} </Grid>
                                                    </Grid>}
                                                {jugador.azul_partido_individual[currentRound] !== 0 &&
                                                    <Grid item container alignItems={'center'} sx={{ color: light ? 'var(--dark2)' : 'var(--gris)' }}>
                                                        <Grid sx={{ color: light ? 'var(--dark2)' : 'var(--cero)' }}>{jugador.azul_partido_individual[currentRound]}</Grid>
                                                        <Grid sx={{ background: 'var(--primario)', height: '13px', width: '9px', borderRadius: '2px' }} />
                                                        <Grid ml={2.5} item sx={{ display: 'flex', alignItems: 'center', fontSize: mobile ? '9px' : '14px' }}>{jugador.name} </Grid>
                                                    </Grid>}
                                                {jugador.jugador_figura_individual[currentRound] !== 0 &&
                                                    <Grid item container alignItems={'center'} sx={{ color: light ? 'var(--dark2)' : 'var(--gris)' }}>
                                                        <Grid sx={{ color: light ? 'var(--dark2)' : 'var(--cero)' }}>{jugador.jugador_figura_individual[currentRound]}</Grid>
                                                        <Figura color={'var(--warnning)'} />
                                                        <Grid ml={2} item sx={{ display: 'flex', alignItems: 'center', fontSize: mobile ? '9px' : '14px' }}>{jugador.name} </Grid>
                                                    </Grid>}
                                            </>
                                        )
                                    })}
                                </Grid>
                                <Grid>
                                    <img style={{ height: '30px' }} src={awayTeam?.logo} alt="" />
                                    {awayTeam?.director_tecnico.map((tecnico) => {
                                        return (
                                            <>
                                                {tecnico.amarilla_partido[currentRound] !== 0 &&
                                                    <Grid item container alignItems={'center'} sx={{ color: light ? 'var(--dark2)' : 'var(--gris)' }}>
                                                        <Grid item sx={{ color: light ? 'var(--dark2)' : 'var(--cero)' }}>{tecnico.amarilla_partido[currentRound]}</Grid>
                                                        <Grid sx={{ background: 'var(--warnning)', height: '13px', width: '9px', borderRadius: '2px' }} />
                                                        <Grid item ml={2} sx={{ display: 'flex', alignItems: 'center', fontSize: mobile ? '9px' : '14px' }}>{tecnico.name} <Dt size={16} color={light ? 'var(--dark2)' : 'var(--cero)'} />DT </Grid>
                                                    </Grid>}
                                                {tecnico.roja_partido[currentRound] !== 0 &&
                                                    <Grid item container alignItems={'center'} sx={{ color: light ? 'var(--dark2)' : 'var(--gris)' }}>
                                                        <Grid item sx={{ color: light ? 'var(--dark2)' : 'var(--cero)' }}>{tecnico.roja_partido[currentRound]}</Grid>
                                                        <Grid sx={{ background: 'var(--danger)', height: '13px', width: '9px', borderRadius: '2px' }} />
                                                        <Grid item ml={2.5} sx={{ display: 'flex', alignItems: 'center', fontSize: mobile ? '9px' : '14px' }}>{tecnico.name} <Dt size={16} color={light ? 'var(--dark2)' : 'var(--cero)'} />DT </Grid>
                                                    </Grid>}
                                                {tecnico.azul_partido[currentRound] !== 0 &&
                                                    <Grid item container alignItems={'center'} sx={{ color: light ? 'var(--dark2)' : 'var(--gris)' }}>
                                                        <Grid item sx={{ color: light ? 'var(--dark2)' : 'var(--cero)' }}>{tecnico.azul_partido[currentRound]}</Grid>
                                                        <Grid sx={{ background: 'var(--primario)', height: '13px', width: '9px', borderRadius: '2px' }} />
                                                        <Grid item ml={2.5} sx={{ display: 'flex', alignItems: 'center', fontSize: mobile ? '9px' : '14px' }}>{tecnico.name} <Dt size={16} color={light ? 'var(--dark2)' : 'var(--cero)'} />DT </Grid>
                                                    </Grid>}
                                                {tecnico.figura_partido[currentRound] !== 0 &&
                                                    <Grid item container alignItems={'center'} sx={{ color: light ? 'var(--dark2)' : 'var(--gris)' }}>
                                                        <Grid sx={{ color: light ? 'var(--dark2)' : 'var(--cero)' }}>{tecnico.figura_partido[currentRound]}</Grid>
                                                        <Figura color={'var(--warnning)'} />
                                                        <Grid ml={2} item sx={{ display: 'flex', alignItems: 'center', fontSize: mobile ? '9px' : '14px' }}>{tecnico.name} </Grid>
                                                    </Grid>}
                                            </>
                                        )
                                    })}
                                    {awayTeam?.jugadores.map((jugador) => {
                                        return (
                                            <>
                                                {jugador.gol_partido_individual[currentRound] !== 0 &&
                                                    <Grid item container alignItems={'center'} sx={{ color: light ? 'var(--dark2)' : 'var(--gris)' }}>
                                                        <Grid sx={{ color: light ? 'var(--dark2)' : 'var(--cero)' }}>{jugador.gol_partido_individual[currentRound]}</Grid>
                                                        <Gol color={light ? 'var(--dark2)' : 'var(--cero)'} />
                                                        <Grid ml={2} item sx={{ display: 'flex', alignItems: 'center', fontSize: mobile ? '9px' : '14px' }}>{jugador.name} </Grid>
                                                    </Grid>}
                                                {jugador.asistencia_partido_individual[currentRound] !== 0 &&
                                                    <Grid item container alignItems={'center'} sx={{ color: light ? 'var(--dark2)' : 'var(--gris)' }}>
                                                        <Grid sx={{ color: light ? 'var(--dark2)' : 'var(--cero)' }}>{jugador.asistencia_partido_individual[currentRound]}</Grid>
                                                        <Asistir color={light ? 'var(--dark2)' : 'var(--cero)'} />
                                                        <Grid ml={2} item sx={{ display: 'flex', alignItems: 'center', fontSize: mobile ? '9px' : '14px' }}>{jugador.name} </Grid>
                                                    </Grid>}
                                                {jugador.amarilla_partido_individual[currentRound] !== 0 &&
                                                    <Grid item container alignItems={'center'} sx={{ color: light ? 'var(--dark2)' : 'var(--gris)' }}>
                                                        <Grid sx={{ color: light ? 'var(--dark2)' : 'var(--cero)' }}>{jugador.amarilla_partido_individual[currentRound]}</Grid>
                                                        <Grid sx={{ background: 'var(--warnning)', height: '13px', width: '9px', borderRadius: '2px' }} />
                                                        <Grid ml={2.5} item sx={{ display: 'flex', alignItems: 'center', fontSize: mobile ? '9px' : '14px' }}>{jugador.name} </Grid>
                                                    </Grid>}
                                                {jugador.roja_partido_individual[currentRound] !== 0 &&
                                                    <Grid item container alignItems={'center'} sx={{ color: light ? 'var(--dark2)' : 'var(--gris)' }}>
                                                        <Grid sx={{ color: light ? 'var(--dark2)' : 'var(--cero)' }}>{jugador.roja_partido_individual[currentRound]}</Grid>
                                                        <Grid sx={{ background: 'var(--danger)', height: '13px', width: '9px', borderRadius: '2px' }} />
                                                        <Grid ml={2.5} item sx={{ display: 'flex', alignItems: 'center', fontSize: mobile ? '9px' : '14px' }}>{jugador.name} </Grid>
                                                    </Grid>}
                                                {jugador.azul_partido_individual[currentRound] !== 0 &&
                                                    <Grid item container alignItems={'center'} sx={{ color: light ? 'var(--dark2)' : 'var(--gris)' }}>
                                                        <Grid sx={{ color: light ? 'var(--dark2)' : 'var(--cero)' }}>{jugador.azul_partido_individual[currentRound]}</Grid>
                                                        <Grid sx={{ background: 'var(--primario)', height: '13px', width: '9px', borderRadius: '2px' }} />
                                                        <Grid ml={2.5} item sx={{ display: 'flex', alignItems: 'center', fontSize: mobile ? '9px' : '14px' }}>{jugador.name} </Grid>
                                                    </Grid>}
                                                {jugador.jugador_figura_individual[currentRound] !== 0 &&
                                                    <Grid item container alignItems={'center'} sx={{ color: light ? 'var(--dark2)' : 'var(--gris)' }}>
                                                        <Grid sx={{ color: light ? 'var(--dark2)' : 'var(--cero)' }}>{jugador.jugador_figura_individual[currentRound]}</Grid>
                                                        <Figura color={'var(--warnning)'} />
                                                        <Grid ml={2} item sx={{ display: 'flex', alignItems: 'center', fontSize: mobile ? '9px' : '14px' }}>{jugador.name} </Grid>
                                                    </Grid>}
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