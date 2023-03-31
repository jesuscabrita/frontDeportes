import { Grid } from "@mui/material"
import { useContext, useState } from "react"
import Context from "../../context/contextPrincipal";
import data from '../../utils/data.json';

export const Equipos = () => {
    const [light] = useContext(Context);
    
    return (
        <>
        {data.map(equipo =>{
            return(
                <img key={equipo.id} style={{height:'80px', cursor:'pointer'}} src={equipo.logo} alt={equipo.name} />
            )
        })}
        </>
    )
}