import { withStyles, Theme, createStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { UltimateP } from './UltimateP';
import { CircularProgress, Grid, useMediaQuery } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import Context from '../../context/contextPrincipal';
import { ArrowP } from './ArrowP';
import { TbError404 as Err404 } from 'react-icons/tb';
import { TbMoodEmpty as Vacio } from 'react-icons/tb';

export const PositionTable = ({ data, isLoading, isError }) => {
    const [light] = useContext(Context);
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });
    const [showImage, setShowImage] = useState(false);

    const orden = data.sort((a, b) => {
        if (a.puntos > b.puntos) {
            return -1;
        } else if (a.puntos < b.puntos) {
            return 1;
        }
        else if (a.diferencia_de_Goles > b.diferencia_de_Goles) {
            return -1;
        }
        else if (a.diferencia_de_Goles < b.diferencia_de_Goles) {
            return 1;
        }
        else if (a.tarjetasAmarillas < b.tarjetasAmarillas) {
            return -1;
        }
        else if (a.tarjetasAmarillas > b.tarjetasAmarillas) {
            return 1;
        } else {
            return 0;
        }
    });

    const StyledTableCell = withStyles((theme: Theme) =>
        createStyles({
            head: {
                backgroundColor: 'var(--dark2)',
                color: 'var(--cero)',
            },
            body: {
                fontSize: 12,
                color: light ? 'black' : 'var(--cero)'
            },
        }),
    )(TableCell);

    const StyledTableRow = withStyles((theme: Theme) =>
        createStyles({
            root: {
                '&:nth-of-type(odd)': {
                    backgroundColor: light ? theme.palette.action.hover : 'var(--dark)',
                },
            },
        }),
    )(TableRow);

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
    {isLoading ?
        <Grid mt={8} item sx={{display: 'flex',flexDirection: 'row',gap: '16px',minWidth: !mobile ? '960px' : '100%',height: '500px',justifyContent: 'center',color: light ? 'var(--dark2)' : 'var(--cero)'}}>
            <CircularProgress style={{ color: light ? 'var(--dark2)' : 'var(--cero)' }} />
        </Grid>
    : isError ?
        <Grid mt={mobile ? 0 : 8} item sx={{display: 'flex',flexDirection: 'column',gap: '16px',minWidth: !mobile ? '960px' : '100%',height: '500px',justifyContent: 'center',alignItems: 'center',color: light ? 'var(--dark2)' : 'var(--cero)'}}>
            Ha ocurrido un error al cargar los equipos <Err404 size={85} />
        </Grid>
    : data.length === 0 ?
        <Grid mt={8} item sx={{display: 'flex',flexDirection: 'row',gap: '16px',minWidth: !mobile ? '960px' : '100%',height: '500px',justifyContent: 'center',color: light ? 'var(--dark2)' : 'var(--cero)'}}>
            No hay equipos en la liga <Vacio size={25} />
        </Grid>
    : <Grid mt={2}>
            <TableContainer component={Paper}>
                <Table aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Club</StyledTableCell>
                            <StyledTableCell align="right">PTS</StyledTableCell>
                            <StyledTableCell align="right">PJ</StyledTableCell>
                            <StyledTableCell align="right">G</StyledTableCell>
                            <StyledTableCell align="right">E</StyledTableCell>
                            <StyledTableCell align="right">P</StyledTableCell>
                            <StyledTableCell align="right">GF</StyledTableCell>
                            <StyledTableCell align="right">GC</StyledTableCell>
                            <StyledTableCell align="right">DG</StyledTableCell>
                            <StyledTableCell align="center">Ultimos 5</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody style={{ background: light ? 'var(--cero)' : 'var(--dark3)' }}>
                        {orden.map((row, index) => {
                            return (
                                <StyledTableRow key={row._id}>
                                    <StyledTableCell component="th" scope="row">
                                        <Grid container alignItems={'center'} width={'300px'} flexDirection={'row'} sx={{ whiteSpace: 'nowrap' }}>
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
                                            <Grid item container alignItems={'center'} justifyContent={'center'} sx={{ width: '55px', height: '35px' }}>
                                                {isLoading || !showImage ?
                                                    (<CircularProgress style={{ color: light ? 'var(--dark2)' : 'var(--cero)' }} size={20} />)
                                                    : showImage ? <img src={row.logo} alt={row.name} style={{ height: '35px' }} />
                                                        : null}
                                            </Grid>
                                            <Grid item container alignItems={'center'} sx={{ whiteSpace: 'nowrap', width: '130px' }}>
                                                {row.name}
                                            </Grid>
                                            <Grid item container alignItems={'center'} justifyContent={'center'} sx={{ whiteSpace: 'nowrap', width: '30px' }}>
                                                <ArrowP currentPos={index + 1} prevPos={row.puntaje_anterior} />
                                            </Grid>
                                        </Grid>
                                    </StyledTableCell>
                                    <StyledTableCell align="right" style={{ fontWeight: 700, fontSize: '15px' }}>{row.puntos}</StyledTableCell>
                                    <StyledTableCell align="right">{row.partidosJugados}</StyledTableCell>
                                    <StyledTableCell align="right">{row.ganados}</StyledTableCell>
                                    <StyledTableCell align="right">{row.empates}</StyledTableCell>
                                    <StyledTableCell align="right">{row.perdidos}</StyledTableCell>
                                    <StyledTableCell align="right">{row.goles_a_Favor}</StyledTableCell>
                                    <StyledTableCell align="right">{row.goles_en_Contra}</StyledTableCell>
                                    <StyledTableCell align="right">{row.diferencia_de_Goles}</StyledTableCell>
                                    <StyledTableCell align="center"><UltimateP last5={row.last5} /></StyledTableCell>
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