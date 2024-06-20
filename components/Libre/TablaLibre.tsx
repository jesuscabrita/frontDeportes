import React, { useContext } from "react";
import { Avatar, CircularProgress, Grid, Paper, Table, TableBody, TableContainer, TableHead, TableRow, useMediaQuery } from "@mui/material"
import { TbMoodEmpty as Vacio } from 'react-icons/tb';
import { StyledTableCell } from "../Material/StyledTableCell";
import { StyledTableRow } from "../Material/StyledTableRow";
import { jugadoresLibres, stringAvatar } from "../../utils/utils";
import { FaFileContract as Contrato } from 'react-icons/fa';
import { ButtonSend } from "../Material/ButtonSend";
import Context from "../../context/contextPrincipal";

export const TablaLibre = ({ isLoading, jugadores }) => {
    const [light] = useContext(Context);
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });

    return (
        <Grid item sx={{ width: '100%' }}>
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
                : jugadoresLibres(jugadores, 10).length === 0 ?
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
                    <TableContainer component={Paper} >
                        <Table aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell light={light}><Grid item sx={{ whiteSpace: 'nowrap' }}>Jugador</Grid></StyledTableCell>
                                    <StyledTableCell light={light} />
                                    <StyledTableCell light={light} />
                                </TableRow>
                            </TableHead>
                            <TableBody style={{ background: light ? 'var(--cero)' : 'var(--dark3)' }}>
                                {jugadoresLibres(jugadores, 10).map((jugador, index) => {
                                    return (
                                        <StyledTableRow light={light} key={jugador.id} style={{ background: jugador.suspendido === 'Si' ? 'var(--danger2)' : '' }}>
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
                                                <Grid sx={{ display: 'flex', alignItems: 'center', whiteSpace: 'nowrap', gap: '18px', cursor: 'pointer' }} onClick={() => { null }}>
                                                    <Avatar {...stringAvatar(jugador.name)} sx={{ height: '35px', width: '35px' }} />
                                                    <Grid sx={{ whiteSpace: 'nowrap', paddingRight: mobile ? '30px' : '', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                        {jugador.name}
                                                    </Grid>
                                                </Grid>
                                            </StyledTableCell>
                                            <StyledTableCell light={light} align="left" style={{ fontWeight: index === 0 ? 700 : 500, fontSize: index === 0 ? '18px' : '15px' }}>
                                                <ButtonSend title={'Fichar'} icon={Contrato} disable={false} handle={() => { null }} iconSize={20} iconColor={'var(--check)'} />
                                            </StyledTableCell>
                                        </StyledTableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>}
        </Grid>
    )
}