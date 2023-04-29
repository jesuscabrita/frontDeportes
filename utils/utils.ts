import { alertaCheck, alertaQuestion, alertaSubmit } from "./alert";

export const filterEstado = (array, estado) => {
    const newFilter = array.filter(data => data.estado == estado);
    return newFilter;
}

export const nuevoEquipo = (nombre: string, logo: string, correo: string, instagram: string, setIsLoading, crearEquipo, queryClient, setName, setImage, setCorreo, setInstagram, setLogoAdded, setImageName  ) => {
    setIsLoading(true);
    const formData = { form: { name: nombre, logo, correo, instagram } };
    crearEquipo(formData, {
        onSuccess: (success) => {
            queryClient.invalidateQueries(["/api/liga"])
            setName('');
            setImage('');
            setCorreo('')
            setInstagram('')
            setLogoAdded(false);
            setImageName('');
            alertaSubmit(true, success?.message);
            setTimeout(() => {
                alertaCheck('Registrado!', 'Gracias por crear un equipo en nuestra plataforma. En breve recibirás un correo electrónico con la confirmación de su registro. Si tiene alguna pregunta o necesita ayuda adicional, no dude en ponerse en contacto con nuestro equipo de soporte.');
            }, 4000);
            setIsLoading(false);
        },
        onError: (err: any) => {
            const errorMessage = err?.response?.data?.message || err.message;
            alertaSubmit(false, errorMessage);
            setIsLoading(false);
        },
    });
};

export const eliminarEquipos = (id: string, eliminarEquipo, queryClient)=>{
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
    },  'Si, Eliminar!', 'Eliminado de la Liga!', 'El equipo ha sido eliminado.', 'El equipo sigue en la liga :)'  )
}

export const editarEquipos = (id: string, name: string, logo: string, correo: string, instagram: string, setIsLoading, editarEquipo, queryClient, handleClose ) => {
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

export const editarEstado = (id: string, estado: string,editarEquipo, queryClient ) => {
    const formData = { estado: estado };
    alertaQuestion(id, formData, (id: string, formData: any) => {
        editarEquipo({ form: formData, id }, {
            onSuccess: (success) => {
                queryClient.invalidateQueries(["/api/liga"]);
                alertaSubmit(true, estado == 'registrado' ? 'Se registro el equipo correctamente': 'Se suspendio el equipo correctamente');
            },
            onError: (err: any) => {
                const errorMessage = err?.response?.data?.message || err.message;
                alertaSubmit(false, errorMessage);
            },
        });
    },  estado == 'registrado'? 'Si, Registrar!': 'Si, Suspender!',
        estado == 'registrado' ? 'Registrado a la Liga!': 'Suspendido de la Liga!',
        estado == 'registrado' ? 'El equipo ha sido registrado.': 'El equipo ha sido suspendido.',
        estado == 'registrado' ? 'El equipo sigue en la cola :)': 'El equipo sigue en la liga :)'  );
};

export const editarArbitros =(id: string, arbitro: string, index, setIsLoading, editarArbitro, queryClient, handleClose, data)=>{
    setIsLoading(true);
    const updatedArbitro = arbitro;
    const updatedArbitroArr = [...data.arbitro]; 
    updatedArbitroArr[index] = updatedArbitro; 
    const formData = {arbitro: updatedArbitroArr};
    editarArbitro({ form: formData, id }, {
        onSuccess: (success) => {
            queryClient.invalidateQueries(["/api/liga"]);
            alertaSubmit(true, 'Se editó el arbitro correctamente');
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

export const crearJugadores = (id: string, name: string, edad: string,posicion: string, fecha_nacimiento: string ,nacionalidad: string,dorsal: string,instagram: string,foto: string, setIsLoading, crearJugador, queryClient, handleClose) => {
    setIsLoading(true);
    const formData = { name, edad, posicion,fecha_nacimiento, nacionalidad , dorsal ,instagram, foto };
        crearJugador({ form: formData, eid: id }, {
            onSuccess: (success) => {
                queryClient.invalidateQueries(["equipos"]);
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

export const editarJugadores = (equipoId: string, jugadorId: string, name: string, edad: string,posicion: string, fecha_nacimiento: string ,nacionalidad: string,dorsal: string,instagram: string,foto: string, setIsLoading, editarJugador, queryClient, handleClose) => {
    setIsLoading(true);
    const formData = { name, edad, posicion,fecha_nacimiento, nacionalidad , dorsal ,instagram, foto };
        editarJugador({ form: formData, equipoId, jugadorId}, {
            onSuccess: (success) => {
                queryClient.invalidateQueries(["equipos"]);
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