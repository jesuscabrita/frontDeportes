import React from "react";
import { Grid, Paper } from "@mui/material";
import { InputBuscador } from "../Material/InputBuscador";
import { Carga } from "../Shared/Carga";
import { ErrorCarga } from "../Shared/ErrorCarga";
import { AdminUsuariosProps } from "../../interfaces/general";
import { TableUsuarios } from "./TableUsuarios";

export const AdminUsuarios: React.FC<AdminUsuariosProps> = ({
    light,
    mobile,
    searchQuery,
    data,
    isLoading,
    isError,
    queryClient,
    eliminarUsuario,
    setSearchQuery,
    setOpenModal,
    setUserSeleccionado,
}) => {
    return (
        <Paper elevation={3} sx={{ padding: mobile ? "20px" : "40px", display: "flex", flexDirection: "column", alignItems: "center", background: light ? 'var(--gris)' : 'var(--dark2)' }}>
            {isLoading ?
                <Grid item height={mobile ? "75vh" : '65vh'} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', color: light ? 'var(--dark2)' : 'var(--cero)', gap: '16px' }}>
                    <Carga />
                </Grid>
                : isError ?
                    <Grid item height={mobile ? "75vh" : '60vh'} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', color: light ? "var(--dark2)" : "var(--gris)", flexDirection: 'column', fontSize: mobile ? '14px' : '16px' }}>
                        <ErrorCarga />
                    </Grid>
                    : <Grid item container alignItems={'center'} justifyContent={'center'}>
                        <Grid item container alignItems={'center'} justifyContent={'center'}>
                            <img style={{ height: mobile ? '140px' : '150px' }} src={`/images/${light ? 'logoLight.png' : 'logoDark1.png'}`} alt="logo" />
                        </Grid>
                        <Grid item container alignItems={'center'} justifyContent={'center'} sx={{ color: light ? "var(--dark2)" : "var(--cero)", letterSpacing: '2px', fontSize: '20px', fontWeight: '500' }}>
                            Administrar usuarios
                        </Grid>
                        <Grid item container xs={12} md={9} alignItems={'center'} justifyContent={'center'}>
                            <InputBuscador
                                title="Buscar"
                                descripcion="Buscar por nombre, apellido o email"
                                placeholder="Buscar por nombre, apellido o email"
                                setValue={setSearchQuery}
                                value={searchQuery}
                            />
                        </Grid>
                        <Grid item container mt={2} xs={12} md={9} alignItems={'center'} justifyContent={'center'}>
                            <TableUsuarios
                                data={data}
                                eliminarUsuario={eliminarUsuario}
                                light={light}
                                mobile={mobile}
                                queryClient={queryClient}
                                searchQuery={searchQuery}
                                setOpenModal={setOpenModal}
                                setUserSeleccionado={setUserSeleccionado}
                            />
                        </Grid>
                    </Grid>}
        </Paper>
    )
}