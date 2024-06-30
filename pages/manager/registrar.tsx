import React, { useContext, useEffect, useState } from "react";
import { Grid, SelectChangeEvent, useMediaQuery } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { equiposGet, equiposPost } from "../../service/equipos";
import { filterEstado } from "../../utils/utils";
import { dataSubCategoria } from "../../utils/arrays";
import { RegistrarEquipo } from "../../components/RegistrarEquipo/RegistrarEquipo";
import { LoadingScreen } from "../../components/Shared/LoadingScreen";
import { useRouter } from "next/router";
import ContextRefac from "../../context/contextLogin";
import Context from "../../context/contextPrincipal";
import Head from "next/head";

const Registrar = () => {
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });
    const queryClient = useQueryClient();
    const router = useRouter();
    const [light] = useContext(Context);
    const [data, setData] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [categoria, setCategoria] = useState('');
    const [instagram, setInstagram] = useState('');
    const [subCategoria, setSubCategoria] = useState('Elija una opción');
    const [image, setImage] = useState<string | null>(null);
    const [logoAdded, setLogoAdded] = useState(false);
    const [imageName, setImageName] = useState('');
    const [isLoading, setIsloading] = useState(false)
    const { state: { user } }: any = useContext(ContextRefac);
    const { mutate: crearEquipo } = useMutation(equiposPost);

    useEffect(() => {
        if (!user) {
            router.replace("/404");
        }
    }, [user, router]);

    if (!user) {
        return;
    }

    const handleSelectChange = (event: SelectChangeEvent<string>) => {
        setSubCategoria(event.target.value)
    }

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
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const { isLoading: loadingEquipo, isError } = useQuery(["/api/liga"], equiposGet, {
        refetchOnWindowFocus: false,
        onSuccess: (data) => {
            setData(data);
        },
    })

    const isUserEmailInData = filterEstado(data, 'registrado').some((equipo) => equipo.correo === user?.email);
    const isUserEmailInDataEnCola = filterEstado(data, 'enCola').some((equipo) => equipo.correo === user?.email);

    return (
        <>
            <Head>
                <title>Ligamaster | Registras equipo</title>
            </Head>
            <Grid item container sx={{ padding: mobile ? "100px 20px 60px 20px" : "80px 120px 60px 120px", height: mobile ? '100%' : '100%' }}>
                <Grid item xs={12}>
                    <RegistrarEquipo
                        light={light}
                        mobile={mobile}
                        setName={setName}
                        name={user?.equipo}
                        setEmail={setEmail}
                        email={user?.email}
                        instagram={instagram}
                        setInstagram={setInstagram}
                        categoria={user?.categoria}
                        setCategoria={setCategoria}
                        dataSubCategoria={dataSubCategoria}
                        subCategoria={subCategoria}
                        handleSelect={handleSelectChange}
                        setImage={setImage}
                        logoAdded={logoAdded}
                        setLogoAdded={setLogoAdded}
                        handleImageChange={handleImageChange}
                        imageName={imageName}
                        setImageName={setImageName}
                        image={image}
                        user={user}
                        crearEquipo={crearEquipo}
                        queryClient={queryClient}
                        setIsLoading={setIsloading}
                        isUserEmailInData={isUserEmailInData}
                        isUserEmailInDataEnCola={isUserEmailInDataEnCola}
                        router={router}
                    />
                </Grid>
            </Grid>
            {isLoading && <LoadingScreen />}
        </>
    );
};
export default Registrar;