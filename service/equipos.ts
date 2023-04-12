import { api } from "./api";

export const equiposPost = async ({ form }) => {
    try {
        const data = await api.post('/api/liga', form).then(res => res.data)
        return data;
    } catch (err) {
        const message = err?.response?.data?.message || err.message;
        throw new Error(message);
    }
}