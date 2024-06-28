import React, { useContext, useState } from "react";
import { Button, CircularProgress, Grid, useMediaQuery } from "@mui/material";
import { RiImageAddFill as Add } from 'react-icons/ri';
import { useMutation, useQueryClient } from "react-query";
import { equiposPost } from "../../../service/equipos";
import { InputText } from "../../Material/InputTex";
import { IoMdImages as Images } from 'react-icons/io';
import { TiDeleteOutline as Delete } from 'react-icons/ti';
import { FaRegRegistered as Crear } from 'react-icons/fa';
import { ButtonSend } from "../../Material/ButtonSend";
import { nuevoEquipo } from "../../../utils/utilsEquipos";
import ContextRefac from "../../../context/contextLogin";
import Context from "../../../context/contextPrincipal";

type Nullable<T> = T | null;

export const Form = () => {
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });
    const { state: { user } }: any = useContext(ContextRefac);
    const [light] = useContext(Context);
    const [name, setName] = useState('');
    const [image, setImage] = useState<Nullable<string>>(null);
    const [correo, setCorreo] = useState('');
    const [instagram, setInstagram] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { mutate: crearEquipo } = useMutation(equiposPost);
    const [logoAdded, setLogoAdded] = useState(false);
    const [imageName, setImageName] = useState('');
    const queryClient = useQueryClient()
    // console.log(image);


    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                const result = reader.result;
                if (typeof result === 'string') {
                    setImage(result);
                    setLogoAdded(true);
                    setImageName(file.name);
                } else {
                }
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <Grid container flexDirection={'column'} gap={2} alignItems={'center'}>
            <Grid item container gap={1} sx={{ width: !mobile ? '300px' : '100%', padding: mobile ? '30px' : '0px' }}>
                <InputText disable={true} placeholder={'Nombre'} label={'Nombre'} setValue={setName} value={user?.equipo} />
                <InputText disable={true} placeholder={'Correo'} label={'Correo'} setValue={setCorreo} value={user?.email} />
                <InputText disable={false} placeholder={'Instagram'} label={'Instagram'} setValue={setInstagram} value={instagram} />
            </Grid>
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
            {isLoading && (
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: !mobile ? '180vh' : '100%', backgroundColor: 'rgba(2, 2, 2, 0.488)', zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <CircularProgress color="primary" />
                </div>
            )}
            {/* <ButtonSend disable={false} handle={() => { nuevoEquipo(user?.equipo, image, user?.email, instagram, setIsLoading, crearEquipo, queryClient, setName, setImage, setCorreo, setInstagram, setLogoAdded, setImageName) }} title={'Registrar'} icon={Crear} iconColor={'var(--check)'} iconSize={20} /> */}
        </Grid>
    )
}