import { Button, CircularProgress, Grid, useMediaQuery } from "@mui/material";
import { useContext, useState } from "react";
import Context from "../../context/contextPrincipal";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { InputText } from "../MaterialUi/InputTex";
import { useMutation, useQueryClient } from "react-query";
import moment from "moment";
import { InputSelect } from "../MaterialUi/InputSelect";
import { nationalities, posiciones } from "../../utils/arrays";
import { InputFecha } from "../MaterialUi/InputFecha";
import { InputImagen } from "../MaterialUi/InputImagen";
import { jugadoresPost } from "../../service/jugadores";
import { crearJugadores } from "../../utils/utils";

export const ModalJugador =({open, setOpen,id})=>{
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });
    const [light] = useContext(Context);
    const [name, setName] = useState('');
    const [edad, setEdad] = useState('');
    const [posicion, setPosicion] = useState('');
    const [fecha, setFecha] = useState('');
    const [nacionalidad, setNacionalidad] = useState('');
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
                {isLoading && ( 
                <Grid sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: !mobile ? '100%' : '100%', backgroundColor: 'rgba(2, 2, 2, 0.488)', zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <CircularProgress style={{color:light ? 'var(--dark2)': 'var(--cero)'}} />
                </Grid>
                )}
                <DialogActions sx={{ background: light ? 'var(--cero)' : 'var(--dark)' }}>
                    <Button onClick={handleClose} sx={{ color: 'var(--primario)' }}>Cancelar</Button>
                    <Button 
                        onClick={()=> {crearJugadores(id, name, edad, posicion, moment(fecha).format('YYYY-MM-DD HH:mm:ss'), nacionalidad , dorsal ,instagram, foto, setIsLoading,crearJugador,queryClient,handleClose)}} autoFocus sx={{ color: 'var(--primario)' }}>Crear</Button>
                </DialogActions>
            </Dialog>
        </Grid>
    )
}