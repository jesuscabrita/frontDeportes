import { injectGlobal } from "@emotion/css";
import { useMediaQuery } from "@mui/material";
import { Grid } from '@mui/material';
import { useContext } from "react";
import Context from "../../context/contextPrincipal";
import { Navbar } from "../home/Navbar";

injectGlobal`
@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500&display=swap');
    body{
        padding: 0;
        margin: 0;
        font-family: 'Quicksand', sans-serif;
    }
`;
export const Layout = ({ children }) => {
    const [light] = useContext(Context);
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });
    return (
        <>
            {!mobile ? (
                <Grid item sx={{
                    width: '100%',
                    // height: '100vh',
                    background: light ? "var(--cero)" : "var(--dark)",
                }}>
                    <Navbar />
                    {children}
                </Grid>
            ) : (
                <Grid item sx={{
                    width: '100%',
                    
                    background: light ? "var(--cero)" : "var(--dark)",
                }}>
                    <Navbar />
                    {children}
                </Grid>
            )}
        </>
    );
};