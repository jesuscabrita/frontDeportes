import React, { useContext, useEffect, useState } from 'react';
import { MobileDateTimePicker } from '@mui/x-date-pickers';
import { CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Grid, useMediaQuery } from '@mui/material';
import { useMutation, useQueryClient } from 'react-query';
import { alertaSubmit } from '../../../utils/alert';
import { equiposPut } from '../../../service/equipos';
import { BiExit as Salir } from 'react-icons/bi';
import { BiEditAlt as Editar } from 'react-icons/bi';
import { ButtonSend } from '../../Material/ButtonSend';
import Context from '../../../context/contextPrincipal';
import moment from 'moment';

export const ModalEdit = ({ open, setOpen, id, data, index }) => {
    const [light] = useContext(Context);
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });
    const [fecha, setFecha] = useState(data?.fecha ? moment(data.fecha[index]) : null);
    const { mutate: editarFecha } = useMutation(equiposPut);
    const queryClient = useQueryClient();
    const [isLoading, setIsLoading] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const editarFechas = (id: string, index) => {
        setIsLoading(true);
        const updatedFecha = moment(fecha).format('YYYY-MM-DD HH:mm:ss');
        const updatedFechaArr = [...data.fecha];
        updatedFechaArr[index] = updatedFecha;
        const formData = { fecha: updatedFechaArr };
        editarFecha({ form: formData, id }, {
            onSuccess: (success) => {
                queryClient.invalidateQueries(["/api/liga"]);
                alertaSubmit(true, 'Se editó la fecha correctamente');
                setIsLoading(false);
                handleClose()
            },
            onError: (err: any) => {
                const errorMessage = err?.response?.data?.message || err.message;
                alertaSubmit(false, errorMessage);
                setIsLoading(false);
            },
        });
    }

    useEffect(() => {
        setFecha(data?.fecha ? moment(data.fecha[index]) : null)
    }, [data]);

    return (
        <Grid>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle sx={{ padding: '20px', color: light ? 'var(dark2)' : 'var(--cero)', background: light ? 'var(--cero)' : 'var(--dark)' }}>
                    {"Editar fecha"}
                </DialogTitle>
                <DialogContent sx={{ background: light ? 'var(--cero)' : 'var(--dark)' }}>
                    <MobileDateTimePicker
                        value={fecha as any}
                        onChange={(date) => setFecha(date)}
                        sx={{
                            '& .MuiInputBase-root': {
                                border: light ? '1px solid var(--dark2)' : '1px solid var(--cero)',
                                color: light ? 'var(--dark2)' : 'var(--cero)',
                            }
                        }}
                    />
                </DialogContent>
                {isLoading && (
                    <Grid sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: !mobile ? '100%' : '100%', backgroundColor: 'rgba(2, 2, 2, 0.488)', zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <CircularProgress style={{ color: light ? 'var(--dark2)' : 'var(--cero)' }} />
                    </Grid>
                )}
                <DialogActions sx={{ background: light ? 'var(--cero)' : 'var(--dark)' }}>
                    <ButtonSend disable={false} handle={handleClose} title={'Cancelar'} icon={Salir} iconColor={''} iconSize={20} />
                    <ButtonSend disable={false} handle={() => { editarFechas(id, index) }} title={'Editar'} icon={Editar} iconColor={''} iconSize={20} />
                </DialogActions>
            </Dialog>
        </Grid>
    )
}