import { alertaQuestion, alertaSubmit } from "./alert";

export const handleSolicitarPassword = (setIsLoading, solicitarContraseña, email, queryClient, router, setEmailError, setEmailErrorText) => {
    setIsLoading(true);
    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    if (!isValidEmail(email)) {
        alertaSubmit(false, 'Debes escribir un email válido');
        setEmailError(true)
        setEmailErrorText('Debes escribir un email válido')
        setIsLoading(false);
        return;
    }
    solicitarContraseña({ form: { email } }, {
        onSuccess: (success: any) => {
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

export const crearUser = (nombre: string, apellido: string, fecha_de_nacimiento: string, email: string, password: string, repeated_password: string, equipo: string, setIsLoading, crearUser, queryClient, router, categoria) => {
    setIsLoading(true);
    if (categoria === 'Elija una opción') {
        alertaSubmit(false, 'Debes seleccionar una categoria');
        setIsLoading(false);
        return;
    }
    const formData = { nombre, apellido, fecha_de_nacimiento, email, password, repeated_password, equipo, categoria };
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

export const handleResetPassword = (setIsLoading, cambiarContraseñas, email, password, repeated_password, queryClient, router, setEmailError, setEmailErrorText, setPasswordError, setPasswordErrorText, setRepeatedPasswordError, setRepeatedPasswordErrorText) => {
    setIsLoading(true);
    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const isValidPassword = (password) => {
        return password.length >= 8;
    };

    const arePasswordsEqual = (password, repeated_password) => {
        return password === repeated_password;
    };

    if (!isValidEmail(email)) {
        alertaSubmit(false, 'Debes escribir un email válido');
        setEmailError(true)
        setEmailErrorText('Debes escribir un email válido')
        setIsLoading(false);
        return;
    }

    if (!isValidPassword(password)) {
        alertaSubmit(false, 'La contraseña debe tener al menos 8 caracteres');
        setPasswordError(true)
        setPasswordErrorText('Debes escribir un email válido')
        setIsLoading(false);
        return;
    }

    if (!arePasswordsEqual(password, repeated_password)) {
        alertaSubmit(false, 'Las contraseñas no coinciden');
        setRepeatedPasswordError(true);
        setRepeatedPasswordErrorText('Las contraseñas no coinciden');
        setIsLoading(false);
        return;
    }

    cambiarContraseñas({ form: { email, password, repeated_password } }, {
        onSuccess: (success: any) => {
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

export const editarUser = (userId: string, nombre: string, apellido: string, role: string, setIsLoading, editarUsuario, queryClient, handleClose) => {
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

export const editarPerfilUser = (
    userId: string,
    nombre: string,
    apellido: string,
    email: string,
    fecha_de_nacimiento,
    setIsLoading,
    editarPerfilUser,
    queryClient,
    handleClose
) => {
    setIsLoading(true);
    const formData = { nombre, apellido, email, fecha_de_nacimiento };
    editarPerfilUser({ form: formData, userId }, {
        onSuccess: (success) => {
            queryClient.invalidateQueries(["usuario"]);
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