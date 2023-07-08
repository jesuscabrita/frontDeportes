import { Grid, CircularProgress } from "@mui/material";
import { useContext, useState } from "react";
import { InputText } from "../components/Material/InputTex";
import { ButtonSend } from "../components/Material/ButtonSend";
import { SignInRequest } from "../service/session";
import { useMutation, useQueryClient } from "react-query";
import { alertaSubmit } from "../utils/alert";
import ContextRefac from "../context/contextLogin";

const Login = () => {
    const [emailOrUsername, setEmailOrUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { state: { user }, SignIn }: any = useContext(ContextRefac);

    console.log('user', user);
    
    const handleLogin = async () => {
        await SignIn({ email: emailOrUsername, password });
    };

    return (
        <Grid
            container
            direction="column"
            alignItems="center"
            justifyContent="center"
            height="100vh"
            gap={2}
        >
            <InputText
                label={"Usuario"}
                placeholder={"Email"}
                setValue={setEmailOrUsername}
                value={emailOrUsername}
            />
            <InputText
                label={"Contraseña"}
                placeholder={"Contraseña"}
                setValue={setPassword}
                value={password}
            />
            {isLoading ? (
                <CircularProgress color="primary" />
            ) : (
                <ButtonSend
                    disable={false}
                    icon={""}
                    iconColor={""}
                    iconSize={20}
                    title={"Iniciar sesión"}
                    handle={handleLogin}
                />
            )}
            {user && (
                <div>
                    <p>Nombre de usuario: {user.nombre}</p>
                    <p>Apellido: {user.apellido}</p>
                    <p>Email: {user.email}</p>
                </div>
            )}
        </Grid>
    );
};

export default Login;