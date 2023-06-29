import { Button, Grid, useMediaQuery } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import Context from "../../context/contextPrincipal";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { IoLogoWhatsapp as Chat } from 'react-icons/io';
import { MdEmail as Correo } from 'react-icons/md';

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
        const numeroArgentina = `+54${telefono}`; // Número de teléfono de Argentina
        const mensaje = encodeURIComponent(mensajeAutomatico); // Codifica el mensaje automático para que se incluya correctamente en el enlace de WhatsApp
        const whatsappLink = `https://api.whatsapp.com/send?phone=${numeroArgentina}&text=${mensaje}`; // Enlace de WhatsApp con el número de teléfono y el mensaje automático
        window.open(whatsappLink, '_blank'); // Abre el enlace en una nueva pestaña
    };

    const handleCorreoClick = () => {
        const correoLink = `mailto:${correo}?subject=Solicitud&body=${mensajeAutomatico}`; // Enlace de correo electrónico con la dirección de correo, asunto y cuerpo predefinidos
        window.open(correoLink); // Abre el enlace en el cliente de correo electrónico predeterminado
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
                    <Button onClick={handleClose} sx={{ color: 'var(--primario)' }}>Cancelar</Button>
                </DialogActions>
            </Dialog>
        </Grid>
    );
};