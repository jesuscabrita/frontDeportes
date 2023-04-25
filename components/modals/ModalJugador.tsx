import { Button, CircularProgress, Grid, useMediaQuery } from "@mui/material";
import { useContext, useState } from "react";
import Context from "../../context/contextPrincipal";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { InputText } from "../MaterialUi/InputTex";
import { useMutation, useQueryClient } from "react-query";
import { RiImageAddFill as Add } from 'react-icons/ri';
import { IoMdImages as Images } from 'react-icons/io';
import { TiDeleteOutline as Delete } from 'react-icons/ti';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from "moment";
import { jugadoresPost } from "../../service/equipos";
import { alertaSubmit } from "../../utils/alert";

const nationalities = [
    { name: 'Afghanistan', code: 'AF' },
    { name: 'Albania', code: 'AL' },
    { name: 'Algeria', code: 'DZ' },
    // Agrega aquí todas las nacionalidades que desees
];

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

    const handleChangePosicion = (event: SelectChangeEvent) => {
        setPosicion(event.target.value);
    }

    const handleChangeNacionalidad = (event) => {
        setNacionalidad(event.target.value);
    };

    const crearJugadores = (
        id: string, 
        name: string, 
        edad: string,
        posicion: string, 
        fecha_nacimiento: string, 
        nacionalidad: string,
        dorsal: string,
        instagram: string,
        foto: string
        ) => {
        setIsLoading(true);
        const formData = { name, edad, posicion,fecha_nacimiento, nacionalidad , dorsal ,instagram, foto };
            crearJugador({ form: formData, eid: id }, {
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
                    // handleClose()
                },
            });
        }

    const handleFotoChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            setFoto(reader.result);
            setFotoAdded(true); // indicar que se agregó el logo
            setFotoName(file.name);
        };
        reader.readAsDataURL(file);
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
                    <FormControl sx={{ m: 1, width: 220 }}>
                        <InputLabel sx={{color :light ? 'var(--dark2)':'var(--cero)'}}>Posicion</InputLabel>
                        <Select 
                            value={posicion} 
                            label='Posicion' 
                            onChange={handleChangePosicion}
                            MenuProps={{PaperProps : {sx : {background: light ? 'var(--cero)': 'var(--dark3)'}}}}
                            sx={{'& .MuiInputBase-input':{color:light ? 'var(--dark3)':'var(--cero)', border: light ? '1px solid var(--dark2)': '1px solid var(--cero)'}}}
                        >
                            <MenuItem value={"Portero"} sx={{background: light ? 'var(--cero)' :'var(--dark3)',color: light ? 'var(--dark3)':'var(--cero)' }}>Portero</MenuItem>
                            <MenuItem value={'Defensa'} sx={{background: light ? 'var(--cero)' :'var(--dark3)', color: light ? 'var(--dark3)':'var(--cero)'}}>Defensa</MenuItem>
                            <MenuItem value={'Medio'} sx={{background: light ? 'var(--cero)' :'var(--dark3)', color: light ? 'var(--dark3)':'var(--cero)'}}>Medio</MenuItem>
                            <MenuItem value={'Delantero'} sx={{background: light ? 'var(--cero)' :'var(--dark3)', color: light ? 'var(--dark3)':'var(--cero)'}}>Delantero</MenuItem>
                        </Select>
                    </FormControl>
                    <DatePicker  value={fecha} onChange={(date) => setFecha(date)}/>
                </Grid>
                <Grid container alignItems={'center'} gap={2}>
                <FormControl sx={{ m: 1, width: 220 }}>
                    <InputLabel sx={{color :light ? 'var(--dark2)':'var(--cero)'}}>Nacionalidad</InputLabel>
                    <Select
                        value={nacionalidad}
                        label="Nacionalidad"
                        onChange={handleChangeNacionalidad}
                        MenuProps={{PaperProps : {sx : {background: light ? 'var(--cero)': 'var(--dark3)'}}}}
                            sx={{'& .MuiInputBase-input':{color:light ? 'var(--dark3)':'var(--cero)', border: light ? '1px solid var(--dark2)': '1px solid var(--cero)'}}}
                    >
                        {/* Genera las opciones usando la función map */}
                        {nationalities.map((nacionalidad) => (
                        <MenuItem key={nacionalidad.code} value={nacionalidad.code}>
                            {nacionalidad.name}
                        </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <InputText label={'Dorsal'} setValue={setDorsal} value={dorsal} />
                </Grid>
                <Grid container alignItems={'center'} gap={2}>
                    <InputText label={'Instagram'} setValue={setInstagram} value={instagram} />
                </Grid>
                <Grid container alignItems={'center'} gap={2} flexDirection={'column'}>
                {foto && (
                        <img src={foto} alt="Logo del equipo" style={{ maxWidth: "150px", maxHeight: "150px" }} />
                    )}
                    <Button
                        variant="contained"
                        component="label"
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "10px",
                            background: "var(--dark2)",
                            "&:hover": { background: "var(--dark2hover)" },
                        }}
                    >
                        <Add /> Agregue foto
                        <input hidden accept="image/*" multiple type="file" onChange={handleFotoChange} />
                    </Button>
            {fotoAdded && (
                <Grid container flexDirection={'column'}>
                    <Grid item sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        color: 'var(--check)'
                    }}>
                        Logo agregado correctamente
                        <Images size={25} />
                    </Grid>
                    <Grid item sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: light ? 'var(--dark2)' : 'var(--gris)'
                    }}>
                        {fotoName}
                    </Grid>
                    <Grid item sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--danger)',
                    }}>
                        <Delete
                            size={30}
                            style={{ cursor: 'pointer' }}
                            onClick={() => {
                                setFoto(null);
                                setFotoAdded(false);
                                setFotoName('');
                            }} />
                    </Grid>
                </Grid>
            )}
            </Grid>
                </DialogContent>
                {isLoading && ( // si se está cargando, mostrar el spinner y la pantalla de opacidad
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: !mobile ? '100%' : '100%', backgroundColor: 'rgba(2, 2, 2, 0.488)', zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <CircularProgress color="primary" />
                </div>
            )}
                <DialogActions sx={{ background: light ? 'var(--cero)' : 'var(--dark)' }}>
                    <Button onClick={handleClose} sx={{ color: 'var(--primario)' }}>Cancelar</Button>
                    <Button onClick={()=> {crearJugadores(id, name, edad, posicion,fecha, nacionalidad , dorsal ,instagram, foto)}} autoFocus sx={{ color: 'var(--primario)' }}>Editar</Button>
                </DialogActions>
            </Dialog>
        </Grid>
    )
}