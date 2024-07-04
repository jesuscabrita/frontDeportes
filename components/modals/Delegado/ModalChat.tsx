import React, { useContext, useEffect, useState } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Grid, useMediaQuery } from "@mui/material";
import { IoLogoWhatsapp as Chat } from 'react-icons/io';
import { MdEmail as Correo } from 'react-icons/md';
import { IoExit } from "react-icons/io5";
import Context from "../../../context/contextPrincipal";
import { ButtomSecundario } from "../../Material/ButtonSend";

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
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle sx={{ background: light ? 'var(--gris)' : 'var(--dark2)', color: light ? "var(--dark2)" : "var(--cero)", display: 'flex', alignItems: 'center', gap: '10px', letterSpacing: '2px', fontFamily: 'Quicksand' }}>
                <Grid item container alignItems={'center'} gap={1} sx={{ letterSpacing: '2px' }}>
                    {"Contactar Delegado"}
                </Grid>
            </DialogTitle>
            <DialogContent sx={{ background: light ? 'var(--gris)' : 'var(--dark2)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <Grid container alignItems={'center'} justifyContent={'center'} gap={2} sx={{ cursor: 'pointer', color: light ? 'var(--dark2)' : 'var(--cero)' }}>
                    <Chat size={40} onClick={handleChatClick} />
                </Grid>
                <Grid container alignItems={'center'} justifyContent={'center'} gap={2} sx={{ cursor: 'pointer', color: light ? 'var(--dark2)' : 'var(--cero)' }}>
                    <Correo size={40} onClick={handleCorreoClick} />
                </Grid>
            </DialogContent>
            <DialogActions sx={{ background: light ? 'var(--gris)' : 'var(--dark2)' }}>
                <Grid item container gap={0.5}>
                    <Grid item container sx={{ paddingLeft: '14px', paddingRight: '14px' }}>
                        <ButtomSecundario
                            title="Cancelar"
                            icon={IoExit}
                            handleclick={handleClose}
                        />
                    </Grid>
                </Grid>
            </DialogActions>
        </Dialog>
    );
};