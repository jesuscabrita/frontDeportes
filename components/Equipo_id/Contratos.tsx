import React from 'react';
import { Grid } from '@mui/material';
import { formatoPesosArgentinos, seleccionarData } from '../../utils/utils';
import { MdSell as ListaTransf } from 'react-icons/md';
import { GiArchiveRegister as Regis } from 'react-icons/gi';
import { FaFileContract as Contra } from 'react-icons/fa';
import { AiOutlineFieldNumber as Num } from 'react-icons/ai';
import { MdAutorenew as Renovar } from 'react-icons/md';
import { FaFilePrescription as Recindir } from 'react-icons/fa';
import { ContratosProps } from '../../interfaces/general';
import { ButtomDanger, ButtomPrimario, ButtomSecundario, ButtomWarnnig } from '../Material/ButtonSend';
import { InscribirJugador, listaDeTransferiblesNo, listaDeTransferiblesSi } from '../../utils/utilsPanelJugadores';

export const Contratos: React.FC<ContratosProps> = ({
    light,
    mobile,
    isSameEmail,
    isUserAdmin,
    jugador,
    equipo,
    inscribir,
    listaTransferibleJugador,
    queryClient,
    setJugadorSeleccionado,
    setModalDorsal,
    setModalRecindir,
    setModalRenovar,
    setIsLoadinng
}) => {
    return (
        <Grid item md={6} container alignItems={'center'} justifyContent={'center'} flexDirection={'column'} >
            <Grid item container mt={2} mb={1} alignItems={'center'} justifyContent={'center'} sx={{ color: light ? "var(--dark2)" : "var(--cero)", letterSpacing: '2px', fontSize: !mobile ? '18px' : '16px', fontWeight: '500', fontFamily: 'Quicksand' }}>
                {` Contratos`}
                <Contra size={20} />
            </Grid>
            <Grid item container alignItems={'center'} justifyContent={'center'} sx={{ gap: '4px', letterSpacing: '2px', fontSize: mobile ? '11px' : '13px', color: light ? 'var(--dark2)' : 'var(--gris)', fontFamily: 'Quicksand' }}>
                {jugador.inscrito === 'Si' ? 'Jugador registrado' : 'Jugador no registrado'}
                {jugador.inscrito === 'Si' ? <Regis size={20} color={'var(--check)'} /> : <Regis size={20} color={'var(--danger)'} />}
            </Grid>
            <Grid item container alignItems={'center'} justifyContent={'center'} sx={{ gap: '4px', letterSpacing: '2px', fontSize: mobile ? '11px' : '13px', color: light ? 'var(--dark2)' : 'var(--gris)', fontFamily: 'Quicksand' }}>
                {jugador.transferible === 'No' ? 'No transferible' : 'Transferible'}
                {jugador.transferible === 'Si' && <ListaTransf size={20} color={'var(--warnning)'} />}
            </Grid>
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
                <Grid item mt={mobile ? 0.4 : 0} sx={{ color: light ? "var(--dark2)" : "var(--gris)", letterSpacing: '0px', fontSize: mobile ? '12px' : '16px', fontWeight: '400', fontFamily: 'Quicksand' }}>
                    {jugador.contrato === 0.5 && 'Media Temporada'}
                    {jugador.contrato === 1 && '1 Temporada'}
                    {jugador.contrato >= 2 && `${jugador.contrato} Temporadas`}
                </Grid>
            </Grid>
            {(isSameEmail || isUserAdmin) && jugador.transferible === 'No' &&
                <Grid item container width={'220px'} mt={2}>
                    <ButtomWarnnig
                        title="L.transferencia"
                        handleclick={() => { listaDeTransferiblesSi(equipo._id, jugador._id, listaTransferibleJugador, queryClient, 'Si') }}
                        icon={ListaTransf}
                        disabled={jugador.contrato === 0}
                    />
                </Grid>}
            {(isSameEmail || isUserAdmin) && jugador.transferible === 'Si' &&
                <Grid item container width={'220px'} mt={2}>
                    <ButtomPrimario
                        title="No transfererible"
                        handleclick={() => { listaDeTransferiblesNo(equipo._id, jugador._id, listaTransferibleJugador, queryClient, 'No') }}
                        icon={ListaTransf}
                        disabled={jugador.contrato === 0}
                    />
                </Grid>}
            {(isSameEmail || isUserAdmin) &&
                <Grid item container width={'220px'} mt={2}>
                    <ButtomPrimario
                        title="Renovar contrato"
                        handleclick={() => { seleccionarData(jugador, setJugadorSeleccionado, setModalRenovar) }}
                        icon={Renovar}
                    />
                </Grid>}
            {(isSameEmail || isUserAdmin) &&
                <Grid item container width={'220px'} mt={2}>
                    <ButtomDanger
                        title="Recindir contrato"
                        handleclick={() => { seleccionarData(jugador, setJugadorSeleccionado, setModalRecindir) }}
                        icon={Recindir}
                        disabled={jugador.contrato === 0}
                    />
                </Grid>}
            {(isSameEmail || isUserAdmin) &&
                <Grid item container width={'220px'} mt={2}>
                    <ButtomSecundario
                        title="Dorsal"
                        handleclick={() => { seleccionarData(jugador, setJugadorSeleccionado, setModalDorsal) }}
                        icon={Num}
                    />
                </Grid>}
            {(isSameEmail || isUserAdmin) && jugador.inscrito === 'No' &&
                <Grid item container width={'220px'} mt={2}>
                    <ButtomPrimario
                        title="Inscribir"
                        handleclick={() => { InscribirJugador(equipo._id, jugador._id, inscribir, queryClient, 'Si', setIsLoadinng) }}
                        icon={Regis}
                    />
                </Grid>}
            {(isSameEmail || isUserAdmin) && jugador.inscrito === 'Si' &&
                <Grid item container width={'220px'} mt={2}>
                    <ButtomWarnnig
                        title="No inscribir"
                        handleclick={() => { InscribirJugador(equipo._id, jugador._id, inscribir, queryClient, 'No', setIsLoadinng) }}
                        icon={Regis}
                    />
                </Grid>}
        </Grid>
    )
}