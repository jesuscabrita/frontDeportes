import { Button, CircularProgress, Grid } from "@mui/material";
import { useContext, useState } from "react";
import { RiImageAddFill as Add } from 'react-icons/ri';
import { useMutation, useQueryClient } from "react-query";
import { equiposPost } from "../../service/equipos";
import { alertaSubmit } from "../../utils/alert";
import Context from "../../context/contextPrincipal";
import { InputText } from "../MaterialUi/InputTex";
import { IoMdImages as Images } from 'react-icons/io';
import { TiDeleteOutline as Delete } from 'react-icons/ti';

export const Form = () => {
    const [light] = useContext(Context);
    const [name, setName] = useState('');
    const [image, setImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false); // nuevo estado para indicar si se está cargando o no
    const { mutate: crearEquipo } = useMutation(equiposPost);
    const [logoAdded, setLogoAdded] = useState(false);
    const [imageName, setImageName] = useState('');
    const queryClient = useQueryClient()

    const nuevoEquipo = (nombre: string, logo: string) => {
        setIsLoading(true); // indicar que se está cargando la solicitud
        const formData = { form: { name: nombre, logo } };
        crearEquipo(formData, {
            onSuccess: (success) => {
                queryClient.invalidateQueries(["/api/liga"])
                setName('');
                setImage(null);
                setLogoAdded(false);
                setImageName('');
                alertaSubmit(true, success?.message);
                setIsLoading(false); // indicar que la solicitud ha terminado de cargarse
            },
            onError: (err: any) => {
                const errorMessage = err?.response?.data?.message || err.message;
                alertaSubmit(false, errorMessage);
                setIsLoading(false); // indicar que la solicitud ha terminado de cargarse
            },
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            setImage(reader.result);
            setLogoAdded(true); // indicar que se agregó el logo
            setImageName(file.name);
        };
        reader.readAsDataURL(file);
    };

    return (
        <Grid container flexDirection={'column'} gap={2} alignItems={'center'}>
            <InputText label={'Nombre'} setValue={setName} value={name} />
            <Button variant="contained" component="label"
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    background: 'var(--dark2)',
                    '&:hover': { background: 'var(--dark2hover)' }
                }}>
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
                            style={{cursor:'pointer'}}
                            onClick={() => {
                            setImage(null);
                            setLogoAdded(false);
                            setImageName('');
                        }}/>
                    </Grid>
                </Grid>
            )}

            {isLoading && ( // si se está cargando, mostrar el spinner y la pantalla de opacidad
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(2, 2, 2, 0.488)', zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <CircularProgress color="primary" />
                </div>
            )}

            <Button onClick={() => { nuevoEquipo(name, image) }} sx={{color:'var(--primario)', fontSize:'16px'}}>Registrar</Button>
        </Grid>
    )
}