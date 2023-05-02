import { useQuery } from "react-query";
import { equiposGet } from "../../service/equipos";
import { useContext, useState } from "react";
import { Button, Grid, useMediaQuery } from "@mui/material";
import Context from "../../context/contextPrincipal";
import { generateCalendar } from "../../utils/generateCalendar";
import { filterEstado } from "../../utils/utils";
import { PanelRow } from "./PanelRow";

export const PanelPartidos =()=>{
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });
    const [light] = useContext(Context);
    const [data, setData] = useState([]);
    const [currentRound, setCurrentRound] = useState(0);
    

    const { isLoading, isError } = useQuery(["/api/liga"], equiposGet, {
        refetchOnWindowFocus: false,
        onSuccess: (data) => {
            setData(data);
        },
    })

    const matches = generateCalendar(filterEstado(data, 'registrado'));

    function handleNextRound() {
        setCurrentRound(currentRound + 1);
    }

    function handlePrevRound() {
        setCurrentRound(currentRound - 1);
    }


    return(
    <>
    <Grid item sx={{ fontSize: '16px', color: light ? 'black' : 'var(--cero)' }}>Jornada {currentRound + 1}</Grid>
        <Grid container sx={{background:light ?'var(--gris)' :'var(--dark2)', borderRadius:'10px'}}>
            {matches[currentRound]?.map((match, index) =>{
                const homeTeam = filterEstado(data, 'registrado').find(team => team._id === match[0]);
                const awayTeam = filterEstado(data, 'registrado').find(team => team._id === match[1]);
                return(
                <>
                <PanelRow
                    index={index}
                    awayTeam={awayTeam}
                    homeTeam={homeTeam}
                    currentRound={currentRound}
                    isLoading={isLoading} />
                    </>
                )
            })}
        </Grid>
        <Grid container mt={1} justifyContent="center" alignItems="center">
            <Button sx={{ color: 'var(--primario)' }} disabled={currentRound === 0} onClick={handlePrevRound}>Anterior</Button>
            <Button sx={{ color: 'var(--primario)' }} disabled={currentRound === matches.length - 1} onClick={handleNextRound}>Siguiente</Button>
        </Grid>
    </>
    )
}