import { Avatar, CircularProgress, Grid, useMediaQuery } from "@mui/material";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useContext, useEffect, useState } from "react";
import Context from "../../context/contextPrincipal";
import { TbMoodEmpty as Vacio } from 'react-icons/tb';
import { StyledTableCell } from "../Material/StyledTableCell";
import { StyledTableRow } from "../Material/StyledTableRow";
import { stringAvatar, seleccionarData, filterLibreJugador, formatoPesosArgentinos  } from "../../utils/utils";
import { ModalJugadorInfo } from "../modals/Jugador/ModalInfoJugador";
import { IoLogoClosedCaptioning as Capitan } from 'react-icons/io';
import { MdSell as ListaTransf } from 'react-icons/md';
import { ButtonSend } from "../Material/ButtonSend";
import { BsCashCoin as Cash } from 'react-icons/bs';
import { MdOutlineAssignmentReturn as Prestamo } from 'react-icons/md';
import { ModalOferta } from "../modals/Jugador/ModalOferta";
import ContextRefac from "../../context/contextLogin";
import { FaBusinessTime as Nego } from 'react-icons/fa';
import { TiDelete as Dele } from 'react-icons/ti';
import { ModalPrestamo } from "../modals/Jugador/ModalPrestamo";
import { useMutation, useQueryClient } from "react-query";
import { ofertaDelete } from "../../service/jugadores";
import { eliminarOfertas } from '../../utils/utilsPanelJugadores';
import { MdQuestionAnswer as Resp } from 'react-icons/md';
import { ModalNegociar } from "../modals/Jugador/ModalNegociar";
import { ImUserCheck as Acept } from 'react-icons/im';
import { ModalAceptarOferta } from "../modals/Jugador/ModalAceptarOferta";

export const TablaFichajes =({jugadores, isLoading, equipoId,data })=>{
    const [light] = useContext(Context);
    const { state: { user } }: any = useContext(ContextRefac);
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });
    const [modalJugadorInfo, setModalJugadorInfo] = useState(false);
    const [modalOferta, setModalOferta] = useState(false);
    const [modalPrestamo, setModalPrestamo] = useState(false);
    const [modalNegociar, setModalNegociar] = useState(false);
    const [modalAceptarOferta, setModalAceptarOferta] = useState(false);
    const [jugadorSeleccionado, setJugadorSeleccionado] = useState(null);
    const [isUserAdmin, setIsUserAdmin] = useState(false);
    const { mutate: eliminarOfert } = useMutation(ofertaDelete);
    const queryClient = useQueryClient();
    const [isLoadinng, setIsLoadinng] = useState(false);

    useEffect(() => {
        setIsUserAdmin(user?.role === 'super_admin' || user?.role === 'admin');
    }, [user]);

    const filterEmail = (array)=>{
        const newFilter = array.filter(data => data.email == user?.email);
        return newFilter;
    }

    const handleClose =()=>{
        false
    }

    return(
        <>
        {isLoading ? 
        <Grid mt={8} item sx={{ 
            display: 'flex', 
            flexDirection: 'row', 
            gap: '16px',
            minWidth:!mobile? '960px':'100%',
            height:mobile &&'300px', 
            justifyContent:'center',
            color:light ? 'var(--dark2)': 'var(--cero)'
            }}>
            <CircularProgress style={{color:light ? 'var(--dark2)': 'var(--cero)'}} />
        </Grid>
        : jugadores.length === 0 ?
        <Grid mt={8} item sx={{ 
            display: 'flex', 
            flexDirection: 'row', 
            gap: '16px',
            minWidth:!mobile? '960px':'100%',
            height:mobile &&'300px', 
            justifyContent:'center',
            color:light ? 'var(--dark2)': 'var(--cero)'
            }}>
            No hay jugadores en este equipo <Vacio size={25} />
        </Grid>
        :
        <Grid mt={2}>
            <TableContainer component={Paper} >
            <Table  aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell light={light}><Grid item sx={{ whiteSpace: 'nowrap'}}>Detalle</Grid></StyledTableCell>
                        <StyledTableCell light={light}><Grid item sx={{ whiteSpace: 'nowrap'}}>Jugador</Grid></StyledTableCell>
                        <StyledTableCell light={light}><Grid item sx={{ whiteSpace: 'nowrap'}}>Sueldo</Grid></StyledTableCell>
                        <StyledTableCell light={light}><Grid item sx={{ whiteSpace: 'nowrap'}}>Valor mercado</Grid></StyledTableCell>
                        <StyledTableCell light={light}><Grid item sx={{ whiteSpace: 'nowrap'}}>Clausula</Grid></StyledTableCell>
                        <StyledTableCell light={light}/>
                        <StyledTableCell light={light}/>
                    </TableRow>
                </TableHead>
                <TableBody style={{background:light ? 'var(--cero)':'var(--dark3)'}}>
                {filterLibreJugador(jugadores, 'No').map((jugador, index)=>{
                    return(
                        <StyledTableRow light={light} key={jugador.id} style={{background: jugador.suspendido === 'Si' && 'var(--danger2)'}}>
                            <StyledTableCell light={light} component="th" scope="row">
                                <Grid container alignItems={'center'} gap={2} sx={{whiteSpace: 'nowrap', width:'70px'}}>
                                    <Grid>{index + 1}</Grid>
                                    {(jugador.posicion == 'Portero') &&
                                        <Grid sx={{ color: 'var(--warnning)',fontWeight:700,fontSize:'17px'}}>POR</Grid>}
                                    {(jugador.posicion == 'Defensa') &&
                                    <Grid sx={{ color: 'var(--gris)',fontWeight:700,fontSize:'17px'  }}>DEF</Grid>}
                                    {(jugador.posicion == 'Medio') &&
                                    <Grid sx={{ color: 'var(--check)',fontWeight:700,fontSize:'17px'  }}>MED</Grid>}
                                    {(jugador.posicion == 'Delantero') &&
                                    <Grid sx={{ color: 'var(--primario)',fontWeight:700,fontSize:'17px'  }}>DEL</Grid>}
                                </Grid>    
                            </StyledTableCell>
                            <StyledTableCell light={light} align="right" style={{whiteSpace: 'nowrap'}}>
                                <Grid sx={{ display: 'flex', alignItems: 'center', whiteSpace: 'nowrap', gap: '18px',cursor: 'pointer' }}  onClick={()=>{seleccionarData(jugador,setJugadorSeleccionado, setModalJugadorInfo)}}>
                                    <Avatar {...stringAvatar(jugador.name)} sx={{ height: '35px', width: '35px' }} />
                                    <Grid sx={{ whiteSpace: 'nowrap', paddingRight: mobile && '30px', display:'flex', alignItems:'center',gap:'6px' }}>
                                        {jugador.name}
                                        {jugador.capitan === 'Si' &&
                                        <Grid item sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                            <Grid item sx={{ color: light ? 'var(--dark2)' : 'var(--cero)', border: light ? 'solid 1px var(--dark2)' : 'solid 1px var(--cero)', height: '20px', width: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                <Capitan size={20} />
                                            </Grid>
                                        </Grid>}
                                        {jugador.transferible === 'Si' && <ListaTransf size={20} color={'var(--warnning)'}/>}
                                    </Grid>
                                </Grid>
                            </StyledTableCell>
                            <StyledTableCell light={light} align="left">
                                <Grid item sx={{whiteSpace: 'nowrap', fontSize:'16px'}}>{formatoPesosArgentinos(jugador.sueldo)}</Grid>
                            </StyledTableCell>
                            <StyledTableCell light={light} align="left">
                                <Grid item sx={{whiteSpace: 'nowrap', fontSize:'16px'}}>{formatoPesosArgentinos(jugador.valor_mercado)}</Grid>
                            </StyledTableCell>
                            <StyledTableCell light={light} align="left">
                                <Grid item sx={{whiteSpace: 'nowrap', fontSize:'16px'}}>{formatoPesosArgentinos(jugador.clausula)}</Grid>
                            </StyledTableCell>
                            <StyledTableCell light={light} align="left" style={{fontWeight: index === 0 ? 700: 500,fontSize: index === 0 ?'18px': '15px'}}>
                                {(jugador?.oferta?.length > 0 && user?.email === filterEmail(jugador?.oferta)[0]?.email) && filterEmail(jugador?.oferta)[0]?.respuesta === 'Aceptar_oferta' && <Grid item sx={{whiteSpace: 'nowrap', fontSize:'16px',display:'flex', flexDirection:'column', alignItems:'center',cursor:'pointer'}} onClick={()=>{seleccionarData(jugador,setJugadorSeleccionado,setModalAceptarOferta)}}><Acept size={25} color={'var(--check)'}/><Grid item sx={{fontSize:'8px'}}>{'Oferta aceptada'}</Grid></Grid>}
                                {(jugador?.oferta?.length > 0 && user?.email === filterEmail(jugador?.oferta)[0]?.email) && filterEmail(jugador?.oferta)[0]?.respuesta === 'Negociar_oferta' && <Grid item sx={{whiteSpace: 'nowrap', fontSize:'16px',display:'flex', flexDirection:'column', alignItems:'center', cursor:'pointer'}} onClick={()=>{seleccionarData(jugador,setJugadorSeleccionado,setModalNegociar)}}><Resp size={25} color={''}/><Grid item sx={{fontSize:'8px'}}>{'Quieren Negociar'}</Grid></Grid>}
                                {(jugador?.oferta?.length > 0 && user?.email === filterEmail(jugador?.oferta)[0]?.email) && filterEmail(jugador?.oferta)[0]?.respuesta === 'Oferta_Enviada' && <Grid item sx={{whiteSpace: 'nowrap', fontSize:'16px',display:'flex', flexDirection:'column', alignItems:'center'}}><Nego size={25} color={''}/><Grid item sx={{fontSize:'8px'}}>{'Esperano...'}</Grid></Grid>}
                                {(jugador?.oferta?.length > 0 && user?.email === filterEmail(jugador?.oferta)[0]?.email) && filterEmail(jugador?.oferta)[0]?.respuesta === 'Rechazar_oferta' && <Grid item sx={{whiteSpace: 'nowrap', fontSize:'16px', display:'flex', flexDirection:'column', alignItems:'center', cursor:'pointer'}} onClick={()=>{eliminarOfertas(equipoId,jugador?._id,filterEmail(jugador?.oferta)[0]?._id,eliminarOfert,queryClient, setIsLoadinng,handleClose)}}><Dele size={30} color={'var(--danger)'}/><Grid item sx={{fontSize:'8px'}}>{'Oferta Rechazada'}</Grid></Grid>}  
                                {!(jugador?.oferta?.length > 0 && user?.email === filterEmail(jugador?.oferta)[0]?.email ) && (jugador?.oferta?.length === 0 || jugador?.oferta?.length >=1) && (!filterEmail(jugador?.oferta)[0]?.respuesta || filterEmail(jugador?.oferta)[0]?.respuesta === 'Oferta_Enviada') && <ButtonSend title={'Compra'} icon={Cash} disable={(user?.email === data?.correo) || (filterEmail(jugador?.oferta)[0]?.respuesta === 'Prestamo_Enviada')} handle={() => {seleccionarData(jugador,setJugadorSeleccionado, setModalOferta)}} iconSize={20} iconColor={'var(--check)'} />}
                                {(jugador?.oferta?.length > 0 && user?.email === filterEmail(jugador?.oferta)[0]?.email ) && (filterEmail(jugador?.oferta)[0]?.respuesta === 'Prestamo_Enviada' || filterEmail(jugador?.oferta)[0]?.respuesta === 'Rechazar_prestamo' || filterEmail(jugador?.oferta)[0]?.respuesta === 'Aceptar_prestamo') && <ButtonSend title={'Compra'} icon={Cash} disable={(user?.email === data?.correo) || (filterEmail(jugador?.oferta)[0]?.respuesta === 'Prestamo_Enviada') || (filterEmail(jugador?.oferta)[0]?.respuesta === 'Rechazar_prestamo') || (filterEmail(jugador?.oferta)[0]?.respuesta === 'Aceptar_prestamo')} handle={() => {seleccionarData(jugador,setJugadorSeleccionado, setModalOferta)}} iconSize={20} iconColor={'var(--check)'} />}
                            </StyledTableCell>
                            <StyledTableCell light={light} align="left" style={{fontWeight: index === 0 ? 700: 500,fontSize: index === 0 ?'18px': '15px'}}>
                                {(jugador?.oferta?.length > 0 && user?.email === filterEmail(jugador?.oferta)[0]?.email) && (filterEmail(jugador?.oferta)[0]?.respuesta === 'Aceptar_prestamo') && <Grid item sx={{whiteSpace: 'nowrap', fontSize:'16px',display:'flex', flexDirection:'column', alignItems:'center', cursor:'pointer'}}><Acept size={25} color={'var(--check)'}/><Grid item sx={{fontSize:'8px'}}>{'Prestamo aceptado'}</Grid></Grid>} 
                                {(jugador?.oferta?.length > 0 && user?.email === filterEmail(jugador?.oferta)[0]?.email) && (filterEmail(jugador?.oferta)[0]?.respuesta === 'Prestamo_Enviada') && <Grid item sx={{whiteSpace: 'nowrap', fontSize:'16px',display:'flex', flexDirection:'column', alignItems:'center'}}><Nego size={25} color={''}/><Grid item sx={{fontSize:'8px'}}>{'Esperano...'}</Grid></Grid>} 
                                {(jugador?.oferta?.length > 0 && user?.email === filterEmail(jugador?.oferta)[0]?.email) && filterEmail(jugador?.oferta)[0]?.respuesta === 'Rechazar_prestamo' && <Grid item sx={{whiteSpace: 'nowrap', fontSize:'16px', display:'flex', flexDirection:'column', alignItems:'center', cursor:'pointer'}} onClick={()=>{eliminarOfertas(equipoId,jugador?._id,filterEmail(jugador?.oferta)[0]?._id,eliminarOfert,queryClient, setIsLoadinng,handleClose)}}><Dele size={30} color={'var(--danger)'}/><Grid item sx={{fontSize:'8px'}}>{'Prestamo Rechazado'}</Grid></Grid>}  
                                {!(jugador?.oferta?.length > 0 && user?.email === filterEmail(jugador?.oferta)[0]?.email) && (jugador?.oferta?.length === 0 || jugador?.oferta?.length >=1) && (!filterEmail(jugador?.oferta)[0]?.respuesta || filterEmail(jugador?.oferta)[0]?.respuesta === 'Prestamo_Enviada') && <ButtonSend title={'Prestamo'} icon={Prestamo} disable={(user?.email === data?.correo)|| (filterEmail(jugador?.oferta)[0]?.respuesta === 'Oferta_Enviada')} handle={() => {seleccionarData(jugador,setJugadorSeleccionado, setModalPrestamo)}} iconSize={20} iconColor={'var(--warnning)'} />}
                                {(jugador?.oferta?.length > 0 && user?.email === filterEmail(jugador?.oferta)[0]?.email ) && (filterEmail(jugador?.oferta)[0]?.respuesta === 'Oferta_Enviada' || filterEmail(jugador?.oferta)[0]?.respuesta === 'Rechazar_oferta' || filterEmail(jugador?.oferta)[0]?.respuesta === 'Negociar_oferta' || filterEmail(jugador?.oferta)[0]?.respuesta === 'Aceptar_oferta') && <ButtonSend title={'Prestamo'} icon={Prestamo} disable={(user?.email === data?.correo)|| (filterEmail(jugador?.oferta)[0]?.respuesta === 'Oferta_Enviada') || (filterEmail(jugador?.oferta)[0]?.respuesta === 'Rechazar_oferta') || (filterEmail(jugador?.oferta)[0]?.respuesta === 'Negociar_oferta') || (filterEmail(jugador?.oferta)[0]?.respuesta === 'Aceptar_oferta')} handle={() => {seleccionarData(jugador,setJugadorSeleccionado, setModalPrestamo)}} iconSize={20} iconColor={'var(--warnning)'} />}
                            </StyledTableCell>
                        </StyledTableRow>
                    )
                })}
                </TableBody>
            </Table>
            {isLoadinng && (
                    <Grid sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: !mobile ? '100%' : '100%', backgroundColor: 'rgba(2, 2, 2, 0.488)', zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <CircularProgress style={{ color: light ? 'var(--dark2)' : 'var(--cero)' }} />
                    </Grid>
                )}
        </TableContainer>
        </Grid>}
        {jugadorSeleccionado && (<ModalAceptarOferta open={modalAceptarOferta} setOpen={setModalAceptarOferta} equipoId={equipoId} data={jugadorSeleccionado} jugadorId={jugadorSeleccionado._id}/>)}
        {jugadorSeleccionado && (<ModalNegociar open={modalNegociar} setOpen={setModalNegociar} equipoId={equipoId} data={jugadorSeleccionado} jugadorId={jugadorSeleccionado._id}/>)}
        {jugadorSeleccionado && (<ModalPrestamo open={modalPrestamo} setOpen={setModalPrestamo} equipoId={equipoId} data={jugadorSeleccionado} jugadorId={jugadorSeleccionado._id}/>)}
        {jugadorSeleccionado && (<ModalOferta open={modalOferta} setOpen={setModalOferta} equipoId={equipoId} data={jugadorSeleccionado} jugadorId={jugadorSeleccionado._id}/>)}
        {jugadorSeleccionado && (<ModalJugadorInfo open={modalJugadorInfo} setOpen={setModalJugadorInfo} jugador={jugadorSeleccionado} />)}
    </>
    )
}