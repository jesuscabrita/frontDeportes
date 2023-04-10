import { Grid, useMediaQuery } from "@mui/material";
import { PositionTable } from "../components/Shared/Table";
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useContext, useState } from "react";
import { TablaGoleadores } from "../components/Shared/TablaGoleadores";
import data from '../utils/data.json';
import { TablaAsistidores } from "../components/Shared/TablaAsistidores";
import { TablaAmarillas } from "../components/Shared/TablaAmarillas";
import { TablaRojas } from "../components/Shared/TablaRojas";
import { TabPanel } from "../components/Shared/TabPanel";
import Context from "../context/contextPrincipal";
import { MdOutlineTableChart as Tablas } from 'react-icons/md';
import { GiSoccerBall as Gol } from 'react-icons/gi';
import { GiSoccerKick as Asistir } from 'react-icons/gi';

const Tabla = () => {
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });
    const theme = useTheme();
    const [value, setValue] = useState(0);
    const [light] = useContext(Context);

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

    return (
        <Grid sx={{ height: !mobile ? '170vh' : '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Grid item sx={{ paddingTop: !mobile ? value == 0 ? '80px' : '10px' : '80px', maxWidth: '95%', marginTop: value == 1 || value == 2 || value == 3 || value == 4 ? mobile ? '0px': '-200px': '0px' }}>
              <Tabs value={value} onChange={handleChange} textColor="inherit" variant="fullWidth" sx={{'& .MuiTabs-indicator':{backgroundColor:light?'var(--primario)':'var(--cero)'}}}>
                <Tab sx={{fontSize:mobile ? '10px' : '14px', color : light ? 'var(--dark2)':'var(--cero)', display:'flex', flexDirection:'row', alignItems:'center', gap:'10px'}} label={!mobile ? <><Tablas size={20}/> Posiciones</> : <Tablas size={20}/>}  {...a11yProps(0)} />
                <Tab sx={{fontSize:mobile ? '10px' : '14px', color : light ? 'var(--dark2)':'var(--cero)', display:'flex', flexDirection:'row', alignItems:'center', gap:'10px'}} label={!mobile ? <><Gol size={20}/> Goleadores</>: <Gol size={20}/>} {...a11yProps(1)} />
                <Tab sx={{fontSize:mobile ? '10px' : '14px', color : light ? 'var(--dark2)':'var(--cero)', display:'flex', flexDirection:'row', alignItems:'center', gap:'10px'}} label={!mobile ?<><Asistir size={20}/> Asistidores</>: <Asistir size={20}/>} {...a11yProps(2)} />
                <Tab sx={{fontSize:mobile ? '10px' : '14px', color : light ? 'var(--dark2)':'var(--cero)', display:'flex', flexDirection:'row', alignItems:'center', gap:'10px'}} label={!mobile ?<><Grid sx={{background:'var(--warnning)', height:'15px', width:'11px', borderRadius:'2px'}} /> Amarillas</>: <Grid sx={{background:'var(--warnning)', height:'15px', width:'11px', borderRadius:'2px'}} />} {...a11yProps(3)} />
                <Tab sx={{fontSize:mobile ? '10px' : '14px', color : light ? 'var(--dark2)':'var(--cero)', display:'flex', flexDirection:'row', alignItems:'center', gap:'10px'}} label={!mobile ?<><Grid sx={{background:'var(--danger)', height:'15px', width:'11px', borderRadius:'2px'}} /> Rojas</> : <Grid sx={{background:'var(--danger)', height:'15px', width:'11px', borderRadius:'2px'}} />} {...a11yProps(4)} />
              </Tabs>
              <SwipeableViews axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'} index={value} onChangeIndex={handleChangeIndex}>
                <TabPanel value={value} index={0} dir={theme.direction}>
                  <PositionTable />
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                  <TablaGoleadores data={data} />
                </TabPanel>
                <TabPanel value={value} index={2} dir={theme.direction}>
                  <TablaAsistidores data={data}/>
                </TabPanel>
                <TabPanel value={value} index={3} dir={theme.direction}>
                  <TablaAmarillas data={data}/>
                </TabPanel>
                <TabPanel value={value} index={4} dir={theme.direction}>
                  <TablaRojas data={data}/>
                </TabPanel>
              </SwipeableViews>
            </Grid>
        </Grid>
    );
};
export default Tabla;