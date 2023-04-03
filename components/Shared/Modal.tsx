import React, { useContext, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { MobileDateTimePicker } from '@mui/x-date-pickers';
import Context from '../../context/contextPrincipal';
import { Grid } from '@mui/material';
import moment from 'moment';

export const ModalEdit = ({open,setOpen}) => {
    const [light] = useContext(Context);
    const [fecha, setFecha] = useState(moment())
    const formatoFecha = moment(fecha,'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY');
    
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Grid>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle sx={{padding:'20px', color:light ? 'var(dark2)': 'var(--cero)', background:light ?'var(--cero)':'var(--dark)'}}>
                    {"Editar fecha"}
                </DialogTitle>
                <DialogContent sx={{background:light ?'var(--cero)':'var(--dark)'}}>
                    <MobileDateTimePicker value={fecha} onChange={(date) => setFecha(date)} sx={{
                        '& .MuiInputBase-root':{border: light ? '1px solid var(--dark2)': '1px solid var(--cero)' ,color:light ?'var(--dark2)' :'var(--cero)'},
                        '& .css-9yjdhh-MuiDialogContent-root':{background:'red'},
                    }} />
                </DialogContent>
                <DialogActions sx={{background:light ?'var(--cero)':'var(--dark)'}}>
                    <Button onClick={handleClose} sx={{color:'var(--primario)'}}>Cancelar</Button>
                    <Button onClick={handleClose} autoFocus sx={{color:'var(--primario)'}}>Editar</Button>
                </DialogActions>
            </Dialog>
        </Grid>
    )
}