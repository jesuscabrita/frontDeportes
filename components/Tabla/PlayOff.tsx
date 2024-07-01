import React, { useContext } from "react";
import { Grid, Paper, useMediaQuery } from "@mui/material"
import { BsFillShieldFill as Time } from 'react-icons/bs';
import { TbMoodEmpty as Vacio } from 'react-icons/tb';
import { MdCategory } from "react-icons/md";
import Context from "../../context/contextPrincipal";

interface Equipo {
    logo: string;
    name: string;
    perdidos: number;
    statusPlayOff: any
}

interface Enfrentamiento {
    0: Equipo;
    1: Equipo;
}

interface Data {
    logo: string;
    name: string;
    statusPlayOff: string;
}

interface PlayOffProps {
    data: Data[];
    titleTable: string;
    SubTitle: string;
    mobile: boolean;
    light: boolean;
    nameEstadistida: string;
}

export const PlayOff: React.FC<PlayOffProps> = ({
    data,
    SubTitle,
    light,
    mobile,
    titleTable,
    nameEstadistida
}) => {

    const equiposCuartos: Equipo[] = data.slice(0, 8).map((equipo: Data) => ({
        logo: equipo.logo,
        name: equipo.name,
        perdidos: 0,
        statusPlayOff: equipo.statusPlayOff
    }));
    const generarEnfrentamientosCuartos = (equiposCuartos: Equipo[]): Enfrentamiento[] => {
        const enfrentamientos: Enfrentamiento[] = [];
        const mitadEquipos = Math.floor(equiposCuartos.length / 2);

        for (let i = 0; i < mitadEquipos; i++) {
            const enfrentamiento: Enfrentamiento = [equiposCuartos[i], equiposCuartos[equiposCuartos.length - 1 - i]];
            enfrentamientos.push(enfrentamiento);
        }

        return enfrentamientos;
    };

    const enfrentamientosCuartos: Enfrentamiento[] = generarEnfrentamientosCuartos(equiposCuartos);

    const equiposSemis: Equipo[] = data.slice(0, 2).map((equipo: Data) => ({
        logo: equipo.logo,
        name: equipo.name,
        perdidos: 0,
        statusPlayOff: equipo.statusPlayOff
    }));
    const generarEnfrentamientosSemis = (equiposSemis: Equipo[]): Enfrentamiento[] => {
        const enfrentamientos: Enfrentamiento[] = [];
        const mitadEquipos = Math.floor(equiposSemis.length / 2);

        for (let i = 0; i < mitadEquipos; i++) {
            const enfrentamiento: Enfrentamiento = [equiposSemis[i], equiposSemis[equiposSemis.length - 1 - i]];
            enfrentamientos.push(enfrentamiento);
        }

        return enfrentamientos;
    };

    const enfrentamientosSemis: Enfrentamiento[] = generarEnfrentamientosSemis(equiposSemis);

    return (
        <Grid item container>
            {titleTable === 'Elija una opción' || SubTitle === 'Elija una opción' ?
                <Grid item height={mobile ? "55vh" : '50vh'} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', color: light ? "var(--dark2)" : "var(--gris)", flexDirection: 'column', fontSize: mobile ? '14px' : '16px', textAlign: 'center' }}>
                    <MdCategory size={140} />
                    Debes seleccionar una categoria y sub-categoria
                </Grid>
                :
                data?.length === 0 ?
                    <Grid item height={mobile ? "55vh" : '50vh'} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', color: light ? "var(--dark2)" : "var(--gris)", flexDirection: 'column', fontSize: mobile ? '14px' : '16px' }}>
                        <Vacio size={140} />
                        {`No hay equipos en ${titleTable}`}
                    </Grid>
                    :
                    <Paper elevation={3} sx={{ padding: mobile ? "20px" : "40px", display: "flex", flexDirection: "column", alignItems: "center", background: light ? 'var(--gris3)' : 'var(--dark4)', width: '100%' }}>
                        <Grid item container mb={1} alignItems={'center'} flexDirection={'column'} justifyContent={'center'} sx={{ color: light ? "var(--dark2)" : "var(--cero)", letterSpacing: '2px', fontSize: '20px', fontWeight: '500' }}>
                            {`${nameEstadistida} en  ${titleTable}`}
                            <span style={{ fontSize: '14px', fontWeight: '400' }}>{SubTitle}</span>
                        </Grid>
                        <Grid item container mb={2} gap={3} justifyContent={'center'}>
                            <Grid item sx={{ color: light ? "var(--dark2)" : "var(--cero)", letterSpacing: '2px', fontSize: '20px', fontWeight: '500' }}>
                                Octavos de final
                            </Grid>
                            {enfrentamientosCuartos.slice(0, 2).map((enfrentamiento, index) => {
                                return (
                                    //ACA VA LOS ENFRENTAMIENTOS DEL 1ERO CONTRA EL 8VO, Y EL 2DO CONTRA EL 7MO

                                    <Paper elevation={3} sx={{ padding: mobile ? "20px" : "40px", display: "flex", flexDirection: "column", alignItems: "center", width: '100%', background: light ? 'var(--gris3)' : 'var(--dark4)', border: light ? '1px var(--dark4) solid' : '1px var(--gris3) solid' }}>
                                        <Grid item container gap={4} alignItems={'center'} justifyContent={'center'}>
                                            {enfrentamiento[0].perdidos >= 12 ?
                                                <Grid item sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', }}>
                                                    <img style={{ height: mobile ? '40px' : '70px' }} src={enfrentamiento[0].logo} alt={enfrentamiento[0].name} />
                                                    <Grid item mt={0.5} sx={{ color: light ? "var(--dark2)" : "var(--gris)", fontSize: mobile ? '10px' : '12px' }}>{enfrentamiento[0].name}</Grid>
                                                </Grid>
                                                :
                                                <Grid item sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', }}>
                                                    <Grid sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '60%', height: mobile ? '30px' : '60px' }}>
                                                        <Time size={mobile ? 40 : 70} color={light ? 'var(--gris2)' : 'var(--dark2)'} />
                                                    </Grid>
                                                    <Grid item mt={1} sx={{ color: light ? "var(--dark2)" : "var(--gris)", fontSize: mobile ? '10px' : '12px' }}>Por definir</Grid>
                                                </Grid>
                                            }
                                            <Grid item sx={{ color: 'var(--check)', fontWeight: '700', display: 'flex', alignItems: 'center', fontSize: mobile ? '12px' : '16px' }}>VS</Grid>
                                            {enfrentamiento[1].perdidos >= 12 ?
                                                <Grid item sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', }}>
                                                    <img style={{ height: mobile ? '40px' : '70px' }} src={enfrentamiento[1].logo} alt={enfrentamiento[1].name} />
                                                    <Grid item mt={0.5} sx={{ color: light ? "var(--dark2)" : "var(--gris)", fontSize: mobile ? '10px' : '12px' }}>{enfrentamiento[1].name}</Grid>
                                                </Grid> :
                                                <Grid item sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', }}>
                                                    <Grid sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '60%', height: mobile ? '30px' : '60px' }}>
                                                        <Time size={mobile ? 40 : 70} color={light ? 'var(--gris2)' : 'var(--dark2)'} />
                                                    </Grid>
                                                    <Grid item mt={1} sx={{ color: light ? "var(--dark2)" : "var(--gris)", fontSize: mobile ? '10px' : '12px' }}>Por definir</Grid>
                                                </Grid>}
                                        </Grid>
                                    </Paper>







                                    // <Grid item container alignItems={'center'}>
                                    //     <Grid item key={index} mb={5} sx={{}}>
                                    //         {enfrentamiento[0].perdidos >= 12 ?
                                    //             <Grid item sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', }}>
                                    //                 <img style={{ height: mobile ? '30px' : '60px' }} src={enfrentamiento[0].logo} alt={enfrentamiento[0].name} />
                                    //                 <Grid item sx={{ color: 'var(--neutral)', fontSize: mobile ? '7px' : '10px' }}>{enfrentamiento[0].name}</Grid>
                                    //                 <Grid item sx={{ color: 'var(--check)', fontWeight: '700', display: 'flex', alignItems: 'center', fontSize: mobile ? '12px' : '16px' }}>VS</Grid>
                                    //             </Grid> :
                                    //             <Grid item sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', }}>
                                    //                 <Grid sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '60%', height: mobile ? '30px' : '60px' }}>
                                    //                     <Time size={mobile ? 28 : 45} color={light ? 'var(--gris2)' : 'var(--dark2)'} />
                                    //                 </Grid>
                                    //                 <Grid item sx={{ color: 'var(--neutral)', fontSize: mobile ? '7px' : '10px' }}>Por definir</Grid>
                                    //                 <Grid item sx={{ color: 'var(--check)', fontWeight: '700', display: 'flex', alignItems: 'center', fontSize: mobile ? '12px' : '16px' }}>VS</Grid>
                                    //             </Grid>}
                                    //         {enfrentamiento[1].perdidos >= 12 ?
                                    //             <Grid item sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', }}>
                                    //                 <img style={{ height: mobile ? '30px' : '60px' }} src={enfrentamiento[1].logo} alt={enfrentamiento[1].name} />
                                    //                 <Grid item sx={{ color: 'var(--neutral)', fontSize: mobile ? '7px' : '10px' }}>{enfrentamiento[1].name}</Grid>
                                    //             </Grid> :
                                    //             <Grid item sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', }}>
                                    //                 <Grid sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '60%', height: mobile ? '30px' : '60px' }}>
                                    //                     <Time size={mobile ? 28 : 45} color={light ? 'var(--gris2)' : 'var(--dark2)'} />
                                    //                 </Grid>
                                    //                 <Grid item sx={{ color: 'var(--neutral)', fontSize: mobile ? '7px' : '10px' }}>Por definir</Grid>
                                    //             </Grid>}
                                    //     </Grid>

                                    //     <Grid item sx={{ border: light ? '1px var(--dark) solid' : '1px var(--cero) solid', width: mobile ? '10px' : '60px' }}></Grid>
                                    //     <Grid item sx={{ borderLeft: light ? '1px var(--dark) solid' : '1px var(--cero) solid', height: '60px', marginTop: index === 0 ? '60px' : '-60px' }}></Grid>
                                    //     {index === 0 && <Grid item sx={{ borderBottom: light ? '1px var(--dark) solid' : '1px var(--cero) solid', height: '60px', marginTop: '60px' }}></Grid>}

                                    //     {enfrentamiento[1].statusPlayOff !== 'No definido' ?
                                    //         <Grid mb={index === 0 ? -15 : 15} item sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', width: mobile ? '80px' : '100px' }}>
                                    //             <img style={{ height: mobile ? '30px' : '60px' }} src={enfrentamiento[0].logo} alt={enfrentamiento[0].name} />
                                    //             <Grid item sx={{ color: 'var(--neutral)', fontSize: mobile ? '7px' : '10px' }}>{enfrentamiento[0].name}</Grid>
                                    //             {index === 0 && <Grid mt={mobile ? 3 : 0} item sx={{ color: 'var(--check)', fontWeight: '700', display: 'flex', alignItems: 'center', fontSize: mobile ? '12px' : '16px' }}>VS</Grid>}
                                    //         </Grid> :
                                    //         <Grid mb={index === 0 ? -15 : 15} item sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', width: mobile ? '80px' : '100px' }}>
                                    //             <Grid sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '60%', height: mobile ? '30px' : '60px', }}>
                                    //                 <Time size={mobile ? 28 : 45} color={light ? 'var(--gris2)' : 'var(--dark2)'} />
                                    //             </Grid>
                                    //             <Grid item sx={{ color: 'var(--neutral)', fontSize: mobile ? '7px' : '10px' }}>Por definir</Grid>
                                    //             {index === 0 && <Grid mt={mobile ? 3 : 0} item sx={{ color: 'var(--check)', fontWeight: '700', display: 'flex', alignItems: 'center', fontSize: mobile ? '12px' : '16px' }}>VS</Grid>}
                                    //         </Grid>}
                                    //     {index === 0 && <Grid item sx={{ border: light ? '1px var(--dark) solid' : '1px var(--cero) solid', width: mobile ? '10px' : '40px', marginTop: index === 0 ? '200px' : '-200px' }}></Grid>}
                                    //     {index === 1 && <Grid item sx={{ width: mobile ? '80px' : '200px', marginBottom: '200px' }}></Grid>}
                                    //     {index === 0 && enfrentamiento[1].statusPlayOff !== 'No definido' ?
                                    //         <Grid mb={-25} item sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', width: mobile ? '80px' : '100px' }}>
                                    //             <img style={{ height: mobile ? '30px' : '60px' }} src={enfrentamiento[0].logo} alt={enfrentamiento[0].name} />
                                    //             <Grid item sx={{ color: 'var(--neutral)', fontSize: mobile ? '7px' : '10px' }}>{enfrentamiento[0].name}</Grid>
                                    //         </Grid> : index === 0 &&
                                    //         <Grid mb={-25} item sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', width: mobile ? '80px' : '100px' }}>
                                    //             <Grid sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '60%', height: mobile ? '30px' : '60px' }}>
                                    //                 <Time size={mobile ? 28 : 45} color={light ? 'var(--gris2)' : 'var(--dark2)'} />
                                    //             </Grid>
                                    //             <Grid item sx={{ color: 'var(--neutral)', fontSize: mobile ? '7px' : '10px' }}>Por definir</Grid>
                                    //         </Grid>}
                                    // </Grid>
                                )
                            })}
                        </Grid>
                        {enfrentamientosCuartos.slice(2, 4).map((enfrentamiento, index) => {
                            return (
                                <Grid item container alignItems={'center'}>
                                    {/* <Grid item key={index} mb={5} sx={{}}>
                                        hol
                                    </Grid> */}
                                </Grid>
                                //ACA VA LOS ENFRENTAMIENTOS DEL 3ERO CONTRA EL 6TO, Y EL 4TO CONTRA EL 5TO
                                // <Grid item sx={{ display: 'flex', alignItems: 'center', }}>
                                //     {index === 0 && enfrentamiento[1].statusPlayOff !== 'No definido' ?
                                //         <Grid mb={-25} item sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', width: mobile ? '80px' : '100px' }}>
                                //             <img style={{ height: mobile ? '30px' : '60px' }} src={enfrentamiento[0].logo} alt={enfrentamiento[0].name} />
                                //             <Grid item sx={{ color: 'var(--neutral)', fontSize: mobile ? '7px' : '10px' }}>{enfrentamiento[0].name}</Grid>
                                //         </Grid> : index === 0 &&
                                //         <Grid mb={-25} item sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', width: mobile ? '80px' : '100px' }}>
                                //             <Grid sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '60%', height: mobile ? '30px' : '60px' }}>
                                //                 <Time size={mobile ? 28 : 45} color={light ? 'var(--gris)' : 'var(--dark2)'} />
                                //             </Grid>
                                //             <Grid item sx={{ color: 'var(--neutral)', fontSize: mobile ? '7px' : '10px' }}>Por definir</Grid>
                                //         </Grid>}
                                //     {index === 0 && <Grid item sx={{ border: light ? '1px var(--dark) solid' : '1px var(--cero) solid', width: mobile ? '10px' : '40px', marginTop: index === 0 ? '200px' : '-200px' }}></Grid>}
                                //     {index === 1 && <Grid item sx={{ width: mobile ? '90px' : '200px', marginBottom: '200px' }}></Grid>}
                                //     {enfrentamiento[1].statusPlayOff !== 'No definido' ?
                                //         <Grid mb={index === 0 ? -15 : 15} item sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', width: mobile ? '80px' : '100px' }}>
                                //             <img style={{ height: mobile ? '30px' : '60px' }} src={enfrentamiento[0].logo} alt={enfrentamiento[0].name} />
                                //             <Grid item sx={{ color: 'var(--neutral)', fontSize: mobile ? '7px' : '10px' }}>{enfrentamiento[0].name}</Grid>
                                //             {index === 0 && <Grid mt={mobile ? 3 : 0} item sx={{ color: 'var(--check)', fontWeight: '700', display: 'flex', alignItems: 'center', fontSize: mobile ? '12px' : '16px' }}>VS</Grid>}
                                //         </Grid> :
                                //         <Grid mb={index === 0 ? -15 : 15} item sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', width: mobile ? '80px' : '100px' }}>
                                //             <Grid sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '60%', height: mobile ? '30px' : '60px', }}>
                                //                 <Time size={mobile ? 28 : 45} color={light ? 'var(--gris)' : 'var(--dark2)'} />
                                //             </Grid>
                                //             <Grid item sx={{ color: 'var(--neutral)', fontSize: mobile ? '7px' : '10px' }}>Por definir</Grid>
                                //             {index === 0 && <Grid mt={mobile ? 3 : 0} item sx={{ color: 'var(--check)', fontWeight: '700', display: 'flex', alignItems: 'center', fontSize: mobile ? '12px' : '16px' }}>VS</Grid>}
                                //         </Grid>}

                                //     {index === 0 && <Grid item sx={{ borderBottom: light ? '1px var(--dark) solid' : '1px var(--cero) solid', width: mobile ? '10px' : '20px', height: '60px', marginTop: '60px' }}></Grid>}
                                //     {index === 1 && <Grid item sx={{ borderTop: light ? '1px var(--dark) solid' : '1px var(--cero) solid', width: mobile ? '10px' : '20px', height: '60px', marginTop: '-60px' }}></Grid>}
                                //     <Grid item sx={{ borderRight: light ? '1px var(--dark) solid' : '1px var(--cero) solid', height: '60px', marginTop: index === 0 ? '60px' : '-60px' }}></Grid>
                                //     <Grid item sx={{ border: light ? '1px var(--dark) solid' : '1px var(--cero) solid', width: mobile ? '10px' : '180px' }}></Grid>

                                //     <Grid item key={index} mb={5} sx={{ width: '110px' }}>
                                //         {enfrentamiento[0].perdidos >= 12 ?
                                //             <Grid item sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', }}>
                                //                 <img style={{ height: mobile ? '30px' : '60px' }} src={enfrentamiento[0].logo} alt={enfrentamiento[0].name} />
                                //                 <Grid item sx={{ color: 'var(--neutral)', fontSize: mobile ? '7px' : '10px' }}>{enfrentamiento[0].name}</Grid>
                                //                 <Grid item sx={{ color: 'var(--check)', fontWeight: '700', display: 'flex', alignItems: 'center', fontSize: mobile ? '12px' : '16px' }}>VS</Grid>
                                //             </Grid> :
                                //             <Grid item sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', }}>
                                //                 <Grid sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '60%', height: mobile ? '30px' : '60px' }}>
                                //                     <Time size={mobile ? 28 : 45} color={light ? 'var(--gris)' : 'var(--dark2)'} />
                                //                 </Grid>
                                //                 <Grid item sx={{ color: 'var(--neutral)', fontSize: mobile ? '7px' : '10px' }}>Por definir</Grid>
                                //                 <Grid item sx={{ color: 'var(--check)', fontWeight: '700', display: 'flex', alignItems: 'center', fontSize: mobile ? '12px' : '16px' }}>VS</Grid>
                                //             </Grid>}
                                //         {enfrentamiento[1].perdidos >= 12 ?
                                //             <Grid item sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', }}>
                                //                 <img style={{ height: mobile ? '30px' : '60px' }} src={enfrentamiento[1].logo} alt={enfrentamiento[1].name} />
                                //                 <Grid item sx={{ color: 'var(--neutral)', fontSize: mobile ? '7px' : '10px' }}>{enfrentamiento[1].name}</Grid>
                                //             </Grid> :
                                //             <Grid item sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', }}>
                                //                 <Grid sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '60%', height: mobile ? '30px' : '60px' }}>
                                //                     <Time size={mobile ? 28 : 45} color={light ? 'var(--gris)' : 'var(--dark2)'} />
                                //                 </Grid>
                                //                 <Grid item sx={{ color: 'var(--neutral)', fontSize: mobile ? '7px' : '10px' }}>Por definir</Grid>
                                //             </Grid>}
                                //     </Grid>
                                // </Grid>
                            )
                        })}





                    </Paper>
            }
        </Grid>

        // <Grid mt={2} sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        //     <Grid item sx={{ width: '100%' }}>
        //         {enfrentamientosCuartos.slice(0, 2).map((enfrentamiento, index) => {
        //             return (
        //                 //ACA VA LOS ENFRENTAMIENTOS DEL 1ERO CONTRA EL 8VO, Y EL 2DO CONTRA EL 7MO
        //                 <Grid item sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
        //                     <Grid item key={index} mb={5} sx={{ width: '110px' }}>
        //                         {enfrentamiento[0].perdidos >= 12 ?
        //                             <Grid item sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', }}>
        //                                 <img style={{ height: mobile ? '30px' : '60px' }} src={enfrentamiento[0].logo} alt={enfrentamiento[0].name} />
        //                                 <Grid item sx={{ color: 'var(--neutral)', fontSize: mobile ? '7px' : '10px' }}>{enfrentamiento[0].name}</Grid>
        //                                 <Grid item sx={{ color: 'var(--check)', fontWeight: '700', display: 'flex', alignItems: 'center', fontSize: mobile ? '12px' : '16px' }}>VS</Grid>
        //                             </Grid> :
        //                             <Grid item sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', }}>
        //                                 <Grid sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '60%', height: mobile ? '30px' : '60px' }}>
        //                                     <Time size={mobile ? 28 : 45} color={light ? 'var(--gris)' : 'var(--dark2)'} />
        //                                 </Grid>
        //                                 <Grid item sx={{ color: 'var(--neutral)', fontSize: mobile ? '7px' : '10px' }}>Por definir</Grid>
        //                                 <Grid item sx={{ color: 'var(--check)', fontWeight: '700', display: 'flex', alignItems: 'center', fontSize: mobile ? '12px' : '16px' }}>VS</Grid>
        //                             </Grid>}
        //                         {enfrentamiento[1].perdidos >= 12 ?
        //                             <Grid item sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', }}>
        //                                 <img style={{ height: mobile ? '30px' : '60px' }} src={enfrentamiento[1].logo} alt={enfrentamiento[1].name} />
        //                                 <Grid item sx={{ color: 'var(--neutral)', fontSize: mobile ? '7px' : '10px' }}>{enfrentamiento[1].name}</Grid>
        //                             </Grid> :
        //                             <Grid item sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', }}>
        //                                 <Grid sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '60%', height: mobile ? '30px' : '60px' }}>
        //                                     <Time size={mobile ? 28 : 45} color={light ? 'var(--gris)' : 'var(--dark2)'} />
        //                                 </Grid>
        //                                 <Grid item sx={{ color: 'var(--neutral)', fontSize: mobile ? '7px' : '10px' }}>Por definir</Grid>
        //                             </Grid>}
        //                     </Grid>

        //                     <Grid item sx={{ border: light ? '1px var(--dark) solid' : '1px var(--cero) solid', width: mobile ? '10px' : '180px' }}></Grid>
        //                     <Grid item sx={{ borderLeft: light ? '1px var(--dark) solid' : '1px var(--cero) solid', height: '60px', marginTop: index === 0 ? '60px' : '-60px' }}></Grid>
        //                     {index === 0 && <Grid item sx={{ borderBottom: light ? '1px var(--dark) solid' : '1px var(--cero) solid', height: '60px', marginTop: '60px' }}></Grid>}

        //                     {enfrentamiento[1].statusPlayOff !== 'No definido' ?
        //                         <Grid mb={index === 0 ? -15 : 15} item sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', width: mobile ? '80px' : '100px' }}>
        //                             <img style={{ height: mobile ? '30px' : '60px' }} src={enfrentamiento[0].logo} alt={enfrentamiento[0].name} />
        //                             <Grid item sx={{ color: 'var(--neutral)', fontSize: mobile ? '7px' : '10px' }}>{enfrentamiento[0].name}</Grid>
        //                             {index === 0 && <Grid mt={mobile ? 3 : 0} item sx={{ color: 'var(--check)', fontWeight: '700', display: 'flex', alignItems: 'center', fontSize: mobile ? '12px' : '16px' }}>VS</Grid>}
        //                         </Grid> :
        //                         <Grid mb={index === 0 ? -15 : 15} item sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', width: mobile ? '80px' : '100px' }}>
        //                             <Grid sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '60%', height: mobile ? '30px' : '60px', }}>
        //                                 <Time size={mobile ? 28 : 45} color={light ? 'var(--gris)' : 'var(--dark2)'} />
        //                             </Grid>
        //                             <Grid item sx={{ color: 'var(--neutral)', fontSize: mobile ? '7px' : '10px' }}>Por definir</Grid>
        //                             {index === 0 && <Grid mt={mobile ? 3 : 0} item sx={{ color: 'var(--check)', fontWeight: '700', display: 'flex', alignItems: 'center', fontSize: mobile ? '12px' : '16px' }}>VS</Grid>}
        //                         </Grid>}
        //                     {index === 0 && <Grid item sx={{ border: light ? '1px var(--dark) solid' : '1px var(--cero) solid', width: mobile ? '10px' : '100px', marginTop: index === 0 ? '200px' : '-200px' }}></Grid>}
        //                     {index === 1 && <Grid item sx={{ width: mobile ? '80px' : '200px', marginBottom: '200px' }}></Grid>}
        //                     {index === 0 && enfrentamiento[1].statusPlayOff !== 'No definido' ?
        //                         <Grid mb={-25} item sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', width: mobile ? '80px' : '100px' }}>
        //                             <img style={{ height: mobile ? '30px' : '60px' }} src={enfrentamiento[0].logo} alt={enfrentamiento[0].name} />
        //                             <Grid item sx={{ color: 'var(--neutral)', fontSize: mobile ? '7px' : '10px' }}>{enfrentamiento[0].name}</Grid>
        //                         </Grid> : index === 0 &&
        //                         <Grid mb={-25} item sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', width: mobile ? '80px' : '100px' }}>
        //                             <Grid sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '60%', height: mobile ? '30px' : '60px' }}>
        //                                 <Time size={mobile ? 28 : 45} color={light ? 'var(--gris)' : 'var(--dark2)'} />
        //                             </Grid>
        //                             <Grid item sx={{ color: 'var(--neutral)', fontSize: mobile ? '7px' : '10px' }}>Por definir</Grid>
        //                         </Grid>}
        //                 </Grid>
        //             )
        //         })}
        //     </Grid>
        //     {enfrentamientosCuartos.slice(0, 2)?.[0]?.[0]?.statusPlayOff === 'Campeon' ?
        //         <Grid item sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center', width: mobile ? '80px' : '100%' }}>
        //             <Grid item sx={{ color: 'var(--check)', fontWeight: '700', display: 'flex', alignItems: 'center', fontSize: mobile ? '12px' : '16px' }}>CAMPEONES</Grid>
        //             <img style={{ height: mobile ? '30px' : '60px' }} src={enfrentamientosCuartos.slice(0, 2)?.[0]?.[0]?.logo} alt={enfrentamientosCuartos.slice(0, 2)?.[0]?.[0]?.name} />
        //             <Grid mb={mobile ? 8 : 15} item sx={{ color: 'var(--neutral)', fontSize: mobile ? '7px' : '10px', whiteSpace: 'nowrap' }}>{enfrentamientosCuartos.slice(0, 2)?.[0]?.[0]?.name}</Grid>
        //             <Grid mb={mobile ? 14 : 25} item sx={{ color: 'var(--check)', fontWeight: '700', display: 'flex', alignItems: 'center', fontSize: mobile ? '12px' : '16px' }}>VS</Grid>
        //         </Grid> :
        //         <Grid item sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', }}>
        //             <Grid item sx={{ color: 'var(--check)', fontWeight: '700', display: 'flex', alignItems: 'center', fontSize: mobile ? '12px' : '16px' }}>CAMPEONES</Grid>
        //             <Grid sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '60%', height: mobile ? '30px' : '60px' }}>
        //                 <Time size={mobile ? 28 : 45} color={light ? 'var(--gris)' : 'var(--dark2)'} />
        //             </Grid>
        //             <Grid mb={mobile ? 17 : 12} item sx={{ color: 'var(--neutral)', fontSize: mobile ? '7px' : '10px', whiteSpace: 'nowrap' }}>Por definir</Grid>
        //             <Grid mb={mobile ? 14 : 25} item sx={{ color: 'var(--check)', fontWeight: '700', display: 'flex', alignItems: 'center', fontSize: mobile ? '12px' : '16px' }}>VS</Grid>
        //         </Grid>}
        //     <Grid item sx={{ width: '100%' }}>
        //         {enfrentamientosCuartos.slice(2, 4).map((enfrentamiento, index) => {
        //             return (
        //                 //ACA VA LOS ENFRENTAMIENTOS DEL 3ERO CONTRA EL 6TO, Y EL 4TO CONTRA EL 5TO
        //                 <Grid item sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
        //                     {index === 0 && enfrentamiento[1].statusPlayOff !== 'No definido' ?
        //                         <Grid mb={-25} item sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', width: mobile ? '80px' : '100px' }}>
        //                             <img style={{ height: mobile ? '30px' : '60px' }} src={enfrentamiento[0].logo} alt={enfrentamiento[0].name} />
        //                             <Grid item sx={{ color: 'var(--neutral)', fontSize: mobile ? '7px' : '10px' }}>{enfrentamiento[0].name}</Grid>
        //                         </Grid> : index === 0 &&
        //                         <Grid mb={-25} item sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', width: mobile ? '80px' : '100px' }}>
        //                             <Grid sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '60%', height: mobile ? '30px' : '60px' }}>
        //                                 <Time size={mobile ? 28 : 45} color={light ? 'var(--gris)' : 'var(--dark2)'} />
        //                             </Grid>
        //                             <Grid item sx={{ color: 'var(--neutral)', fontSize: mobile ? '7px' : '10px' }}>Por definir</Grid>
        //                         </Grid>}
        //                     {index === 0 && <Grid item sx={{ border: light ? '1px var(--dark) solid' : '1px var(--cero) solid', width: mobile ? '10px' : '100px', marginTop: index === 0 ? '200px' : '-200px' }}></Grid>}
        //                     {index === 1 && <Grid item sx={{ width: mobile ? '90px' : '200px', marginBottom: '200px' }}></Grid>}
        //                     {enfrentamiento[1].statusPlayOff !== 'No definido' ?
        //                         <Grid mb={index === 0 ? -15 : 15} item sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', width: mobile ? '80px' : '100px' }}>
        //                             <img style={{ height: mobile ? '30px' : '60px' }} src={enfrentamiento[0].logo} alt={enfrentamiento[0].name} />
        //                             <Grid item sx={{ color: 'var(--neutral)', fontSize: mobile ? '7px' : '10px' }}>{enfrentamiento[0].name}</Grid>
        //                             {index === 0 && <Grid mt={mobile ? 3 : 0} item sx={{ color: 'var(--check)', fontWeight: '700', display: 'flex', alignItems: 'center', fontSize: mobile ? '12px' : '16px' }}>VS</Grid>}
        //                         </Grid> :
        //                         <Grid mb={index === 0 ? -15 : 15} item sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', width: mobile ? '80px' : '100px' }}>
        //                             <Grid sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '60%', height: mobile ? '30px' : '60px', }}>
        //                                 <Time size={mobile ? 28 : 45} color={light ? 'var(--gris)' : 'var(--dark2)'} />
        //                             </Grid>
        //                             <Grid item sx={{ color: 'var(--neutral)', fontSize: mobile ? '7px' : '10px' }}>Por definir</Grid>
        //                             {index === 0 && <Grid mt={mobile ? 3 : 0} item sx={{ color: 'var(--check)', fontWeight: '700', display: 'flex', alignItems: 'center', fontSize: mobile ? '12px' : '16px' }}>VS</Grid>}
        //                         </Grid>}

        //                     {index === 0 && <Grid item sx={{ borderBottom: light ? '1px var(--dark) solid' : '1px var(--cero) solid', width: mobile ? '10px' : '20px', height: '60px', marginTop: '60px' }}></Grid>}
        //                     {index === 1 && <Grid item sx={{ borderTop: light ? '1px var(--dark) solid' : '1px var(--cero) solid', width: mobile ? '10px' : '20px', height: '60px', marginTop: '-60px' }}></Grid>}
        //                     <Grid item sx={{ borderRight: light ? '1px var(--dark) solid' : '1px var(--cero) solid', height: '60px', marginTop: index === 0 ? '60px' : '-60px' }}></Grid>
        //                     <Grid item sx={{ border: light ? '1px var(--dark) solid' : '1px var(--cero) solid', width: mobile ? '10px' : '180px' }}></Grid>

        //                     <Grid item key={index} mb={5} sx={{ width: '110px' }}>
        //                         {enfrentamiento[0].perdidos >= 12 ?
        //                             <Grid item sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', }}>
        //                                 <img style={{ height: mobile ? '30px' : '60px' }} src={enfrentamiento[0].logo} alt={enfrentamiento[0].name} />
        //                                 <Grid item sx={{ color: 'var(--neutral)', fontSize: mobile ? '7px' : '10px' }}>{enfrentamiento[0].name}</Grid>
        //                                 <Grid item sx={{ color: 'var(--check)', fontWeight: '700', display: 'flex', alignItems: 'center', fontSize: mobile ? '12px' : '16px' }}>VS</Grid>
        //                             </Grid> :
        //                             <Grid item sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', }}>
        //                                 <Grid sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '60%', height: mobile ? '30px' : '60px' }}>
        //                                     <Time size={mobile ? 28 : 45} color={light ? 'var(--gris)' : 'var(--dark2)'} />
        //                                 </Grid>
        //                                 <Grid item sx={{ color: 'var(--neutral)', fontSize: mobile ? '7px' : '10px' }}>Por definir</Grid>
        //                                 <Grid item sx={{ color: 'var(--check)', fontWeight: '700', display: 'flex', alignItems: 'center', fontSize: mobile ? '12px' : '16px' }}>VS</Grid>
        //                             </Grid>}
        //                         {enfrentamiento[1].perdidos >= 12 ?
        //                             <Grid item sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', }}>
        //                                 <img style={{ height: mobile ? '30px' : '60px' }} src={enfrentamiento[1].logo} alt={enfrentamiento[1].name} />
        //                                 <Grid item sx={{ color: 'var(--neutral)', fontSize: mobile ? '7px' : '10px' }}>{enfrentamiento[1].name}</Grid>
        //                             </Grid> :
        //                             <Grid item sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', }}>
        //                                 <Grid sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '60%', height: mobile ? '30px' : '60px' }}>
        //                                     <Time size={mobile ? 28 : 45} color={light ? 'var(--gris)' : 'var(--dark2)'} />
        //                                 </Grid>
        //                                 <Grid item sx={{ color: 'var(--neutral)', fontSize: mobile ? '7px' : '10px' }}>Por definir</Grid>
        //                             </Grid>}
        //                     </Grid>
        //                 </Grid>
        //             )
        //         })}
        //     </Grid>
        //    </Grid>
    )
}