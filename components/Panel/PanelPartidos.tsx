import { useQuery } from "react-query";
import { equiposGet } from "../../service/equipos";
import { useContext, useState } from "react";
import { Grid, useMediaQuery } from "@mui/material";
import Context from "../../context/contextPrincipal";
import { generateCalendar } from "../../utils/generateCalendar";
import { filterEstado, handleNextRound, handlePrevRound } from "../../utils/utils";
import { PanelRow } from "./PanelRow";
import { ButtonSend } from "../Material/ButtonSend";
import { BsFillArrowLeftCircleFill as Atras } from 'react-icons/bs';
import { BsFillArrowRightCircleFill as Lef } from 'react-icons/bs';

export const PanelPartidos = () => {
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

    return (
        <>
            <Grid item pb={2} sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                <Grid item sx={{ fontSize: '16px', color: light ? 'black' : 'var(--cero)' }}>Jornada {currentRound + 1}</Grid>
                <img style={{ height: '40px' }} src="https://logodownload.org/wp-content/uploads/2018/05/laliga-logo-1.png" alt="la liga" />
            </Grid>
            <Grid container sx={{ background: light ? 'var(--gris)' : 'var(--dark2)', borderRadius: '10px' }}>
                {matches[currentRound]?.map((match, index) => {
                    const homeTeam = filterEstado(data, 'registrado').find(team => team._id === match[0]);
                    const awayTeam = filterEstado(data, 'registrado').find(team => team._id === match[1]);
                    return (
                        <>
                            <PanelRow
                                index={index}
                                awayTeam={awayTeam}
                                homeTeam={homeTeam}
                                currentRound={currentRound}
                                data={filterEstado(data, 'registrado')}
                                isLoading={isLoading} />
                        </>
                    )
                })}
            </Grid>
            <Grid container mt={1} justifyContent="center" alignItems="center">
                <ButtonSend title={'Anterior'} icon={Atras} disable={currentRound === 0} handle={()=>{handlePrevRound(setCurrentRound, currentRound)}} iconSize={20} iconColor={''}/>
                <ButtonSend title={'Siguiente'} icon={Lef} disable={currentRound === matches.length - 1} handle={()=>{handleNextRound(setCurrentRound, currentRound)}} iconSize={20} iconColor={''}/>
            </Grid>
        </>
    )
}