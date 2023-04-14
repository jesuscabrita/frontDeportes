import { Button, CircularProgress, Grid } from "@mui/material"
import { useContext, useState, useEffect } from "react";
import Context from "../../context/contextPrincipal";
import { alertaEdit } from "../../utils/alert";

export const ListaEquipoRegistro =({data, isLoading})=>{
    const [light] = useContext(Context);
    const [showImage, setShowImage] = useState(false);

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

    return(
        <Grid container flexDirection={'column'} justifyContent={'center'} alignItems={'center'} sx={{
            border:light ?'1px solid var(--dark2)':'1px solid var(--neutral)',
            borderRadius:'8px',
            height:'200px',
            width:'180px',
            background:light ? 'var(--gris)':'var(--dark2)',
        }}>
            <Grid item>
            {isLoading || !showImage ? (<CircularProgress color="primary" size={30} />) : showImage ? <img src={data?.logo} alt={data?.name} style={{height:'80px', cursor:'pointer'}}/> : null}
            </Grid>
            <Grid item sx={{color: light ? 'var(--dark2)' : 'var(--cero)'}}>
                {data?.name}
            </Grid>

            <Button onClick={() => {alertaEdit()}} sx={{color:'var(--primario)', fontSize:'16px'}}>Registrar</Button>
        </Grid>
    )
}