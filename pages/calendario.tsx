import { Grid } from "@mui/material";
import MatchCalendar from "../components/Shared/MachtCalendar";

const Calendario = () => {

    return (
    <Grid container sx={{height:'120vh', }} >
        <Grid  sx={{paddingTop:'80px'}} >
            <MatchCalendar/>
        </Grid>
    </Grid>
    );
};
export default Calendario;