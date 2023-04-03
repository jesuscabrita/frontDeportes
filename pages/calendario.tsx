import { Grid, useMediaQuery } from "@mui/material";
import { MatchCalendar } from "../components/Shared/MachtCalendar";

const Calendario = () => {
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });

    return (
    <Grid container sx={{height:!mobile ?'110vh' : '100vh', }} >
        <Grid container sx={{paddingTop:!mobile ? '20px': '90px'}} >
            <MatchCalendar/>
        </Grid>
    </Grid>
    );
};
export default Calendario;