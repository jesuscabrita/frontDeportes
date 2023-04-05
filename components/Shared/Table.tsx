import { withStyles, Theme, createStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { UltimateP } from './UltimateP';
import { Grid } from '@mui/material';
import data from '../../utils/data.json';
import { useContext } from 'react';
import Context from '../../context/contextPrincipal';
import { ArrowP } from './ArrowP';

export const PositionTable = () => {
    const [light] = useContext(Context);

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
                <TableBody style={{background:light ? 'var(--cero)':'var(--dark3)'}}>
                    {orden.map((row, index) => {                        
                        return (
                            <StyledTableRow key={row.id}>
                                <StyledTableCell  component="th" scope="row" style={{ display: 'flex', gap: '8px', alignItems: 'center', whiteSpace: 'nowrap', width:'300px' }}>
                                    {(index + 1 == 1 ) &&
                                        <Grid sx={{ background: 'var(--check)', height: '35px', width: '10px', whiteSpace: 'nowrap' }}></Grid>}
                                    {(index + 1 == 2 || index + 1 == 3 || index + 1 == 4 || index + 1 == 5 || index + 1 == 6 || index + 1 == 7 || index + 1 == 8) &&
                                        <Grid sx={{ background: 'var(--primario)', height: '35px', width: '10px', whiteSpace: 'nowrap' }}></Grid>}
                                    {(index + 1 == 13 || index + 1 == 14) &&
                                        <Grid sx={{ background: 'var(--danger)', height: '35px', width: '10px', whiteSpace: 'nowrap' }}></Grid>}
                                    {(index + 1 == 9 || index + 1 == 10 || index + 1 == 11 || index + 1 == 12) &&
                                        <Grid sx={{ background: 'var(--warnning)', height: '35px', width: '10px', whiteSpace: 'nowrap' }}></Grid>}
                                    <Grid>{index + 1}</Grid>
                                    <Grid container alignItems={'center'} gap={1} sx={{ flexDirection:'row' ,whiteSpace: 'nowrap'}}>
                                        <img src={row.logo} alt={row.name} style={{ height: '35px'}} /> {row.name} <ArrowP currentPos={index+1} prevPos={row.puntaje_anterior}/>
                                    </Grid>
                                </StyledTableCell>
                                <StyledTableCell align="right" style={{fontWeight:700, fontSize:'15px'}}>{row.puntos}</StyledTableCell>
                                <StyledTableCell align="right">{row.partidosJugados}</StyledTableCell>
                                <StyledTableCell align="right">{row.ganados}</StyledTableCell>
                                <StyledTableCell align="right">{row.empates}</StyledTableCell>
                                <StyledTableCell align="right">{row.perdidos}</StyledTableCell>
                                <StyledTableCell align="right">{row.goles_a_Favor}</StyledTableCell>
                                <StyledTableCell align="right">{row.goles_en_Contra}</StyledTableCell>
                                <StyledTableCell align="right">{row.diferencia_de_Goles}</StyledTableCell>
                                <StyledTableCell align="right"><UltimateP last5={row.last5} /></StyledTableCell>
                            </StyledTableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
}