import { alertaSubmit } from "./alert";

export const creardt = (id: string, name: string, fecha_nacimiento: string ,nacionalidad: string, instagram: string, telefono ,foto: string, setIsLoading, creardirectorTecnico, queryClient, handleClose) => {
    setIsLoading(true);
    const formData = { name, fecha_nacimiento, nacionalidad ,instagram,telefono ,foto };
        creardirectorTecnico({ form: formData, eid: id }, {
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

export const editarDTs = (equipoId: string, dtId: string, name: string, fecha_nacimiento: string ,nacionalidad: string, instagram: string, telefono, foto: string, setIsLoading, editardt, queryClient, handleClose) => {
    setIsLoading(true);
    const formData = { name, fecha_nacimiento, nacionalidad ,instagram,telefono ,foto };
        editardt({ form: formData, equipoId, dtId}, {
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

    export const editarPartidoDT = (
        equipoId: string,
        dtId: string,
        index: number,
        jugador_name: string,
        partido: number,
        partidoIndividual,
        setIsLoading,
        editarPartidosDT,
        queryClient
    ) => {
        setIsLoading(true);
        let updatedpartidoArr = [...partidoIndividual];
        let updatedpartido = 'Si';
        updatedpartidoArr[index] = updatedpartido;
        let sumaPartido = partido + 1;
    
        const formData = {
            partidos_individual: updatedpartidoArr,
            partidos: sumaPartido,
        };
        editarPartidosDT({ form: formData, equipoId, dtId }, {
            onSuccess: (success) => {
                queryClient.invalidateQueries(["/api/liga"]);
                alertaSubmit(true, `${jugador_name} convocado!`);
                setIsLoading(false);
            },
            onError: (err: any) => {
                const errorMessage = err?.response?.data?.message || err.message;
                alertaSubmit(false, errorMessage);
                setIsLoading(false);
            },
        });
    };

    export const bajarPartidoDT = (
        equipoId: string, 
        dtId: string, 
        index: number, 
        jugador_name: string, 
        partido: number, 
        partidoIndividual,
        setIsLoading,
        editarPartidosDT,
        queryClient
        ) => {
        setIsLoading(true);
        let updatedpartidoArr = [...partidoIndividual];
        let updatedpartido = 'No';
        updatedpartidoArr[index] = updatedpartido;
        let restarPartido = partido - 1;
    
        const formData = {
            partidos_individual: updatedpartidoArr,
            partidos: restarPartido,
        };
        editarPartidosDT({ form: formData, equipoId, dtId }, {
            onSuccess: (success) => {
                queryClient.invalidateQueries(["/api/liga"]);
                alertaSubmit(true, `${jugador_name} Baja de la convocatoria!`);
                setIsLoading(false);
            },
            onError: (err: any) => {
                const errorMessage = err?.response?.data?.message || err.message;
                alertaSubmit(false, errorMessage);
                setIsLoading(false);
            },
        });
    };