import { Button, CircularProgress, Grid, useMediaQuery } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import Context from "../../context/contextPrincipal";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { InputText } from "../MaterialUi/InputTex";
import { useMutation, useQueryClient } from "react-query";
import { DelegadoPut } from "../../service/delegado";
import { editarDelegado } from "../../utils/utilsDelegado";

export const ModalDelegadoEditar =({open, setOpen, id, data})=>{
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

    return(
        <Grid>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle sx={{ padding: '20px', color: light ? 'var(dark2)' : 'var(--cero)', background: light ? 'var(--cero)' : 'var(--dark)' }}>
                    {"Crear Delegado"}
                </DialogTitle>
                <DialogContent sx={{ background: light ? 'var(--cero)' : 'var(--dark)', display:'flex', flexDirection:'column', gap:'20px' }}>
                    <Grid container alignItems={'center'} gap={2}>
                        <InputText label={'Nombre'} setValue={setName} value={name} />
                    </Grid>
                        <InputText label={'Telefono'} setValue={setTelefono} value={telefono} />
                </DialogContent>
                {isLoading && ( 
                <Grid sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: !mobile ? '100%' : '100%', backgroundColor: 'rgba(2, 2, 2, 0.488)', zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <CircularProgress style={{color:light ? 'var(--dark2)': 'var(--cero)'}} />
                </Grid>
                )}
                <DialogActions sx={{ background: light ? 'var(--cero)' : 'var(--dark)' }}>
                    <Button onClick={handleClose} sx={{ color: 'var(--primario)' }}>Cancelar</Button>
                    <Button 
                        onClick={()=> {editarDelegado(id,data?._id,name,telefono, setIsLoading, editDelegado,queryClient,handleClose)}} autoFocus sx={{ color: 'var(--primario)' }}>Crear</Button>
                </DialogActions>
            </Dialog>
        </Grid>
    )
}