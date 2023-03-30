import { Grid, useMediaQuery } from "@mui/material";
import { PositionTable } from "../components/Shared/Table";

const Tabla = () => {
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });

    return (
    <Grid sx={{height:!mobile ?'170vh' : '100%',display:'flex', alignItems:'center', justifyContent:'center'}}>
        <Grid item sx={{paddingTop: !mobile ?'10px' : '100px', maxWidth:'95%'}}>
            <PositionTable/>
        </Grid>
    </Grid>
    );
};
export default Tabla;