import React, { useContext } from "react";
import { Grid, useMediaQuery } from "@mui/material";
import { useRouter } from "next/router";
import { ButtomPrimario } from "../components/Material/ButtonSend";
import { IoExit } from "react-icons/io5";
import Context from "../context/contextPrincipal";

const NotFoundPage = () => {
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });
    const [light] = useContext(Context);
    const router = useRouter();

    return (
        <Grid container direction="column" alignItems="center" justifyContent="center" sx={{ height: "100vh" }}>
            <Grid item sx={{ fontSize: "120px", fontWeight: "bold", color: light ? "var(--dark2)" : "var(--cero)", letterSpacing: '4px' }}>
                404
            </Grid>
            <Grid item sx={{ mb: 4, color: light ? "var(--dark2)" : "var(--gris)" }}>
                Lo sentimos, la página que buscas no existe.
            </Grid>
            <Grid item>
                <ButtomPrimario
                    title="Volver"
                    icon={IoExit}
                    handleclick={() => { router.push('/'); }}
                    width="200px"
                    widthBorder="206px"
                />
            </Grid>
        </Grid>
    );
};

export default NotFoundPage;