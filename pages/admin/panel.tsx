import React from "react";
import { Grid, useMediaQuery } from "@mui/material";
import { PanelPartidos } from "../../components/Panel/PanelPartidos";
import { WithAuth } from "../../components/Shared/WithAuth";

const Panel = () => {
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });

    return (
        <Grid item sx={{ height: !mobile ? '100%' : '100%', width: '100%', paddingTop: '90px', }}>
            <Grid item sx={{ padding: '18px', width: '100%' }}>
                <PanelPartidos />
            </Grid>
        </Grid>
    );
};
export default WithAuth(Panel);