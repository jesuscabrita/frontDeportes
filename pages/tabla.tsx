import React, { useContext, useState } from "react";
import { Grid, useMediaQuery } from "@mui/material";
// import { PositionTable } from "../components/Tabla/TablePosiciones";
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import { TablaGoleadores } from "../components/Tabla/TablaGoleadores";
import { TablaAsistidores } from "../components/Tabla/TablaAsistidores";
import { TablaAmarillas } from "../components/Tabla/TablaAmarillas";
import { TablaRojas } from "../components/Tabla/TablaRojas";
import { TabPanel } from "../components/Material/TabPanel";
import Context from "../context/contextPrincipal";
import { MdOutlineTableChart as Tablas } from 'react-icons/md';
import { GiSoccerBall as Gol } from 'react-icons/gi';
import { GiSoccerKick as Asistir } from 'react-icons/gi';
import { TbRectangleVertical as Tarjeta } from 'react-icons/tb';
import { MenuTabla } from "../components/Material/MenuTabla";
import { LogoRegister } from "../components/Shared/LogoRegister";
import { useQuery } from "react-query";
import { equiposGet } from "../service/equipos";
import { filterEstado } from "../utils/utils";
import { GiChampions as Play } from 'react-icons/gi';
import { PlayOff } from "../components/Tabla/PlayOff";
import Head from "next/head";
import { TablesCategorias } from "../components/Tabla/TablesCategorias";

const opcionSelect = [
    { id: 0, name: 'Posiciones', icono: <Tablas size={30} /> },
    { id: 1, name: 'Goleadores', icono: <Gol size={30} /> },
    { id: 2, name: 'Asistidores', icono: <Asistir size={30} /> },
    { id: 3, name: 'Amarillas', icono: <Tarjeta color={'var(--warnning)'} size={30} /> },
    { id: 4, name: 'Rojas', icono: <Tarjeta color={'var(--danger)'} size={30} /> },
    { id: 5, name: 'PlayOff', icono: <Play size={30} /> },
]

const Tabla = () => {
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });
    const [light] = useContext(Context);
    const theme = useTheme();
    const [value, setValue] = useState(0);
    const [data, setData] = useState([]);

    const handleChange = (newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index: number) => {
        setValue(index);
    };

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