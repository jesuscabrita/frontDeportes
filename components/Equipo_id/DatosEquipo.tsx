import React from "react";
import { Grid, Tooltip } from "@mui/material";
import { ArrowP } from "../Shared/ArrowP";
import { MdCategory } from "react-icons/md";
import { BsFillChatLeftDotsFill as Chat } from "react-icons/bs";
import { AiOutlineEdit as Editar } from 'react-icons/ai';
import { MdDelete as Borrar } from 'react-icons/md';
import { GiSoccerBall as Goles } from 'react-icons/gi';
import { TbRectangleVertical as Tarjeta } from 'react-icons/tb';
import { BsArrowsCollapse as Position } from 'react-icons/bs';
import { GrInstagram as Instagram } from 'react-icons/gr';
import { BsCashCoin as Cash } from 'react-icons/bs';
import { MdOutlineManageAccounts as Delegado } from 'react-icons/md';
import { AiOutlineNumber as Puntos } from 'react-icons/ai';
import { FaEquals as Empate } from 'react-icons/fa';
import { MdVerified as Ganado } from 'react-icons/md';
import { AiOutlineCloseCircle as Perdido } from 'react-icons/ai';
import { formatoPesosArgentinos, seleccionarData } from "../../utils/utils";
import { eliminarDelegados } from "../../utils/utilsDelegado";
import { DatosEquipoProps } from "../../interfaces/general";
import { IoMdPersonAdd } from "react-icons/io";

export const DatosEquipo: React.FC<DatosEquipoProps> = ({
    data,
    light,
    equipoIndex,
    mobile,
    isSameEmail,
    isUserAdmin,
    equipo_id,
    eliminarDelegado,
    queryClient,
    modalDelegado,
    setDelegadoSeleccionado,
    setModalDelegadoChat,
    setModalDelegadoEditar,
    setModalDelegado,
}) => {
    return (
        <Grid item container justifyContent={'center'} gap={1}>
            <Grid item md={5} xs={12} gap={1} container >
                <Grid item container sx={{ color: light ? "var(--dark2)" : "var(--cero)", letterSpacing: '1px', fontSize: mobile ? '14px' : '16px', fontWeight: '800', background: light ? 'var(--gris4)' : 'var(--dark5)', padding: '10px', borderRadius: '6px' }}>
                    <Grid item container alignItems={'center'} ml={2} gap={1}>
                        Posicion en liga
                        <Position size={20} color={light ? 'var(--dark2)' : 'var(--cero)'} />
                    </Grid>
                    <Grid item container alignItems={'center'} ml={2} sx={{ color: light ? "var(--dark2)" : "var(--gris)", letterSpacing: '0px', fontSize: mobile ? '13px' : '16px', fontWeight: '400' }}>
                        # {equipoIndex + 1}
                        {data.partidosJugados >= 1 &&
                            <Grid item container alignItems={'center'} justifyContent={'center'} sx={{ whiteSpace: 'nowrap', width: '30px' }}>
                                <ArrowP currentPos={equipoIndex} prevPos={data.puntaje_anterior} />
                            </Grid>}
                    </Grid>
                </Grid>
                <Grid item container sx={{ color: light ? "var(--dark2)" : "var(--cero)", letterSpacing: '1px', fontSize: mobile ? '14px' : '16px', fontWeight: '800', background: light ? 'var(--gris4)' : 'var(--dark5)', padding: '10px', borderRadius: '6px' }}>
                    <Grid item container alignItems={'center'} ml={2} gap={1}>
                        Puntos
                        <Puntos size={20} color={light ? 'var(--dark2)' : 'var(--cero)'} />
                    </Grid>
                    <Grid item container alignItems={'center'} ml={2} sx={{ color: light ? "var(--dark2)" : "var(--gris)", letterSpacing: '0px', fontSize: mobile ? '13px' : '16px', fontWeight: '400' }}>
                        {data?.puntos}
                    </Grid>
                </Grid>
                <Grid item container sx={{ color: light ? "var(--dark2)" : "var(--cero)", letterSpacing: '1px', fontSize: mobile ? '14px' : '16px', fontWeight: '800', background: light ? 'var(--gris4)' : 'var(--dark5)', padding: '10px', borderRadius: '6px' }}>
                    <Grid item container alignItems={'center'} ml={2} gap={1}>
                        Tarjetas marillas
                        <Tarjeta size={20} color={'var(--warnning)'} />
                    </Grid>
                    <Grid item container alignItems={'center'} ml={2} sx={{ color: light ? "var(--dark2)" : "var(--gris)", letterSpacing: '0px', fontSize: mobile ? '13px' : '16px', fontWeight: '400' }}>
                        {data?.tarjetasAmarillas}
                    </Grid>
                </Grid>
                <Grid item container sx={{ color: light ? "var(--dark2)" : "var(--cero)", letterSpacing: '1px', fontSize: mobile ? '14px' : '16px', fontWeight: '800', background: light ? 'var(--gris4)' : 'var(--dark5)', padding: '10px', borderRadius: '6px' }}>
                    <Grid item container alignItems={'center'} ml={2} gap={1}>
                        Tarjetas rojas
                        <Tarjeta size={20} color={'var(--danger)'} />
                    </Grid>
                    <Grid item container alignItems={'center'} ml={2} sx={{ color: light ? "var(--dark2)" : "var(--gris)", letterSpacing: '0px', fontSize: mobile ? '13px' : '16px', fontWeight: '400' }}>
                        {data?.tarjetasRojas}
                    </Grid>
                </Grid>
                <Grid item container sx={{ color: light ? "var(--dark2)" : "var(--cero)", letterSpacing: '1px', fontSize: mobile ? '14px' : '16px', fontWeight: '800', background: light ? 'var(--gris4)' : 'var(--dark5)', padding: '10px', borderRadius: '6px' }}>
                    <Grid item container alignItems={'center'} ml={2} gap={1}>
                        Partidos ganados
                        <Ganado size={20} color={'var(--check)'} />
                    </Grid>
                    <Grid item container alignItems={'center'} ml={2} sx={{ color: light ? "var(--dark2)" : "var(--gris)", letterSpacing: '0px', fontSize: mobile ? '13px' : '16px', fontWeight: '400' }}>
                        {data?.ganados}
                    </Grid>
                </Grid>
                <Grid item container sx={{ color: light ? "var(--dark2)" : "var(--cero)", letterSpacing: '1px', fontSize: mobile ? '14px' : '16px', fontWeight: '800', background: light ? 'var(--gris4)' : 'var(--dark5)', padding: '10px', borderRadius: '6px' }}>
                    <Grid item container alignItems={'center'} ml={2} gap={1}>
                        Partidos empatados
                        <Empate size={20} color={'var(--warnning)'} />
                    </Grid>
                    <Grid item container alignItems={'center'} ml={2} sx={{ color: light ? "var(--dark2)" : "var(--gris)", letterSpacing: '0px', fontSize: mobile ? '13px' : '16px', fontWeight: '400' }}>
                        {data?.empates}
                    </Grid>
                </Grid>
                <Grid item container sx={{ color: light ? "var(--dark2)" : "var(--cero)", letterSpacing: '1px', fontSize: mobile ? '14px' : '16px', fontWeight: '800', background: light ? 'var(--gris4)' : 'var(--dark5)', padding: '10px', borderRadius: '6px' }}>
                    <Grid item container alignItems={'center'} ml={2} gap={1}>
                        Perdidos
                        <Perdido size={20} color={'var(--danger)'} />
                    </Grid>
                    <Grid item container alignItems={'center'} ml={2} sx={{ color: light ? "var(--dark2)" : "var(--gris)", letterSpacing: '0px', fontSize: mobile ? '13px' : '16px', fontWeight: '400' }}>
                        {data?.perdidos}
                    </Grid>
                </Grid>
            </Grid>
            <Grid item md={5} xs={12} container gap={1} >
                <Grid item container sx={{ color: light ? "var(--dark2)" : "var(--cero)", letterSpacing: '1px', fontSize: mobile ? '14px' : '16px', fontWeight: '800', background: light ? 'var(--gris4)' : 'var(--dark5)', padding: '10px', borderRadius: '6px' }}>
                    <Grid item container alignItems={'center'} ml={2} gap={1}>
                        Goles a favor
                        <Goles size={20} color={light ? 'var(--dark2)' : 'var(--cero)'} />+
                    </Grid>
                    <Grid item container alignItems={'center'} ml={2} sx={{ color: light ? "var(--dark2)" : "var(--gris)", letterSpacing: '0px', fontSize: mobile ? '13px' : '16px', fontWeight: '400' }}>
                        {data?.goles_a_Favor}
                    </Grid>
                </Grid>
                <Grid item container sx={{ color: light ? "var(--dark2)" : "var(--cero)", letterSpacing: '1px', fontSize: mobile ? '14px' : '16px', fontWeight: '800', background: light ? 'var(--gris4)' : 'var(--dark5)', padding: '10px', borderRadius: '6px' }}>
                    <Grid item container alignItems={'center'} ml={2} gap={1}>
                        Goles en contra
                        <Goles size={20} color={light ? 'var(--dark2)' : 'var(--cero)'} />-
                    </Grid>
                    <Grid item container alignItems={'center'} ml={2} sx={{ color: light ? "var(--dark2)" : "var(--gris)", letterSpacing: '0px', fontSize: mobile ? '13px' : '16px', fontWeight: '400' }}>
                        {data?.goles_en_Contra}
                    </Grid>
                </Grid>
                <Grid item container sx={{ color: light ? "var(--dark2)" : "var(--cero)", letterSpacing: '1px', fontSize: mobile ? '14px' : '16px', fontWeight: '800', background: light ? 'var(--gris4)' : 'var(--dark5)', padding: '10px', borderRadius: '6px' }}>
                    <Grid item container alignItems={'center'} ml={2} gap={1}>
                        Diferencia de goles
                        <Goles size={20} color={light ? 'var(--dark2)' : 'var(--cero)'} />
                    </Grid>
                    <Grid item container alignItems={'center'} ml={2} sx={{ color: light ? "var(--dark2)" : "var(--gris)", letterSpacing: '0px', fontSize: mobile ? '13px' : '16px', fontWeight: '400' }}>
                        {data?.diferencia_de_Goles}
                    </Grid>
                </Grid>
                <Grid item container sx={{ color: light ? "var(--dark2)" : "var(--cero)", letterSpacing: '1px', fontSize: mobile ? '14px' : '16px', fontWeight: '800', background: light ? 'var(--gris4)' : 'var(--dark5)', padding: '10px', borderRadius: '6px' }}>
                    <Grid item container alignItems={'center'} ml={2} gap={1}>
                        Instagram
                        <Instagram size={20} color={light ? 'var(--dark2)' : 'var(--cero)'} />
                    </Grid>
                    <Grid item container alignItems={'center'} ml={2} sx={{ color: light ? "var(--dark2)" : "var(--gris)", letterSpacing: '0px', fontSize: mobile ? '12px' : '16px', fontWeight: '400' }}>
                        <a href={`https://www.instagram.com/${data?.instagram}`} target="_blank">
                            <Grid sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px' }}>
                                @{!data?.instagram ? 'No definido' : data?.instagram}
                            </Grid>
                        </a>
                    </Grid>
                </Grid>
                <Grid item container sx={{ color: light ? "var(--dark2)" : "var(--cero)", letterSpacing: '1px', fontSize: mobile ? '14px' : '16px', fontWeight: '800', background: light ? 'var(--gris4)' : 'var(--dark5)', padding: '10px', borderRadius: '6px' }}>
                    <Grid item container alignItems={'center'} ml={2} gap={1}>
                        Categoria
                        <MdCategory size={20} color={light ? 'var(--dark2)' : 'var(--cero)'} />
                    </Grid>
                    <Grid item container alignItems={'center'} ml={2} sx={{ color: light ? "var(--dark2)" : "var(--gris)", letterSpacing: '0px', fontSize: mobile ? '13px' : '16px', fontWeight: '400' }}>
                        {data?.categoria}
                    </Grid>
                </Grid>
                {isSameEmail &&
                    <Grid item container sx={{ color: light ? "var(--dark2)" : "var(--cero)", letterSpacing: '1px', fontSize: mobile ? '14px' : '16px', fontWeight: '800', background: light ? 'var(--gris4)' : 'var(--dark5)', padding: '10px', borderRadius: '6px' }}>
                        <Grid item container alignItems={'center'} ml={2} gap={1}>
                            Banco del equipo
                            <Cash size={20} color={light ? 'var(--dark2)' : 'var(--cero)'} />
                        </Grid>
                        <Grid item container alignItems={'center'} ml={2} sx={{ color: light ? "var(--dark2)" : "var(--gris)", letterSpacing: '0px', fontSize: mobile ? '13px' : '16px', fontWeight: '400' }}>
                            {formatoPesosArgentinos(data?.banco_fondo)}
                        </Grid>
                    </Grid>}
                {isUserAdmin &&
                    <Grid item container sx={{ color: light ? "var(--dark2)" : "var(--cero)", letterSpacing: '1px', fontSize: mobile ? '14px' : '16px', fontWeight: '800', background: light ? 'var(--gris4)' : 'var(--dark5)', padding: '10px', borderRadius: '6px' }}>
                        <Grid item container alignItems={'center'} ml={2} gap={1}>
                            Banco del equipo
                            <Cash size={20} color={light ? 'var(--dark2)' : 'var(--cero)'} />
                        </Grid>
                        <Grid item container alignItems={'center'} ml={2} sx={{ color: light ? "var(--dark2)" : "var(--gris)", letterSpacing: '0px', fontSize: mobile ? '13px' : '16px', fontWeight: '400' }}>
                            {formatoPesosArgentinos(data?.banco_fondo)}
                        </Grid>
                    </Grid>}
                <Grid item container sx={{ color: light ? "var(--dark2)" : "var(--cero)", letterSpacing: '1px', fontSize: mobile ? '14px' : '16px', fontWeight: '800', background: light ? 'var(--gris4)' : 'var(--dark5)', padding: '10px', borderRadius: '6px' }}>
                    <Grid item container alignItems={'center'} ml={2} gap={1}>
                        Delegado
                        <Delegado size={20} color={light ? 'var(--dark2)' : 'var(--cero)'} />
                    </Grid>
                    <Grid item container alignItems={'center'} ml={2} gap={2} sx={{ color: light ? "var(--dark2)" : "var(--gris)", letterSpacing: '0px', fontSize: mobile ? '13px' : '16px', fontWeight: '400' }}>
                        {data?.delegado.length === 0 ? ' No definido - Añadir uno' : ' ' + data?.delegado[0].name}
                        {data?.delegado.length > 0 &&
                            <Tooltip title="Contactar al delegado del equipo" placement="top">
                                <Grid sx={{ cursor: 'pointer' }} onClick={() => { seleccionarData(data?.delegado, setDelegadoSeleccionado, setModalDelegadoChat) }}>
                                    <Chat size={20} />
                                </Grid>
                            </Tooltip>}
                        {data?.delegado.length === 0 &&
                            <Tooltip title="Crear un delegado y sus datos" placement="top">
                                <Grid sx={{ cursor: 'pointer' }} onClick={() => { setModalDelegado(!modalDelegado) }}>
                                    <IoMdPersonAdd size={20} />
                                </Grid>
                            </Tooltip>}
                        {isUserAdmin && (data?.delegado.length > 0) &&
                            <Tooltip title="Elimina el delegado" placement="top">
                                <Grid sx={{ cursor: 'pointer' }} onClick={() => { eliminarDelegados(equipo_id, data?.delegado[0]._id, eliminarDelegado, queryClient) }}>
                                    <Borrar size={20} color={'var(--danger)'} />
                                </Grid>
                            </Tooltip>}
                        {isUserAdmin && (data?.delegado.length > 0) &&
                            <Tooltip title="Editar el delegado" placement="top">
                                <Grid sx={{ cursor: 'pointer' }} onClick={() => { seleccionarData(data?.delegado, setDelegadoSeleccionado, setModalDelegadoEditar) }}>
                                    <Editar size={20} />
                                </Grid>
                            </Tooltip>}
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}