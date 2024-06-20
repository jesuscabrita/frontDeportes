import React from "react";
import { useContext, useState } from "react";
import { Grid, TextField, InputAdornment, IconButton } from "@mui/material";
import { MdOutlineVisibilityOff as VisibilityOff } from "react-icons/md";
import { MdOutlineVisibility as Visibility } from "react-icons/md";
import Context from "../../context/contextPrincipal";

export const InputPassword = ({ value, setValue, label, placeholder }) => {
    const [light] = useContext(Context);
    const [showPassword, setShowPassword] = useState(false);

    return (
        <Grid item sx={{ width: "100%", display: "flex", flexDirection: "column", color: light ? "var(--dark2)" : "var(--cero)", fontSize: "10px" }}>
            {label}
            <TextField
                type={showPassword ? "text" : "password"}
                placeholder={placeholder}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                autoComplete="off"
                sx={{
                    "& .MuiOutlinedInput-input": {
                        borderRadius: "6px",
                        color: light ? "var(--dark2)" : "var(--cero)",
                        outline: "none",
                        width: "100%",
                    },
                    "& .MuiInputLabel-root": {
                        color: light ? "var(--dark2)" : "var(--cero)",
                    },
                    "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                            borderColor: light ? "var(--dark2)" : "var(--cero)",
                        },
                        "&:hover fieldset": {
                            borderColor: light ? "var(--dark2)" : "var(--cero)",
                        },
                        "&.Mui-focused fieldset": {
                            borderColor: light ? "var(--dark2)" : "var(--cero)",
                        },
                    },
                }}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                onClick={() => setShowPassword(!showPassword)}
                                sx={{ color: light ? "var(--dark2)" : "var(--cero)" }}
                                edge="end"
                                tabIndex={-1}
                            >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
        </Grid>
    );
};