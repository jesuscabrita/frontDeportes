import { Grid, Typography } from "@mui/material"
import { EnVivo } from "./EnVivo"
import { useContext } from "react";
import Context from "../../context/contextPrincipal";
import { BiTimer as Time } from 'react-icons/bi';

export const ButtonStatus = ({ status, gol_home, gol_away, minutosTranscurridos }) => {
    const [light] = useContext(Context);
    const isHalfTime = minutosTranscurridos >= 25 && minutosTranscurridos < 30;

    if (status === 'enVivo') {
        return (
            <Grid container flexDirection={'column'} alignItems={'center'}>
                {isHalfTime && (
                    <Grid item container justifyContent={'center'} alignItems={'center'}>
                        <Typography variant="subtitle2" fontSize={'10px'} color={light ? 'var(--primario)' : 'var(--cero)'}>Descanso</Typography>
                    </Grid>
                )}
                {status === 'enVivo' && !isHalfTime && (
                    <Grid item container justifyContent={'center'} gap={0.5} alignItems={'center'} fontSize={'10px'}>
                        <Time color={light ? 'var(--primario)' : 'var(--cero)'} size={16} />
                        {minutosTranscurridos}
                    </Grid>
                )}
                <Grid sx={{ display: 'flex', alignItems: 'center' }}>
                    <Grid item mr={1} fontSize={'18px'}>
                        {gol_home}
                    </Grid>
                    <EnVivo />
                    <Grid item ml={1} fontSize={'18px'} >
                        {gol_away}
                    </Grid>
                </Grid>
            </Grid>
        );
    } else if (status === 'finPartido') {
        return (
            <Grid sx={{ display: 'flex', alignItems: 'center' }}>
                <Grid item mr={1} fontSize={'18px'}>
                    {gol_home}
                </Grid>
                <Grid item sx={{ fontSize: '10px', color: light ? 'var(--primario)' : 'var(--cero)' }}>
                    Finalizado
                </Grid>
                <Grid item ml={1} fontSize={'18px'}>
                    {gol_away}
                </Grid>
            </Grid>
        );
    } 
    else if (status === 'fechaInvalida') {
        return (
            <Grid sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Grid item width={'95px'} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>vs</Grid>
            </Grid>)
    }
    else {
        return (
            <Grid sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Grid item width={'95px'} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>vs</Grid>
            </Grid>)
    }
}