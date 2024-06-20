import React, { useContext, useState } from "react";
import { CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Grid, useMediaQuery } from "@mui/material";
import { useMutation, useQueryClient } from "react-query";
import { jugadoresRecindir } from "../../../service/jugadores";
import { BiExit as Salir } from 'react-icons/bi';
import { ButtonSend } from "../../Material/ButtonSend";
import { FaFilePrescription as Recindir } from 'react-icons/fa';
import { formatoPesosArgentinos } from "../../../utils/utils";
import { RecindirJugador } from "../../../utils/utilsPanelJugadores";
import Context from "../../../context/contextPrincipal";

export const ModalRecindir = ({ open, setOpen, data, equipoId }) => {
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });
    const [light] = useContext(Context);
    const queryClient = useQueryClient();
    const [isLoading, setIsLoading] = useState(false);
    const { mutate: recindirContrato } = useMutation(jugadoresRecindir);

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Grid>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle sx={{ padding: '20px', color: light ? 'var(dark2)' : 'var(--cero)', background: light ? 'var(--cero)' : 'var(--dark)' }}>
                    {`Recindir contrato de  ${data.name}`}
                </DialogTitle>
                <DialogContent sx={{ background: light ? 'var(--cero)' : 'var(--dark)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <Grid item sx={{ color: 'var(--neutral)' }}>{`Si vas a recindir el contrato de  ${data.name} tienes que saber que debes pagar su sueldo de ${formatoPesosArgentinos(data.sueldo)}, y una indemnizacion  segun su contrato que es de  ${formatoPesosArgentinos(data.indemnizacion)}, se descontara automaticamente del banco del equipo`}</Grid>
                </DialogContent>
                {isLoading && (
                    <Grid sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: !mobile ? '100%' : '100%', backgroundColor: 'rgba(2, 2, 2, 0.488)', zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <CircularProgress style={{ color: light ? 'var(--dark2)' : 'var(--cero)' }} />
                    </Grid>
                )}
                <DialogActions sx={{ background: light ? 'var(--cero)' : 'var(--dark)' }}>
                    <ButtonSend disable={false} handle={handleClose} title={'Cancelar'} icon={Salir} iconColor={''} iconSize={20} />
                    <ButtonSend title={'Recindir'} icon={Recindir} disable={false} handle={() => { RecindirJugador(equipoId, data._id, recindirContrato, queryClient, 'Si', setIsLoading, handleClose) }} iconSize={20} iconColor={'var(--danger)'} />
                </DialogActions>
            </Dialog>
        </Grid>
    )
}