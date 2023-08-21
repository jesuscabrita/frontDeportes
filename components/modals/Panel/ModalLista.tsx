import { Avatar, Button, CircularProgress, Grid, Tooltip, useMediaQuery } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import Context from "../../../context/contextPrincipal";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { BsFillPatchCheckFill as Check } from "react-icons/bs";
import { useMutation, useQueryClient } from "react-query";
import moment from "moment";
import { jugadoresPut_partidos } from "../../../service/jugadores";
import { editarPartido } from "../../../utils/utilsPanelJugadores";
import { bajarPartido } from "../../../utils/utilsPanelAnular";
import { TbRectangleVertical as Tarjeta } from 'react-icons/tb';
import { DTPut_partidos } from "../../../service/dt";
import { bajarPartidoDT, editarPartidoDT } from "../../../utils/utilsDT";
import { MdLocalHospital as Lesion } from 'react-icons/md';
import { stringAvatar } from "../../../utils/utils";
import { MdOutlinePersonOff as Susp } from 'react-icons/md';
import { RiUserUnfollowFill as Baja } from 'react-icons/ri';

export const ModalLista = ({ open, setOpen, data, currentRound }) => {
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });
    const [light] = useContext(Context);
    const queryClient = useQueryClient();
    const [isLoading, setIsLoading] = useState(false);
    const { mutate: editarPartidos } = useMutation(jugadoresPut_partidos);
    const { mutate: editarPartidosDTs } = useMutation(DTPut_partidos);
    const [showImage, setShowImage] = useState(false);

    useEffect(() => {
        if (!isLoading) {
            const timeoutId = setTimeout(() => {
                setShowImage(true);
            }, 1000);
            return () => clearTimeout(timeoutId);
        }
    }, [isLoading]);

    const handleClose = () => {
        setOpen(false);
    };

    const filterInscrito = (array) => {
        const newFilter = array.filter(data => data.inscrito === 'Si');
        return newFilter;
    }

    return (
        <Grid item>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle sx={{ padding: '20px', color: light ? 'var(dark2)' : 'var(--cero)', background: light ? 'var(--cero)' : 'var(--dark)' }}>
                    {"Lista Convocados"}
                </DialogTitle>
                <DialogContent sx={{ background: light ? 'var(--cero)' : 'var(--dark)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {data?.director_tecnico.map((dt, index) => {
                        return (
                            <Grid item gap={1} p={1} sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', color: light ? 'var(--dark2)' : 'var(--cero)', background: dt.suspendido === 'Si' && 'var(--danger2)', borderRadius: '8px' }}>
                                <Grid item sx={{ fontSize: mobile ? '15px' : '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', width: mobile ? '20px' : '40px', fontWeight: 600 }}>..DT</Grid>
                                <Grid item sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: mobile ? '20px' : '35px', height: mobile ? '20px' : '35px' }}>
                                    <Tooltip title={dt.foto ? <img src={dt.foto} alt="Imagen" style={{ width: '150px', height: '150px' }} /> : <Avatar src="/broken-image.jpg" sx={{ width: '150px', height: '150px' }} />} arrow placement="top">
                                        <Avatar src="/broken-image.jpg" sx={{ width: mobile ? '20px' : '35px', height: mobile ? '20px' : '35px' }} />
                                    </Tooltip>
                                </Grid>
                                <Grid item sx={{ display: 'flex' }}>
                                    <Grid item gap={1} sx={{ width: mobile ? '100%' : '350px', cursor: dt.suspendido === 'Si' ? 'default' : 'pointer', display: 'flex', alignItems: 'center', fontSize: mobile ? '10px' : '16px', whiteSpace: 'nowrap' }}>
                                        {dt.name}
                                        {dt.tarjetas_acumuladas > 0 && (<Grid item sx={{ display: 'flex', alignItems: 'center' }}>{dt.tarjetas_acumuladas}<Tarjeta color={'var(--warnning)'} /></Grid>)}
                                        {dt.partidos_individual[currentRound] === 'Si' &&
                                            <Grid item sx={{ color: 'var(--check)' }}>{mobile ? '(Si)' : '(Convocado)'}</Grid>}
                                        {dt.partidos_individual[currentRound] === 'No' &&
                                            <Grid item sx={{ color: 'var(--neutral)' }}>{mobile ? '(No)' : '(No convocado)'}</Grid>}
                                        {dt.suspendido === 'Si' &&
                                            <Tooltip title={`${dt.name} fue expulsado y esta suspendido por ${dt.jornadas_suspendido} jornada`} placement="top">
                                                <Grid item sx={{ color: 'var(--neutral)' }}>{mobile ? <Susp /> : '(Expulsado)'}</Grid>
                                            </Tooltip>}
                                    </Grid>
                                </Grid>
                                <Grid item sx={{ cursor: dt.suspendido === 'Si' ? 'default' : 'pointer', color: dt.suspendido === 'Si' ? 'var(--neutral)' : dt.partidos_individual[currentRound] === 'Si' ? 'var(--check)' : 'var(--primario)' }}
                                    onClick={() => {
                                        dt.suspendido === 'Si' ? null :
                                            editarPartidoDT(data._id, dt._id, currentRound, dt.name, dt.partidos, dt.partidos_individual, setIsLoading, editarPartidosDTs, queryClient)
                                    }}>
                                    <Check size={mobile ? 15 : 20} />
                                </Grid>
                                {dt.partidos_individual[currentRound] === 'Si' &&
                                    <Grid sx={{ cursor: dt.suspendido === 'Si' ? 'default' : 'pointer', color: dt.suspendido === 'Si' ? 'var(--neutral)' : 'var(--danger)' }}
                                        onClick={() => {
                                            dt.suspendido === 'Si' ? null :
                                                bajarPartidoDT(data._id, dt._id, currentRound, dt.name, dt.partidos, dt.partidos_individual, setIsLoading, editarPartidosDTs, queryClient)
                                        }}>
                                        <Baja />
                                    </Grid>
                                }
                            </Grid>
                        )
                    })}
                    {filterInscrito(data?.jugadores).map((jugador, index) => {
                        console.log('data', jugador)
                        
                        return (
                            <Grid item gap={1} p={1} sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', color: light ? 'var(--dark2)' : 'var(--cero)', background: jugador.suspendido === 'Si' && 'var(--danger2)', borderRadius: '8px' }}>
                                <Grid item sx={{ fontSize: mobile ? '15px' : '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', width: mobile ? '20px' : '40px', fontWeight: 600 }}>#{jugador.dorsal}</Grid>
                                <Grid item container alignItems={'center'} justifyContent={'center'} sx={{ width: mobile ? '20px' : '35px', height: mobile ? '20px' : '35px' }}>
                                    <Tooltip title={jugador.foto ? <img src={jugador.foto} alt="Imagen" style={{ width: '150px', height: '150px' }} /> : <Avatar {...stringAvatar(jugador.name)} sx={{ width: '150px', height: '150px' }} />} arrow placement="top">
                                        <Avatar {...stringAvatar(jugador.name)} sx={{ width: mobile ? '20px' : '35px', height: mobile ? '20px' : '35px' }} />
                                    </Tooltip>
                                </Grid>
                                <Grid item sx={{ display: 'flex' }}>
                                    <Grid item gap={1} sx={{ width: mobile ? '100%' : '350px', cursor: jugador.suspendido === 'Si' ? 'default' : 'pointer', display: 'flex', alignItems: 'center', fontSize: mobile ? '10px' : '16px', whiteSpace: 'nowrap' }}>
                                        {jugador.name}
                                        {jugador.tarjetas_acumuladas > 0 && (<Grid item sx={{ display: 'flex', alignItems: 'center' }}>{jugador.tarjetas_acumuladas}<Tarjeta color={'var(--warnning)'} /></Grid>)}
                                        {jugador.partidos_individual[currentRound] === 'Si' &&
                                            <Grid item sx={{ color: 'var(--check)' }}>{mobile ? '(Si)' : '(Convocado)'}</Grid>}
                                        {jugador.partidos_individual[currentRound] === 'No' &&
                                            <Grid item sx={{ color: 'var(--neutral)' }}>{mobile ? '(No)' : '(No convocado)'}</Grid>}
                                        {jugador.suspendido === 'Si' &&
                                            <Tooltip title={`${jugador.name} fue expulsado y esta suspendido por ${jugador.jornadas_suspendido} jornada`} placement="top">
                                                <Grid item sx={{ color: 'var(--neutral)' }}>{mobile ? <Susp /> : '(Expulsado)'}</Grid>
                                            </Tooltip>}
                                        {jugador.lesion === 'Si' &&
                                            <Grid item sx={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                <Lesion size={mobile ? 15 : 20} />
                                                <Grid sx={{ color: 'var(--neutral)' }}>{mobile ? '(L)' : '(Lesion)'}</Grid>
                                            </Grid>}
                                    </Grid>
                                </Grid>
                                <Grid item sx={{ cursor: jugador.suspendido === 'Si' ? 'default' : 'pointer', color: jugador.suspendido === 'Si' ? 'var(--neutral)' : jugador.partidos_individual[currentRound] === 'Si' ? 'var(--check)' : 'var(--primario)' }}
                                    onClick={() => {
                                        jugador.suspendido === 'Si' ? null :
                                        editarPartido(data._id, jugador._id, currentRound, jugador.name, jugador.partidos, jugador.partidos_individual, setIsLoading, editarPartidos, queryClient)
                                    }}>
                                    <Check size={mobile ? 15 : 20} />
                                </Grid>
                                {jugador.partidos_individual[currentRound] === 'Si' &&
                                    <Grid sx={{ cursor: jugador.suspendido === 'Si' ? 'default' : 'pointer', color: jugador.suspendido === 'Si' ? 'var(--neutral)' : 'var(--danger)' }}
                                        onClick={() => {
                                            jugador.suspendido === 'Si' ? null :
                                            bajarPartido(data._id, jugador._id, currentRound, jugador.name, jugador.partidos, jugador.partidos_individual, setIsLoading, editarPartidos, queryClient)
                                        }}>
                                        <Baja />
                                    </Grid>
                                }
                            </Grid>
                        )
                    })}
                </DialogContent>
                {isLoading && (
                    <Grid sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: !mobile ? '100%' : '100%', backgroundColor: 'rgba(2, 2, 2, 0.488)', zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <CircularProgress style={{ color: light ? 'var(--dark2)' : 'var(--cero)' }} />
                    </Grid>
                )}
                <DialogActions sx={{ background: light ? 'var(--cero)' : 'var(--dark)' }}>
                    <Button onClick={handleClose} sx={{ color: 'var(--primario)' }}>Cancelar</Button>
                </DialogActions>
            </Dialog>
        </Grid>
    )
}