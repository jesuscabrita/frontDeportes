import React, { useContext, useEffect, useState } from 'react';
import { Avatar, CircularProgress, Collapse, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, useMediaQuery } from '@mui/material';
import Context from '../../context/contextPrincipal';
import { ModalEditarJugador } from '../modals/Jugador/ModalEditarJugador';
import { useMutation, useQueryClient } from 'react-query';
import { JugadorDelete, jugadoresInscribir, jugadoresListaTransferible, jugadoresPut_lesion } from '../../service/jugadores';
import { TbMoodEmpty as Vacio } from 'react-icons/tb';
import { ModalEditarDT } from '../modals/DT/ModalEditarDT';
import { DTDelete } from '../../service/dt';
import { MdLocalHospital as Lesion } from 'react-icons/md';
import { InscribirJugador, eliminarJugadores, lesionJugadores, lesionJugadoresNO, listaDeTransferiblesNo, listaDeTransferiblesSi } from '../../utils/utilsPanelJugadores';
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
import { MdSell as ListaTransf } from 'react-icons/md';
import { planilla, posicionesOrdenadas } from '../../utils/arrays';
import { formatoPesosArgentinos, ordenarJugadores, seleccionarData, stringAvatar } from '../../utils/utils';
import { eliminarDTs } from '../../utils/utilsDT';
import { ButtomDanger, ButtomPrimario, ButtomSecundario, ButtomWarnnig, ButtonSend } from '../Material/ButtonSend';
import { AiFillEdit as Edit } from 'react-icons/ai';
import { MdDelete as Eliminar } from 'react-icons/md';
import { MdOutlinePersonOff as Suspender } from 'react-icons/md';
import ContextRefac from '../../context/contextLogin';
import { FlagIcon } from './FlagIcon';
import { MdFiberNew as Nuevo } from 'react-icons/md';
import { MdNewReleases as Prestamo } from 'react-icons/md';
import { MdKeyboardArrowDown as ArrowDown } from "react-icons/md";
import { MdKeyboardArrowUp as ArrowUp } from "react-icons/md";
import { GiArchiveRegister as Regis } from 'react-icons/gi';
import { FaFileContract as Contra } from 'react-icons/fa';
import { VscGithubAction } from "react-icons/vsc";
import { AiOutlineFieldNumber as Num } from 'react-icons/ai';
import { ModalDorsal } from '../modals/Jugador/ModalDorsal';
import { LoadingScreen } from '../Shared/LoadingScreen';
import { MdAutorenew as Renovar } from 'react-icons/md';
import { ModalRecindir } from '../modals/Jugador/ModalRecindir';
import { ModalRenovarJugador } from '../modals/Jugador/ModalRenovar';
import { FaFilePrescription as Recindir } from 'react-icons/fa';

interface Jugador {
    _id: string;
}

interface DtProps {
    _id: string;
}

interface TablaPlantillaProps {
    jugadores: {}[];
    equipo: { _id: string; correo: string; }
}

export const TablaPlantilla: React.FC<TablaPlantillaProps> = ({
    jugadores,
    equipo,
}) => {
    const [light] = useContext(Context);
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });
    const [jugadorSeleccionado, setJugadorSeleccionado] = useState<Jugador | null>(null);
    const [dtSeleccionado, setDtSeleccionado] = useState<DtProps | null>(null);
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
    const [openRows, setOpenRows] = useState<{ [key: number]: boolean }>({});
    const [modalDorsal, setModalDorsal] = useState(false);
    const { mutate: inscribir } = useMutation(jugadoresInscribir);
    const [isLoadinng, setIsLoadinng] = useState(false);
    const [modalRenovar, setModalRenovar] = useState(false);
    const [modalRecindir, setModalRecindir] = useState(false);
    const { mutate: listaTransferibleJugador } = useMutation(jugadoresListaTransferible);

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

    const handleRowClick = (index: number) => {
        setOpenRows((prev) => ({ ...prev, [index]: !prev[index] }));
    };


    return (
        <Grid item container>
            {ordenarJugadores(jugadores, posicionesOrdenadas).length === 0 ?
                <Grid item height={mobile ? "55vh" : '50vh'} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', color: light ? "var(--dark2)" : "var(--gris)", flexDirection: 'column', fontSize: mobile ? '14px' : '16px' }}>
                    <Vacio size={140} />
                    No hay jugadores en este equipo
                </Grid>
                : <TableContainer component={Paper}>
                    <Table aria-label="collapsible table">
                        <TableHead sx={{ background: light ? 'var(--dark2)' : 'var(--gris4)' }}>
                            <TableCell sx={{ color: light ? "var(--cero)" : "var(--dark2)", letterSpacing: '2px', fontSize: '18px', fontWeight: '500' }} align="center">Plantilla del equipo</TableCell>
                        </TableHead>
                        {ordenarJugadores(jugadores, posicionesOrdenadas) && ordenarJugadores(jugadores, posicionesOrdenadas)?.map((jugador, index) => {
                            const isOpen = openRows[index] || false;
                            return (
                                <TableBody>
                                    <TableRow sx={{ '& > *': { borderBottom: 'unset', background: light ? 'var(--gris3)' : jugador.suspendido === 'Si' ? 'var(--danger2)' : 'var(--dark4)', cursor: 'pointer' } }}>
                                        <TableCell sx={{ color: light ? 'var(--dark2)' : 'var(--cero)', whiteSpace: 'nowrap' }}>
                                            <Grid container flexDirection={'row'} alignItems={'center'} sx={{ minWidth: jugador.lesion === 'Si' ? '600px' : jugador.capitan === 'Si' ? '480px' : '420px' }}>
                                                {(isSameEmail || isUserAdmin) &&
                                                    <Grid item>
                                                        <IconButton aria-label="expand row" size="small" sx={{ color: light ? 'black' : 'var(--cero)' }} onClick={() => handleRowClick(index)}>
                                                            {isOpen ? <ArrowUp /> : <ArrowDown />}
                                                        </IconButton>
                                                    </Grid>}
                                                <Grid item container alignItems={'center'} gap={2} sx={{ whiteSpace: 'nowrap', width: '70px' }}>
                                                    <Grid>{index + 1}</Grid>
                                                    {(jugador.posicion == 'Portero') &&
                                                        <Grid sx={{ color: 'var(--warnning)', fontWeight: 700, fontSize: !mobile ? '15px' : '13px' }}>POR</Grid>}
                                                    {(jugador.posicion == 'Defensa') &&
                                                        <Grid sx={{ color: 'var(--gris2)', fontWeight: 700, fontSize: !mobile ? '15px' : '13px' }}>DEF</Grid>}
                                                    {(jugador.posicion == 'Medio') &&
                                                        <Grid sx={{ color: 'var(--check)', fontWeight: 700, fontSize: !mobile ? '15px' : '13px' }}>MED</Grid>}
                                                    {(jugador.posicion == 'Delantero') &&
                                                        <Grid sx={{ color: 'var(--primario)', fontWeight: 700, fontSize: !mobile ? '15px' : '13px' }}>DEL</Grid>}
                                                </Grid>
                                                <Grid item sx={{ display: 'flex', alignItems: 'center', whiteSpace: 'nowrap', gap: '18px', cursor: 'pointer' }} onClick={() => { seleccionarData(jugador, setJugadorSeleccionado, setModalJugadorInfo) }}>
                                                    <Avatar {...stringAvatar(jugador.name)} sx={{ height: '35px', width: '35px', background: !light ? '#aab4be' : '#1F2937', color: !light ? '#1F2937' : 'white' }} />
                                                    <Grid sx={{ whiteSpace: 'nowrap', paddingRight: mobile ? '30px' : '', display: 'flex', alignItems: 'center', gap: '6px', letterSpacing: '2px', fontSize: mobile ? '11px' : '14px', fontWeight: '500', fontFamily: 'Quicksand' }}>
                                                        {jugador.name}
                                                        {jugador.status === 'Fichado' && jugador.partidos < 2 &&
                                                            <Grid item sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                                <Nuevo size={25} color={'var(--check)'} />
                                                            </Grid>}
                                                        {jugador.status === 'Prestamo' &&
                                                            <Grid item sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                                <Prestamo size={25} color={'var(--warnning)'} />
                                                                <Grid sx={{ color: 'var(--neutral)' }}>{`P.(${jugador.equipo})`}</Grid>
                                                            </Grid>}
                                                        {jugador.capitan === 'Si' &&
                                                            <Grid item sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                                <Grid item sx={{ color: light ? 'var(--dark2)' : 'var(--cero)', border: light ? 'solid 1px var(--dark2)' : 'solid 1px var(--cero)', height: '20px', width: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '4px' }}>
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
                                                <Grid container alignItems={'center'} width={'40px'} ml={2} gap={1} sx={{ letterSpacing: '2px', fontSize: mobile ? '11px' : '14px', fontWeight: '500', fontFamily: 'Quicksand' }}>
                                                    <Grid item>#</Grid>
                                                    <Grid item sx={{ fontSize: '16px', fontWeight: '800' }}>{jugador.dorsal}</Grid>
                                                </Grid>
                                                <Grid item container width={'40px'} ml={2}>
                                                    <FlagIcon nacionalidad={jugador.nacionalidad} />
                                                </Grid>
                                            </Grid>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell style={{ paddingBottom: 0, paddingTop: 0, background: light ? 'var(--gris3)' : 'var(--dark4)', borderColor: light ? 'var(--dark2)' : 'var(--gris)' }} colSpan={8}>
                                            <Collapse in={isOpen} timeout="auto" unmountOnExit>
                                                <Grid item container alignItems={'center'} justifyContent={'center'} sx={{ padding: mobile ? '0px' : '20px', paddingTop: '20px', paddingBottom: '20px' }}>
                                                    <Grid item md={6} container flexDirection={'column'} alignItems={'center'} justifyContent={'center'}>
                                                        <Grid item container alignItems={'center'} justifyContent={'center'} sx={{ color: light ? "var(--dark2)" : "var(--cero)", letterSpacing: '2px', fontSize: !mobile ? '18px' : '16px', fontWeight: '500', fontFamily: 'Quicksand' }}>
                                                            {`Acciones`}
                                                            <VscGithubAction size={20} />
                                                        </Grid>
                                                        {isUserAdmin &&
                                                            <Grid item container width={'220px'} mt={2}>
                                                                <ButtomSecundario
                                                                    title="Capitan"
                                                                    handleclick={() => { seleccionarData(jugador, setJugadorSeleccionado, setModalJugadorCapitan) }}
                                                                    icon={Capitan}
                                                                />
                                                            </Grid>}
                                                        {isSameEmail &&
                                                            <Grid item container width={'220px'} mt={2}>
                                                                <ButtomSecundario
                                                                    title="Capitan"
                                                                    handleclick={() => { seleccionarData(jugador, setJugadorSeleccionado, setModalJugadorCapitan) }}
                                                                    icon={Capitan}
                                                                />
                                                            </Grid>}
                                                        {(jugador.lesion === 'No' && isUserAdmin) &&
                                                            <Grid item container width={'220px'} mt={2}>
                                                                <ButtomSecundario
                                                                    title="Lesion"
                                                                    handleclick={() => { lesionJugadores(equipo._id, jugador._id, lesion_jugador, queryClient, 'Si') }}
                                                                    icon={Lesion}
                                                                />
                                                            </Grid>}
                                                        {(jugador.lesion === 'Si' && isUserAdmin) &&
                                                            <Grid item container width={'220px'} mt={2}>
                                                                <ButtomSecundario
                                                                    title="Recuperar"
                                                                    handleclick={() => { lesionJugadoresNO(equipo._id, jugador._id, lesion_jugador, queryClient, 'No') }}
                                                                    icon={Lesion}
                                                                />
                                                            </Grid>}
                                                        {isUserAdmin &&
                                                            <Grid item container width={'220px'} mt={2}>
                                                                <ButtomPrimario
                                                                    title="Editar"
                                                                    handleclick={() => { seleccionarData(jugador, setJugadorSeleccionado, setModalEditarJugador) }}
                                                                    icon={Edit}
                                                                />
                                                            </Grid>}
                                                        {isUserAdmin &&
                                                            <Grid item container width={'220px'} mt={2}>
                                                                <ButtomWarnnig
                                                                    title="Suspender"
                                                                    handleclick={() => { seleccionarData(jugador, setJugadorSeleccionado, setModalEditarJornada) }}
                                                                    icon={Suspender}
                                                                    disabled={jugador.jornadas_suspendido < 1}
                                                                />
                                                            </Grid>}
                                                        {isUserAdmin &&
                                                            <Grid item container width={'220px'} mt={2}>
                                                                <ButtomDanger
                                                                    title="Eliminar"
                                                                    handleclick={() => { eliminarJugadores(equipo._id, jugador._id, eliminarJugador, queryClient) }}
                                                                    icon={Eliminar}
                                                                />
                                                            </Grid>}
                                                    </Grid>
                                                    <Grid item md={6} container alignItems={'center'} justifyContent={'center'} flexDirection={'column'} >
                                                        <Grid item container mt={2} mb={1} alignItems={'center'} justifyContent={'center'} sx={{ color: light ? "var(--dark2)" : "var(--cero)", letterSpacing: '2px', fontSize: !mobile ? '18px' : '16px', fontWeight: '500', fontFamily: 'Quicksand' }}>
                                                            {` Contratos`}
                                                            <Contra size={20} />
                                                        </Grid>
                                                        {jugador.inscrito === 'Si' &&
                                                            <Grid item container alignItems={'center'} justifyContent={'center'} sx={{ gap: '4px', letterSpacing: '2px', fontSize: mobile ? '11px' : '13px', color: light ? 'var(--dark2)' : 'var(--gris)', fontFamily: 'Quicksand' }}>
                                                                Jugador registrado
                                                                <Regis size={20} color={'var(--check)'} />
                                                            </Grid>}
                                                        {jugador.inscrito === 'No' &&
                                                            <Grid item container alignItems={'center'} justifyContent={'center'} sx={{ gap: '4px', letterSpacing: '2px', fontSize: mobile ? '11px' : '13px', color: light ? 'var(--dark2)' : 'var(--gris)', fontFamily: 'Quicksand' }}>
                                                                Jugador no registrado
                                                                <Regis size={20} color={'var(--danger)'} />
                                                            </Grid>}
                                                        {jugador.transferible === 'No' &&
                                                            <Grid item container alignItems={'center'} justifyContent={'center'} sx={{ gap: '4px', letterSpacing: '2px', fontSize: mobile ? '11px' : '13px', color: light ? 'var(--dark2)' : 'var(--gris)', fontFamily: 'Quicksand' }}>
                                                                No transferible
                                                            </Grid>}
                                                        {jugador.transferible === 'Si' &&
                                                            <Grid item container alignItems={'center'} justifyContent={'center'} sx={{ gap: '4px', letterSpacing: '2px', fontSize: mobile ? '11px' : '13px', color: light ? 'var(--dark2)' : 'var(--gris)', fontFamily: 'Quicksand' }}>
                                                                Transferible
                                                                <ListaTransf size={20} color={'var(--warnning)'} />
                                                            </Grid>}
                                                        <Grid item container mt={0.5} alignItems={'center'} justifyContent={'center'} gap={1}>
                                                            <Grid item sx={{ color: light ? "var(--dark2)" : "var(--cero)", letterSpacing: '1px', fontSize: mobile ? '14px' : '16px', fontWeight: '800', fontFamily: 'Quicksand' }}>
                                                                Sueldo
                                                            </Grid>
                                                            <Grid item mt={mobile ? 0.4 : 0} sx={{ color: light ? "var(--dark2)" : "var(--gris)", letterSpacing: '0px', fontSize: mobile ? '12px' : '16px', fontWeight: '400', fontFamily: 'Quicksand' }}>
                                                                {formatoPesosArgentinos(jugador.sueldo)}
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item container alignItems={'center'} justifyContent={'center'} gap={1}>
                                                            <Grid item sx={{ color: light ? "var(--dark2)" : "var(--cero)", letterSpacing: '1px', fontSize: mobile ? '14px' : '16px', fontWeight: '800', fontFamily: 'Quicksand' }}>
                                                                Valor mercado
                                                            </Grid>
                                                            <Grid item mt={mobile ? 0.4 : 0} sx={{ color: light ? "var(--dark2)" : "var(--gris)", letterSpacing: '0px', fontSize: mobile ? '12px' : '16px', fontWeight: '400', fontFamily: 'Quicksand' }}>
                                                                {formatoPesosArgentinos(jugador.valor_mercado)}
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item container alignItems={'center'} justifyContent={'center'} gap={1}>
                                                            <Grid item sx={{ color: light ? "var(--dark2)" : "var(--cero)", letterSpacing: '1px', fontSize: mobile ? '14px' : '16px', fontWeight: '800', fontFamily: 'Quicksand' }}>
                                                                Clausula
                                                            </Grid>
                                                            <Grid item mt={mobile ? 0.4 : 0} sx={{ color: light ? "var(--dark2)" : "var(--gris)", letterSpacing: '0px', fontSize: mobile ? '12px' : '16px', fontWeight: '400', fontFamily: 'Quicksand' }}>
                                                                {formatoPesosArgentinos(jugador.clausula)}
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item container alignItems={'center'} justifyContent={'center'} gap={1}>
                                                            <Grid item sx={{ color: light ? "var(--dark2)" : "var(--cero)", letterSpacing: '1px', fontSize: mobile ? '14px' : '16px', fontWeight: '800', fontFamily: 'Quicksand' }}>
                                                                Contrato
                                                            </Grid>
                                                            {jugador.contrato === 0.5 &&
                                                                <Grid item mt={mobile ? 0.4 : 0} sx={{ color: light ? "var(--dark2)" : "var(--gris)", letterSpacing: '0px', fontSize: mobile ? '12px' : '16px', fontWeight: '400', fontFamily: 'Quicksand' }}>
                                                                    Media Temporada
                                                                </Grid>}
                                                            {jugador.contrato === 1 &&
                                                                <Grid item mt={mobile ? 0.4 : 0} sx={{ color: light ? "var(--dark2)" : "var(--gris)", letterSpacing: '0px', fontSize: mobile ? '12px' : '16px', fontWeight: '400', fontFamily: 'Quicksand' }}>
                                                                    1 Temporada
                                                                </Grid>}
                                                            {jugador.contrato >= 2 &&
                                                                <Grid item mt={mobile ? 0.4 : 0} sx={{ color: light ? "var(--dark2)" : "var(--gris)", letterSpacing: '0px', fontSize: mobile ? '12px' : '16px', fontWeight: '400', fontFamily: 'Quicksand' }}>
                                                                    {`${jugador.contrato} Temporadas`}
                                                                </Grid>}
                                                        </Grid>
                                                        {isSameEmail && jugador.transferible === 'No' &&
                                                            <Grid item container width={'220px'} mt={2}>
                                                                <ButtomWarnnig
                                                                    title="Poner en transfererible"
                                                                    handleclick={() => { listaDeTransferiblesSi(equipo._id, jugador._id, listaTransferibleJugador, queryClient, 'Si') }}
                                                                    icon={ListaTransf}
                                                                    disabled={jugador.contrato === 0}
                                                                />
                                                            </Grid>}
                                                        {isUserAdmin && jugador.transferible === 'No' &&
                                                            <Grid item container width={'220px'} mt={2}>
                                                                <ButtomWarnnig
                                                                    title="Poner en transfererible"
                                                                    handleclick={() => { listaDeTransferiblesSi(equipo._id, jugador._id, listaTransferibleJugador, queryClient, 'Si') }}
                                                                    icon={ListaTransf}
                                                                    disabled={jugador.contrato === 0}
                                                                />
                                                            </Grid>}
                                                        {isSameEmail && jugador.transferible === 'Si' &&
                                                            <Grid item container width={'220px'} mt={2}>
                                                                <ButtomPrimario
                                                                    title="Quitar de transfererible"
                                                                    handleclick={() => { listaDeTransferiblesNo(equipo._id, jugador._id, listaTransferibleJugador, queryClient, 'No') }}
                                                                    icon={ListaTransf}
                                                                    disabled={jugador.contrato === 0}
                                                                />
                                                            </Grid>}
                                                        {isUserAdmin && jugador.transferible === 'Si' &&
                                                            <Grid item container width={'220px'} mt={2}>
                                                                <ButtomPrimario
                                                                    title="Quitar de transfererible"
                                                                    handleclick={() => { listaDeTransferiblesNo(equipo._id, jugador._id, listaTransferibleJugador, queryClient, 'No') }}
                                                                    icon={ListaTransf}
                                                                    disabled={jugador.contrato === 0}
                                                                />
                                                            </Grid>}
                                                        {isSameEmail &&
                                                            <Grid item container width={'220px'} mt={2}>
                                                                <ButtomPrimario
                                                                    title="Renovar contrato"
                                                                    handleclick={() => { seleccionarData(jugador, setJugadorSeleccionado, setModalRenovar) }}
                                                                    icon={Renovar}
                                                                />
                                                            </Grid>}
                                                        {isUserAdmin &&
                                                            <Grid item container width={'220px'} mt={2}>
                                                                <ButtomPrimario
                                                                    title="Renovar contrato"
                                                                    handleclick={() => { seleccionarData(jugador, setJugadorSeleccionado, setModalRenovar) }}
                                                                    icon={Renovar}
                                                                />
                                                            </Grid>}
                                                        {isUserAdmin &&
                                                            <Grid item container width={'220px'} mt={2}>
                                                                <ButtomDanger
                                                                    title="Recindir contrato"
                                                                    handleclick={() => { seleccionarData(jugador, setJugadorSeleccionado, setModalRecindir) }}
                                                                    icon={Recindir}
                                                                    disabled={jugador.contrato === 0}
                                                                />
                                                            </Grid>}
                                                        {isSameEmail &&
                                                            <Grid item container width={'220px'} mt={2}>
                                                                <ButtomDanger
                                                                    title="Recindir contrato"
                                                                    handleclick={() => { seleccionarData(jugador, setJugadorSeleccionado, setModalRecindir) }}
                                                                    icon={Recindir}
                                                                    disabled={jugador.contrato === 0}
                                                                />
                                                            </Grid>}
                                                        {isSameEmail &&
                                                            <Grid item container width={'220px'} mt={2}>
                                                                <ButtomSecundario
                                                                    title="Dorsal"
                                                                    handleclick={() => { seleccionarData(jugador, setJugadorSeleccionado, setModalDorsal) }}
                                                                    icon={Num}
                                                                />
                                                            </Grid>}
                                                        {isUserAdmin &&
                                                            <Grid item container width={'220px'} mt={2}>
                                                                <ButtomSecundario
                                                                    title="Dorsal"
                                                                    handleclick={() => { seleccionarData(jugador, setJugadorSeleccionado, setModalDorsal) }}
                                                                    icon={Num}
                                                                />
                                                            </Grid>}
                                                        {isUserAdmin && jugador.inscrito === 'No' &&
                                                            <Grid item container width={'220px'} mt={2}>
                                                                <ButtomPrimario
                                                                    title="Inscribir"
                                                                    handleclick={() => { InscribirJugador(equipo._id, jugador._id, inscribir, queryClient, 'Si', setIsLoadinng) }}
                                                                    icon={Regis}
                                                                />
                                                            </Grid>}
                                                        {isSameEmail && jugador.inscrito === 'No' &&
                                                            <Grid item container width={'220px'} mt={2}>
                                                                <ButtomPrimario
                                                                    title="Inscribir"
                                                                    handleclick={() => { InscribirJugador(equipo._id, jugador._id, inscribir, queryClient, 'Si', setIsLoadinng) }}
                                                                    icon={Regis}
                                                                />
                                                            </Grid>}
                                                        {isUserAdmin && jugador.inscrito === 'Si' &&
                                                            <Grid item container width={'220px'} mt={2}>
                                                                <ButtomWarnnig
                                                                    title="No inscribir"
                                                                    handleclick={() => { InscribirJugador(equipo._id, jugador._id, inscribir, queryClient, 'No', setIsLoadinng) }}
                                                                    icon={Regis}
                                                                />
                                                            </Grid>}
                                                        {isSameEmail && jugador.inscrito === 'Si' &&
                                                            <Grid item container width={'220px'} mt={2}>
                                                                <ButtomWarnnig
                                                                    title="No inscribir"
                                                                    handleclick={() => { InscribirJugador(equipo._id, jugador._id, inscribir, queryClient, 'No', setIsLoadinng) }}
                                                                    icon={Regis}
                                                                />
                                                            </Grid>}
                                                    </Grid>
                                                </Grid>
                                            </Collapse>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            )
                        })}
                    </Table>
                </TableContainer>}
            {isLoadinng && <LoadingScreen />}
            {jugadorSeleccionado && <ModalRecindir open={modalRecindir} setOpen={setModalRecindir} data={jugadorSeleccionado} equipoId={equipo?._id} />}
            {jugadorSeleccionado && (<ModalRenovarJugador open={modalRenovar} setOpen={setModalRenovar} data={jugadorSeleccionado} jugadorId={jugadorSeleccionado?._id} equipoId={equipo?._id} />)}
            {jugadorSeleccionado && (<ModalDorsal open={modalDorsal} setOpen={setModalDorsal} data={jugadorSeleccionado} equipoId={equipo?._id} jugadorId={jugadorSeleccionado._id} />)}
            {jugadorSeleccionado && (<ModalJugadorCapitan open={modalJugadorCapitan} setOpen={setModalJugadorCapitan} jugador={jugadorSeleccionado} equipoId={equipo?._id} />)}
            {jugadorSeleccionado && (<ModalEditarJugador open={modalEditarJugador} setOpen={setModalEditarJugador} equipoId={equipo?._id} jugadorId={jugadorSeleccionado._id} data={jugadorSeleccionado} />)}
            {dtSeleccionado && (<ModalEditarDT open={modalEditarDT} setOpen={setModalEditarDT} equipoId={equipo?._id} directorTecnicoId={dtSeleccionado._id} data={dtSeleccionado} />)}
            {jugadorSeleccionado && (<ModalJornada open={modalEditarJornada} setOpen={setModalEditarJornada} id={jugadorSeleccionado._id} equipoId={equipo?._id} data={jugadorSeleccionado} />)}
            {jugadorSeleccionado && (<ModalJugadorInfo open={modalJugadorInfo} setOpen={setModalJugadorInfo} jugador={jugadorSeleccionado} />)}
            {dtSeleccionado && (<ModalJornadaDT open={modalJornadaDT} setOpen={setModalJornadaDT} id={dtSeleccionado._id} equipoId={equipo?._id} data={dtSeleccionado} />)}
        </Grid>
    )
}