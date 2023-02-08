import { Grid, useMediaQuery } from "@mui/material";
import { useContext } from "react";
import Carousel from "../components/home/Carousel";
import Context from "../context/contextPrincipal";

const Index = () => {
    const [light] = useContext(Context);
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });

    return (
    <Grid container sx={{height:'120vh', background: light ? "var(--cero)" : "var(--dark)", justifyContent:'center'}}>
        <Grid sx={{paddingTop:'80px'}}>
            <Carousel/>
        </Grid>
    </Grid>
    );
};
export default Index;