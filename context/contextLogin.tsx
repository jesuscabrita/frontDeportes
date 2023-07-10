import { createContext, useEffect, useReducer } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useRouter } from "next/router";
import { ReducerApp } from "./Reducer/reducer";
import { SignInRequest, logoutRequest } from "../service/session";
import { alertaSubmit } from "../utils/alert";

const ContextRefac = createContext({});

export const InfoContextRefac = ({ children }) => {
    const queryClient = useQueryClient();
    const initialState = {
        user: null,
    };
    const [state, dispatch] = useReducer(ReducerApp, initialState);
    const router = useRouter();
    const sessionDuration =  2 * 60 * 60 * 1000; // 2 horas en milisegundos

    useEffect(() => {
        const usuario = JSON.parse(localStorage.getItem("user"));
        const lastActivity = parseInt(localStorage.getItem("lastActivity"), 10); // Convertir a tipo number
        const currentTime = new Date().getTime();

        if (usuario) {
            dispatch({ type: "SET_USER", payload: usuario });
        }
        if (lastActivity && currentTime - lastActivity > sessionDuration) {
            console.log('se termino la sesion');
            logout();
            router.push("/login");
        }
        const timer = setInterval(() => {
            const newCurrentTime = new Date().getTime();
            if (lastActivity && newCurrentTime - lastActivity > sessionDuration) {
                logout();
            }
        }, 9000);
        return () => {
            clearInterval(timer);
        };
    }, []);

    const { mutate } = useMutation(SignInRequest);
    const { mutate:cerrarSesion } = useMutation(logoutRequest);
    const SignIn = ({ email, password }) => {
        dispatch({ type: "SET_LOGIN_ERROR", payload: { status: false, message: "" } });
        mutate({ email, password },{
                onSuccess: (data: any) => {
                    if (data?.status === 400) {
                        dispatch({ type: "SET_LOGIN_ERROR", payload: { status: true, message: data.data.message } });
                        alertaSubmit(false, data.data.message);
                    }
                    if (data?.status === 200) {
                        localStorage.setItem("token", data?.payload);
                        localStorage.setItem("user", JSON.stringify(data?.data.payload));
                        dispatch({ type: "SET_USER", payload: data?.data.payload });
                        alertaSubmit(true, data.data.message);
                        localStorage.setItem("lastActivity", new Date().getTime().toString());
                        queryClient.invalidateQueries(["login"]);
                        router.push("/");
                    }
                },
                onError: (error: any) => {
                    alertaSubmit(false, error);
                    dispatch({ type: "SET_LOGIN_ERROR", payload: { status: true, message: error.data.message } });
                },
            }
        );
    };

    const logout = () => {
        cerrarSesion();
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("lastActivity");
        dispatch({ type: "SET_USER", payload: null });
        dispatch({ type: "LOGOUT" });
        router.push("/login");
    };

    return (
        <ContextRefac.Provider value={{ state, dispatch, SignIn }}>
            {children}
        </ContextRefac.Provider>
    );
};

export default ContextRefac;