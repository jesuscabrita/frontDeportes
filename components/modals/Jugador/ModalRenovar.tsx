import { CircularProgress, Grid, useMediaQuery } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import Context from "../../../context/contextPrincipal";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useMutation, useQueryClient } from "react-query";
import { InputSelect } from "../../Material/InputSelect";
import { contratos } from "../../../utils/arrays";
import { ButtonSend } from "../../Material/ButtonSend";
import { BiExit as Salir } from 'react-icons/bi';
import { MdAutorenew as Renovar } from 'react-icons/md';
import { InputNumber } from "../../Material/InputNumber";
import { formatoPesosArgentinos } from "../../../utils/utils";
import { jugadoresRenovar } from "../../../service/jugadores";
import { editarRenovacion } from "../../../utils/utilsPanelJugadores";

export const ModalRenovarJugador = ({ open, setOpen, equipoId, jugadorId, data }) => {
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });
    const [light] = useContext(Context);
    const [sueldo, setSueldo] = useState(data?.sueldo);
    const [contrato, setContrato] = useState(data?.contrato);
    const queryClient = useQueryClient();
    const [isLoading, setIsLoading] = useState(false);
    const { mutate: renovarJugador } = useMutation(jugadoresRenovar);

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        setSueldo(data?.sueldo);
        setContrato(data?.contrato);
    }, [data]);

    return (
        <Grid>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle sx={{ padding: '20px', color: light ? 'var(dark2)' : 'var(--cero)', background: light ? 'var(--cero)' : 'var(--dark)' }}>
                    {"Renovar Jugador"}
                </DialogTitle>
                <DialogContent sx={{ background: light ? 'var(--cero)' : 'var(--dark)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <Grid item sx={{color: 'var(--neutral)'}}>{`El sueldo minimo para renovar a ${data.name} es de ${formatoPesosArgentinos(data.sueldoCalculo)}, las temporadas no se acumulan (al renovar se debe pagar el sueldo anterior y se descuenta del banco del equipo automaticamente)`}</Grid>
                    <Grid item gap={2} sx={{ display: 'flex', alignItems: 'center', flexDirection: mobile ? 'column' : 'row' }}>
                        <InputNumber disable={false} placeholder={'Sueldo'} label={'Sueldo'} setValue={setSueldo} value={sueldo}/>
                        <InputSelect disable={false} label={'Contrato'} value={contrato} setValue={setContrato} selectData={contratos} />
                    </Grid>
                </DialogContent>
                {isLoading && (
                    <Grid sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: !mobile ? '100%' : '100%', backgroundColor: 'rgba(2, 2, 2, 0.488)', zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <CircularProgress style={{ color: light ? 'var(--dark2)' : 'var(--cero)' }} />
                    </Grid>
                )}
                <DialogActions sx={{ background: light ? 'var(--cero)' : 'var(--dark)' }}>
                    <ButtonSend disable={false} handle={handleClose} title={'Cancelar'} icon={Salir} iconColor={''} iconSize={20} />
                    <ButtonSend disable={false} handle={() => { editarRenovacion(equipoId,jugadorId,setIsLoading,renovarJugador,queryClient,handleClose,contrato,sueldo) }} title={'Renovar'} icon={Renovar} iconColor={''} iconSize={20} />
                </DialogActions>
            </Dialog>
        </Grid>
    )
}