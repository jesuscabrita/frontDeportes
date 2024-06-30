import React, { useState } from "react";
import { Grid, Paper } from "@mui/material";
import { Carga } from "../Shared/Carga";
import { ErrorCarga } from "../Shared/ErrorCarga";
import { MenuTabla } from "../Material/MenuTabla";
import { useTheme } from '@mui/material/styles';
import { TabPanel } from "../Material/TabPanel";
import { filterEstado, filterEstadoCategoria } from "../../utils/utils";
import { TableEquiposCola } from "./TableEquiposCola";
import { TableEquiposLigaB } from "./TableEquiposLigaB";
import { TableEquiposLigaC } from "./TableEquiposLigaC";
import { TableEquiposLigamaster } from "./TableEquiposLigamaster";
import { PanelEquiposAdminProps } from "../../interfaces/general";
import { opcionSelectEquipos } from "../../utils/arrays";
import { PanelAcciones } from "./PanelAcciones";
import SwipeableViews from "react-swipeable-views";

export const PanelEquiposAdmin: React.FC<PanelEquiposAdminProps> = ({
    light,
    mobile,
    isError,
    isLoading,
    data,
    eliminarEquipo,
    queryClient,
    editarEstados,
    reseteoEquipos,
    devolver,
    calculo,
    setIsLoadinng,
}) => {
    const [value, setValue] = useState(0);
    const theme = useTheme();

    const handleChange = (newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index: number) => {
        setValue(index);
    };

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
                    :
                    <Grid item container alignItems={'center'} justifyContent={'center'}>
                        <Grid item container alignItems={'center'} justifyContent={'center'}>
                            <img style={{ height: mobile ? '140px' : '150px' }} src={`/images/${light ? 'logoLight.png' : 'logoDark1.png'}`} alt="logo" />
                        </Grid>
                        <Grid item container alignItems={'center'} justifyContent={'center'} sx={{ color: light ? "var(--dark2)" : "var(--cero)", letterSpacing: '2px', fontSize: '20px', fontWeight: '500' }}>
                            Panel equipos
                        </Grid>
                        <Grid item container mt={2} xs={12} md={9} alignItems={'center'} justifyContent={'center'}>
                            <Grid item container mt={4} alignItems={'center'} justifyContent={'center'} sx={{ height: 'min-content' }}>
                                {opcionSelectEquipos?.map(opcion => (
                                    <MenuTabla opcion={opcion} valueSelect={value} handleChange={handleChange} />
                                ))}
                                <Grid container sx={{ borderBottom: light ? '2px solid var(--dark2)' : '2px solid var(--gris)', marginTop: '0px' }}></Grid>
                            </Grid>
                            <SwipeableViews axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'} index={value} onChangeIndex={handleChangeIndex}>
                                <TabPanel value={value} index={0} dir={theme.direction}>
                                    <Grid item mt={4} xs={12} md={12} container sx={{ width: '120vh', }} >
                                        <TableEquiposLigamaster
                                            light={light}
                                            mobile={mobile}
                                            queryClient={queryClient}
                                            editarEstados={editarEstados}
                                            dataEquipos={filterEstadoCategoria(data, 'registrado', 'Primera')}
                                        />
                                    </Grid>
                                </TabPanel>
                                <TabPanel value={value} index={1} dir={theme.direction}>
                                    <Grid item mt={4} xs={12} md={12} container sx={{ width: '120vh', }} >
                                        <TableEquiposLigaB
                                            light={light}
                                            mobile={mobile}
                                            queryClient={queryClient}
                                            editarEstados={editarEstados}
                                            dataEquipos={filterEstadoCategoria(data, 'registrado', 'Segunda')}
                                        />
                                    </Grid>
                                </TabPanel>
                                <TabPanel value={value} index={2} dir={theme.direction}>
                                    <Grid item mt={4} xs={12} md={12} container sx={{ width: '120vh', }} >
                                        <TableEquiposLigaC
                                            light={light}
                                            mobile={mobile}
                                            queryClient={queryClient}
                                            editarEstados={editarEstados}
                                            dataEquipos={filterEstadoCategoria(data, 'registrado', 'Tercera')}
                                        />
                                    </Grid>
                                </TabPanel>
                                <TabPanel value={value} index={3} dir={theme.direction}>
                                    <Grid item mt={4} xs={12} md={12} container sx={{ width: '120vh', }} >
                                        <TableEquiposCola
                                            light={light}
                                            mobile={mobile}
                                            queryClient={queryClient}
                                            editarEstados={editarEstados}
                                            eliminarEquipo={eliminarEquipo}
                                            dataEquiposLiga={filterEstado(data, 'enCola')}
                                        />
                                    </Grid>
                                </TabPanel>
                                <TabPanel value={value} index={4} dir={theme.direction}>
                                    <Grid item mt={4} xs={12} md={12} container sx={{ width: '120vh', }} >
                                        <PanelAcciones
                                            light={light}
                                            mobile={mobile}
                                            data={data}
                                            queryClient={queryClient}
                                            setIsLoadinng={setIsLoadinng}
                                            reseteoEquipos={reseteoEquipos}
                                            devolver={devolver}
                                            calculo={calculo}
                                        />
                                    </Grid>
                                </TabPanel>
                            </SwipeableViews>
                        </Grid>
                    </Grid>
            }
        </Paper>
    )
}