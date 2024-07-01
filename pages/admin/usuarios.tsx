import React, { useContext, useState } from "react";
import { Grid, useMediaQuery } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { UserGet, userDelete } from "../../service/session";
import { WithAdmin } from "../../components/Shared/WithAdmin";
import { AdminUsuarios } from "../../components/Admin_usuarios/AdminUsuarios";
import { ModalUser } from "../../components/modals/User/ModalUser";
import { UsuariosPageProps } from "../../interfaces/general";
import Context from "../../context/contextPrincipal";
import Head from "next/head";

const Usuarios = () => {
    const [data, setData] = useState([]);
    const [light] = useContext(Context);
    const [searchQuery, setSearchQuery] = useState("");
    const [openModal, setOpenModal] = useState(false);
    const [userSeleccionado, setUserSeleccionado] = useState<UsuariosPageProps | null>(null);
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });
    const queryClient = useQueryClient();
    const { mutate: eliminarUsuario } = useMutation(userDelete);

    const { isLoading, isError } = useQuery(["user"], UserGet, {
        refetchOnWindowFocus: false,
        onSuccess: (data) => {
            setData(data.data);
        },
    });

    return (
        <>
            <Head>
                <title>Ligamaster | Administrar usuarios</title>
            </Head>
            <Grid item container sx={{ padding: mobile ? "100px 20px 60px 20px" : "80px 120px 60px 120px", height: data.length >= 3 ? '100%' : '180vh' }}>
                <Grid item mt={6} xs={12}>
                    <AdminUsuarios
                        light={light}
                        mobile={mobile}
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                        data={data}
                        setOpenModal={setOpenModal}
                        setUserSeleccionado={setUserSeleccionado}
                        isLoading={isLoading}
                        isError={isError}
                        queryClient={queryClient}
                        eliminarUsuario={eliminarUsuario}
                    />
                </Grid>
            </Grid>
            {openModal && userSeleccionado && <ModalUser open={openModal} setOpen={setOpenModal} data={userSeleccionado} />}
        </>
    );
};

export default WithAdmin(Usuarios);