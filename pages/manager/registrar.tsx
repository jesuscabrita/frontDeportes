import { Grid, useMediaQuery } from "@mui/material";
import { Form } from "../../components/form/Form";
import { useContext } from "react";
import Context from "../../context/contextPrincipal";

const Registrar = () => {
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });
    const [light] = useContext(Context);

    return (
    <Grid sx={{height: !mobile ? '170vh' : '100%', }}>
        <Grid container flexDirection={'column'} sx={{paddingTop:!mobile ? '100px': '90px', paddingBottom:'40px',display: 'flex', alignItems: 'center', justifyContent: 'center'}} >
            <Grid item mb={4} sx={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                <Grid item sx={{fontSize:'28px', color : light ? 'var(--dark2)':'var(--cero)'}}>Registrar equipo</Grid>
                <img
                    className="block h-14 w-auto lg:hidden"
                    src={light ?
                        "https://assets.laliga.com/assets/logos/laliga-v/laliga-v-1200x1200.png" :
                        "https://assets.laliga.com/assets/logos/laliga-v-negativo-monocolor/laliga-v-negativo-monocolor-1200x1200.png"
                    }
                    alt="Your Company"
                />
                <img
                    className="hidden h-14 w-auto lg:block"
                    src={light ?
                        "https://assets.laliga.com/assets/logos/laliga-v/laliga-v-1200x1200.png" :
                        "https://assets.laliga.com/assets/logos/laliga-v-negativo-monocolor/laliga-v-negativo-monocolor-1200x1200.png"
                    }
                    alt="Your Company"
                />
            </Grid>
            <Form/>
        </Grid>
    </Grid>
    );
};
export default Registrar;