import { Button, CircularProgress, Grid, useMediaQuery } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import Context from "../../context/contextPrincipal";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { InputText } from "../MaterialUi/InputTex";
import { useMutation, useQueryClient } from "react-query";
import moment from "moment";
import { alertaSubmit } from "../../utils/alert";
import { InputSelect } from "../MaterialUi/InputSelect";
import { nationalities, posiciones } from "../../utils/arrays";
import { InputFecha } from "../MaterialUi/InputFecha";
import { InputImagen } from "../MaterialUi/InputImagen";
import { jugadoresPut } from "../../service/jugadores";

export const ModalEditarJugador =({open, setOpen,equipoId,jugadorId, data})=>{
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });
    const [light] = useContext(Context);
    const [name, setName] = useState(data?.name);
    const [edad, setEdad] = useState(data?.edad);
    const [posicion, setPosicion] = useState(data?.posicion);
    const [fecha, setFecha] = useState(data?.fecha_nacimiento ? moment(data.fecha_nacimiento) : null);
    const [nacionalidad, setNacionalidad] = useState(data?.nacionalidad);
    const [dorsal, setDorsal] = useState(data?.dorsal);
    const [instagram, setInstagram] = useState(data?.instagram);
    const [foto, setFoto] = useState(data?.foto);
    const [fotoAdded, setFotoAdded] = useState(false);
    const [fotoName, setFotoName] = useState('');
    const queryClient = useQueryClient();
    const [isLoading, setIsLoading] = useState(false); 
    const { mutate: editarJugador } = useMutation(jugadoresPut);

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        setName(data?.name);
        setEdad(data?.edad);
        setPosicion(data?.posicion);
        setNacionalidad(data?.nacionalidad);
        setInstagram(data?.instagram);
        setFoto(data?.foto);
        setDorsal(data?.dorsal)
        setFecha(data?.fecha_nacimiento ? moment(data.fecha_nacimiento) : null)
    }, [data]);

    const editarJugadores = (equipoId: string, jugadorId: string, name: string, edad: string,posicion: string, fecha_nacimiento: string ,nacionalidad: string,dorsal: string,instagram: string,foto: string) => {
        setIsLoading(true);
        const formData = { name, edad, posicion,fecha_nacimiento, nacionalidad , dorsal ,instagram, foto };
            editarJugador({ form: formData, equipoId, jugadorId}, {
                onSuccess: (success) => {
                    queryClient.invalidateQueries(["equipos"]);
                    alertaSubmit(true, success?.message);
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

    return(
        <Grid>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle sx={{ padding: '20px', color: light ? 'var(dark2)' : 'var(--cero)', background: light ? 'var(--cero)' : 'var(--dark)' }}>
                    {"Crear Jugador"}
                </DialogTitle>
                <DialogContent sx={{ background: light ? 'var(--cero)' : 'var(--dark)', display:'flex', flexDirection:'column', gap:'20px' }}>
                    <Grid container alignItems={'center'} gap={2}>
                        <InputText label={'Nombre'} setValue={setName} value={name} />
                        <InputText label={'Edad'} setValue={setEdad} value={edad} />
                    </Grid>
                    <Grid container alignItems={'center'} gap={2}>
                        <InputSelect label={'Posicion'} value={posicion} setValue={setPosicion} selectData={posiciones}/>
                        <InputFecha value={fecha} setValue={setFecha}/>
                    </Grid>
                    <Grid container alignItems={'center'} gap={2}>
                        <InputSelect label={'Nacionalidad'} value={nacionalidad} setValue={setNacionalidad} selectData={nationalities}/>
                        <InputText label={'Dorsal'} setValue={setDorsal} value={dorsal} />
                    </Grid>
                    <Grid container alignItems={'center'} gap={2}>
                        <InputText label={'Instagram'} setValue={setInstagram} value={instagram} />
                    </Grid>
                    <Grid container alignItems={'center'} gap={2} flexDirection={'column'}>
                        <InputImagen setValue={setFoto} value={foto}  setValueAdded={setFotoAdded} setValueName={setFotoName} valueAdded={fotoAdded} valueName={fotoName}/>
                    </Grid>
                </DialogContent>
                {isLoading && ( // si se está cargando, mostrar el spinner y la pantalla de opacidad
                <Grid sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: !mobile ? '100%' : '100%', backgroundColor: 'rgba(2, 2, 2, 0.488)', zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <CircularProgress style={{color:light ? 'var(--dark2)': 'var(--cero)'}} />
                </Grid>
                )}
                <DialogActions sx={{ background: light ? 'var(--cero)' : 'var(--dark)' }}>
                    <Button onClick={handleClose} sx={{ color: 'var(--primario)' }}>Cancelar</Button>
                    <Button onClick={()=> {editarJugadores(equipoId,jugadorId,name, edad, posicion, moment(fecha).format('YYYY-MM-DD HH:mm:ss'), nacionalidad , dorsal ,instagram, foto )}} autoFocus sx={{ color: 'var(--primario)' }}>Editar</Button>
                </DialogActions>
            </Dialog>
        </Grid>
    )
}