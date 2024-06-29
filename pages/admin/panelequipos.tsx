import React, { useContext, useState } from "react";
import { Grid, useMediaQuery } from "@mui/material";
import { WithAuth } from "../../components/Shared/WithAuth";
import { PanelEquiposAdmin } from "../../components/PanelEquipos/PanelEquiposAdmin";
import { FaRegistered as Register } from 'react-icons/fa';
import { GiSandsOfTime as Espera } from 'react-icons/gi';
import { useMutation, useQuery, useQueryClient } from "react-query";
import { equiposDelete, equiposEstadosPut, equiposGet, equiposPut } from "../../service/equipos";
import Context from "../../context/contextPrincipal";
import Head from "next/head";


const PanelEquipos = () => {
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });
    const [light] = useContext(Context);
    const [data, setData] = useState([]);
    const { mutate: eliminarEquipo } = useMutation(equiposDelete);
    const { mutate: editarEstados } = useMutation(equiposEstadosPut);

    const queryClient = useQueryClient();

    const { isLoading, isError } = useQuery(["/api/liga"], equiposGet, {
        refetchOnWindowFocus: false,
        onSuccess: (data) => {
            setData(data);
        },
    })

    return (
        <>
            <Head>
                <title>Ligamaster | Panel equipos</title>
            </Head>
            <Grid item container sx={{ padding: mobile ? "100px 20px 60px 20px" : "80px 120px 60px 120px", height: data.length >= 3 ? '100%' : '180vh' }}>
                <Grid item xs={12}>
                    <PanelEquiposAdmin
                        light={light}
                        mobile={mobile}
                        isLoading={isLoading}
                        isError={isError}
                        data={data}
                        eliminarEquipo={eliminarEquipo}
                        queryClient={queryClient}
                        editarEstados={editarEstados}
                    />
                </Grid>
            </Grid>
        </>
    );
};
export default PanelEquipos;