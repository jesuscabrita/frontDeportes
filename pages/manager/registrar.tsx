import { CircularProgress, Grid, useMediaQuery } from "@mui/material";
import { Form } from "../../components/form/Form";
import { useContext, useState } from "react";
import Context from "../../context/contextPrincipal";
import { ListaEquipoRegistro } from "../../components/Shared/ListaEquipoRegistro";
import { useQuery } from "react-query";
import { equiposGet } from "../../service/equipos";
import { GiSandsOfTime as Espera } from 'react-icons/gi';
import SwipeableViews from "react-swipeable-views";
import { useTheme } from '@mui/material/styles';
import { TabPanel } from "../../components/MaterialUi/TabPanel";
import { FaRegistered as Register } from 'react-icons/fa';
import { TbMoodEmpty as Vacio } from 'react-icons/tb';
import { MenuTabla } from "../../components/MaterialUi/MenuTabla";
import { LogoRegister } from "../../components/Shared/LogoRegister";
import { TbError404 as Err404 } from 'react-icons/tb';
import { filterEstado } from "../../utils/utils";

const opcionSelectEquipos =[
    {id:0, name: 'Equipos en la liga', icono: <Register size={30} />},
    {id:1, name: 'Equipos en cola', icono: <Espera size={20} /> }
]

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

    const handleChange = (newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index: number) => {
        setValue(index);
    };

    return (
        <Grid sx={{ height: !mobile ? '180vh' : '100%', }}>
            <Grid container flexDirection={'column'} sx={{ paddingTop: !mobile ? '100px' : '90px', paddingBottom: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
                <LogoRegister name={'Registrar equipo'}/>
                <Form />
                <Grid item mt={4}>
                    <Grid item container sx={{height:'min-content'}}>
                        {opcionSelectEquipos.map(opcion =>(
                            <MenuTabla opcion={opcion} valueSelect={value} handleChange={handleChange}/>
                        ))}
                        <Grid container sx={{borderBottom:light?  '2px solid var(--gris)' : '2px solid var(--neutral)', marginTop:'-10px'}}></Grid>
                    </Grid>
                    <SwipeableViews axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'} index={value} onChangeIndex={handleChangeIndex}>
                        <TabPanel value={value} index={0} dir={theme.direction}>
                            <Grid mt={2} sx={{
                                width: '100%',
                                display:filterEstado(data, 'registrado').length === 0 || isError || isLoading ? 'flex' : 'grid',
                                gridTemplateColumns: !mobile ? 'repeat(5, 1fr)' : 'repeat(2, 1fr)',
                                gap: '20px',
                            }}>
                            {isLoading ?
                                <Grid mt={8} item sx={{ 
                                    display: 'flex', 
                                    flexDirection: 'row', 
                                    gap: '16px',
                                    minWidth:!mobile? '960px':'100%',
                                    height:mobile &&'300px', 
                                    justifyContent:'center',
                                    color:light ? 'var(--dark2)': 'var(--cero)'
                                    }}>
                                    <CircularProgress style={{color:light ? 'var(--dark2)': 'var(--cero)'}} />
                                </Grid>
                            : isError ? 
                                <Grid mt={mobile ? 0: 8} item sx={{ 
                                    display: 'flex', 
                                    flexDirection: 'column', 
                                    gap: '16px',
                                    minWidth:!mobile? '960px':'100%',
                                    height:mobile &&'300px', 
                                    justifyContent:'center',
                                    alignItems:'center',
                                    color:light ? 'var(--dark2)': 'var(--cero)'
                                    }}>
                                    Ha ocurrido un error al cargar los equipos <Err404 size={85}/>
                                </Grid>
                            : filterEstado(data, 'registrado').length === 0 ? 
                                <Grid mt={8} item sx={{ 
                                    display: 'flex', 
                                    flexDirection: 'row', 
                                    gap: '16px',
                                    minWidth:!mobile? '960px':'100%',
                                    height:mobile &&'300px', 
                                    justifyContent:'center',
                                    color:light ? 'var(--dark2)': 'var(--cero)'
                                    }}>
                                    No hay equipos en la liga <Vacio size={25} />
                                </Grid>
                            : filterEstado(data, 'registrado').map((equipo, index) => (
                                    <Grid key={index}>
                                        <ListaEquipoRegistro data={equipo} isLoading={isLoading} />
                                    </Grid>
                                ))
                            }
                            </Grid>
                        </TabPanel>
                        <TabPanel value={value} index={1} dir={theme.direction} >
                            <Grid mt={2} sx={{
                                width:'100%',
                                display:filterEstado(data, 'enCola').length === 0 || isError || isLoading ? 'flex' : 'grid',
                                gridTemplateColumns: !mobile ? 'repeat(5, 1fr)' : 'repeat(2, 1fr)',
                                gap: '20px',
                            }}>
                            {isLoading ?
                                <Grid mt={8} item sx={{ 
                                    display: 'flex', 
                                    flexDirection: 'row', 
                                    gap: '16px',
                                    minWidth:!mobile? '960px':'100%',
                                    height:mobile &&'300px', 
                                    justifyContent:'center',
                                    color:light ? 'var(--dark2)': 'var(--cero)'
                                    }}>
                                    <CircularProgress style={{color:light ? 'var(--dark2)': 'var(--cero)'}} />
                                </Grid>
                            : isError ? 
                                <Grid mt={mobile ? 0: 8} item sx={{ 
                                    display: 'flex', 
                                    flexDirection: 'column', 
                                    gap: '16px',
                                    minWidth:!mobile? '960px':'100%',
                                    height:mobile &&'300px', 
                                    justifyContent:'center',
                                    alignItems:'center',
                                    color:light ? 'var(--dark2)': 'var(--cero)'
                                    }}>
                                    Ha ocurrido un error al cargar los equipos <Err404 size={85}/>
                                </Grid>
                            : filterEstado(data, 'enCola').length === 0 ? 
                                <Grid mt={8} item sx={{ 
                                    display: 'flex', 
                                    flexDirection: 'row', 
                                    gap: '16px',
                                    minWidth:!mobile? '960px':'100%',
                                    height:mobile &&'300px', 
                                    justifyContent:'center',
                                    color:light ? 'var(--dark2)': 'var(--cero)'
                                    }}>
                                    No hay equipos en cola <Vacio size={25} />
                                </Grid>
                            : filterEstado(data, 'enCola').map((equipo, index) => (
                                    <Grid key={index}>
                                        <ListaEquipoRegistro data={equipo} isLoading={isLoading} />
                                    </Grid>
                                ))
                            }
                            </Grid>
                        </TabPanel>
                    </SwipeableViews>
                </Grid>                   
            </Grid>
        </Grid>
    );
};
export default Registrar;