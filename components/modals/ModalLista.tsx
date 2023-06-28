import { Avatar, Button, CircularProgress, Grid, Tooltip, useMediaQuery } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import Context from "../../context/contextPrincipal";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { BsFillPatchCheckFill as Check } from "react-icons/bs";
import { useMutation, useQueryClient } from "react-query";
import moment from "moment";
import { jugadoresPut_partidos } from "../../service/jugadores";
import { editarPartido } from "../../utils/utilsPanelJugadores";
import { bajarPartido } from "../../utils/utilsPanelAnular";
import { TbRectangleVertical as Tarjeta } from 'react-icons/tb';
import { DTPut_partidos } from "../../service/dt";
import { bajarPartidoDT, editarPartidoDT } from "../../utils/utilsDT";
import { MdLocalHospital as Lesion } from 'react-icons/md';

export const ModalLista =({open, setOpen, data, currentRound })=>{
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
            },1000);
            return () => clearTimeout(timeoutId);
        }
    }, [isLoading]);

    const handleClose = () => {
        setOpen(false);
    };

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

    return(
        <Grid>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle sx={{ padding: '20px', color: light ? 'var(dark2)' : 'var(--cero)', background: light ? 'var(--cero)' : 'var(--dark)' }}>
                    {"Lista Convocados"}
                </DialogTitle>
                <DialogContent sx={{ background: light ? 'var(--cero)' : 'var(--dark)', display:'flex', flexDirection:'column', gap:'20px' }}>
                {data?.director_tecnico.map((dt, index) =>{
                    return(
                        <Grid item container p={1} flexDirection={'row'} alignItems={'center'} sx={{color: light ?'var(--dark2)':'var(--cero)', background: dt.suspendido === 'Si' && 'var(--danger2)', borderRadius:'8px'}}>
                            <Grid item sx={{ fontSize: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', fontWeight: 600 }}>..DT</Grid>
                            <Grid item container alignItems={'center'} justifyContent={'center'} sx={{ width: '55px', height: '35px' }}>
                                <Tooltip title={dt.foto ? <img src={dt.foto} alt="Imagen" style={{ width: '150px', height: '150px' }} /> : <Avatar src="/broken-image.jpg" sx={{ width: '150px', height: '150px' }} />} arrow placement="top">
                                    <Avatar src="/broken-image.jpg" sx={{ width: '35px', height: '35px' }} />
                                </Tooltip>
                            </Grid>
                            <Grid item sx={{display:'flex'}}>
                                <Grid item width={'350px'} gap={1} sx={{ cursor:dt.suspendido === 'Si'? 'default': 'pointer',display:'flex', alignItems:'center' }}>
                                    {dt.name} 
                                    {dt.tarjetas_acumuladas > 0 && ( <Grid item sx={{display:'flex', alignItems:'center'}}>{dt.tarjetas_acumuladas}<Tarjeta color={'var(--warnning)'} /></Grid>)}
                                    {dt.partidos_individual[currentRound] === 'Si'&&
                                    <Grid item sx={{color:'var(--check)'}}>(Convocado)</Grid>}
                                    {dt.partidos_individual[currentRound] === 'No'&&
                                    <Grid item sx={{color:'var(--neutral)'}}>(No convocado)</Grid>}
                                    {dt.suspendido === 'Si'&&
                                    <Tooltip title={`${dt.name} fue expulsado y esta suspendido por ${dt.jornadas_suspendido} jornada`} placement="top">
                                        <Grid item sx={{color:'var(--neutral)'}}>(Expulsado)</Grid>
                                    </Tooltip>}
                                </Grid>
                            </Grid>
                            <Grid item sx={{cursor: dt.suspendido === 'Si'? 'default': 'pointer', color:dt.partidos_individual[currentRound] === 'Si'? 'var(--check)':'var(--neutral)'}}
                            onClick={()=>{dt.suspendido === 'Si' ? null : 
                                editarPartidoDT(
                                data._id,
                                dt._id,
                                currentRound,
                                dt.name,
                                dt.partidos,
                                dt.partidos_individual,
                                setIsLoading,
                                editarPartidosDTs,
                                queryClient
                                )
                            }}
                            >
                                <Check size={20}/>
                            </Grid>
                            {dt.partidos_individual[currentRound] === 'Si'&&
                                <Button 
                                disabled={dt.suspendido === 'Si'}
                                sx={{color:'var(--danger)'}}
                                onClick={()=>{bajarPartidoDT(
                                    data._id,
                                    dt._id,
                                    currentRound,
                                    dt.name,
                                    dt.partidos,
                                    dt.partidos_individual,
                                    setIsLoading,
                                    editarPartidosDTs,
                                    queryClient
                                )}}>
                                    Bajar
                                </Button>
                            }
                        </Grid>
                        )
                    })}
                    {data?.jugadores.map((jugador, index) =>{
                        return(
                            <Grid item container p={1} flexDirection={'row'} alignItems={'center'} sx={{color: light ?'var(--dark2)':'var(--cero)', background: jugador.suspendido === 'Si' && 'var(--danger2)', borderRadius:'8px'}}>
                                <Grid item sx={{ fontSize: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', fontWeight: 600 }}>#{jugador.dorsal}</Grid>
                                <Grid item container alignItems={'center'} justifyContent={'center'} sx={{ width: '55px', height: '35px' }}>
                                    <Tooltip title={jugador.foto ? <img src={jugador.foto} alt="Imagen" style={{ width: '150px', height: '150px' }} /> : <Avatar {...stringAvatar(jugador.name)} sx={{  width: '150px', height: '150px' }} />} arrow placement="top">
                                        <Avatar {...stringAvatar(jugador.name)} sx={{ height: '35px', width:'35px' }} />
                                    </Tooltip>
                                </Grid>
                                <Grid item sx={{display:'flex'}}>
                                    <Grid item width={'350px'} gap={1} sx={{ cursor:jugador.suspendido === 'Si'? 'default': 'pointer',display:'flex', alignItems:'center' }}>
                                        {jugador.name} 
                                        {jugador.tarjetas_acumuladas > 0 && ( <Grid item sx={{display:'flex', alignItems:'center'}}>{jugador.tarjetas_acumuladas}<Tarjeta color={'var(--warnning)'} /></Grid>)}
                                        {jugador.partidos_individual[currentRound] === 'Si'&&
                                        <Grid item sx={{color:'var(--check)'}}>(Convocado)</Grid>}
                                        {jugador.partidos_individual[currentRound] === 'No'&&
                                        <Grid item sx={{color:'var(--neutral)'}}>(No convocado)</Grid>}
                                        {jugador.suspendido === 'Si'&&
                                        <Tooltip title={`${jugador.name} fue expulsado y esta suspendido por ${jugador.jornadas_suspendido} jornada`} placement="top">
                                            <Grid item sx={{color:'var(--neutral)'}}>(Expulsado)</Grid>
                                        </Tooltip>}
                                        {jugador.lesion === 'Si' &&  
                                        <Grid item sx={{display:'flex', alignItems:'center',gap:'6px'}}>
                                            <Lesion size={20}/>
                                            <Grid sx={{color:'var(--neutral)'}}>{'(Lesion)'}</Grid>
                                        </Grid>}
                                    </Grid>
                                </Grid>
                                <Grid item sx={{cursor: jugador.suspendido === 'Si'? 'default': 'pointer', color:jugador.partidos_individual[currentRound] === 'Si'? 'var(--check)':'var(--neutral)'}}
                                onClick={()=>{jugador.suspendido === 'Si' ? null :
                                    editarPartido(
                                    data._id,
                                    jugador._id,
                                    currentRound,
                                    jugador.name,
                                    jugador.partidos,
                                    jugador.partidos_individual,
                                    setIsLoading,
                                    editarPartidos,
                                    queryClient
                                )}}
                                >
                                    <Check size={20}/>
                                </Grid>
                                {jugador.partidos_individual[currentRound] === 'Si'&&
                                    <Button 
                                    disabled={jugador.suspendido === 'Si'}
                                    sx={{color:'var(--danger)'}}
                                    onClick={()=>{bajarPartido(
                                        data._id,
                                        jugador._id,
                                        currentRound,
                                        jugador.name,
                                        jugador.partidos,
                                        jugador.partidos_individual,
                                        setIsLoading,
                                        editarPartidos,
                                        queryClient
                                    )}}>
                                        Bajar
                                    </Button>
                                }
                            </Grid>
                        )
                    })}
                </DialogContent>
                {isLoading && ( 
                <Grid sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: !mobile ? '100%' : '100%', backgroundColor: 'rgba(2, 2, 2, 0.488)', zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <CircularProgress style={{color:light ? 'var(--dark2)': 'var(--cero)'}} />
                </Grid>
                )}
                <DialogActions sx={{ background: light ? 'var(--cero)' : 'var(--dark)' }}>
                    <Button onClick={handleClose} sx={{ color: 'var(--primario)' }}>Cancelar</Button>
                </DialogActions>
            </Dialog>
        </Grid>
    )
}