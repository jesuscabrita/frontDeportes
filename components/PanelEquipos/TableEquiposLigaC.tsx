import React, { useState } from "react";
import { Collapse, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { MdKeyboardArrowDown as ArrowDown } from "react-icons/md";
import { MdKeyboardArrowUp as ArrowUp } from "react-icons/md";
import { ButtomPrimario, ButtomSecundario } from "../Material/ButtonSend";
import { MdStars as Liga } from "react-icons/md";
import { TbCircleLetterBFilled as B } from "react-icons/tb";
import { FaUserEdit } from "react-icons/fa";
import { ModalEditarEquipo } from "../modals/Equipos/ModalEditarEquipo";
import { seleccionarData } from "../../utils/utils";
import { editarEstado, editarEstadoSuspender } from "../../utils/utilsEquipos";
import { TableEquiposLigasProps, dataModalProps } from "../../interfaces/general";
import { TbMoodEmpty as Vacio } from 'react-icons/tb';
import { FaPowerOff } from "react-icons/fa";

export const TableEquiposLigaC: React.FC<TableEquiposLigasProps> = ({
    light,
    dataEquipos,
    mobile,
    queryClient,
    editarEstados,
}) => {
    const [openRows, setOpenRows] = useState<{ [key: number]: boolean }>({});
    const [modalEdit, setModalEdit] = useState(false);
    const [equipoSeleccionado, setEquipoSeleccionado] = useState<dataModalProps | null>(null);

    const handleRowClick = (index: number) => {
        setOpenRows((prev) => ({ ...prev, [index]: !prev[index] }));
    };

    return (
        <Grid item container>
            {dataEquipos?.length === 0 ?
                <Grid item height={mobile ? "55vh" : '50vh'} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', color: light ? "var(--dark2)" : "var(--gris)", flexDirection: 'column', fontSize: mobile ? '14px' : '16px' }}>
                    <Vacio size={140} />
                    No hay equipos en la Liga C
                </Grid>
                : <TableContainer component={Paper}>
                    <Table aria-label="collapsible table">
                        <TableHead sx={{ background: light ? 'var(--dark2)' : 'var(--gris4)' }}>
                            <TableCell sx={{ color: light ? "var(--cero)" : "var(--dark2)", letterSpacing: '2px', fontSize: '18px', fontWeight: '500' }} align="center">Equipos en Liga B</TableCell>
                        </TableHead>
                        {dataEquipos && dataEquipos?.map((equipo, index) => {
                            const isOpen = openRows[index] || false;
                            return (
                                <TableBody>
                                    <TableRow sx={{ '& > *': { borderBottom: 'unset', background: light ? 'var(--gris3)' : 'var(--dark4)', cursor: 'pointer' } }}>
                                        <TableCell sx={{ color: light ? 'var(--dark2)' : 'var(--cero)', whiteSpace: 'nowrap' }}>
                                            <Grid container width={'280px'} flexDirection={'row'} alignItems={'center'}>
                                                <Grid item>
                                                    <IconButton aria-label="expand row" size="small" sx={{ color: light ? 'black' : 'var(--cero)' }} onClick={() => handleRowClick(index)}>
                                                        {isOpen ? <ArrowUp /> : <ArrowDown />}
                                                    </IconButton>
                                                </Grid>
                                                <Grid item width={'240px'} container gap={1} flexDirection={'row'} alignItems={'center'} justifyContent={'start'} sx={{ marginLeft: '6px' }}>
                                                    <Grid item sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '55px', height: '35px' }}>
                                                        <img src={equipo?.logo} alt={equipo?.name} style={{ height: '35px' }} />
                                                    </Grid>
                                                    <Grid item sx={{ fontSize: mobile ? '14px' : '16px', letterSpacing: '2px', fontWeight: '500' }}>{equipo?.name}</Grid>
                                                </Grid>
                                            </Grid>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell style={{ paddingBottom: 0, paddingTop: 0, background: light ? 'var(--gris3)' : 'var(--dark4)', borderColor: light ? 'var(--dark2)' : 'var(--gris)' }} colSpan={8}>
                                            <Collapse in={isOpen} timeout="auto" unmountOnExit>
                                                <Grid item container alignItems={'center'} justifyContent={'center'} sx={{ padding: mobile ? '0px' : '20px', paddingTop: '20px', paddingBottom: '20px' }}>
                                                    <Grid item md={6} container alignItems={'center'} justifyContent={'center'}>
                                                        <img src={equipo?.logo} alt={equipo?.name} style={{ height: mobile ? '100px' : '180px', marginTop: mobile ? '0px' : '0px', marginBottom: mobile ? '20px' : '120px' }} />
                                                    </Grid>
                                                    <Grid item md={6} gap={2} container alignItems={'center'} justifyContent={'center'} flexDirection={'column'} sx={{ padding: mobile ? '0px' : '20px', paddingTop: mobile ? '20px' : '0px' }}>
                                                        <Grid item sx={{ color: light ? "var(--dark2)" : "var(--cero)", letterSpacing: '2px', fontSize: '20px', fontWeight: '500' }}>
                                                            {equipo?.name}
                                                        </Grid>
                                                        <Grid item container alignItems={'center'} justifyContent={'center'} gap={1}>
                                                            <Grid item sx={{ color: light ? "var(--dark2)" : "var(--cero)", letterSpacing: '1px', fontSize: mobile ? '14px' : '16px', fontWeight: '800' }}>
                                                                Email
                                                            </Grid>
                                                            <Grid item mt={0.4} sx={{ color: light ? "var(--dark2)" : "var(--gris)", letterSpacing: '0px', fontSize: mobile ? '12px' : '16px', fontWeight: '400' }}>
                                                                {equipo?.correo}
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item container alignItems={'center'} justifyContent={'center'} gap={1}>
                                                            <Grid item sx={{ color: light ? "var(--dark2)" : "var(--cero)", letterSpacing: '1px', fontSize: mobile ? '14px' : '16px', fontWeight: '800' }}>
                                                                Categoria
                                                            </Grid>
                                                            <Grid item mt={0.4} sx={{ color: light ? "var(--dark2)" : "var(--gris)", letterSpacing: '0px', fontSize: mobile ? '12px' : '16px', fontWeight: '400' }}>
                                                                {equipo?.categoria}
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item container mt={2}>
                                                            <ButtomSecundario
                                                                title="Enviar a ligamaster"
                                                                handleclick={() => { editarEstado(equipo?._id, "registrado", editarEstados, queryClient, 'Primera', 'Ligamaster') }}
                                                                icon={Liga}
                                                            />
                                                        </Grid>
                                                        <Grid item container>
                                                            <ButtomSecundario
                                                                title="Enviar a liga B"
                                                                handleclick={() => { editarEstado(equipo?._id, "registrado", editarEstados, queryClient, 'Segunda', 'Liga B') }}
                                                                icon={B}
                                                            />
                                                        </Grid>
                                                        <Grid item container>
                                                            <ButtomSecundario
                                                                title="Suspender"
                                                                handleclick={() => { editarEstadoSuspender(equipo?._id, "enCola", editarEstados, queryClient, equipo?.subCategoria, 'Suspender') }}
                                                                icon={FaPowerOff}
                                                            />
                                                        </Grid>
                                                        <Grid item container>
                                                            <ButtomPrimario
                                                                title="Editar"
                                                                handleclick={() => { seleccionarData(equipo, setEquipoSeleccionado, setModalEdit) }}
                                                                icon={FaUserEdit}
                                                            />
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Collapse>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            )
                        })}
                    </Table>
                </TableContainer>}
            {modalEdit && equipoSeleccionado && <ModalEditarEquipo open={modalEdit} setOpen={setModalEdit} data={equipoSeleccionado} />}
        </Grid>
    )
}