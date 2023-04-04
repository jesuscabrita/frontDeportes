import { Grid } from "@mui/material"
import { EnVivo } from "./EnVivo"
import { useContext } from "react";
import Context from "../../context/contextPrincipal";

export const ButtonStatus =({status, gol_home, gol_away})=>{
    const [light] = useContext(Context);
    if (status === 'enVivo'){
        return <Grid sx={{display:'flex',alignItems:'center'}}>
                    <Grid item mr={1} fontSize={'18px'}>{gol_home}</Grid>
                    <EnVivo/>
                    <Grid item ml={1} fontSize={'18px'}>{gol_away}</Grid>
                </Grid> 
    }else if (status === 'finPartido'){
        return <Grid sx={{display:'flex',alignItems:'center'}}>
                    <Grid item mr={1} fontSize={'18px'}>{gol_home}</Grid>
                    <Grid item sx={{fontSize: '10px',color: light ?'var(--primario)': 'var(--cero)' }}>Finalizado</Grid>
                    <Grid item ml={1} fontSize={'18px'}>{gol_away}</Grid>
                </Grid>
    }else{
        return <Grid sx={{display:'flex',alignItems:'center', justifyContent:'center'}}>
                    <Grid item>vs</Grid>
                </Grid>
    }
}