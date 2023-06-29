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
import { Avatar, CircularProgress, Grid, useMediaQuery } from '@mui/material';
import { TbError404 as Err404 } from 'react-icons/tb';
import { TbMoodEmpty as Vacio } from 'react-icons/tb';
import { ModalJugadorInfo } from "../modals/ModalInfoJugador";

export const TablaGoleadores = ({ data, isLoading, isError  }) => {
    const [light] = useContext(Context);
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });
    const [showImage, setShowImage] = useState(false);
    const [modalJugadorInfo, setModalJugadorInfo] = useState(false);
    const [jugadorSeleccionado, setJugadorSeleccionado] = useState(null);

    const jugadoresMasGoleadores = data.flatMap((equipo) => equipo.jugadores)
    .sort((a, b) => b.goles - a.goles)
    .slice(0, 10); 

    const StyledTableCell = withStyles((theme: Theme) =>
    createStyles({
        head: {
            backgroundColor: 'var(--dark2)',
            color: 'var(--cero)',
        },
        body: {
            fontSize: 12,
            color:light ? 'black': 'var(--cero)'
        },
    }),
    )(TableCell);

    const StyledTableRow = withStyles((theme: Theme) =>
        createStyles({
            root: {
                '&:nth-of-type(odd)': {
                    backgroundColor: light? theme.palette.action.hover :'var(--dark)',
                },
            },
        }),
    )(TableRow);

    useEffect(() => {
        if (!isLoading) {
            const timeoutId = setTimeout(() => {
                setShowImage(true);
            }, 1000);
            return () => clearTimeout(timeoutId);
        }
    }, [isLoading]);

    function stringToColor(string: string) {
        let hash = 0;
        let i;
        /* eslint-disable no-bitwise */
        for (i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }

        let color = '#';
        for (i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff;
            color += `00${value.toString(16)}`.slice(-2);
        }
        /* eslint-enable no-bitwise */
        return color;
    }

    function stringAvatar(name: string) {
        const nameParts = name.split(' ');

        let children = '';
        if (nameParts.length >= 2) {
            children = `${nameParts[0][0]}${nameParts[1][0]}`;
        } else if (nameParts.length === 1) {
            children = nameParts[0][0];
        }

        return {
            sx: {
                bgcolor: stringToColor(name),
            },
            children: children,
        };
    }

    const seleccionarJugadorInfo = (jugador) => {
        setJugadorSeleccionado(jugador);
        setModalJugadorInfo(true);
    }

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
    : jugadoresMasGoleadores.length === 0 ?
        <Grid mt={8} item sx={{display: 'flex',flexDirection: 'row',gap: '16px',minWidth: !mobile ? '960px' : '100%',height: '500px',justifyContent: 'center',color: light ? 'var(--dark2)' : 'var(--cero)'}}>
            No hay jugadores en la liga <Vacio size={25} />
        </Grid>
    : <Grid mt={2}>
        <TableContainer component={Paper} >
            <Table  aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="left">Nombre</StyledTableCell>
                        <StyledTableCell align="left">Equipo</StyledTableCell>
                        <StyledTableCell align={!mobile ?"center": "right"}>Goles</StyledTableCell>
                        <StyledTableCell align="center" style={{whiteSpace: 'nowrap'}}>{mobile ? 'PJ': 'Partidos Jugados'}</StyledTableCell>
                        <StyledTableCell align="right" style={{whiteSpace: 'nowrap'}}>{mobile ? 'GP': 'Goles por partido'}</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody style={{background:light ? 'var(--cero)':'var(--dark3)'}}>
                {jugadoresMasGoleadores.map((jugador, index)=>{
                    const promedioGol: string = (jugador.goles / jugador.partidos).toFixed(2);
                    const promedioGolNumber = parseFloat(promedioGol);
                    const promedioGolFormatted = isNaN(promedioGolNumber) ? '-' : promedioGolNumber.toFixed(2);
                    return(
                        <StyledTableRow key={jugador._id}>
                            <StyledTableCell  component="th" scope="row">
                                <Grid container alignItems={'center'} width={'250px'} flexDirection={'row'} sx={{whiteSpace: 'nowrap'}}>
                                    <Grid container sx={{gap: '8px', alignItems: 'center', whiteSpace: 'nowrap', width:'40px'}}>
                                        <Grid>{index + 1}</Grid>
                                        {(index + 1 == 1 ) &&
                                            <Grid sx={{ background: 'var(--check)', height: '35px', width: '10px', whiteSpace: 'nowrap' }}></Grid>}
                                    </Grid>
                                    <Grid item container alignItems={'center'} justifyContent={'center'} sx={{width:'55px',height: '35px', cursor:'pointer'}} onClick={() => { seleccionarJugadorInfo(jugador) }}>
                                        <Avatar {...stringAvatar(jugador.name)} sx={{ height: '35px', width:'35px' }} />
                                    </Grid>
                                    <Grid item container alignItems={'center'} sx={{ whiteSpace: 'nowrap', width:'130px', cursor:'pointer'}}  onClick={() => { seleccionarJugadorInfo(jugador) }}>
                                        {jugador.name} 
                                    </Grid>
                                </Grid>
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                <Grid sx={{display:'flex', alignItems:'center', gap:'18px'}} >
                                    <Grid item container alignItems={'center'} justifyContent={'center'} sx={{width:'55px',height: '35px'}}>
                                        <img src={jugador.logo} alt={jugador.name} style={{ height: '35px' }} /> 
                                    </Grid>
                                    {!mobile &&
                                    <Grid item container alignItems={'center'} sx={{ whiteSpace: 'nowrap', width:'130px'}}>
                                        {jugador.equipo}
                                    </Grid>}
                                </Grid>
                            </StyledTableCell>
                            <StyledTableCell align="center" style={{fontWeight:700, fontSize:'15px'}}>{jugador.goles}</StyledTableCell>
                            <StyledTableCell align="center" >{jugador.partidos}</StyledTableCell>
                            {<StyledTableCell align="center">{promedioGolFormatted}</StyledTableCell>}
                        </StyledTableRow>
                    )
                })}
                </TableBody>
            </Table>
        </TableContainer>
    </Grid>
    }
    {jugadorSeleccionado && (<ModalJugadorInfo open={modalJugadorInfo} setOpen={setModalJugadorInfo} jugador={jugadorSeleccionado}/>)}
    </>
    );
}
