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