import React, { useContext, useEffect, useState } from "react";
import { CircularProgress, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, useMediaQuery } from "@mui/material";
import { Row } from "./Row";
import { useQuery } from "react-query";
import { equiposGet } from "../../service/equipos";
import { generateCalendar } from "../../utils/generateCalendar";
import { TbError404 as Err404 } from 'react-icons/tb';
import { TbMoodEmpty as Vacio } from 'react-icons/tb';
import { filterEstado, handleNextRound, handlePrevRound } from "../../utils/utils";
import { ButtonSend } from "../Material/ButtonSend";
import { BsFillArrowLeftCircleFill as Atras } from 'react-icons/bs';
import { BsFillArrowRightCircleFill as Lef } from 'react-icons/bs';
import Context from "../../context/contextPrincipal";
import ContextRefac from "../../context/contextLogin";

interface Team {
    _id: string;
    name: string;
}

interface Match {
    homeTeam: string;
    awayTeam: string;
}

export const MatchCalendar = () => {
    const [light] = useContext(Context);
    const [currentRound, setCurrentRound] = useState(0);
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });
    const [data, setData] = useState<Team[]>([]);
    const { state: { user } }: any = useContext(ContextRefac);
    const [isUserAdmin, setIsUserAdmin] = useState(false);

    useEffect(() => {
        setIsUserAdmin(user?.role === 'super_admin' || user?.role === 'admin');
    }, [user]);

    const { isLoading, isError, refetch } = useQuery(["/api/liga"], equiposGet, {
        refetchOnWindowFocus: false,
        onSuccess: (data) => {
            setData(data);
        },
    })

    const matches: Match[][] = generateCalendar(filterEstado(data, 'registrado'));

    useEffect(() => {
        const interval = setInterval(() => {
            refetch();
        }, 5000);
        return () => clearInterval(interval);
    }, [refetch]);

    return (
        <Grid container width={'100%'} alignItems={'center'} alignContent={'center'}>
            <Grid item pb={2} sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                <Grid item sx={{ fontSize: '16px', color: light ? 'black' : 'var(--cero)' }}>Jornada {currentRound + 1}</Grid>
                <img style={{ height: '40px' }} src="https://logodownload.org/wp-content/uploads/2018/05/laliga-logo-1.png" alt="la liga" />
            </Grid>
            {isLoading ?
                <Grid width={'100%'} mt={8} item sx={{ display: 'flex', flexDirection: 'row', gap: '16px', minWidth: !mobile ? '960px' : '100%', height: '600px', justifyContent: 'center', color: light ? 'var(--dark2)' : 'var(--cero)' }}>
                    <CircularProgress style={{ color: light ? 'var(--dark2)' : 'var(--cero)' }} />
                </Grid>
                : isError ?
                    <Grid width={'100%'} mt={8} item sx={{ display: 'flex', flexDirection: 'column', gap: '16px', minWidth: !mobile ? '960px' : '100%', height: '600px', alignItems: 'center', color: light ? 'var(--dark2)' : 'var(--cero)' }}>
                        Ha ocurrido un error al cargar el calendario <Err404 size={85} />
                    </Grid>
                    : data.length === 0 ?
                        <Grid width={'100%'} mt={8} item sx={{ display: 'flex', flexDirection: 'row', gap: '16px', height: '600px', minWidth: !mobile ? '960px' : '100%', justifyContent: 'center', color: light ? 'var(--dark2)' : 'var(--cero)' }}>
                            No hay equipos en la liga <Vacio size={25} />
                        </Grid>
                        : <>
                            <Grid container alignItems={'center'} justifyContent={'center'}>
                                <TableContainer component={Paper}>
                                    <Table aria-label="collapsible table">
                                        <TableHead sx={{ background: 'var(--dark2)' }}>
                                            <TableRow>
                                                {!mobile && <TableCell sx={{ color: 'var(--cero)' }} align="center">Fecha</TableCell>}
                                                {mobile && isUserAdmin && <TableCell sx={{ color: 'var(--cero)' }} align="center">Fecha</TableCell>}
                                                {!mobile && <TableCell sx={{ color: 'var(--cero)' }} align="center">Ubicacion</TableCell>}
                                                <TableCell sx={{ color: 'var(--cero)' }} align="center">Partidos</TableCell>
                                                {!mobile && <TableCell sx={{ color: 'var(--cero)' }} align="center">Arbitro</TableCell>}
                                                {mobile && isUserAdmin && <TableCell sx={{ color: 'var(--cero)' }} align="center">Arbitro</TableCell>}
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {matches[currentRound]?.map((match, index) => {
                                                const homeTeam = filterEstado(data, 'registrado').find(team => team._id === match[0]);
                                                const awayTeam = filterEstado(data, 'registrado').find(team => team._id === match[1]);
                                                return (
                                                    <Row
                                                        key={index}
                                                        homeTeam={homeTeam}
                                                        awayTeam={awayTeam}
                                                        currentRound={currentRound}
                                                        isLoading={isLoading}
                                                    />
                                                );
                                            })}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Grid>
                            <Grid container mt={1} justifyContent="center" alignItems="center">
                                <ButtonSend title={'Anterior'} icon={Atras} disable={currentRound === 0} handle={() => { handlePrevRound(setCurrentRound, currentRound) }} iconSize={20} iconColor={''} />
                                <ButtonSend title={'Siguiente'} icon={Lef} disable={currentRound === matches.length - 1} handle={() => { handleNextRound(setCurrentRound, currentRound) }} iconSize={20} iconColor={''} />
                            </Grid>
                        </>}
        </Grid>
    );
};