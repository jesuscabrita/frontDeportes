import { alertaSubmit } from "./alert";

export const crearUser = (nombre: string, apellido: string, fecha_de_nacimiento: string, email: string, password: string, repeated_password: string, equipo: string, setIsLoading, crearUser, queryClient,router) => {
    setIsLoading(true);
    const formData = { nombre, apellido, fecha_de_nacimiento, email, password, repeated_password, equipo };
    crearUser({ form: formData }, {
        onSuccess: (success) => {
            queryClient.invalidateQueries(["login"]);
            alertaSubmit(true, success?.data?.data?.message);
            setIsLoading(false);
            router.push("/login");
        },
        onError: (err: any) => {
            const errorMessage = err?.response?.data?.message || err.message;
            alertaSubmit(false, errorMessage);
            setIsLoading(false);
        },
    });
}