import React, { useContext, useEffect, useState } from "react";
import { CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Grid, useMediaQuery } from "@mui/material";
import { InputText } from "../../Material/InputTex";
import { useMutation, useQueryClient } from "react-query";
import { DelegadoPut } from "../../../service/delegado";
import { editarDelegado } from "../../../utils/utilsDelegado";
import { BiExit as Salir } from 'react-icons/bi';
import { BiEditAlt as Editar } from 'react-icons/bi';
import { ButtonSend } from "../../Material/ButtonSend";
import Context from "../../../context/contextPrincipal";

export const ModalDelegadoEditar = ({ open, setOpen, id, data }) => {
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });
    const [light] = useContext(Context);
    const [isLoading, setIsLoading] = useState(false);
    const [name, setName] = useState(data?.name);
    const [telefono, setTelefono] = useState(data?.telefono);
    const queryClient = useQueryClient();
    const { mutate: editDelegado } = useMutation(DelegadoPut);

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        setName(data?.name);
        setTelefono(data?.telefono);
    }, [data]);

    return (
        <Grid>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle sx={{ padding: '20px', color: light ? 'var(dark2)' : 'var(--cero)', background: light ? 'var(--cero)' : 'var(--dark)' }}>
                    {"Editar Delegado"}
                </DialogTitle>
                <DialogContent sx={{ background: light ? 'var(--cero)' : 'var(--dark)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <Grid container alignItems={'center'} gap={2}>
                        <InputText disable={false} placeholder={'Nombre'} label={'Nombre'} setValue={setName} value={name} />
                    </Grid>
                    <InputText disable={false} placeholder={'Nombre'} label={'Telefono'} setValue={setTelefono} value={telefono} />
                </DialogContent>
                {isLoading && (
                    <Grid sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: !mobile ? '100%' : '100%', backgroundColor: 'rgba(2, 2, 2, 0.488)', zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <CircularProgress style={{ color: light ? 'var(--dark2)' : 'var(--cero)' }} />
                    </Grid>
                )}
                <DialogActions sx={{ background: light ? 'var(--cero)' : 'var(--dark)' }}>
                    <ButtonSend disable={false} handle={handleClose} title={'Cancelar'} icon={Salir} iconColor={''} iconSize={20} />
                    <ButtonSend disable={false} handle={() => { editarDelegado(id, data?._id, name, telefono, setIsLoading, editDelegado, queryClient, handleClose) }} title={'Editar'} icon={Editar} iconColor={''} iconSize={20} />
                </DialogActions>
            </Dialog>
        </Grid>
    )
}