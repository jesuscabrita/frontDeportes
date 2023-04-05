import React, { useContext, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Context from '../../context/contextPrincipal';
import { Grid } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export const ModalArbitro = ({ open, setOpen }) => {
    const [light] = useContext(Context);
    const [arbitro, setArbitro] = useState('');

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event: SelectChangeEvent) => {
        setArbitro(event.target.value);
    }

    return (
        <Grid>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle sx={{ padding: '20px', color: light ? 'var(dark2)' : 'var(--cero)', background: light ? 'var(--cero)' : 'var(--dark)' }}>
                    {"Editar Arbitro"}
                </DialogTitle>
                <DialogContent sx={{ background: light ? 'var(--cero)' : 'var(--dark)' }}>
                    <FormControl sx={{ m: 1, width: 220 }}>
                        <InputLabel sx={{color :light ? 'var(--dark2)':'var(--cero)'}}>Arbitro</InputLabel>
                        <Select 
                            value={arbitro} 
                            label='Arbitro' 
                            onChange={handleChange}
                            MenuProps={{PaperProps : {sx : {background: light ? 'var(--cero)': 'var(--dark3)'}}}}
                            sx={{'& .MuiInputBase-input':{color:light ? 'var(--dark3)':'var(--cero)', border: light ? '1px solid var(--dark2)': '1px solid var(--cero)'}}}
                        >
                            <MenuItem value={"No definido"} sx={{background: light ? 'var(--cero)' :'var(--dark3)',color: light ? 'var(--dark3)':'var(--cero)' }}>
                                <em>No definido</em>
                            </MenuItem>
                            <MenuItem value={'Andres Mujica'} sx={{background: light ? 'var(--cero)' :'var(--dark3)', color: light ? 'var(--dark3)':'var(--cero)'}}>Andres Mujica</MenuItem>
                            <MenuItem value={'Negreira'} sx={{background: light ? 'var(--cero)' :'var(--dark3)', color: light ? 'var(--dark3)':'var(--cero)'}}>Negreira</MenuItem>
                            <MenuItem value={'Hernandez Hernandez'} sx={{background: light ? 'var(--cero)' :'var(--dark3)', color: light ? 'var(--dark3)':'var(--cero)'}}>Hernandez Hernandez</MenuItem>
                        </Select>
                        <FormHelperText sx={{color: light ? 'var(--dark2)':'var(--cero)'}}>Seleccione el arbitro</FormHelperText>
                    </FormControl>
                </DialogContent>
                <DialogActions sx={{ background: light ? 'var(--cero)' : 'var(--dark)' }}>
                    <Button onClick={handleClose} sx={{ color: 'var(--primario)' }}>Cancelar</Button>
                    <Button onClick={handleClose} autoFocus sx={{ color: 'var(--primario)' }}>Editar</Button>
                </DialogActions>
            </Dialog>
        </Grid>
    )
}