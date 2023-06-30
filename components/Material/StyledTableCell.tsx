import { withStyles, createStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';

export const StyledTableCell = withStyles((theme) =>
    createStyles({
        head: {
            backgroundColor: 'var(--dark2)',
            color: 'var(--cero)',
        },
        body: (props: { light?: boolean }) => ({
            fontSize: 12,
            color: props.light ? 'black' : 'var(--cero)',
        }),
    })
)(TableCell);
