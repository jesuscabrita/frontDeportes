import { Grid, useMediaQuery, Typography, Paper, Avatar, CircularProgress } from "@mui/material";
import { useContext, useState } from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useRouter } from 'next/router';
import Context from "../../context/contextPrincipal";
import { InputText } from "../../components/Material/InputTex";
import { InputPassword } from "../../components/Material/InputPassword";
import { ButtonSend } from "../../components/Material/ButtonSend";
import { useMutation, useQueryClient } from "react-query";
import { CambiarContraseñaRequest } from "../../service/session";
import { handleResetPassword } from "../../utils/utilsUser";

const ResetToken = () => {
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });
    const [light] = useContext(Context);
    const router = useRouter();
    const resetToken = router.query.resetToken;

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeated_password, setRepeated_password] = useState("");
    const [isLoading, setIsLoading] = useState(false)
    const { mutate: cambiarContraseñas } = useMutation(CambiarContraseñaRequest);
    const queryClient = useQueryClient();

    const handleAtrasClick = () => {
        router.back();
    };

    return (
        <Grid container direction="column" alignItems="center" justifyContent="center" height="100vh" gap={2} style={{ padding: mobile ? "0 20px" : "0 50px" }}>
            <Paper elevation={3} sx={{ padding: mobile ? "20px" : "40px", display: "flex", flexDirection: "column", alignItems: "center", background: light ? 'var(--gris)' : 'var(--dark2)' }}>
                <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5" component="h1" gutterBottom sx={{ color: light ? "var(--dark2)" : "var(--cero)" }}>
                    Restablecer contraseña
                </Typography>
                <Grid item sx={{ width: '100%' }}>
                    <InputText label="Email" placeholder="Email" setValue={setEmail} value={email} />
                </Grid>
                <Grid item mt={2} sx={{ width: '100%' }}>
                    <InputPassword label="Nueva Contraseña" placeholder="Nueva Contraseña" setValue={setPassword} value={password} />
                </Grid>
                <Grid item mt={2} sx={{ width: '100%' }}>
                    <InputPassword label="Repetir Contraseña" placeholder="Repetir Contraseña" setValue={setRepeated_password} value={repeated_password} />
                </Grid>
                <Grid item mt={2}>
                    <ButtonSend disable={false} icon="" iconColor="" iconSize={20} title="Restablecer contraseña" handle={()=> {handleResetPassword(setIsLoading, cambiarContraseñas, email, password, repeated_password, queryClient, router)}} />
                </Grid>
                <Grid item mt={2}>
                    <Typography variant="body2" sx={{ color: light ? "var(--dark3)" : "var(--gris2)", cursor: 'pointer', textDecoration: 'underline' }} onClick={handleAtrasClick}>
                        Volver atrás
                    </Typography>
                </Grid>
            </Paper>
            {isLoading && (
                <Grid sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: !mobile ? '160vh' : '130vh', backgroundColor: 'rgba(2, 2, 2, 0.488)', zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <CircularProgress style={{ color: light ? 'var(--dark2)' : 'var(--cero)' }} />
                </Grid>
            )}
        </Grid>
    );
}

export default ResetToken;