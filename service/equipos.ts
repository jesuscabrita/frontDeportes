import { api } from "./api";

export const equiposGet = async () => {
    try {
        const { equipos } = await api.get('/api/liga').then(res => res.data)
        return equipos;
    } catch (err) {
        const message = err?.response?.data?.message || err.message;
        throw new Error(message);
    }
}

export const equiposGetById = async (id) => {
    try {
        const equipos  = await api.get(`/api/liga/${id}`).then(res => res.data)
        return equipos;
    } catch (err) {
        const message = err?.response?.data?.message || err.message;
        throw new Error(message);
    }
}

export const equiposPost = async ({ form }) => {
    try {
        const data = await api.post('/api/liga', form).then(res => res.data)
        return data;
    } catch (err) {
        const message = err?.response?.data?.message || err.message;
        throw new Error(message);
    }
}

export const equiposPut = async ({ form, id }) => {
    try {
        const data = await api.put(`/api/liga/${id}`, form).then(res => res.data)
        return data;
    } catch (err) {
        const message = err?.response?.data?.message || err.message;
        throw new Error(message);
    }
}

export const equiposEstadosPut = async ({ form, id }) => {
    try {
        const data = await api.put(`/api/liga/estado/${id}`, form).then(res => res.data)
        return data;
    } catch (err) {
        const message = err?.response?.data?.message || err.message;
        throw new Error(message);
    }
}

export const equiposDelete = async ({ id}) => {
    try {
        const data = await api.delete(`/api/liga/${id}`).then(res => res.data)
        return data;
    } catch (err) {
        const message = err?.response?.data?.message || err.message;
        throw new Error(message);
    }
}

export const resetEquiposJugador = async ({equipoID}) => {
    try {
        const data = await api.put(`/api/liga/reset/${equipoID}`).then(res => res.data)
        return data;
    } catch (err) {
        const message = err?.response?.data?.message || err.message;
        throw new Error(message);
    }
}