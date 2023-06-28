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