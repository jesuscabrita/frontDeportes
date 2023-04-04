import React, { useContext, useEffect, useState } from "react";
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Grid, useMediaQuery } from "@mui/material";
import Context from "../../context/contextPrincipal";
import { MdOutlineEditCalendar as Edit } from 'react-icons/md';
import moment from "moment";
import { ButtonStatus } from "./ButtonStatus";

export const Row =({homeTeam, awayTeam, setOpenEdit, openEdit, currentRound})=> {
    const [light] = useContext(Context);
    const [open, setOpen] = useState(false);
    const [hoy, setHoy] = useState(moment())
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });
    const fecha_home = homeTeam.fecha[currentRound];
    const formatoFecha = moment(fecha_home,'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY');
    const formatoHora = moment(fecha_home,'YYYY-MM-DD HH:mm:ss').format('HH:mm a');
    const gol_home = homeTeam.gol_partido[currentRound];
    const gol_away = awayTeam.gol_partido[currentRound];
    const fechaBD = moment(fecha_home,'YYYY-MM-DD HH:mm:ss')
    const TIEMPO_PARTIDO = 40;
    const tiempoRestante = fechaBD.diff(hoy, 'minutes') + TIEMPO_PARTIDO;
    const fechaFinalPartido = fechaBD.clone().add(TIEMPO_PARTIDO, 'minutes')

    const status =()=>{
        if(hoy.diff(fechaFinalPartido, 'days') === 0){
            const enVivo = tiempoRestante <= TIEMPO_PARTIDO && tiempoRestante > 0
            if(enVivo){
                return 'enVivo'
            }else if (tiempoRestante <= 0){
                return 'finPartido'
            }else{
                return 'agendar'
            }
        }
    }

    useEffect(() =>{
        setTimeout(()=>{
            setHoy(moment())
        },5000)
    }, [hoy])

return (
    <React.Fragment>
        <TableRow sx={{ '& > *': { borderBottom: 'unset',background:light ? 'rgba(0, 0, 0, 0.04)':'var(--dark3)', cursor:'pointer' } }} onClick={()=> setOpen(!open)}>
            <TableCell sx={{color:light ? 'black': 'var(--cero)'}}>
                <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)} sx={{color:light ? 'black': 'var(--cero)'}}>
                    {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
            </TableCell>
            <TableCell align="left" sx={{color:light ? 'black': 'var(--cero)'}}>{formatoFecha}</TableCell>
            <TableCell align="left" sx={{color:light ? 'black': 'var(--cero)', whiteSpace: 'nowrap'}}>
                <Grid container alignItems={'center'} gap={2} sx={{width:'150px'}}>
                    <Grid item>{formatoHora}</Grid>
                    <Edit style={{cursor:'pointer'}} fontSize={20} onClick={()=> {setOpenEdit(!openEdit)}}/>
                </Grid>
            </TableCell>
            <TableCell align="center" sx={{whiteSpace: 'nowrap', paddingRight:mobile? '90px': '0px',color:light ? 'black': 'var(--cero)'}}>{homeTeam.estadio}</TableCell>
            <TableCell sx={{color:light ? 'black': 'var(--cero)'}}>
                <Grid sx={{display:'flex',alignItems:'center',whiteSpace: 'nowrap', gap:'6px', justifyContent:'right'}}>
                    <Grid sx={{color:light ? 'black': 'var(--cero)'}}>{homeTeam.name} </Grid>
                    <img style={{height:'30px'}} src={homeTeam.logo} alt="" />
                </Grid>
            </TableCell>
            <TableCell align="left" sx={{color:light ? 'black': 'var(--cero)', whiteSpace: 'nowrap'}}>
                <ButtonStatus status={status()} gol_away={gol_away} gol_home={gol_home}/> 
            </TableCell>
            <TableCell align="left" sx={{color:light ? 'black': 'var(--cero)'}}>
                <Grid sx={{display:'flex',alignItems:'center',whiteSpace: 'nowrap', gap:'6px', justifyContent:'left'}}>
                    <img style={{height:'30px'}} src={awayTeam.logo} alt="" />
                    <Grid sx={{color:light ? 'black': 'var(--cero)'}}>{awayTeam.name} </Grid>
                </Grid>
            </TableCell>
            <TableCell align="left" sx={{whiteSpace: 'nowrap',paddingLeft:mobile? '90px': '0px',color:light ? 'black': 'var(--cero)'}}>{homeTeam.arbitro}</TableCell>
        </TableRow>
        <TableRow>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0,background:light ? 'var(--cero)':'var(--dark)' }} colSpan={8}>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <Box sx={{ margin: 1}}>
                        <Typography variant="h6" gutterBottom component="div">
                            History
                        </Typography>
                        <Table size="small" aria-label="purchases"> sin datos</Table>
                    </Box>
                </Collapse>
            </TableCell>
        </TableRow>
    </React.Fragment>
    );
}