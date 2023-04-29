import { useContext, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Context from '../../context/contextPrincipal';
import { CircularProgress, Grid, useMediaQuery } from '@mui/material';
import { IoMdImages as Images } from 'react-icons/io';
import { TiDeleteOutline as Delete } from 'react-icons/ti';
import { InputText } from '../MaterialUi/InputTex';
import { RiImageAddFill as Add } from 'react-icons/ri';
import { useMutation, useQueryClient } from 'react-query';
import { equiposPut } from '../../service/equipos';
import { editarEquipos } from '../../utils/utils';

export const ModalEditarEquipo = ({ open, setOpen, data }) => {
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });
    const [light] = useContext(Context);
    const [name, setName] = useState(data?.name);
    const [image, setImage] = useState(data?.logo);
    const [correo, setCorreo] = useState(data?.correo);
    const [instagram, setInstagram] = useState(data?.instagram);
    const [logoAdded, setLogoAdded] = useState(false);
    const [imageName, setImageName] = useState('');
    const { mutate: editarEquipo } = useMutation(equiposPut);
    const queryClient = useQueryClient();
    const [isLoading, setIsLoading] = useState(false); 

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        setName(data?.name);
        setCorreo(data?.correo);
        setImage(data?.logo);
        setInstagram(data?.instagram)
        setLogoAdded(false);
        setImageName('');
    }, [data]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            setImage(reader.result);
            setLogoAdded(true); 
            setImageName(file.name);
        };
        reader.readAsDataURL(file);
    };

    return (
        <Grid>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle sx={{ padding: '20px', color: light ? 'var(dark2)' : 'var(--cero)', background: light ? 'var(--cero)' : 'var(--dark)' }}>
                    {"Editar Equipo"}
                </DialogTitle>
                <DialogContent sx={{ background: light ? 'var(--cero)' : 'var(--dark)', display:'flex', flexDirection:'column', gap:'20px' }}>
                <InputText label={'Nombre'} setValue={setName} value={name} />
                <InputText label={'Correo'} setValue={setCorreo} value={correo} />
                <InputText label={'Instagram'} setValue={setInstagram} value={instagram} />
                {image && (
                        <img src={image} alt="Logo del equipo" style={{ maxWidth: "100%", maxHeight: "150px" }} />
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
                        <Add /> Agregue el logo
                        <input hidden accept="image/*" multiple type="file" onChange={handleImageChange} />
                    </Button>
            {logoAdded && (
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
                        {imageName}
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
                                setImage(null);
                                setLogoAdded(false);
                                setImageName('');
                            }} />
                    </Grid>
                </Grid>
            )}
                </DialogContent>
                {isLoading && ( 
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: !mobile ? '100%' : '100%', backgroundColor: 'rgba(2, 2, 2, 0.488)', zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <CircularProgress color="primary" />
                </div>
            )}
                <DialogActions sx={{ background: light ? 'var(--cero)' : 'var(--dark)' }}>
                    <Button onClick={handleClose} sx={{ color: 'var(--primario)' }}>Cancelar</Button>
                    <Button onClick={()=> {editarEquipos(data?._id, name, image, correo, instagram, setIsLoading, editarEquipo, queryClient, handleClose)}} autoFocus sx={{ color: 'var(--primario)' }}>Editar</Button>
                </DialogActions>
            </Dialog>
        </Grid>
    )
}