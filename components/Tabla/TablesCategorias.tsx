import React, { useState } from "react";
import { Grid, Paper, SelectChangeEvent } from "@mui/material";
import { Carga } from "../Shared/Carga";
import { ErrorCarga } from "../Shared/ErrorCarga";
import { InputSelects } from "../Material/InputSelect";
import { dataCategoria, dataSubCategoria } from "../../utils/arrays";
import { MenuTabla } from "../Material/MenuTabla";
import { useTheme } from '@mui/material/styles';
import { MdOutlineTableChart as Tablas } from 'react-icons/md';
import { GiSoccerBall as Gol } from 'react-icons/gi';
import { GiSoccerKick as Asistir } from 'react-icons/gi';
import { TbRectangleVertical as Tarjeta } from 'react-icons/tb';
import { GiChampions as Play } from 'react-icons/gi';
import SwipeableViews from "react-swipeable-views";
import { TabPanel } from "../Material/TabPanel";
import { TablePosiciones } from "./TablePosiciones";
import { TableEstadisticas } from "./TableEstadisticas";
import { useRouter } from "next/router";
import { PlayOff } from "./PlayOff";

const opcionSelectTabla = [
    { id: 0, name: 'Posiciones', icono: <Tablas size={30} /> },
    { id: 1, name: 'Goleadores', icono: <Gol size={30} /> },
    { id: 2, name: 'Asistidores', icono: <Asistir size={30} /> },
    { id: 3, name: 'Amarillas', icono: <Tarjeta color={'var(--warnning)'} size={30} /> },
    { id: 4, name: 'Rojas', icono: <Tarjeta color={'var(--danger)'} size={30} /> },
    { id: 5, name: 'PlayOff', icono: <Play size={30} /> },
]

interface TablesCategoriasProps {
    mobile: boolean;
    light: boolean;
    isLoading: boolean;
    isError: boolean;
    data: {}[];
}

export const TablesCategorias: React.FC<TablesCategoriasProps> = ({
    light,
    mobile,
    isError,
    isLoading,
    data,
}) => {
    const [subCategoria, setSubCategoria] = useState('Elija una opción');
    const [selectCategoria, setSelectCategoria] = useState('Elija una opción');
    const [value, setValue] = useState(0);
    const theme = useTheme();
    const router = useRouter();

    const handleChange = (newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index: number) => {
        setValue(index);
    };

    const handleSelectChange = (event: SelectChangeEvent<string>) => {
        setSubCategoria(event.target.value)
    }

    const handleSelectCategoria = (event: SelectChangeEvent<string>) => {
        setSelectCategoria(event.target.value)
    }

    const filterEstadoCategoria = (array, estado, subCategoria, categoria) => {
        const newFilter = array.filter(data => data.estado == estado && data.subCategoria === subCategoria && data.categoria === categoria);
        return newFilter;
    }

    const filteredData = filterEstadoCategoria(data, 'registrado', subCategoria, selectCategoria);

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
                            Tablas
                        </Grid>
                        <Grid item container mt={2} xs={12} md={9} gap={2} alignItems={'center'} justifyContent={'center'}>
                            <Grid item container md={5}>
                                <InputSelects
                                    title="Categoria"
                                    descripcion="Seleccionar una categoria"
                                    value={selectCategoria}
                                    handleSelect={handleSelectCategoria}
                                    data={dataCategoria}
                                />
                            </Grid>
                            <Grid item container md={5}>
                                <InputSelects
                                    title="Sub-categoria"
                                    descripcion="Seleccionar una Sub-categoria"
                                    value={subCategoria}
                                    data={dataSubCategoria}
                                    handleSelect={handleSelectChange}
                                />
                            </Grid>
                        </Grid>
                        <Grid item container mt={2} xs={12} md={9} alignItems={'center'} justifyContent={'center'}>
                            <Grid item container mt={4} alignItems={'center'} justifyContent={'center'} sx={{ height: 'min-content' }}>
                                {opcionSelectTabla?.map(opcion => (
                                    <MenuTabla opcion={opcion} valueSelect={value} handleChange={handleChange} />
                                ))}
                                <Grid container sx={{ borderBottom: light ? '2px solid var(--dark2)' : '2px solid var(--gris)', marginTop: '0px' }}></Grid>
                            </Grid>
                            <SwipeableViews axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'} index={value} onChangeIndex={handleChangeIndex}>
                                <TabPanel value={value} index={0} dir={theme.direction}>
                                    <Grid item mt={4} xs={12} md={12} container sx={{ width: '120vh', }} >
                                        <TablePosiciones
                                            data={filteredData}
                                            titleTable={subCategoria}
                                            SubTitle={selectCategoria}
                                            isLoading={isLoading}
                                            light={light}
                                            mobile={mobile}
                                        />
                                    </Grid>
                                </TabPanel>
                                <TabPanel value={value} index={1} dir={theme.direction}>
                                    <Grid item mt={4} xs={12} md={12} container sx={{ width: '120vh', }} >
                                        <TableEstadisticas
                                            data={filteredData}
                                            titleTable={subCategoria}
                                            SubTitle={selectCategoria}
                                            light={light}
                                            mobile={mobile}
                                            nameEstadistida="Goles"
                                            router={router}
                                        />
                                    </Grid>
                                </TabPanel>
                                <TabPanel value={value} index={2} dir={theme.direction}>
                                    <Grid item mt={4} xs={12} md={12} container sx={{ width: '120vh', }} >
                                        <TableEstadisticas
                                            data={filteredData}
                                            titleTable={subCategoria}
                                            SubTitle={selectCategoria}
                                            light={light}
                                            mobile={mobile}
                                            nameEstadistida="Asistencias"
                                            router={router}
                                        />
                                    </Grid>
                                </TabPanel>
                                <TabPanel value={value} index={3} dir={theme.direction}>
                                    <Grid item mt={4} xs={12} md={12} container sx={{ width: '120vh', }} >
                                        <TableEstadisticas
                                            data={filteredData}
                                            titleTable={subCategoria}
                                            SubTitle={selectCategoria}
                                            light={light}
                                            mobile={mobile}
                                            nameEstadistida="Amarillas"
                                            router={router}
                                        />
                                    </Grid>
                                </TabPanel>
                                <TabPanel value={value} index={4} dir={theme.direction}>
                                    <Grid item mt={4} xs={12} md={12} container sx={{ width: '120vh', }} >
                                        <TableEstadisticas
                                            data={filteredData}
                                            titleTable={subCategoria}
                                            SubTitle={selectCategoria}
                                            light={light}
                                            mobile={mobile}
                                            nameEstadistida="Rojas"
                                            router={router}
                                        />
                                    </Grid>
                                </TabPanel>
                                <TabPanel value={value} index={5} dir={theme.direction}>
                                    <Grid item mt={4} xs={12} md={12} container sx={{ width: '120vh', }} >
                                        <PlayOff
                                            data={filteredData}
                                            titleTable={subCategoria}
                                            SubTitle={selectCategoria}
                                            light={light}
                                            mobile={mobile}
                                            nameEstadistida="Play-off"

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