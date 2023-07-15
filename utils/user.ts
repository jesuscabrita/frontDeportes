import { alertaSubmit } from "./alert";

export const crearUser = (nombre: string, apellido: string, fecha_de_nacimiento: string, email: string, password: string, repeated_password: string, equipo: string, setIsLoading, crearUser, queryClient) => {
    setIsLoading(true);
    const formData = { nombre, apellido, fecha_de_nacimiento, email, password, repeated_password, equipo };
    crearUser({ form: formData }, {
        onSuccess: (success) => {
            queryClient.invalidateQueries(["login"]);
            alertaSubmit(true, success?.message);
            setIsLoading(false);
        },
        onError: (err: any) => {
            const errorMessage = err?.response?.data?.message || err.message;
            alertaSubmit(false, errorMessage);
            setIsLoading(false);
        },
    });
}