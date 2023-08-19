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
import { FaBusinessTime as Nego } from 'react-icons/fa';
import { formatoPesosArgentinos } from "../../../utils/utils";
import { ofertaDelete, ofertaPut } from "../../../service/jugadores";
import { BsCashCoin as Cash } from 'react-icons/bs';
import ContextRefac from "../../../context/contextLogin";
import { AiOutlineComment as Coment } from 'react-icons/ai';
import moment from "moment";
import { GiSoccerKick as Fut } from 'react-icons/gi';
import { editOfertaJugador, editOfertaNegociacion, eliminarOfertas } from "../../../utils/utilsPanelJugadores";
import { InputNumber } from "../../Material/InputNumber";
import { InputSelect } from "../../Material/InputSelect";
import { contratos } from "../../../utils/arrays";
import { InputTexArea } from "../../Material/InputTexArea";
import { equiposGet } from "../../../service/equipos";

export const ModalNegociar = ({ open, setOpen, equipoId, jugadorId, data }) => {
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });
    const [light] = useContext(Context);
    const [sueldo, setSueldo] = useState(null);
    const [contrato, setContrato] = useState('Seleccionar');
    const [precio, setPrecio] = useState(0);
    const [comentario, setComentario] = useState('');
    const [negociar, setNegociar] = useState(false);
    const queryClient = useQueryClient();
    const [isLoading, setIsLoading] = useState(false);
    const { mutate: editOferta } = useMutation(ofertaPut);
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
                    {'Negociar'}
                </DialogTitle>
                <DialogContent sx={{ background: light ? 'var(--cero)' : 'var(--dark)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <Grid item sx={{color: 'var(--neutral)'}}>{`Quieren negociar y estas son las peticiones :`}</Grid>
                    {filterEmail(data.oferta).map((ofert, index) => {
                    return(
                    <>
                    <Grid mb={-2} item sx={{color:light?'var(--dark)':'var(--cero)',fontSize:mobile?'10px':'14px'}}>{`Oferta recibida el ${moment(ofert.fecha_oferta).format('YYYY-MM-DD')}, a las ${moment(ofert.fecha_oferta).format('HH:mm:ss')}`}</Grid>
                    <Grid key={index} container sx={{ alignItems: 'center', gap: '14px', background: light?'var(--gris)':'var(--dark2)', padding:'10px', borderRadius:'8px' }}>
                        <Grid item sx={{display:'flex', flexDirection:'column', alignItems:'center',justifyContent:'center'}}>
                            <Grid item sx={{display:'flex',alignItems:'center',justifyContent:'center', height:mobile?'26px': '45px'}}>
                                <img src={ofert.logo} alt={ofert.equipo} style={{  height:mobile?'26px': '45px' }} />
                            </Grid>
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
                            <ButtonSend title={'Aceptar'} icon={Acept} disable={false} handle={() => {editOfertaJugador(equipoId,data._id,ofert._id,editOferta,queryClient,'Aceptar_oferta',setIsLoading,handleClose,'Se acepto la oferta')}} iconSize={20} iconColor={'var(--check)'} />
                            {ofert.tipo === 'compra' && <ButtonSend title={'Rechazar'} icon={Rechazar} disable={false} handle={() => {eliminarOfertas(equipoId,data._id,filterEmail(data?.oferta)[0]?._id,eliminarOfert,queryClient,setIsLoading,handleClose)}} iconSize={20} iconColor={'var(--danger)'} />}
                            {ofert.tipo === 'compra' && <ButtonSend title={'Negociar'} icon={Nego} disable={false} handle={() => {setNegociar(!negociar)}} iconSize={20} iconColor={'var(--warnning)'} />}
                        </Grid>
                        {negociar && 
                        <Grid item>
                            <Grid item gap={mobile?0:2} sx={{ display: 'flex', alignItems: 'center', flexDirection: mobile ? 'column' : 'row' }}>
                                <InputNumber disable={false} placeholder={'Oferta'} label={'Oferta'} setValue={setPrecio} value={precio}/>
                                <InputSelect disable={false} label={'Contrato'} value={contrato} setValue={setContrato} selectData={contratos} />
                            </Grid>
                            <Grid item gap={2} mb={1} sx={{ display: 'flex', alignItems: 'center', flexDirection: mobile ? 'column' : 'row' }}>
                                <InputTexArea label={'Comentario'} disable={false} placeholder={'Comentario'} value={comentario} setValue={setComentario}/>   
                            </Grid>
                            <ButtonSend title={'Negociar'} icon={Nego} disable={false} handle={() => {editOfertaNegociacion(equipoId,data._id,ofert._id,editOferta,queryClient,'Oferta_Enviada',setIsLoading,handleClose,'Se mando la negociacion de manera correcta',precio, contrato,comentario,user?.equipo,filterEstado()[0]?.logo)}} iconSize={20} iconColor={'var(--check)'} />
                        </Grid>}
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