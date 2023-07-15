import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import { Avatar, CircularProgress, Grid, useMediaQuery } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import Context from '../../context/contextPrincipal';
import { ModalEditarJugador } from '../modals/Jugador/ModalEditarJugador';
import { useMutation, useQueryClient } from 'react-query';
import { JugadorDelete, jugadoresPut_lesion } from '../../service/jugadores';
import { TbMoodEmpty as Vacio } from 'react-icons/tb';
import { ModalEditarDT } from '../modals/DT/ModalEditarDT';
import { DTDelete } from '../../service/dt';
import { MdLocalHospital as Lesion } from 'react-icons/md';
import { eliminarJugadores, lesionJugadores, lesionJugadoresNO } from '../../utils/utilsPanelJugadores';
import { ModalJornada } from '../modals/Jugador/ModalJornada';
import { TbRectangleVertical as Tarjeta } from 'react-icons/tb';
import { VscSearchStop as Expulsado } from 'react-icons/vsc';
import { ModalJugadorInfo } from '../modals/Jugador/ModalInfoJugador';
import { IoLogoClosedCaptioning as Capitan } from 'react-icons/io';
import { ModalJugadorCapitan } from '../modals/Jugador/ModalCapital';
import { ModalJornadaDT } from '../modals/DT/ModalJornadaDT';
import { StyledTableRow } from '../Material/StyledTableRow';
import { StyledTableCell } from '../Material/StyledTableCell';
import { CustomTableHead } from '../Material/CustomTableHead';
import { planilla, posicionesOrdenadas } from '../../utils/arrays';
import { ordenarJugadores, seleccionarData, stringAvatar } from '../../utils/utils';
import { eliminarDTs } from '../../utils/utilsDT';
import { ButtonSend } from '../Material/ButtonSend';
import { AiFillEdit as Edit } from 'react-icons/ai';
import { MdDelete as Eliminar } from 'react-icons/md';
import { MdOutlinePersonOff as Suspender } from 'react-icons/md';
import ContextRefac from '../../context/contextLogin';
import { FlagIcon } from './FlagIcon';

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
    const [isUserAdmin, setIsUserAdmin] = useState(false);
    const [isSameEmail, setIsSameEmail] = useState(false);
    const { state: { user } }: any = useContext(ContextRefac);

    useEffect(() => {
        setIsUserAdmin(user?.role === 'super_admin' || user?.role === 'admin');
    }, [user]);

    useEffect(() => {
        if (user?.email === equipo?.correo) {
            setIsSameEmail(true);
        } else {
            setIsSameEmail(false);
        }
    }, [user, equipo]);

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
                : ordenarJugadores(jugadores, posicionesOrdenadas).length === 0 && director_tecnico.length === 0 ?
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
                            <CustomTableHead headers={planilla(isUserAdmin, isSameEmail)} />
                            <TableBody style={{ background: light ? 'var(--cero)' : 'var(--dark3)' }}>
                                {director_tecnico.map((dt, index) => {
                                    return (
                                        <StyledTableRow light={light} key={dt.id} style={{ background: dt.suspendido === 'Si' && 'var(--danger2)' }}>
                                            <StyledTableCell light={light} component="th" scope="row">
                                                <Grid container alignItems={'center'} gap={2} sx={{ whiteSpace: 'nowrap', width: '70px' }}>
                                                    <Grid>..</Grid>
                                                    <Grid sx={{ color: 'var(--neutral)', fontWeight: 700, fontSize: '17px' }}>DT</Grid>
                                                </Grid>
                                            </StyledTableCell>
                                            <StyledTableCell light={light} align="right" style={{ whiteSpace: 'nowrap' }}>
                                                <Grid sx={{ display: 'flex', alignItems: 'center', whiteSpace: 'nowrap', gap: '18px' }} >
                                                    <Avatar src="/broken-image.jpg" sx={{ height: '35px', width: '35px' }} />
                                                    <Grid sx={{ whiteSpace: 'nowrap', paddingRight: mobile && '30px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                        {dt.name}
                                                        {dt.tarjetas_acumuladas > 0 && (<Grid item sx={{ display: 'flex', alignItems: 'center' }}>{dt.tarjetas_acumuladas}<Tarjeta color={'var(--warnning)'} size={20} /></Grid>)}
                                                        {dt.suspendido === 'Si' && (
                                                            <Grid item sx={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                                <Expulsado size={20} />
                                                                <Grid sx={{ color: 'var(--neutral)' }}>{`(expulsado ${dt.jornadas_suspendido} jornada)`}</Grid>
                                                            </Grid>)}
                                                    </Grid>
                                                </Grid>
                                            </StyledTableCell>
                                            <StyledTableCell light={light} align="left" style={{ fontWeight: 700, fontSize: '15px' }}>
                                                <Grid container gap={1}>
                                                    <Grid item>#</Grid>
                                                    <Grid item>NO</Grid>
                                                </Grid>
                                            </StyledTableCell>
                                            <StyledTableCell light={light} align="center"><FlagIcon nacionalidad={dt.nacionalidad} /></StyledTableCell>
                                            {isUserAdmin &&
                                                <StyledTableCell light={light}>
                                                    <ButtonSend title={'Editar'} icon={Edit} disable={false} handle={() => { seleccionarData(dt, setDtSeleccionado, setModalEditarDT) }} iconSize={20} iconColor={''} />
                                                </StyledTableCell>}
                                            {isUserAdmin &&
                                                <StyledTableCell light={light}>
                                                    <ButtonSend title={'Eliminar'} icon={Eliminar} disable={false} handle={() => { eliminarDTs(equipo._id, dt._id, eliminarDT, queryClient) }} iconSize={20} iconColor={'var(--danger)'} />
                                                </StyledTableCell>}
                                            {isUserAdmin &&
                                                <StyledTableCell light={light}>
                                                    <ButtonSend title={'Lesion'} icon={Lesion} disable={true} handle={() => { null }} iconSize={20} iconColor={''} />
                                                </StyledTableCell>}
                                            {isUserAdmin &&
                                                <StyledTableCell light={light}>
                                                    <ButtonSend title={'Capitan'} icon={Capitan} disable={true} handle={() => { null }} iconSize={20} iconColor={''} />
                                                </StyledTableCell>}
                                            {isUserAdmin &&
                                                <StyledTableCell light={light}>
                                                    <ButtonSend title={'Suspencion'} icon={Suspender} disable={dt.jornadas_suspendido < 1} handle={() => { seleccionarData(dt, setDtSeleccionado, setModalJornadaDT) }} iconSize={20} iconColor={''} />
                                                </StyledTableCell>}
                                        </StyledTableRow>
                                    )
                                })}
                                {ordenarJugadores(jugadores, posicionesOrdenadas).map((jugador, index) => {
                                    return (
                                        <StyledTableRow light={light} key={jugador.id} style={{ background: jugador.suspendido === 'Si' && 'var(--danger2)' }}>
                                            <StyledTableCell light={light} component="th" scope="row">
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
                                            <StyledTableCell light={light} align="right" style={{ whiteSpace: 'nowrap' }}>
                                                <Grid sx={{ display: 'flex', alignItems: 'center', whiteSpace: 'nowrap', gap: '18px', cursor: 'pointer' }} onClick={() => { seleccionarData(jugador, setJugadorSeleccionado, setModalJugadorInfo) }}>
                                                    <Avatar {...stringAvatar(jugador.name)} sx={{ height: '35px', width: '35px' }} />
                                                    <Grid sx={{ whiteSpace: 'nowrap', paddingRight: mobile && '30px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                        {jugador.name}
                                                        {jugador.capitan === 'Si' &&
                                                            <Grid item sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                                <Grid item sx={{ color: light ? 'var(--dark2)' : 'var(--cero)', border: light ? 'solid 1px var(--dark2)' : 'solid 1px var(--cero)', height: '20px', width: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                                    <Capitan size={20} />
                                                                </Grid>
                                                            </Grid>}
                                                        {jugador.lesion === 'Si' &&
                                                            <Grid item sx={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                                <Lesion size={20} />
                                                                <Grid sx={{ color: 'var(--neutral)' }}>{'(Lesionado)'}</Grid>
                                                            </Grid>}
                                                        {jugador.tarjetas_acumuladas > 0 && (<Grid item sx={{ display: 'flex', alignItems: 'center' }}>{jugador.tarjetas_acumuladas}<Tarjeta color={'var(--warnning)'} size={20} /></Grid>)}
                                                        {jugador.suspendido === 'Si' && (
                                                            <Grid item sx={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                                <Expulsado size={20} />
                                                                <Grid sx={{ color: 'var(--neutral)' }}>{`(expulsado ${jugador.jornadas_suspendido} jornada)`}</Grid>
                                                            </Grid>)}
                                                    </Grid>
                                                </Grid>
                                            </StyledTableCell>
                                            <StyledTableCell light={light} align="left" style={{ fontWeight: 700, fontSize: '15px' }}>
                                                <Grid container gap={1}>
                                                    <Grid item>#</Grid>
                                                    <Grid item>{jugador.dorsal}</Grid>
                                                </Grid>
                                            </StyledTableCell>
                                            <StyledTableCell light={light} align="center"><FlagIcon nacionalidad={jugador.nacionalidad} /></StyledTableCell>
                                            {isUserAdmin &&
                                                <StyledTableCell light={light}>
                                                    <ButtonSend title={'Editar'} icon={Edit} disable={false} handle={() => { seleccionarData(jugador, setJugadorSeleccionado, setModalEditarJugador) }} iconSize={20} iconColor={''} />
                                                </StyledTableCell>}
                                            {isUserAdmin &&
                                                <StyledTableCell light={light}>
                                                    <ButtonSend title={'Eliminar'} icon={Eliminar} disable={false} handle={() => { eliminarJugadores(equipo._id, jugador._id, eliminarJugador, queryClient) }} iconSize={20} iconColor={'var(--danger)'} />
                                                </StyledTableCell>}
                                            {isUserAdmin &&
                                                <StyledTableCell light={light}>
                                                    {jugador.lesion === 'No' &&
                                                        <ButtonSend title={'Lesion'} icon={Lesion} disable={false} handle={() => { lesionJugadores(equipo._id, jugador._id, lesion_jugador, queryClient, 'Si') }} iconSize={20} iconColor={''} />}
                                                    {jugador.lesion === 'Si' &&
                                                        <ButtonSend title={'Recuperar'} icon={Lesion} disable={false} handle={() => { lesionJugadoresNO(equipo._id, jugador._id, lesion_jugador, queryClient, 'No') }} iconSize={20} iconColor={''} />}
                                                </StyledTableCell>}
                                            {isUserAdmin &&
                                                <StyledTableCell light={light}>
                                                    <ButtonSend title={'Capitan'} icon={Capitan} disable={false} handle={() => { seleccionarData(jugador, setJugadorSeleccionado, setModalJugadorCapitan) }} iconSize={20} iconColor={''} />
                                                </StyledTableCell>}
                                            {isSameEmail &&
                                                <StyledTableCell light={light}>
                                                    <ButtonSend title={'Capitan'} icon={Capitan} disable={false} handle={() => { seleccionarData(jugador, setJugadorSeleccionado, setModalJugadorCapitan) }} iconSize={20} iconColor={''} />
                                                </StyledTableCell>}
                                            {isUserAdmin &&
                                                <StyledTableCell light={light}>
                                                    <ButtonSend title={'Suspencion'} icon={Suspender} disable={jugador.jornadas_suspendido < 1} handle={() => { seleccionarData(jugador, setJugadorSeleccionado, setModalEditarJornada) }} iconSize={20} iconColor={''} />
                                                </StyledTableCell>}
                                        </StyledTableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>}
            {jugadorSeleccionado && (<ModalEditarJugador open={modalEditarJugador} setOpen={setModalEditarJugador} equipoId={equipo?._id} jugadorId={jugadorSeleccionado._id} data={jugadorSeleccionado} />)}
            {dtSeleccionado && (<ModalEditarDT open={modalEditarDT} setOpen={setModalEditarDT} equipoId={equipo?._id} directorTecnicoId={dtSeleccionado._id} data={dtSeleccionado} />)}
            {jugadorSeleccionado && (<ModalJornada open={modalEditarJornada} setOpen={setModalEditarJornada} id={jugadorSeleccionado._id} equipoId={equipo?._id} data={jugadorSeleccionado} />)}
            {jugadorSeleccionado && (<ModalJugadorInfo open={modalJugadorInfo} setOpen={setModalJugadorInfo} jugador={jugadorSeleccionado} />)}
            {jugadorSeleccionado && (<ModalJugadorCapitan open={modalJugadorCapitan} setOpen={setModalJugadorCapitan} jugador={jugadorSeleccionado} equipoId={equipo?._id} />)}
            {dtSeleccionado && (<ModalJornadaDT open={modalJornadaDT} setOpen={setModalJornadaDT} id={dtSeleccionado._id} equipoId={equipo?._id} data={dtSeleccionado} />)}
        </>
    )
}