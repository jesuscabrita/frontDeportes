export const filterEstado = (array, estado) => {
    const newFilter = array.filter(data => data.estado == estado);
    return newFilter;
}