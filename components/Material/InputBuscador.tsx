import { InputAdornment, TextField } from "@mui/material"
import { useContext } from "react";
import Context from "../../context/contextPrincipal";
import { Search as SearchIcon } from "@mui/icons-material";

export const InputBuscador =({value, setValue,placeholder})=>{
    const [light] = useContext(Context);

    return(
        <>
        <TextField
                autoComplete="off"
                fullWidth
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={placeholder}
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
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon color="action" sx={{ color: light ? "var(--dark2)" : "var(--cero)" }}/>
                        </InputAdornment>
                    ),
                }}
            />
        </>
    )
}