import React, { useState } from 'react';
import { Avatar, Collapse, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { TbMoodEmpty as Vacio } from 'react-icons/tb';
import { MdLocalHospital as Lesion } from 'react-icons/md';
import { TbRectangleVertical as Tarjeta } from 'react-icons/tb';
import { VscSearchStop as Expulsado } from 'react-icons/vsc';
import { IoLogoClosedCaptioning as Capitan } from 'react-icons/io';
import { posicionesOrdenadas } from '../../utils/arrays';
import { ordenarJugadores, seleccionarData, stringAvatar } from '../../utils/utils';
import { FlagIcon } from './FlagIcon';
import { MdFiberNew as Nuevo } from 'react-icons/md';
import { MdNewReleases as Prestamo } from 'react-icons/md';
import { MdKeyboardArrowDown as ArrowDown } from "react-icons/md";
import { MdKeyboardArrowUp as ArrowUp } from "react-icons/md";
import { TablaPlantillaProps } from '../../interfaces/general';
import { Acciones } from './Acciones';
import { Contratos } from './Contratos';

export const TablaPlantilla: React.FC<TablaPlantillaProps> = ({
    jugadores,
    equipo,
    light,
    mobile,
    queryClient,
    eliminarJugador,
    lesion_jugador,
    inscribir,
    listaTransferibleJugador,
    isSameEmail,
    isUserAdmin,
    setJugadorSeleccionado,
    setModalEditarJugador,
    setModalRecindir,
    setModalRenovar,
    setModalDorsal,
    setModalJugadorCapitan,
    setModalEditarJornada,
    setModalJugadorInfo,
    setIsLoadinng,
}) => {
    const [openRows, setOpenRows] = useState<{ [key: number]: boolean }>({});

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
                                            <Grid container flexDirection={'row'} alignItems={'center'} sx={{ minWidth: jugador.lesion === 'Si' ? '600px' : jugador.capitan === 'Si' ? '500px' : '480px' }}>
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
                                                <Grid item sx={{ display: 'flex', alignItems: 'center', whiteSpace: 'nowrap', gap: '18px', cursor: 'pointer', width: '240px' }} onClick={() => { seleccionarData(jugador, setJugadorSeleccionado, setModalJugadorInfo) }}>
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
                                                    <Acciones
                                                        mobile={mobile}
                                                        light={light}
                                                        equipo={equipo}
                                                        jugador={jugador}
                                                        eliminarJugador={eliminarJugador}
                                                        queryClient={queryClient}
                                                        lesion_jugador={lesion_jugador}
                                                        isSameEmail={isSameEmail}
                                                        isUserAdmin={isUserAdmin}
                                                        setJugadorSeleccionado={setJugadorSeleccionado}
                                                        setModalEditarJornada={setModalEditarJornada}
                                                        setModalEditarJugador={setModalEditarJugador}
                                                        setModalJugadorCapitan={setModalJugadorCapitan}
                                                    />
                                                    <Contratos
                                                        mobile={mobile}
                                                        light={light}
                                                        isSameEmail={isSameEmail}
                                                        isUserAdmin={isUserAdmin}
                                                        jugador={jugador}
                                                        equipo={equipo}
                                                        queryClient={queryClient}
                                                        inscribir={inscribir}
                                                        listaTransferibleJugador={listaTransferibleJugador}
                                                        setJugadorSeleccionado={setJugadorSeleccionado}
                                                        setIsLoadinng={setIsLoadinng}
                                                        setModalDorsal={setModalDorsal}
                                                        setModalRecindir={setModalRecindir}
                                                        setModalRenovar={setModalRenovar}
                                                    />
                                                </Grid>
                                            </Collapse>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            )
                        })}
                    </Table>
                </TableContainer>}
        </Grid>
    )
}