import React, { useContext } from 'react';
import Context from '../../context/contextPrincipal';
import { StyledTableCell } from './StyledTableCell';
import { TableHead, TableRow } from '@mui/material';

export const CustomTableHead = ({ headers }) => {
    const [light] = useContext(Context);
    return (
        <TableHead>
            <TableRow>
                {headers.map((header, index) => (
                    <StyledTableCell key={index} light={light} align={header.align}>
                        {header.label}
                    </StyledTableCell>
                ))}
            </TableRow>
        </TableHead>
    );
};