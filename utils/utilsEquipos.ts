import { alertaCheck, alertaQuestion, alertaSubmit } from "./alert";
import { filterEstado } from "./utils";

export const nuevoEquipo = (
    nombre: string,
    logo: any,
    correo: string,
    instagram: string,
    setIsLoading,
    crearEquipo,
    queryClient,
    setImage,
    setInstagram,
    setLogoAdded,
    setImageName,
    subCategoria,
    router,
    categoria,
) => {
    setIsLoading(true);
    if (subCategoria === 'Elija una opción') {
        alertaSubmit(false, 'Debes seleccionar una categoria');
        setIsLoading(false);
        return;
    }
    const formData = { form: { name: nombre, logo, correo, instagram, subCategoria, categoria } };
    crearEquipo(formData, {
        onSuccess: (success) => {
            queryClient.invalidateQueries(["/api/liga"])
            setImage('');
            setInstagram('')
            setLogoAdded(false);
            setImageName('');
            alertaSubmit(true, success?.message);
            router.replace("/");
            // setTimeout(() => {
            //     alertaCheck('Registrado!', 'Gracias por crear un equipo en nuestra plataforma. En breve recibirás un correo electrónico con la confirmación de su registro. Si tiene alguna pregunta o necesita ayuda adicional, no dude en ponerse en contacto con nuestro equipo de soporte.');
            // }, 4000);
            setIsLoading(false);
        },
        onError: (err: any) => {
            const errorMessage = err?.response?.data?.message || err.message;
            alertaSubmit(false, errorMessage);
            setIsLoading(false);
        },
    });
};

export const eliminarEquipos = (id: string, eliminarEquipo, queryClient) => {
    alertaQuestion(id, {}, (id: string) => {
        eliminarEquipo({ id }, {
            onSuccess: (success) => {
                queryClient.invalidateQueries(["/api/liga"]);
                alertaSubmit(true, success?.message);
            },
            onError: (err: any) => {
                const errorMessage = err?.response?.data?.message || err.message;
                alertaSubmit(false, errorMessage);
            },
        });
    }, 'Si, Eliminar!', 'Eliminado!', 'El equipo ha sido eliminado.', 'El equipo sigue en cola :)')
}

export const editarEquipos = (
    id: string,
    name: string,
    logo: any,
    correo: string,
    instagram: string,
    setIsLoading,
    editarEquipo,
    queryClient,
    handleClose,
    categoria
) => {
    setIsLoading(true);
    const formData = { name, logo, correo, instagram, categoria };
    editarEquipo({ form: formData, id }, {
        onSuccess: (success) => {
            queryClient.invalidateQueries(["/api/liga"]);
            alertaSubmit(true, success?.message);
            setIsLoading(false);
            handleClose()
        },
        onError: (err: any) => {
            const errorMessage = err?.response?.data?.message || err.message;
            alertaSubmit(false, errorMessage);
            setIsLoading(false);
        },
    });
}

export const editarEstado = (id: string, estado: string, editarEstados, queryClient, subCategoria, liga) => {
    const formData = { estado: estado, subCategoria: subCategoria };
    alertaQuestion(id, formData, (id: string, formData: any) => {
        editarEstados({ form: formData, id }, {
            onSuccess: (success) => {
                queryClient.invalidateQueries(["/api/liga"]);
                alertaSubmit(true, `Se registro el equipo correctamente en ${liga}`);
            },
            onError: (err: any) => {
                const errorMessage = err?.response?.data?.message || err.message;
                alertaSubmit(false, errorMessage);
            },
        });
    }, 'Si, Registrar!', `Registrado en ${liga}.!`, `El equipo ha sido registrado en ${liga}.`, `El equipo sigue en ${liga}:)`);
};

export const editarEstadoSuspender = (id: string, estado: string, editarEstados, queryClient, subCategoria, liga) => {
    const formData = { estado: estado, subCategoria: subCategoria };
    alertaQuestion(id, formData, (id: string, formData: any) => {
        editarEstados({ form: formData, id }, {
            onSuccess: (success) => {
                queryClient.invalidateQueries(["/api/liga"]);
                alertaSubmit(true, `Se registro el equipo correctamente en ${liga}`);
            },
            onError: (err: any) => {
                const errorMessage = err?.response?.data?.message || err.message;
                alertaSubmit(false, errorMessage);
            },
        });
    }, 'Si, Suspender!', `Suspendido.!`, `El equipo ha sido suspendido.`, `El equipo no fue suspendido:)`);
};


export const editarReset = async (setIsLoading, queryClient, data, reseteoEquipos) => {
    alertaQuestion("", {}, () => {
        setIsLoading(true);
        filterEstado(data, 'registrado').forEach(equiposdata => {
            reseteoEquipos({ equipoID: equiposdata._id }, {
                onSuccess: (success) => {
                    queryClient.invalidateQueries(["/api/liga"]);
                    setIsLoading(false);
                },
                onError: (err: any) => {
                    const errorMessage = err?.response?.data?.message || err.message;
                    alertaSubmit(false, errorMessage);
                    setIsLoading(false);
                },
            });
        });
    }, 'Si, Resetear!', 'Reinicio de Equipos', '¡Los equipos fueron reseteados correctamente!', 'Los equipos no fueron reseteados',);
};