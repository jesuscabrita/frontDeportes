import { Grid, useMediaQuery } from "@mui/material";
import { useContext } from "react";
import Context from "../context/contextPrincipal";

const Index = () => {
    const [light] = useContext(Context);
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });

    return (
    <Grid container sx={{height:'120vh', justifyContent:'center'}}>
        <Grid sx={{paddingTop:'80px'}}>
            holaaaaaaaaaaaaaa
        </Grid>
    </Grid>
    );
};
export default Index;