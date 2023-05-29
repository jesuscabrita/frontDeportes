import { CircularProgress, Grid, useMediaQuery } from "@mui/material";
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

export const TablaEstadisticas =({jugadores, label, isLoading})=>{
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
                {jugadores.map((jugador, index)=>{
                    return(
                        <StyledTableRow key={jugador.id}>
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
                                <Grid sx={{display:'flex', alignItems:'center', whiteSpace: 'nowrap', gap:'18px'}} >
                                    <img src={jugador.foto} alt={'.'} style={{ height: '35px'}} />
                                    <Grid sx={{whiteSpace: 'nowrap', paddingRight: mobile &&'30px', fontSize:index === 0 && '18px', fontWeight: index === 0 && 700}}>{jugador.name}</Grid>
                                </Grid>
                            </StyledTableCell>
                            <StyledTableCell align="left" style={{fontWeight: index === 0 ? 700: 500,fontSize: index === 0 ?'18px': '15px'}}>
                                <Grid item>{jugador.goles}</Grid>
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