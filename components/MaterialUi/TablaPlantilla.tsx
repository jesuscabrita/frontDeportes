import { withStyles, Theme, createStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Avatar, Button, CircularProgress, Grid, useMediaQuery } from '@mui/material';
import { useContext, useState } from 'react';
import Context from '../../context/contextPrincipal';
import { ModalEditarJugador } from '../modals/ModalEditarJugador';
import { useMutation, useQueryClient } from 'react-query';
import { JugadorDelete } from '../../service/jugadores';
import { alertaQuestion, alertaSubmit } from '../../utils/alert';
import { TbMoodEmpty as Vacio } from 'react-icons/tb';
import { ModalEditarDT } from '../modals/ModalEditarDT';
import { DTDelete } from '../../service/dt';

export const TablaPlantilla = ({ jugadores, equipo, isLoading, director_tecnico }) => {
    const [light] = useContext(Context);
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });
    const [jugadorSeleccionado, setJugadorSeleccionado] = useState(null);
    const [dtSeleccionado, setDtSeleccionado] = useState(null);
    const [modalEditarJugador, setModalEditarJugador] = useState(false);
    const [modalEditarDT, setModalEditarDT] = useState(false)
    const queryClient = useQueryClient();
    const { mutate: eliminarJugador } = useMutation(JugadorDelete);
    const { mutate: eliminarDT } = useMutation(DTDelete);

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
                                </TableRow>
                            </TableHead>
                            <TableBody style={{ background: light ? 'var(--cero)' : 'var(--dark3)' }}>
                                {director_tecnico.map((dt, index) => {
                                    return (
                                        <StyledTableRow key={dt.id}>
                                            <StyledTableCell component="th" scope="row">
                                                <Grid container alignItems={'center'} gap={2} sx={{ whiteSpace: 'nowrap', width: '70px' }}>
                                                    <Grid>..</Grid>
                                                    <Grid sx={{ color: 'var(--neutral)', fontWeight: 700, fontSize: '17px' }}>DT</Grid>
                                                </Grid>
                                            </StyledTableCell>
                                            <StyledTableCell align="right" style={{ whiteSpace: 'nowrap' }}>
                                                <Grid sx={{ display: 'flex', alignItems: 'center', whiteSpace: 'nowrap', gap: '18px' }} >
                                                    <Avatar src="/broken-image.jpg" sx={{ height: '35px', width: '35px' }} />
                                                    <Grid sx={{ whiteSpace: 'nowrap', paddingRight: mobile && '30px' }}>{dt.name}</Grid>
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
                                        </StyledTableRow>
                                    )
                                })}
                                {jugadoresOrdenados.map((jugador, index) => {
                                    return (
                                        <StyledTableRow key={jugador.id}>
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
                                                <Grid sx={{ display: 'flex', alignItems: 'center', whiteSpace: 'nowrap', gap: '18px' }} >
                                                    <Avatar {...stringAvatar(jugador.name)} sx={{ height: '35px', width: '35px' }} />
                                                    <Grid sx={{ whiteSpace: 'nowrap', paddingRight: mobile && '30px' }}>{jugador.name}</Grid>
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
                                        </StyledTableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>}
            {jugadorSeleccionado && (<ModalEditarJugador open={modalEditarJugador} setOpen={setModalEditarJugador} equipoId={equipo?._id} jugadorId={jugadorSeleccionado._id} data={jugadorSeleccionado} />)}
            {dtSeleccionado && (<ModalEditarDT open={modalEditarDT} setOpen={setModalEditarDT} equipoId={equipo?._id} directorTecnicoId={dtSeleccionado._id} data={dtSeleccionado} />)}
        </>
    )
}