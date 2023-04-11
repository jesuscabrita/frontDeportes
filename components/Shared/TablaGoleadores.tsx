import { useContext } from "react";
import Context from "../../context/contextPrincipal";
import { withStyles, Theme, createStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Grid, useMediaQuery } from '@mui/material';

export const TablaGoleadores = ({ data }) => {
    const [light] = useContext(Context);
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });

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

    return (
        <TableContainer component={Paper} >
            <Table  aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell/>
                        <StyledTableCell align="left">Nombre</StyledTableCell>
                        <StyledTableCell align={!mobile ?"left" : "right"}>Equipo</StyledTableCell>
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
                        <StyledTableRow key={jugador.id}>
                            <StyledTableCell  component="th" scope="row" style={{ display: 'flex', gap: '8px', alignItems: 'center', whiteSpace: 'nowrap',height: '70px' }}>
                                <Grid>{index + 1}</Grid>
                                {(index + 1 == 1) &&
                                    <Grid sx={{ background: 'var(--check)', height: '35px', width: '10px', whiteSpace: 'nowrap' }}></Grid>}
                            </StyledTableCell>
                            <StyledTableCell align="right" style={{width:'330px',whiteSpace: 'nowrap'}}>
                                <Grid sx={{display:'flex', alignItems:'center', whiteSpace: 'nowrap', gap:'18px'}} >
                                    <img src={jugador.foto} alt={jugador.name} style={{ height: '35px'}} />
                                    <Grid sx={{whiteSpace: 'nowrap', paddingRight: mobile &&'30px'}}>{jugador.name}</Grid>
                                </Grid>
                            </StyledTableCell>
                            <StyledTableCell align="center" style={{width:'280px',whiteSpace: 'nowrap',}}>
                                <Grid sx={{display:'flex', alignItems:'center', gap:'18px'}} >
                                    <img src={jugador.logo} alt={jugador.equipo} style={{ height: '35px'}} />
                                    {!mobile &&<Grid sx={{whiteSpace: 'nowrap'}}>{jugador.esquipo}</Grid>}
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
    );
}
