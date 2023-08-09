import { alertaSubmit } from "./alert";

export const editarArbitros = (id: string, arbitro: string, index, setIsLoading, editarArbitro, queryClient, handleClose, data) => {
    setIsLoading(true);
    const updatedArbitro = arbitro;
    const updatedArbitroArr = [...data.arbitro];
    updatedArbitroArr[index] = updatedArbitro;
    const formData = { arbitro: updatedArbitroArr };
    editarArbitro({ form: formData, id }, {
        onSuccess: (success) => {
            queryClient.invalidateQueries(["/api/liga"]);
            alertaSubmit(true, 'Se editó el arbitro correctamente');
            setIsLoading(false);
            handleClose()
        },
        onError: (err: any) => {
            const errorMessage = err?.response?.data?.message || err.message;
            alertaSubmit(false, errorMessage);
            setIsLoading(false);
        },
    });
}