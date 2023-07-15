import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useContext } from 'react';
import Context from '../../context/contextPrincipal';
import { Grid } from '@mui/material';

export const InputFecha = ({ value, setValue, label }) => {
    const [light] = useContext(Context);

    return (
        <Grid item sx={{ width: '100%', display: 'flex', flexDirection: 'column', color: light ? 'var(--dark2)' : 'var(--cero)', fontSize: '10px' }}>
            {label}
            <DatePicker
                sx={{
                    '& .MuiInputBase-input': { width: '100%' },
                    '& .MuiInputBase-root': {
                        color: light ? 'var(--dark2)' : 'var(--cero)',
                        border: light ? '1px solid var(--dark2)' : '1px solid var(--cero)',
                    },
                    '& .MuiInputBase-root.MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'currentColor',
                    },
                    '& .MuiInputBase-root.MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'none',
                    },
                    '& svg': {
                        color: light ? 'var(--dark2)' : 'var(--cero)',
                    },
                }}
                value={value}
                onChange={(date) => setValue(date)}
            />
        </Grid>
    );
};