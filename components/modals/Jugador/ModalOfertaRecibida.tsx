import { Button, CircularProgress, Grid, useMediaQuery } from "@mui/material";
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
import { FaBusinessTime as Nego } from 'react-icons/fa';
import { formatoPesosArgentinos } from "../../../utils/utils";
import { ofertaPost } from "../../../service/jugadores";
import { BsCashCoin as Cash } from 'react-icons/bs';
import ContextRefac from "../../../context/contextLogin";
import { AiOutlineComment as Coment } from 'react-icons/ai';
import moment from "moment";
import { GiSoccerKick as Fut } from 'react-icons/gi';

export const ModalOfertaRecibida = ({ open, setOpen, equipoId, jugadorId, data }) => {
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });
    const [light] = useContext(Context);
    const [sueldo, setSueldo] = useState(null);
    const [contrato, setContrato] = useState('Seleccionar');
    const [precio, setPrecio] = useState('');
    const queryClient = useQueryClient();
    const [isLoading, setIsLoading] = useState(false);
    const { mutate: oferta } = useMutation(ofertaPost);
    const { state: { user } }: any = useContext(ContextRefac);
    const [equipo, setEquipo] = useState([]);

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Grid>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle sx={{ padding: '20px', color: light ? 'var(dark2)' : 'var(--cero)', background: light ? 'var(--cero)' : 'var(--dark)' }}>
                    {data.oferta.length === 1 && `Oferta Recibida`}
                    {data.oferta.length > 1 && `Ofertas Recibidas`}
                </DialogTitle>
                <DialogContent sx={{ background: light ? 'var(--cero)' : 'var(--dark)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {data.transferible === 'No' && <Grid item sx={{color: 'var(--neutral)'}}>{`Recibiste una oferta para ${data.name}, el jugador no esta en venta pero puedes revisar por si ofrece el monto de la clausula o mas, quizas sea de tu interes o no`}</Grid>}
                    {data.transferible === 'Si' && <Grid item sx={{color: 'var(--neutral)'}}>{`Recibiste una oferta para  ${data.name}, el jugador esta en venta, podes tomar en cuenta la propuesta`}</Grid>}
                    {data.oferta.map((ofert, index) => (
                    <>
                    <Grid mb={-2} item sx={{color:light?'var(--dark)':'var(--cero)',fontSize:mobile?'10px':'14px'}}>{`Oferta recibida el ${moment(ofert.fecha_oferta).format('YYYY-MM-DD')}, a las ${moment(ofert.fecha_oferta).format('HH:mm:ss')}`}</Grid>
                    <Grid key={index} container sx={{ alignItems: 'center', gap: '14px', background: light?'var(--gris)':'var(--dark2)', padding:'10px', borderRadius:'8px' }}>
                        <Grid item sx={{display:'flex', flexDirection:'column', alignItems:'center',justifyContent:'center'}}>
                            <img src={ofert.logo} alt={ofert.equipo} style={{ width:mobile?'20px': '40px', height:mobile?'22px': '42px' }} />
                            <Grid item sx={{fontSize:mobile?'8px':'11px',whiteSpace: 'nowrap', color:light?'var(--dark)':'var(--gris)'}}>{ofert.equipo}</Grid>
                        </Grid>
                        <Grid item sx={{display:'flex', flexDirection:'column',gap:'2px'}}>
                            <Grid item sx={{display:'flex', flexDirection:'row', gap:'4px'}}>
                                <Grid item sx={{fontWeight:'700', color:light?'var(--dark)':'var(--cero)', fontSize:mobile?'10px':'14px'}}>Monto:</Grid>
                                <Grid item sx={{whiteSpace: 'nowrap', color:light ?'var(--dark2)':'var(--gris)',fontSize:mobile?'10px':'14px'}}>{ofert.tipo === 'prestamo'? '-' : formatoPesosArgentinos(ofert.precio)}</Grid>
                            </Grid>
                            <Grid item sx={{display:'flex', flexDirection:'row', gap:'4px'}}>
                                <Grid item sx={{fontWeight:'700',color:light?'var(--dark)':'var(--cero)',fontSize:mobile?'10px':'14px'}}>Sueldo:</Grid>
                                <Grid item sx={{whiteSpace: 'nowrap',color:light ?'var(--dark2)':'var(--gris)',fontSize:mobile?'10px':'14px'}}>{ofert.tipo === 'prestamo'? '-' : formatoPesosArgentinos(ofert.sueldo)}</Grid>
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
                            <ButtonSend title={'Aceptar'} icon={Acept} disable={false} handle={() => {null}} iconSize={20} iconColor={'var(--check)'} />
                            <ButtonSend title={'Rechazar'} icon={Rechazar} disable={false} handle={() => {null}} iconSize={20} iconColor={'var(--danger)'} />
                            <ButtonSend title={'Negociar'} icon={Nego} disable={false} handle={() => {null}} iconSize={20} iconColor={'var(--warnning)'} />
                        </Grid>
                    </Grid>
                    </>
                    ))}
                </DialogContent>
                {isLoading && (
                    <Grid sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: !mobile ? '100%' : '100%', backgroundColor: 'rgba(2, 2, 2, 0.488)', zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <CircularProgress style={{ color: light ? 'var(--dark2)' : 'var(--cero)' }} />
                    </Grid>
                )}
                <DialogActions sx={{ background: light ? 'var(--cero)' : 'var(--dark)' }}>
                    <ButtonSend disable={false} handle={handleClose} title={'Cancelar'} icon={Salir} iconColor={''} iconSize={20} />
                    {/* <ButtonSend disable={false} handle={() => { null}} title={'Negociar'} icon={Cash} iconColor={'var(--check)'} iconSize={20} /> */}
                </DialogActions>
            </Dialog>
        </Grid>
    )
}