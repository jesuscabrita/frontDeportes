import React, { useContext } from 'react';
import { FormControl, Grid, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { styled } from '@mui/material/styles';
import Context from '../../context/contextPrincipal';
import { IconoErrorInput } from '../../icons/icons';

interface SelectOption {
    value: any;
    label: any;
}

export const InputSelect = ({ value, setValue, label, selectData, disable }: {
    value: any;
    setValue: any;
    label: any;
    selectData: SelectOption[];
    disable: boolean;
}) => {
    const [light] = useContext(Context);

    const handleChange = (event: any) => {
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


interface InputSelectProps {
    title: string;
    value: any;
    handleSelect?: (event: SelectChangeEvent<any>) => void;
    data?: { codigo: string; descripcion: string }[];
    mt?: number;
    disabled?: boolean;
    descripcion?: string;
    error?: boolean;
    textError?: string;
}

export const InputSelects: React.FC<InputSelectProps> = ({ title, value, handleSelect, data, mt = 0, disabled = false, descripcion, error = false, textError }) => {
    const [light] = useContext(Context);
    const optionsWithDefault = data ? [{ codigo: '', descripcion: "Elija una opción" }, ...data] : [];
    return (
        <Grid item container mt={mt} sx={{ width: '100%', display: 'flex', flexDirection: 'column', color: 'rgb(31 41 55)', fontSize: '10px' }}>
            <Grid mb={0.5} sx={{ color: disabled ? '#C4C7C7' : light ? 'var(--dark2)' : 'var(--gris)', lineHeight: '24px', fontSize: '14px', cursor: disabled ? 'not-allowed' : 'default', letterSpacing: '0.025px' }}>
                {title}
            </Grid>
            <Grid item container>
                <FormControl disabled={disabled} sx={{ width: '100%', minWidth: 200 }}>
                    <Select
                        value={value}
                        onChange={handleSelect}
                        MenuProps={{ sx: { '& .MuiList-root.MuiMenu-list': { background: light ? 'var(--gris)' : 'var(--dark2)' } } }}
                        sx={{
                            height: '46px',
                            fontSize: '14px',
                            cursor: disabled ? 'no-drop' : 'pointer',
                            '& .MuiInputBase-input': {
                                color: light ? "#444748" : 'var(--gris)',
                                border: disabled ? "1px solid #5155586a !important" : (error ? "1px solid #DE1212 !important" : '1px solid #747878 !important'),
                                borderRadius: '9px !important',
                                padding: disabled ? '12.5px !important' : '12px !important',
                                background: disabled ? '#EFF1F1' : 'none',
                                cursor: disabled ? 'no-drop' : 'pointer',
                            },
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'none !important',
                                borderRadius: '9px !important',
                                border: 'none !important',
                            },
                            '& .MuiSvgIcon-root': {
                                color: light ? "#444748" : 'var(--gris)',
                            },
                            '&.Mui-focused': {
                                color: 'initial',
                                fontWeight: 'normal',
                                '& fieldset': {
                                    border: 'none !important',
                                },
                                '&:hover fieldset': {
                                    border: 'none !important',
                                },
                            },
                            '&:hover fieldset': {
                                border: disabled ? "none !important" : (error ? "none !important" : '1px solid #7478781 !important'),
                            },
                        }}
                    >
                        {optionsWithDefault && optionsWithDefault.map((option, optionIndex: number) => (
                            <MenuItem
                                key={optionIndex}
                                value={option?.descripcion}
                                sx={{
                                    background: light ? 'var(--gris)' : 'var(--dark2)',
                                    color: light ? "#444748" : 'var(--gris)',
                                    fontSize: '14px',
                                    letterSpacing: '0.18%',
                                    lineHeight: '20px',
                                    '&:hover': {
                                        background: light ? 'var(--dark2)' : 'var(--gris)',
                                        color: light ? "var(--gris)" : 'var(--dark2)',
                                    },
                                    '&.Mui-selected': {
                                        background: light ? 'var(--dark2)' : 'var(--gris)',
                                        color: light ? "var(--gris)" : 'var(--dark2)',
                                        '&:hover': {
                                            background: light ? 'var(--dark2)' : 'var(--gris)',
                                        },
                                    },
                                }}
                            >
                                {option?.descripcion}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
            {error ? <span style={{ color: '#DE1212', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '3px' }}> <IconoErrorInput /> {textError}</span>
                : <span style={{ color: disabled ? '#C4C7C7' : light ? 'var(--dark2)' : 'var(--gris)', fontSize: '12px' }}>{descripcion}</span>}
        </Grid>
    )
}