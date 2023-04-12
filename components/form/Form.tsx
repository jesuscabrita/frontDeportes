import { Button, Grid, TextField } from "@mui/material";
import { RiImageAddFill as Add } from 'react-icons/ri';

export const Form = () => {
    return (
        <Grid container flexDirection={'column'} gap={2} alignItems={'center'}>
            <TextField label="Nombre" variant="outlined" />
            <Button variant="contained" component="label" 
                sx={{
                    display:'flex', 
                    alignItems:'center',
                    justifyContent:'center',
                    gap:'10px',
                    background:'var(--dark2)',
                    '&:hover':{background:'var(--dark2hover)'}
                }}>
                <Add/> Agregue el logo
            <input hidden accept="image/*" multiple type="file" />
            </Button>
        </Grid>
    )
}