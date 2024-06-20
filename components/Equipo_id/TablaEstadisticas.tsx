import React, { useContext, useState } from "react";
import { Avatar, CircularProgress, Grid, Paper, Table, TableBody, TableContainer, TableHead, TableRow, useMediaQuery } from "@mui/material";
import Context from "../../context/contextPrincipal";
import { TbMoodEmpty as Vacio } from 'react-icons/tb';
import { MdLocalHospital as Lesion } from 'react-icons/md';
import { VscSearchStop as Expulsado } from 'react-icons/vsc';
import { TbRectangleVertical as Tarjeta } from 'react-icons/tb';
import { StyledTableCell } from "../Material/StyledTableCell";
import { StyledTableRow } from "../Material/StyledTableRow";
import { stringAvatar, seleccionarData, filterLibreJugador } from "../../utils/utils";
import { ModalJugadorInfo } from "../modals/Jugador/ModalInfoJugador";
import { IoLogoClosedCaptioning as Capitan } from 'react-icons/io';

export const TablaEstadisticas = ({ jugadores, label, isLoading, goles, asistencias, amarillas, rojas }) => {
    const [light] = useContext(Context);
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });
    const [modalJugadorInfo, setModalJugadorInfo] = useState(false);
    const [jugadorSeleccionado, setJugadorSeleccionado] = useState(null);

    let jugadoresOrdenados;
    if (goles) {
        jugadoresOrdenados = filterLibreJugador(jugadores, 'No').sort((a, b) => b.goles - a.goles);
    } else if (asistencias) {
        jugadoresOrdenados = filterLibreJugador(jugadores, 'No').sort((a, b) => b.asistencias - a.asistencias);
    } else if (amarillas) {
        jugadoresOrdenados = filterLibreJugador(jugadores, 'No').sort((a, b) => b.tarjetas_amarillas - a.tarjetas_amarillas);
    } else if (rojas) {
        jugadoresOrdenados = filterLibreJugador(jugadores, 'No').sort((a, b) => b.tarjetas_roja - a.tarjetas_roja);
    } else {
        jugadoresOrdenados = filterLibreJugador(jugadores, 'No');
    }

    return (
        <>
            {isLoading ?
                <Grid mt={8} item sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '16px',
                    minWidth: !mobile ? '960px' : '100%',
                    height: mobile ? '300px' : '',
                    justifyContent: 'center',
                    color: light ? 'var(--dark2)' : 'var(--cero)'
                }}>
                    <CircularProgress style={{ color: light ? 'var(--dark2)' : 'var(--cero)' }} />
                </Grid>
                : jugadores.length === 0 ?
                    <Grid mt={8} item sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '16px',
                        minWidth: !mobile ? '960px' : '100%',
                        height: mobile ? '300px' : '',
                        justifyContent: 'center',
                        color: light ? 'var(--dark2)' : 'var(--cero)'
                    }}>
                        No hay jugadores en este equipo <Vacio size={25} />
                    </Grid>
                    :
                    <Grid mt={2}>
                        <TableContainer component={Paper}>
                            <Table aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell light={light}><Grid item sx={{ whiteSpace: 'nowrap' }}>{label}</Grid></StyledTableCell>
                                        <StyledTableCell light={light} />
                                        <StyledTableCell light={light} />
                                    </TableRow>
                                </TableHead>
                                <TableBody style={{ background: light ? 'var(--cero)' : 'var(--dark3)' }}>
                                    {jugadoresOrdenados.map((jugador, index) => {
                                        return (
                                            <StyledTableRow disabled={jugador.inscrito === 'No'} light={light} key={jugador.id} style={{ background: jugador.suspendido === 'Si' ? 'var(--danger2)' : '' }}>
                                                <StyledTableCell light={light} component="th" scope="row">
                                                    <Grid container alignItems={'center'} gap={2} sx={{ whiteSpace: 'nowrap', width: '70px' }}>
                                                        <Grid>{index + 1}</Grid>
                                                        {(jugador.posicion == 'Portero') &&
                                                            <Grid sx={{ color: 'var(--warnning)', fontWeight: 700, fontSize: '17px' }}>POR</Grid>}
                                                        {(jugador.posicion == 'Defensa') &&
                                                            <Grid sx={{ color: 'var(--gris)', fontWeight: 700, fontSize: '17px' }}>DEF</Grid>}
                                                        {(jugador.posicion == 'Medio') &&
                                                            <Grid sx={{ color: 'var(--check)', fontWeight: 700, fontSize: '17px' }}>MED</Grid>}
                                                        {(jugador.posicion == 'Delantero') &&
                                                            <Grid sx={{ color: 'var(--primario)', fontWeight: 700, fontSize: '17px' }}>DEL</Grid>}
                                                    </Grid>
                                                </StyledTableCell>
                                                <StyledTableCell light={light} align="right" style={{ whiteSpace: 'nowrap' }}>
                                                    <Grid sx={{ display: 'flex', alignItems: 'center', whiteSpace: 'nowrap', gap: '18px', cursor: 'pointer' }} onClick={() => { seleccionarData(jugador, setJugadorSeleccionado, setModalJugadorInfo) }}>
                                                        <Avatar {...stringAvatar(jugador.name)} sx={{ height: '35px', width: '35px' }} />
                                                        <Grid sx={{ whiteSpace: 'nowrap', paddingRight: mobile ? '30px' : '', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                            {jugador.name}
                                                            {jugador.capitan === 'Si' &&
                                                                <Grid item sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                                    <Grid item sx={{ color: light ? 'var(--dark2)' : 'var(--cero)', border: light ? 'solid 1px var(--dark2)' : 'solid 1px var(--cero)', height: '20px', width: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                                        <Capitan size={20} />
                                                                    </Grid>
                                                                </Grid>}
                                                            {jugador.lesion === 'Si' &&
                                                                <Grid item sx={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                                    <Lesion size={20} />
                                                                    <Grid sx={{ color: 'var(--neutral)' }}>{'(Lesionado)'}</Grid>
                                                                </Grid>}
                                                            {jugador.tarjetas_acumuladas > 0 && (<Grid item sx={{ display: 'flex', alignItems: 'center' }}>{jugador.tarjetas_acumuladas}<Tarjeta color={'var(--warnning)'} size={20} /></Grid>)}
                                                            {jugador.suspendido === 'Si' && (
                                                                <Grid item sx={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                                    <Expulsado size={20} />
                                                                    <Grid sx={{ color: 'var(--neutral)' }}>{`(expulsado ${jugador.jornadas_suspendido} jornada)`}</Grid>
                                                                </Grid>)}
                                                        </Grid>
                                                    </Grid>
                                                </StyledTableCell>
                                                <StyledTableCell light={light} align="left" style={{ fontWeight: index === 0 ? 700 : 500, fontSize: index === 0 ? '18px' : '15px' }}>
                                                    {goles ? (
                                                        <Grid item>{jugador.goles}</Grid>
                                                    ) : asistencias ? (
                                                        <Grid item>{jugador.asistencias}</Grid>
                                                    ) : amarillas ? (
                                                        <Grid item>{jugador.tarjetas_amarillas}</Grid>
                                                    ) : rojas ? (
                                                        <Grid item>{jugador.tarjetas_roja}</Grid>
                                                    ) : (
                                                        null
                                                    )}
                                                </StyledTableCell>
                                            </StyledTableRow>
                                        )
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>}
            {jugadorSeleccionado && (<ModalJugadorInfo open={modalJugadorInfo} setOpen={setModalJugadorInfo} jugador={jugadorSeleccionado} />)}
        </>
    )
}