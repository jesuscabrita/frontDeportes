import { Tab, useMediaQuery } from "@mui/material"
import { useContext } from "react";
import Context from "../../context/contextPrincipal";

export const TabSelect =({value, index, Icono, name})=>{
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });
    const [light] = useContext(Context);

    function a11yProps(index: number) {
        return {
            id: `full-width-tab-${index}`,
            'aria-controls': `full-width-tabpanel-${index}`,
        };
    }

    return(
        <Tab 
        label={!mobile ? <> {Icono} {name}</> : Icono}
        {...a11yProps(index)}
        sx={{
            fontSize:mobile ? '10px' : '14px', 
            color : light ? 'var(--dark2)':'var(--cero)', 
            display:'flex', 
            flexDirection:'row', 
            alignItems:'center', 
            gap:'10px',
            background: value == 0 ? light ? 'var(--gris)': 'var(--dark2)' : 'transparent',
            '&:hover': {
                background: value == 0 ?light ? 'var(--gris)': 'var(--dark2)' : 'rgba(0, 0, 0, 0.04)',
            },
            }}
        />
    )
}