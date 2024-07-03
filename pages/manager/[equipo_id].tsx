import React, { useContext } from "react";
import { CircularProgress, Grid, useMediaQuery } from "@mui/material";
import { useQuery } from "react-query";
import { equiposGetById } from "../../service/equipos";
import { useRouter } from "next/router";
import { EquipoDetalle } from "../../components/Equipo_id/EquipoDetalle";
import { TbError404 as Err404 } from 'react-icons/tb';
import { TbMoodEmpty as Vacio } from 'react-icons/tb';
import { alertaSubmit } from "../../utils/alert";
import { FaArrowAltCircleLeft as Atras } from 'react-icons/fa';
import { LogoRegister } from "../../components/Shared/LogoRegister";
import Context from "../../context/contextPrincipal";
import Head from "next/head";

const Equipo = () => {
  const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });
  const [light] = useContext(Context);
  const router = useRouter();
  const equipo_id = router.query.equipo_id;

  const handleAtrasClick = () => {
    router.back();
  };

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
    // <Grid sx={{ height: !mobile ? '180vh' : '180vh', }}>
    //   <Grid sx={{
    //     paddingTop: !mobile ? '100px' : '90px',
    //     paddingBottom: '40px',
    //     display: 'flex',
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     flexDirection: 'column',
    //   }}>
    //     <Grid width={'100%'} sx={{ display: 'flex' }}>
    //       <Grid sx={{ paddingLeft: !mobile ? '40px' : '16px' }}>
    //         <Atras size={30} style={{ cursor: 'pointer', color: light ? 'var(--dark2)' : 'var(--cero)' }} onClick={handleAtrasClick} />
    //       </Grid>
    //       <Grid mt={-1.5} item sx={{ display: 'flex', justifyContent: 'center', width: '100%', }}>
    //         <LogoRegister name={'Detalles del equipo'} />
    //       </Grid>
    //     </Grid>
    //     <Grid item sx={{ fontSize: '24px', color: light ? 'var(--dark2)' : 'var(--cero)' }}>{data?.equipo?.name}</Grid>
    //     <Grid sx={{ padding: '18px', width: '100%' }}>
    //       <EquipoDetalle data={data?.equipo} isLoading={isLoading} equipo_id={equipo_id} />
    //     </Grid>
    //   </Grid>
    // </Grid>
  );
};

export default Equipo;