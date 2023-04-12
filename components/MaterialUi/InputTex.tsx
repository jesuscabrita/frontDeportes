import { useContext } from "react";
import Context from "../../context/contextPrincipal";
import { TextField } from "@mui/material";


export const InputText =({value,label, setValue})=>{
    const [light] = useContext(Context);

    return(
        <TextField
            label={label}
            variant="outlined"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            autoComplete="off"
            sx={{
                '& .MuiOutlinedInput-input': {
                    border: light ? '1px solid var(--dark2)' : '1px solid var(--cero)',
                    borderRadius: '6px'
                },
                '& .MuiInputLabel-root': {
                    color: light ? 'var(--dark2)' : 'var(--cero)'
                },
                '&:hover .MuiOutlinedInput-root': {
                    border: light ? '1px solid var(--dark1)' : '1px solid var(--cero)'
                },
                '& .Mui-focused': {
                    color: 'initial',
                    fontWeight: 'normal',
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: light ? 'var(--dark2)' : 'var(--cero)'
                    }
                }
            }}
        />
    )
}