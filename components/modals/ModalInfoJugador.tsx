import { Avatar, Button, Grid, useMediaQuery } from "@mui/material";
import { useContext, useState } from "react";
import Context from "../../context/contextPrincipal";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { IoLogoClosedCaptioning as Capitan } from 'react-icons/io'; 

export const ModalJugadorInfo =({open, setOpen, jugador})=>{
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });
    const [light] = useContext(Context);

    const handleClose = () => {
        setOpen(false);
    };

    function stringToColor(string: string) {
        let hash = 0;
        let i;
        /* eslint-disable no-bitwise */
        for (i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }

        let color = '#';
        for (i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff;
            color += `00${value.toString(16)}`.slice(-2);
        }
        /* eslint-enable no-bitwise */
        return color;
    }

    function stringAvatar(name: string) {
        const nameParts = name.split(' ');

        let children = '';
        if (nameParts.length >= 2) {
            children = `${nameParts[0][0]}${nameParts[1][0]}`;
        } else if (nameParts.length === 1) {
            children = nameParts[0][0];
        }

        return {
            sx: {
                bgcolor: stringToColor(name),
            },
            children: children,
        };
    }

    return(
        <Grid>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle sx={{ padding: '20px', color: light ? 'var(--dark2)' : 'var(--cero)', background: light ? 'var(--cero)' : 'var(--dark)' }}>
                    <Grid item sx={{display:'flex', alignItems:'center'}}>
                        <img src={jugador.logo} alt={jugador.name} style={{ height: '35px' }} />
                        {jugador.name}
                    </Grid>
                </DialogTitle>
                <DialogContent sx={{ background: light ? 'var(--cero)' : 'var(--dark)', display:'flex', flexDirection:'column', gap:'20px' }}>
                    <Grid container alignItems={'center'} gap={2}>
                        {jugador.foto ? <Avatar alt="Jugador" src={jugador.foto} sx={{ height: '150px', width:'150px' }} /> :
                            <Avatar {...stringAvatar(jugador.name)} sx={{ height: '150px', width:'150px' }} />}
                        <Grid container alignItems={'center'} gap={2}>
                            {jugador.capitan === 'Si' && 
                            <Grid item sx={{display:'flex', alignItems:'center', gap:'4px'}}>
                                <Grid item sx={{color: light ? 'var(--dark2)' : 'var(--cero)'}}>{'Capitan'}</Grid>
                                <Grid item sx={{color: light ? 'var(--dark2)' : 'var(--cero)',border: light ?'solid 1px var(--dark2)': 'solid 1px var(--cero)', height:'25px', width:'50px', display:'flex', justifyContent:'center', alignItems:'center'}}>
                                    <Capitan size={20}/>
                                </Grid>
                            </Grid>}
                            <span>{`Name: ${jugador.name}`}</span>
                            <span>{`Edad: ${jugador.edad}`}</span>
                            <span>{`Capitan: ${jugador.capitan}`}</span>
                            <span>{`Posicion: ${jugador.posicion}`}</span>
                            <span>{`Fecha de nacimiento: ${jugador.fecha_nacimiento}`}</span>
                            <span>{`Goles: ${jugador.goles}`}</span>
                            <span>{`Asistencias: ${jugador.asistencias}`}</span>
                            <span>{`Tarjetas amarillas: ${jugador.tarjetas_amarillas}`}</span>
                            <span>{`Tarjetas rojas: ${jugador.tarjetas_roja}`}</span>
                            <span>{`Tarjetas azules: ${jugador.tarjetas_azul}`}</span>
                            <span>{`Lesion: ${jugador.lesion}`}</span>
                            <span>{`Nacionalidad: ${jugador.nacionalidad}`}</span>
                            <span>{`Dorsal: ${jugador.dorsal}`}</span>
                            <span>{`Partidos: ${jugador.partidos}`}</span>
                            <span>{`Figura: ${jugador.figura}`}</span>
                            <span>{`Suspendido numero: ${jugador.suspendido_numero}`}</span>
                            <span>{`Instagram: ${jugador.instagram}`}</span>
                            <span>{`Twitter: ${jugador.twitter}`}</span>
                            <span>{`Equipo: ${jugador.equipo}`}</span>
                            <span>{`Logo: ${jugador.logo}`}</span>
                            <span>{`Foto: ${jugador.foto}`}</span>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions sx={{ background: light ? 'var(--cero)' : 'var(--dark)' }}>
                    <Button onClick={handleClose} sx={{ color: 'var(--primario)' }}>Cancelar</Button>
                </DialogActions>
            </Dialog>
        </Grid>
    )
}