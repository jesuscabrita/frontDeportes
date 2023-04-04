import { useContext, useState } from "react";
import data from '../../utils/data.json'
import { Button, Grid, useMediaQuery } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Row } from "./Row";
import Context from "../../context/contextPrincipal";
import { ModalEdit } from "./Modal";
import { generateCalendar } from "../../utils/generateCalendar";

export const MatchCalendar = () => {
    const [light] = useContext(Context);
    const [currentRound, setCurrentRound] = useState(0);
    const [matches, setMatches] = useState(generateCalendar());
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });
    const [open, setOpen] = useState(false);

    function handleNextRound() {
        setCurrentRound(currentRound + 1);
    }

    function handlePrevRound() {
        setCurrentRound(currentRound - 1);
    }

    return (
        <Grid container width={'100%'} alignItems={'center'} alignContent={'center'}>
            <Grid item pb={2} sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                <Grid item sx={{ fontSize: '16px', color: light ? 'black' : 'var(--cero)' }}>Jornada {currentRound + 1}</Grid>
                <img style={{ height: '40px' }} src="https://logodownload.org/wp-content/uploads/2018/05/laliga-logo-1.png" alt="la liga" />
            </Grid>
            <Grid container alignItems={'center'} justifyContent={'center'}>
                <TableContainer sx={{ width: '90%' }} component={Paper}>
                    <Table aria-label="collapsible table">
                        <TableHead sx={{ background: 'var(--dark2)' }}>
                            <TableRow>
                                <TableCell />
                                <TableCell sx={{ color: 'var(--cero)' }} align="left">Fecha</TableCell>
                                <TableCell sx={{ color: 'var(--cero)' }} align="left">Horario</TableCell>
                                <TableCell sx={{ color: 'var(--cero)' }} align="center">Ubicacion</TableCell>
                                <TableCell sx={{ color: 'var(--cero)' }} align="right">Local</TableCell>
                                <TableCell />
                                <TableCell sx={{ color: 'var(--cero)' }} align="left">Visitante</TableCell>
                                <TableCell sx={{ color: 'var(--cero)' }} align={!mobile ? "left" : "right"}>Arbitro</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {matches[currentRound].map((match, index) => {
                                const homeTeam = data.find(team => team.id === match[0]);
                                const awayTeam = data.find(team => team.id === match[1]);
                                return (
                                    <Row
                                        key={index}
                                        homeTeam={homeTeam}
                                        awayTeam={awayTeam}
                                        openEdit={open}
                                        setOpenEdit={setOpen}
                                        currentRound={currentRound}
                                    />
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
            <Grid container justifyContent="center" alignItems="center">
                <Button sx={{ color: 'var(--primario)' }} disabled={currentRound === 0} onClick={handlePrevRound}>Anterior</Button>
                <Button sx={{ color: 'var(--primario)' }} disabled={currentRound === matches.length - 1} onClick={handleNextRound}>Siguiente</Button>
            </Grid>
            {open && <ModalEdit open={open} setOpen={setOpen} />}
        </Grid>
    );
};