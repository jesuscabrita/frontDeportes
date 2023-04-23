import { Grid, useMediaQuery } from "@mui/material";

const Equipo = () => {
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });

    return (
        <Grid sx={{paddingTop:'100px', height: !mobile ? '100vh' : '100%',}}> 
        hola
        </Grid>
    );
};
export default Equipo;