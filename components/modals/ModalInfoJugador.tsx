import { Avatar, Button, Grid, useMediaQuery, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useContext, useState } from "react";
import Context from "../../context/contextPrincipal";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { IoLogoClosedCaptioning as Capitan } from 'react-icons/io'; 
import { GiSoccerBall as Gol } from 'react-icons/gi';
import { TbRectangleVertical as Tarjeta } from 'react-icons/tb';
import { GiSoccerKick as Asistir } from 'react-icons/gi';
import { MdLocalHospital as Lesion } from 'react-icons/md';
import { BsInstagram as Insta } from 'react-icons/bs';
import { BsTwitter as Twitter } from 'react-icons/bs';
import moment from "moment";

export const ModalJugadorInfo =({open, setOpen, jugador})=>{
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });
    const [light] = useContext(Context);
    const formatoFecha = moment(jugador.fecha_nacimiento, 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY');
    const formatoFechaCreate = moment(jugador.createdAt, 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY');

    const handleClose = () => {
        setOpen(false);
    };

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

    const calcularPromedio = (jugador, partidos)=> {
        const promedio = (jugador / partidos).toFixed(2);
        const promedioNumber = parseFloat(promedio);
        const promedioFormatted = isNaN(promedioNumber) ? '-' : promedioNumber.toFixed(2);
        return promedioFormatted;
    }

    
    const formatoPesosArgentinos=(valor)=> {
        let formato = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' });
        return formato.format(valor);
    }

    return(
        <Grid>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle sx={{ padding: '20px', color: light ? 'var(--dark2)' : 'var(--cero)', background: light ? 'var(--cero)' : 'var(--dark)' }}>
                    <Grid item sx={{display:'flex', alignItems:'center', gap:'8px'}}>
                        <img src={jugador.logo} alt={jugador.name} style={{ height: '35px' }} />
                        {jugador.name}
                        <Grid item sx={{color:'var(--neutral)', fontSize:'10px'}}>{`(${jugador.equipo})`}</Grid>
                    </Grid>
                </DialogTitle>
                <DialogContent sx={{ background: light ? 'var(--cero)' : 'var(--dark)', display:'flex', flexDirection:'column', gap:'20px' }}>
                    <Grid container alignItems={'center'} gap={2}>
                        {jugador.foto ? <Avatar alt="Jugador" src={jugador.foto} sx={{ height: '150px', width:'150px' }} /> :
                            <Avatar {...stringAvatar(jugador.name)} sx={{ height: '150px', width:'150px' }} />}
                            <Grid item sx={{color: light ? 'var(--dark2)' : 'var(--cero)'}}>
                                {jugador.lesion === 'Si' &&  
                                <Grid item sx={{display:'flex', alignItems:'center',gap:'6px'}}>
                                    <Lesion size={25}/>
                                    <Grid sx={{color:'var(--neutral)'}}>{'(Lesionado)'}</Grid>
                                </Grid>}
                            </Grid>
                        <Grid container alignItems={'center'} gap={2}>
                            <Grid item sx={{ fontSize: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', fontWeight: 600,color: light ? 'var(--dark2)' : 'var(--cero)' }}>#{jugador.dorsal}</Grid>
                            <Grid item>
                                {(jugador.posicion == 'Portero') &&
                                    <Grid sx={{ color: 'var(--warnning)', fontWeight: 700, fontSize: '17px' }}>PORTERO</Grid>}
                                {(jugador.posicion == 'Defensa') &&
                                    <Grid sx={{ color: 'var(--gris)', fontWeight: 700, fontSize: '17px' }}>DEFENSOR</Grid>}
                                {(jugador.posicion == 'Medio') &&
                                    <Grid sx={{ color: 'var(--check)', fontWeight: 700, fontSize: '17px' }}>MEDIO CENTRO</Grid>}
                                {(jugador.posicion == 'Delantero') &&
                                    <Grid sx={{ color: 'var(--primario)', fontWeight: 700, fontSize: '17px' }}>DELANTERO</Grid>}
                            </Grid>
                            {jugador.capitan === 'Si' && 
                            <Grid item sx={{display:'flex', alignItems:'center', gap:'4px'}}>
                                <Grid item sx={{color: light ? 'var(--dark2)' : 'var(--cero)'}}>{'Capitan'}</Grid>
                                <Grid item sx={{color: light ? 'var(--dark2)' : 'var(--cero)',border: light ?'solid 1px var(--dark2)': 'solid 1px var(--cero)', height:'25px', width:'50px', display:'flex', justifyContent:'center', alignItems:'center'}}>
                                    <Capitan size={20}/>
                                </Grid>
                            </Grid>}
                            <Grid container alignItems={'center'} gap={2} sx={{ color: light ? 'var(--dark2)' : 'var(--cero)' }}>
                                {'Valor mercado: '} <strong>{formatoPesosArgentinos(2000000)}</strong>
                            </Grid>
                            <Grid container alignItems={'center'} gap={2} sx={{ color: light ? 'var(--dark2)' : 'var(--cero)' }}>
                                {jugador.partidos >= 2 && (
                                    <span>
                                    {`${jugador.name} nació el ${formatoFecha} en ${jugador.nacionalidad} tiene ${jugador.edad} años,
                                    ha jugado ${jugador.partidos} partidos con ${jugador.equipo} y está en el equipo desde ${formatoFechaCreate}, 
                                    tiene un contrato de `}
                                    <strong>2 temporadas</strong>
                                    {`, con un sueldo de `}
                                    <strong>{formatoPesosArgentinos(1000000)}</strong>
                                    {` por temporada, la cual por jornada cobra `}
                                    <strong>{formatoPesosArgentinos(76926)}</strong>
                                    </span>
                                )}

                                {jugador.partidos === 1 && (
                                    <span>
                                    {`${jugador.name} nació el ${formatoFecha} en ${jugador.nacionalidad} tiene ${jugador.edad} años,
                                    ha jugado ${jugador.partidos} partido con ${jugador.equipo} y está en el equipo desde ${formatoFechaCreate}, 
                                    tiene un contrato de `}
                                    <strong>2 temporadas</strong>
                                    {`, con un sueldo de `}
                                    <strong>{formatoPesosArgentinos(1000000)}</strong>
                                    {` por temporada, la cual por jornada cobra `}
                                    <strong>{formatoPesosArgentinos(76926)}</strong>
                                    </span>
                                )}

                                {jugador.partidos === 0 && (
                                    <span>
                                    {`${jugador.name} nació el ${formatoFecha} en ${jugador.nacionalidad} tiene ${jugador.edad} años,
                                    no ha jugado ningún partido con ${jugador.equipo} y está en el equipo desde ${formatoFechaCreate}, 
                                    tiene un contrato de `}
                                    <strong>2 temporadas</strong>
                                    {`, con un sueldo de `}
                                    <strong>{formatoPesosArgentinos(1000000)}</strong>
                                    {` por temporada, la cual por jornada cobra `}
                                    <strong>{formatoPesosArgentinos(76926)}</strong>
                                    </span>
                                )}
                            </Grid>
                            <TableContainer>
                                <Table>
                                <TableHead>
                                    <TableRow>
                                    <TableCell style={{color: light ? 'var(--dark2)' : 'var(--cero)'}}>Estadística</TableCell>
                                    <TableCell style={{color: light ? 'var(--dark2)' : 'var(--cero)'}}>Valor</TableCell>
                                    <TableCell style={{color: light ? 'var(--dark2)' : 'var(--cero)'}}>Promedio</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                    <TableCell><Grid item sx={{display:'flex',alignItems:'center', gap:'6px',color: light ? 'var(--dark2)' : 'var(--cero)'}}>{'Goles'} <Gol size={20}/></Grid></TableCell>
                                    <TableCell style={{color: light ? 'var(--dark2)' : 'var(--cero)'}}>{jugador.goles}</TableCell>
                                    <TableCell style={{color: light ? 'var(--dark2)' : 'var(--cero)'}}>{calcularPromedio(jugador.goles,jugador.partidos)}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                    <TableCell><Grid item sx={{display:'flex',alignItems:'center', gap:'6px', color: light ? 'var(--dark2)' : 'var(--cero)'}}>{'Amarillas'} <Tarjeta size={20} color={'var(--warnning)'}/></Grid></TableCell>
                                    <TableCell style={{color: light ? 'var(--dark2)' : 'var(--cero)'}}>{jugador.tarjetas_amarillas}</TableCell>
                                    <TableCell style={{color: light ? 'var(--dark2)' : 'var(--cero)'}}>{calcularPromedio(jugador.tarjetas_amarillas,jugador.partidos)}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                    <TableCell><Grid item sx={{display:'flex',alignItems:'center', gap:'6px', color: light ? 'var(--dark2)' : 'var(--cero)'}}>{'Rojas'} <Tarjeta size={20} color={'var(--danger)'}/></Grid></TableCell>
                                    <TableCell style={{color: light ? 'var(--dark2)' : 'var(--cero)'}}>{jugador.tarjetas_roja}</TableCell>
                                    <TableCell style={{color: light ? 'var(--dark2)' : 'var(--cero)'}}>{calcularPromedio(jugador.tarjetas_roja,jugador.partidos)}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                    <TableCell><Grid item sx={{display:'flex',alignItems:'center', gap:'6px', color: light ? 'var(--dark2)' : 'var(--cero)'}}>{'Azules'} <Tarjeta size={20} color={'var(--primario)'}/></Grid></TableCell>
                                    <TableCell style={{color: light ? 'var(--dark2)' : 'var(--cero)'}}>{jugador.tarjetas_azul}</TableCell>
                                    <TableCell style={{color: light ? 'var(--dark2)' : 'var(--cero)'}}>{calcularPromedio(jugador.tarjetas_azul,jugador.partidos)}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                    <TableCell><Grid item sx={{display:'flex',alignItems:'center', gap:'6px', color: light ? 'var(--dark2)' : 'var(--cero)'}}>{'Asistencias'} <Asistir size={20}/></Grid></TableCell>
                                    <TableCell style={{color: light ? 'var(--dark2)' : 'var(--cero)'}}>{jugador.asistencias}</TableCell>
                                    <TableCell style={{color: light ? 'var(--dark2)' : 'var(--cero)'}}>{calcularPromedio(jugador.asistencias,jugador.partidos)}</TableCell>
                                    </TableRow>
                                </TableBody>
                                </Table>
                            </TableContainer>
                            <Grid container alignItems={'center'} gap={2}>
                                <Grid item sx={{display:'flex', alignItems:'center',gap:'6px',color: light ? 'var(--dark2)' : 'var(--cero)'}}>
                                    <Insta size={25}/>
                                    @{jugador.instagram}
                                </Grid>
                                <Grid item sx={{display:'flex', alignItems:'center',gap:'6px',color: light ? 'var(--dark2)' : 'var(--cero)'}}>
                                    <Twitter size={25}/>
                                    @{jugador.twitter}
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions sx={{ background: light ? 'var(--cero)' : 'var(--dark)' }}>
                    <Button onClick={handleClose} sx={{ color: 'var(--primario)' }}>Cancelar</Button>
                </DialogActions>
            </Dialog>
        </Grid>
    )
}