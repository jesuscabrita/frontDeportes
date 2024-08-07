import { alertaQuestion, alertaSubmit } from "./alert";
import { filterEstado } from "./utils";

export const crearJugadores = (id: string, name: string, sueldo: any, contrato, posicion: string, fecha_nacimiento: string, nacionalidad: string, dorsal: string, instagram: string, foto: any, setIsLoading, crearJugador, queryClient, handleClose) => {
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

export const editarJugadores = (equipoId: string, jugadorId: string, name: string, sueldo: number, contrato, posicion: string, fecha_nacimiento: string, nacionalidad: string, dorsal: string, instagram: string, foto: string, setIsLoading, editarJugador, queryClient, handleClose) => {
    setIsLoading(true);
    const formData = { name, sueldo, contrato, posicion, fecha_nacimiento, nacionalidad, dorsal, instagram, foto };
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

export const editarValorMercado = (
    equipoId: string,
    jugadorId: string,
    setIsLoading,
    editarPartidos,
    queryClient,
    jugador,
    index
) => {
    setIsLoading(true);

    let partidos = jugador.partidos_individual[index];
    let clausula = jugador.clausula;
    let valor_mercado = jugador.valor_mercado;
    let gol = jugador.gol_partido_individual[index];
    let amarilla = jugador.amarilla_partido_individual[index];
    let roja = jugador.roja_partido_individual[index];
    let azul = jugador.azul_partido_individual[index];
    let asistencia = jugador.asistencia_partido_individual[index];
    let figura = jugador.jugador_figura_individual[index];
    let edad = jugador.edad;
    let capitan = jugador.capitan;
    let posicion = jugador.posicion;
    let sueldoCalculo = jugador.sueldoCalculo;
    let lesion = jugador.lesion;

    let clausulaAumento = 0;
    let clausulaDisminucion = 0;
    let valorMercadoAumento = 0;
    let sueldoCalculoAumento = 0;

    //SI TIENE MENOS DE 18 AÑOS
    if (partidos === 'Si' && edad < 18) {
        if (gol === 1 || asistencia === 1) {
            if (posicion === 'Delantero') {
                clausulaAumento = 0.01;
                valorMercadoAumento = 0.015;
                sueldoCalculoAumento = 0.01;
            } else if (posicion === 'Medio') {
                clausulaAumento = 0.01;
                valorMercadoAumento = 0.025;
                sueldoCalculoAumento = 0.015;
            } else if (posicion === 'Defensa') {
                clausulaAumento = 0.055;
                valorMercadoAumento = 0.085;
                sueldoCalculoAumento = 0.075;
            } else if (posicion === 'Portero') {
                clausulaAumento = 0.08;
                valorMercadoAumento = 0.08;
                sueldoCalculoAumento = 0.08;
            }
        } else if ((gol >= 2 && gol <= 4) || (asistencia >= 2 && asistencia <= 4)) {
            if (posicion === 'Delantero') {
                clausulaAumento = 0.02;
                valorMercadoAumento = 0.025;
                sueldoCalculoAumento = 0.036;
            } else if (posicion === 'Medio') {
                clausulaAumento = 0.02;
                valorMercadoAumento = 0.025;
                sueldoCalculoAumento = 0.045;
            } else if (posicion === 'Defensa') {
                clausulaAumento = 0.05;
                valorMercadoAumento = 0.07;
                sueldoCalculoAumento = 0.07;
            } else if (posicion === 'Portero') {
                clausulaAumento = 0.10;
                valorMercadoAumento = 0.15;
                sueldoCalculoAumento = 0.15;
            }
        } else if (gol >= 5 || asistencia >= 5) {
            if (posicion === 'Delantero') {
                clausulaAumento = 0.10;
                valorMercadoAumento = 0.15;
                sueldoCalculoAumento = 0.15;
            } else if (posicion === 'Medio') {
                clausulaAumento = 0.10;
                valorMercadoAumento = 0.20;
                sueldoCalculoAumento = 0.20;
            } else if (posicion === 'Defensa') {
                clausulaAumento = 0.20;
                valorMercadoAumento = 0.25;
                sueldoCalculoAumento = 0.25;
            } else if (posicion === 'Portero') {
                clausulaAumento = 0.20;
                valorMercadoAumento = 0.25;
                sueldoCalculoAumento = 0.25;
            }
        }
        if (amarilla === 1 || azul === 1) {
            valorMercadoAumento += 0.15;
            sueldoCalculoAumento += 0.15;
        }
        if (amarilla === 2 || roja === 1) {
            valorMercadoAumento += 0.35;
            sueldoCalculoAumento += 0.35;
        }
        if (figura === 1) {
            valorMercadoAumento += 0.05;
            sueldoCalculoAumento += 0.05;
            clausulaAumento += 0.05;
        }
        if ((capitan === 'Si' && figura === 1) || (capitan === 'Si' && asistencia >= 1) || (capitan === 'Si' && gol >= 1)) {
            valorMercadoAumento += 0.06;
            sueldoCalculoAumento += 0.06;
            clausulaAumento += 0.06;
        }
        //SI TIENE MENOS DE 20 AÑOS
    } else if (partidos === 'Si' && edad < 20) {
        if (gol === 1 || asistencia === 1) {
            if (posicion === 'Delantero') {
                clausulaAumento = 0.02;
                valorMercadoAumento = 0.03;
                sueldoCalculoAumento = 0.035;
            } else if (posicion === 'Medio') {
                clausulaAumento = 0.02;
                valorMercadoAumento = 0.035;
                sueldoCalculoAumento = 0.035;
            } else if (posicion === 'Defensa') {
                clausulaAumento = 0.03;
                valorMercadoAumento = 0.04;
                sueldoCalculoAumento = 0.04;
            } else if (posicion === 'Portero') {
                clausulaAumento = 0.25;
                valorMercadoAumento = 0.35;
                sueldoCalculoAumento = 0.35;
            }
        } else if ((gol >= 2 && gol <= 4) || (asistencia >= 2 && asistencia <= 4)) {
            if (posicion === 'Delantero') {
                clausulaAumento = 0.025;
                valorMercadoAumento = 0.035;
                sueldoCalculoAumento = 0.035;
            } else if (posicion === 'Medio') {
                clausulaAumento = 0.025;
                valorMercadoAumento = 0.035;
                sueldoCalculoAumento = 0.045;
            } else if (posicion === 'Defensa') {
                clausulaAumento = 0.04;
                valorMercadoAumento = 0.055;
                sueldoCalculoAumento = 0.055;
            } else if (posicion === 'Portero') {
                clausulaAumento = 0.25;
                valorMercadoAumento = 0.35;
                sueldoCalculoAumento = 0.35;
            }
        } else if (gol >= 5 || asistencia >= 5) {
            if (posicion === 'Delantero') {
                clausulaAumento = 0.03;
                valorMercadoAumento = 0.035;
                sueldoCalculoAumento = 0.035;
            } else if (posicion === 'Medio') {
                clausulaAumento = 0.03;
                valorMercadoAumento = 0.055;
                sueldoCalculoAumento = 0.065;
            } else if (posicion === 'Defensa') {
                clausulaAumento = 0.06;
                valorMercadoAumento = 0.075;
                sueldoCalculoAumento = 0.075;
            } else if (posicion === 'Portero') {
                clausulaAumento = 0.25;
                valorMercadoAumento = 0.35;
                sueldoCalculoAumento = 0.35;
            }
        }
        if (amarilla === 1 || azul === 1) {
            valorMercadoAumento += 0.15;
            sueldoCalculoAumento += 0.15;
        }
        if (amarilla === 2 || roja === 1) {
            valorMercadoAumento += 0.35;
            sueldoCalculoAumento += 0.35;
        }
        if (figura === 1) {
            valorMercadoAumento += 0.05;
            sueldoCalculoAumento += 0.05;
            clausulaAumento += 0.05;
        }
        if ((capitan === 'Si' && figura === 1) || (capitan === 'Si' && asistencia >= 1) || (capitan === 'Si' && gol >= 1)) {
            valorMercadoAumento += 0.06;
            sueldoCalculoAumento += 0.06;
            clausulaAumento += 0.06;
        }
        //SI TIENE MENOS DE 22 AÑOS
    } else if (partidos === 'Si' && edad < 22) {
        if (gol === 1 || asistencia === 1) {
            if (posicion === 'Delantero') {
                clausulaAumento = 0.03;
                valorMercadoAumento = 0.045;
                sueldoCalculoAumento = 0.045;
            } else if (posicion === 'Medio') {
                clausulaAumento = 0.03;
                valorMercadoAumento = 0.045;
                sueldoCalculoAumento = 0.055;
            } else if (posicion === 'Defensa') {
                clausulaAumento = 0.05;
                valorMercadoAumento = 0.08;
                sueldoCalculoAumento = 0.08;
            } else if (posicion === 'Portero') {
                clausulaAumento = 0.25;
                valorMercadoAumento = 0.35;
                sueldoCalculoAumento = 0.35;
            }
        } else if ((gol >= 2 && gol <= 4) || (asistencia >= 2 && asistencia <= 4)) {
            if (posicion === 'Delantero') {
                clausulaAumento = 0.035;
                valorMercadoAumento = 0.055;
                sueldoCalculoAumento = 0.55;
            } else if (posicion === 'Medio') {
                clausulaAumento = 0.035;
                valorMercadoAumento = 0.055;
                sueldoCalculoAumento = 0.065;
            } else if (posicion === 'Defensa') {
                clausulaAumento = 0.06;
                valorMercadoAumento = 0.09;
                sueldoCalculoAumento = 0.09;
            } else if (posicion === 'Portero') {
                clausulaAumento = 0.25;
                valorMercadoAumento = 0.35;
                sueldoCalculoAumento = 0.35;
            }
        } else if (gol >= 5 || asistencia >= 5) {
            if (posicion === 'Delantero') {
                clausulaAumento = 0.04;
                valorMercadoAumento = 0.075;
                sueldoCalculoAumento = 0.075;
            } else if (posicion === 'Medio') {
                clausulaAumento = 0.045;
                valorMercadoAumento = 0.085;
                sueldoCalculoAumento = 0.085;
            } else if (posicion === 'Defensa') {
                clausulaAumento = 0.08;
                valorMercadoAumento = 0.10;
                sueldoCalculoAumento = 0.10;
            } else if (posicion === 'Portero') {
                clausulaAumento = 0.25;
                valorMercadoAumento = 0.35;
                sueldoCalculoAumento = 0.35;
            }
        }
        if (amarilla === 1 || azul === 1) {
            valorMercadoAumento += 0.15;
            sueldoCalculoAumento += 0.15;
        }
        if (amarilla === 2 || roja === 1) {
            valorMercadoAumento += 0.35;
            sueldoCalculoAumento += 0.35;
        }
        if (figura === 1) {
            valorMercadoAumento += 0.05;
            sueldoCalculoAumento += 0.05;
            clausulaAumento += 0.05;
        }
        if ((capitan === 'Si' && figura === 1) || (capitan === 'Si' && asistencia >= 1) || (capitan === 'Si' && gol >= 1)) {
            valorMercadoAumento += 0.06;
            sueldoCalculoAumento += 0.06;
            clausulaAumento += 0.06;
        }
        //SI TIENE MENOS DE 24 AÑOS
    } else if (partidos === 'Si' && edad < 24) {
        if (gol === 1 || asistencia === 1) {
            if (posicion === 'Delantero') {
                clausulaAumento = 0.04;
                valorMercadoAumento = 0.065;
                sueldoCalculoAumento = 0.065;
            } else if (posicion === 'Medio') {
                clausulaAumento = 0.04;
                valorMercadoAumento = 0.065;
                sueldoCalculoAumento = 0.075;
            } else if (posicion === 'Defensa') {
                clausulaAumento = 0.8;
                valorMercadoAumento = 0.10;
                sueldoCalculoAumento = 0.10;
            } else if (posicion === 'Portero') {
                clausulaAumento = 0.25;
                valorMercadoAumento = 0.35;
                sueldoCalculoAumento = 0.35;
            }
        } else if ((gol >= 2 && gol <= 4) || (asistencia >= 2 && asistencia <= 4)) {
            if (posicion === 'Delantero') {
                clausulaAumento = 0.05;
                valorMercadoAumento = 0.085;
                sueldoCalculoAumento = 0.085;
            } else if (posicion === 'Medio') {
                clausulaAumento = 0.05;
                valorMercadoAumento = 0.085;
                sueldoCalculoAumento = 0.085;
            } else if (posicion === 'Defensa') {
                clausulaAumento = 0.10;
                valorMercadoAumento = 0.15;
                sueldoCalculoAumento = 0.15;
            } else if (posicion === 'Portero') {
                clausulaAumento = 0.25;
                valorMercadoAumento = 0.35;
                sueldoCalculoAumento = 0.35;
            }
        } else if (gol >= 5 || asistencia >= 5) {
            if (posicion === 'Delantero') {
                clausulaAumento = 0.06;
                valorMercadoAumento = 0.095;
                sueldoCalculoAumento = 0.095;
            } else if (posicion === 'Medio') {
                clausulaAumento = 0.06;
                valorMercadoAumento = 0.095;
                sueldoCalculoAumento = 0.10;
            } else if (posicion === 'Defensa') {
                clausulaAumento = 0.15;
                valorMercadoAumento = 0.20;
                sueldoCalculoAumento = 0.20;
            } else if (posicion === 'Portero') {
                clausulaAumento = 0.25;
                valorMercadoAumento = 0.35;
                sueldoCalculoAumento = 0.35;
            }
        }
        if (amarilla === 1 || azul === 1) {
            valorMercadoAumento += 0.15;
            sueldoCalculoAumento += 0.15;
        }
        if (amarilla === 2 || roja === 1) {
            valorMercadoAumento += 0.35;
            sueldoCalculoAumento += 0.35;
        }
        if (figura === 1) {
            valorMercadoAumento += 0.05;
            sueldoCalculoAumento += 0.05;
            clausulaAumento += 0.05;
        }
        if ((capitan === 'Si' && figura === 1) || (capitan === 'Si' && asistencia >= 1) || (capitan === 'Si' && gol >= 1)) {
            valorMercadoAumento += 0.06;
            sueldoCalculoAumento += 0.06;
            clausulaAumento += 0.06;
        }
        //SI TIENE MENOS DE 26 AÑOS
    } else if (partidos === 'Si' && edad < 26) {
        if (gol === 1 || asistencia === 1) {
            if (posicion === 'Delantero') {
                clausulaAumento = 0.05;
                valorMercadoAumento = 0.08;
                sueldoCalculoAumento = 0.08;
            } else if (posicion === 'Medio') {
                clausulaAumento = 0.05;
                valorMercadoAumento = 0.08;
                sueldoCalculoAumento = 0.085;
            } else if (posicion === 'Defensa') {
                clausulaAumento = 0.06;
                valorMercadoAumento = 0.09;
                sueldoCalculoAumento = 0.09;
            } else if (posicion === 'Portero') {
                clausulaAumento = 0.25;
                valorMercadoAumento = 0.35;
                sueldoCalculoAumento = 0.35;
            }
        } else if ((gol >= 2 && gol <= 4) || (asistencia >= 2 && asistencia <= 4)) {
            if (posicion === 'Delantero') {
                clausulaAumento = 0.06;
                valorMercadoAumento = 0.095;
                sueldoCalculoAumento = 0.095;
            } else if (posicion === 'Medio') {
                clausulaAumento = 0.06;
                valorMercadoAumento = 0.095;
                sueldoCalculoAumento = 0.10;
            } else if (posicion === 'Defensa') {
                clausulaAumento = 0.09;
                valorMercadoAumento = 0.10;
                sueldoCalculoAumento = 0.10;
            } else if (posicion === 'Portero') {
                clausulaAumento = 0.25;
                valorMercadoAumento = 0.35;
                sueldoCalculoAumento = 0.35;
            }
        } else if (gol >= 5 || asistencia >= 5) {
            if (posicion === 'Delantero') {
                clausulaAumento = 0.07;
                valorMercadoAumento = 0.10;
                sueldoCalculoAumento = 0.10;
            } else if (posicion === 'Medio') {
                clausulaAumento = 0.07;
                valorMercadoAumento = 0.10;
                sueldoCalculoAumento = 0.10;
            } else if (posicion === 'Defensa') {
                clausulaAumento = 0.8;
                valorMercadoAumento = 0.15;
                sueldoCalculoAumento = 0.15;
            } else if (posicion === 'Portero') {
                clausulaAumento = 0.25;
                valorMercadoAumento = 0.35;
                sueldoCalculoAumento = 0.35;
            }
        }
        if (amarilla === 1 || azul === 1) {
            valorMercadoAumento += 0.15;
            sueldoCalculoAumento += 0.15;
        }
        if (amarilla === 2 || roja === 1) {
            valorMercadoAumento += 0.35;
            sueldoCalculoAumento += 0.35;
        }
        if (figura === 1) {
            valorMercadoAumento += 0.05;
            sueldoCalculoAumento += 0.05;
            clausulaAumento += 0.05;
        }
        if ((capitan === 'Si' && figura === 1) || (capitan === 'Si' && asistencia >= 1) || (capitan === 'Si' && gol >= 1)) {
            valorMercadoAumento += 0.06;
            sueldoCalculoAumento += 0.06;
            clausulaAumento += 0.06;
        }
        //SI TIENE MENOS DE 28 AÑOS
    } else if (partidos === 'Si' && edad < 28) {
        if (gol === 1 || asistencia === 1) {
            if (posicion === 'Delantero') {
                clausulaAumento = 0.06;
                valorMercadoAumento = 0.099;
                sueldoCalculoAumento = 0.099;
            } else if (posicion === 'Medio') {
                clausulaAumento = 0.06;
                valorMercadoAumento = 0.099;
                sueldoCalculoAumento = 0.15;
            } else if (posicion === 'Defensa') {
                clausulaAumento = 0.07;
                valorMercadoAumento = 0.10;
                sueldoCalculoAumento = 0.10;
            } else if (posicion === 'Portero') {
                clausulaAumento = 0.25;
                valorMercadoAumento = 0.35;
                sueldoCalculoAumento = 0.35;
            }
        } else if ((gol >= 2 && gol <= 4) || (asistencia >= 2 && asistencia <= 4)) {
            if (posicion === 'Delantero') {
                clausulaAumento = 0.07;
                valorMercadoAumento = 0.10;
                sueldoCalculoAumento = 0.10;
            } else if (posicion === 'Medio') {
                clausulaAumento = 0.07;
                valorMercadoAumento = 0.10;
                sueldoCalculoAumento = 0.10;
            } else if (posicion === 'Defensa') {
                clausulaAumento = 0.08;
                valorMercadoAumento = 0.15;
                sueldoCalculoAumento = 0.15;
            } else if (posicion === 'Portero') {
                clausulaAumento = 0.25;
                valorMercadoAumento = 0.35;
                sueldoCalculoAumento = 0.35;
            }
        } else if (gol >= 5 || asistencia >= 5) {
            if (posicion === 'Delantero') {
                clausulaAumento = 0.08;
                valorMercadoAumento = 0.15;
                sueldoCalculoAumento = 0.15;
            } else if (posicion === 'Medio') {
                clausulaAumento = 0.08;
                valorMercadoAumento = 0.15;
                sueldoCalculoAumento = 0.15;
            } else if (posicion === 'Defensa') {
                clausulaAumento = 0.09;
                valorMercadoAumento = 0.18;
                sueldoCalculoAumento = 0.18;
            } else if (posicion === 'Portero') {
                clausulaAumento = 0.25;
                valorMercadoAumento = 0.35;
                sueldoCalculoAumento = 0.35;
            }
        }
        if (amarilla === 1 || azul === 1) {
            valorMercadoAumento += 0.15;
            sueldoCalculoAumento += 0.15;
        }
        if (amarilla === 2 || roja === 1) {
            valorMercadoAumento += 0.35;
            sueldoCalculoAumento += 0.35;
        }
        if (figura === 1) {
            valorMercadoAumento += 0.05;
            sueldoCalculoAumento += 0.05;
            clausulaAumento += 0.05;
        }
        if ((capitan === 'Si' && figura === 1) || (capitan === 'Si' && asistencia >= 1) || (capitan === 'Si' && gol >= 1)) {
            valorMercadoAumento += 0.06;
            sueldoCalculoAumento += 0.06;
            clausulaAumento += 0.06;
        }
        //SI TIENE MENOS DE 30 AÑOS
    } else if (partidos === 'Si' && edad < 30) {
        if (gol === 1 || asistencia === 1) {
            if (posicion === 'Delantero') {
                clausulaAumento = 0.07;
                valorMercadoAumento = 0.15;
                sueldoCalculoAumento = 0.15;
            } else if (posicion === 'Medio') {
                clausulaAumento = 0.07;
                valorMercadoAumento = 0.015;
                sueldoCalculoAumento = 0.20;
            } else if (posicion === 'Defensa') {
                clausulaAumento = 0.08;
                valorMercadoAumento = 0.20;
                sueldoCalculoAumento = 0.20;
            } else if (posicion === 'Portero') {
                clausulaAumento = 0.25;
                valorMercadoAumento = 0.35;
                sueldoCalculoAumento = 0.35;
            }
        } else if ((gol >= 2 && gol <= 4) || (asistencia >= 2 && asistencia <= 4)) {
            if (posicion === 'Delantero') {
                clausulaAumento = 0.08;
                valorMercadoAumento = 0.20;
                sueldoCalculoAumento = 0.20;
            } else if (posicion === 'Medio') {
                clausulaAumento = 0.08;
                valorMercadoAumento = 0.20;
                sueldoCalculoAumento = 0.25;
            } else if (posicion === 'Defensa') {
                clausulaAumento = 0.09;
                valorMercadoAumento = 0.25;
                sueldoCalculoAumento = 0.25;
            } else if (posicion === 'Portero') {
                clausulaAumento = 0.25;
                valorMercadoAumento = 0.35;
                sueldoCalculoAumento = 0.35;
            }
        } else if (gol >= 5 || asistencia >= 5) {
            if (posicion === 'Delantero') {
                clausulaAumento = 0.09;
                valorMercadoAumento = 0.25;
                sueldoCalculoAumento = 0.25;
            } else if (posicion === 'Medio') {
                clausulaAumento = 0.09;
                valorMercadoAumento = 0.25;
                sueldoCalculoAumento = 0.30;
            } else if (posicion === 'Defensa') {
                clausulaAumento = 0.10;
                valorMercadoAumento = 0.35;
                sueldoCalculoAumento = 0.35;
            } else if (posicion === 'Portero') {
                clausulaAumento = 0.25;
                valorMercadoAumento = 0.35;
                sueldoCalculoAumento = 0.35;
            }
        }
        if (amarilla === 1 || azul === 1) {
            valorMercadoAumento += 0.15;
            sueldoCalculoAumento += 0.15;
        }
        if (amarilla === 2 || roja === 1) {
            valorMercadoAumento += 0.35;
            sueldoCalculoAumento += 0.35;
        }
        if (figura === 1) {
            valorMercadoAumento += 0.05;
            sueldoCalculoAumento += 0.05;
            clausulaAumento += 0.05;
        }
        if ((capitan === 'Si' && figura === 1) || (capitan === 'Si' && asistencia >= 1) || (capitan === 'Si' && gol >= 1)) {
            valorMercadoAumento += 0.06;
            sueldoCalculoAumento += 0.06;
            clausulaAumento += 0.06;
        }
        //SI TIENE MENOS DE 32 AÑOS
    } else if (partidos === 'Si' && edad < 32) {
        if (gol === 1 || asistencia === 1) {
            if (posicion === 'Delantero') {
                clausulaAumento = 0.06;
                valorMercadoAumento = 0.010;
                sueldoCalculoAumento = 0.010;
            } else if (posicion === 'Medio') {
                clausulaAumento = 0.06;
                valorMercadoAumento = 0.010;
                sueldoCalculoAumento = 0.015;
            } else if (posicion === 'Defensa') {
                clausulaAumento = 0.07;
                valorMercadoAumento = 0.15;
                sueldoCalculoAumento = 0.15;
            } else if (posicion === 'Portero') {
                clausulaAumento = 0.25;
                valorMercadoAumento = 0.35;
                sueldoCalculoAumento = 0.35;
            }
        } else if ((gol >= 2 && gol <= 4) || (asistencia >= 2 && asistencia <= 4)) {
            if (posicion === 'Delantero') {
                clausulaAumento = 0.07;
                valorMercadoAumento = 0.15;
                sueldoCalculoAumento = 0.15;
            } else if (posicion === 'Medio') {
                clausulaAumento = 0.07;
                valorMercadoAumento = 0.15;
                sueldoCalculoAumento = 0.15;
            } else if (posicion === 'Defensa') {
                clausulaAumento = 0.08;
                valorMercadoAumento = 0.20;
                sueldoCalculoAumento = 0.20;
            } else if (posicion === 'Portero') {
                clausulaAumento = 0.25;
                valorMercadoAumento = 0.35;
                sueldoCalculoAumento = 0.35;
            }
        } else if (gol >= 5 || asistencia >= 5) {
            if (posicion === 'Delantero') {
                clausulaAumento = 0.08;
                valorMercadoAumento = 0.20;
                sueldoCalculoAumento = 0.20;
            } else if (posicion === 'Medio') {
                clausulaAumento = 0.08;
                valorMercadoAumento = 0.20;
                sueldoCalculoAumento = 0.25;
            } else if (posicion === 'Defensa') {
                clausulaAumento = 0.09;
                valorMercadoAumento = 0.25;
                sueldoCalculoAumento = 0.25;
            } else if (posicion === 'Portero') {
                clausulaAumento = 0.25;
                valorMercadoAumento = 0.35;
                sueldoCalculoAumento = 0.35;
            }
        }
        if (amarilla === 1 || azul === 1) {
            valorMercadoAumento += 0.15;
            sueldoCalculoAumento += 0.15;
        }
        if (amarilla === 2 || roja === 1) {
            valorMercadoAumento += 0.35;
            sueldoCalculoAumento += 0.35;
        }
        if (figura === 1) {
            valorMercadoAumento += 0.05;
            sueldoCalculoAumento += 0.05;
            clausulaAumento += 0.05;
        }
        if ((capitan === 'Si' && figura === 1) || (capitan === 'Si' && asistencia >= 1) || (capitan === 'Si' && gol >= 1)) {
            valorMercadoAumento += 0.06;
            sueldoCalculoAumento += 0.06;
            clausulaAumento += 0.06;
        }
        //SI TIENE MENOS DE 34 AÑOS
    } else if (partidos === 'Si' && edad < 34) {
        if (gol === 1 || asistencia === 1) {
            if (posicion === 'Delantero') {
                clausulaAumento = 0.05;
                valorMercadoAumento = 0.095;
                sueldoCalculoAumento = 0.095;
            } else if (posicion === 'Medio') {
                clausulaAumento = 0.05;
                valorMercadoAumento = 0.095;
                sueldoCalculoAumento = 0.10;
            } else if (posicion === 'Defensa') {
                clausulaAumento = 0.06;
                valorMercadoAumento = 0.15;
                sueldoCalculoAumento = 0.15;
            } else if (posicion === 'Portero') {
                clausulaAumento = 0.25;
                valorMercadoAumento = 0.35;
                sueldoCalculoAumento = 0.35;
            }
        } else if ((gol >= 2 && gol <= 4) || (asistencia >= 2 && asistencia <= 4)) {
            if (posicion === 'Delantero') {
                clausulaAumento = 0.06;
                valorMercadoAumento = 0.12;
                sueldoCalculoAumento = 0.12;
            } else if (posicion === 'Medio') {
                clausulaAumento = 0.06;
                valorMercadoAumento = 0.15;
                sueldoCalculoAumento = 0.15;
            } else if (posicion === 'Defensa') {
                clausulaAumento = 0.07;
                valorMercadoAumento = 0.18;
                sueldoCalculoAumento = 0.18;
            } else if (posicion === 'Portero') {
                clausulaAumento = 0.25;
                valorMercadoAumento = 0.35;
                sueldoCalculoAumento = 0.35;
            }
        } else if (gol >= 5 || asistencia >= 5) {
            if (posicion === 'Delantero') {
                clausulaAumento = 0.07;
                valorMercadoAumento = 0.20;
                sueldoCalculoAumento = 0.20;
            } else if (posicion === 'Medio') {
                clausulaAumento = 0.07;
                valorMercadoAumento = 0.20;
                sueldoCalculoAumento = 0.25;
            } else if (posicion === 'Defensa') {
                clausulaAumento = 0.08;
                valorMercadoAumento = 0.25;
                sueldoCalculoAumento = 0.25;
            } else if (posicion === 'Portero') {
                clausulaAumento = 0.25;
                valorMercadoAumento = 0.35;
                sueldoCalculoAumento = 0.35;
            }
        }
        if (amarilla === 1 || azul === 1) {
            valorMercadoAumento += 0.15;
            sueldoCalculoAumento += 0.15;
        }
        if (amarilla === 2 || roja === 1) {
            valorMercadoAumento += 0.35;
            sueldoCalculoAumento += 0.35;
        }
        if (figura === 1) {
            valorMercadoAumento += 0.05;
            sueldoCalculoAumento += 0.05;
            clausulaAumento += 0.05;
        }
        if ((capitan === 'Si' && figura === 1) || (capitan === 'Si' && asistencia >= 1) || (capitan === 'Si' && gol >= 1)) {
            valorMercadoAumento += 0.06;
            sueldoCalculoAumento += 0.06;
            clausulaAumento += 0.06;
        }
        //SI TIENE MENOS DE 36 AÑOS
    } else if (partidos === 'Si' && edad < 36) {
        if (gol === 1 || asistencia === 1) {
            clausulaAumento = 0.05;
            valorMercadoAumento = 0.085;
            sueldoCalculoAumento = 0.085;
        } else if ((gol >= 2 && gol <= 4) || (asistencia >= 2 && asistencia <= 4)) {
            clausulaAumento = 0.06;
            valorMercadoAumento = 0.085;
            sueldoCalculoAumento = 0.085;
        } else if (gol >= 5 || asistencia >= 5) {
            clausulaAumento = 0.07;
            valorMercadoAumento = 0.10;
            sueldoCalculoAumento = 0.10;
        }
        if (amarilla === 1 || azul === 1) {
            valorMercadoAumento += 0.15;
            sueldoCalculoAumento += 0.15;
        }
        if (amarilla === 2 || roja === 1) {
            valorMercadoAumento += 0.35;
            sueldoCalculoAumento += 0.35;
        }
        if (figura === 1) {
            valorMercadoAumento += 0.05;
            sueldoCalculoAumento += 0.05;
            clausulaAumento += 0.05;
        }
        if ((capitan === 'Si' && figura === 1) || (capitan === 'Si' && asistencia >= 1) || (capitan === 'Si' && gol >= 1)) {
            valorMercadoAumento += 0.06;
            sueldoCalculoAumento += 0.06;
            clausulaAumento += 0.06;
        }
        //SI TIENE MENOS DE 38 AÑOS
    } else if (partidos === 'Si' && edad < 38) {
        if (gol === 1 || asistencia === 1) {
            clausulaAumento = 0.04;
            valorMercadoAumento = 0.075;
            sueldoCalculoAumento = 0.075;
        } else if ((gol >= 2 && gol <= 4) || (asistencia >= 2 && asistencia <= 4)) {
            clausulaAumento = 0.06;
            valorMercadoAumento = 0.095;
            sueldoCalculoAumento = 0.095;
        } else if (gol >= 5 || asistencia >= 5) {
            clausulaAumento = 0.07;
            valorMercadoAumento = 0.10;
            sueldoCalculoAumento = 0.10;
        }
        if (amarilla === 1 || azul === 1) {
            valorMercadoAumento += 0.15;
            sueldoCalculoAumento += 0.15;
        }
        if (amarilla === 2 || roja === 1) {
            valorMercadoAumento += 0.35;
            sueldoCalculoAumento += 0.35;
        }
        if (figura === 1) {
            valorMercadoAumento += 0.05;
            sueldoCalculoAumento += 0.05;
            clausulaAumento += 0.05;
        }
        if ((capitan === 'Si' && figura === 1) || (capitan === 'Si' && asistencia >= 1) || (capitan === 'Si' && gol >= 1)) {
            valorMercadoAumento += 0.06;
            sueldoCalculoAumento += 0.06;
            clausulaAumento += 0.06;
        }
        //SI TIENE MENOS DE 40 AÑOS
    } else if (partidos === 'Si' && edad < 40) {
        if (gol === 1 || asistencia === 1) {
            clausulaAumento = 0.03;
            valorMercadoAumento = 0.065;
            sueldoCalculoAumento = 0.065;
        } else if ((gol >= 2 && gol <= 4) || (asistencia >= 2 && asistencia <= 4)) {
            clausulaAumento = 0.04;
            valorMercadoAumento = 0.075;
            sueldoCalculoAumento = 0.075;
        } else if (gol >= 5 || asistencia >= 5) {
            clausulaAumento = 0.05;
            valorMercadoAumento = 0.095;
            sueldoCalculoAumento = 0.095;
        }
        if (amarilla === 1 || azul === 1) {
            valorMercadoAumento += 0.15;
            sueldoCalculoAumento += 0.15;
        }
        if (amarilla === 2 || roja === 1) {
            valorMercadoAumento += 0.35;
            sueldoCalculoAumento += 0.35;
        }
        if (figura === 1) {
            valorMercadoAumento += 0.05;
            sueldoCalculoAumento += 0.05;
            clausulaAumento += 0.05;
        }
        if ((capitan === 'Si' && figura === 1) || (capitan === 'Si' && asistencia >= 1) || (capitan === 'Si' && gol >= 1)) {
            valorMercadoAumento += 0.06;
            sueldoCalculoAumento += 0.06;
            clausulaAumento += 0.06;
        }
    } else {
        clausulaAumento = 0;
        valorMercadoAumento = 0;
        sueldoCalculoAumento = 0;
    }

    if (partidos === 'No' && edad < 18) {
        if (lesion === 'No') {
            clausulaDisminucion = 0.10;
        } else if (lesion === 'Si') {
            clausulaDisminucion = 0;
        }
    } else if (partidos === 'No' && edad < 20) {
        if (lesion === 'No') {
            clausulaDisminucion = 0.10;
        } else if (lesion === 'Si') {
            clausulaDisminucion = 0;
        }
    } else if (partidos === 'No' && edad < 22) {
        if (lesion === 'No') {
            clausulaDisminucion = 0.095;
        } else if (lesion === 'Si') {
            clausulaDisminucion = 0;
        }
    } else if (partidos === 'No' && edad < 24) {
        if (lesion === 'No') {
            clausulaDisminucion = 0.09;
        } else if (lesion === 'Si') {
            clausulaDisminucion = 0;
        }
    } else if (partidos === 'No' && edad < 26) {
        if (lesion === 'No') {
            clausulaDisminucion = 0.085;
        } else if (lesion === 'Si') {
            clausulaDisminucion = 0;
        }
    } else if (partidos === 'No' && edad < 28) {
        if (lesion === 'No') {
            clausulaDisminucion = 0.08;
        } else if (lesion === 'Si') {
            clausulaDisminucion = 0;
        }
    } else if (partidos === 'No' && edad < 30) {
        if (lesion === 'No') {
            clausulaDisminucion = 0.075;
        } else if (lesion === 'Si') {
            clausulaDisminucion = 0;
        }
    } else if (partidos === 'No' && edad < 32) {
        if (lesion === 'No') {
            clausulaDisminucion = 0.07;
        } else if (lesion === 'Si') {
            clausulaDisminucion = 0;
        }
    } else if (partidos === 'No' && edad < 34) {
        if (lesion === 'No') {
            clausulaDisminucion = 0.065;
        } else if (lesion === 'Si') {
            clausulaDisminucion = 0;
        }
    } else if (partidos === 'No' && edad < 36) {
        if (lesion === 'No') {
            clausulaDisminucion = 0.06;
        } else if (lesion === 'Si') {
            clausulaDisminucion = 0;
        }
    } else if (partidos === 'No' && edad < 38) {
        if (lesion === 'No') {
            clausulaDisminucion = 0.055;
        } else if (lesion === 'Si') {
            clausulaDisminucion = 0;
        }
    } else if (partidos === 'No' && edad < 40) {
        if (lesion === 'No') {
            clausulaDisminucion = 0.05;
        } else if (lesion === 'Si') {
            clausulaDisminucion = 0;
        }
    } else {
        clausulaDisminucion = 0;
    }

    const nuevaClausula = partidos === 'Si' ? clausula * (1 + clausulaAumento) : clausula * (1 - clausulaDisminucion);
    const clausulaRedondeada = Math.round(nuevaClausula);

    const nuevaMercadoValor = (roja === 1 || amarilla >= 1) ? valor_mercado * (1 - valorMercadoAumento) : valor_mercado * (1 + valorMercadoAumento);
    const MercadoRedondeado = Math.round(nuevaMercadoValor);

    const nuevaCalculoAumento = (roja === 1 || amarilla >= 1) ? sueldoCalculo * (1 - sueldoCalculoAumento) : sueldoCalculo * (1 + sueldoCalculoAumento)
    const CalculoAumentoRedondeado = Math.round(nuevaCalculoAumento);


    const formData = {
        sueldoCalculo: CalculoAumentoRedondeado,
        valor_mercado: MercadoRedondeado,
        clausula: clausulaRedondeada,
    }

    editarPartidos({ form: formData, equipoId, jugadorId }, {
        onSuccess: (success) => {
            queryClient.invalidateQueries(["equipos"]);
            alertaSubmit(true, `Se modificaron jugadores su valor en el mercado!`);
            setIsLoading(false);
        },
        onError: (err: any) => {
            const errorMessage = err?.response?.data?.message || err.message;
            alertaSubmit(false, errorMessage);
            setIsLoading(false);
        },
    });
};

export const editarRenovacion = (
    equipoId: string,
    jugadorId: string,
    setIsLoading,
    editarRenovacion,
    queryClient,
    handleClose,
    contrato,
    sueldo
) => {
    setIsLoading(true);
    const formData = {
        contrato: contrato,
        sueldo: sueldo,
    };
    editarRenovacion({ form: formData, equipoId, jugadorId }, {
        onSuccess: (success) => {
            queryClient.invalidateQueries(["equipos"]);
            alertaSubmit(true, success?.message);
            setIsLoading(false);
            handleClose();
        },
        onError: (err: any) => {
            const errorMessage = err?.response?.data?.message || err.message;
            alertaSubmit(false, errorMessage);
            setIsLoading(false);
        },
    });
};

export const listaDeTransferiblesSi = (equipoId: string, jugadorId: string, listaTransferibles, queryClient, transferible) => {
    alertaQuestion(equipoId, {}, (equipoId: string) => {
        const formData = {
            transferible: transferible,
        };
        listaTransferibles({ form: formData, equipoId, jugadorId }, {
            onSuccess: (success) => {
                queryClient.invalidateQueries(["equipos"]);
                alertaSubmit(true, success?.message);
            },
            onError: (err: any) => {
                const errorMessage = err?.response?.data?.message || err.message;
                alertaSubmit(false, errorMessage);
            },
        });
    }, 'Si, Mover a lista de transferibles!', 'Jugador en lista de transferibles!', 'El jugador ha sido movido a la lista de transferibles', 'El jugador no se movio a la lista de trnasferibles :)')
}

export const listaDeTransferiblesNo = (equipoId: string, jugadorId: string, listaTransferibles, queryClient, transferible) => {
    alertaQuestion(equipoId, {}, (equipoId: string) => {
        const formData = {
            transferible: transferible,
        };
        listaTransferibles({ form: formData, equipoId, jugadorId }, {
            onSuccess: (success) => {
                queryClient.invalidateQueries(["equipos"]);
                alertaSubmit(true, 'El jugador fue movido de la lista de transferibles');
            },
            onError: (err: any) => {
                const errorMessage = err?.response?.data?.message || err.message;
                alertaSubmit(false, errorMessage);
            },
        });
    }, 'Si, Mover de lista de transferibles!', 'Jugador en lista de transferibles!', 'El jugador ha sido movido a la lista de transferibles', 'El jugador no se movio de la lista de transferibles :)')
}

export const RecindirJugador = (equipoId: string, jugadorId: string, recindirContrato, queryClient, libre, setIsLoading, handleClose) => {
    setIsLoading(true);
    const formData = {
        libre: libre,
    };
    recindirContrato({ form: formData, equipoId, jugadorId }, {
        onSuccess: (success) => {
            queryClient.invalidateQueries(["equipos"]);
            alertaSubmit(true, success?.message);
            handleClose()
        },
        onError: (err: any) => {
            const errorMessage = err?.response?.data?.message || err.message;
            alertaSubmit(false, errorMessage);
        },
    });
}

export const InscribirJugador = (equipoId: string, jugadorId: string, inscribir, queryClient, inscrito, setIsLoading) => {
    setIsLoading(true);
    const formData = {
        inscrito: inscrito,
    };
    inscribir({ form: formData, equipoId, jugadorId }, {
        onSuccess: (success) => {
            queryClient.invalidateQueries(["equipos"]);
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

export const DorsalJugador = (equipoId: string, jugadorId: string, EditDorsal, queryClient, dorsal, setIsLoading, handleClose) => {
    setIsLoading(true);
    const formData = {
        dorsal: dorsal,
    };
    EditDorsal({ form: formData, equipoId, jugadorId }, {
        onSuccess: (success) => {
            queryClient.invalidateQueries(["equipos"]);
            alertaSubmit(true, success?.message);
            handleClose()
            setIsLoading(false);
        },
        onError: (err: any) => {
            const errorMessage = err?.response?.data?.message || err.message;
            alertaSubmit(false, errorMessage);
            setIsLoading(false);
        },
    });
}

//OFERTAS

export const crearOferta = (
    equipoId: string,
    jugadorId,
    equipo: string,
    logo: number,
    precio,
    contrato: string,
    tipo: string,
    sueldo: any,
    setIsLoading,
    oferta,
    queryClient,
    handleClose,
    comentario,
    respuesta,
    email,
    id_equipo_destino
) => {
    setIsLoading(true);
    const formData = { equipo, logo, precio, contrato, tipo, sueldo, comentario, respuesta, email, id_equipo_destino };
    oferta({ form: formData, equipoId, jugadorId }, {
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

export const editOfertaJugador = (
    equipoId: string,
    jugadorId: string,
    ofertaId,
    editOferta,
    queryClient,
    respuesta,
    setIsLoading,
    handleClose,
    message
) => {
    setIsLoading(true);
    const formData = {
        respuesta: respuesta,
    };
    editOferta({ form: formData, equipoId, jugadorId, ofertaId }, {
        onSuccess: (success) => {
            queryClient.invalidateQueries(["equipos"]);
            alertaSubmit(true, message);
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

export const editOfertaNegociacion = (
    equipoId: string,
    jugadorId: string,
    ofertaId,
    editOferta,
    queryClient,
    respuesta,
    setIsLoading,
    handleClose,
    message,
    precio,
    contrato,
    comentario,
    equipo,
    logo
) => {
    setIsLoading(true);
    const formData = {
        respuesta: respuesta,
        precio: precio,
        contrato: contrato,
        comentario: comentario,
        equipo: equipo,
        logo: logo,
    };
    editOferta({ form: formData, equipoId, jugadorId, ofertaId }, {
        onSuccess: (success) => {
            queryClient.invalidateQueries(["equipos"]);
            alertaSubmit(true, message);
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

export const eliminarOfertas = (equipoId: string, jugadorId: string, ofertaId, deleteOfertas, queryClient, setIsLoading, handleClose) => {
    setIsLoading(true);
    deleteOfertas({ equipoId, jugadorId, ofertaId }, {
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

export const fichaDeJugador = (equipoOrigenId: string, equipoDestinoId, jugadorId: string, ficha, queryClient, setIsLoading, handleClose, precioOferta, banco_fondo, sueldo, contrato) => {
    setIsLoading(true);
    if (precioOferta > banco_fondo) {
        alertaSubmit(false, 'No cuentas con dinero suficiente, debes ingresar mas dinero a u banco del equipo');
    }

    const form = {
        precio: precioOferta,
        contrato: contrato,
        sueldo: sueldo,
    };
    ficha({ form, equipoOrigenId, equipoDestinoId, jugadorId }, {
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

export const prestamoDeJugador = (equipoOrigenId: string, equipoDestinoId, jugadorId: string, prestamo, queryClient, setIsLoading, handleClose) => {
    setIsLoading(true);
    const form = {};
    prestamo({ form, equipoOrigenId, equipoDestinoId, jugadorId }, {
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

export const devolverJugador = (data, devolver, queryClient, setIsLoading) => {
    alertaQuestion("", {}, () => {
        setIsLoading(true);
        const form = {};

        filterEstado(data, 'registrado').forEach(equiposdata => {
            equiposdata.jugadores.forEach(jugador => {
                devolver({ form, equipoOrigenId: equiposdata._id, jugadorId: jugador._id }, {
                    onSuccess: (success) => {
                        queryClient.invalidateQueries(["equipos"]);
                        alertaSubmit(true, success?.message);
                        setIsLoading(false);
                    },
                    onError: (err: any) => {
                        const errorMessage = err?.response?.data?.message || err.message;
                        alertaSubmit(false, errorMessage);
                        setIsLoading(false);
                    },
                });
            });
        });
    }, 'Si, Devolver!', 'Devolver jugadores', '¡Los jugadores volvieron a sus equipos correctamente!', 'Los jugadores no volvieron');
}

export const calculoContratosJugadores = (data, calculo, queryClient, setIsLoading) => {
    alertaQuestion("", {}, () => {
        setIsLoading(true);
        const form = {};

        filterEstado(data, 'registrado').forEach(equiposdata => {
            equiposdata.jugadores.forEach(jugador => {
                calculo({ form, equipoId: equiposdata._id, jugadorId: jugador._id }, {
                    onSuccess: (success) => {
                        queryClient.invalidateQueries(["equipos"]);
                        alertaSubmit(true, success?.message);
                        setIsLoading(false);
                    },
                    onError: (err: any) => {
                        const errorMessage = err?.response?.data?.message || err.message;
                        alertaSubmit(false, errorMessage);
                        setIsLoading(false);
                    },
                });
            });
        });
    }, 'Si, analizar contratos!', 'Analizar contratos', '¡Los contratos fueron actualizados correctamente!', 'Los contratos quedan igual');
}