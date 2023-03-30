import React, { useEffect, useState } from 'react';
import { withStyles, Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { ArrowP, UltimateP } from './UltimateP';
import { Grid } from '@mui/material';

const StyledTableCell = withStyles((theme: Theme) =>
    createStyles({
        head: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        body: {
            fontSize: 12,
        },
    }),
)(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
    createStyles({
        root: {
            '&:nth-of-type(odd)': {
                backgroundColor: theme.palette.action.hover,
            },
        },
    }),
)(TableRow);


const rows =  [
    {
        id: 1,
        name: 'Barcelona Fc',
        pj: 2,
        g: 1,
        e: 0,
        p: 0,
        gf: 8,
        gc: 0,
        dg: 0,
        pts: 6,
        last5: ['win', 'win', 'neutral', 'neutral', 'neutral'],
        logo: 'https://1000marcas.net/wp-content/uploads/2020/03/Logo-Barcelona.png',
    },
    {
        id: 2,
        name: 'Real Madrid Fc',
        pj: 2,
        g: 0,
        e: 0,
        p: 1,
        gf: 6,
        gc: 3,
        dg: 3,
        pts: 3,
        last5: ['loss', 'win', 'neutral', 'neutral', 'neutral'],
        logo: 'https://logos-world.net/wp-content/uploads/2020/06/Real-Madrid-symbol.png'
    },
    {
        id: 3,
        name: 'Valencia Fc',
        pj: 1,
        g: 0,
        e: 0,
        p: 1,
        gf: 1,
        gc: 2,
        dg: 1,
        pts: 0,
        last5: ['loss', 'neutral', 'neutral', 'neutral', 'neutral'],
        logo: 'https://1000marcas.net/wp-content/uploads/2021/05/Valencia-Logo.png'
    },
    {
        id: 4,
        name: 'Atletico Madrid',
        pj: 1,
        g: 1,
        e: 0,
        p: 0,
        gf: 2,
        gc: 0,
        dg: 2,
        pts: 3,
        last5: ['win', 'neutral', 'neutral', 'neutral', 'neutral'],
        logo: 'https://1000marcas.net/wp-content/uploads/2020/03/Logo-Atletico-Madrid.png'
    },
    {
        id: 5,
        name: 'Athletic Bilbao',
        pj: 0,
        g: 0,
        e: 0,
        p: 0,
        gf: 0,
        gc: 0,
        dg: 0,
        pts: 0,
        last5: ['neutral', 'neutral', 'neutral', 'neutral', 'neutral'],
        logo: 'https://logos-world.net/wp-content/uploads/2020/11/Athletic-Bilbao-Logo.png'
    },
    {
        id: 6,
        name: 'Real Sociedad',
        pj: 1,
        g: 0,
        e: 0,
        p: 1,
        gf: 0,
        gc: 5,
        dg: 0,
        pts: 0,
        last5: ['loss', 'neutral', 'neutral', 'neutral', 'neutral'],
        logo: 'https://1000marcas.net/wp-content/uploads/2022/04/Real-Sociedad-Logo.png'
    },
    {
        id: 7,
        name: 'Betis',
        pj: 0,
        g: 0,
        e: 0,
        p: 0,
        gf: 0,
        gc: 0,
        dg: 0,
        pts: 0,
        last5: ['neutral', 'neutral', 'neutral', 'neutral', 'neutral'],
        logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/1/13/Real_betis_logo.svg/800px-Real_betis_logo.svg.png'
    },
    {
        id: 8,
        name: 'Villareal',
        pj: 1,
        g: 0,
        e: 1,
        p: 0,
        gf: 1,
        gc: 1,
        dg: 1,
        pts: 1,
        last5: ['draw', 'neutral', 'neutral', 'neutral', 'neutral'],
        logo: 'https://upload.wikimedia.org/wikipedia/an/thumb/7/70/Villarreal_CF_logo.svg/1200px-Villarreal_CF_logo.svg.png'
    },
    {
        id: 9,
        name: 'Rayo Vallecano',
        pj: 1,
        g: 0,
        e: 1,
        p: 0,
        gf: 1,
        gc: 1,
        dg: 1,
        pts: 1,
        last5: ['draw', 'neutral', 'neutral', 'neutral', 'neutral'],
        logo: 'https://www.nicepng.com/png/detail/422-4222102_rayo-vallecano-logo-png.png'
    },
    {
        id: 10,
        name: 'Getafe',
        pj: 1,
        g: 0,
        e: 0,
        p: 1,
        gf: 2,
        gc: 7,
        dg: 0,
        pts: 0,
        last5: ['loss', 'neutral', 'neutral', 'neutral', 'neutral'],
        logo: 'https://1000marcas.net/wp-content/uploads/2021/05/Getafe-logo.png'
    },
    {
        id: 11,
        name: 'Espanyol',
        pj: 1,
        g: 0,
        e: 0,
        p: 1,
        gf: 3,
        gc: 5,
        dg: 0,
        pts: 0,
        last5: ['loss', 'neutral', 'neutral', 'neutral', 'neutral'],
        logo: 'https://1000marcas.net/wp-content/uploads/2021/05/Espanyol-logo.png'
    },
    {
        id: 12,
        name: 'Sevilla',
        pj: 1,
        g: 1,
        e: 0,
        p: 0,
        gf: 5,
        gc: 3,
        dg: 5,
        pts: 3,
        last5: ['win', 'neutral', 'neutral', 'neutral', 'neutral'],
        logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/3/3b/Sevilla_FC_logo.svg/1200px-Sevilla_FC_logo.svg.png'
    },
    {
        id: 13,
        name: 'Mallorca',
        pj: 1,
        g: 0,
        e: 0,
        p: 1,
        gf: 0,
        gc: 6,
        dg: 0,
        pts: 0,
        last5: ['loss', 'neutral', 'neutral', 'neutral', 'neutral'],
        logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/e0/Rcd_mallorca.svg/1200px-Rcd_mallorca.svg.png'
    },
    {
        id: 14,
        name: 'Celta de vigo',
        pj: 1,
        g: 1,
        e: 0,
        p: 0,
        gf: 7,
        gc: 2,
        dg: 7,
        pts: 3,
        last5: ['win', 'neutral', 'neutral', 'neutral', 'neutral'],
        logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/1/12/RC_Celta_de_Vigo_logo.svg/1200px-RC_Celta_de_Vigo_logo.svg.png'
    }

];

const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
});

export const PositionTable = () => {
    const classes = useStyles();
    const [posiciones, setPosiciones] = useState([]);

    const orden = rows.sort((a, b) => {
        if (a.pts > b.pts) {
            return -1;
        } else if (a.pts < b.pts) {
            return 1;
        }
        else if (a.gf > b.gf) {
            return -1;
        }
        else if (a.gf < b.gf) {
            return 1;
        } else {
            return 0;
        }
    });

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
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
                <TableBody>
                    {orden.map((row, index) => {                        
                        return (
                            <StyledTableRow key={row.id}>
                                <StyledTableCell  component="th" scope="row" style={{ display: 'flex', gap: '8px', alignItems: 'center', whiteSpace: 'nowrap' }}>
                                    {(index + 1 == 1 || index + 1 == 2 || index + 1 == 3 || index + 1 == 4 || index + 1 == 5 || index + 1 == 6 || index + 1 == 7 || index + 1 == 8) &&
                                        <Grid sx={{ background: 'var(--primario)', height: '35px', width: '10px', whiteSpace: 'nowrap' }}></Grid>}
                                    {(index + 1 == 13 || index + 1 == 14) &&
                                        <Grid sx={{ background: 'var(--danger)', height: '35px', width: '10px', whiteSpace: 'nowrap' }}></Grid>}
                                    {(index + 1 == 9 || index + 1 == 10 || index + 1 == 11 || index + 1 == 12) &&
                                        <Grid sx={{ background: 'var(--warnning)', height: '35px', width: '10px', whiteSpace: 'nowrap' }}></Grid>}
                                    <Grid>{index + 1}</Grid>
                                    <Grid container alignItems={'center'} gap={1} sx={{ flexDirection:'row' ,whiteSpace: 'nowrap'}}><img src={row.logo} alt={row.name} style={{ height: '35px' }} /> {row.name} <ArrowP currentPos={index+1} prevPos={index +1}/></Grid>
                                </StyledTableCell>
                                <StyledTableCell align="right" style={{fontWeight:800, fontSize:'14px'}}>{row.pts}</StyledTableCell>
                                <StyledTableCell align="right">{row.pj}</StyledTableCell>
                                <StyledTableCell align="right">{row.g}</StyledTableCell>
                                <StyledTableCell align="right">{row.e}</StyledTableCell>
                                <StyledTableCell align="right">{row.p}</StyledTableCell>
                                <StyledTableCell align="right">{row.gf}</StyledTableCell>
                                <StyledTableCell align="right">{row.gc}</StyledTableCell>
                                <StyledTableCell align="right">{row.dg}</StyledTableCell>
                                <StyledTableCell align="right"><UltimateP last5={row.last5} /></StyledTableCell>
                            </StyledTableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
}