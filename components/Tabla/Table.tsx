import React, { useContext, useEffect, useState } from 'react';
import { UltimateP } from '../Shared/UltimateP';
import { CircularProgress, Grid, Paper, Table, TableBody, TableContainer, useMediaQuery } from '@mui/material';
import Context from '../../context/contextPrincipal';
import { ArrowP } from '../Shared/ArrowP';
import { TbError404 as Err404 } from 'react-icons/tb';
import { TbMoodEmpty as Vacio } from 'react-icons/tb';
import { useRouter } from 'next/router';
import { getLast5ToShow, ordenPosition } from '../../utils/utils';
import { StyledTableCell } from '../Material/StyledTableCell';
import { StyledTableRow } from '../Material/StyledTableRow';
import { CustomTableHead } from '../Material/CustomTableHead';
import { headers } from '../../utils/arrays';

export const PositionTable = ({ data, isLoading, isError }) => {
    const [light] = useContext(Context);
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });
    const [showImage, setShowImage] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (!isLoading) {
            const timeoutId = setTimeout(() => {
                setShowImage(true);
            }, 1000);
            return () => clearTimeout(timeoutId);
        }
    }, [isLoading]);

    return (
        <>
            {isLoading ?
                <Grid mt={8} item sx={{ display: 'flex', flexDirection: 'row', gap: '16px', minWidth: !mobile ? '960px' : '100%', height: '500px', justifyContent: 'center', color: light ? 'var(--dark2)' : 'var(--cero)' }}>
                    <CircularProgress style={{ color: light ? 'var(--dark2)' : 'var(--cero)' }} />
                </Grid>
                : isError ?
                    <Grid mt={mobile ? 0 : 8} item sx={{ display: 'flex', flexDirection: 'column', gap: '16px', minWidth: !mobile ? '960px' : '100%', height: '500px', justifyContent: 'center', alignItems: 'center', color: light ? 'var(--dark2)' : 'var(--cero)' }}>
                        Ha ocurrido un error al cargar los equipos <Err404 size={85} />
                    </Grid>
                    : data.length === 0 ?
                        <Grid mt={8} item sx={{ display: 'flex', flexDirection: 'row', gap: '16px', minWidth: !mobile ? '960px' : '100%', height: '500px', justifyContent: 'center', color: light ? 'var(--dark2)' : 'var(--cero)' }}>
                            No hay equipos en la liga <Vacio size={25} />
                        </Grid>
                        : <Grid mt={2}>
                            <TableContainer component={Paper}>
                                <Table aria-label="customized table">
                                    <CustomTableHead headers={headers} />
                                    <TableBody style={{ background: light ? 'var(--cero)' : 'var(--dark3)' }}>
                                        {ordenPosition(data).map((row, index) => {
                                            return (
                                                <StyledTableRow light={light} key={row._id}>
                                                    <StyledTableCell light={light} component="th" scope="row">
                                                        <Grid item sx={{ display: 'flex', alignItems: 'center', flexDirection: 'row', whiteSpace: 'nowrap', width: !mobile ? '300px' : '100%' }}>
                                                            <Grid container sx={{ gap: '8px', alignItems: 'center', whiteSpace: 'nowrap', width: '40px' }}>
                                                                {(index + 1 == 1) &&
                                                                    <Grid sx={{ background: 'var(--check)', height: '35px', width: '10px', whiteSpace: 'nowrap' }}></Grid>}
                                                                {(index + 1 == 2 || index + 1 == 3 || index + 1 == 4 || index + 1 == 5 || index + 1 == 6 || index + 1 == 7 || index + 1 == 8) &&
                                                                    <Grid sx={{ background: 'var(--primario)', height: '35px', width: '10px', whiteSpace: 'nowrap' }}></Grid>}
                                                                {(index + 1 == 13 || index + 1 == 14) &&
                                                                    <Grid sx={{ background: 'var(--danger)', height: '35px', width: '10px', whiteSpace: 'nowrap' }}></Grid>}
                                                                {(index + 1 == 9 || index + 1 == 10 || index + 1 == 11 || index + 1 == 12) &&
                                                                    <Grid sx={{ background: 'var(--warnning)', height: '35px', width: '10px', whiteSpace: 'nowrap' }}></Grid>}
                                                                <Grid>{index + 1}</Grid>
                                                            </Grid>
                                                            <Grid item sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '55px', height: '35px', cursor: 'pointer' }} onClick={() => { router.push(`/manager/${row._id}`) }}>
                                                                {isLoading || !showImage ?
                                                                    (<CircularProgress style={{ color: light ? 'var(--dark2)' : 'var(--cero)' }} size={20} />)
                                                                    : showImage ? <img src={row.logo} alt={row.name} style={{ height: '35px' }} />
                                                                        : null}
                                                            </Grid>
                                                            <Grid item sx={{ display: 'flex', alignItems: 'center', whiteSpace: 'nowrap', width: !mobile ? '130px' : '110px', cursor: 'pointer' }} onClick={() => { router.push(`/manager/${row._id}`) }}>
                                                                {row.name}
                                                            </Grid>
                                                            {row.partidosJugados >= 1 &&
                                                                <Grid item sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', whiteSpace: 'nowrap', width: '30px' }}>
                                                                    <ArrowP currentPos={index} prevPos={row.puntaje_anterior} />
                                                                </Grid>}
                                                        </Grid>
                                                    </StyledTableCell>
                                                    <StyledTableCell light={light} align="right" style={{ fontWeight: 700, fontSize: '15px' }}>{row.puntos}</StyledTableCell>
                                                    <StyledTableCell light={light} align="right">{row.partidosJugados}</StyledTableCell>
                                                    <StyledTableCell light={light} align="right">{row.ganados}</StyledTableCell>
                                                    <StyledTableCell light={light} align="right">{row.empates}</StyledTableCell>
                                                    <StyledTableCell light={light} align="right">{row.perdidos}</StyledTableCell>
                                                    <StyledTableCell light={light} align="right">{row.goles_a_Favor}</StyledTableCell>
                                                    <StyledTableCell light={light} align="right">{row.goles_en_Contra}</StyledTableCell>
                                                    <StyledTableCell light={light} align="right">{row.diferencia_de_Goles}</StyledTableCell>
                                                    <StyledTableCell light={light} align="center"><UltimateP last5={getLast5ToShow(row, 5).reverse()} /></StyledTableCell>
                                                </StyledTableRow>
                                            )
                                        })}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
            }
        </>
    );
}