import React from "react";
import { Grid, Paper, Tooltip } from "@mui/material";
import { ButtomPrimario, ButtomSecundario, ButtomWarnnig } from "../Material/ButtonSend";
import { FaFileContract as Contratos } from 'react-icons/fa';
import { MdRestorePage } from "react-icons/md";
import { AiOutlineWarning as Warning } from 'react-icons/ai'

interface PanelAccionesProps {
    mobile: boolean;
    light: boolean;
}

export const PanelAcciones: React.FC<PanelAccionesProps> = ({
    mobile,
    light,
}) => {
    return (
        <Paper elevation={3} sx={{ padding: mobile ? "20px" : "40px", display: "flex", flexDirection: "column", alignItems: "center", background: light ? 'var(--gris3)' : 'var(--dark4)', width: '120vh', }}>
            <Grid item container alignItems={'center'} justifyContent={'center'}>
                <Grid item container alignItems={'center'} justifyContent={'center'} sx={{ color: light ? "var(--dark2)" : "var(--cero)", letterSpacing: '2px', fontSize: '20px', fontWeight: '500' }}>
                    Acciones de equipos
                </Grid>
                <Grid item container mt={2} xs={12} md={9} alignItems={'center'} justifyContent={'center'}>
                    <Grid item md={6} container alignItems={'center'} justifyContent={'center'}>
                        hola
                    </Grid>
                    <Grid item md={6} container alignItems={'center'} justifyContent={'center'}>
                        <Tooltip title="Calcula y analiza los contratos de los jugadores" placement="top">
                            <Grid item container mt={2}>
                                <ButtomSecundario
                                    title="Calcular contratos"
                                    handleclick={() => { }}
                                    icon={Contratos}
                                />
                            </Grid>
                        </Tooltip>
                        <Tooltip title="Devuelve a los jugadores que se encuentran en calidad de PRESTAMO a sus equipos de origen" placement="top">
                            <Grid item container mt={1}>
                                <ButtomPrimario
                                    title="Calcular/Devolver Prestamos"
                                    handleclick={() => { }}
                                    icon={MdRestorePage}
                                />
                            </Grid>
                        </Tooltip>
                        <Tooltip title="Resetea los datos de los equipos, es recomendable al terminar la liga o temporada" placement="top">
                            <Grid item container mt={1}>
                                <ButtomWarnnig
                                    title="Resetear datos"
                                    handleclick={() => { }}
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