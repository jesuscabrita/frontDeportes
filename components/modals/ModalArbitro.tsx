import { useContext, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Context from '../../context/contextPrincipal';
import { CircularProgress, Grid, useMediaQuery } from '@mui/material';
import { InputSelect } from '../Material/InputSelect';
import { arbitros } from '../../utils/arrays';
import { useMutation, useQueryClient } from 'react-query';
import { equiposPut } from '../../service/equipos';
import { editarArbitros } from '../../utils/utils';

export const ModalArbitro = ({ open, setOpen, data, index, id }) => {
    const [light] = useContext(Context);
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });
    const [arbitro, setArbitro] = useState('');
    const { mutate: editarArbitro } = useMutation(equiposPut);
    const queryClient = useQueryClient();
    const [isLoading, setIsLoading] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Grid>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle sx={{ padding: '20px', color: light ? 'var(dark2)' : 'var(--cero)', background: light ? 'var(--cero)' : 'var(--dark)' }}>
                    {"Editar Arbitro"}
                </DialogTitle>
                <DialogContent sx={{ background: light ? 'var(--cero)' : 'var(--dark)' }}>
                    <InputSelect label={'Arbitro'} value={arbitro} setValue={setArbitro} selectData={arbitros} />
                </DialogContent>
                {isLoading && (
                    <Grid sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: !mobile ? '100%' : '100%', backgroundColor: 'rgba(2, 2, 2, 0.488)', zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <CircularProgress style={{ color: light ? 'var(--dark2)' : 'var(--cero)' }} />
                    </Grid>
                )}
                <DialogActions sx={{ background: light ? 'var(--cero)' : 'var(--dark)' }}>
                    <Button onClick={handleClose} sx={{ color: 'var(--primario)' }}>Cancelar</Button>
                    <Button onClick={() => { editarArbitros(id, arbitro, index, setIsLoading, editarArbitro, queryClient, handleClose, data) }} autoFocus sx={{ color: 'var(--primario)' }}>Editar</Button>
                </DialogActions>
            </Dialog>
        </Grid>
    )
}