import { Grid, useMediaQuery, TextField, InputAdornment, Avatar } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import { useContext, useState } from "react";
import { useQuery } from "react-query";
import { UserGet } from "../../service/session";
import Context from "../../context/contextPrincipal";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { StyledTableCell } from "../../components/Material/StyledTableCell";
import { StyledTableRow } from "../../components/Material/StyledTableRow";
import { stringAvatar } from "../../utils/utils";
import moment from "moment";
import { ButtonSend } from "../../components/Material/ButtonSend";
import { AiFillEdit as Edit } from 'react-icons/ai';
import { MdDelete as Eliminar } from 'react-icons/md';
import { WithAdmin } from "../../components/Shared/WithAdmin";

const Usuarios = () => {
    const [data, setData] = useState([]);
    const [light] = useContext(Context);
    const [searchQuery, setSearchQuery] = useState("");
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });

    const { isLoading, isError } = useQuery(["user"], UserGet, {
        refetchOnWindowFocus: false,
        onSuccess: (data) => {
            setData(data.data);
        },
    });

    return (
        <Grid container sx={{ paddingTop: '120px', height: mobile ? '100%' : '100%', paddingLeft: '18px', paddingRight: '18px' }}>
            {/* Input de búsqueda */}
            <TextField
                fullWidth
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar por nombre, apellido o email"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon color="action" />
                        </InputAdornment>
                    ),
                }}
            />

            <Grid item container mt={2} mb={4} sx={{height:'100%'}}>
                <TableContainer component={Paper} >
                    <Table aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell light={light}><Grid item sx={{ whiteSpace: 'nowrap' }}>Nombre</Grid></StyledTableCell>
                                <StyledTableCell light={light}>Email</StyledTableCell>
                                <StyledTableCell light={light}>Rol</StyledTableCell>
                                <StyledTableCell light={light}>Fecha de nacimiento</StyledTableCell>
                                <StyledTableCell light={light}>Edad</StyledTableCell>
                                <StyledTableCell light={light}>Equipo</StyledTableCell>
                                <StyledTableCell light={light}>Ultima conexion</StyledTableCell>
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
                                            <Grid sx={{ display: 'flex', alignItems: 'center', whiteSpace: 'nowrap', gap: '18px' }} >
                                                {usuario.role}
                                            </Grid>
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
                                                {moment(usuario.last_connection).format("DD/MM/YYYY HH:mm:ss")}
                                            </Grid>
                                        </StyledTableCell>
                                        <StyledTableCell light={light}>
                                            <ButtonSend title={'Editar'} icon={Edit} disable={false} handle={() => { null }} iconSize={20} iconColor={''} />
                                        </StyledTableCell>
                                        <StyledTableCell light={light}>
                                            <ButtonSend title={'Eliminar'} icon={Eliminar} disable={false} handle={() => { null }} iconSize={20} iconColor={'var(--danger)'} />
                                        </StyledTableCell>
                                    </StyledTableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    );
};

export default WithAdmin(Usuarios);