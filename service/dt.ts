import { api } from "./api";

export const dtPost = async ({ form, eid }) => {
    try {
        const data = await api.post(`/api/liga/${eid}/dt`, form).then(res => res.data)
        return data;
    } catch (err) {
        const message = err?.response?.data?.message || err.message;
        throw new Error(message);
    }
}

export const DTPut = async ({ form, equipoId, dtId }) => {
    try {
        const data = await api.put(`/api/liga/${equipoId}/dt/${dtId}`, form).then(res => res.data)
        return data;
    } catch (err) {
        const message = err?.response?.data?.message || err.message;
        throw new Error(message);
    }
}

export const DTDelete = async ({ equipoId, dtId}) => {
    try {
        const data = await api.delete(`/api/liga/${equipoId}/dt/${dtId}`).then(res => res.data)
        return data;
    } catch (err) {
        const message = err?.response?.data?.message || err.message;
        throw new Error(message);
    }
}

export const DTPut_partidos = async ({ form, equipoId, dtId }) => {
    try {
        const data = await api.put(`/api/liga/${equipoId}/partidoDT/${dtId}`, form).then(res => res.data)
        return data;
    } catch (err) {
        const message = err?.response?.data?.message || err.message;
        throw new Error(message);
    }
}