import { useContext } from "react";
import Context from "../../context/contextPrincipal";
import { Grid, TextField } from "@mui/material";

export const InputTexArea =({label,placeholder,value,setValue,disable})=>{
    const [light] = useContext(Context);
    return(
        <Grid item sx={{ width: '100%', display: "flex", flexDirection: "column", color: light ? "var(--dark2)" : "var(--cero)", fontSize: "10px" }}>
            {label}
            <TextField
                placeholder={placeholder}
                multiline
                rows={4}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                autoComplete="off"
                disabled={disable}
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
            />
        </Grid>
    )
}