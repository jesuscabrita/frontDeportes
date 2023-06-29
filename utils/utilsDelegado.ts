import { alertaSubmit } from "./alert";

export const crearDelegado = (id: string, name: string, telefono , setIsLoading, crearDelegados, queryClient, handleClose) => {
    setIsLoading(true);
    const formData = { name, telefono  };
        crearDelegados({ form: formData, eid: id }, {
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

export const editarDelegado = (equipoId: string, delegadoId: string, name: string, telefono, setIsLoading, editardelegados, queryClient, handleClose) => {
    setIsLoading(true);
    const formData = { name, telefono };
        editardelegados({ form: formData, equipoId, delegadoId}, {
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