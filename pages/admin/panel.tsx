import { Grid, useMediaQuery } from "@mui/material";
import { PanelPartidos } from "../../components/Shared/PanelPartidos";

const Panel = () => {
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });

    return (
        <Grid item sx={{ height: !mobile ? '200vh' : '160vh', width: '100%', paddingTop: '90px', }}>
            <Grid item sx={{ padding: '18px', width: '100%' }}>
                <PanelPartidos/>
            </Grid>
        </Grid>
    );
};
export default Panel;