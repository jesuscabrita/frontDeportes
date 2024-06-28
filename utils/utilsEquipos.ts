import { alertaCheck, alertaQuestion, alertaSubmit } from "./alert";
import { filterEmail, filterEstado } from "./utils";

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
) => {
    setIsLoading(true);
    if (subCategoria === 'Elija una opción') {
        alertaSubmit(false, 'Debes seleccionar una categoria');
        setIsLoading(false);
        return;
    }
    const formData = { form: { name: nombre, logo, correo, instagram, subCategoria } };
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
    }, 'Si, Eliminar!', 'Eliminado de la Liga!', 'El equipo ha sido eliminado.', 'El equipo sigue en la liga :)')
}

export const editarEquipos = (id: string, name: string, logo: string, correo: string, instagram: string, setIsLoading, editarEquipo, queryClient, handleClose) => {
    setIsLoading(true);
    const formData = { name, logo, correo, instagram };
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

export const editarEstado = (id: string, estado: string, editarEquipo, queryClient) => {
    const formData = { estado: estado };
    alertaQuestion(id, formData, (id: string, formData: any) => {
        editarEquipo({ form: formData, id }, {
            onSuccess: (success) => {
                queryClient.invalidateQueries(["/api/liga"]);
                alertaSubmit(true, estado == 'registrado' ? 'Se registro el equipo correctamente' : 'Se suspendio el equipo correctamente');
            },
            onError: (err: any) => {
                const errorMessage = err?.response?.data?.message || err.message;
                alertaSubmit(false, errorMessage);
            },
        });
    }, estado == 'registrado' ? 'Si, Registrar!' : 'Si, Suspender!',
        estado == 'registrado' ? 'Registrado a la Liga!' : 'Suspendido de la Liga!',
        estado == 'registrado' ? 'El equipo ha sido registrado.' : 'El equipo ha sido suspendido.',
        estado == 'registrado' ? 'El equipo sigue en la cola :)' : 'El equipo sigue en la liga :)');
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