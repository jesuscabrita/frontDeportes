import { Grid, Button, useMediaQuery } from "@mui/material";
import { useRouter } from "next/router";
import { useContext } from "react";
import Context from "../context/contextPrincipal";
import { ButtonSend } from "../components/Material/ButtonSend";

const Page404 = () => {
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });
    const [light] = useContext(Context);
    const router = useRouter();

    return (
        <Grid container direction="column" alignItems="center" justifyContent="center" sx={{ height: "100vh" }}>
            <Grid item sx={{ fontSize: "100px", fontWeight: "bold", mb: 4, color: light ? "var(--dark2)" : "var(--cero)" }}>
                404
            </Grid>
            <Grid item sx={{ mb: 4, color: light ? "var(--dark2)" : "var(--neutral)" }}>
                Lo sentimos, la página que buscas no existe.
            </Grid>
            <Grid item>
                <ButtonSend icon={''} disable={false} iconColor={''} iconSize={''} title={'Volver'} handle={() => { router.push('/'); }} />
            </Grid>
        </Grid>
    );
};

export default Page404;