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

export const equiposPost = async ({ form }) => {
    try {
        const data = await api.post('/api/liga', form).then(res => res.data)
        return data;
    } catch (err) {
        const message = err?.response?.data?.message || err.message;
        throw new Error(message);
    }
}