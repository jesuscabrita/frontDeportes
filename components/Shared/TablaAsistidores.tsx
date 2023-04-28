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

export const TablaAsistidores = ({ data }) => {
    const [light] = useContext(Context);
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });

    const jugadoresMasAsistidores = data.flatMap((equipo) => equipo.jugadores)
    .sort((a, b) => b.asistencias - a.asistencias)
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
    <Grid mt={2}>
        <TableContainer component={Paper} >
            <Table  aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="left">Nombre</StyledTableCell>
                        <StyledTableCell align="left">Equipo</StyledTableCell>
                        <StyledTableCell align={!mobile ?"center": "right"}>Asistencias</StyledTableCell>
                        <StyledTableCell align="center" style={{whiteSpace: 'nowrap'}}>{!mobile ?'Partidos Jugados': 'PJ'}</StyledTableCell>
                        <StyledTableCell align="right" style={{whiteSpace: 'nowrap'}}>{!mobile ?'Asistencias por partido': 'AP'}</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody style={{background:light ? 'var(--cero)':'var(--dark3)'}}>
                {jugadoresMasAsistidores.map((jugador, index)=>{
                    const promedioAsistencia: string = (jugador.asistencias / jugador.partidos).toFixed(2);
                    const promedioAsistenciaNumber = parseFloat(promedioAsistencia);
                    const promedioAsistenciaFormatted = isNaN(promedioAsistenciaNumber) ? '-' : promedioAsistenciaNumber.toFixed(2);
                    return(
                        <StyledTableRow key={jugador._id}>
                            <StyledTableCell  component="th" scope="row">
                                <Grid container alignItems={'center'} width={'250px'} flexDirection={'row'} sx={{whiteSpace: 'nowrap'}}>
                                    <Grid container sx={{gap: '8px', alignItems: 'center', whiteSpace: 'nowrap', width:'40px'}}>
                                        <Grid>{index + 1}</Grid>
                                        {(index + 1 == 1 ) &&
                                            <Grid sx={{ background: 'var(--check)', height: '35px', width: '10px', whiteSpace: 'nowrap' }}></Grid>}
                                    </Grid>
                                    <Grid item container alignItems={'center'} justifyContent={'center'} sx={{width:'55px',height: '35px'}}>
                                        <img src={jugador.foto} alt={jugador.name} style={{ height: '35px'}} />
                                    </Grid>
                                    <Grid item container alignItems={'center'} sx={{ whiteSpace: 'nowrap', width:'130px'}}>
                                        {jugador.name} 
                                    </Grid>
                                </Grid>
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                <Grid sx={{display:'flex', alignItems:'center', gap:'18px'}} >
                                    <Grid item container alignItems={'center'} justifyContent={'center'} sx={{width:'55px',height: '35px'}}>
                                        <img src={jugador.logo} alt={jugador.equipo} style={{ height: '35px'}} />
                                    </Grid>
                                    {!mobile &&
                                    <Grid item container alignItems={'center'} sx={{ whiteSpace: 'nowrap', width:'130px'}}>
                                        {jugador.equipo}
                                    </Grid>}
                                </Grid>
                            </StyledTableCell>
                            <StyledTableCell align="center" style={{fontWeight:700, fontSize:'15px', }}>{jugador.asistencias}</StyledTableCell>
                            <StyledTableCell align="center" >{jugador.partidos}</StyledTableCell>
                            {<StyledTableCell align="center">{promedioAsistenciaFormatted}</StyledTableCell>}
                        </StyledTableRow>
                    )
                })}
                </TableBody>
            </Table>
        </TableContainer>
    </Grid>
    );
}
