import React from "react";
import { Avatar, Grid, Paper } from "@mui/material";
import { FaArrowAltCircleLeft as Atras } from 'react-icons/fa';
import { FaUserCheck } from "react-icons/fa";
import { GoVerified as Very } from 'react-icons/go';
import { IoIosFootball } from "react-icons/io";
import { MdAdminPanelSettings } from "react-icons/md";
import { ButtomPrimario } from "../Material/ButtonSend";
import { FaUserEdit } from "react-icons/fa";
import { ImNotification } from "react-icons/im";
import { Carga } from "../Shared/Carga";
import { ErrorCarga } from "../Shared/ErrorCarga";
import { PerfilInfoProps } from "../../interfaces/general";

export const PerfilInfo: React.FC<PerfilInfoProps> = ({
    light,
    mobile,
    usuario,
    isLoading,
    isError,
    handleAtrasClick,
    handleEditar
}) => {
    return (
        <Paper elevation={3} sx={{ padding: mobile ? "20px" : "40px", display: "flex", flexDirection: "column", alignItems: "center", background: light ? 'var(--gris)' : 'var(--dark2)' }}>
            {isLoading ?
                <Grid item height={mobile ? "75vh" : '60vh'} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', color: light ? 'var(--dark2)' : 'var(--cero)', gap: '16px' }}>
                    <Carga />
                </Grid>
                : isError ?
                    <Grid item height={mobile ? "75vh" : '60vh'} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', color: light ? "var(--dark2)" : "var(--gris)", flexDirection: 'column', fontSize: mobile ? '14px' : '16px' }}>
                        <ErrorCarga />
                    </Grid>
                    : <Grid item container>
                        <Grid item md={6} container alignItems={'center'} justifyContent={'center'}>
                            <Grid width={'100%'} sx={{ display: 'flex' }}>
                                <Grid sx={{ paddingLeft: !mobile ? '80px' : '16px' }}>
                                    <Atras size={30} style={{ cursor: 'pointer', color: light ? 'var(--dark2)' : 'var(--cero)' }} onClick={handleAtrasClick} />
                                </Grid>
                            </Grid>
                            {usuario?.foto === 'no definida' ?
                                <Grid item container alignItems={'center'} justifyContent={'center'} flexDirection={'column'} gap={2} mt={mobile ? 4 : -26} mb={mobile ? 4 : 0} sx={{ color: light ? "var(--dark2)" : "var(--cero)", letterSpacing: '2px', fontSize: '16px', fontWeight: '500' }}>
                                    <ImNotification size={mobile ? 50 : 100} />
                                    {'No has registrado tu equipo'}
                                </Grid>
                                : <img style={{ height: mobile ? '150px' : '' }} src={usuario?.foto} alt="logoEquipo" />}
                        </Grid>
                        <Grid item md={6} gap={2} container alignItems={'center'} justifyContent={'center'} flexDirection={'column'} sx={{ padding: '20px' }}>
                            <Avatar alt={`${usuario?.nombre} ${usuario?.apellido}`} src={''} sx={{ width: 100, height: 100, marginBottom: 5, bgcolor: !light ? "#aab4be" : 'var(--dark2)' }} />
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
                                    {`Tienes ${usuario?.edad} años`}
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
                                    <span style={{ color: light ? "var(--dark2)" : "var(--cero)", letterSpacing: '1px', fontSize: mobile ? '14px' : '16px', fontWeight: '800' }}>Tu equipo</span>{usuario?.equipo} <IoIosFootball color={light ? "var(--dark2)" : "var(--cero)"} />
                                </Grid>
                            </Grid>
                            <Grid item container mt={2}>
                                <ButtomPrimario
                                    title="Editar"
                                    handleclick={handleEditar}
                                    icon={FaUserEdit}
                                />
                            </Grid>
                        </Grid>
                    </Grid>}
        </Paper>
    )
}