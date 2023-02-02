import { injectGlobal } from "@emotion/css";
import { useMediaQuery } from "@mui/material";
import { Grid } from '@mui/material';

injectGlobal`
@import url('https://fonts.googleapis.com/css2?family=Dosis:wght@200;300;400&display=swap');
body{
background-color: #ffffff;
padding: 0;
margin: 0;
font-family: 'Dosis', sans-serif;
}
`;
export const Layout = ({ children }) => {
    // const [light] = useContext(Context);
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });
    return (
        <>
            {!mobile ? (
                <Grid item sx={{
                    width: '100%',
                    height: '100%',
                }}>
                    {/* <Navbar /> */}
                    {children}
                </Grid>
            ) : (
                <Grid item sx={{
                    width: '100%',
                    height: '100%',
                }}>
                    {/* <Navbar /> */}
                    {children}
                </Grid>
            )}
        </>
    );
};