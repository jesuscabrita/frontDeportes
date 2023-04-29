import { useContext, useEffect, useState } from "react";
import Context from "../../context/contextPrincipal";
import { withStyles, Theme, createStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { CircularProgress, Grid, useMediaQuery } from '@mui/material';
import { TbError404 as Err404 } from 'react-icons/tb';
import { TbMoodEmpty as Vacio } from 'react-icons/tb';

export const TablaRojas = ({ data, isLoading, isError }) => {
    const [light] = useContext(Context);
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });
    const [showImage, setShowImage] = useState(false);

    const jugadoresMasRojas = data.flatMap((equipo) => equipo.jugadores)
        .sort((a, b) => b.tarjetas_roja - a.tarjetas_roja)
        .slice(0, 10);

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
            Ha ocurrido un error al cargar los jugadores <Err404 size={85} />
        </Grid>
    : data.length === 0 ?
        <Grid mt={8} item sx={{display: 'flex',flexDirection: 'row',gap: '16px',minWidth: !mobile ? '960px' : '100%',height: '500px',justifyContent: 'center',color: light ? 'var(--dark2)' : 'var(--cero)'}}>
            No hay jugadores en la liga <Vacio size={25} />
        </Grid>
    :  <Grid mt={2}>
            <TableContainer component={Paper} >
                <Table aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="left">Nombre</StyledTableCell>
                            <StyledTableCell align="left">Equipo</StyledTableCell>
                            <StyledTableCell align={!mobile ? "center" : "right"} style={{ whiteSpace: 'nowrap' }}>Tarjetas Rojas</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody style={{ background: light ? 'var(--cero)' : 'var(--dark3)' }}>
                        {jugadoresMasRojas.map((jugador, index) => {
                            return (
                                <StyledTableRow key={jugador._id}>
                                    <StyledTableCell component="th" scope="row">
                                        <Grid container alignItems={'center'} width={'250px'} flexDirection={'row'} sx={{ whiteSpace: 'nowrap' }}>
                                            <Grid container sx={{ gap: '8px', alignItems: 'center', whiteSpace: 'nowrap', width: '40px' }}>
                                                <Grid>{index + 1}</Grid>
                                                {(index + 1 == 1) &&
                                                    <Grid sx={{ background: 'var(--danger)', height: '35px', width: '10px', whiteSpace: 'nowrap' }}></Grid>}
                                            </Grid>
                                            <Grid item container alignItems={'center'} justifyContent={'center'} sx={{ width: '55px', height: '35px' }}>
                                                {isLoading || !showImage ?
                                                    (<CircularProgress style={{ color: light ? 'var(--dark2)' : 'var(--cero)' }} size={20} />)
                                                    : showImage ? <img src={jugador.foto} alt={jugador.name} style={{ height: '35px' }} />
                                                        : null}
                                            </Grid>
                                            <Grid item container alignItems={'center'} sx={{ whiteSpace: 'nowrap', width: '130px' }}>
                                                {jugador.name}
                                            </Grid>
                                        </Grid>
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        <Grid sx={{ display: 'flex', alignItems: 'center', gap: '18px' }} >
                                            <Grid item container alignItems={'center'} justifyContent={'center'} sx={{ width: '55px', height: '35px' }}>
                                                {isLoading || !showImage ?
                                                    (<CircularProgress style={{ color: light ? 'var(--dark2)' : 'var(--cero)' }} size={20} />)
                                                    : showImage ? <img src={jugador.logo} alt={jugador.name} style={{ height: '35px' }} />
                                                        : null}
                                            </Grid>
                                            {!mobile &&
                                                <Grid item container alignItems={'center'} sx={{ whiteSpace: 'nowrap', width: '130px' }}>
                                                    {jugador.equipo}
                                                </Grid>}
                                        </Grid>
                                    </StyledTableCell>
                                    <StyledTableCell align="center" style={{ fontWeight: 700, fontSize: '15px' }}>{jugador.tarjetas_roja}</StyledTableCell>
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
