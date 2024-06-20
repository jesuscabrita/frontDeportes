import React from 'react';
import { BsCaretUpFill as ArrowTop } from 'react-icons/bs';
import { BsCaretDownFill as ArrowBottom } from 'react-icons/bs';
import { FaMinus as Igual } from 'react-icons/fa';
import { Grid } from '@mui/material'

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