import React, { useContext } from "react";
import { Grid, TextField } from "@mui/material";
import { IconoErrorInput } from "../../icons/icons";
import Context from "../../context/contextPrincipal";

interface InputFieldsProps {
    type: 'text' | 'email' | 'number';
    value: any
    setValue: React.Dispatch<React.SetStateAction<any>>;
    mt?: number;
    title: string;
    disabled?: boolean;
    descripcion?: string;
    placeholder?: string;
    handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
    handleActive?: boolean;
    error?: boolean;
    textError?: string;
    lengths?: boolean;
    max?: number;
}

export const InputFields: React.FC<InputFieldsProps> = ({ type, value, setValue, mt = 0, title, disabled = false, descripcion, placeholder, handleChange, handleActive = false, error = false, textError, lengths = false, max }) => {
    const [light] = useContext(Context);
    return (
        <Grid item container mt={mt}>
            <Grid mb={0.5} sx={{ color: disabled ? (light ? 'var(--gris2)' : '#444748') : (light ? 'var(--dark2)' : 'var(--gris)'), lineHeight: '24px', fontSize: '14px', cursor: disabled ? 'not-allowed' : 'default', letterSpacing: '0.025px' }}>
                {title}
            </Grid>
            <TextField
                placeholder={placeholder}
                type={type}
                variant="outlined"
                fullWidth
                value={value}
                onChange={handleActive ? handleChange : (event) => setValue(event.target.value)}
                disabled={disabled}
                sx={{
                    "& .MuiOutlinedInput-input": {
                        border: disabled ? "none !important" : (error ? "1px solid #DE1212 !important" : '1px solid #747878 !important'),
                        borderRadius: "9px",
                        color: light ? "#444748" : 'var(--gris)',
                        outline: "none",
                        width: '100%',
                        height: '10px',
                        fontSize: '14px',
                        letterSpacing: '0.18%',
                        lineHeight: '20px',
                        background: disabled ? (light ? 'var(--gris)' : 'var(--dark2)') : 'none',
                        cursor: disabled ? 'no-drop' : '',
                        "&:focus": {
                            borderColor: disabled ? '#d5d5d5' : (error ? "#DE1212" : "#747878"),
                            borderRadius: "9px !important",
                        },
                    },
                    "& .MuiInputLabel-root": {
                        color: "#747878",
                    },
                    "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#065fbe !important",
                    },
                    "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: disabled ? "none" : (error ? "#DE1212" : "#747878"),
                    },
                    "& .MuiOutlinedInput-root": {
                        borderRadius: "10px !important",
                    },
                }}
            />
            {error ? <span style={{ color: '#DE1212', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '3px' }}> <IconoErrorInput />{textError}</span>
                : <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <span style={{ color: disabled ? (light ? 'var(--gris2)' : '#444748') : (light ? 'var(--dark2)' : 'var(--gris)'), fontSize: '12px' }}>{descripcion}</span>
                    {lengths && <span style={{ color: disabled ? '#C4C7C7' : '#444748', fontSize: '12px' }}>{`${value.length}/${max}`}</span>}
                </div>}
        </Grid>
    )
}