import { Button, CircularProgress, Grid, useMediaQuery } from "@mui/material";
import { useContext, useState } from "react";
import { RiImageAddFill as Add } from 'react-icons/ri';
import { useMutation, useQueryClient } from "react-query";
import { equiposPost } from "../../service/equipos";
import { alertaCheck, alertaSubmit } from "../../utils/alert";
import Context from "../../context/contextPrincipal";
import { InputText } from "../MaterialUi/InputTex";
import { IoMdImages as Images } from 'react-icons/io';
import { TiDeleteOutline as Delete } from 'react-icons/ti';

export const Form = () => {
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });
    const [light] = useContext(Context);
    const [name, setName] = useState('');
    const [image, setImage] = useState(null);
    const [correo, setCorreo] = useState('');
    const [isLoading, setIsLoading] = useState(false); // nuevo estado para indicar si se está cargando o no
    const { mutate: crearEquipo } = useMutation(equiposPost);
    const [logoAdded, setLogoAdded] = useState(false);
    const [imageName, setImageName] = useState('');
    const queryClient = useQueryClient()


    const nuevoEquipo = (nombre: string, logo: string, correo: string) => {
        setIsLoading(true);
        const formData = { form: { name: nombre, logo, correo } };
        crearEquipo(formData, {
            onSuccess: (success) => {
                queryClient.invalidateQueries(["/api/liga"])
                setName('');
                setImage(null);
                setCorreo('')
                setLogoAdded(false);
                setImageName('');
                alertaSubmit(true, success?.message);
                setTimeout(() => {
                    alertaCheck('Registrado!', 'Gracias por crear un equipo en nuestra plataforma. En breve recibirás un correo electrónico con la confirmación de su registro. Si tiene alguna pregunta o necesita ayuda adicional, no dude en ponerse en contacto con nuestro equipo de soporte.');
                }, 4000);
                setIsLoading(false);
            },
            onError: (err: any) => {
                const errorMessage = err?.response?.data?.message || err.message;
                alertaSubmit(false, errorMessage);
                setIsLoading(false);
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
            <InputText label={'Correo'} setValue={setCorreo} value={correo} />
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
                            style={{ cursor: 'pointer' }}
                            onClick={() => {
                                setImage(null);
                                setLogoAdded(false);
                                setImageName('');
                            }} />
                    </Grid>
                </Grid>
            )}

            {isLoading && ( // si se está cargando, mostrar el spinner y la pantalla de opacidad
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: !mobile ? '170vh' : '100%', backgroundColor: 'rgba(2, 2, 2, 0.488)', zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <CircularProgress color="primary" />
                </div>
            )}

            <Button onClick={() => { nuevoEquipo(name, image, correo) }} sx={{ color: 'var(--primario)', fontSize: '16px' }}>Registrar</Button>
        </Grid>
    )
}