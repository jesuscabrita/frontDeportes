import React, { useContext, useState } from "react";
import { Box, Grid, Tabs, useMediaQuery } from "@mui/material";
import { Equipos } from "../components/home/Equipos/Equipos";
import { LiveMatches } from "../components/Shared/LiveMatches";
import { useQuery } from "react-query";
import { equiposGet } from "../service/equipos";
import { filterEstado } from "../utils/utils";
import Context from "../context/contextPrincipal";

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
        <Grid container sx={{ height: '120vh', }}>
            <Grid container columnSpacing={4} sx={{ paddingTop: '80px' }}>
                <Box sx={{ overflowX: 'auto' }}>
                    <Tabs
                        value={valueTabs}
                        onChange={(_, newValue) => setValueTabs(newValue)}
                        variant="scrollable"
                        allowScrollButtonsMobile={true}
                        scrollButtons={true}
                        sx={{
                            width: isError || isLoading || filterEstado(data, 'registrado').length === 0 ? mobile ? '100%' : '1500px' : 'inherit',
                            flexGrow: 1,
                            paddingLeft: '20px',
                            minWidth: '450px',
                            '& .MuiSvgIcon-fontSizeSmall': { color: light ? 'black' : 'white' },
                            '& .MuiTabs-flexContainer': { gap: '16px' },
                            '& .MuiTabs-indicator': { backgroundColor: 'inherit' }
                        }}>
                        <Equipos data={filterEstado(data, 'registrado')} isLoading={isLoading} isError={isError} />
                    </Tabs>
                </Box>
            </Grid>
            <LiveMatches />
        </Grid>
    );
};
export default Index;