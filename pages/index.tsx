import { Box, CircularProgress, Grid, useMediaQuery } from "@mui/material";
import { useContext, useState } from "react";
import Context from "../context/contextPrincipal";
import { Equipos } from "../components/Shared/Equipos";
import Tabs from '@mui/material/Tabs'
import { LiveMatches } from "../components/Shared/LiveMatches";
import { useQuery } from "react-query";
import { equiposGet } from "../service/equipos";
import { TbError404 as Err404 } from 'react-icons/tb';
import { filterEstado } from "../utils/utils";
import { TbMoodEmpty as Vacio } from 'react-icons/tb';

const Index = () => {
    const [light] = useContext(Context);
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });
    const [valueTabs, setValueTabs] = useState(0);
    const [data, setData] = useState([]);

    const { isLoading, isError } = useQuery(["/api/liga"], equiposGet, {
        refetchOnWindowFocus: false,
        onSuccess: (data) => {
            setData(data);
        },
    })

    return (
    <Grid container sx={{height:'120vh', }}>
        <Grid container columnSpacing={4} sx={{paddingTop:'80px'}}>
            <Box sx={{ overflowX: 'auto' }}>
                <Tabs
                    value={valueTabs}
                    onChange={(_, newValue) => setValueTabs(newValue)}
                    variant="scrollable"
                    allowScrollButtonsMobile={true}
                    scrollButtons={true}
                    sx={{
                        width: isError||isLoading ||filterEstado(data, 'registrado').length === 0? mobile? '100%':'1500px': 'inherit',flexGrow: 1,paddingLeft:'20px', 
                        '& .MuiSvgIcon-fontSizeSmall': { color: light ? 'black' : 'white' },
                        '& .MuiTabs-flexContainer': { gap: '16px' },
                        '& .MuiTabs-indicator': { backgroundColor:'inherit' }
                    }}>
                    {isLoading ?
                    <Grid item sx={{
                        display:'flex', 
                        alignItems:'center', 
                        justifyContent:'center', 
                        width:'100%',
                        color:light ?'var(--dark2)':'var(--cero)',
                    }}>
                        <CircularProgress style={{color:light ? 'var(--dark2)': 'var(--cero)'}} size={30} />
                    </Grid>
                    :isError ?
                    <Grid item sx={{
                        display:'flex', 
                        alignItems:'center', 
                        justifyContent:'center', 
                        width:'100%',
                        color:light ?'var(--dark2)':'var(--cero)',
                    }}>
                        Ha ocurrido un error al cargar los equipos <Err404 size={45}/>
                    </Grid>
                    :filterEstado(data, 'registrado').length === 0 ?
                    <Grid item sx={{
                        display:'flex', 
                        alignItems:'center', 
                        justifyContent:'center', 
                        width:'100%',
                        color:light ?'var(--dark2)':'var(--cero)',
                    }}>
                        No hay equipos en la liga <Vacio size={25} />
                    </Grid>
                    :<Equipos data={filterEstado(data, 'registrado')}/>}
                </Tabs>
            </Box>
        </Grid>
        <LiveMatches/>
    </Grid>
    );
};
export default Index;