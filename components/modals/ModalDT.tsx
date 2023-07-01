import { Button, CircularProgress, Grid, useMediaQuery } from "@mui/material";
import { useContext, useState } from "react";
import Context from "../../context/contextPrincipal";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { InputText } from "../Material/InputTex";
import { useMutation, useQueryClient } from "react-query";
import moment from "moment";
import { InputSelect } from "../Material/InputSelect";
import { nationalities, posiciones } from "../../utils/arrays";
import { InputFecha } from "../Material/InputFecha";
import { InputImagen } from "../Shared/InputImagen";
import { dtPost } from "../../service/dt";
import { creardt } from "../../utils/utilsDT";

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
    const [nacionalidad, setNacionalidad] = useState('');
    const queryClient = useQueryClient();
    const { mutate: creardirectorTecnico } = useMutation(dtPost);

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Grid>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle sx={{ padding: '20px', color: light ? 'var(dark2)' : 'var(--cero)', background: light ? 'var(--cero)' : 'var(--dark)' }}>
                    {"Crear DT"}
                </DialogTitle>
                <DialogContent sx={{ background: light ? 'var(--cero)' : 'var(--dark)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <Grid container alignItems={'center'} gap={2}>
                        <InputText label={'Nombre'} setValue={setName} value={name} />
                        <InputFecha value={fecha} setValue={setFecha} />
                    </Grid>
                    <Grid container alignItems={'center'} gap={2}>
                        <InputText label={'Instagram'} setValue={setInstagram} value={instagram} />
                        <InputSelect label={'Nacionalidad'} value={nacionalidad} setValue={setNacionalidad} selectData={nationalities} />
                    </Grid>
                    <Grid container alignItems={'center'} gap={2}>
                        <InputText label={'Telefono'} setValue={setTelefono} value={telefono} />
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
                    <Button onClick={handleClose} sx={{ color: 'var(--primario)' }}>Cancelar</Button>
                    <Button
                        onClick={() => { creardt(id, name, moment(fecha).format('YYYY-MM-DD HH:mm:ss'), nacionalidad, instagram, telefono, foto, setIsLoading, creardirectorTecnico, queryClient, handleClose) }} autoFocus sx={{ color: 'var(--primario)' }}>Crear</Button>
                </DialogActions>
            </Dialog>
        </Grid>
    )
}