import { Grid, useMediaQuery } from "@mui/material";
import { MatchCalendar } from "../components/Shared/MachtCalendar";

const Calendario = () => {
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });

    return (
    <Grid container sx={{height:!mobile ?'100%' : '100%', }} >
        <Grid container sx={{paddingTop:!mobile ? '100px': '90px', paddingBottom:'40px'}} >
            <MatchCalendar/>
        </Grid>
    </Grid>
    );
};
export default Calendario;