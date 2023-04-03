import { Grid, useMediaQuery } from "@mui/material";
import { PositionTable } from "../components/Shared/Table";
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useState } from "react";
import { TablaGoleadores } from "../components/Shared/TablaGoleadores";
import data from '../utils/data.json';
import { TablaAsistidores } from "../components/Shared/TablaAsistidores";
import { TablaAmarillas } from "../components/Shared/TablaAmarillas";
import { TablaRojas } from "../components/Shared/TablaRojas";

interface TabPanelProps {
    children?: React.ReactNode;
    dir?: string;
    index: number;
    value: number;
}

const TabPanel=(props: TabPanelProps)=> {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

const Tabla = () => {
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });
    const theme = useTheme();
    const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

    return (
        <Grid sx={{ height: !mobile ? '170vh' : '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Grid item sx={{ paddingTop: !mobile ? '10px' : '80px', maxWidth: '95%' }}>
              <Tabs value={value} onChange={handleChange} textColor="inherit" variant="fullWidth">
                <Tab label="Posiciones" {...a11yProps(0)} />
                <Tab label="Goleadores" {...a11yProps(1)} />
                <Tab label="Asistidores" {...a11yProps(2)} />
                <Tab label="Amarillas" {...a11yProps(3)} />
                <Tab label="Rojas" {...a11yProps(4)} />
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