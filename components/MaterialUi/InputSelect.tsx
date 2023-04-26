import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useContext } from 'react';
import Context from '../../context/contextPrincipal';

export const InputSelect = ({ value,setValue,label, selectData }) => {
    const [light] = useContext(Context);

    const handleChange = (event: SelectChangeEvent) => {
        setValue(event.target.value);
    }

    return (
        <FormControl sx={{ width: 220 }}>
            <InputLabel sx={{ color: light ? 'var(--dark2)' : 'var(--cero)' }}>{label}</InputLabel>
            <Select
                value={value}
                label={label}
                onChange={handleChange}
                MenuProps={{sx: {'& .MuiList-root.MuiMenu-list': {background: light ? 'var(--cero)' : 'var(--dark3)',}}}}
                sx={{ '& .MuiInputBase-input': { color: light ? 'var(--dark3)' : 'var(--cero)', border: light ? '1px solid var(--dark2)' : '1px solid var(--cero)' }}}
            >
                {selectData.map((item) => (
                    <MenuItem
                    key={item.value}
                    value={item.value}
                    sx={{
                        background: light ? 'var(--cero)' : 'var(--dark3)',
                        color: light ? 'var(--dark3)' : 'var(--cero)',
                        '&:hover': {
                            background: light ? 'var(--gris)' : 'var(--dark2)',
                        },
                        '&.Mui-selected': {
                            background: light ? 'var(--gris)' : 'var(--dark2)'}
                    }}
                >
                        {item.label}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}