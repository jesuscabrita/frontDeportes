import React, { useContext } from "react";
import { Grid, useMediaQuery } from "@mui/material";
import { useRouter } from "next/router";
import { alertaSubmit } from "../utils/alert";
import { useQuery } from "react-query";
import { UserGetById } from "../service/session";
import { PerfilInfo } from "../components/Perfil/PerfilInfo";
import Context from "../context/contextPrincipal";
import ContextRefac from "../context/contextLogin";
import Head from "next/head";

const Perfil = () => {
    const [light] = useContext(Context);
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });
    const { state: { user } }: any = useContext(ContextRefac);
    const router = useRouter();

    const handleAtrasClick = () => {
        router.back();
    };

    const { data, isLoading, isError } = useQuery(["usuario", user?._id], () => UserGetById(user?._id), {
        refetchOnWindowFocus: false,
        onError: (err: any) => {
            const errorMessage = `No se encontró el usuario con el ID: ${user?._id}`
            alertaSubmit(false, errorMessage);
        }
    });
    const usuario = data?.data?.data;

    return (
        <>
            <Head>
                <title>Ligamaster | Perfil</title>
            </Head>
            <Grid item container sx={{ padding: mobile ? "100px 20px 60px 20px" : "100px 200px 60px 200px", height: mobile ? '100vh' : '110vh' }}>
                <Grid item xs={12}>
                    <PerfilInfo
                        light={light}
                        mobile={mobile}
                        usuario={usuario}
                        isLoading={isLoading}
                        isError={isError}
                        handleAtrasClick={handleAtrasClick}
                    />
                </Grid>
            </Grid>
        </>
    );
};

export default Perfil;