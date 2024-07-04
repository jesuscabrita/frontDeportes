import React, { useContext, useEffect, useState } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Grid, useMediaQuery } from "@mui/material";
import { FaUserEdit } from "react-icons/fa";
import { IoExit } from "react-icons/io5";
import { InputFields } from "../../Material/InputFields";
import { InputDate } from "../../Material/InputFecha";
import { ButtomPrimario, ButtomSecundario } from "../../Material/ButtonSend";
import { useMutation, useQueryClient } from "react-query";
import { userPut } from "../../../service/session";
import { editarPerfilUser } from "../../../utils/utilsUser";
import { LoadingScreen } from "../../Shared/LoadingScreen";
import Context from "../../../context/contextPrincipal";
import moment from "moment";

interface ModalPerfilProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<any>>;
    data: { nombre: string; apellido: string; email: string; fecha_de_nacimiento: string; _id: string; }
}

export const ModalEditarPerfil: React.FC<ModalPerfilProps> = ({ open, setOpen, data }) => {
    const [light] = useContext(Context);
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });
    const [nombre, setNombre] = useState(data?.nombre);
    const [apellido, setApellido] = useState(data?.apellido);
    const [email, setEmail] = useState(data?.email);
    const [fechaNacimiento, setFechaNacimiento] = useState(moment(data?.fecha_de_nacimiento));
    const { mutate: editarPerfil } = useMutation(userPut);
    const [isLoading, setIsLoading] = useState(false);
    const queryClient = useQueryClient();

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        setNombre(data?.nombre);
        setApellido(data?.apellido);
        setEmail(data?.email)
        setFechaNacimiento(moment(data?.fecha_de_nacimiento))
    }, [data]);

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle sx={{ background: light ? 'var(--gris)' : 'var(--dark2)', color: light ? "var(--dark2)" : "var(--cero)", display: 'flex', alignItems: 'center', gap: '10px', letterSpacing: '2px', fontFamily: 'Quicksand' }}>
                <Grid item container alignItems={'center'} gap={1} sx={{ letterSpacing: '2px' }}>
                    {"Editar Usuario"}
                    <FaUserEdit size={25} color={light ? "var(--dark2)" : "var(--cero)"} />
                </Grid>
            </DialogTitle>
            <DialogContent sx={{ background: light ? 'var(--gris)' : 'var(--dark2)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <Grid item container>
                    <InputFields
                        title="Nombre"
                        descripcion="Escribir nombre"
                        placeholder="Nombre"
                        type="text"
                        value={nombre}
                        setValue={setNombre}
                    />
                </Grid>
                <Grid item container>
                    <InputFields
                        title="Apellido"
                        descripcion="Escribir apellido"
                        placeholder="Apellido"
                        type="text"
                        value={apellido}
                        setValue={setApellido}
                    />
                </Grid>
                <Grid item container>
                    <InputFields
                        title="Email"
                        descripcion="Escribir email"
                        placeholder="Email"
                        type="email"
                        value={email}
                        setValue={setEmail}
                    />
                </Grid>
                <Grid item container>
                    <InputDate
                        title="Fecha de nacimiento"
                        descripcion="Seleccionar fecha de nacimiento"
                        value={fechaNacimiento}
                        setValue={setFechaNacimiento}
                    />
                </Grid>
            </DialogContent>
            {isLoading && <LoadingScreen />}
            <DialogActions sx={{ background: light ? 'var(--gris)' : 'var(--dark2)' }}>
                <Grid item container gap={0.5}>
                    <Grid item container sx={{ paddingLeft: '14px', paddingRight: '14px' }}>
                        <ButtomPrimario
                            title="Editar"
                            icon={FaUserEdit}
                            handleclick={() => { editarPerfilUser(data?._id, nombre, apellido, email, moment(fechaNacimiento).format('YYYY-MM-DD HH:mm:ss'), setIsLoading, editarPerfil, queryClient, handleClose) }}
                        />
                    </Grid>
                    <Grid item container sx={{ paddingLeft: '14px', paddingRight: '14px' }}>
                        <ButtomSecundario
                            title="Cancelar"
                            icon={IoExit}
                            handleclick={handleClose}
                        />
                    </Grid>
                </Grid>
            </DialogActions>
        </Dialog>
    )
}