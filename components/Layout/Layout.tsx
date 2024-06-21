import React, { useContext } from "react";
import { injectGlobal } from "@emotion/css";
import { useMediaQuery } from "@mui/material";
import { Grid } from '@mui/material';
import { Navbar } from "./Navbar/Navbar";
import Context from "../../context/contextPrincipal";

export const Layout = ({ children }) => {
    const [light] = useContext(Context);
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });

    injectGlobal`
        @import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500&display=swap');
        body{
            padding: 0;
            margin: 0;
            font-family: 'Quicksand', sans-serif;
        }
    `

    return (
        <Grid item container sx={{ width: '100%', height: '100%', background: light ? "var(--light)" : "var(--dark)" }}>
            <Navbar />
            {children}
        </Grid>
    );
};