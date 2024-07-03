import React, { useContext, useState } from "react";
import { Grid, useMediaQuery } from "@mui/material";
import { TablesCategorias } from "../components/Tabla/TablesCategorias";
import { useQuery } from "react-query";
import { equiposGet } from "../service/equipos";
import Context from "../context/contextPrincipal";
import Head from "next/head";

const Tabla = () => {
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });
    const [light] = useContext(Context);
    const [data, setData] = useState([]);

    const { isLoading, isError } = useQuery(["/api/liga"], equiposGet, {
        refetchOnWindowFocus: false,
        onSuccess: (data) => {
            setData(data);
        },
    })

    return (
        <>
            <Head>
                <title>Ligamaster | Tablas</title>
            </Head>
            <Grid item container sx={{ padding: mobile ? "100px 20px 60px 20px" : "80px 120px 60px 120px", height: data.length >= 3 ? '100%' : '180vh' }}>
                <Grid item xs={12}>
                    <TablesCategorias
                        mobile={mobile}
                        light={light}
                        isError={isError}
                        isLoading={isLoading}
                        data={data}
                    />
                </Grid>
            </Grid>
        </>
    );
};
export default Tabla;