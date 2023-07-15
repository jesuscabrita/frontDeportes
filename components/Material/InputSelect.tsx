import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useContext } from 'react';
import Context from '../../context/contextPrincipal';
import { Grid } from '@mui/material';
import { styled } from '@mui/material/styles';

export const InputSelect = ({ value, setValue, label, selectData, disable }) => {
    const [light] = useContext(Context);

    const handleChange = (event: SelectChangeEvent) => {
        setValue(event.target.value);
    };

    const StyledSelect = styled(Select)(({ theme }) => ({
        '& .MuiSelect-icon': {
            fill: light ? 'var(--dark3)' : 'var(--cero)',
        },
    }));

    return (
        <Grid item sx={{ width: '100%', display: 'flex', flexDirection: 'column', color: light ? 'var(--dark2)' : 'var(--cero)', fontSize: '10px' }}>
            {label}
            <FormControl sx={{ width: '100%' }}>
                <StyledSelect
                    disabled={disable}
                    value={value}
                    onChange={handleChange}
                    MenuProps={{ sx: { '& .MuiList-root.MuiMenu-list': { background: light ? 'var(--cero)' : 'var(--dark3)' } } }}
                    sx={{
                        '& .MuiInputBase-input': {
                            color: light ? 'var(--dark3)' : 'var(--cero)',
                            border: light ? '1px solid var(--dark2)' : '1px solid var(--cero)',
                        },
                        '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'none',
                        },
                        '&.Mui-focused': {
                            color: 'initial',
                            fontWeight: 'normal',
                            '& fieldset': {
                                border: 'none !important',
                            },
                            '&:hover fieldset': {
                                border: light ? '1px solid var(--dark2)' : '1px solid var(--cero)',
                            },
                        },
                        '&:hover fieldset': {
                            border: 'none !important',
                        },
                    }}
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
                                    background: light ? 'var(--gris)' : 'var(--dark2)',
                                },
                            }}
                        >
                            {item.label}
                        </MenuItem>
                    ))}
                </StyledSelect>
            </FormControl>
        </Grid>
    );
};