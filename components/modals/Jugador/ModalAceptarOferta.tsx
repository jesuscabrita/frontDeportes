import { CircularProgress, Grid, useMediaQuery } from "@mui/material";
import { useContext, useState } from "react";
import Context from "../../../context/contextPrincipal";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useMutation, useQuery, useQueryClient } from "react-query";
import { BsFillCheckCircleFill as Acept } from "react-icons/bs";
import { TiDelete as Rechazar  } from "react-icons/ti";
import { ButtonSend } from "../../Material/ButtonSend";
import { BiExit as Salir } from 'react-icons/bi';
import { formatoPesosArgentinos } from "../../../utils/utils";
import { ficharJugador, ofertaDelete, prestamoJugador } from "../../../service/jugadores";
import { BsCashCoin as Cash } from 'react-icons/bs';
import ContextRefac from "../../../context/contextLogin";
import { AiOutlineComment as Coment } from 'react-icons/ai';
import { GiSoccerKick as Fut } from 'react-icons/gi';
import { eliminarOfertas, fichaDeJugador, prestamoDeJugador } from "../../../utils/utilsPanelJugadores";
import { equiposGet } from "../../../service/equipos";

export const ModalAceptarOferta = ({ open, setOpen, equipoId, jugadorId, data }) => {
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });
    const [light] = useContext(Context);
    const queryClient = useQueryClient();
    const [isLoading, setIsLoading] = useState(false);
    const { mutate: fichar } = useMutation(ficharJugador);
    const { mutate: prestar } = useMutation(prestamoJugador);
    const { mutate: eliminarOfert } = useMutation(ofertaDelete);
    const { state: { user } }: any = useContext(ContextRefac);
    const [equipo, setEquipo] = useState([]);

    const {  isError } = useQuery(["/api/liga"], equiposGet, {
        refetchOnWindowFocus: false,
        onSuccess: (data) => {
            setEquipo(data);
        },
    })

    const filterEstado = () => {
        const newFilter = equipo?.filter(data => data.correo == user?.email);
        return newFilter;
    }

    const filterEmail = (array)=>{
        const newFilter = array.filter(data => data.email == user?.email);
        return newFilter;
    }    

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Grid>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle sx={{ padding: '20px', color: light ? 'var(dark2)' : 'var(--cero)', background: light ? 'var(--cero)' : 'var(--dark)' }}>
                    {'Procesar oferta'}
                </DialogTitle>
                <DialogContent sx={{ background: light ? 'var(--cero)' : 'var(--dark)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <Grid item sx={{color: 'var(--neutral)'}}>{`En esta instancia ya solo falta procesar y verificar si cumples con los requisitos de la oferta y asi procesar los terminos del contrato.`}</Grid>
                    {filterEmail(data.oferta).map((ofert, index) => {
                    return(
                    <>
                    <Grid key={index} container sx={{ alignItems: 'center', gap: '14px', background: light?'var(--gris)':'var(--dark2)', padding:'10px', borderRadius:'8px' }}>
                        <Grid item sx={{display:'flex', flexDirection:'column', alignItems:'center',justifyContent:'center'}}>
                            <img src={ofert.logo} alt={ofert.equipo} style={{ width:mobile?'25px': '45px', height:mobile?'22px': '42px' }} />
                            <Grid item sx={{fontSize:mobile?'8px':'11px',whiteSpace: 'nowrap', color:light?'var(--dark)':'var(--gris)'}}>{ofert.equipo}</Grid>
                        </Grid>
                        <Grid item sx={{display:'flex', flexDirection:'column',gap:'2px'}}>
                            <Grid item sx={{display:'flex', flexDirection:'row', gap:'4px'}}>
                                <Grid item sx={{fontWeight:'700', color:light?'var(--dark)':'var(--cero)', fontSize:mobile?'10px':'14px'}}>Monto:</Grid>
                                <Grid item sx={{whiteSpace: 'nowrap', color:light ?'var(--dark2)':'var(--gris)',fontSize:mobile?'10px':'14px'}}>{ofert.tipo === 'prestamo'? '-' : formatoPesosArgentinos(ofert.precio)}</Grid>
                            </Grid>
                            <Grid item sx={{display:'flex', flexDirection:'row', gap:'4px'}}>
                                <Grid item sx={{fontWeight:'700',color:light?'var(--dark)':'var(--cero)',fontSize:mobile?'10px':'14px'}}>Sueldo:</Grid>
                                <Grid item sx={{whiteSpace: 'nowrap',color:light ?'var(--dark2)':'var(--gris)',fontSize:mobile?'10px':'14px'}}>{formatoPesosArgentinos(ofert.sueldo)}</Grid>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Grid item sx={{fontWeight:'700',color:light?'var(--dark)':'var(--cero)',fontSize:mobile?'10px':'14px'}}>Contrato</Grid>
                            <Grid item>
                            {ofert.contrato === 0.5 && 
                                    <Grid item sx={{whiteSpace: 'nowrap', fontSize:mobile?'10px':'14px', color:'var(--danger)'}}>
                                    Media Temporada
                                </Grid>}
                                {ofert.contrato === 1 && 
                                    <Grid item sx={{whiteSpace: 'nowrap', fontSize:mobile?'10px':'14px', color:'var(--warnning)'}}>
                                    1 Temporada
                                </Grid>}
                                {ofert.contrato >= 2 && 
                                    <Grid item sx={{whiteSpace: 'nowrap', fontSize:mobile?'10px':'14px', color:'var(--check)'}}>
                                    {`${ofert.contrato} Temporadas`}
                                </Grid>}
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Grid item sx={{fontWeight:'700',color:light?'var(--dark)':'var(--cero)',fontSize:mobile?'10px':'14px'}}>Tipo</Grid>
                            {ofert.tipo === 'compra' && <Grid item sx={{whiteSpace: 'nowrap',color:light ?'var(--dark2)':'var(--gris)',fontSize:mobile?'10px':'14px', display:'flex', alignItems:'center', gap:'4px'}}>{ofert.tipo} <Cash color={'var(--check)'}/></Grid>}
                            {ofert.tipo === 'prestamo' && <Grid item sx={{whiteSpace: 'nowrap',color:light ?'var(--dark2)':'var(--gris)',fontSize:mobile?'10px':'14px', display:'flex', alignItems:'center', gap:'4px'}}>{ofert.tipo} <Fut color={'var(--warnning)'}/></Grid>}
                        </Grid>
                        <Grid item>
                            <Grid item sx={{fontWeight:'700',color:light?'var(--dark)':'var(--cero)',fontSize:mobile?'10px':'14px',display:'flex', alignItems:'center', gap:'4px'}}>Comentario <Coment/></Grid>
                            <Grid item sx={{whiteSpace: 'nowrap',color:light ?'var(--dark2)':'var(--gris)',fontSize:mobile?'10px':'14px', display:'flex', alignItems:'center', gap:'4px'}}>{!ofert.comentario ?'Sin comentarios': ofert.comentario}</Grid>
                        </Grid>
                        <Grid item container sx={{gap:'8px'}}>
                            {ofert.tipo === 'compra'&& <ButtonSend title={'Procesar.F'} icon={Acept} disable={false} handle={() => {fichaDeJugador(equipoId,filterEstado()[0]?._id,data._id,fichar,queryClient,setIsLoading,handleClose,filterEmail(data.oferta)[0]?.precio,filterEstado()[0]?.banco_fondo,filterEmail(data.oferta)[0]?.sueldo,filterEmail(data.oferta)[0]?.contrato)}} iconSize={20} iconColor={'var(--check)'} />}
                            {ofert.tipo === 'prestamo'&& <ButtonSend title={'Procesar.P'} icon={Acept} disable={false} handle={() => {prestamoDeJugador(equipoId,filterEstado()[0]?._id,data._id,prestar,queryClient,setIsLoading,handleClose)}} iconSize={20} iconColor={'var(--check)'} />}
                            {ofert.tipo === 'compra'&& <ButtonSend title={'Cancelar fichaje'} icon={Rechazar} disable={false} handle={() => {eliminarOfertas(equipoId,data._id,filterEmail(data?.oferta)[0]?._id,eliminarOfert,queryClient,setIsLoading,handleClose)}} iconSize={20} iconColor={'var(--danger)'} />}
                            {ofert.tipo === 'prestamo'&& <ButtonSend title={'Cancelar prestamo'} icon={Rechazar} disable={false} handle={() => {eliminarOfertas(equipoId,data._id,filterEmail(data?.oferta)[0]?._id,eliminarOfert,queryClient,setIsLoading,handleClose)}} iconSize={20} iconColor={'var(--danger)'} />}
                        </Grid>
                    </Grid>
                    </>)
                    })}
                </DialogContent>
                {isLoading && (
                    <Grid sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: !mobile ? '100%' : '100%', backgroundColor: 'rgba(2, 2, 2, 0.488)', zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <CircularProgress style={{ color: light ? 'var(--dark2)' : 'var(--cero)' }} />
                    </Grid>
                )}
                <DialogActions sx={{ background: light ? 'var(--cero)' : 'var(--dark)' }}>
                    <ButtonSend disable={false} handle={handleClose} title={'Cancelar'} icon={Salir} iconColor={''} iconSize={20} />
                </DialogActions>
            </Dialog>
        </Grid>
    )
}