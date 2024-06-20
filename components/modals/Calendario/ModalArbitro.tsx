import React, { useContext, useState } from 'react';
import { CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Grid, useMediaQuery } from '@mui/material';
import { InputSelect } from '../../Material/InputSelect';
import { arbitros } from '../../../utils/arrays';
import { useMutation, useQueryClient } from 'react-query';
import { equiposPut } from '../../../service/equipos';
import { BiExit as Salir } from 'react-icons/bi';
import { BiEditAlt as Editar } from 'react-icons/bi';
import { ButtonSend } from '../../Material/ButtonSend';
import { editarArbitros } from '../../../utils/utilsArbitro';
import Context from '../../../context/contextPrincipal';

export const ModalArbitro = ({ open, setOpen, data, index, id }) => {
    const [light] = useContext(Context);
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });
    const [arbitro, setArbitro] = useState('Seleccionar');
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
                    <InputSelect disable={false} label={'Arbitro'} value={arbitro} setValue={setArbitro} selectData={arbitros} />
                </DialogContent>
                {isLoading && (
                    <Grid sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: !mobile ? '100%' : '100%', backgroundColor: 'rgba(2, 2, 2, 0.488)', zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <CircularProgress style={{ color: light ? 'var(--dark2)' : 'var(--cero)' }} />
                    </Grid>
                )}
                <DialogActions sx={{ background: light ? 'var(--cero)' : 'var(--dark)' }}>
                    <ButtonSend disable={false} handle={handleClose} title={'Cancelar'} icon={Salir} iconColor={''} iconSize={20} />
                    <ButtonSend disable={false} handle={() => { editarArbitros(id, arbitro, index, setIsLoading, editarArbitro, queryClient, handleClose, data) }} title={'Editar'} icon={Editar} iconColor={''} iconSize={20} />
                </DialogActions>
            </Dialog>
        </Grid>
    )
}