import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { useContext } from 'react';
import Context from '../../context/contextPrincipal';
import { StyledTableCell } from './StyledTableCell';

export const CustomTableHead = ({  headers }) => {
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