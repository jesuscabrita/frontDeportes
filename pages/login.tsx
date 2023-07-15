import { Grid, useMediaQuery, Typography, Paper, Avatar } from "@mui/material";
import { useContext, useState } from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useRouter } from 'next/router';
import { ButtonSend } from "../components/Material/ButtonSend";
import { InputPassword } from "../components/Material/InputPassword";
import { InputText } from "../components/Material/InputTex";
import ContextRefac from "../context/contextLogin";
import Context from "../context/contextPrincipal";

const Login = () => {
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });
    const [light] = useContext(Context);
    const [emailOrUsername, setEmailOrUsername] = useState("");
    const [password, setPassword] = useState("");
    const { state: { user }, SignIn }: any = useContext(ContextRefac);
    const router = useRouter();

    const handleLogin = async () => {
        await SignIn({ email: emailOrUsername, password });
    };

    const navigateToForgotPassword = () => {
        router.push("/forgot-password");
    };

    const navigateToRegister = () => {
        router.push("/register");
    };

    return (
        <Grid container direction="column" alignItems="center" justifyContent="center" height="100vh" gap={2} style={{ padding: mobile ? "0 20px" : "0 50px" }}>
            <Paper elevation={3} sx={{ padding: mobile ? "20px" : "40px", display: "flex", flexDirection: "column", alignItems: "center", background: light ? 'var(--gris)' : 'var(--dark2)' }}>
                <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5" component="h1" gutterBottom sx={{ color: light ? "var(--dark2)" : "var(--cero)" }}>
                    Iniciar sesión
                </Typography>
                <Grid item sx={{ width: '100%' }}>
                    <InputText label="Usuario" placeholder="Email" setValue={setEmailOrUsername} value={emailOrUsername} />
                </Grid>
                <Grid item mt={2} sx={{ width: '100%' }}>
                    <InputPassword label="Contraseña" placeholder="Contraseña" setValue={setPassword} value={password} />
                </Grid>
                <Grid item mt={2}>
                    <ButtonSend disable={false} icon="" iconColor="" iconSize={20} title="Iniciar sesión" handle={handleLogin} />
                </Grid>
                <Grid item mt={2}>
                    <Typography variant="body2" sx={{ color: light ? "var(--dark3)" : "var(--gris2)", cursor: 'pointer', textDecoration: 'underline' }} onClick={navigateToForgotPassword}>
                        ¿Olvidaste tu contraseña?
                    </Typography>
                </Grid>
                <Grid item mt={2}>
                    <Typography variant="body2" sx={{ color: light ? "var(--dark3)" : "var(--gris2)", cursor: 'pointer', textDecoration: 'underline' }} onClick={navigateToRegister}>
                        ¿No tienes una cuenta? Regístrate aquí
                    </Typography>
                </Grid>
            </Paper>
        </Grid>
    );
};

export default Login;