import { CircularProgress, Grid, useMediaQuery } from "@mui/material";
import { useQuery } from "react-query";
import { equiposGetById } from "../../service/equipos";
import { useRouter } from "next/router";
import { EquipoDetalle } from "../../components/Shared/EquipoDetalle";
import { useContext } from "react";
import Context from "../../context/contextPrincipal";
import { TbError404 as Err404 } from 'react-icons/tb';
import { TbMoodEmpty as Vacio } from 'react-icons/tb';

const Equipo = () => {
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });
    const [light] = useContext(Context);
    const router = useRouter();
    const equipo_id = router.query.equipo_id;

    const { data, isLoading, isError, error } = useQuery(["equipos", equipo_id], () => equiposGetById(equipo_id), {
        refetchOnWindowFocus: false
    });

    if (isLoading) {
        return <Grid sx={{height: !mobile ? '110vh' : '100%',}}>
                    <Grid sx={{ paddingTop: !mobile ? '100px' : '90px', paddingBottom: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <CircularProgress style={{color:light ? 'var(--dark2)': 'var(--cero)'}} size={45}/>
                    </Grid>
                </Grid>;
    }

    if (isError) {
      return (
        <Grid sx={{height: !mobile ? '110vh' : '100%',}}>
          <Grid sx={{ paddingTop: !mobile ? '100px' : '90px', paddingBottom: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection:'column' }}>
            {typeof error === "object" && error.hasOwnProperty("response") ? (
              <Grid>Ha ocurrido un error al cargar el equipo <Err404 size={85}/></Grid>
            ) : (
              <Grid>No se encontró el equipo con el ID: {equipo_id} <Vacio size={45}/></Grid>
            )}
          </Grid>
        </Grid>
      );
    }

    if (!data) {
        return <Grid sx={{height: !mobile ? '110vh' : '100%',}}>
                    <Grid sx={{ paddingTop: !mobile ? '100px' : '90px', paddingBottom: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection:'column' }}>
                        <div>No se encontró el equipo con el ID: {equipo_id}</div><Vacio size={40}/>
                    </Grid>
                </Grid>;
    }


    return (
        <Grid sx={{height: !mobile ? '110vh' : '100%',}}>
            <Grid sx={{ paddingTop: !mobile ? '100px' : '90px', paddingBottom: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <EquipoDetalle data={data?.equipo}/>
            </Grid>
        </Grid>
    );
};

export default Equipo;