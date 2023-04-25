import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useContext } from 'react';
import Context from '../../context/contextPrincipal';

export const InputFecha =({value, setValue})=>{
    const [light] = useContext(Context);

    return(
    <DatePicker sx={{
        '& .MuiInputBase-input': { width: '160px' },
        '& .MuiInputBase-root': {
            color: light ? 'var(dark2)' : 'var(--cero)',
            border: light ? '1px solid var(dark2)' : '1px solid var(--cero)'
        },
        '& .MuiInputBase-root.MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
            borderColor: 'currentColor'
        },
        '& .MuiInputBase-root.MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline': {
            borderColor: 'none'
        }
        }} value={value} onChange={(date) => setValue(date)}/>
    )
}