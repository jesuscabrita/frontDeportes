export const filterEstado = (array, estado) => {
    const newFilter = array.filter(data => data.estado == estado);
    return newFilter;
}

export const filterLibreJugador = (array, estado) => {
    const newFilter = array.filter(data => data.libre == estado);
    return newFilter;
}

export const status = (hoy, fechaFinalPartido, tiempoRestante, TIEMPO_PARTIDO) => {
    if (hoy.diff(fechaFinalPartido, 'days') === 0) {
        const enVivo = tiempoRestante <= TIEMPO_PARTIDO && tiempoRestante > 0
        if (enVivo) {
            return 'enVivo'
        } else if (tiempoRestante <= 0) {
            return 'finPartido'
        } else {
            return 'agendar'
        }
    } else if (hoy.diff(fechaFinalPartido, 'days') < 0) {
        return 'noEmpezado'
    }
    else if (!hoy.diff(fechaFinalPartido, 'days')) {
        return 'fechaInvalida'
    } else {
        return 'finPartido'
    }
}

export const handleNextRound = (setCurrentRound, currentRound) => {
    setCurrentRound(currentRound + 1);
}

export const handlePrevRound = (setCurrentRound, currentRound) => {
    setCurrentRound(currentRound - 1);
}

export const ordenPosition = (data) => {
    const orden = [...data].sort((a, b) => {
        if (a.puntos > b.puntos) {
            return -1;
        } else if (a.puntos < b.puntos) {
            return 1;
        } else if (a.diferencia_de_Goles > b.diferencia_de_Goles) {
            return -1;
        } else if (a.diferencia_de_Goles < b.diferencia_de_Goles) {
            return 1;
        } else if (a.tarjetasAmarillas < b.tarjetasAmarillas) {
            return -1;
        } else if (a.tarjetasAmarillas > b.tarjetasAmarillas) {
            return 1;
        } else {
            return 0;
        }
    });

    return orden;
};

export const getLast5ToShow = (row, maxCount) => {
    let last5ToShow = [];
    let neutralCount = 0;

    for (let i = row.last5.length - 1; i >= 0; i--) {
        if (row.last5[i] === "neutral") {
            if (neutralCount === 0) {
                last5ToShow = [];
            } else {
                break;
            }
        } else {
            last5ToShow.unshift(row.last5[i]);
            neutralCount++;
            if (neutralCount === maxCount) {
                break;
            }
        }
    }

    while (last5ToShow.length < maxCount) {
        last5ToShow.unshift("neutral");
    }

    return last5ToShow;
}

export const jugadoresLibres = (data, cantidad) => {
    return data
        .flatMap((equipo) => equipo.jugadores)
        .filter((jugador) => jugador.libre === "Si")
        .slice(0, cantidad);
};

export const jugadoresGoleadores = (data, cantidad) => {
    return data
        .flatMap((equipo) => equipo.jugadores)
        .filter((jugador) => jugador.libre === "No" && jugador.inscrito === 'Si')
        .sort((a, b) => b.goles - a.goles)
        .slice(0, cantidad);
};

export const jugadoresAsistidores = (data, cantidad) => {
    return data
        .flatMap((equipo) => equipo.jugadores)
        .filter((jugador) => jugador.libre === "No" && jugador.inscrito === 'Si')
        .sort((a, b) => b.asistencias - a.asistencias)
        .slice(0, cantidad);
};

export const jugadoresAmarillas = (data, cantidad) => {
    return data
    .flatMap((equipo) => equipo.jugadores)
    .filter((jugador) => jugador.libre === "No" && jugador.inscrito === 'Si')
    .sort((a, b) => b.tarjetas_amarillas - a.tarjetas_amarillas)
    .slice(0, cantidad);

};

export const jugadoresRojas = (data, cantidad) => {
    return data
        .flatMap((equipo) => equipo.jugadores)
        .filter((jugador) => jugador.libre === "No" && jugador.inscrito === 'Si')
        .sort((a, b) => b.tarjetas_roja - a.tarjetas_roja)
        .slice(0, cantidad);
};

const stringToColor = (string: string) => {
    let hash = 0;
    let i;
    /* eslint-disable no-bitwise */
    for (i = 0; i < string?.length; i += 1) {
        hash = string?.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';
    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */
    return color;
}

export const stringAvatar = (name: string) => {
    const nameParts = name?.split(' ');

    let children = '';
    if (nameParts?.length >= 2) {
        children = `${nameParts[0][0]}${nameParts[1][0]}`;
    } else if (nameParts?.length === 1) {
        children = nameParts[0][0];
    }
    return {
        sx: {
            bgcolor: stringToColor(name),
        },
        children: children,
    };
}

export const seleccionarData = (data, setDataSeleccion, setModalData) => {
    setDataSeleccion(data);
    setModalData(true);
}

export const ordenarJugadores = (jugadores, posicionesOrdenadas) => {
    return jugadores.sort((a, b) => {
        return posicionesOrdenadas[a.posicion] - posicionesOrdenadas[b.posicion];
    });
}

export const calcularPromedio = (jugador, partidos)=> {
    const promedio = (jugador / partidos).toFixed(2);
    const promedioNumber = parseFloat(promedio);
    const promedioFormatted = isNaN(promedioNumber) ? '-' : promedioNumber.toFixed(2);
    return promedioFormatted;
}

export const formatoPesosArgentinos=(valor)=> {
    let formato = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' });
    return formato.format(valor);
}