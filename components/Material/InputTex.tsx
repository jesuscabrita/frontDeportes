import { useContext } from "react";
import Context from "../../context/contextPrincipal";
import { Grid, TextField } from "@mui/material";

export const InputText = ({ value, label, setValue, placeholder }) => {
    const [light] = useContext(Context);

    return (
        <Grid item sx={{ display: "flex", flexDirection: "column", color: light ? "var(--dark2)" : "var(--cero)", fontSize: "10px" }}>
            {label}
            <TextField
                placeholder={placeholder}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                autoComplete="off"
                sx={{
                    "& .MuiOutlinedInput-input": {
                        border: light ? "1px solid var(--dark2)" : "1px solid var(--cero)",
                        borderRadius: "6px",
                        color: light ? "var(--dark2)" : "var(--cero)",
                        outline: "none",
                    },
                    "& .MuiInputLabel-root": {
                        color: light ? "var(--dark2)" : "var(--cero)",
                    },
                    "& .Mui-focused": {
                        color: "initial",
                        fontWeight: "normal",
                        "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: light ? "var(--dark2)" : "var(--cero)",
                        },
                    },
                    "& .MuiOutlinedInput-root:hover fieldset": {
                        border: "none",
                    },
                }}
            />
        </Grid>
    );
};