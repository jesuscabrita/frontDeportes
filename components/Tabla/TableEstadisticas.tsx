import React, { useContext, useEffect, useState } from 'react';
import { Avatar, Grid, Paper, Table, TableBody, TableContainer, TableHead, TableRow } from '@mui/material';
import { TbMoodEmpty as Vacio } from 'react-icons/tb';
import { MdCategory } from "react-icons/md";
import StyledTableCell from '../Material/StyledTableCell';
import StyledTableRow from '../Material/StyledTableRow';
import { jugadoresGoleadores, seleccionarData, stringAvatar } from '../../utils/utils';
import { ModalJugadorInfo } from '../modals/Jugador/ModalInfoJugador';

interface TableEstadisticasProps {
    data: { name: string; _id: string; }[];
    titleTable: string;
    SubTitle: string;
    isLoading: boolean;
    mobile: boolean;
    light: boolean;
    nameEstadistida: string;
    router: any;
}

export const TableEstadisticas: React.FC<TableEstadisticasProps> = ({
    data,
    isLoading,
    SubTitle,
    titleTable,
    mobile,
    light,
    nameEstadistida,
    router,
}) => {
    const [modalJugadorInfo, setModalJugadorInfo] = useState(false);
    const [jugadorSeleccionado, setJugadorSeleccionado] = useState(null);

    const filterName = (name) => {
        const newFilter = data?.filter(data => data.name === name);
        return newFilter;
    }

    return (
        <Grid item container>
            {titleTable === 'Elija una opción' || SubTitle === 'Elija una opción' ?
                <Grid item height={mobile ? "55vh" : '50vh'} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', color: light ? "var(--dark2)" : "var(--gris)", flexDirection: 'column', fontSize: mobile ? '14px' : '16px', textAlign: 'center' }}>
                    <MdCategory size={140} />
                    Debes seleccionar una categoria y sub-categoria
                </Grid>
                :
                jugadoresGoleadores(data, 10)?.length === 0 ?
                    <Grid item height={mobile ? "55vh" : '50vh'} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', color: light ? "var(--dark2)" : "var(--gris)", flexDirection: 'column', fontSize: mobile ? '14px' : '16px' }}>
                        <Vacio size={140} />
                        {`No hay jugadores en ${titleTable}`}
                    </Grid>
                    :
                    <Grid item container>
                        <Grid item container mb={1} alignItems={'center'} flexDirection={'column'} justifyContent={'center'} sx={{ color: light ? "var(--dark2)" : "var(--cero)", letterSpacing: '2px', fontSize: '20px', fontWeight: '500' }}>
                            {`${nameEstadistida} en  ${titleTable}`}
                            <span style={{ fontSize: '14px', fontWeight: '400' }}>{SubTitle}</span>
                        </Grid>
                        <TableContainer component={Paper}>
                            <Table aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell light={light} align="center">Nombre</StyledTableCell>
                                        <StyledTableCell light={light} align="center">Equipo</StyledTableCell>
                                        <StyledTableCell light={light} align={"center"}>{nameEstadistida}</StyledTableCell>
                                        <StyledTableCell light={light} align="center" style={{ whiteSpace: 'nowrap' }}>{'PJ'}</StyledTableCell>
                                        <StyledTableCell light={light} align="center" style={{ whiteSpace: 'nowrap' }}>{mobile ? 'GP' : 'Promedio'}</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody style={{ background: light ? 'var(--cero)' : 'var(--dark3)' }}>
                                    {jugadoresGoleadores(data, 10).map((jugador, index) => {
                                        const promedioGol: string = (jugador.goles / jugador.partidos).toFixed(2);
                                        const promedioGolNumber = parseFloat(promedioGol);
                                        const promedioGolFormatted = isNaN(promedioGolNumber) ? '-' : promedioGolNumber.toFixed(2);
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
                                                            <Avatar {...stringAvatar(jugador.name)} sx={{ height: '35px', width: '35px', background: !light ? '#aab4be' : '#1F2937', color: !light ? '#1F2937' : 'white' }} />
                                                        </Grid>
                                                        <Grid item container alignItems={'center'} sx={{ whiteSpace: 'nowrap', width: !mobile ? '110px' : '100px', cursor: 'pointer', letterSpacing: '2px', fontSize: mobile ? '11px' : '14px', fontWeight: '500' }} onClick={() => { seleccionarData(jugador, setJugadorSeleccionado, setModalJugadorInfo) }}>
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
                                                            <Grid item container alignItems={'center'} sx={{ whiteSpace: 'nowrap', width: '130px', cursor: 'pointer', letterSpacing: '2px', fontSize: mobile ? '11px' : '14px', fontWeight: '500' }} onClick={() => { router.push(`/manager/${filterName(jugador.equipo)[0]._id}`) }}>
                                                                {jugador.equipo}
                                                            </Grid>}
                                                    </Grid>
                                                </StyledTableCell>
                                                <StyledTableCell light={light} align="center" style={{ fontWeight: 700, fontSize: '15px' }}>{jugador.goles}</StyledTableCell>
                                                <StyledTableCell light={light} align="center" >{jugador.partidos}</StyledTableCell>
                                                {<StyledTableCell light={light} align="center">{promedioGolFormatted}</StyledTableCell>}
                                            </StyledTableRow>
                                        )
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
            }
            {jugadorSeleccionado && (<ModalJugadorInfo open={modalJugadorInfo} setOpen={setModalJugadorInfo} jugador={jugadorSeleccionado} />)}
        </Grid>
    )
}