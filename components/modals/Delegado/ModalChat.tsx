import { Button, Grid, useMediaQuery } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import Context from "../../../context/contextPrincipal";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { IoLogoWhatsapp as Chat } from 'react-icons/io';
import { MdEmail as Correo } from 'react-icons/md';
import { BiExit as Salir } from 'react-icons/bi';
import { ButtonSend } from "../../Material/ButtonSend";

export const ModalChatDelegado = ({ open, setOpen, data }) => {
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });
    const [light] = useContext(Context);
    const [correo, setCorreo] = useState(data?.correo);
    const [telefono, setTelefono] = useState(data?.telefono);
    const [mensajeAutomatico] = useState(`Hola, Necesito más información del ${data?.equipo}!`);

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        setCorreo(data?.correo);
        setTelefono(data?.telefono);
    }, [data]);

    const handleChatClick = () => {
        const numeroArgentina = `+54${telefono}`;
        const mensaje = encodeURIComponent(mensajeAutomatico);
        const whatsappLink = `https://api.whatsapp.com/send?phone=${numeroArgentina}&text=${mensaje}`;
        window.open(whatsappLink, '_blank');
    };

    const handleCorreoClick = () => {
        const correoLink = `mailto:${correo}?subject=Solicitud&body=${mensajeAutomatico}`;
        window.open(correoLink);
    }

    return (
        <Grid>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle sx={{ padding: '20px', color: light ? 'var(dark2)' : 'var(--cero)', background: light ? 'var(--cero)' : 'var(--dark)' }}>
                    {"Contactar Delegado"}
                </DialogTitle>
                <DialogContent sx={{ background: light ? 'var(--cero)' : 'var(--dark)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <Grid container alignItems={'center'} justifyContent={'center'} gap={2} sx={{ cursor: 'pointer', color: light ? 'var(--dark2)' : 'var(--cero)' }}>
                        <Chat size={40} onClick={handleChatClick} />
                    </Grid>
                    <Grid container alignItems={'center'} justifyContent={'center'} gap={2} sx={{ cursor: 'pointer', color: light ? 'var(--dark2)' : 'var(--cero)' }}>
                        <Correo size={40} onClick={handleCorreoClick} />
                    </Grid>
                </DialogContent>
                <DialogActions sx={{ background: light ? 'var(--cero)' : 'var(--dark)' }}>
                    <ButtonSend disable={false} handle={handleClose} title={'Cancelar'} icon={Salir} iconColor={''} iconSize={20} />
                </DialogActions>
            </Dialog>
        </Grid>
    );
};