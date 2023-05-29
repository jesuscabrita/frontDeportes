import { Button, CircularProgress, Grid, Tooltip, useMediaQuery } from "@mui/material";
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

export const ModalLista =({open, setOpen, data, currentRound })=>{
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });
    const [light] = useContext(Context);
    const queryClient = useQueryClient();
    const [isLoading, setIsLoading] = useState(false); 
    const { mutate: editarPartidos } = useMutation(jugadoresPut_partidos);
    const [showImage, setShowImage] = useState(false);

    useEffect(() => {
        if (!isLoading) {
            const timeoutId = setTimeout(() => {
                setShowImage(true);
            }, 2000);
            return () => clearTimeout(timeoutId);
        }
    }, [isLoading]);

    const handleClose = () => {
        setOpen(false);
    };

    return(
        <Grid>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle sx={{ padding: '20px', color: light ? 'var(dark2)' : 'var(--cero)', background: light ? 'var(--cero)' : 'var(--dark)' }}>
                    {"Lista Convocados"}
                </DialogTitle>
                <DialogContent sx={{ background: light ? 'var(--cero)' : 'var(--dark)', display:'flex', flexDirection:'column', gap:'20px' }}>
                    {data?.jugadores.map((jugador, index) =>{
                        return(
                            <Grid item container p={1} flexDirection={'row'} alignItems={'center'} sx={{color: light ?'var(--dark2)':'var(--cero)', background: jugador.suspendido === 'Si' && 'var(--danger2)', borderRadius:'8px'}}>
                                <Grid item sx={{ fontSize: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', fontWeight: 600 }}>#{jugador.dorsal}</Grid>
                                <Grid item container alignItems={'center'} justifyContent={'center'} sx={{ width: '55px', height: '35px' }}>
                                    {isLoading || !showImage ?
                                        (<CircularProgress style={{ color: light ? 'var(--dark2)' : 'var(--cero)' }} size={20} />)
                                        : showImage ? <img style={{ height: '30px' }} src={jugador?.foto} alt={'.'} />
                                            : null}
                                </Grid>
                                <Grid item sx={{display:'flex'}}>
                                    <Grid item width={'350px'} gap={1} sx={{ cursor: 'pointer',display:'flex' }}>
                                        {jugador.name} 
                                        {jugador.partidos_individual[currentRound] === 'Si'&&
                                        <Grid item sx={{color:'var(--check)'}}>(Convocado)</Grid>}
                                        {jugador.partidos_individual[currentRound] === 'No'&&
                                        <Grid item sx={{color:'var(--neutral)'}}>(No convocado)</Grid>}
                                        {jugador.suspendido === 'Si'&&
                                        <Tooltip title={`${jugador.name} fue expulsado y esta suspendido por ${jugador.jornadas_suspendido} jornada`} placement="top">
                                            <Grid item sx={{color:'var(--neutral)'}}>(Expulsado)</Grid>
                                        </Tooltip>}
                                    </Grid>
                                </Grid>
                                <Grid item sx={{cursor: 'pointer', color:jugador.partidos_individual[currentRound] === 'Si'? 'var(--check)':'var(--neutral)'}}
                                onClick={()=>{editarPartido(
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
                                    <Button onClick={()=>{bajarPartido(
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