import { Fab, Grid, TextField } from "@mui/material"
import { MdOutlineAddPhotoAlternate as AddIcon } from 'react-icons/md';

export const Form = () => {
    return (
        <Grid container flexDirection={'column'} gap={2} alignItems={'center'}>
            <TextField label="Nombre" variant="outlined" />
            <label htmlFor="upload-photo">
                <input
                    style={{ display: 'none' }}
                    id="upload-photo"
                    name="upload-photo"
                    type="file"
                />

                <Fab
                    color="secondary"
                    size="small"
                    component="span"
                    aria-label="add"
                    variant="extended"
                >
                    <AddIcon /> Upload photo
                </Fab>
                <br />
                <br />

                <Fab color="primary" size="small" component="span" aria-label="add">
                    <AddIcon />
                </Fab>
            </label>;
        </Grid>
    )
}