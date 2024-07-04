import React, { useContext, useState } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Grid } from "@mui/material";
import { useMutation, useQueryClient } from "react-query";
import { delegadoPost } from "../../../service/delegado";
import { crearDelegado } from "../../../utils/utilsDelegado";
import { MdGroupAdd as Crear } from 'react-icons/md';
import { ButtomPrimario, ButtomSecundario } from "../../Material/ButtonSend";
import { IoMdPersonAdd } from "react-icons/io";
import { InputFields } from "../../Material/InputFields";
import { LoadingScreen } from "../../Shared/LoadingScreen";
import { IoExit } from "react-icons/io5";
import Context from "../../../context/contextPrincipal";

export const ModalDelegado = ({ open, setOpen, id }) => {
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
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle sx={{ background: light ? 'var(--gris)' : 'var(--dark2)', color: light ? "var(--dark2)" : "var(--cero)", display: 'flex', alignItems: 'center', gap: '10px', letterSpacing: '2px', fontFamily: 'Quicksand' }}>
                <Grid item container alignItems={'center'} gap={1} sx={{ letterSpacing: '2px' }}>
                    {"Crear delegado"}
                    <IoMdPersonAdd size={25} color={light ? "var(--dark2)" : "var(--cero)"} />
                </Grid>
            </DialogTitle>
            <DialogContent sx={{ background: light ? 'var(--gris)' : 'var(--dark2)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <Grid container alignItems={'center'}>
                    <InputFields
                        title="Nombre"
                        descripcion="Escribir nombre"
                        type="text"
                        placeholder="Nombre"
                        value={name}
                        setValue={setName}
                    />
                </Grid>
                <Grid container alignItems={'center'}>
                    <InputFields
                        title="Telefono"
                        descripcion="Escribir telefono"
                        type="text"
                        placeholder="Telefono"
                        value={telefono}
                        setValue={setTelefono}
                    />
                </Grid>
            </DialogContent>
            {isLoading && <LoadingScreen />}
            <DialogActions sx={{ background: light ? 'var(--gris)' : 'var(--dark2)' }}>
                <Grid item container gap={0.5}>
                    <Grid item container sx={{ paddingLeft: '14px', paddingRight: '14px' }}>
                        <ButtomPrimario
                            title="Crear delegado"
                            icon={Crear}
                            handleclick={() => { crearDelegado(id, name, telefono, setIsLoading, addDelegado, queryClient, handleClose) }}
                        />
                    </Grid>
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
    )
}