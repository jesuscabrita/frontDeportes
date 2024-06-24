import React, { useContext } from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Context from '../../context/contextPrincipal';
import { Grid } from '@mui/material';
import { IconoErrorInput } from '../../icons/icons';

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

interface InputDateProps {
    title: string;
    disabled?: boolean;
    value: any;
    setValue: React.Dispatch<React.SetStateAction<any>>;
    error?: boolean;
    descripcion?: string;
    textError?: string;
}

export const InputDate: React.FC<InputDateProps> = ({ title, disabled, value, setValue, error, descripcion, textError }) => {
    const [light] = useContext(Context);
    return (
        <Grid item sx={{ width: '100%', display: 'flex', flexDirection: 'column', color: 'rgb(31 41 55)', fontSize: '10px' }}>
            <Grid mb={0.5} sx={{ color: disabled ? '#C4C7C7' : light ? 'var(--dark2)' : 'var(--gris)', lineHeight: '24px', fontSize: '14px', cursor: disabled ? 'not-allowed' : 'default', letterSpacing: '0.025px' }}>
                {title}
            </Grid>
            <DatePicker
                sx={{
                    '& .MuiInputBase-input': { width: '100%', height: '12px' },
                    '& .MuiInputBase-root': {
                        color: light ? "#444748" : 'var(--gris)',
                        border: 'none',
                        borderRadius: "9px",
                    },
                    '& .MuiInputBase-root.MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                        borderColor: light ? "#444748" : '#747878 ',
                    },
                    '& .MuiInputBase-root.MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'none',
                    },
                    '& svg': {
                        color: light ? "#444748" : '#747878 ',
                    },
                }}
                value={value}
                onChange={(date) => setValue(date)}
                disabled={disabled}
            />
            {error ? <span style={{ color: '#DE1212', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '3px' }}> <IconoErrorInput />{textError}</span>
                : <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <span style={{ color: disabled ? '#C4C7C7' : light ? 'var(--dark2)' : 'var(--gris)', fontSize: '12px' }}>{descripcion}</span>
                </div>}
        </Grid>
    );
};