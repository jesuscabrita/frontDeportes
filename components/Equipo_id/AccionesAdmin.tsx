import React from "react";
import { Grid, Paper } from "@mui/material";
import { IoIosCreate as CreatePlayer } from 'react-icons/io';
import { ButtomPrimario } from "../Material/ButtonSend";
import { AccionesAdminProps } from "../../interfaces/general";

export const AccionesAdmin: React.FC<AccionesAdminProps> = ({
    light,
    mobile,
    data,
    modalJugador,
    modalDelegado,
    setModalJugador,
    setModalDelegado,
}) => {
    return (
        <Paper elevation={3} sx={{ padding: mobile ? "20px" : "40px", display: "flex", flexDirection: "column", alignItems: "center", background: light ? 'var(--gris3)' : 'var(--dark4)', width: '100%' }}>
            <Grid item container alignItems={'center'} justifyContent={'center'} sx={{ padding: mobile ? '0px' : '20px', paddingTop: '20px', paddingBottom: '20px' }}>
                <Grid item md={6} container flexDirection={'column'} alignItems={'center'} justifyContent={'center'}>
                    <Grid item container alignItems={'center'} justifyContent={'center'} sx={{ color: light ? "var(--dark2)" : "var(--cero)", letterSpacing: '2px', fontSize: !mobile ? '18px' : '16px', fontWeight: '500', fontFamily: 'Quicksand' }}>
                        {`Fichajes jugadores`}
                    </Grid>
                    <Grid item container width={'220px'} mt={2}>
                        <ButtomPrimario
                            title="Fichar jugador libre"
                            handleclick={() => { setModalJugador(!modalJugador) }}
                            icon={CreatePlayer}
                        />
                    </Grid>
                </Grid>
                <Grid item md={6} container flexDirection={'column'} alignItems={'center'} justifyContent={'center'}>
                    <Grid item container alignItems={'center'} justifyContent={'center'} sx={{ color: light ? "var(--dark2)" : "var(--cero)", letterSpacing: '2px', fontSize: !mobile ? '18px' : '16px', fontWeight: '500', fontFamily: 'Quicksand' }}>
                        {`Fichajes delegados`}
                    </Grid>
                    <Grid item container width={'220px'} mt={2}>
                        <ButtomPrimario
                            title="Fichar delegado libre"
                            handleclick={() => { setModalDelegado(!modalDelegado) }}
                            icon={CreatePlayer}
                            disabled={data?.delegado.length > 0}
                        />
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    )
}