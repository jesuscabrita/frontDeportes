import { Grid, useMediaQuery } from "@mui/material";
import { PositionTable } from "../components/Shared/Table";
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import { useContext, useState } from "react";
import { TablaGoleadores } from "../components/Shared/TablaGoleadores";
import { TablaAsistidores } from "../components/Shared/TablaAsistidores";
import { TablaAmarillas } from "../components/Shared/TablaAmarillas";
import { TablaRojas } from "../components/Shared/TablaRojas";
import { TabPanel } from "../components/MaterialUi/TabPanel";
import Context from "../context/contextPrincipal";
import { MdOutlineTableChart as Tablas } from 'react-icons/md';
import { GiSoccerBall as Gol } from 'react-icons/gi';
import { GiSoccerKick as Asistir } from 'react-icons/gi';
import { TbRectangleVertical as Tarjeta } from 'react-icons/tb';
import { MenuTabla } from "../components/MaterialUi/MenuTabla";
import { LogoRegister } from "../components/Shared/LogoRegister";
import { useQuery } from "react-query";
import { equiposGet } from "../service/equipos";
import { filterEstado } from "../utils/utils";

const opcionSelect = [
    { id: 0, name: 'Posiciones', icono: <Tablas size={30} /> },
    { id: 1, name: 'Goleadores', icono: <Gol size={30} /> },
    { id: 2, name: 'Asistidores', icono: <Asistir size={30} /> },
    { id: 3, name: 'Amarillas', icono: <Tarjeta color={'var(--warnning)'} size={30} /> },
    { id: 4, name: 'Rojas', icono: <Tarjeta color={'var(--danger)'} size={30} /> },
]

const Tabla = () => {
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });
    const theme = useTheme();
    const [value, setValue] = useState(0);
    const [light] = useContext(Context);
    const [data, setData] = useState([]);

    const handleChange = (newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index: number) => {
        setValue(index);
    };

    const { isLoading, isError } = useQuery(["/api/liga"], equiposGet, {
        refetchOnWindowFocus: false,
        onSuccess: (data) => {
            setData(data);
        },
    })

    return (
    <>
        <Grid item sx={{ height: !mobile ? '160vh' : '100%', width: '100%', paddingTop: '90px', }}>
            <Grid item sx={{ padding: '18px', width: '100%' }}>
                <Grid item container justifyContent={'center'}>
                    <LogoRegister name={'Tablas'} />
                </Grid>
                <Grid item container sx={{ height: 'min-content' }}>
                    {opcionSelect.map(opcion => (
                        <MenuTabla opcion={opcion} valueSelect={value} handleChange={handleChange} />
                    ))}
                    <Grid container sx={{ borderBottom: light ? '2px solid var(--gris)' : '2px solid var(--neutral)', marginTop: '-10px' }}></Grid>
                </Grid>
                <SwipeableViews axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'} index={value} onChangeIndex={handleChangeIndex}>
                    <TabPanel value={value} index={0} dir={theme.direction}>
                        <PositionTable data={filterEstado(data, 'registrado')} isLoading={isLoading} isError={isError} />
                    </TabPanel>
                    <TabPanel value={value} index={1} dir={theme.direction}>
                        <TablaGoleadores data={filterEstado(data, 'registrado')} isLoading={isLoading} isError={isError}/>
                    </TabPanel>
                    <TabPanel value={value} index={2} dir={theme.direction}>
                        <TablaAsistidores data={filterEstado(data, 'registrado')} isLoading={isLoading} isError={isError} />
                    </TabPanel>
                    <TabPanel value={value} index={3} dir={theme.direction}>
                        <TablaAmarillas data={filterEstado(data, 'registrado')} isLoading={isLoading} isError={isError} />
                    </TabPanel>
                    <TabPanel value={value} index={4} dir={theme.direction}>
                        <TablaRojas data={filterEstado(data, 'registrado')} isLoading={isLoading} isError={isError} />
                    </TabPanel>
                </SwipeableViews>
            </Grid>
        </Grid>
    </>
    );
};
export default Tabla;