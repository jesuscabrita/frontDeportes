import { alertaQuestion, alertaSubmit } from "./alert";

export const crearJugadores = (id: string, name: string, sueldo: number,contrato ,posicion: string, fecha_nacimiento: string, nacionalidad: string, dorsal: string, instagram: string, foto: string, setIsLoading, crearJugador, queryClient, handleClose) => {
    setIsLoading(true);
    const formData = { name, sueldo, contrato, posicion, fecha_nacimiento, nacionalidad, dorsal, instagram, foto };
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

export const editarJugadores = (equipoId: string, jugadorId: string, name: string, sueldo: number,contrato ,posicion: string, fecha_nacimiento: string, nacionalidad: string, dorsal: string, instagram: string, foto: string, setIsLoading, editarJugador, queryClient, handleClose) => {
    setIsLoading(true);
    const formData = { name, sueldo, contrato ,posicion, fecha_nacimiento, nacionalidad, dorsal, instagram, foto };
    editarJugador({ form: formData, equipoId, jugadorId }, {
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

export const eliminarJugadores = (equipoId: string, jugadorId: string, eliminarJugador, queryClient) => {
    alertaQuestion(equipoId, {}, (equipoId: string) => {
        eliminarJugador({ equipoId, jugadorId }, {
            onSuccess: (success) => {
                queryClient.invalidateQueries(["equipos"]);
                alertaSubmit(true, success?.message);
            },
            onError: (err: any) => {
                const errorMessage = err?.response?.data?.message || err.message;
                alertaSubmit(false, errorMessage);
            },
        });
    }, 'Si, Eliminar!', 'Eliminado de el equipo!', 'El jugador ha sido eliminado.', 'El jugador sigue en el equipo :)')
}

export const editarRoja = (
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
        roja_partido_individual: updatedRojaspartidoArr,
        tarjetas_roja: sumaRojas,
        tarjetasRojas: sumaRojasaFavor,
        suspendido_numero: sumarSuspencion,
        suspendido: 'Si',
    };
    editarRojas({ form: formData, equipoId, jugadorId }, {
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

export const editarAmarilla = (
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
        amarilla_partido_individual: updatedAmarillaspartidoArr,
        tarjetas_amarillas: sumaAmarillas,
        tarjetasAmarillas: sumaAmarillasaFavor,
        roja_partido_individual: updateRojaPartidoArr,
        tarjetas_roja: sumarRojas,
        tarjetasRojas: sumarRojasaFavor,
        suspendido_numero: sumarSuspencion,
        suspendido: suspenderJugador,
        tarjetas_acumuladas: acumulada
    };
    editarAmarillas({ form: formData, equipoId, jugadorId }, {
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

export const editarAzul = (
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
    let updatedAzulpartido = jugador_azul + 1;
    updatedAzulpartidoArr[index] = updatedAzulpartido;
    let sumaAzul = azul + 1;
    if (jugador_azul >= 1) {
        alertaSubmit(false, 'solo se puede sacar 1 azul por partido');
        setIsLoading(false);
        return;
    }
    const formData = {
        azul_partido_individual: updatedAzulpartidoArr,
        tarjetas_azul: sumaAzul,
    };
    editarAzules({ form: formData, equipoId, jugadorId }, {
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

export const editarAsistencia = (
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
    let updatedAsistenciapartido = jugador_asistencia + 1;
    updatedAsistenciapartidoArr[index] = updatedAsistenciapartido;
    let sumaAsistencia = asistencia + 1;
    const formData = {
        asistencia_partido_individual: updatedAsistenciapartidoArr,
        asistencias: sumaAsistencia,
    };
    editarAsistencias({ form: formData, equipoId, jugadorId }, {
        onSuccess: (success) => {
            queryClient.invalidateQueries(["/api/liga"]);
            alertaSubmit(true, `Asistencia de ${jugador_name}`);
            setIsLoading(false);
        },
        onError: (err: any) => {
            const errorMessage = err?.response?.data?.message || err.message;
            alertaSubmit(false, errorMessage);
            setIsLoading(false);
        },
    });
};

export const editarFigura = (
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
    let updatedFigurapartido = jugador_figura + 1;
    updatedFigurapartidoArr[index] = updatedFigurapartido;
    let sumaFigura = figura + 1;
    if (jugador_figura >= 1) {
        alertaSubmit(false, 'solo se puede ser figura 1 vez por partido');
        setIsLoading(false);
        return;
    }
    const formData = {
        jugador_figura_individual: updatedFigurapartidoArr,
        figura: sumaFigura,
    };
    editarAsistencias({ form: formData, equipoId, jugadorId }, {
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

export const editarGoles = (
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
    let updatedGolpartido = jugador_gol + gol_partido;
    updatedGolpartidoArr[index] = updatedGolpartido;
    let sumaGolesaFavor = golesAFavor + gol_partido
    let updatedGolEquipoArr = [...golPartidoEquipo];
    let updatedGolEquipo = equipo + gol_partido;
    updatedGolEquipoArr[index] = updatedGolEquipo;
    let sumaGoles = goles + gol_partido;
    const formData = {
        gol_partido_individual: updatedGolpartidoArr,
        gol_partido: updatedGolEquipoArr,
        goles: sumaGoles,
        goles_a_Favor: sumaGolesaFavor,
    };
    editarGol({ form: formData, equipoId, jugadorId }, {
        onSuccess: (success) => {
            queryClient.invalidateQueries(["/api/liga"]);
            alertaSubmit(true, `Golll! de ${jugador_name}`);
            setIsLoading(false);
        },
        onError: (err: any) => {
            const errorMessage = err?.response?.data?.message || err.message;
            alertaSubmit(false, errorMessage);
            setIsLoading(false);
        },
    });
};

export const editarAutoGol = (
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
    let updatedGolpartido = jugador_gol + autogol_partido;
    updatedGolpartidoArr[index] = updatedGolpartido;

    let updatedAutoGolEquipoArr = [...autogolPartidoEquipo];
    let updatedAutoGolEquipo = jugador_autogol + autogol_partido;
    updatedAutoGolEquipoArr[index] = updatedAutoGolEquipo;

    let sumaGolesaFavor = golesAFavor + autogol_partido
    const formData = {
        gol_partido: updatedGolpartidoArr,
        autogol_partido: updatedAutoGolEquipoArr,
        goles_a_Favor: sumaGolesaFavor,
    };
    editarAutogoles({ form: formData, equipoId }, {
        onSuccess: (success) => {
            queryClient.invalidateQueries(["/api/liga"]);
            alertaSubmit(true, `Auto gol`);
            setIsLoading(false);
        },
        onError: (err: any) => {
            const errorMessage = err?.response?.data?.message || err.message;
            alertaSubmit(false, errorMessage);
            setIsLoading(false);
        },
    });
};

export const editarPartido = (
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
    let updatedpartido = 'Si';
    updatedpartidoArr[index] = updatedpartido;
    let sumaPartido = partido + 1;

    const formData = {
        partidos_individual: updatedpartidoArr,
        partidos: sumaPartido,
    };
    editarPartidos({ form: formData, equipoId, jugadorId }, {
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

export const editarSuspencion = (
    equipoId: string,
    jugadorId: string,
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
    editarSupendido({ form: formData, equipoId, jugadorId }, {
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

export const datosDelPartidoHome = (
    equipoId,
    partidosHomeJugados,
    equipoHomeGol,
    equipoAwayGol,
    partidoGanado,
    partidoEmpatado,
    partidoPerdido,
    golEnContra,
    golAfavor,
    equipoHomePuntos,
    homeLast,
    currentRound,
    setIsLoading,
    data,
    calcularDatosPartidos,
    queryClient
) => {
    setIsLoading(true);
    let PartidoJugadoSuma = partidosHomeJugados + 1;
    let sumaGanados = equipoHomeGol > equipoAwayGol ? partidoGanado + 1 : partidoGanado;
    let sumaEmpates = equipoHomeGol == equipoAwayGol ? partidoEmpatado + 1 : partidoEmpatado;
    let sumaPerdidos = equipoHomeGol < equipoAwayGol ? partidoPerdido + 1 : partidoPerdido;
    let sumaGoEnContra = golEnContra + equipoAwayGol;
    let calculoDiferenciaGoles = golAfavor - sumaGoEnContra;
    let sumaPuntos =
        equipoHomeGol > equipoAwayGol
            ? equipoHomePuntos + 3
            : equipoHomeGol < equipoAwayGol
                ? equipoHomePuntos
                : equipoHomePuntos + 1;
    let valueLast = [...homeLast];
    if (equipoHomeGol > equipoAwayGol) {
        valueLast[currentRound] = 'win';
    } else if (equipoHomeGol < equipoAwayGol) {
        valueLast[currentRound] = 'loss';
    } else {
        valueLast[currentRound] = 'draw';
    }
    let calculoPuntajeAnterior = data.findIndex(item => item._id === equipoId)

    const formData = {
        partidosJugados: PartidoJugadoSuma,
        ganados: sumaGanados,
        empates: sumaEmpates,
        perdidos: sumaPerdidos,
        goles_en_Contra: sumaGoEnContra,
        diferencia_de_Goles: calculoDiferenciaGoles,
        puntos: sumaPuntos,
        last5: valueLast,
        puntaje_anterior: calculoPuntajeAnterior,
    };
    calcularDatosPartidos({ form: formData, equipoId }, {
        onSuccess: (success) => {
            queryClient.invalidateQueries(["/api/liga"]);
            alertaSubmit(true, success?.message);
            setIsLoading(false);
        },
        onError: (err: any) => {
            const errorMessage = err?.response?.data?.message || err.message;
            alertaSubmit(false, errorMessage);
            setIsLoading(false);
        },
    });
}

export const lesionJugadores = (equipoId: string, jugadorId: string, lesionJugador, queryClient, lesion) => {
    alertaQuestion(equipoId, {}, (equipoId: string) => {
        const formData = {
            lesion: lesion,
        };
        lesionJugador({ form: formData, equipoId, jugadorId }, {
            onSuccess: (success) => {
                queryClient.invalidateQueries(["equipos"]);
                alertaSubmit(true, success?.message);
            },
            onError: (err: any) => {
                const errorMessage = err?.response?.data?.message || err.message;
                alertaSubmit(false, errorMessage);
            },
        });
    }, 'Si, Lesionar!', 'Jugador Lesionado!', 'El jugador ha sido lesionado.', 'El jugador no se lesiono :)')
}

export const lesionJugadoresNO = (equipoId: string, jugadorId: string, lesionJugador, queryClient, lesion) => {
    alertaQuestion(equipoId, {}, (equipoId: string) => {
        const formData = {
            lesion: lesion,
        };
        lesionJugador({ form: formData, equipoId, jugadorId }, {
            onSuccess: (success) => {
                queryClient.invalidateQueries(["equipos"]);
                alertaSubmit(true, success?.message);
            },
            onError: (err: any) => {
                const errorMessage = err?.response?.data?.message || err.message;
                alertaSubmit(false, errorMessage);
            },
        });
    }, 'Si, Recuperar!', 'Jugador Recuperado!', 'El jugador ha sido recuperado.', 'El jugador no se recupero :)')
}

export const editarJornada = (
    equipoId: string,
    jugadorId: string,
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
        jornadas_suspendido: partidoJornada + parseInt(value, 10),
    };
    editarPartidos({ form: formData, equipoId, jugadorId }, {
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

export const editarJornadaResta = (
    equipoId: string,
    jugadorId: string,
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
    editarPartidos({ form: formData, equipoId, jugadorId }, {
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

export const editarCapitan = (
    equipoId: string,
    jugadorId: string,
    jugador_name: string,
    setIsLoading,
    editarCapitan,
    queryClient,
    valueCapitan,
    handleClose,
) => {
    setIsLoading(true);
    const formData = {
        capitan: valueCapitan,
    };
    editarCapitan({ form: formData, equipoId, jugadorId }, {
        onSuccess: (success) => {
            queryClient.invalidateQueries(["equipos"]);
            alertaSubmit(true, `${jugador_name} es capitan!`);
            setIsLoading(false);
            handleClose()
        },
        onError: (err: any) => {
            const errorMessage = err?.response?.data?.message || err.message;
            alertaSubmit(false, errorMessage);
            setIsLoading(false);
        },
    });
};

export const editarCapitanNo = (
    equipoId: string,
    jugadorId: string,
    jugador_name: string,
    setIsLoading,
    editarCapitan,
    queryClient,
    valueCapitan,
    handleClose,
) => {
    setIsLoading(true);
    const formData = {
        capitan: valueCapitan,
    };
    editarCapitan({ form: formData, equipoId, jugadorId }, {
        onSuccess: (success) => {
            queryClient.invalidateQueries(["equipos"]);
            alertaSubmit(true, `${jugador_name} ya no es capitan!`);
            setIsLoading(false);
            handleClose()
        },
        onError: (err: any) => {
            const errorMessage = err?.response?.data?.message || err.message;
            alertaSubmit(false, errorMessage);
            setIsLoading(false);
        },
    });
};