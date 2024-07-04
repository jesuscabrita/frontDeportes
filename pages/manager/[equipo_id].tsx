import React, { useContext } from "react";
import { Grid, useMediaQuery } from "@mui/material";
import { useQuery } from "react-query";
import { equiposGetById } from "../../service/equipos";
import { useRouter } from "next/router";
import { EquipoDetalle } from "../../components/Equipo_id/EquipoDetalle";
import { alertaSubmit } from "../../utils/alert";
import Context from "../../context/contextPrincipal";
import Head from "next/head";

const Equipo = () => {
  const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });
  const [light] = useContext(Context);
  const router = useRouter();
  const equipo_id = router.query.equipo_id;

  const { data, isLoading, isError } = useQuery(["equipos", equipo_id], () => equiposGetById(equipo_id), {
    refetchOnWindowFocus: false,
    onError: (err: any) => {
      const errorMessage = `No se encontró el equipo con el ID: ${equipo_id}`
      alertaSubmit(false, errorMessage);
    }
  });

  return (
    <>
      <Head>
        <title>Ligamaster | Detalle del equipo</title>
      </Head>
      <Grid item container sx={{ padding: mobile ? "100px 20px 60px 20px" : "80px 120px 60px 120px", height: '100%' }}>
        <Grid item xs={12}>
          <EquipoDetalle
            data={data?.equipo}
            isLoading={isLoading}
            equipo_id={equipo_id}
            isError={isError}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default Equipo;