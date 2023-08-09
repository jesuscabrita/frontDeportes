import { alertaQuestion, alertaSubmit } from "./alert";

export const handleSolicitarPassword = (setIsLoading, solicitarContraseña, email, queryClient, router) => {
    setIsLoading(true);
    solicitarContraseña({ form: { email } }, {
        onSuccess: (success:any) => {
            queryClient.invalidateQueries(["login"]);
            alertaSubmit(true, success?.data.message);
            setIsLoading(false);
            router.push("/login");
        },
        onError: (err: any) => {
            const errorMessage = err?.response?.data?.message || err.message;
            alertaSubmit(false, errorMessage);
            setIsLoading(false);
        },
    });
};

export const crearUser = (nombre: string, apellido: string, fecha_de_nacimiento: string, email: string, password: string, repeated_password: string, equipo: string, setIsLoading, crearUser, queryClient,router) => {
    setIsLoading(true);
    const formData = { nombre, apellido, fecha_de_nacimiento, email, password, repeated_password, equipo };
    crearUser({ form: formData }, {
        onSuccess: (success) => {
            queryClient.invalidateQueries(["login"]);
            alertaSubmit(true, success?.data?.data?.message);
            setIsLoading(false);
            router.push("/login");
        },
        onError: (err: any) => {
            const errorMessage = err?.response?.data?.message || err.message;
            alertaSubmit(false, errorMessage);
            setIsLoading(false);
        },
    });
}

export const handleResetPassword = (setIsLoading, cambiarContraseñas, email, password, repeated_password, queryClient, router) => {
    setIsLoading(true);
    cambiarContraseñas({ form: { email, password, repeated_password } }, {
        onSuccess: (success:any) => {
            queryClient.invalidateQueries(["login"]);
            alertaSubmit(true, success?.data.message);
            setIsLoading(false);
            router.push("/login");
        },
        onError: (err: any) => {
            const errorMessage = err?.response?.data?.message || err.message;
            alertaSubmit(false, errorMessage);
            setIsLoading(false);
        },
    });
};

//USUARIOS "user"

export const eliminarUsuarios = (userId: string, eliminarUser, queryClient) => {
    alertaQuestion(userId, {}, (userId: string) => {
        eliminarUser({ userId }, {
            onSuccess: (success) => {
                queryClient.invalidateQueries(["user"]);
                alertaSubmit(true, success?.message);
            },
            onError: (err: any) => {
                const errorMessage = err?.response?.data?.message || err.message;
                alertaSubmit(false, errorMessage);
            },
        });
    }, 'Si, Eliminar!', 'Eliminado!', 'El usuario ha sido eliminado.', 'El usuario sigue en la liga :)')
}

export const editarUser = (userId: string,  nombre: string, apellido: string, role: string ,setIsLoading, editarUsuario, queryClient, handleClose) => {
    setIsLoading(true);
    const formData = { nombre, apellido, role };
    editarUsuario({ form: formData, userId }, {
        onSuccess: (success) => {
            queryClient.invalidateQueries(["user"]);
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