import React, { useState } from "react";
import { Avatar, Collapse, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { seleccionarData, stringAvatar } from "../../utils/utils";
import { ButtomDanger, ButtomPrimario } from "../Material/ButtonSend";
import { eliminarUsuarios } from "../../utils/utilsUser";
import { TableUsuariosProps } from "../../interfaces/general";
import { MdKeyboardArrowDown as ArrowDown } from "react-icons/md";
import { MdKeyboardArrowUp as ArrowUp } from "react-icons/md";
import { FaUserCheck } from "react-icons/fa";
import { GoVerified as Very } from 'react-icons/go';
import { MdAdminPanelSettings } from "react-icons/md";
import { ImNotification } from "react-icons/im";
import { IoIosFootball } from "react-icons/io";
import { FaUserEdit } from "react-icons/fa";
import { MdDelete as Eliminar } from 'react-icons/md';

export const TableUsuarios: React.FC<TableUsuariosProps> = ({
    light,
    mobile,
    data,
    searchQuery,
    queryClient,
    eliminarUsuario,
    setUserSeleccionado,
    setOpenModal,
}) => {
    const [openRows, setOpenRows] = useState<{ [key: number]: boolean }>({});

    const handleRowClick = (index: number) => {
        setOpenRows((prev) => ({ ...prev, [index]: !prev[index] }));
    };
    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead sx={{ background: light ? 'var(--dark2)' : 'var(--gris4)' }}>
                    <TableCell sx={{ color: light ? "var(--cero)" : "var(--dark2)", letterSpacing: '2px', fontSize: '18px', fontWeight: '500' }} align="center">Usuarios</TableCell>
                </TableHead>
                {data && data.filter((usuario) => {
                    const fullName = `${usuario.nombre} ${usuario.apellido}`.toLowerCase();
                    const email = usuario.email.toLowerCase();
                    return fullName.includes(searchQuery.toLowerCase()) || email.includes(searchQuery.toLowerCase());
                }).map((usuario, index) => {
                    const isOpen = openRows[index] || false;
                    return (
                        <TableBody>
                            <TableRow sx={{ '& > *': { borderBottom: 'unset', background: light ? 'var(--gris3)' : 'var(--dark4)', cursor: 'pointer' } }}>
                                <TableCell sx={{ color: light ? 'var(--dark2)' : 'var(--cero)', whiteSpace: 'nowrap' }}>
                                    <Grid container width={'280px'} flexDirection={'row'} alignItems={'center'}>
                                        <Grid item>
                                            <IconButton aria-label="expand row" size="small" sx={{ color: light ? 'black' : 'var(--cero)' }} onClick={() => handleRowClick(index)}>
                                                {isOpen ? <ArrowUp /> : <ArrowDown />}
                                            </IconButton>
                                        </Grid>
                                        <Grid item width={'240px'} container gap={1} flexDirection={'row'} alignItems={'center'} justifyContent={'start'} sx={{ marginLeft: '6px' }}>
                                            <Avatar {...stringAvatar(usuario?.nombre)} sx={{ height: '35px', width: '35px', bgcolor: !light ? "#aab4be" : 'var(--dark2)' }} />
                                            <Grid item sx={{ fontSize: mobile ? '14px' : '16px', letterSpacing: '2px', fontWeight: '500' }}>{`${usuario?.nombre} ${usuario?.apellido}`}</Grid>
                                            {usuario?.role === 'usuario' ?
                                                <FaUserCheck color={light ? "var(--dark2)" : "var(--cero)"} />
                                                : usuario?.role === 'super_admin' ? <Very color={'var(--check)'} /> : <MdAdminPanelSettings color={light ? "var(--dark2)" : "var(--cero)"} />}
                                        </Grid>
                                    </Grid>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell style={{ paddingBottom: 0, paddingTop: 0, background: light ? 'var(--gris3)' : 'var(--dark4)', borderColor: light ? 'var(--dark2)' : 'var(--gris)' }} colSpan={8}>
                                    <Collapse in={isOpen} timeout="auto" unmountOnExit>
                                        <Grid item container alignItems={'center'} justifyContent={'center'} sx={{ padding: '20px' }}>
                                            <Grid item md={6} container alignItems={'center'} justifyContent={'center'}>
                                                {usuario?.foto === 'no definida' ?
                                                    <Grid item container alignItems={'center'} justifyContent={'center'} flexDirection={'column'} gap={2} sx={{ color: light ? "var(--dark2)" : "var(--cero)", letterSpacing: '2px', fontSize: '16px', fontWeight: '500' }}>
                                                        <ImNotification size={mobile ? 50 : 100} />
                                                        {'No ha registrado su equipo'}
                                                    </Grid>
                                                    : <img style={{ height: mobile ? '150px' : '' }} src={usuario?.foto} alt="logoEquipo" />}
                                            </Grid>
                                            <Grid item md={6} gap={2} container alignItems={'center'} justifyContent={'center'} flexDirection={'column'} sx={{ padding: '20px' }}>
                                                <Grid item sx={{ color: light ? "var(--dark2)" : "var(--cero)", letterSpacing: '2px', fontSize: '20px', fontWeight: '500' }}>
                                                    {usuario?.nombre} {usuario?.apellido}
                                                </Grid>
                                                <Grid item container alignItems={'center'} justifyContent={'center'} gap={1} mt={2}>
                                                    <Grid item container alignItems={'center'} justifyContent={'center'} gap={1} mt={-1.5} sx={{ color: light ? "var(--dark2)" : "var(--gris)", letterSpacing: '0px', fontSize: mobile ? '12px' : '16px', fontWeight: '400' }}>
                                                        <span style={{ color: light ? "var(--dark2)" : "var(--cero)", letterSpacing: '1px', fontSize: mobile ? '14px' : '16px', fontWeight: '800' }}>Tipo de usuario</span>{usuario?.role === 'usuario' ? 'User basico' : usuario?.role === 'super_admin' ? 'Super admin' : 'Admin'}
                                                        {usuario?.role === 'usuario' ?
                                                            <FaUserCheck color={light ? "var(--dark2)" : "var(--cero)"} />
                                                            : usuario?.role === 'super_admin' ? <Very color={'var(--check)'} /> : <MdAdminPanelSettings color={light ? "var(--dark2)" : "var(--cero)"} />}
                                                    </Grid>
                                                </Grid>
                                                <Grid item container alignItems={'center'} justifyContent={'center'} gap={1}>
                                                    <Grid item sx={{ color: light ? "var(--dark2)" : "var(--cero)", letterSpacing: '1px', fontSize: mobile ? '14px' : '16px', fontWeight: '800' }}>
                                                        Email
                                                    </Grid>
                                                    <Grid item sx={{ color: light ? "var(--dark2)" : "var(--gris)", letterSpacing: '0px', fontSize: mobile ? '12px' : '16px', fontWeight: '400' }}>
                                                        {usuario?.email}
                                                    </Grid>
                                                </Grid>
                                                <Grid item container alignItems={'center'} justifyContent={'center'} gap={1}>
                                                    <Grid item sx={{ color: light ? "var(--dark2)" : "var(--cero)", letterSpacing: '1px', fontSize: mobile ? '14px' : '16px', fontWeight: '800' }}>
                                                        Fecha de nacimiento
                                                    </Grid>
                                                    <Grid item sx={{ color: light ? "var(--dark2)" : "var(--gris)", letterSpacing: '0px', fontSize: mobile ? '12px' : '16px', fontWeight: '400' }}>
                                                        {usuario?.fecha_de_nacimiento}
                                                    </Grid>
                                                </Grid>
                                                <Grid item container alignItems={'center'} justifyContent={'center'} gap={1}>
                                                    <Grid item sx={{ color: light ? "var(--dark2)" : "var(--cero)", letterSpacing: '1px', fontSize: mobile ? '14px' : '16px', fontWeight: '800' }}>
                                                        Edad
                                                    </Grid>
                                                    <Grid item sx={{ color: light ? "var(--dark2)" : "var(--gris)", letterSpacing: '0px', fontSize: mobile ? '12px' : '16px', fontWeight: '400' }}>
                                                        {`Tiene ${usuario?.edad} años`}
                                                    </Grid>
                                                </Grid>
                                                <Grid item container alignItems={'center'} justifyContent={'center'} gap={1}>
                                                    <Grid item sx={{ color: light ? "var(--dark2)" : "var(--cero)", letterSpacing: '1px', fontSize: mobile ? '14px' : '16px', fontWeight: '800' }}>
                                                        Categoria
                                                    </Grid>
                                                    <Grid item sx={{ color: light ? "var(--dark2)" : "var(--gris)", letterSpacing: '0px', fontSize: mobile ? '12px' : '16px', fontWeight: '400' }}>
                                                        {usuario?.categoria}
                                                    </Grid>
                                                </Grid>
                                                <Grid item container alignItems={'center'} justifyContent={'center'} gap={1}>
                                                    <Grid item sx={{ color: light ? "var(--dark2)" : "var(--cero)", letterSpacing: '1px', fontSize: mobile ? '14px' : '16px', fontWeight: '800' }}>
                                                        Sub categoria
                                                    </Grid>
                                                    <Grid item sx={{ color: light ? "var(--dark2)" : "var(--gris)", letterSpacing: '0px', fontSize: mobile ? '12px' : '16px', fontWeight: '400' }}>
                                                        {usuario?.subCategoria}
                                                    </Grid>
                                                </Grid>
                                                <Grid item container alignItems={'center'} justifyContent={'center'} gap={1}>
                                                    <Grid item container alignItems={'center'} justifyContent={'center'} gap={1} sx={{ color: light ? "var(--dark2)" : "var(--gris)", letterSpacing: '0px', fontSize: mobile ? '12px' : '16px', fontWeight: '400' }}>
                                                        <span style={{ color: light ? "var(--dark2)" : "var(--cero)", letterSpacing: '1px', fontSize: mobile ? '14px' : '16px', fontWeight: '800' }}>Equipo</span>{usuario?.equipo} <IoIosFootball color={light ? "var(--dark2)" : "var(--cero)"} />
                                                    </Grid>
                                                </Grid>
                                                <Grid item container mt={2}>
                                                    <ButtomPrimario
                                                        title="Editar"
                                                        handleclick={() => { seleccionarData(usuario, setUserSeleccionado, setOpenModal) }}
                                                        icon={FaUserEdit}
                                                    />
                                                </Grid>
                                                <Grid item container mt={0}>
                                                    <ButtomDanger
                                                        title="Eliminar"
                                                        handleclick={() => { eliminarUsuarios(usuario?._id, eliminarUsuario, queryClient) }}
                                                        icon={Eliminar}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Collapse>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    )
                })}
            </Table>
        </TableContainer>
    )
}