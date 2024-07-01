import React, { useContext, useState } from "react";
import { CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Grid, useMediaQuery } from "@mui/material";
import { InputText } from "../../Material/InputTex";
import { useMutation, useQueryClient } from "react-query";
import { InputSelect } from "../../Material/InputSelect";
import { contratos, nationalities, posiciones } from "../../../utils/arrays";
import { InputFecha } from "../../Material/InputFecha";
import { InputImagen } from "../../Shared/InputImagen";
import { jugadoresPost } from "../../../service/jugadores";
import { ButtonSend } from "../../Material/ButtonSend";
import { BiExit as Salir } from 'react-icons/bi';
import { MdGroupAdd as Crear } from 'react-icons/md';
import { crearJugadores } from "../../../utils/utilsPanelJugadores";
import { InputNumber } from "../../Material/InputNumber";
import Context from "../../../context/contextPrincipal";
import moment from "moment";

export const ModalCrearJugador = ({ open, setOpen, id }) => {
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });
    const [light] = useContext(Context);
    const [name, setName] = useState('');
    const [sueldo, setSueldo] = useState(null);
    const [posicion, setPosicion] = useState('Seleccionar');
    const [fecha, setFecha] = useState(null);
    const [nacionalidad, setNacionalidad] = useState('Seleccionar');
    const [contrato, setContrato] = useState('Seleccionar');
    const [dorsal, setDorsal] = useState('');
    const [instagram, setInstagram] = useState('');
    const [foto, setFoto] = useState(null);
    const [fotoAdded, setFotoAdded] = useState(false);
    const [fotoName, setFotoName] = useState('');
    const queryClient = useQueryClient();
    const [isLoading, setIsLoading] = useState(false);
    const { mutate: crearJugador } = useMutation(jugadoresPost);

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Grid>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle sx={{ padding: '20px', color: light ? 'var(dark2)' : 'var(--cero)', background: light ? 'var(--cero)' : 'var(--dark)' }}>
                    {"Fichar jugador libre"}
                </DialogTitle>
                <DialogContent sx={{ background: light ? 'var(--cero)' : 'var(--dark)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <Grid item gap={2} sx={{ display: 'flex', alignItems: 'center', flexDirection: mobile ? 'column' : 'row' }}>
                        <InputText disable={false} placeholder={'Nombre'} label={'Nombre'} setValue={setName} value={name} />
                        <InputFecha label={'Fecha de nacimiento'} value={fecha} setValue={setFecha} />
                    </Grid>
                    <Grid item gap={2} sx={{ display: 'flex', alignItems: 'center', flexDirection: mobile ? 'column' : 'row' }}>
                        <InputSelect disable={false} label={'Posicion'} value={posicion} setValue={setPosicion} selectData={posiciones} />
                        <InputSelect disable={false} label={'Nacionalidad'} value={nacionalidad} setValue={setNacionalidad} selectData={nationalities} />
                    </Grid>
                    <Grid item gap={2} sx={{ display: 'flex', alignItems: 'center', flexDirection: mobile ? 'column' : 'row' }}>
                        <InputText disable={false} placeholder={'Dorsal'} label={'Dorsal'} setValue={setDorsal} value={dorsal} />
                        <InputText disable={false} placeholder={'Instagram'} label={'Instagram'} setValue={setInstagram} value={instagram} />
                    </Grid>
                    <Grid item gap={2} sx={{ display: 'flex', alignItems: 'center', flexDirection: mobile ? 'column' : 'row' }}>
                        <InputNumber disable={false} placeholder={'Sueldo'} label={'Sueldo'} setValue={setSueldo} value={sueldo} />
                        <InputSelect disable={false} label={'Contrato'} value={contrato} setValue={setContrato} selectData={contratos} />
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
                    <ButtonSend disable={false} handle={() => { crearJugadores(id, name, sueldo, contrato, posicion, moment(fecha).format('YYYY-MM-DD HH:mm:ss'), nacionalidad, dorsal, instagram, foto, setIsLoading, crearJugador, queryClient, handleClose) }} title={'Fichar'} icon={Crear} iconColor={'var(--check)'} iconSize={20} />
                </DialogActions>
            </Dialog>
        </Grid>
    )
}