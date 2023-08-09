import { CircularProgress, Grid, useMediaQuery } from "@mui/material";
import { useContext, useState } from "react";
import { useQuery } from "react-query";
import { UserGet } from "../../service/session";
import Context from "../../context/contextPrincipal";
import { WithAdmin } from "../../components/Shared/WithAdmin";
import { InputBuscador } from "../../components/Material/InputBuscador";
import { TablaUser } from "../../components/User/tablaUser";
import { TbMoodEmpty as Vacio } from 'react-icons/tb';
import { TbError404 as Err404 } from 'react-icons/tb';

const Usuarios = () => {
    const [data, setData] = useState([]);
    const [light] = useContext(Context);
    const [searchQuery, setSearchQuery] = useState("");
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });

    const { isLoading, isError } = useQuery(["user"], UserGet, {
        refetchOnWindowFocus: false,
        onSuccess: (data) => {
            setData(data.data);
        },
    });

    return (
        <Grid container sx={{ paddingTop: '120px',height: mobile ? '100vh' : '100vh'}}>
            <Grid item sx={{width:'100%', paddingLeft: '18px', paddingRight: '18px'}}>
                <InputBuscador value={searchQuery} setValue={setSearchQuery} placeholder={'Buscar por nombre, apellido o email'}/>
                {isLoading ?
                <Grid item mt={7} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', color: light ? 'var(--dark2)' : 'var(--cero)', gap: '16px' }}>
                    <CircularProgress style={{ color: light ? 'var(--dark2)' : 'var(--cero)' }} size={30} />
                </Grid>
                : isError ?
                <Grid item mt={7} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', color: light ? 'var(--dark2)' : 'var(--cero)', }}>
                    Ha ocurrido un error al cargar los usuarios <Err404 size={45} />
                </Grid>
                : data.length === 0 ?
                <Grid item mt={7} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', color: light ? 'var(--dark2)' : 'var(--cero)', }}>
                    No hay usuarios en la liga <Vacio size={25} />
                </Grid>
                : <Grid item container mt={2} mb={4}>
                    <TablaUser data={data} searchQuery={searchQuery}/>
                </Grid>}
            </Grid>
        </Grid>
    );
};

export default Usuarios;
// export default WithAdmin(Usuarios);