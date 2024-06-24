import React, { useContext } from "react";
import { Grid, Paper, useMediaQuery } from "@mui/material";
import { useRouter } from "next/router";
import { ButtomPrimario } from "../components/Material/ButtonSend";
import { IoExit } from "react-icons/io5";
import Context from "../context/contextPrincipal";

const NotFoundPage = () => {
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });
    const [light] = useContext(Context);
    const router = useRouter();

    return (
        <Grid item container sx={{ padding: mobile ? "100px 20px 60px 20px" : "100px 200px 60px 200px", height: mobile ? '100vh' : '110vh' }}>
            <Grid item xs={12}>
                <Paper elevation={3} sx={{ padding: mobile ? "20px" : "40px", display: "flex", flexDirection: "column", alignItems: "center", background: light ? 'var(--gris)' : 'var(--dark2)' }}>
                    <Grid item container>
                        <Grid item md={6} container alignItems={'center'} justifyContent={'center'}>
                            <img style={{ height: mobile ? '300px' : '' }} src="/images/404.png" alt="404" />
                        </Grid>
                        <Grid item md={6} gap={2} container alignItems={'center'} justifyContent={'center'} flexDirection={'column'} sx={{ padding: '20px' }}>
                            <Grid item sx={{ mb: 4, color: light ? "var(--dark2)" : "var(--gris)", textAlign: 'center' }}>
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
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default NotFoundPage;