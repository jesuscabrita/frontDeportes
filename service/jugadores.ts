import { api } from "./api";

export const jugadoresPost = async ({ form, eid }) => {
    try {
        const data = await api.post(`/api/liga/${eid}/jugador`, form).then(res => res.data)
        return data;
    } catch (err) {
        const message = err?.response?.data?.message || err.message;
        throw new Error(message);
    }
}

export const JugadorDelete = async ({ equipoId, jugadorId}) => {
    try {
        const data = await api.delete(`/api/liga/${equipoId}/jugadores/${jugadorId}`).then(res => res.data)
        return data;
    } catch (err) {
        const message = err?.response?.data?.message || err.message;
        throw new Error(message);
    }
}

export const jugadoresPut = async ({ form, equipoId, jugadorId }) => {
    try {
        const data = await api.put(`/api/liga/${equipoId}/jugador/${jugadorId}`, form).then(res => res.data)
        return data;
    } catch (err) {
        const message = err?.response?.data?.message || err.message;
        throw new Error(message);
    }
}

export const jugadoresPut_gol = async ({ form, equipoId, jugadorId }) => {
    try {
        const data = await api.put(`/api/liga/${equipoId}/goles/${jugadorId}`, form).then(res => res.data)
        return data;
    } catch (err) {
        const message = err?.response?.data?.message || err.message;
        throw new Error(message);
    }
}

export const jugadoresPut_amarillas = async ({ form, equipoId, jugadorId }) => {
    try {
        const data = await api.put(`/api/liga/${equipoId}/amarillas/${jugadorId}`, form).then(res => res.data)
        return data;
    } catch (err) {
        const message = err?.response?.data?.message || err.message;
        throw new Error(message);
    }
}

export const jugadoresPut_rojas = async ({ form, equipoId, jugadorId }) => {
    try {
        const data = await api.put(`/api/liga/${equipoId}/rojas/${jugadorId}`, form).then(res => res.data)
        return data;
    } catch (err) {
        const message = err?.response?.data?.message || err.message;
        throw new Error(message);
    }
}

export const jugadoresPut_azul = async ({ form, equipoId, jugadorId }) => {
    try {
        const data = await api.put(`/api/liga/${equipoId}/azul/${jugadorId}`, form).then(res => res.data)
        return data;
    } catch (err) {
        const message = err?.response?.data?.message || err.message;
        throw new Error(message);
    }
}

export const jugadoresPut_asistencias = async ({ form, equipoId, jugadorId }) => {
    try {
        const data = await api.put(`/api/liga/${equipoId}/asistencias/${jugadorId}`, form).then(res => res.data)
        return data;
    } catch (err) {
        const message = err?.response?.data?.message || err.message;
        throw new Error(message);
    }
}

export const jugadoresPut_figura = async ({ form, equipoId, jugadorId }) => {
    try {
        const data = await api.put(`/api/liga/${equipoId}/figuras/${jugadorId}`, form).then(res => res.data)
        return data;
    } catch (err) {
        const message = err?.response?.data?.message || err.message;
        throw new Error(message);
    }
}

export const jugadoresPut_partidos = async ({ form, equipoId, jugadorId }) => {
    try {
        const data = await api.put(`/api/liga/${equipoId}/partidos/${jugadorId}`, form).then(res => res.data)
        return data;
    } catch (err) {
        const message = err?.response?.data?.message || err.message;
        throw new Error(message);
    }
}

export const jugadoresPut_suspencion = async ({ form, equipoId, jugadorId }) => {
    try {
        const data = await api.put(`/api/liga/${equipoId}/suspencion/${jugadorId}`, form).then(res => res.data)
        return data;
    } catch (err) {
        const message = err?.response?.data?.message || err.message;
        throw new Error(message);
    }
}

export const edit_autogol = async ({ form, equipoId }) => {
    try {
        const data = await api.put(`/api/liga/${equipoId}/autogol`, form).then(res => res.data)
        return data;
    } catch (err) {
        const message = err?.response?.data?.message || err.message;
        throw new Error(message);
    }
}

export const calcularDatosPartido = async ({ form, equipoId }) => {
    try {
        const data = await api.put(`/api/liga/${equipoId}/partido`, form).then(res => res.data)
        return data;
    } catch (err) {
        const message = err?.response?.data?.message || err.message;
        throw new Error(message);
    }
}

export const jugadoresPut_lesion = async ({ form, equipoId, jugadorId }) => {
    try {
        const data = await api.put(`/api/liga/${equipoId}/lesion/${jugadorId}`, form).then(res => res.data)
        return data;
    } catch (err) {
        const message = err?.response?.data?.message || err.message;
        throw new Error(message);
    }
}

export const jugadoresPut_jornada = async ({ form, equipoId, jugadorId }) => {
    try {
        const data = await api.put(`/api/liga/${equipoId}/jornada/${jugadorId}`, form).then(res => res.data)
        return data;
    } catch (err) {
        const message = err?.response?.data?.message || err.message;
        throw new Error(message);
    }
}

export const jugadoresPut_capitan = async ({ form, equipoId, jugadorId }) => {
    try {
        const data = await api.put(`/api/liga/${equipoId}/capitan/${jugadorId}`, form).then(res => res.data)
        return data;
    } catch (err) {
        const message = err?.response?.data?.message || err.message;
        throw new Error(message);
    }
}

export const jugadoresValor_mercado = async ({ form, equipoId, jugadorId }) => {
    try {
        const data = await api.put(`/api/liga/${equipoId}/mercado/${jugadorId}`, form).then(res => res.data)
        return data;
    } catch (err) {
        const message = err?.response?.data?.message || err.message;
        throw new Error(message);
    }
}

export const jugadoresRenovar = async ({ form, equipoId, jugadorId }) => {
    try {
        const data = await api.put(`/api/liga/${equipoId}/renovar/${jugadorId}`, form).then(res => res.data)
        return data;
    } catch (err) {
        const message = err?.response?.data?.message || err.message;
        throw new Error(message);
    }
}

export const jugadoresListaTransferible = async ({ form, equipoId, jugadorId }) => {
    try {
        const data = await api.put(`/api/liga/${equipoId}/transferible/${jugadorId}`, form).then(res => res.data)
        return data;
    } catch (err) {
        const message = err?.response?.data?.message || err.message;
        throw new Error(message);
    }
}

export const jugadoresRecindir = async ({ form, equipoId, jugadorId }) => {
    try {
        const data = await api.put(`/api/liga/${equipoId}/recindir/${jugadorId}`, form).then(res => res.data)
        return data;
    } catch (err) {
        const message = err?.response?.data?.message || err.message;
        throw new Error(message);
    }
}

export const jugadoresInscribir = async ({ form, equipoId, jugadorId }) => {
    try {
        const data = await api.put(`/api/liga/${equipoId}/inscribir/${jugadorId}`, form).then(res => res.data)
        return data;
    } catch (err) {
        const message = err?.response?.data?.message || err.message;
        throw new Error(message);
    }
}

export const jugadoresDorsal = async ({ form, equipoId, jugadorId }) => {
    try {
        const data = await api.put(`/api/liga/${equipoId}/dorsal/${jugadorId}`, form).then(res => res.data)
        return data;
    } catch (err) {
        const message = err?.response?.data?.message || err.message;
        throw new Error(message);
    }
}

//OFERTAS

export const ofertaPost = async ({ form, equipoId, jugadorId }) => {
    try {
        const data = await api.post(`/api/liga/${equipoId}/oferta/${jugadorId}`, form).then(res => res.data)
        return data;
    } catch (err) {
        const message = err?.response?.data?.message || err.message;
        throw new Error(message);
    }
}

export const ofertaPut = async ({ form, equipoId, jugadorId, ofertaId }) => {
    try {
        const data = await api.put(`/api/liga/${equipoId}/ofertaEdit/${jugadorId}/${ofertaId}`, form).then(res => res.data)
        return data;
    } catch (err) {
        const message = err?.response?.data?.message || err.message;
        throw new Error(message);
    }
}

export const ofertaDelete = async ({ equipoId, jugadorId, ofertaId}) => {
    try {
        const data = await api.delete(`/api/liga/${equipoId}/deleteOferta/${jugadorId}/${ofertaId}`).then(res => res.data)
        return data;
    } catch (err) {
        const message = err?.response?.data?.message || err.message;
        throw new Error(message);
    }
}

export const ficharJugador = async ({ form, equipoOrigenId, equipoDestinoId,jugadorId }) => {
    try {
        const data = await api.post(`/api/liga/${equipoOrigenId}/fichar/${equipoDestinoId}/${jugadorId}`, form).then(res => res.data)
        return data;
    } catch (err) {
        const message = err?.response?.data?.message || err.message;
        throw new Error(message);
    }
}

export const prestamoJugador = async ({ form, equipoOrigenId, equipoDestinoId,jugadorId }) => {
    try {
        const data = await api.post(`/api/liga/${equipoOrigenId}/prestamo/${equipoDestinoId}/${jugadorId}`, form).then(res => res.data)
        return data;
    } catch (err) {
        const message = err?.response?.data?.message || err.message;
        throw new Error(message);
    }
}

export const devolverJugadorPrestamo = async ({ form, equipoOrigenId,jugadorId }) => {
    try {
        const data = await api.post(`/api/liga/${equipoOrigenId}/devolverPrestamo/${jugadorId}`, form).then(res => res.data)
        return data;
    } catch (err) {
        const message = err?.response?.data?.message || err.message;
        throw new Error(message);
    }
}