import { api } from "./api";

export const SignInRequest = async ({ email, password }) => {
    try {
        const data = await api.post('api/user/login', { email, password })
        return data;
    }
    catch (err) {
        const message = err?.response?.data?.message || err.message;
        throw new Error(message);
    }
}

export const logoutRequest = async () => {
    try {
        const data = await api.post('api/user/logout')
        return data;
    }
    catch (err) {
        const message = err?.response?.data?.message || err.message;
        throw new Error(message);
    }
}

export const RegisterRequest = async ({ form }) => {
    try {
        const data = await api.post('api/user/register', form)
        return data;
    }
    catch (err) {
        const message = err?.response?.data?.message || err.message;
        throw new Error(message);
    }
}

export const SolicitarContraseñaRequest = async ({ form }) => {
    try {
        const data = await api.post('api/user/solicitar', form)
        return data;
    }
    catch (err) {
        const message = err?.response?.data?.message || err.message;
        throw new Error(message);
    }
}

export const CambiarContraseñaRequest = async ({ form }) => {
    try {
        const data = await api.post('api/user/cambiar', form)
        return data;
    }
    catch (err) {
        const message = err?.response?.data?.message || err.message;
        throw new Error(message);
    }
}

export const UserGet = async () => {
    try {
        const { data } = await api.get('api/user')
        return data;
    }
    catch (err) {
        const message = err?.response?.data?.message || err.message;
        throw new Error(message);
    }
}

export const userPut = async ({ form, userId }) => {
    try {
        const data = await api.put(`/api/user/${userId}`, form).then(res => res.data)
        return data;
    } catch (err) {
        const message = err?.response?.data?.message || err.message;
        throw new Error(message);
    }
}

export const userDelete = async ({ userId }) => {
    try {
        const data = await api.delete(`/api/user/${userId}`).then(res => res.data)
        return data;
    } catch (err) {
        const message = err?.response?.data?.message || err.message;
        throw new Error(message);
    }
}