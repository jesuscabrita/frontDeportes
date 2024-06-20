import React, { useContext } from "react";
import { Avatar, Grid, useMediaQuery, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { IoLogoClosedCaptioning as Capitan } from 'react-icons/io';
import { GiSoccerBall as Gol } from 'react-icons/gi';
import { TbRectangleVertical as Tarjeta } from 'react-icons/tb';
import { GiSoccerKick as Asistir } from 'react-icons/gi';
import { MdLocalHospital as Lesion } from 'react-icons/md';
import { BsInstagram as Insta } from 'react-icons/bs';
import { BsTwitter as Twitter } from 'react-icons/bs';
import { BiExit as Salir } from 'react-icons/bi';
import { calcularPromedio, formatoPesosArgentinos, stringAvatar } from "../../../utils/utils";
import { ButtonSend } from "../../Material/ButtonSend";
import Context from "../../../context/contextPrincipal";
import moment from "moment";

export const ModalJugadorInfo = ({ open, setOpen, jugador }) => {
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });
    const [light] = useContext(Context);
    const formatoFecha = moment(jugador.fecha_nacimiento, 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY');
    const formatoFechaCreate = moment(jugador.fecha_inicio, 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY');
    const constratos = jugador.contrato === 0.5 && 'de Media temporada' || jugador.contrato === 1 && 'de 1 Temporada' || jugador.contrato === 1.5 && 'de 1 Temporada y media' || jugador.contrato === 2 && 'de 2 Temporadas' || jugador.contrato === 2.5 && 'de 2 Temporadas y media' || jugador.contrato === 3 && 'de 3 Temporadas' || jugador.contrato === 3.5 && 'de 3 Temporadas y media' || jugador.contrato === 4 && 'de 4 Temporadas' || jugador.contrato === 0 && 'Vencido'

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Grid>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle sx={{ padding: '20px', color: light ? 'var(--dark2)' : 'var(--cero)', background: light ? 'var(--cero)' : 'var(--dark)' }}>
                    <Grid item sx={{ display: 'flex', alignItems: 'center', gap: '8px', whiteSpace: 'nowrap', fontSize: mobile ? '15px' : '20px' }}>
                        <img src={jugador.logo} alt='.' style={{ height: '35px' }} />
                        {jugador.name}
                        <Grid item sx={{ color: 'var(--neutral)', fontSize: '10px' }}>{`(${jugador.equipo})`}</Grid>
                    </Grid>
                </DialogTitle>
                <DialogContent sx={{ background: light ? 'var(--cero)' : 'var(--dark)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <Grid container alignItems={'center'} gap={2}>
                        {jugador.foto ? <Avatar alt="Jugador" src={jugador.foto} sx={{ height: '150px', width: '150px' }} /> :
                            <Avatar {...stringAvatar(jugador.name)} sx={{ height: '150px', width: '150px' }} />}
                        <Grid item sx={{ color: light ? 'var(--dark2)' : 'var(--cero)' }}>
                            {jugador.lesion === 'Si' &&
                                <Grid item sx={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <Lesion size={25} />
                                    <Grid sx={{ color: 'var(--neutral)' }}>{'(Lesionado)'}</Grid>
                                </Grid>}
                        </Grid>
                        <Grid container alignItems={'center'} gap={2}>
                            <Grid item sx={{ fontSize: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', fontWeight: 600, color: light ? 'var(--dark2)' : 'var(--cero)' }}>#{jugador.dorsal}</Grid>
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
                                <Grid item sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    <Grid item sx={{ color: light ? 'var(--dark2)' : 'var(--cero)' }}>{'Capitan'}</Grid>
                                    <Grid item sx={{ color: light ? 'var(--dark2)' : 'var(--cero)', border: light ? 'solid 1px var(--dark2)' : 'solid 1px var(--cero)', height: '25px', width: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        <Capitan size={20} />
                                    </Grid>
                                </Grid>}
                            <Grid container alignItems={'center'} gap={2} sx={{ color: light ? 'var(--dark2)' : 'var(--cero)' }}>
                                {'Valor mercado: '} <strong>{formatoPesosArgentinos(jugador.valor_mercado)}</strong>
                                {'Clausula: '} <strong>{formatoPesosArgentinos(jugador.clausula)}</strong>
                            </Grid>
                            <Grid container alignItems={'center'} gap={2} sx={{ color: light ? 'var(--dark2)' : 'var(--cero)' }}>
                                {jugador.partidos >= 2 && jugador.status === 'Nuevo' && (
                                    <span>
                                        {`${jugador.name} nació el ${formatoFecha} en ${jugador.nacionalidad} tiene ${jugador.edad} años,
                                    ha jugado ${jugador.partidos} partidos con ${jugador.equipo} y está en el equipo desde ${moment(jugador.fecha_inicio).format('DD/MM/YYYY')}, 
                                    tiene un contrato `}
                                        <strong>{constratos}</strong>
                                        {`, con un sueldo de `}
                                        <strong>{formatoPesosArgentinos(jugador.sueldo)}</strong>
                                    </span>
                                )}

                                {jugador.partidos === 1 && jugador.status === 'Nuevo' && (
                                    <span>
                                        {`${jugador.name} nació el ${formatoFecha} en ${jugador.nacionalidad} tiene ${jugador.edad} años,
                                    ha jugado ${jugador.partidos} partido con ${jugador.equipo} y está en el equipo desde ${formatoFechaCreate}, 
                                    tiene un contrato `}
                                        <strong>{constratos}</strong>
                                        {`, con un sueldo de `}
                                        <strong>{formatoPesosArgentinos(jugador.sueldo)}</strong>
                                    </span>
                                )}

                                {jugador.partidos === 0 && jugador.status === 'Nuevo' && (
                                    <span>
                                        {`${jugador.name} nació el ${formatoFecha} en ${jugador.nacionalidad} tiene ${jugador.edad} años,
                                    no ha jugado ningún partido con ${jugador.equipo} y está en el equipo desde ${moment(jugador.fecha_inicio).format('DD/MM/YYYY')}, 
                                    tiene un contrato `}
                                        <strong>{constratos}</strong>
                                        {`, con un sueldo de `}
                                        <strong>{formatoPesosArgentinos(jugador.sueldo)}</strong>
                                    </span>
                                )}

                                {jugador.status === 'Prestamo' && (
                                    <span>
                                        {`${jugador.name} nació el ${formatoFecha} en ${jugador.nacionalidad} tiene ${jugador.edad} años,
                                    llega en condicion de PRESTAMO desde el ${jugador.equipo} estara hasta el final de temporara, teniendo en cuenta que con su equipo de origen le queda un contrato `}
                                        <strong>{constratos}</strong>
                                        {`, con un sueldo de `}
                                        <strong>{formatoPesosArgentinos(jugador.sueldo)}</strong>
                                    </span>
                                )}
                            </Grid>
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell style={{ color: light ? 'var(--dark2)' : 'var(--cero)' }}>Estadística</TableCell>
                                            <TableCell style={{ color: light ? 'var(--dark2)' : 'var(--cero)' }}>Valor</TableCell>
                                            <TableCell style={{ color: light ? 'var(--dark2)' : 'var(--cero)' }}>Promedio</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell><Grid item sx={{ display: 'flex', alignItems: 'center', gap: '6px', color: light ? 'var(--dark2)' : 'var(--cero)' }}>{'Goles'} <Gol size={20} /></Grid></TableCell>
                                            <TableCell style={{ color: light ? 'var(--dark2)' : 'var(--cero)' }}>{jugador.goles}</TableCell>
                                            <TableCell style={{ color: light ? 'var(--dark2)' : 'var(--cero)' }}>{calcularPromedio(jugador.goles, jugador.partidos)}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell><Grid item sx={{ display: 'flex', alignItems: 'center', gap: '6px', color: light ? 'var(--dark2)' : 'var(--cero)' }}>{'Amarillas'} <Tarjeta size={20} color={'var(--warnning)'} /></Grid></TableCell>
                                            <TableCell style={{ color: light ? 'var(--dark2)' : 'var(--cero)' }}>{jugador.tarjetas_amarillas}</TableCell>
                                            <TableCell style={{ color: light ? 'var(--dark2)' : 'var(--cero)' }}>{calcularPromedio(jugador.tarjetas_amarillas, jugador.partidos)}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell><Grid item sx={{ display: 'flex', alignItems: 'center', gap: '6px', color: light ? 'var(--dark2)' : 'var(--cero)' }}>{'Rojas'} <Tarjeta size={20} color={'var(--danger)'} /></Grid></TableCell>
                                            <TableCell style={{ color: light ? 'var(--dark2)' : 'var(--cero)' }}>{jugador.tarjetas_roja}</TableCell>
                                            <TableCell style={{ color: light ? 'var(--dark2)' : 'var(--cero)' }}>{calcularPromedio(jugador.tarjetas_roja, jugador.partidos)}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell><Grid item sx={{ display: 'flex', alignItems: 'center', gap: '6px', color: light ? 'var(--dark2)' : 'var(--cero)' }}>{'Azules'} <Tarjeta size={20} color={'var(--primario)'} /></Grid></TableCell>
                                            <TableCell style={{ color: light ? 'var(--dark2)' : 'var(--cero)' }}>{jugador.tarjetas_azul}</TableCell>
                                            <TableCell style={{ color: light ? 'var(--dark2)' : 'var(--cero)' }}>{calcularPromedio(jugador.tarjetas_azul, jugador.partidos)}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell><Grid item sx={{ display: 'flex', alignItems: 'center', gap: '6px', color: light ? 'var(--dark2)' : 'var(--cero)' }}>{'Asistencias'} <Asistir size={20} /></Grid></TableCell>
                                            <TableCell style={{ color: light ? 'var(--dark2)' : 'var(--cero)' }}>{jugador.asistencias}</TableCell>
                                            <TableCell style={{ color: light ? 'var(--dark2)' : 'var(--cero)' }}>{calcularPromedio(jugador.asistencias, jugador.partidos)}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <Grid container alignItems={'center'} gap={2}>
                                <Grid item sx={{ display: 'flex', alignItems: 'center', gap: '6px', color: light ? 'var(--dark2)' : 'var(--cero)' }}>
                                    <a style={{ fontSize: mobile ? '12px' : '', display: 'flex', alignItems: 'center', gap: '6px' }} href={`https://www.instagram.com/${jugador?.instagram}`} target="_blank">
                                        <Insta size={mobile ? 16 : 25} />
                                        @{jugador.instagram}
                                    </a>
                                </Grid>
                                <Grid item sx={{ display: 'flex', alignItems: 'center', gap: '6px', color: light ? 'var(--dark2)' : 'var(--cero)' }}>
                                    <a style={{ fontSize: mobile ? '12px' : '', display: 'flex', alignItems: 'center', gap: '6px' }} href={`https://www.twitter.com/${jugador?.twitter}`} target="_blank">
                                        <Twitter size={mobile ? 16 : 25} />
                                        @{jugador.twitter}
                                    </a>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions sx={{ background: light ? 'var(--cero)' : 'var(--dark)' }}>
                    <ButtonSend disable={false} handle={handleClose} title={'Cancelar'} icon={Salir} iconColor={''} iconSize={20} />
                </DialogActions>
            </Dialog>
        </Grid>
    )
}