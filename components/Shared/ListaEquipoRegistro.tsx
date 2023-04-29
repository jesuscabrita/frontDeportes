import { Button, CircularProgress, Grid, useMediaQuery } from "@mui/material"
import { useContext, useState, useEffect } from "react";
import Context from "../../context/contextPrincipal";
import { useMutation, useQueryClient } from "react-query";
import { equiposDelete, equiposPut } from "../../service/equipos";
import { TiDeleteOutline as Delete } from 'react-icons/ti';
import { AiTwotoneEdit as Edit } from 'react-icons/ai';
import { ModalEditarEquipo } from "../modals/ModalEditarEquipo";
import { editarEstado, eliminarEquipos } from "../../utils/utils";

export const ListaEquipoRegistro = ({ data, isLoading}) => {
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });
    const [light] = useContext(Context);
    const [showImage, setShowImage] = useState(false);
    const { mutate: editarEquipo } = useMutation(equiposPut);
    const { mutate: eliminarEquipo } = useMutation(equiposDelete);
    const queryClient = useQueryClient();
    const [modalEdit, setModalEdit] = useState(false);

    useEffect(() => {
        if (!isLoading) {
            const timeoutId = setTimeout(() => {
                setShowImage(true);
            }, 1500);
            return () => clearTimeout(timeoutId);
        }
    }, [isLoading]);

    return (
    <>
        <Grid container flexDirection={'column'} justifyContent={'center'} alignItems={'center'} sx={{
            border: light ? '1px solid var(--dark2)' : '1px solid var(--neutral)',
            borderRadius: '8px',
            height: '200px',
            width: '180px',
            background: light ? 'var(--gris)' : 'var(--dark2)',
            }}>
            <Grid sx={{display:'flex', flexDirection:'row', alignItems:'center',gap:'10px' ,paddingLeft:'100px', paddingBottom:'10px'}}>
                {data?.estado == 'enCola' && <Grid item><Delete onClick={()=>{eliminarEquipos(data?._id, eliminarEquipo, queryClient)}} size={20} style={{cursor:'pointer', color:'var(--danger)'}}/></Grid>}
                <Grid item><Edit onClick={()=>{setModalEdit(!modalEdit)}} size={20} style={{cursor:'pointer', color: light ? 'var(--dark2)':'var(--cero)'}}/></Grid>
            </Grid>
            <Grid item>
                {isLoading || !showImage ? 
                    (<CircularProgress style={{color:light ? 'var(--dark2)': 'var(--cero)'}} size={30} />) 
                :    showImage ? <img src={data?.logo} alt={data?.name} style={{ height: '80px', cursor: 'pointer' }} /> 
                : null}
            </Grid>
            <Grid item sx={{ color: light ? 'var(--dark2)' : 'var(--cero)' }}>
                {data?.name}
            </Grid>
            {data?.estado == 'enCola' &&<Button onClick={() => { editarEstado(data?._id, "registrado", editarEquipo, queryClient) }} sx={{ color: 'var(--primario)', fontSize: '16px' }}>Registrar</Button>}
            {data?.estado == 'registrado' &&<Button onClick={() => { editarEstado(data?._id, "enCola", editarEquipo, queryClient) }} sx={{ color: 'var(--primario)', fontSize: '16px' }}>Suspender</Button>}
        </Grid>
        {modalEdit && <ModalEditarEquipo open={modalEdit} setOpen={setModalEdit} data={data}/>}
    </>
    )
}