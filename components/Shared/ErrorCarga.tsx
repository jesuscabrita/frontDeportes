import React from "react";
import { TbError404 as Err404 } from 'react-icons/tb';

export const ErrorCarga = () => {
    return (
        <>
            <Err404 size={140} />
            Ha ocurrido un error al cargar el usuario
        </>
    )
}