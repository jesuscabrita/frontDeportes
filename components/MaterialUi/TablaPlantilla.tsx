import { withStyles, Theme, createStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Avatar, Button, CircularProgress, Grid, Tooltip, useMediaQuery } from '@mui/material';
import { useContext, useState } from 'react';
import Context from '../../context/contextPrincipal';
import { ModalEditarJugador } from '../modals/ModalEditarJugador';
import { useMutation, useQueryClient } from 'react-query';
import { JugadorDelete, jugadoresPut_lesion } from '../../service/jugadores';
import { alertaQuestion, alertaSubmit } from '../../utils/alert';
import { TbMoodEmpty as Vacio } from 'react-icons/tb';
import { ModalEditarDT } from '../modals/ModalEditarDT';
import { DTDelete } from '../../service/dt';
import { MdLocalHospital as Lesion } from 'react-icons/md';
import { lesionJugadores, lesionJugadoresNO } from '../../utils/utilsPanelJugadores';
import { ModalJornada } from '../modals/ModalJornada';
import { TbRectangleVertical as Tarjeta } from 'react-icons/tb';
import { VscSearchStop as Expulsado } from 'react-icons/vsc';
import { ModalJugadorInfo } from '../modals/ModalInfoJugador';
import { IoLogoClosedCaptioning as Capitan } from 'react-icons/io'; 
import { ModalJugadorCapitan } from '../modals/ModalCapital';
import { ModalJornadaDT } from '../modals/ModalJornadaDT';

export const TablaPlantilla = ({ jugadores, equipo, isLoading, director_tecnico }) => {
    const [light] = useContext(Context);
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });
    const [jugadorSeleccionado, setJugadorSeleccionado] = useState(null);
    const [dtSeleccionado, setDtSeleccionado] = useState(null);
    const [modalEditarJugador, setModalEditarJugador] = useState(false);
    const [modalEditarDT, setModalEditarDT] = useState(false);
    const [modalEditarJornada, setModalEditarJornada] = useState(false);
    const [modalJugadorInfo, setModalJugadorInfo] = useState(false);
    const [modalJugadorCapitan, setModalJugadorCapitan] = useState(false);
    const [modalJornadaDT, setModalJornadaDT] = useState(false);
    const queryClient = useQueryClient();
    const { mutate: eliminarJugador } = useMutation(JugadorDelete);
    const { mutate: eliminarDT } = useMutation(DTDelete);
    const { mutate: lesion_jugador } = useMutation(jugadoresPut_lesion);

    const StyledTableCell = withStyles((theme: Theme) =>
        createStyles({
            head: {
                backgroundColor: 'var(--dark2)',
                color: 'var(--cero)',
            },
            body: {
                fontSize: 12,
                color: light ? 'black' : 'var(--cero)'
            },
        }),
    )(TableCell);

    const StyledTableRow = withStyles((theme: Theme) =>
        createStyles({
            root: {
                '&:nth-of-type(odd)': {
                    backgroundColor: light ? theme.palette.action.hover : 'var(--dark)',
                },
            },
        }),
    )(TableRow);

    const posicionesOrdenadas = {
        'Portero': 1,
        'Defensa': 2,
        'Medio': 3,
        'Delantero': 4,
    };

    const jugadoresOrdenados = jugadores.sort((a, b) => {
        return posicionesOrdenadas[a.posicion] - posicionesOrdenadas[b.posicion];
    });

    const seleccionarJugador = (jugador) => {
        setJugadorSeleccionado(jugador);
        setModalEditarJugador(true);
    }

    const seleccionarDT = (dt) => {
        setDtSeleccionado(dt);
        setModalEditarDT(true);
    }

    const seleccionarJugadorJornada = (jugador) => {
        setJugadorSeleccionado(jugador);
        setModalEditarJornada(true);
    }

    const seleccionarJugadorInfo = (jugador) => {
        setJugadorSeleccionado(jugador);
        setModalJugadorInfo(true);
    }

    const seleccionarJugadorCapitan = (jugador) => {
        setJugadorSeleccionado(jugador);
        setModalJugadorCapitan(true);
    }

    const seleccionarDTJornada = (dt) => {
        setDtSeleccionado(dt);
        setModalJornadaDT(true);
        console.log('dt',setDtSeleccionado(dt));
        
    }

    const eliminarJugadores = (equipoId: string, jugadorId: string) => {
        alertaQuestion(equipoId, {}, (equipoId: string) => {
            eliminarJugador({ equipoId, jugadorId }, {
                onSuccess: (success) => {
                    queryClient.invalidateQueries(["equipos"]);
                    alertaSubmit(true, success?.message);
                },
                onError: (err: any) => {
                    const errorMessage = err?.response?.data?.message || err.message;
                    alertaSubmit(false, errorMessage);
                },
            });
        }, 'Si, Eliminar!', 'Eliminado de el equipo!', 'El jugador ha sido eliminado.', 'El jugador sigue en el equipo :)')
    }

    const eliminarDTs = (equipoId: string, dtId: string) => {
        alertaQuestion(equipoId, {}, (equipoId: string) => {
            eliminarDT({ equipoId, dtId }, {
                onSuccess: (success) => {
                    queryClient.invalidateQueries(["equipos"]);
                    alertaSubmit(true, success?.message);
                },
                onError: (err: any) => {
                    const errorMessage = err?.response?.data?.message || err.message;
                    alertaSubmit(false, errorMessage);
                },
            });
        }, 'Si, Eliminar!', 'Eliminado de el equipo!', 'El director tecnico ha sido eliminado.', 'El director  tecnico sigue en el equipo :)')
    }

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

    return (
        <>
            {isLoading ?
                <Grid mt={8} item sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '16px',
                    minWidth: !mobile ? '960px' : '100%',
                    height: mobile && '300px',
                    justifyContent: 'center',
                    color: light ? 'var(--dark2)' : 'var(--cero)'
                }}>
                    <CircularProgress style={{ color: light ? 'var(--dark2)' : 'var(--cero)' }} />
                </Grid>
                : jugadoresOrdenados.length === 0 && director_tecnico.length === 0 ?
                    <Grid mt={8} item sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '16px',
                        minWidth: !mobile ? '960px' : '100%',
                        height: mobile && '300px',
                        justifyContent: 'center',
                        color: light ? 'var(--dark2)' : 'var(--cero)'
                    }}>
                        No hay jugadores en este equipo <Vacio size={25} />
                    </Grid>
                    :
                    <TableContainer component={Paper} style={{ width: '100%', overflowX: 'auto' }}>
                        <Table aria-label="customized table" style={{ width: '100%' }} >
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>Posicion</StyledTableCell>
                                    <StyledTableCell align="left">Nombre</StyledTableCell>
                                    <StyledTableCell align="left">Dorsal</StyledTableCell>
                                    <StyledTableCell align="center">Pais</StyledTableCell>
                                    <StyledTableCell />
                                    <StyledTableCell />
                                    <StyledTableCell />
                                    <StyledTableCell />
                                    <StyledTableCell />
                                </TableRow>
                            </TableHead>
                            <TableBody style={{ background: light ? 'var(--cero)' : 'var(--dark3)' }}>
                                {director_tecnico.map((dt, index) => {
                                    return (
                                        <StyledTableRow key={dt.id} style={{background: dt.suspendido === 'Si' && 'var(--danger2)'}}>
                                            <StyledTableCell component="th" scope="row">
                                                <Grid container alignItems={'center'} gap={2} sx={{ whiteSpace: 'nowrap', width: '70px' }}>
                                                    <Grid>..</Grid>
                                                    <Grid sx={{ color: 'var(--neutral)', fontWeight: 700, fontSize: '17px' }}>DT</Grid>
                                                </Grid>
                                            </StyledTableCell>
                                            <StyledTableCell align="right" style={{ whiteSpace: 'nowrap' }}>
                                                <Grid sx={{ display: 'flex', alignItems: 'center', whiteSpace: 'nowrap', gap: '18px' }} >
                                                    <Avatar src="/broken-image.jpg" sx={{ height: '35px', width:'35px' }} />
                                                    <Grid sx={{ whiteSpace: 'nowrap', paddingRight: mobile && '30px', display:'flex', alignItems:'center',gap:'6px' }}>
                                                        {dt.name}
                                                        {dt.tarjetas_acumuladas > 0 && ( <Grid item sx={{display:'flex', alignItems:'center'}}>{dt.tarjetas_acumuladas}<Tarjeta color={'var(--warnning)'} size={20} /></Grid>)}
                                                        {dt.suspendido === 'Si' && ( 
                                                        <Grid item sx={{display:'flex', alignItems:'center',gap:'6px'}}>
                                                            <Expulsado size={20}/>
                                                            <Grid sx={{color:'var(--neutral)'}}>{`(expulsado ${dt.jornadas_suspendido} jornada)`}</Grid>
                                                        </Grid>)}
                                                    </Grid>
                                                </Grid>
                                            </StyledTableCell>
                                            <StyledTableCell align="left" style={{ fontWeight: 700, fontSize: '15px' }}>
                                                <Grid container gap={1}>
                                                    <Grid item>#</Grid>
                                                    <Grid item>NO</Grid>
                                                </Grid>
                                            </StyledTableCell>
                                            <StyledTableCell align="center">{dt.nacionalidad}</StyledTableCell>
                                            <StyledTableCell>
                                                <Button onClick={() => { seleccionarDT(dt) }}>Editar</Button>
                                            </StyledTableCell>
                                            <StyledTableCell>
                                                <Button onClick={() => { eliminarDTs(equipo._id, dt._id) }}> eliminar</Button>
                                            </StyledTableCell>
                                            <StyledTableCell>
                                                <Button disabled onClick={() => {  }}>Lesion</Button>
                                            </StyledTableCell>
                                            <StyledTableCell>
                                                <Button disabled onClick={() => {  }}>Capitan</Button>
                                            </StyledTableCell>
                                            <StyledTableCell>
                                                <Button disabled={dt.jornadas_suspendido < 1} onClick={() => { seleccionarDTJornada(dt) }}>suspencion</Button>
                                            </StyledTableCell>
                                        </StyledTableRow>
                                    )
                                })}
                                {jugadoresOrdenados.map((jugador, index) => {
                                    return (
                                        <StyledTableRow key={jugador.id} style={{background: jugador.suspendido === 'Si' && 'var(--danger2)'}}>
                                            <StyledTableCell component="th" scope="row">
                                                <Grid container alignItems={'center'} gap={2} sx={{ whiteSpace: 'nowrap', width: '70px' }}>
                                                    <Grid>{index + 1}</Grid>
                                                    {(jugador.posicion == 'Portero') &&
                                                        <Grid sx={{ color: 'var(--warnning)', fontWeight: 700, fontSize: '17px' }}>POR</Grid>}
                                                    {(jugador.posicion == 'Defensa') &&
                                                        <Grid sx={{ color: 'var(--gris)', fontWeight: 700, fontSize: '17px' }}>DEF</Grid>}
                                                    {(jugador.posicion == 'Medio') &&
                                                        <Grid sx={{ color: 'var(--check)', fontWeight: 700, fontSize: '17px' }}>MED</Grid>}
                                                    {(jugador.posicion == 'Delantero') &&
                                                        <Grid sx={{ color: 'var(--primario)', fontWeight: 700, fontSize: '17px' }}>DEL</Grid>}
                                                </Grid>
                                            </StyledTableCell>
                                            <StyledTableCell align="right" style={{ whiteSpace: 'nowrap' }}>
                                                <Grid sx={{ display: 'flex', alignItems: 'center', whiteSpace: 'nowrap', gap: '18px', cursor:'pointer' }} onClick={() => { seleccionarJugadorInfo(jugador) }}>
                                                    <Avatar {...stringAvatar(jugador.name)} sx={{ height: '35px', width: '35px' }} />
                                                    <Grid sx={{ whiteSpace: 'nowrap', paddingRight: mobile && '30px', display:'flex', alignItems:'center',gap:'6px' }}>
                                                        {jugador.name}
                                                        {jugador.capitan === 'Si' && 
                                                        <Grid item sx={{display:'flex', alignItems:'center', gap:'4px'}}>
                                                            <Grid item sx={{color: light ? 'var(--dark2)' : 'var(--cero)',border: light ?'solid 1px var(--dark2)': 'solid 1px var(--cero)', height:'20px', width:'40px', display:'flex', justifyContent:'center', alignItems:'center'}}>
                                                                <Capitan size={20}/>
                                                            </Grid>
                                                        </Grid>}
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
                                            <StyledTableCell align="left" style={{ fontWeight: 700, fontSize: '15px' }}>
                                                <Grid container gap={1}>
                                                    <Grid item>#</Grid>
                                                    <Grid item>{jugador.dorsal}</Grid>
                                                </Grid>
                                            </StyledTableCell>
                                            <StyledTableCell align="center">{jugador.nacionalidad}</StyledTableCell>
                                            <StyledTableCell>
                                                <Button onClick={() => { seleccionarJugador(jugador) }}>Editar</Button>
                                            </StyledTableCell>
                                            <StyledTableCell>
                                                <Button onClick={() => { eliminarJugadores(equipo._id, jugador._id) }}> eliminar</Button>
                                            </StyledTableCell>
                                            <StyledTableCell>
                                                {jugador.lesion === 'No' &&
                                                    <Button onClick={() => { lesionJugadores(
                                                    equipo._id,jugador._id, lesion_jugador,queryClient, 'Si'
                                                ) }}>Lesion</Button>}
                                                {jugador.lesion === 'Si' &&
                                                    <Button onClick={() => { lesionJugadoresNO(
                                                    equipo._id,jugador._id, lesion_jugador,queryClient, 'No'
                                                ) }}>Recuperar</Button>}
                                            </StyledTableCell>
                                            <StyledTableCell>
                                                <Button onClick={() => { seleccionarJugadorCapitan(jugador) }}>Capitan</Button>
                                            </StyledTableCell>
                                            <StyledTableCell>
                                                <Button disabled={jugador.jornadas_suspendido < 1} onClick={() => {seleccionarJugadorJornada(jugador) }}>suspencion</Button>
                                            </StyledTableCell>
                                        </StyledTableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>}
            {jugadorSeleccionado && (<ModalEditarJugador open={modalEditarJugador} setOpen={setModalEditarJugador} equipoId={equipo?._id} jugadorId={jugadorSeleccionado._id} data={jugadorSeleccionado} />)}
            {dtSeleccionado && (<ModalEditarDT open={modalEditarDT} setOpen={setModalEditarDT} equipoId={equipo?._id} directorTecnicoId={dtSeleccionado._id} data={dtSeleccionado} />)}
            {jugadorSeleccionado &&(<ModalJornada open={modalEditarJornada} setOpen={setModalEditarJornada} id={jugadorSeleccionado._id} equipoId={equipo?._id} data={jugadorSeleccionado}/>)}
            {jugadorSeleccionado && (<ModalJugadorInfo open={modalJugadorInfo} setOpen={setModalJugadorInfo} jugador={jugadorSeleccionado}/>)}
            {jugadorSeleccionado && (<ModalJugadorCapitan open={modalJugadorCapitan} setOpen={setModalJugadorCapitan} jugador={jugadorSeleccionado} equipoId={equipo?._id}/>)}
            {dtSeleccionado && (<ModalJornadaDT open={modalJornadaDT} setOpen={setModalJornadaDT} id={dtSeleccionado._id} equipoId={equipo?._id}  data={dtSeleccionado} />)}
        </>
    )
}