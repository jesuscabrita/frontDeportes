import { Grid, useMediaQuery } from "@mui/material";
import { LogoRegister } from "../components/Shared/LogoRegister";
import { TablaLibre } from "../components/Libre/TablaLibre";
import { useQuery } from "react-query";
import { equiposGet } from "../service/equipos";
import { useState } from "react";

const Libres = () => {
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });
    const [data, setData] = useState([]);

    const { isLoading, isError } = useQuery(["/api/liga"], equiposGet, {
        refetchOnWindowFocus: false,
        onSuccess: (data) => {
            setData(data);
        },
    })

    return (
        <Grid item sx={{ height: !mobile ? '160vh' : '160vh', width: '100%', paddingTop: '90px' }}>
            <Grid container item sx={{ padding: '18px', width: '100%', justifyContent:'center', flexDirection:'column',alignItems:'center' }}>
                <LogoRegister name={'Jugadores Libres'} />
                <TablaLibre isLoading={isLoading} jugadores={data}/>
            </Grid>
        </Grid>
    );
};
export default Libres;