import React, { useContext, useState } from "react";
import { Grid, useMediaQuery } from "@mui/material";
import { PanelEquiposAdmin } from "../../components/PanelEquipos/PanelEquiposAdmin";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { equiposDelete, equiposEstadosPut, equiposGet, resetEquiposJugador } from "../../service/equipos";
import { LoadingScreen } from "../../components/Shared/LoadingScreen";
import { devolverJugadorPrestamo, jugadoresContratoCalculo } from "../../service/jugadores";
import { WithAdmin } from "../../components/Shared/WithAdmin";
import Context from "../../context/contextPrincipal";
import Head from "next/head";

const PanelEquipos = () => {
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });
    const queryClient = useQueryClient();
    const [light] = useContext(Context);
    const [data, setData] = useState([]);
    const [isLoadinng, setIsLoadinng] = useState(false);
    const { mutate: eliminarEquipo } = useMutation(equiposDelete);
    const { mutate: editarEstados } = useMutation(equiposEstadosPut);
    const { mutate: reseteoEquipos } = useMutation(resetEquiposJugador);
    const { mutate: devolver } = useMutation(devolverJugadorPrestamo);
    const { mutate: calculo } = useMutation(jugadoresContratoCalculo);

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
                        setIsLoadinng={setIsLoadinng}
                        reseteoEquipos={reseteoEquipos}
                        devolver={devolver}
                        calculo={calculo}
                    />
                </Grid>
            </Grid>
            {isLoadinng && <LoadingScreen />}
        </>
    );
};
export default WithAdmin(PanelEquipos);