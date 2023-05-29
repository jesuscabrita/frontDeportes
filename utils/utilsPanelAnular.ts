import { alertaSubmit } from "./alert";

export const anularGoles = (
    equipoId: string,
    jugadorId: string,
    gol_partido: number,
    index: number,
    jugador_gol: number,
    jugador_name: string,
    goles: number,
    equipo,
    golesAFavor: number,
    golPartidoIndividual,
    golPartidoEquipo,
    setIsLoading,
    editarGol,
    queryClient
) => {
    setIsLoading(true);
    let updatedGolpartidoArr = [...golPartidoIndividual];
    let updatedGolpartido = jugador_gol - gol_partido;
    updatedGolpartidoArr[index] = updatedGolpartido;
    let sumaGolesaFavor = golesAFavor - gol_partido
    let updatedGolEquipoArr = [...golPartidoEquipo];
    let updatedGolEquipo = equipo - gol_partido;
    updatedGolEquipoArr[index] = updatedGolEquipo;
    let sumaGoles = goles - gol_partido;
    const formData = {
        gol_partido_individual: updatedGolpartidoArr,
        gol_partido: updatedGolEquipoArr,
        goles: sumaGoles,
        goles_a_Favor: sumaGolesaFavor,
    };
    editarGol({ form: formData, equipoId, jugadorId }, {
        onSuccess: (success) => {
            queryClient.invalidateQueries(["/api/liga"]);
            alertaSubmit(true, `Gol de ${jugador_name} anulado`);
            setIsLoading(false);
        },
        onError: (err: any) => {
            const errorMessage = err?.response?.data?.message || err.message;
            alertaSubmit(false, errorMessage);
            setIsLoading(false);
        },
    });
};

export const anularAsistencia = (
    equipoId: string,
    jugadorId: string,
    index: number,
    jugador_asistencia: number,
    jugador_name: string,
    asistencia: number,
    asistenciaPartidoIndividual,
    setIsLoading,
    editarAsistencias,
    queryClient
) => {
    setIsLoading(true);
    let updatedAsistenciapartidoArr = [...asistenciaPartidoIndividual];
    let updatedAsistenciapartido = jugador_asistencia - 1;
    updatedAsistenciapartidoArr[index] = updatedAsistenciapartido;
    let sumaAsistencia = asistencia - 1;
    const formData = {
        asistencia_partido_individual: updatedAsistenciapartidoArr,
        asistencias: sumaAsistencia,
    };
    editarAsistencias({ form: formData, equipoId, jugadorId }, {
        onSuccess: (success) => {
            queryClient.invalidateQueries(["/api/liga"]);
            alertaSubmit(true, `Asistencia de ${jugador_name} anulada`);
            setIsLoading(false);
        },
        onError: (err: any) => {
            const errorMessage = err?.response?.data?.message || err.message;
            alertaSubmit(false, errorMessage);
            setIsLoading(false);
        },
    });
};

export const anularRoja = (
    equipoId: string, 
    jugadorId: string, 
    index: number, 
    jugador_roja: number, 
    jugador_name: string, 
    rojas: number, 
    rojasAFavor: number, 
    rojaPartidoIndividual,
    suspendidoNumero: number,
    setIsLoading,
    editarRojas,
    queryClient
    ) => {
    setIsLoading(true);
    let updatedRojaspartidoArr = [...rojaPartidoIndividual];
    let updatedRojapartido = jugador_roja - 1;
    updatedRojaspartidoArr[index] = updatedRojapartido;
    let restaRojasaFavor = rojasAFavor - 1;
    let restaRojas = rojas - 1; 
    let restarSuspencion = suspendidoNumero - 1;
    const formData = {
        roja_partido_individual: updatedRojaspartidoArr,
        tarjetas_roja: restaRojas,
        tarjetasRojas: restaRojasaFavor,
        suspendido_numero :restarSuspencion,
        suspendido : 'No',
    };
    editarRojas({ form: formData, equipoId, jugadorId }, {
        onSuccess: (success) => {
            queryClient.invalidateQueries(["/api/liga"]);
            alertaSubmit(true, `Anular tarjeta roja para ${jugador_name}`);
            setIsLoading(false);
        },
        onError: (err: any) => {
            const errorMessage = err?.response?.data?.message || err.message;
            alertaSubmit(false, errorMessage);
            setIsLoading(false);
        },
    });
};

export const anularAzul = (
    equipoId: string, 
    jugadorId: string, 
    index: number, 
    jugador_azul: number, 
    jugador_name: string, 
    azul: number, 
    azulPartidoIndividual,
    setIsLoading,
    editarAzules,
    queryClient
    ) => {
    setIsLoading(true);
    let updatedAzulpartidoArr = [...azulPartidoIndividual];
    let updatedAzulpartido = jugador_azul - 1;
    updatedAzulpartidoArr[index] = updatedAzulpartido;
    let sumaAzul = azul - 1; 
    const formData = {
        azul_partido_individual: updatedAzulpartidoArr,
        tarjetas_azul: sumaAzul,
    };
    editarAzules({ form: formData, equipoId, jugadorId }, {
        onSuccess: (success) => {
            queryClient.invalidateQueries(["/api/liga"]);
            alertaSubmit(true, `Anular tarjeta azul para ${jugador_name}`);
            setIsLoading(false);
        },
        onError: (err: any) => {
            const errorMessage = err?.response?.data?.message || err.message;
            alertaSubmit(false, errorMessage);
            setIsLoading(false);
        },
    });
};

export const anularFigura = (
    equipoId: string, 
    jugadorId: string, 
    index: number, 
    jugador_figura: number, 
    jugador_name: string, 
    figura: number, 
    figuraPartidoIndividual,
    setIsLoading,
    editarAsistencias,
    queryClient
    ) => {
    setIsLoading(true);
    let updatedFigurapartidoArr = [...figuraPartidoIndividual];
    let updatedFigurapartido = jugador_figura - 1;
    updatedFigurapartidoArr[index] = updatedFigurapartido;
    let sumaFigura = figura - 1;
    // if (jugador_figura >= 1) {
    //     alertaSubmit(false, 'solo se puede ser figura 1 vez por partido');
    //     setIsLoading(false);
    //     return;
    // }
    const formData = {
        jugador_figura_individual: updatedFigurapartidoArr,
        figura: sumaFigura,
    };
    editarAsistencias({ form: formData, equipoId, jugadorId }, {
        onSuccess: (success) => {
            queryClient.invalidateQueries(["/api/liga"]);
            alertaSubmit(true, `${jugador_name} ya no es la figura del partido`);
            setIsLoading(false);
        },
        onError: (err: any) => {
            const errorMessage = err?.response?.data?.message || err.message;
            alertaSubmit(false, errorMessage);
            setIsLoading(false);
        },
    });
};

export const anularAmarilla = (
    equipoId: string,
    jugadorId: string,
    amarilla_partido: number,
    index: number,
    jugador_amarilla: number,
    jugador_name: string,
    amarillas: number,
    amarillasAFavor: number,
    amarillaPartidoIndividual,
    rojaPartidoIndividual,
    jugador_roja: number,
    rojasAFavor: number,
    rojas: number,
    suspendidoJugador: string,
    suspendidoNumero: number,
    setIsLoading,
    editarAmarillas,
    queryClient
) => {
    setIsLoading(true);
    let updatedAmarillaspartidoArr = [...amarillaPartidoIndividual];
    let updatedAmarillapartido = jugador_amarilla - amarilla_partido;
    updatedAmarillaspartidoArr[index] = updatedAmarillapartido;
    let restaAmarillasaFavor = amarillasAFavor - amarilla_partido;
    let restaAmarillas = amarillas - amarilla_partido;

    let updateRojaPartidoArr = [...rojaPartidoIndividual];
    let updatedRojapartido =
        updatedAmarillaspartidoArr[index] === 2 ? jugador_roja -= 1 : jugador_roja;
    updateRojaPartidoArr[index] = updatedRojapartido;

    let restarRojasaFavor =
        updatedAmarillaspartidoArr[index] === 2 ? rojasAFavor -= 1 : rojasAFavor;
    let restarRojas =
        updatedAmarillaspartidoArr[index] === 2 ? rojas -= 1 : rojas;
    let restarSuspencion =
        updatedAmarillaspartidoArr[index] === 2 ? suspendidoNumero -= 1 : suspendidoNumero;

    let suspenderJugador = "No";

    const formData = {
        amarilla_partido_individual: updatedAmarillaspartidoArr,
        tarjetas_amarillas: restaAmarillas,
        tarjetasAmarillas: restaAmarillasaFavor,
        roja_partido_individual: updateRojaPartidoArr,
        tarjetas_roja: restarRojas,
        tarjetasRojas: restarRojasaFavor,
        suspendido_numero: restarSuspencion,
        suspendido: suspenderJugador,
    };

    editarAmarillas({ form: formData, equipoId, jugadorId }, {
        onSuccess: (success) => {
            queryClient.invalidateQueries(["/api/liga"]);
            alertaSubmit(true, `Tarjeta amarilla anulada para ${jugador_name}`);
            setIsLoading(false);
        },
        onError: (err: any) => {
            const errorMessage = err?.response?.data?.message || err.message;
            alertaSubmit(false, errorMessage);
            setIsLoading(false);
        },
    });
};

export const bajarPartido = (
    equipoId: string, 
    jugadorId: string, 
    index: number, 
    jugador_name: string, 
    partido: number, 
    partidoIndividual,
    setIsLoading,
    editarPartidos,
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
    editarPartidos({ form: formData, equipoId, jugadorId }, {
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

export const anularAutoGol = (
    equipoId: string,
    autogol_partido: number,
    index: number,
    jugador_gol: number,
    jugador_autogol,
    golesAFavor: number,
    golPartidoIndividual,
    autogolPartidoEquipo,
    setIsLoading,
    editarAutogoles,
    queryClient
) => {
    setIsLoading(true);
    let updatedGolpartidoArr = [...golPartidoIndividual];
    let updatedGolpartido = jugador_gol - autogol_partido;
    updatedGolpartidoArr[index] = updatedGolpartido;

    let updatedAutoGolEquipoArr = [...autogolPartidoEquipo];
    let updatedAutoGolEquipo = jugador_autogol - autogol_partido;
    updatedAutoGolEquipoArr[index] = updatedAutoGolEquipo;

    let sumaGolesaFavor = golesAFavor - autogol_partido
    const formData = {
        gol_partido: updatedGolpartidoArr,
        autogol_partido: updatedAutoGolEquipoArr,
        goles_a_Favor: sumaGolesaFavor,
    };
    editarAutogoles({ form: formData, equipoId }, {
        onSuccess: (success) => {
            queryClient.invalidateQueries(["/api/liga"]);
            alertaSubmit(true, `Auto gol anulado`);
            setIsLoading(false);
        },
        onError: (err: any) => {
            const errorMessage = err?.response?.data?.message || err.message;
            alertaSubmit(false, errorMessage);
            setIsLoading(false);
        },
    });
};

