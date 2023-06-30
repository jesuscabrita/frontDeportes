import { withStyles, Theme, createStyles } from '@material-ui/core/styles';
import TableRow from '@material-ui/core/TableRow';

export const StyledTableRow = withStyles((theme: Theme) =>
    createStyles({
        root: (props: { light?: boolean }) => ({
            '&:nth-of-type(odd)': {
                backgroundColor: props.light ? theme.palette.action.hover : 'var(--dark)',
            },
        }),
    })
)(TableRow);