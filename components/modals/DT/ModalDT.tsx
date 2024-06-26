import React, { useContext, useState } from "react";
import { CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Grid, useMediaQuery } from "@mui/material";
import { InputText } from "../../Material/InputTex";
import { useMutation, useQueryClient } from "react-query";
import { InputSelect } from "../../Material/InputSelect";
import { nationalities } from "../../../utils/arrays";
import { InputFecha } from "../../Material/InputFecha";
import { InputImagen } from "../../Shared/InputImagen";
import { dtPost } from "../../../service/dt";
import { creardt } from "../../../utils/utilsDT";
import { ButtonSend } from "../../Material/ButtonSend";
import { BiExit as Salir } from 'react-icons/bi';
import { MdGroupAdd as Crear } from 'react-icons/md';
import Context from "../../../context/contextPrincipal";
import moment from "moment";

export const ModalDT = ({ open, setOpen, id }) => {
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });
    const [light] = useContext(Context);
    const [isLoading, setIsLoading] = useState(false);
    const [name, setName] = useState('');
    const [fecha, setFecha] = useState('');
    const [instagram, setInstagram] = useState('');
    const [foto, setFoto] = useState(null);
    const [fotoAdded, setFotoAdded] = useState(false);
    const [fotoName, setFotoName] = useState('');
    const [telefono, setTelefono] = useState('');
    const [nacionalidad, setNacionalidad] = useState('Seleccionar');
    const queryClient = useQueryClient();
    const { mutate: creardirectorTecnico } = useMutation(dtPost);

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Grid>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle sx={{ padding: '20px', color: light ? 'var(dark2)' : 'var(--cero)', background: light ? 'var(--cero)' : 'var(--dark)' }}>
                    {"Fichar DT"}
                </DialogTitle>
                <DialogContent sx={{ background: light ? 'var(--cero)' : 'var(--dark)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <Grid item gap={2} sx={{ display: 'flex', alignItems: 'center', flexDirection: mobile ? 'column' : 'row' }}>
                        <InputText disable={false} placeholder={'Nombre'} label={'Nombre'} setValue={setName} value={name} />
                        <InputFecha label={'Fecha de nacimiento'} value={fecha} setValue={setFecha} />
                    </Grid>
                    <Grid item gap={2} sx={{ display: 'flex', alignItems: 'center', flexDirection: mobile ? 'column' : 'row' }}>
                        <InputText disable={false} placeholder={'Instagram'} label={'Instagram'} setValue={setInstagram} value={instagram} />
                        <InputSelect disable={false} label={'Nacionalidad'} value={nacionalidad} setValue={setNacionalidad} selectData={nationalities} />
                    </Grid>
                    <Grid item gap={2} sx={{ display: 'flex', alignItems: 'center', flexDirection: mobile ? 'column' : 'row' }}>
                        <InputText disable={false} placeholder={'Telefono'} label={'Telefono'} setValue={setTelefono} value={telefono} />
                    </Grid>
                    <Grid container alignItems={'center'} gap={2} flexDirection={'column'}>
                        <InputImagen setValue={setFoto} value={foto} setValueAdded={setFotoAdded} setValueName={setFotoName} valueAdded={fotoAdded} valueName={fotoName} />
                    </Grid>
                </DialogContent>
                {isLoading && (
                    <Grid sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: !mobile ? '100%' : '100%', backgroundColor: 'rgba(2, 2, 2, 0.488)', zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <CircularProgress style={{ color: light ? 'var(--dark2)' : 'var(--cero)' }} />
                    </Grid>
                )}
                <DialogActions sx={{ background: light ? 'var(--cero)' : 'var(--dark)' }}>
                    <ButtonSend disable={false} handle={handleClose} title={'Cancelar'} icon={Salir} iconColor={''} iconSize={20} />
                    <ButtonSend disable={false} handle={() => { creardt(id, name, moment(fecha).format('YYYY-MM-DD HH:mm:ss'), nacionalidad, instagram, telefono, foto, setIsLoading, creardirectorTecnico, queryClient, handleClose) }} title={'Fichar'} icon={Crear} iconColor={'var(--check)'} iconSize={20} />
                </DialogActions>
            </Dialog>
        </Grid>
    )
}