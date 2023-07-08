import React, { createContext, useEffect, useReducer } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useRouter } from "next/router";
import { ReducerApp } from "./Reducer/reducer";
import { SignInRequest } from "../service/session";
import { api } from "../service/api";
import { alertaSubmit } from "../utils/alert";

const ContextRefac = createContext({});

export const InfoContextRefac = ({ children }) => {
    const router = useRouter();
    const queryClient = useQueryClient();
    const initialState = {
        user: null,
    };
    const [state, dispatch] = useReducer(ReducerApp, initialState);

    useEffect(() => {
        const usuario = JSON.parse(localStorage.getItem("user"));
        if (usuario) {
            dispatch({ type: "SET_USER", payload: usuario });
        }
    }, []);

    const { mutate } = useMutation(SignInRequest);
    const SignIn = ({ email, password }) => {
        dispatch({ type: "SET_LOGIN_ERROR", payload: { status: false, message: "" } });
        mutate({ email, password },{
                onSuccess: (data:any) => {
                    if(data?.status === 400){
                        dispatch({ type: "SET_LOGIN_ERROR", payload: { status: true, message: data.data.message } });
                        alertaSubmit(false, data.data.message);
                    }
                    if(data?.status === 200){
                        localStorage.setItem("token", data?.payload);
                        localStorage.setItem("user", JSON.stringify(data?.data.payload));
                        dispatch({ type: "SET_USER", payload: data?.data.payload });
                        alertaSubmit(true, data.data.message);
                        queryClient.invalidateQueries(["login"])
                    }
                },
                onError: (error:any) => {
                    alertaSubmit(false, error);
                    dispatch({ type: "SET_LOGIN_ERROR", payload: { status: true, message: error.data.message } });
                },
            }
        );
    };

    return (
        <ContextRefac.Provider value={{ state, dispatch, SignIn }}>
            {children}
        </ContextRefac.Provider>
    );
};

export default ContextRefac;