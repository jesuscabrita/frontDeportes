import { Button, CircularProgress, Grid, useMediaQuery } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import Context from "../../context/contextPrincipal";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useMutation, useQueryClient } from "react-query";
import { InputSelect } from "../MaterialUi/InputSelect";
import { jugadoresPut_jornada } from "../../service/jugadores";
import { editarJornada, editarJornadaResta } from "../../utils/utilsPanelJugadores";

export const optionJornada = [
    {value: 1, label: '1 jornada'},
    {value: 2, label: '2 jornadas'},
    {value: 3, label: '3 jornadas'},
    {value: 4, label: '4 jornadas'}
]

export const ModalJornada =({open, setOpen,id, equipoId, data})=>{
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });
    const [light] = useContext(Context);
    const [jornada, setJornada] = useState('');
    const [jornadaresta, setJornadaresta] = useState('');
    const [ suspendido, setSuspendido] =useState(data?.jornadas_suspendido)
    const queryClient = useQueryClient();
    const [isLoading, setIsLoading] = useState(false); 
    const { mutate: editarJornadas } = useMutation(jugadoresPut_jornada);
    const [ suma, setSuma] = useState('')

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        setSuspendido(data?.jornadas_suspendido);
    }, [data]);
    
    return(
        <Grid>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle sx={{ padding: '20px', color: light ? 'var(dark2)' : 'var(--cero)', background: light ? 'var(--cero)' : 'var(--dark)' }}>
                    {"Crear Jugador"}
                </DialogTitle>
                <DialogContent sx={{ background: light ? 'var(--cero)' : 'var(--dark)', display:'flex', flexDirection:'column', gap:'20px' }}>
                    <Grid container alignItems={'center'} gap={2}>
                        <InputSelect label={'Sumar jornadas'} value={jornada} setValue={setJornada} selectData={optionJornada}/>
                        <Button 
                        onClick={()=> {editarJornada(
                            equipoId,id,data.name,suspendido,setIsLoading,editarJornadas,queryClient, jornada, handleClose,setJornada
                        ) }} autoFocus sx={{ color: 'var(--primario)' }}>
                            Modificar
                        </Button>
                    </Grid>
                    <Grid container alignItems={'center'} gap={2}>
                        <InputSelect label={'Restar jornadas'} value={jornadaresta} setValue={setJornadaresta} selectData={optionJornada}/>
                        <Button 
                        disabled={data.jornadas_suspendido < 1}
                        onClick={()=> {editarJornadaResta(
                            equipoId,id,data.name,suspendido,setIsLoading,editarJornadas,queryClient, jornadaresta, handleClose,setJornada
                        ) }} autoFocus sx={{ color: 'var(--primario)' }}>
                            Modificar
                        </Button>
                    </Grid>
                </DialogContent>
                {isLoading && ( 
                <Grid sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: !mobile ? '100%' : '100%', backgroundColor: 'rgba(2, 2, 2, 0.488)', zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <CircularProgress style={{color:light ? 'var(--dark2)': 'var(--cero)'}} />
                </Grid>
                )}
                <DialogActions sx={{ background: light ? 'var(--cero)' : 'var(--dark)' }}>
                    <Button onClick={handleClose} sx={{ color: 'var(--primario)' }}>Cancelar</Button>
                    
                </DialogActions>
            </Dialog>
        </Grid>
    )
}