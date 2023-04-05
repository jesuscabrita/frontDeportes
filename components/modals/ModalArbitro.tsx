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
                        <InputLabel id="demo-simple-select-helper-label">Arbitro</InputLabel>
                        <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            value={arbitro}
                            label="Age"
                            onChange={handleChange}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={10}>Andres Mujica</MenuItem>
                            <MenuItem value={20}>Negreira</MenuItem>
                            <MenuItem value={30}>Hernandez Hernandez</MenuItem>
                        </Select>
                        <FormHelperText>Seleccione el arbitro</FormHelperText>
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