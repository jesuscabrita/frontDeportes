import { api } from "./api";

export const SignInRequest = async({email, password}) => {
    try {
        const data = await api.post('api/user/login', {email, password})
        return data;
    }
    catch (err) {
        const message = err?.response?.data?.message || err.message;
        throw new Error(message);
    }        
}

export const logoutRequest = async() => {
    try {
        const data = await api.post('api/user/logout')
        return data;
    }
    catch (err) {
        const message = err?.response?.data?.message || err.message;
        throw new Error(message);
    }        
}