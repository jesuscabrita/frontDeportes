import React from 'react';
import { Grid } from '@mui/material'
import { BsFillCheckCircleFill as Check } from 'react-icons/bs';
import { BsFillXCircleFill as Error } from 'react-icons/bs';
import { AiOutlineMinusCircle as Empate } from 'react-icons/ai';
import { BsFillCircleFill as Neutral } from 'react-icons/bs';
import { BsCaretUpFill as ArrowTop } from 'react-icons/bs';
import { BsCaretDownFill as ArrowBottom } from 'react-icons/bs';

export const UltimateP =({last5})=>{
    const icons = {
        'win': <Check size={20} style={{color:'var(--check)'}}/>,
        'loss': <Error size={20} style={{color:'var(--danger)'}}/>,
        'draw': <Empate size={20} style={{color:'var(--neutral)'}}/>,
        'neutral': <Neutral size={20} style={{color:'var(--gris)'}}/>,
    }

    return(
        <Grid container alignItems={'center'} gap={1}>
            {last5.map((result, index) => (
                <React.Fragment key={index}>
                    {icons[result]}
                </React.Fragment>
            ))}
        </Grid>

    )
}

export const ArrowP =()=>{
    return(
        <Grid>
            <ArrowBottom size={20} style={{color:'var(--danger)'}}/>
            <ArrowTop size={20} style={{color:'var(--check)'}}/>
        </Grid>
    )
}