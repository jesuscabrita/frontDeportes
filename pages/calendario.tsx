import { Grid, useMediaQuery } from "@mui/material";
import { MatchCalendar } from "../components/Calendario/MachtCalendar";

const Calendario = () => {
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });

    return (
        <Grid item sx={{ height: !mobile ? '130vh' : '100%', width: '100%', paddingTop: '90px', }}>
            <Grid item sx={{ padding: '18px', width: '100%' }}>
                <MatchCalendar />
            </Grid>
        </Grid>
    );
};
export default Calendario;