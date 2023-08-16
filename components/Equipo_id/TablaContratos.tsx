import { Avatar, CircularProgress, Grid, useMediaQuery } from "@mui/material";
import { useContext, useState } from "react";
import Context from "../../context/contextPrincipal";
import { TbMoodEmpty as Vacio } from 'react-icons/tb';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { StyledTableCell } from "../Material/StyledTableCell";
import { StyledTableRow } from "../Material/StyledTableRow";
import { filterLibreJugador, formatoPesosArgentinos, seleccionarData, stringAvatar } from "../../utils/utils";
import { IoLogoClosedCaptioning as Capitan } from 'react-icons/io';
import { ModalJugadorInfo } from "../modals/Jugador/ModalInfoJugador";
import { ButtonSend } from "../Material/ButtonSend";
import { FaBusinessTime as Nego } from 'react-icons/fa';
import { MdAutorenew as Renovar } from 'react-icons/md';
import { FaFilePrescription as Recindir } from 'react-icons/fa';
import { BiTransfer as Trasnfer } from 'react-icons/bi';
import { MdNotificationsActive as Noti } from 'react-icons/md';
import { BsFillCheckCircleFill as Listo } from 'react-icons/bs';
import { ModalRenovarJugador } from "../modals/Jugador/ModalRenovar";
import { MdSell as ListaTransf } from 'react-icons/md';
import { useMutation, useQueryClient } from "react-query";
import { jugadoresListaTransferible } from "../../service/jugadores";
import { listaDeTransferiblesNo, listaDeTransferiblesSi } from "../../utils/utilsPanelJugadores";
import { ModalRecindir } from "../modals/Jugador/ModalRecindir";

export const TablaContratos =({jugadores, isLoading, equipoId})=>{
    const [light] = useContext(Context);
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });
    const [modalJugadorInfo, setModalJugadorInfo] = useState(false);
    const [modalRenovar, setModalRenovar] = useState(false);
    const [modalRecindir, setModalRecindir] = useState(false);
    const [jugadorSeleccionado, setJugadorSeleccionado] = useState(null);
    const queryClient = useQueryClient();
    const [isLoadinng, setIsLoadinng] = useState(false);
    const { mutate: listaTransferibleJugador } = useMutation(jugadoresListaTransferible);

    const jugadoresFiltrados = filterLibreJugador(jugadores, 'No').sort((jugadorA, jugadorB) =>
    jugadorB.valor_mercado - jugadorA.valor_mercado
    );

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
                        <StyledTableCell light={light}><Grid item sx={{ whiteSpace: 'nowrap'}}>Status</Grid></StyledTableCell>
                        <StyledTableCell light={light}><Grid item sx={{ whiteSpace: 'nowrap'}}>Contrato</Grid></StyledTableCell>
                        <StyledTableCell light={light}/>
                        <StyledTableCell light={light}/>
                        <StyledTableCell light={light}/>
                    </TableRow>
                </TableHead>
                <TableBody style={{background:light ? 'var(--cero)':'var(--dark3)'}}>
                {jugadoresFiltrados.map((jugador, index)=>{
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
                            <StyledTableCell light={light} align="left">
                                {jugador.oferta.length === 0 && <Grid item sx={{whiteSpace: 'nowrap', fontSize:'16px'}}><Listo size={20} color={'var(--check)'}/></Grid>}
                                {jugador.oferta.length >= 1 && <Grid item sx={{whiteSpace: 'nowrap', fontSize:'16px', display:'flex', cursor:'pointer'}}><Trasnfer size={28}/> <Noti size={18} color={'var(--danger)'}/> <Grid item sx={{fontSize:'12px'}}>{jugador.oferta.length}</Grid></Grid>}
                                {/* <Grid item sx={{whiteSpace: 'nowrap', fontSize:'16px'}}><Nego size={25} color={''}/></Grid> */}
                            </StyledTableCell>
                            <StyledTableCell light={light} align="left">
                                {jugador.contrato === 0.5 && 
                                    <Grid item sx={{whiteSpace: 'nowrap', fontSize:'17px', color:'var(--danger)',fontWeight:'700'}}>
                                    Media Temporada
                                </Grid>}
                                {jugador.contrato === 1 && 
                                    <Grid item sx={{whiteSpace: 'nowrap', fontSize:'17px', color:'var(--warnning)',fontWeight:'700'}}>
                                    1 Temporada
                                </Grid>}
                                {jugador.contrato >= 2 && 
                                    <Grid item sx={{whiteSpace: 'nowrap', fontSize:'17px', color:'var(--check)',fontWeight:'700'}}>
                                    {`${jugador.contrato} Temporadas`}
                                </Grid>}
                            </StyledTableCell>
                            <StyledTableCell light={light} align="left">
                                <ButtonSend title={'Renovar'} icon={Renovar} disable={false} handle={() => {seleccionarData(jugador,setJugadorSeleccionado, setModalRenovar)}} iconSize={20} iconColor={''} />
                            </StyledTableCell>
                            <StyledTableCell light={light} align="left">
                                <ButtonSend title={'Recindir'} icon={Recindir} disable={false} handle={() => {seleccionarData(jugador,setJugadorSeleccionado, setModalRecindir)}} iconSize={20} iconColor={'var(--danger)'} />
                            </StyledTableCell>
                            <StyledTableCell light={light} align="left">
                                {jugador.transferible === 'No' && <ButtonSend title={'L.Transf'} icon={ListaTransf} disable={false} handle={() => {listaDeTransferiblesSi(equipoId,jugador._id,listaTransferibleJugador,queryClient,'Si')}} iconSize={20} iconColor={'var(--warnning)'} />}
                                {jugador.transferible === 'Si' && <ButtonSend title={'NO.Transf'} icon={ListaTransf} disable={false} handle={() => {listaDeTransferiblesNo(equipoId,jugador._id,listaTransferibleJugador,queryClient,'No')}} iconSize={20} iconColor={'var(--primario)'} />}
                            </StyledTableCell>
                        </StyledTableRow>
                    )
                })}
                </TableBody>
            </Table>
        </TableContainer>
        </Grid>}
        {jugadorSeleccionado && <ModalRecindir open={modalRecindir} setOpen={setModalRecindir} data={jugadorSeleccionado} equipoId={equipoId}/>}
        {jugadorSeleccionado && (<ModalRenovarJugador open={modalRenovar} setOpen={setModalRenovar} data={jugadorSeleccionado} jugadorId={jugadorSeleccionado?._id} equipoId={equipoId}/>)}
        {jugadorSeleccionado && (<ModalJugadorInfo open={modalJugadorInfo} setOpen={setModalJugadorInfo} jugador={jugadorSeleccionado} />)}
    </>
    )
}