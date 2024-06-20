import React, { useContext, useEffect, useState } from "react";
import Context from "../../context/contextPrincipal";
import { Avatar, CircularProgress, Grid, Paper, Table, TableBody, TableContainer, TableHead, TableRow, useMediaQuery } from '@mui/material';
import { TbError404 as Err404 } from 'react-icons/tb';
import { TbMoodEmpty as Vacio } from 'react-icons/tb';
import { ModalJugadorInfo } from "../modals/Jugador/ModalInfoJugador";
import { jugadoresAsistidores, seleccionarData, stringAvatar } from "../../utils/utils";
import { StyledTableCell } from "../Material/StyledTableCell";
import { StyledTableRow } from "../Material/StyledTableRow";
import { useRouter } from "next/router";

export const TablaAsistidores = ({ data, isLoading, isError }) => {
    const [light] = useContext(Context);
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });
    const [showImage, setShowImage] = useState(false);
    const [modalJugadorInfo, setModalJugadorInfo] = useState(false);
    const [jugadorSeleccionado, setJugadorSeleccionado] = useState(null);
    const router = useRouter();

    useEffect(() => {
        if (!isLoading) {
            const timeoutId = setTimeout(() => {
                setShowImage(true);
            }, 1000);
            return () => clearTimeout(timeoutId);
        }
    }, [isLoading]);

    const filterName = (name) => {
        const newFilter = data?.filter(data => data.name === name);
        return newFilter;
    }

    return (
        <>
            {isLoading ?
                <Grid mt={8} item sx={{ display: 'flex', flexDirection: 'row', gap: '16px', minWidth: !mobile ? '960px' : '100%', height: '500px', justifyContent: 'center', color: light ? 'var(--dark2)' : 'var(--cero)' }}>
                    <CircularProgress style={{ color: light ? 'var(--dark2)' : 'var(--cero)' }} />
                </Grid>
                : isError ?
                    <Grid mt={mobile ? 0 : 8} item sx={{ display: 'flex', flexDirection: 'column', gap: '16px', minWidth: !mobile ? '960px' : '100%', height: '500px', justifyContent: 'center', alignItems: 'center', color: light ? 'var(--dark2)' : 'var(--cero)' }}>
                        Ha ocurrido un error al cargar los jugadores <Err404 size={85} />
                    </Grid>
                    : jugadoresAsistidores(data, 10).length === 0 ?
                        <Grid mt={8} item sx={{ display: 'flex', flexDirection: 'row', gap: '16px', minWidth: !mobile ? '960px' : '100%', height: '500px', justifyContent: 'center', color: light ? 'var(--dark2)' : 'var(--cero)' }}>
                            No hay jugadores en la liga <Vacio size={25} />
                        </Grid>
                        : <Grid mt={2}>
                            <TableContainer component={Paper} >
                                <Table aria-label="customized table">
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell light={light} align="left">Nombre</StyledTableCell>
                                            <StyledTableCell light={light} align="left">Equipo</StyledTableCell>
                                            <StyledTableCell light={light} align={!mobile ? "center" : "right"}>Asistencias</StyledTableCell>
                                            <StyledTableCell light={light} align="center" style={{ whiteSpace: 'nowrap' }}>{!mobile ? 'Partidos Jugados' : 'PJ'}</StyledTableCell>
                                            <StyledTableCell light={light} align="right" style={{ whiteSpace: 'nowrap' }}>{!mobile ? 'Asistencias por partido' : 'AP'}</StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody style={{ background: light ? 'var(--cero)' : 'var(--dark3)' }}>
                                        {jugadoresAsistidores(data, 10).map((jugador, index) => {
                                            const promedioAsistencia: string = (jugador.asistencias / jugador.partidos).toFixed(2);
                                            const promedioAsistenciaNumber = parseFloat(promedioAsistencia);
                                            const promedioAsistenciaFormatted = isNaN(promedioAsistenciaNumber) ? '-' : promedioAsistenciaNumber.toFixed(2);
                                            return (
                                                <StyledTableRow light={light} key={jugador._id}>
                                                    <StyledTableCell light={light} component="th" scope="row">
                                                        <Grid item sx={{ display: 'flex', alignItems: 'center', flexDirection: 'row', width: !mobile ? '250px' : '100%', whiteSpace: 'nowrap' }}>
                                                            <Grid container sx={{ gap: '8px', alignItems: 'center', whiteSpace: 'nowrap', width: '40px' }}>
                                                                <Grid>{index + 1}</Grid>
                                                                {(index + 1 == 1) &&
                                                                    <Grid sx={{ background: 'var(--check)', height: '35px', width: '10px', whiteSpace: 'nowrap' }}></Grid>}
                                                            </Grid>
                                                            <Grid item container alignItems={'center'} justifyContent={'center'} sx={{ width: '55px', height: '35px', cursor: 'pointer' }} onClick={() => { seleccionarData(jugador, setJugadorSeleccionado, setModalJugadorInfo) }}>
                                                                <Avatar {...stringAvatar(jugador.name)} sx={{ height: '35px', width: '35px' }} />
                                                            </Grid>
                                                            <Grid item container alignItems={'center'} sx={{ whiteSpace: 'nowrap', width: !mobile ? '130px' : '90px', cursor: 'pointer' }} onClick={() => { seleccionarData(jugador, setJugadorSeleccionado, setModalJugadorInfo) }}>
                                                                {jugador.name}
                                                            </Grid>
                                                        </Grid>
                                                    </StyledTableCell>
                                                    <StyledTableCell light={light} align="center">
                                                        <Grid sx={{ display: 'flex', alignItems: 'center', gap: '18px' }} >
                                                            <Grid item container alignItems={'center'} justifyContent={'center'} sx={{ width: '55px', height: '35px', cursor: 'pointer' }} onClick={() => { router.push(`/manager/${filterName(jugador.equipo)[0]._id}`) }}>
                                                                <img src={jugador.logo} alt='.' style={{ height: '35px' }} />
                                                            </Grid>
                                                            {!mobile &&
                                                                <Grid item container alignItems={'center'} sx={{ whiteSpace: 'nowrap', width: '130px', cursor: 'pointer' }} onClick={() => { router.push(`/manager/${filterName(jugador.equipo)[0]._id}`) }}>
                                                                    {jugador.equipo}
                                                                </Grid>}
                                                        </Grid>
                                                    </StyledTableCell>
                                                    <StyledTableCell light={light} align="center" style={{ fontWeight: 700, fontSize: '15px', }}>{jugador.asistencias}</StyledTableCell>
                                                    <StyledTableCell light={light} align="center" >{jugador.partidos}</StyledTableCell>
                                                    {<StyledTableCell light={light} align="center">{promedioAsistenciaFormatted}</StyledTableCell>}
                                                </StyledTableRow>
                                            )
                                        })}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
            }
            {jugadorSeleccionado && (<ModalJugadorInfo open={modalJugadorInfo} setOpen={setModalJugadorInfo} jugador={jugadorSeleccionado} />)}
        </>
    );
}
