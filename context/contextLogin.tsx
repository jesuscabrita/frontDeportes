import React, { createContext, useEffect, useReducer, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useRouter } from "next/router";
import { ReducerApp } from "./Reducer/reducer";
import { SignInRequest, logoutRequest } from "../service/session";
import { alertaSubmit } from "../utils/alert";
import { LoadingScreen } from "../components/Shared/LoadingScreen";

const ContextRefac = createContext({});

export const InfoContextRefac = ({ children }) => {
    const queryClient = useQueryClient();
    const initialState = {
        user: null,
    };
    const [state, dispatch] = useReducer(ReducerApp, initialState);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const sessionDuration = 2 * 60 * 60 * 1000; // 2 horas en milisegundos

    useEffect(() => {
        const userJson = localStorage.getItem("user");
        const usuario = userJson ? JSON.parse(userJson) : null;
        const lastActivityStr = localStorage.getItem("lastActivity");
        const lastActivity = lastActivityStr ? parseInt(lastActivityStr, 10) : null;
        const currentTime = new Date().getTime();

        if (usuario) {
            dispatch({ type: "SET_USER", payload: usuario });
        }

        if (lastActivity && currentTime - lastActivity > sessionDuration) {
            logout();
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
    }, [dispatch]);

    const { mutate } = useMutation(SignInRequest);
    const { mutate: cerrarSesion } = useMutation(logoutRequest);
    const SignIn = ({ email, password }) => {
        dispatch({ type: "SET_LOGIN_ERROR", payload: { status: false, message: "" } });
        setIsLoading(true)
        mutate({ email, password }, {
            onSuccess: (data: any) => {
                if (data?.status === 400) {
                    dispatch({ type: "SET_LOGIN_ERROR", payload: { status: true, message: data.data.message } });
                    setIsLoading(false)
                    alertaSubmit(false, data.data.message);
                }
                if (data?.status === 200) {
                    localStorage.setItem("token", data?.payload);
                    localStorage.setItem("user", JSON.stringify(data?.data.payload));
                    dispatch({ type: "SET_USER", payload: data?.data.payload });
                    localStorage.setItem("lastActivity", new Date().getTime().toString());
                    queryClient.invalidateQueries(["login"]);
                    router.push("/");
                    setIsLoading(false)
                    alertaSubmit(true, data.data.message);
                }
            },
            onError: (error: any) => {
                setIsLoading(false)
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
        window.location.reload();
    };

    return (
        <>
            <ContextRefac.Provider value={{ state, dispatch, SignIn }}>
                {children}
            </ContextRefac.Provider>
            {isLoading && <LoadingScreen />}
        </>
    );
};

export default ContextRefac;