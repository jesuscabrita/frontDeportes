import { CircularProgress, Grid, useMediaQuery } from "@mui/material"
import { useContext, useEffect, useState } from "react";
import Context from "../../context/contextPrincipal";
import { TbRectangleVertical as Tarjeta } from 'react-icons/tb';
import  { BsArrowsCollapse as Position } from 'react-icons/bs';
import { GrInstagram as Instagram } from 'react-icons/gr';
import { HiOutlineMail as Email } from 'react-icons/hi';
import { BiCategoryAlt as Categoria } from 'react-icons/bi';
import { TbSoccerField as Estadio } from 'react-icons/tb';
import { MdOutlineManageAccounts as Delegado } from 'react-icons/md';
import { AiOutlineNumber as Puntos } from 'react-icons/ai';
import { FaEquals as Empate } from 'react-icons/fa';
import { MdVerified as Ganado } from 'react-icons/md';
import { AiOutlineCloseCircle as Perdido } from 'react-icons/ai';
import { MenuTabla } from "../MaterialUi/MenuTabla";
import { TbTemplate as Plantilla } from 'react-icons/tb';
import { GiSoccerKick as Asistir } from 'react-icons/gi';
import { GiSoccerBall as Goles } from 'react-icons/gi';
import { BiTransfer as Fichaje } from 'react-icons/bi';
import SwipeableViews from "react-swipeable-views";
import { useTheme } from '@mui/material/styles';
import { TabPanel } from "../MaterialUi/TabPanel";
import { ModalJugador } from "../modals/ModalJugador";
import { TablaPlantilla } from "../MaterialUi/TablaPlantilla";
import { TablaEstadisticas } from "../MaterialUi/TablaEstadisticas";

const opcionSelectEquipo =[
    {id:0, name: 'Plantilla', icono: <Plantilla size={30} />},
    {id:1, name: 'Goles', icono: <Goles size={30} />},
    {id:2, name: 'Asistencias', icono: <Asistir size={30} />},
    {id:3, name: 'Amarillas', icono: <Tarjeta color={'var(--warnning)'} size={30}/>},
    {id:4, name: 'Rojas', icono: <Tarjeta color={'var(--danger)'} size={30}/>},
    {id:5, name: 'Fichajes', icono: <Fichaje size={30} />},
]

export const EquipoDetalle =({data, isLoading})=>{
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });
    const [light] = useContext(Context);
    const [showImage, setShowImage] = useState(false);
    const [value, setValue] = useState(0);
    const theme = useTheme();
    const [modalJugador, setModalJugador] = useState(false);

    const handleChange = (newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index: number) => {
        setValue(index);
    };

    useEffect(() => {
        if (!isLoading) {
            const timeoutId = setTimeout(() => {
                setShowImage(true);
            }, 1500);
            return () => clearTimeout(timeoutId);
        }
    }, [isLoading]);

    return (
        <>
        <Grid container sx={{ 
                border: light ? '1px solid var(--dark2)' : '1px solid var(--neutral)',
                borderRadius: '8px',
                padding:'8px',
                flexDirection:'row',
                gap:'20px',
                alignItems:'center',
            }}>
                <Grid sx={{fontSize:!mobile?'20px':'12px', display:'flex', flexDirection:'row',gap:'20px', alignItems:'center', whiteSpace: 'nowrap'}}>
                    <Grid container flexDirection={'column'} justifyContent={'center'} alignItems={'center'} sx={{
                        borderRadius: '8px',
                        height: '150px',
                        width: '150px',
                        background: light ? 'var(--gris)' : 'var(--dark2)',
                    }}>
                        <Grid item>
                            {isLoading || !showImage ? 
                                (<CircularProgress style={{color:light ? 'var(--dark2)': 'var(--cero)'}} size={30} />) 
                            :    showImage ? <img src={data?.logo} alt={data?.name} style={{ height: '80px' }} /> 
                            : null}
                        </Grid>
                    </Grid>
                    <Grid sx={{display:'flex', flexDirection:'column',color: light ?'var(--dark2)':'var(--neutral)'}}>
                        <Grid sx={{display:'flex', flexDirection:'row', alignItems:'center', gap:'8px'}}><Position color={light ? 'var(--dark2)': 'var(--cero)'}/>Posicion: #1</Grid>
                        <Grid sx={{display:'flex', flexDirection:'row', alignItems:'center', gap:'8px'}}><Instagram size={!mobile ?17: 10} color={light ? 'var(--dark2)': 'var(--cero)'}/> Intagram: {!data?.instagram ? 'No definido' : data?.instagram}</Grid>
                        <Grid sx={{display:'flex', flexDirection:'row', alignItems:'center', gap:'8px'}}><Email color={light ? 'var(--dark2)': 'var(--cero)'}/> {!data?.correo ? 'No definido' : data?.correo}</Grid>
                    </Grid>
                </Grid>
                <Grid sx={{display:'flex', flexDirection:'column',color: light ?'var(--dark2)':'var(--neutral)',fontSize:!mobile?'20px':'14px'}}>
                    <Grid sx={{display:'flex', flexDirection:'row', alignItems:'center', gap:'8px'}}><Categoria color={light ? 'var(--dark2)': 'var(--cero)'}/>categoria: {!data?.categoria ? 'No definido': data?.categoria }</Grid>
                    <Grid sx={{display:'flex', flexDirection:'row', alignItems:'center', gap:'8px'}}><Estadio color={light ? 'var(--dark2)': 'var(--cero)'}/>Estadio: {!data?.estadio ? 'No definido' : data?.estadio }</Grid>
                    <Grid sx={{display:'flex', flexDirection:'row', alignItems:'center', gap:'8px'}}><Delegado color={light ? 'var(--dark2)': 'var(--cero)'}/> delegado: {!data?.delegado.name ? 'No definido': data?.delegado.name }</Grid>
                </Grid>
                <Grid sx={{display:'flex', flexDirection:'column',color: light ?'var(--dark2)':'var(--neutral)',fontSize:!mobile?'20px':'14px'}}>
                    <Grid sx={{display:'flex', flexDirection:'row', alignItems:'center', gap:'8px'}}><Tarjeta color={'var(--warnning)'}/>tarjetas amarillas:{data?.tarjetasAmarillas}</Grid>
                    <Grid sx={{display:'flex', flexDirection:'row', alignItems:'center', gap:'8px'}}><Tarjeta color={'var(--danger)'}/>tarjetas rojas: {data?.tarjetasRojas}</Grid>
                    <Grid sx={{display:'flex', flexDirection:'row', alignItems:'center', gap:'8px'}}><Puntos color={light ? 'var(--dark2)': 'var(--cero)'}/>puntos: {data?.puntos}</Grid>
                </Grid>
                <Grid sx={{display:'flex', flexDirection:'column',color: light ?'var(--dark2)':'var(--neutral)',fontSize:!mobile?'20px':'14px'}}>
                    <Grid sx={{display:'flex', flexDirection:'row', alignItems:'center', gap:'8px'}}><Empate color={light ? 'var(--dark2)': 'var(--cero)'}/>Empates:{data?.empates}</Grid>
                    <Grid sx={{display:'flex', flexDirection:'row', alignItems:'center', gap:'8px'}}><Ganado color={light ? 'var(--dark2)': 'var(--cero)'}/>Ganados: {data?.ganados}</Grid>
                    <Grid sx={{display:'flex', flexDirection:'row', alignItems:'center', gap:'8px'}}><Perdido color={light ? 'var(--dark2)': 'var(--cero)'}/>perdidos: {data?.perdidos}</Grid>
                </Grid>
                <Grid sx={{display:'flex', flexDirection:'column',color: light ?'var(--dark2)':'var(--neutral)',fontSize:!mobile?'20px':'14px'}}>
                    <Grid sx={{display:'flex', flexDirection:'row', alignItems:'center', gap:'8px'}}><Empate color={light ? 'var(--dark2)': 'var(--cero)'}/>Goles en total:{data?.goles_a_Favor}</Grid>
                    <Grid sx={{display:'flex', flexDirection:'row', alignItems:'center', gap:'8px'}}><Ganado color={light ? 'var(--dark2)': 'var(--cero)'}/>Goles en contra: {data?.goles_en_Contra}</Grid>
                    <Grid sx={{display:'flex', flexDirection:'row', alignItems:'center', gap:'8px'}}><Perdido color={light ? 'var(--dark2)': 'var(--cero)'}/>Diferencia de goles: {data?.diferencia_de_Goles}</Grid>
                </Grid>
        </Grid>
        <Grid mt={3} item container sx={{height:'min-content'}}>
            {opcionSelectEquipo.map(opcion =>(
                <MenuTabla opcion={opcion} valueSelect={value} handleChange={handleChange}/>
            ))}
            <Grid container sx={{borderBottom:light?  '2px solid var(--gris)' : '2px solid var(--neutral)', marginTop:'-10px'}}></Grid>
        </Grid>
        <SwipeableViews axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'} index={value} onChangeIndex={handleChangeIndex}>
            <TabPanel value={value} index={0} dir={theme.direction}>
                <Grid onClick={()=>{setModalJugador(!modalJugador)}}>Plantilla</Grid>
                <TablaPlantilla jugadores={data.jugadores} equipo={data} isLoading={isLoading}/>
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
                <TablaEstadisticas jugadores={data.jugadores} label={'Goles'}/>
            </TabPanel>
            <TabPanel value={value} index={2} dir={theme.direction}>
                <TablaEstadisticas jugadores={data.jugadores} label={'Asistencias'}/>
            </TabPanel>
            <TabPanel value={value} index={3} dir={theme.direction}>
                <TablaEstadisticas jugadores={data.jugadores} label={'Tarjetas amarillas'}/>
            </TabPanel>
            <TabPanel value={value} index={4} dir={theme.direction}>
                <TablaEstadisticas jugadores={data.jugadores} label={'Tarjetas rojas'}/>
            </TabPanel>
            <TabPanel value={value} index={5} dir={theme.direction}>
                Fichajes
            </TabPanel>
        </SwipeableViews>
        {modalJugador && <ModalJugador open={modalJugador} setOpen={setModalJugador} id={data?._id}/>}
        </>
    )
}