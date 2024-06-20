import React from 'react';
import { TableRow, TableRowProps } from '@mui/material';
import { styled } from '@mui/system';

interface StyledTableRowProps extends TableRowProps {
    light?: boolean;
    disabled?: boolean;
}

export const StyledTableRow = styled(({ light, disabled, ...other }: StyledTableRowProps) => (
    <TableRow {...other} />
))(({ theme, light, disabled }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: light ? theme.palette.action.hover : 'var(--dark)',
    },
    opacity: disabled ? 0.5 : 1,
    pointerEvents: disabled ? 'none' : 'auto',
}));

export default StyledTableRow;