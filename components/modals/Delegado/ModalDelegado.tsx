import { Button, CircularProgress, Grid, useMediaQuery } from "@mui/material";
import { useContext, useState } from "react";
import Context from "../../../context/contextPrincipal";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { InputText } from "../../Material/InputTex";
import { useMutation, useQueryClient } from "react-query";
import { delegadoPost } from "../../../service/delegado";
import { crearDelegado } from "../../../utils/utilsDelegado";
import { BiExit as Salir } from 'react-icons/bi';
import { MdGroupAdd as Crear } from 'react-icons/md';
import { ButtonSend } from "../../Material/ButtonSend";

export const ModalDelegado = ({ open, setOpen, id }) => {
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });
    const [light] = useContext(Context);
    const [isLoading, setIsLoading] = useState(false);
    const [name, setName] = useState('');
    const [telefono, setTelefono] = useState('');
    const queryClient = useQueryClient();
    const { mutate: addDelegado } = useMutation(delegadoPost);

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Grid>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle sx={{ padding: '20px', color: light ? 'var(dark2)' : 'var(--cero)', background: light ? 'var(--cero)' : 'var(--dark)' }}>
                    {"Fichar Delegado"}
                </DialogTitle>
                <DialogContent sx={{ background: light ? 'var(--cero)' : 'var(--dark)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <Grid container alignItems={'center'} gap={2}>
                        <InputText placeholder={'Nombre'} label={'Nombre'} setValue={setName} value={name} />
                    </Grid>
                    <InputText placeholder={'Telefono'} label={'Telefono'} setValue={setTelefono} value={telefono} />
                </DialogContent>
                {isLoading && (
                    <Grid sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: !mobile ? '100%' : '100%', backgroundColor: 'rgba(2, 2, 2, 0.488)', zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <CircularProgress style={{ color: light ? 'var(--dark2)' : 'var(--cero)' }} />
                    </Grid>
                )}
                <DialogActions sx={{ background: light ? 'var(--cero)' : 'var(--dark)' }}>
                    <ButtonSend disable={false} handle={handleClose} title={'Cancelar'} icon={Salir} iconColor={''} iconSize={20} />
                    <ButtonSend disable={false} handle={() => { crearDelegado(id, name, telefono, setIsLoading, addDelegado, queryClient, handleClose) }} title={'Fichar'} icon={Crear} iconColor={'var(--check)'} iconSize={20} />
                </DialogActions>
            </Dialog>
        </Grid>
    )
}