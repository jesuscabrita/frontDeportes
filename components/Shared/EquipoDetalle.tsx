import { CircularProgress, Grid, useMediaQuery } from "@mui/material"
import { useContext, useEffect, useState } from "react";
import Context from "../../context/contextPrincipal";

export const EquipoDetalle =({data, isLoading})=>{
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });
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

    return (
        <Grid container sx={{ 
                border: light ? '1px solid var(--dark2)' : '1px solid var(--neutral)',
                borderRadius: '8px',
                padding:'8px',
            }}>
                <Grid container flexDirection={'column'} justifyContent={'center'} alignItems={'center'} sx={{
                    borderRadius: '8px',
                    height: '150px',
                    width: '150px',
                    background: light ? 'var(--gris)' : 'var(--dark2)',
                }}>
                <Grid item>
                    {isLoading || !showImage ? 
                        (<CircularProgress style={{color:light ? 'var(--dark2)': 'var(--cero)'}} size={30} />) 
                    :    showImage ? <img src={data?.logo} alt={data?.name} style={{ height: '80px' }} /> 
                    : null}
                </Grid>
            </Grid>
            
        </Grid>
    )
}