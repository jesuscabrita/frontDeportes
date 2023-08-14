import { CircularProgress, Grid, useMediaQuery } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import Context from "../../../context/contextPrincipal";
import { useMutation, useQueryClient } from "react-query";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { InputText } from "../../Material/InputTex";
import { InputSelect } from "../../Material/InputSelect";
import { roles } from "../../../utils/arrays";
import { ButtonSend } from "../../Material/ButtonSend";
import { BiExit as Salir } from 'react-icons/bi';
import { BiEditAlt as Editar } from 'react-icons/bi';
import { userPut } from "../../../service/session";
import { editarUser } from "../../../utils/utilsUser";

export const ModalUser = ({ open, setOpen, data }) => {
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });
    const [light] = useContext(Context);
    const [nombre, setNombre] = useState(data?.nombre);
    const [apellido, setApellido] = useState(data?.apellido);
    const [role, setRole] = useState(data?.role);
    const queryClient = useQueryClient();
    const [isLoading, setIsLoading] = useState(false);
    const { mutate: editarUsuario } = useMutation(userPut);

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        setNombre(data?.nombre);
        setApellido(data?.apellido);
        setRole(data?.role);
    }, [data]);

    return (
        <Grid>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle sx={{ padding: '20px', color: light ? 'var(dark2)' : 'var(--cero)', background: light ? 'var(--cero)' : 'var(--dark)' }}>
                    {"Editar Usuario"}
                </DialogTitle>
                <DialogContent sx={{ background: light ? 'var(--cero)' : 'var(--dark)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <Grid item gap={2} sx={{ display: 'flex', alignItems: 'center', flexDirection: mobile ? 'column' : 'row' }}>
                        <InputText disable={false} placeholder={'Nombre'} label={'Nombre'} setValue={setNombre} value={nombre} />
                        <InputText disable={false} placeholder={'Apellido'} label={'Apellido'} setValue={setApellido} value={apellido} />
                    </Grid>
                    <Grid item gap={2} sx={{ display: 'flex', alignItems: 'center', flexDirection: mobile ? 'column' : 'row' }}>
                        <InputSelect disable={false} label={'Rol'} value={role} setValue={setRole} selectData={roles} />
                    </Grid>
                </DialogContent>
                {isLoading && (
                    <Grid sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: !mobile ? '100%' : '100%', backgroundColor: 'rgba(2, 2, 2, 0.488)', zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <CircularProgress style={{ color: light ? 'var(--dark2)' : 'var(--cero)' }} />
                    </Grid>
                )}
                <DialogActions sx={{ background: light ? 'var(--cero)' : 'var(--dark)' }}>
                    <ButtonSend disable={false} handle={handleClose} title={'Cancelar'} icon={Salir} iconColor={''} iconSize={20} />
                    <ButtonSend disable={false} handle={() => { editarUser(data?._id,nombre,apellido,role, setIsLoading, editarUsuario, queryClient, handleClose) }} title={'Editar'} icon={Editar} iconColor={''} iconSize={20} />
                </DialogActions>
            </Dialog>
        </Grid>
    )
}