import { alertaQuestion, alertaSubmit } from "./alert";

export const creardt = (id: string, name: string, fecha_nacimiento: string, nacionalidad: string, instagram: string, telefono, foto: string, setIsLoading, creardirectorTecnico, queryClient, handleClose) => {
    setIsLoading(true);
    const formData = { name, fecha_nacimiento, nacionalidad, instagram, telefono, foto };
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

export const editarDTs = (equipoId: string, dtId: string, name: string, fecha_nacimiento: string, nacionalidad: string, instagram: string, telefono, foto: string, setIsLoading, editardt, queryClient, handleClose) => {
    setIsLoading(true);
    const formData = { name, fecha_nacimiento, nacionalidad, instagram, telefono, foto };
    editardt({ form: formData, equipoId, dtId }, {
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

export const eliminarDTs = (equipoId: string, dtId: string, eliminarDT, queryClient) => {
    alertaQuestion(equipoId, {}, (equipoId: string) => {
        eliminarDT({ equipoId, dtId }, {
            onSuccess: (success) => {
                queryClient.invalidateQueries(["equipos"]);
                alertaSubmit(true, success?.message);
            },
            onError: (err: any) => {
                const errorMessage = err?.response?.data?.message || err.message;
                alertaSubmit(false, errorMessage);
            },
        });
    }, 'Si, Eliminar!', 'Eliminado de el equipo!', 'El director tecnico ha sido eliminado.', 'El director  tecnico sigue en el equipo :)')
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

export const editarAmarillaDT = (
    equipoId: string,
    dtId: string,
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
    editarAmarillasDT,
    queryClient,
    tarjetasAcumuladas
) => {
    setIsLoading(true);
    let updatedAmarillaspartidoArr = [...amarillaPartidoIndividual];
    let updatedAmarillapartido = jugador_amarilla + amarilla_partido;
    updatedAmarillaspartidoArr[index] = updatedAmarillapartido;
    let sumaAmarillasaFavor = amarillasAFavor + amarilla_partido
    let sumaAmarillas = amarillas + amarilla_partido;
    let updateRojaPartidoArr = [...rojaPartidoIndividual];
    let updatedRojapartido =
        updateRojaPartidoArr[index] === 2 ? jugador_roja + 1 : jugador_roja;
    updateRojaPartidoArr[index] = updatedRojapartido;
    let sumarRojasaFavor =
        updateRojaPartidoArr[index] === 2 ? rojasAFavor + 1 : rojasAFavor;
    let sumarRojas = updateRojaPartidoArr[index] === 2 ? rojas + 1 : rojas;
    let sumarSuspencion =
        updateRojaPartidoArr[index] === 2 ? suspendidoNumero + 1 : suspendidoNumero;
    let suspenderJugador = updateRojaPartidoArr[index] === 2 ? suspendidoJugador = 'Si' : suspendidoJugador
    if (jugador_amarilla >= 2) {
        alertaSubmit(false, `solo se puede sacar 2 amarillas por partido, ya debio estar expulsado ${jugador_name}`);
        setIsLoading(false);
        return;
    }
    if (updatedAmarillapartido === 2) {
        updateRojaPartidoArr[index] = 1;
        sumarRojasaFavor += 1;
        sumarRojas += 1;
        sumarSuspencion += 1;
        suspenderJugador = 'Si';
    }
    let acumulada = tarjetasAcumuladas + amarilla_partido
    const formData = {
        amarilla_partido: updatedAmarillaspartidoArr,
        tarjetas_amarillas: sumaAmarillas,
        tarjetasAmarillas: sumaAmarillasaFavor,
        roja_partido: updateRojaPartidoArr,
        tarjetas_rojas: sumarRojas,
        tarjetasRojas: sumarRojasaFavor,
        suspendido_numero: sumarSuspencion,
        suspendido: suspenderJugador,
        tarjetas_acumuladas: acumulada
    };
    editarAmarillasDT({ form: formData, equipoId, dtId }, {
        onSuccess: (success) => {
            queryClient.invalidateQueries(["/api/liga"]);
            alertaSubmit(true, `Amarilla para ${jugador_name}`);
            setIsLoading(false);
        },
        onError: (err: any) => {
            const errorMessage = err?.response?.data?.message || err.message;
            alertaSubmit(false, errorMessage);
            setIsLoading(false);
        },
    });
};

export const anularAmarillaDT = (
    equipoId: string,
    dtId: string,
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
    editarAmarillasDT,
    queryClient,
    tarjetasAcumuladas
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

    if (jugador_amarilla < 1) {
        alertaSubmit(false, 'no puedes anular si no tiene tarjeta amarilla');
        setIsLoading(false);
        return;
    }
    let acumulada = tarjetasAcumuladas - amarilla_partido

    const formData = {
        amarilla_partido: updatedAmarillaspartidoArr,
        tarjetas_amarillas: restaAmarillas,
        tarjetasAmarillas: restaAmarillasaFavor,
        roja_partido: updateRojaPartidoArr,
        tarjetas_rojas: restarRojas,
        tarjetasRojas: restarRojasaFavor,
        suspendido_numero: restarSuspencion,
        suspendido: suspenderJugador,
        tarjetas_acumuladas: acumulada
    };

    editarAmarillasDT({ form: formData, equipoId, dtId }, {
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

export const editarRojaDT = (
    equipoId: string,
    dtId: string,
    index: number,
    jugador_roja: number,
    jugador_name: string,
    rojas: number,
    rojasAFavor: number,
    rojaPartidoIndividual,
    suspendidoNumero: number,
    setIsLoading,
    editarRojasDTs,
    queryClient
) => {
    setIsLoading(true);
    let updatedRojaspartidoArr = [...rojaPartidoIndividual];
    let updatedRojapartido = jugador_roja + 1;
    updatedRojaspartidoArr[index] = updatedRojapartido;
    let sumaRojasaFavor = rojasAFavor + 1;
    let sumaRojas = rojas + 1;
    let sumarSuspencion = suspendidoNumero + 1;
    if (jugador_roja >= 1) {
        alertaSubmit(false, 'solo se puede sacar 1 roja por partido');
        setIsLoading(false);
        return;
    }
    const formData = {
        roja_partido: updatedRojaspartidoArr,
        tarjetas_rojas: sumaRojas,
        tarjetasRojas: sumaRojasaFavor,
        suspendido_numero: sumarSuspencion,
        suspendido: 'Si',
    };
    editarRojasDTs({ form: formData, equipoId, dtId }, {
        onSuccess: (success) => {
            queryClient.invalidateQueries(["/api/liga"]);
            alertaSubmit(true, `Roja para ${jugador_name}`);
            setIsLoading(false);
        },
        onError: (err: any) => {
            const errorMessage = err?.response?.data?.message || err.message;
            alertaSubmit(false, errorMessage);
            setIsLoading(false);
        },
    });
};

export const anularRojaDT = (
    equipoId: string,
    dtId: string,
    index: number,
    jugador_roja: number,
    jugador_name: string,
    rojas: number,
    rojasAFavor: number,
    rojaPartidoIndividual,
    suspendidoNumero: number,
    setIsLoading,
    editarRojasDTs,
    queryClient
) => {
    setIsLoading(true);
    let updatedRojaspartidoArr = [...rojaPartidoIndividual];
    let updatedRojapartido = jugador_roja - 1;
    updatedRojaspartidoArr[index] = updatedRojapartido;
    let restaRojasaFavor = rojasAFavor - 1;
    let restaRojas = rojas - 1;
    let restarSuspencion = suspendidoNumero - 1;
    if (jugador_roja < 1) {
        alertaSubmit(false, 'no puedes anular si no tiene tarjeta roja');
        setIsLoading(false);
        return;
    }
    const formData = {
        roja_partido: updatedRojaspartidoArr,
        tarjetas_rojas: restaRojas,
        tarjetasRojas: restaRojasaFavor,
        suspendido_numero: restarSuspencion,
        suspendido: 'No',
    };
    editarRojasDTs({ form: formData, equipoId, dtId }, {
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

export const editarAzulDT = (
    equipoId: string,
    dtId: string,
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
    let updatedAzulpartido = jugador_azul + 1;
    updatedAzulpartidoArr[index] = updatedAzulpartido;
    let sumaAzul = azul + 1;
    if (jugador_azul >= 1) {
        alertaSubmit(false, 'solo se puede sacar 1 azul por partido');
        setIsLoading(false);
        return;
    }
    const formData = {
        azul_partido: updatedAzulpartidoArr,
        tarjetas_azul: sumaAzul,
    };
    editarAzules({ form: formData, equipoId, dtId }, {
        onSuccess: (success) => {
            queryClient.invalidateQueries(["/api/liga"]);
            alertaSubmit(true, `Azul para ${jugador_name}`);
            setIsLoading(false);
        },
        onError: (err: any) => {
            const errorMessage = err?.response?.data?.message || err.message;
            alertaSubmit(false, errorMessage);
            setIsLoading(false);
        },
    });
};

export const anularAzulDT = (
    equipoId: string,
    dtId: string,
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
    if (jugador_azul < 1) {
        alertaSubmit(false, 'no puedes anular si no tiene tarjeta azul');
        setIsLoading(false);
        return;
    }
    const formData = {
        azul_partido: updatedAzulpartidoArr,
        tarjetas_azul: sumaAzul,
    };
    editarAzules({ form: formData, equipoId, dtId }, {
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

export const editarFiguraDT = (
    equipoId: string,
    dtId: string,
    index: number,
    jugador_figura: number,
    jugador_name: string,
    figura: number,
    figuraPartidoIndividual,
    setIsLoading,
    editarFiguraDT,
    queryClient
) => {
    setIsLoading(true);
    let updatedFigurapartidoArr = [...figuraPartidoIndividual];
    let updatedFigurapartido = jugador_figura + 1;
    updatedFigurapartidoArr[index] = updatedFigurapartido;
    let sumaFigura = figura + 1;
    if (jugador_figura >= 1) {
        alertaSubmit(false, 'solo se puede ser figura 1 vez por partido');
        setIsLoading(false);
        return;
    }
    const formData = {
        figura_partido: updatedFigurapartidoArr,
        figura: sumaFigura,
    };
    editarFiguraDT({ form: formData, equipoId, dtId }, {
        onSuccess: (success) => {
            queryClient.invalidateQueries(["/api/liga"]);
            alertaSubmit(true, `La Figura del partido es ${jugador_name}`);
            setIsLoading(false);
        },
        onError: (err: any) => {
            const errorMessage = err?.response?.data?.message || err.message;
            alertaSubmit(false, errorMessage);
            setIsLoading(false);
        },
    });
};

export const anularFiguraDT = (
    equipoId: string,
    dtId: string,
    index: number,
    jugador_figura: number,
    jugador_name: string,
    figura: number,
    figuraPartidoIndividual,
    setIsLoading,
    editarFiguraDT,
    queryClient
) => {
    setIsLoading(true);
    let updatedFigurapartidoArr = [...figuraPartidoIndividual];
    let updatedFigurapartido = jugador_figura - 1;
    updatedFigurapartidoArr[index] = updatedFigurapartido;
    let sumaFigura = figura - 1;
    if (jugador_figura < 1) {
        alertaSubmit(false, 'no puedes anular si no fue seleccionado como jugador figura');
        setIsLoading(false);
        return;
    }
    const formData = {
        figura_partido: updatedFigurapartidoArr,
        figura: sumaFigura,
    };
    editarFiguraDT({ form: formData, equipoId, dtId }, {
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

export const editarSuspencionDT = (
    equipoId: string,
    dtId: string,
    jugadorSuspendido: string,
    jugador_name: string,
    jornadaSuspendido: number,
    setIsLoading,
    editarSupendido,
    queryClient,
    tarjetasAcumuladas,
) => {
    setIsLoading(true);
    let suspencion = jugadorSuspendido;
    let jornada = jornadaSuspendido;
    let acumulada = tarjetasAcumuladas;

    if (acumulada === 2) {
        suspencion = 'Si';
        acumulada = 0;
        jornada += 1;
    } else {
        if (jornada >= 1) {
            jornada -= 1;
            if (jornada === 0) {
                suspencion = 'No';
            }
        }
        if (suspencion === 'Si') {
            jornada += 1;
        }
    }

    const formData = {
        suspendido: suspencion,
        jornadas_suspendido: jornada,
        tarjetas_acumuladas: acumulada,
    };
    editarSupendido({ form: formData, equipoId, dtId }, {
        onSuccess: (success) => {
            queryClient.invalidateQueries(["/api/liga"]);
            alertaSubmit(true, `${jugador_name} se le modifico su suspencion!`);
            setIsLoading(false);
        },
        onError: (err: any) => {
            const errorMessage = err?.response?.data?.message || err.message;
            alertaSubmit(false, errorMessage);
            setIsLoading(false);
        },
    });
};

export const editarJornadaDT = (
    equipoId: string,
    dtId: string,
    jugador_name: string,
    partidoJornada: number,
    setIsLoading,
    editarJornada,
    queryClient,
    value,
    handleClose,
    setJornada
) => {
    setIsLoading(true);
    const formData = {
        jornadas_suspendido: partidoJornada + parseInt(value, 10),
    };
    editarJornada({ form: formData, equipoId, dtId }, {
        onSuccess: (success) => {
            queryClient.invalidateQueries(["equipos"]);
            alertaSubmit(true, `${jugador_name} se le modifico la jornadas suspendias!`);
            setIsLoading(false);
            setJornada('')
            handleClose()
        },
        onError: (err: any) => {
            const errorMessage = err?.response?.data?.message || err.message;
            alertaSubmit(false, errorMessage);
            setIsLoading(false);
        },
    });
};

export const editarJornadaRestaDT = (
    equipoId: string,
    dtId: string,
    jugador_name: string,
    partidoJornada: number,
    setIsLoading,
    editarPartidos,
    queryClient,
    value,
    handleClose,
    setJornada
) => {
    setIsLoading(true);
    const formData = {
        jornadas_suspendido: partidoJornada - parseInt(value, 10),
    };
    editarPartidos({ form: formData, equipoId, dtId }, {
        onSuccess: (success) => {
            queryClient.invalidateQueries(["equipos"]);
            alertaSubmit(true, `${jugador_name} se le modifico la jornadas suspendias!`);
            setIsLoading(false);
            setJornada('')
            handleClose()
        },
        onError: (err: any) => {
            const errorMessage = err?.response?.data?.message || err.message;
            alertaSubmit(false, errorMessage);
            setIsLoading(false);
        },
    });
};