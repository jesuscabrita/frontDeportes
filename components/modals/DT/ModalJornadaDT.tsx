import React, { useContext, useEffect, useState } from "react";
import { CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Grid, useMediaQuery } from "@mui/material";
import { useMutation, useQueryClient } from "react-query";
import { InputSelect } from "../../Material/InputSelect";
import { DTPut_jornada } from "../../../service/dt";
import { editarJornadaDT, editarJornadaRestaDT } from "../../../utils/utilsDT";
import { optionJornada } from "../../../utils/arrays";
import { ButtonSend } from "../../Material/ButtonSend";
import { AiOutlineEdit as Edit } from 'react-icons/ai';
import { BiExit as Salir } from 'react-icons/bi';
import Context from "../../../context/contextPrincipal";

export const ModalJornadaDT = ({ open, setOpen, id, equipoId, data }) => {
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });
    const [light] = useContext(Context);
    const [jornada, setJornada] = useState('Seleccionar');
    const [jornadaresta, setJornadaresta] = useState('Seleccionar');
    const [suspendido, setSuspendido] = useState(data?.jornadas_suspendido)
    const queryClient = useQueryClient();
    const [isLoading, setIsLoading] = useState(false);
    const { mutate: editarJornadasDT } = useMutation(DTPut_jornada);

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        setSuspendido(data?.jornadas_suspendido);
    }, [data]);

    return (
        <Grid>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle sx={{ padding: '20px', color: light ? 'var(dark2)' : 'var(--cero)', background: light ? 'var(--cero)' : 'var(--dark)' }}>
                    {"Crear Jugador"}
                </DialogTitle>
                <DialogContent sx={{ background: light ? 'var(--cero)' : 'var(--dark)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <Grid container alignItems={'center'} gap={2}>
                        <InputSelect disable={false} label={'Sumar jornadas'} value={jornada} setValue={setJornada} selectData={optionJornada} />
                        <ButtonSend disable={false} handle={() => { editarJornadaDT(equipoId, id, data.name, suspendido, setIsLoading, editarJornadasDT, queryClient, jornada, handleClose, setJornada) }} title={'Sumar'} icon={Edit} iconColor={''} iconSize={20} />
                    </Grid>
                    <Grid container alignItems={'center'} gap={2}>
                        <InputSelect disable={suspendido === 1} label={'Restar jornadas'} value={jornadaresta} setValue={setJornadaresta} selectData={optionJornada} />
                        <ButtonSend disable={suspendido === 1} handle={() => { editarJornadaRestaDT(equipoId, id, data.name, suspendido, setIsLoading, editarJornadasDT, queryClient, jornadaresta, handleClose, setJornada) }} title={'Restar'} icon={Edit} iconColor={''} iconSize={20} />
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