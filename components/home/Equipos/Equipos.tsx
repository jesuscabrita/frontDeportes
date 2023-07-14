import { CircularProgress, Grid, useMediaQuery } from "@mui/material"
import { useContext } from "react"
import Context from "../../../context/contextPrincipal";
import Link from "next/link";
import { TbMoodEmpty as Vacio } from 'react-icons/tb';
import { TbError404 as Err404 } from 'react-icons/tb';

export const Equipos = ({ data, isLoading, isError }) => {
    const [light] = useContext(Context);
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });

    return (
        <>
            {isLoading ?
                <Grid item sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', color: light ? 'var(--dark2)' : 'var(--cero)', gap: '16px' }}>
                    Cargando equipos..! <CircularProgress style={{ color: light ? 'var(--dark2)' : 'var(--cero)' }} size={30} />
                </Grid>
                : isError ?
                    <Grid item sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', color: light ? 'var(--dark2)' : 'var(--cero)', }}>
                        Ha ocurrido un error al cargar los equipos <Err404 size={45} />
                    </Grid>
                    : data.length === 0 ?
                        <Grid item sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', color: light ? 'var(--dark2)' : 'var(--cero)', }}>
                            No hay equipos en la liga <Vacio size={25} />
                        </Grid>
                        : <>
                            {data.map((equipo) => (
                                <Link href={`/manager/${equipo._id}`} key={equipo._id}>
                                    <Grid sx={{
                                        display: "flex", padding: mobile ? '2px' : "10px", minHeight: mobile ? '65px' : "120px", minWidth: mobile ? '65px' : "140px", justifyContent: "center", alignItems: 'center',
                                        "&:hover": { background: !light ? "var(--dark2)" : "var(--gris)", borderRadius: "16px", },
                                    }}>
                                        <img src={equipo.logo} alt={equipo.name} style={{ height: mobile ? '40px' : "80px", cursor: "pointer" }} />
                                    </Grid>
                                </Link>
                            ))}
                        </>
            }
        </>
    );
};