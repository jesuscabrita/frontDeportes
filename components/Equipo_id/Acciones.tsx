import React from 'react';
import { Grid } from '@mui/material';
import { VscGithubAction } from "react-icons/vsc";
import { AiFillEdit as Edit } from 'react-icons/ai';
import { MdDelete as Eliminar } from 'react-icons/md';
import { IoLogoClosedCaptioning as Capitan } from 'react-icons/io';
import { MdLocalHospital as Lesion } from 'react-icons/md';
import { MdOutlinePersonOff as Suspender } from 'react-icons/md';
import { AccionesProps } from '../../interfaces/general';
import { seleccionarData } from '../../utils/utils';
import { ButtomDanger, ButtomPrimario, ButtomSecundario, ButtomWarnnig } from '../Material/ButtonSend';
import { eliminarJugadores, lesionJugadores, lesionJugadoresNO } from '../../utils/utilsPanelJugadores';

export const Acciones: React.FC<AccionesProps> = ({
    light,
    mobile,
    isSameEmail,
    isUserAdmin,
    jugador,
    equipo,
    eliminarJugador,
    lesion_jugador,
    queryClient,
    setJugadorSeleccionado,
    setModalJugadorCapitan,
    setModalEditarJugador,
    setModalEditarJornada,
}) => {
    return (
        <Grid item md={6} container flexDirection={'column'} alignItems={'center'} justifyContent={'center'}>
            <Grid item container alignItems={'center'} justifyContent={'center'} sx={{ color: light ? "var(--dark2)" : "var(--cero)", letterSpacing: '2px', fontSize: !mobile ? '18px' : '16px', fontWeight: '500', fontFamily: 'Quicksand' }}>
                {`Acciones`}
                <VscGithubAction size={20} />
            </Grid>
            {(isUserAdmin || isSameEmail) &&
                <Grid item container width={'220px'} mt={2}>
                    <ButtomSecundario
                        title="Capitan"
                        handleclick={() => { seleccionarData(jugador, setJugadorSeleccionado, setModalJugadorCapitan) }}
                        icon={Capitan}
                    />
                </Grid>}
            {(isUserAdmin) &&
                <Grid item container width={'220px'} mt={2}>
                    <ButtomSecundario
                        title={(jugador.lesion === 'No' && isUserAdmin) ? "Lesion" : 'Recuperar'}
                        handleclick={() => { (jugador.lesion === 'No' && isUserAdmin) ? lesionJugadores(equipo._id, jugador._id, lesion_jugador, queryClient, 'Si') : lesionJugadoresNO(equipo._id, jugador._id, lesion_jugador, queryClient, 'No') }}
                        icon={Lesion}
                    />
                </Grid>}
            {(isUserAdmin) &&
                <Grid item container width={'220px'} mt={2}>
                    <ButtomPrimario
                        title="Editar"
                        handleclick={() => { seleccionarData(jugador, setJugadorSeleccionado, setModalEditarJugador) }}
                        icon={Edit}
                    />
                </Grid>}
            {(isUserAdmin) &&
                <Grid item container width={'220px'} mt={2}>
                    <ButtomWarnnig
                        title="Suspender"
                        handleclick={() => { seleccionarData(jugador, setJugadorSeleccionado, setModalEditarJornada) }}
                        icon={Suspender}
                        disabled={jugador.jornadas_suspendido < 1}
                    />
                </Grid>}
            {(isUserAdmin) &&
                <Grid item container width={'220px'} mt={2}>
                    <ButtomDanger
                        title="Eliminar"
                        handleclick={() => { eliminarJugadores(equipo._id, jugador._id, eliminarJugador, queryClient) }}
                        icon={Eliminar}
                    />
                </Grid>}
        </Grid>
    )
}