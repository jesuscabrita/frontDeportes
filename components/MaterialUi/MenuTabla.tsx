import { Grid, useMediaQuery } from "@mui/material"
import { useContext } from "react";
import Context from "../../context/contextPrincipal";

export const MenuTabla =({opcion, valueSelect, handleChange})=>{
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });
    const [light] = useContext(Context);

    return(
        <Grid item key={opcion.name} id={opcion.name}
        sx={{
            width:'180px',
            background: !light && valueSelect == opcion.id ? 'var(--dark2)' : light && valueSelect === opcion.id ? 'var(--gris)' : '',
            height:'48px',
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
            borderBottom:light && valueSelect == opcion.id ? '3px solid var(--dark2)': !light && valueSelect == opcion.id && '3px solid var(--cero)' ,
            color:!light && valueSelect === opcion.id ? 'var(--cero)' : light && valueSelect === opcion.id ? 'var(--dark2)' : light ? 'var(--dark3)' :'var(--neutral)',
            zIndex:'2',
            cursor:'pointer',
            gap:'8px',
        }}
        onClick={()=> handleChange(opcion.id)}
        >
            {opcion.icono} {opcion.name}
        </Grid>
    )
}