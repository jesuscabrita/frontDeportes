import React from 'react';
import { TableCell, TableCellProps } from '@mui/material';
import { styled } from '@mui/system';

interface StyledTableCellProps extends TableCellProps {
    light?: boolean;
}

export const StyledTableCell = styled(({ light, ...other }: StyledTableCellProps) => (
    <TableCell {...other} />
))(({ theme, light }) => ({
    '&.MuiTableCell-head': {
        backgroundColor: 'var(--dark2)',
        color: 'var(--cero)',
    },
    '&.MuiTableCell-body': {
        fontSize: 12,
        color: light ? 'black' : 'var(--cero)',
    },
}));

export default StyledTableCell;