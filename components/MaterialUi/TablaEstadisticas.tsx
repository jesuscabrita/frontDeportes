import { Avatar, CircularProgress, Grid, useMediaQuery } from "@mui/material";
import { withStyles, Theme, createStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useContext } from "react";
import Context from "../../context/contextPrincipal";
import { TbMoodEmpty as Vacio } from 'react-icons/tb';
import { MdLocalHospital as Lesion } from 'react-icons/md';
import { VscSearchStop as Expulsado } from 'react-icons/vsc';
import { TbRectangleVertical as Tarjeta } from 'react-icons/tb';

export const TablaEstadisticas =({jugadores, label, isLoading, goles, asistencias, amarillas, rojas})=>{
    const [light] = useContext(Context);
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });

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

    let jugadoresOrdenados;
    if (goles) {
        jugadoresOrdenados = jugadores.sort((a, b) => b.goles - a.goles);
    } else if (asistencias) {
        jugadoresOrdenados = jugadores.sort((a, b) => b.asistencias - a.asistencias);
    } else if (amarillas) {
        jugadoresOrdenados = jugadores.sort((a, b) => b.tarjetas_amarillas - a.tarjetas_amarillas);
    } else if (rojas) {
        jugadoresOrdenados = jugadores.sort((a, b) => b.tarjetas_roja - a.tarjetas_roja);
    } else {
        jugadoresOrdenados = jugadores;
    }

    return(
        <>
        {isLoading ? 
        <Grid mt={8} item sx={{ 
            display: 'flex', 
            flexDirection: 'row', 
            gap: '16px',
            minWidth:!mobile? '960px':'100%',
            height:mobile &&'300px', 
            justifyContent:'center',
            color:light ? 'var(--dark2)': 'var(--cero)'
            }}>
            <CircularProgress style={{color:light ? 'var(--dark2)': 'var(--cero)'}} />
        </Grid>
        : jugadores.length === 0 ?
        <Grid mt={8} item sx={{ 
            display: 'flex', 
            flexDirection: 'row', 
            gap: '16px',
            minWidth:!mobile? '960px':'100%',
            height:mobile &&'300px', 
            justifyContent:'center',
            color:light ? 'var(--dark2)': 'var(--cero)'
            }}>
            No hay jugadores en este equipo <Vacio size={25} />
        </Grid>
        :
        <Grid mt={2}>
            <TableContainer component={Paper} >
            <Table  aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>{label}</StyledTableCell>
                        <StyledTableCell/>
                        <StyledTableCell/>
                    </TableRow>
                </TableHead>
                <TableBody style={{background:light ? 'var(--cero)':'var(--dark3)'}}>
                {jugadoresOrdenados.map((jugador, index)=>{
                    return(
                        <StyledTableRow key={jugador.id} style={{background: jugador.suspendido === 'Si' && 'var(--danger2)'}}>
                            <StyledTableCell  component="th" scope="row">
                                <Grid container alignItems={'center'} gap={2} sx={{whiteSpace: 'nowrap', width:'70px'}}>
                                    <Grid>{index + 1}</Grid>
                                    {(jugador.posicion == 'Portero') &&
                                        <Grid sx={{ color: 'var(--warnning)',fontWeight:700,fontSize:'17px'}}>POR</Grid>}
                                    {(jugador.posicion == 'Defensa') &&
                                    <Grid sx={{ color: 'var(--gris)',fontWeight:700,fontSize:'17px'  }}>DEF</Grid>}
                                    {(jugador.posicion == 'Medio') &&
                                    <Grid sx={{ color: 'var(--check)',fontWeight:700,fontSize:'17px'  }}>MED</Grid>}
                                    {(jugador.posicion == 'Delantero') &&
                                    <Grid sx={{ color: 'var(--primario)',fontWeight:700,fontSize:'17px'  }}>DEL</Grid>}
                                </Grid>    
                            </StyledTableCell>
                            <StyledTableCell align="right" style={{whiteSpace: 'nowrap'}}>
                                <Grid sx={{ display: 'flex', alignItems: 'center', whiteSpace: 'nowrap', gap: '18px' }} >
                                    <Avatar {...stringAvatar(jugador.name)} sx={{ height: '35px', width: '35px' }} />
                                    <Grid sx={{ whiteSpace: 'nowrap', paddingRight: mobile && '30px', display:'flex', alignItems:'center',gap:'6px' }}>
                                        {jugador.name}
                                        {jugador.lesion === 'Si' &&  
                                        <Grid item sx={{display:'flex', alignItems:'center',gap:'6px'}}>
                                            <Lesion size={20}/>
                                            <Grid sx={{color:'var(--neutral)'}}>{'(Lesionado)'}</Grid>
                                        </Grid>}
                                        {jugador.tarjetas_acumuladas > 0 && ( <Grid item sx={{display:'flex', alignItems:'center'}}>{jugador.tarjetas_acumuladas}<Tarjeta color={'var(--warnning)'} size={20} /></Grid>)}
                                        {jugador.suspendido === 'Si' && ( 
                                        <Grid item sx={{display:'flex', alignItems:'center',gap:'6px'}}>
                                            <Expulsado size={20}/>
                                            <Grid sx={{color:'var(--neutral)'}}>{`(expulsado ${jugador.jornadas_suspendido} jornada)`}</Grid>
                                        </Grid>)}
                                    </Grid>
                                </Grid>
                            </StyledTableCell>
                            <StyledTableCell align="left" style={{fontWeight: index === 0 ? 700: 500,fontSize: index === 0 ?'18px': '15px'}}>
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
    </>
    )
}