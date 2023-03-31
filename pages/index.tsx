import { Box, Grid, useMediaQuery } from "@mui/material";
import { useContext, useState } from "react";
import Context from "../context/contextPrincipal";
import { Equipos } from "../components/Shared/Equipos";
import Tabs from '@mui/material/Tabs'

const Index = () => {
    const [light] = useContext(Context);
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });
    const [valueTabs, setValueTabs] =useState(0)

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
                        width: 'inherit',flexGrow: 1,paddingLeft:'20px',
                        '& .MuiSvgIcon-fontSizeSmall': { color: light ? 'black' : 'white' },
                        '& .MuiTabs-flexContainer': { gap: '16px' },
                        '& .MuiTabs-indicator': {backgroundColor:'inherit'}
                    }}>
                    <Equipos/>
                </Tabs>
                </Box>
        </Grid>
    </Grid>
    );
};
export default Index;