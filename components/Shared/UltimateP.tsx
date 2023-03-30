import React from 'react';
import { Grid, useMediaQuery } from '@mui/material'
import { BsFillCheckCircleFill as Check } from 'react-icons/bs';
import { BsFillXCircleFill as Error } from 'react-icons/bs';
import { AiOutlineMinusCircle as Empate } from 'react-icons/ai';
import { BsFillCircleFill as Neutral } from 'react-icons/bs';
import { BsCaretUpFill as ArrowTop } from 'react-icons/bs';
import { BsCaretDownFill as ArrowBottom } from 'react-icons/bs';
import { FaMinus as Igual } from 'react-icons/fa';

export const UltimateP = ({ last5 }) => {
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });
    const icons = {
        'win': <Check size={20} style={{ color: 'var(--check)' }} />,
        'loss': <Error size={20} style={{ color: 'var(--danger)' }} />,
        'draw': <Empate size={20} style={{ color: 'var(--neutral)' }} />,
        'neutral': <Neutral size={20} style={{ color: 'var(--gris)' }} />,
    }

    return (
        <Grid container alignItems={'center'} gap={1} sx={{width: mobile ?'140px': '100%', whiteSpace: 'nowrap'}}>
            {last5.map((result, index) => (
                <React.Fragment key={index}>
                    {icons[result]}
                </React.Fragment>
            ))}
        </Grid>

    )
}

export const ArrowP = ({ currentPos, prevPos }) => {
    let arrowIcon;
    if (currentPos < prevPos) {
        arrowIcon = <ArrowTop size={20} style={{ color: 'var(--check)' }} />;
    } else if (currentPos > prevPos) {
        arrowIcon = <ArrowBottom size={20} style={{ color: 'var(--danger)' }} />;
    } else {
        arrowIcon = <Igual size={20} style={{ color: 'var(--gris)' }} />;
    }

    return (
        <Grid>
            {arrowIcon}
        </Grid>
    );
}