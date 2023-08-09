import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useContext, useState } from 'react';
import Context from '../../context/contextPrincipal';
import { Avatar, Grid, useMediaQuery } from '@mui/material';
import { StyledTableCell } from '../Material/StyledTableCell';
import { StyledTableRow } from '../Material/StyledTableRow';
import { seleccionarData, stringAvatar } from '../../utils/utils';
import { ButtonSend } from '../Material/ButtonSend';
import { AiFillEdit as Edit } from 'react-icons/ai';
import { MdDelete as Eliminar } from 'react-icons/md';
import moment from 'moment';
import { ModalUser } from '../modals/User/ModalUser';
import { GoVerified as Very } from 'react-icons/go';
import { MdOutlineVerifiedUser as Admin } from 'react-icons/md';
import { eliminarUsuarios } from '../../utils/utilsUser';
import { userDelete } from '../../service/session';
import { useMutation, useQueryClient } from 'react-query';

export const TablaUser =({data,searchQuery})=>{
    const [light] = useContext(Context);
    const [openModal, setOpenModal] = useState(false);
    const [userSeleccionado, setUserSeleccionado] = useState(null);
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });
    const { mutate: eliminarUsuario } = useMutation(userDelete);
    const queryClient = useQueryClient();

    return(
        <>
        <TableContainer component={Paper} >
            <Table aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell light={light}><Grid item sx={{ whiteSpace: 'nowrap' }}>Nombre</Grid></StyledTableCell>
                        <StyledTableCell light={light}><Grid item sx={{ whiteSpace: 'nowrap' }}>Email</Grid></StyledTableCell>
                        <StyledTableCell light={light}><Grid item sx={{ whiteSpace: 'nowrap' }}>Rol</Grid></StyledTableCell>
                        <StyledTableCell light={light}><Grid item sx={{ whiteSpace: 'nowrap' }}>Fecha de nacimiento</Grid></StyledTableCell>
                        <StyledTableCell light={light}><Grid item sx={{ whiteSpace: 'nowrap' }}>Edad</Grid></StyledTableCell>
                        <StyledTableCell light={light}><Grid item sx={{ whiteSpace: 'nowrap' }}>Equipo</Grid></StyledTableCell>
                        <StyledTableCell light={light}><Grid item sx={{ whiteSpace: 'nowrap' }}>Ultima conexion</Grid></StyledTableCell>
                        <StyledTableCell light={light}/>
                        <StyledTableCell light={light}/>
                    </TableRow>
                </TableHead>
                <TableBody style={{ background: light ? 'var(--cero)' : 'var(--dark3)' }}>
                    {data.filter((usuario) => {
                        const fullName = `${usuario.nombre} ${usuario.apellido}`.toLowerCase();
                        const email = usuario.email.toLowerCase();
                        return fullName.includes(searchQuery.toLowerCase()) || email.includes(searchQuery.toLowerCase());
                    }).map((usuario) => {
                        return (
                            <StyledTableRow light={light} key={usuario.id}>
                                <StyledTableCell light={light} align="right" style={{ whiteSpace: 'nowrap' }}>
                                    <Grid sx={{ display: 'flex', alignItems: 'center', whiteSpace: 'nowrap', gap: '18px' }} >
                                        <Avatar {...stringAvatar(usuario.nombre)} sx={{ height: '35px', width: '35px' }} />
                                        <Grid sx={{ whiteSpace: 'nowrap', paddingRight: mobile && '30px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                            {`${usuario.nombre} ${usuario.apellido}`}
                                        </Grid>
                                    </Grid>
                                </StyledTableCell>
                                <StyledTableCell light={light} align="right" style={{ whiteSpace: 'nowrap' }}>
                                    <Grid sx={{ display: 'flex', alignItems: 'center', whiteSpace: 'nowrap', gap: '18px' }} >
                                        {usuario.email}
                                    </Grid>
                                </StyledTableCell>
                                <StyledTableCell light={light} align="right" style={{ whiteSpace: 'nowrap' }}>
                                    {usuario.role === 'super_admin' &&
                                    <Grid sx={{ display: 'flex', alignItems: 'center', whiteSpace: 'nowrap', gap: '18px' }} >
                                        Super Admin<Very color={'var(--check)'}/>
                                    </Grid>}
                                    {usuario.role === 'admin' &&
                                    <Grid sx={{ display: 'flex', alignItems: 'center', whiteSpace: 'nowrap', gap: '18px' }} >
                                        Admin<Admin color={'var(--primario)'}/>
                                    </Grid>}
                                    {usuario.role === 'usuario' &&
                                    <Grid sx={{ display: 'flex', alignItems: 'center', whiteSpace: 'nowrap', gap: '18px' }} >
                                        {usuario.role}
                                    </Grid>}
                                </StyledTableCell>
                                <StyledTableCell light={light} align="right" style={{ whiteSpace: 'nowrap' }}>
                                    <Grid sx={{ display: 'flex', alignItems: 'center', whiteSpace: 'nowrap', gap: '18px' }} >
                                        {usuario.fecha_de_nacimiento}
                                    </Grid>
                                </StyledTableCell>
                                <StyledTableCell light={light} align="right" style={{ whiteSpace: 'nowrap' }}>
                                    <Grid sx={{ display: 'flex', alignItems: 'center', whiteSpace: 'nowrap', gap: '18px' }} >
                                        {usuario.edad}
                                    </Grid>
                                </StyledTableCell>
                                <StyledTableCell light={light} align="right" style={{ whiteSpace: 'nowrap' }}>
                                    <Grid sx={{ display: 'flex', alignItems: 'center', whiteSpace: 'nowrap', gap: '18px' }} >
                                        {usuario.equipo}
                                    </Grid>
                                </StyledTableCell>
                                <StyledTableCell light={light} align="right" style={{ whiteSpace: 'nowrap' }}>
                                    <Grid sx={{ display: 'flex', alignItems: 'center', whiteSpace: 'nowrap', gap: '18px' }} >
                                        {!usuario.last_connection ? 'No accion' : moment(usuario.last_connection).format("DD/MM/YYYY HH:mm:ss")}
                                    </Grid>
                                </StyledTableCell>
                                <StyledTableCell light={light}>
                                    <ButtonSend title={'Editar'} icon={Edit} disable={false} handle={() => { seleccionarData(usuario,setUserSeleccionado,setOpenModal) }} iconSize={20} iconColor={''} />
                                </StyledTableCell>
                                <StyledTableCell light={light}>
                                    <ButtonSend title={'Eliminar'} icon={Eliminar} disable={false} handle={() => { eliminarUsuarios(usuario?._id,eliminarUsuario,queryClient) }} iconSize={20} iconColor={'var(--danger)'} />
                                </StyledTableCell>
                            </StyledTableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </TableContainer>
        {openModal && <ModalUser open={openModal} setOpen={setOpenModal} data={userSeleccionado}/>}
        </>
    )
}