import { CircularProgress, Grid, useMediaQuery } from "@mui/material";
import { useQuery } from "react-query";
import { equiposGetById } from "../../service/equipos";
import { useRouter } from "next/router";
import { EquipoDetalle } from "../../components/Shared/EquipoDetalle";
import { useContext } from "react";
import Context from "../../context/contextPrincipal";
import { TbError404 as Err404 } from 'react-icons/tb';
import { TbMoodEmpty as Vacio } from 'react-icons/tb';
import { alertaSubmit } from "../../utils/alert";
import { FaArrowAltCircleLeft as Atras } from 'react-icons/fa';
import { LogoRegister } from "../../components/Shared/LogoRegister";

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

    if (isLoading) {
        return (
          <Grid sx={{height: !mobile ? '110vh' : '100%',}}>
              <Grid sx={{ paddingTop: !mobile ? '100px' : '90px', paddingBottom: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <CircularProgress style={{color:light ? 'var(--dark2)': 'var(--cero)'}} size={45}/>
              </Grid>
          </Grid>
        )
    }

    if (isError) {
      return (
        <Grid sx={{height: !mobile ? '110vh' : '100%',}}>
          <Grid sx={{ 
            paddingTop: !mobile ? '100px' : '90px', 
            paddingBottom: '40px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            flexDirection:'column', 
            color:light ? 'var(--dark2)': 'var(--cero)' 
          }}>
              Ha ocurrido un error al cargar el equipo <Err404 size={85}/>
          </Grid>
        </Grid>
      );
    }

    if (!data?.equipo) {
        return (
          <Grid sx={{height: !mobile ? '110vh' : '100%',}}>
              <Grid sx={{ 
                paddingTop: !mobile ? '100px' : '90px', 
                paddingBottom: '40px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                flexDirection:'column',
                color:light ? 'var(--dark2)': 'var(--cero)' 
              }}>
                No se encontró el equipo con el ID: {equipo_id} <Vacio size={45}/>
              </Grid>
          </Grid>
        )
    }

    return (
        <Grid sx={{height: !mobile ? '160vh' : '160vh',}}>
            <Grid sx={{ 
              paddingTop: !mobile ? '100px' : '90px', 
              paddingBottom: '40px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              flexDirection:'column',
            }}>
              <Grid width={'100%'} sx={{display:'flex'}}>
                <Grid sx={{paddingLeft:!mobile ?'40px': '16px'}}>
                  <Atras size={30} style={{cursor:'pointer', color: light ? 'var(--dark2)' : 'var(--cero)'}} onClick={handleAtrasClick}/>
                </Grid>
                <Grid mt={-1.5} item sx={{display:'flex',justifyContent:'center', width:'100%',}}>
                    <LogoRegister name={'Detalles del equipo'}/>
                </Grid>
              </Grid>
                <Grid item sx={{fontSize: '24px', color: light ? 'var(--dark2)' : 'var(--cero)'}}>{data?.equipo?.name}</Grid>
              <Grid sx={{padding:'18px',width:'100%'}}>
                <EquipoDetalle data={data?.equipo} isLoading={isLoading} equipo_id={equipo_id}/>
              </Grid>
            </Grid>
        </Grid>
    );
};

export default Equipo;