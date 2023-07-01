import { Button, CircularProgress, Grid, useMediaQuery } from "@mui/material";
import { useContext, useState } from "react";
import Context from "../../../context/contextPrincipal";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useMutation, useQueryClient } from "react-query";
import { jugadoresPut_capitan } from "../../../service/jugadores";
import { editarCapitan, editarCapitanNo } from "../../../utils/utilsPanelJugadores";
import { BiExit as Salir } from 'react-icons/bi';
import { ButtonSend } from "../../Material/ButtonSend";

export const ModalJugadorCapitan = ({ open, setOpen, jugador, equipoId }) => {
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });
    const [light] = useContext(Context);
    const [isLoading, setIsLoading] = useState(false);
    const { mutate: capitan_jugador } = useMutation(jugadoresPut_capitan);
    const queryClient = useQueryClient();

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Grid>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle sx={{ padding: '20px', color: light ? 'var(--dark2)' : 'var(--cero)', background: light ? 'var(--cero)' : 'var(--dark)' }}>
                    {'Seleccionar capitan'}
                </DialogTitle>
                <DialogContent sx={{ background: light ? 'var(--cero)' : 'var(--dark)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <Grid container alignItems={'center'} gap={2}>
                        <Button onClick={() => {
                            editarCapitan(
                                equipoId, jugador._id, jugador.name, setIsLoading, capitan_jugador, queryClient, 'Si', handleClose
                            )
                        }} sx={{ color: 'var(--primario)' }}>SI</Button>
                        <Button onClick={() => {
                            editarCapitanNo(
                                equipoId, jugador._id, jugador.name, setIsLoading, capitan_jugador, queryClient, 'No', handleClose
                            )
                        }} sx={{ color: 'var(--primario)' }}>No</Button>
                    </Grid>
                </DialogContent>
                {isLoading && (
                    <Grid sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: !mobile ? '100%' : '100%', backgroundColor: 'rgba(2, 2, 2, 0.488)', zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <CircularProgress style={{ color: light ? 'var(--dark2)' : 'var(--cero)' }} />
                    </Grid>
                )}
                <DialogActions sx={{ background: light ? 'var(--cero)' : 'var(--dark)' }}>
                    <ButtonSend disable={false} handle={handleClose} title={'Cancelar'} icon={Salir} iconColor={''} iconSize={20} />
                </DialogActions>
            </Dialog>
        </Grid>
    )
}