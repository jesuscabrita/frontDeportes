import React from "react";
import { Grid, Paper, Tooltip } from "@mui/material";
import { ButtomPrimario, ButtomSecundario, ButtomWarnnig } from "../Material/ButtonSend";
import { FaFileContract as Contratos } from 'react-icons/fa';
import { MdRestorePage } from "react-icons/md";
import { AiOutlineWarning as Warning } from 'react-icons/ai';
import { MdAdminPanelSettings } from "react-icons/md";
import { editarReset } from "../../utils/utilsEquipos";
import { calculoContratosJugadores, devolverJugador } from "../../utils/utilsPanelJugadores";
import { PanelAccionesProps } from "../../interfaces/general";

export const PanelAcciones: React.FC<PanelAccionesProps> = ({
    mobile,
    light,
    queryClient,
    data,
    reseteoEquipos,
    devolver,
    calculo,
    setIsLoadinng,
}) => {
    return (
        <Paper elevation={3} sx={{ padding: mobile ? "20px" : "40px", display: "flex", flexDirection: "column", alignItems: "center", background: light ? 'var(--gris3)' : 'var(--dark4)', width: '120vh', }}>
            <Grid item container alignItems={'center'} justifyContent={'center'}>
                <Grid item container alignItems={'center'} justifyContent={'center'} sx={{ color: light ? "var(--dark2)" : "var(--cero)", letterSpacing: '2px', fontSize: '20px', fontWeight: '500' }}>
                    Acciones de equipos
                </Grid>
                <Grid item container mt={2} xs={12} md={9} alignItems={'center'} justifyContent={'center'}>
                    <Grid item md={6} container alignItems={'center'} justifyContent={'center'}>
                        <Grid item container alignItems={'center'} justifyContent={'center'} flexDirection={'column'} gap={2} sx={{ color: light ? "var(--dark2)" : "var(--cero)", letterSpacing: '2px', fontSize: '16px', fontWeight: '500' }}>
                            <MdAdminPanelSettings size={mobile ? 50 : 100} />
                        </Grid>
                    </Grid>
                    <Grid item md={6} container alignItems={'center'} justifyContent={'center'}>
                        <Tooltip title="Calcula y analiza los contratos de los jugadores" placement="top">
                            <Grid item container mt={2}>
                                <ButtomSecundario
                                    title="Calcular contratos"
                                    handleclick={() => { calculoContratosJugadores(data, calculo, queryClient, setIsLoadinng) }}
                                    icon={Contratos}
                                />
                            </Grid>
                        </Tooltip>
                        <Tooltip title="Devuelve a los jugadores que se encuentran en calidad de PRESTAMO a sus equipos de origen" placement="top">
                            <Grid item container mt={1}>
                                <ButtomPrimario
                                    title="Calcular/Devolver Prestamos"
                                    handleclick={() => { devolverJugador(data, devolver, queryClient, setIsLoadinng) }}
                                    icon={MdRestorePage}
                                />
                            </Grid>
                        </Tooltip>
                        <Tooltip title="Resetea los datos de los equipos, es recomendable al terminar la liga o temporada" placement="top">
                            <Grid item container mt={1}>
                                <ButtomWarnnig
                                    title="Resetear datos"
                                    handleclick={() => { editarReset(setIsLoadinng, queryClient, data, reseteoEquipos) }}
                                    icon={Warning}
                                />
                            </Grid>
                        </Tooltip>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    )
}