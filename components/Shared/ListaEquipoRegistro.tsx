import { Button, CircularProgress, Grid } from "@mui/material"
import { useContext, useState, useEffect } from "react";
import Context from "../../context/contextPrincipal";
import { alertaEdit, alertaSubmit } from "../../utils/alert";
import { useMutation, useQueryClient } from "react-query";
import { equiposPut } from "../../service/equipos";

export const ListaEquipoRegistro = ({ data, isLoading }) => {
    const [light] = useContext(Context);
    const [showImage, setShowImage] = useState(false);
    const { mutate: editarEquipo } = useMutation(equiposPut);
    const queryClient = useQueryClient()

    useEffect(() => {
        if (!isLoading) {
            // Mostrar la imagen después de 2 segundos
            const timeoutId = setTimeout(() => {
                setShowImage(true);
            }, 1500);

            // Cancelar el timeout si el componente se desmonta antes de que se complete
            return () => clearTimeout(timeoutId);
        }
    }, [isLoading]);

    const editarEstado = (id: string, estado: string) => {
        const formData = { estado: estado };
        editarEquipo({ form: formData, id }, {
          onSuccess: (success) => {
            queryClient.invalidateQueries(["/api/liga"]);
            alertaSubmit(true, success?.message);
          },
          onError: (err: any) => {
            const errorMessage = err?.response?.data?.message || err.message;
            alertaSubmit(false, errorMessage);
          },
        });
      };
    
    return (
        <Grid container flexDirection={'column'} justifyContent={'center'} alignItems={'center'} sx={{
            border: light ? '1px solid var(--dark2)' : '1px solid var(--neutral)',
            borderRadius: '8px',
            height: '200px',
            width: '180px',
            background: light ? 'var(--gris)' : 'var(--dark2)',
        }}>
            <Grid item>
                {isLoading || !showImage ? (<CircularProgress color="primary" size={30} />) : showImage ? <img src={data?.logo} alt={data?.name} style={{ height: '80px', cursor: 'pointer' }} /> : null}
            </Grid>
            <Grid item sx={{ color: light ? 'var(--dark2)' : 'var(--cero)' }}>
                {data?.name}
            </Grid>

            <Button onClick={() => { editarEstado(data?._id, "registrado") }} sx={{ color: 'var(--primario)', fontSize: '16px' }}>Registrar</Button>
        </Grid>
    )
}