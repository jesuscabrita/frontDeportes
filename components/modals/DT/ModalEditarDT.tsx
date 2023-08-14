import { CircularProgress, Grid, useMediaQuery } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import Context from "../../../context/contextPrincipal";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { InputText } from "../../Material/InputTex";
import { useMutation, useQueryClient } from "react-query";
import moment from "moment";
import { InputSelect } from "../../Material/InputSelect";
import { nationalities, posiciones } from "../../../utils/arrays";
import { InputFecha } from "../../Material/InputFecha";
import { InputImagen } from "../../Shared/InputImagen";
import { DTPut } from "../../../service/dt";
import { editarDTs } from "../../../utils/utilsDT";
import { BiExit as Salir } from 'react-icons/bi';
import { BiEditAlt as Editar } from 'react-icons/bi';
import { ButtonSend } from "../../Material/ButtonSend";

export const ModalEditarDT = ({ open, setOpen, equipoId, directorTecnicoId, data }) => {
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });
    const [light] = useContext(Context);
    const [name, setName] = useState(data?.name);
    const [telefono, setTelefono] = useState(data?.telefono);
    const [fecha, setFecha] = useState(data?.fecha_nacimiento ? moment(data.fecha_nacimiento) : null);
    const [nacionalidad, setNacionalidad] = useState(data?.nacionalidad);
    const [instagram, setInstagram] = useState(data?.instagram);
    const [foto, setFoto] = useState(data?.foto);
    const [fotoAdded, setFotoAdded] = useState(false);
    const [fotoName, setFotoName] = useState('');
    const queryClient = useQueryClient();
    const [isLoading, setIsLoading] = useState(false);
    const { mutate: editardt } = useMutation(DTPut);

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        setName(data?.name);
        setTelefono(data?.telefono);
        setNacionalidad(data?.nacionalidad);
        setInstagram(data?.instagram);
        setFoto(data?.foto);
        setFecha(data?.fecha_nacimiento ? moment(data.fecha_nacimiento) : null)
    }, [data]);

    return (
        <Grid>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle sx={{ padding: '20px', color: light ? 'var(dark2)' : 'var(--cero)', background: light ? 'var(--cero)' : 'var(--dark)' }}>
                    {"Editar DT"}
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
                    <ButtonSend disable={false} handle={() => { editarDTs(equipoId, directorTecnicoId, name, moment(fecha).format('YYYY-MM-DD HH:mm:ss'), nacionalidad, instagram, telefono, foto, setIsLoading, editardt, queryClient, handleClose) }} title={'Editar'} icon={Editar} iconColor={''} iconSize={20} />
                </DialogActions>
            </Dialog>
        </Grid>
    )
}