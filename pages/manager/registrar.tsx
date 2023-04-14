import { CircularProgress, Grid, Tab, Tabs, useMediaQuery } from "@mui/material";
import { Form } from "../../components/form/Form";
import { useContext, useState } from "react";
import Context from "../../context/contextPrincipal";
import { ListaEquipoRegistro } from "../../components/Shared/ListaEquipoRegistro";
import { useQuery } from "react-query";
import { equiposGet } from "../../service/equipos";
import { GiSandsOfTime as Espera } from 'react-icons/gi';
import SwipeableViews from "react-swipeable-views";
import { useTheme } from '@mui/material/styles';
import { TabPanel } from "../../components/Shared/TabPanel";
import { FaRegistered as Register } from 'react-icons/fa';

const Registrar = () => {
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });
    const [light] = useContext(Context);
    const [data, setData] = useState([]);
    const [value, setValue] = useState(0);
    const theme = useTheme();

    const { isLoading, isError } = useQuery(["/api/liga"], equiposGet, {
        refetchOnWindowFocus: false,
        onSuccess: (data) => {
            setData(data);
        },
    })

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index: number) => {
        setValue(index);
    };

    function a11yProps(index: number) {
        return {
            id: `full-width-tab-${index}`,
            'aria-controls': `full-width-tabpanel-${index}`,
        };
    }

    const filterEstado =(array, estado)=>{
        const newFilter = array.filter(data => data.estado == estado);
        return newFilter;
    }


    return (
        <Grid sx={{ height: !mobile ? '170vh' : '100%', }}>
            <Grid container flexDirection={'column'} sx={{ paddingTop: !mobile ? '100px' : '90px', paddingBottom: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
                <Grid item mb={4} sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <Grid item sx={{ fontSize: '28px', color: light ? 'var(--dark2)' : 'var(--cero)' }}>Registrar equipo</Grid>
                    <img
                        className="block h-14 w-auto lg:hidden"
                        src={light ?
                            "https://assets.laliga.com/assets/logos/laliga-v/laliga-v-1200x1200.png" :
                            "https://assets.laliga.com/assets/logos/laliga-v-negativo-monocolor/laliga-v-negativo-monocolor-1200x1200.png"
                        }
                        alt="Your Company"
                    />
                    <img
                        className="hidden h-14 w-auto lg:block"
                        src={light ?
                            "https://assets.laliga.com/assets/logos/laliga-v/laliga-v-1200x1200.png" :
                            "https://assets.laliga.com/assets/logos/laliga-v-negativo-monocolor/laliga-v-negativo-monocolor-1200x1200.png"
                        }
                        alt="Your Company"
                    />
                </Grid>
                <Form />
                <Grid item mt={4}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        textColor="inherit"
                        variant={!mobile ? "fullWidth" : "scrollable"}
                        sx={{
                            '& .MuiTabs-indicator': { backgroundColor: light ? 'var(--primario)' : 'var(--cero)' },
                            '& .MuiTab-root': {
                                minWidth: '70px',
                                width: 'auto',
                                padding: '8px',
                            }, '.MuiTabs-scroller': {
                                display: mobile && 'flex',
                                justifyContent: mobile && 'center'
                            }
                        }}>
                        <Tab
                            label={!mobile ? <><Register size={30} /> Equipos en la liga</> : <Register size={20} />}
                            {...a11yProps(0)}
                            sx={{
                                whiteSpace: 'nowrap',
                                fontSize: mobile ? '10px' : '14px',
                                color: light ? 'var(--dark2)' : 'var(--cero)',
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: '10px',
                                background: value == 0 ? (light ? 'var(--gris)' : 'var(--dark2)') : 'transparent',
                                '&:hover': {
                                    background: value == 0 ? light ? 'var(--gris)' : 'var(--dark2)' : 'rgba(0, 0, 0, 0.04)',
                                },
                            }}
                        />
                        <Tab
                            label={!mobile ? <><Espera size={20} /> Equipos en cola</> : <Espera size={20} />}
                            {...a11yProps(1)}
                            sx={{
                                whiteSpace: 'nowrap',
                                fontSize: mobile ? '10px' : '14px',
                                color: light ? 'var(--dark2)' : 'var(--cero)',
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: '10px',
                                background: value == 1 ? (light ? 'var(--gris)' : 'var(--dark2)') : 'transparent',
                                '&:hover': {
                                    background: value == 1 ? light ? 'var(--gris)' : 'var(--dark2)' : 'rgba(0, 0, 0, 0.04)',
                                },
                            }}
                        />
                    </Tabs>
                    <SwipeableViews axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'} index={value} onChangeIndex={handleChangeIndex}>
                        <TabPanel value={value} index={0} dir={theme.direction}>
                        <Grid sx={{
                            width:'100%',
                            display: 'grid',
                            gridTemplateColumns: !mobile ? 'repeat(5, 1fr)' : 'repeat(2, 1fr)',
                            gap: '20px',
                            }}>
                            {isLoading ?
                                <CircularProgress color="primary" />
                                : isError ? <div>Ha ocurrido un error al cargar los equipos</div>
                                    : filterEstado(data,'registrado').length === 0 ? <div>No hay equipos registrados</div>
                                        : filterEstado(data,'registrado').map((equipo, index) => {
                                            return (
                                                <ListaEquipoRegistro data={equipo} key={index} isLoading={isLoading} />
                                            )
                                        })}
                        </Grid>
                        </TabPanel>
                        <TabPanel value={value} index={1} dir={theme.direction}>
                        <Grid sx={{
                            width:'100%',
                            display: 'grid',
                            gridTemplateColumns: !mobile ? 'repeat(5, 1fr)' : 'repeat(2, 1fr)',
                            gap: '20px',
                            }}>
                        {isLoading ?
                                <CircularProgress color="primary" />
                                : isError ? <div>Ha ocurrido un error al cargar los equipos</div>
                                    : filterEstado(data,'enCola').length === 0 ? <div>No hay equipos en cola</div>
                                        : filterEstado(data,'enCola').map((equipo, index) => {
                                            return (
                                                <ListaEquipoRegistro data={equipo} key={index} isLoading={isLoading} />
                                            )
                                        })}
                        </Grid>
                        </TabPanel>
                    </SwipeableViews>
                </Grid>
            </Grid>
        </Grid>
    );
};
export default Registrar;