import React from "react";
import { MdStars as Liga } from "react-icons/md";
import { GiSandsOfTime as Espera } from 'react-icons/gi';
import { TbCircleLetterBFilled as B } from "react-icons/tb";
import { TbCircleLetterCFilled as C } from "react-icons/tb";
import { MdAdminPanelSettings as Admin } from "react-icons/md";

//REGISTER USER

export const dataCategoria = [
    { codigo: 'Libre - Masculino', descripcion: 'Libre - Masculino' },
    { codigo: 'Libre - Femenino', descripcion: 'Libre - Femenino' },
]

// REGISTRAR EQUIPO

export const dataSubCategoria = [
    { codigo: 'Primera', descripcion: 'Primera' },
    { codigo: 'Segunda', descripcion: 'Segunda' },
    { codigo: 'Tercera', descripcion: 'Tercera' },
]

export const opcionSelectEquipos = [
    { id: 0, name: 'Ligamaster', icono: <Liga size={30} /> },
    { id: 1, name: 'Liga B', icono: <B size={30} /> },
    { id: 2, name: 'Liga C', icono: <C size={30} /> },
    { id: 3, name: 'Equipos en cola', icono: <Espera size={25} /> },
    { id: 4, name: 'Acciones', icono: <Admin size={30} /> }
]

//

export const posiciones = [
    { value: 'Seleccionar', label: 'Seleccionar' },
    { value: 'Portero', label: 'Portero' },
    { value: 'Defensa', label: 'Defensa' },
    { value: 'Medio', label: 'Medio' },
    { value: 'Delantero', label: 'Delantero' }
]

export const optionJornada = [
    { value: 'Seleccionar', label: 'Seleccionar' },
    { value: 1, label: '1 jornada' },
    { value: 2, label: '2 jornadas' },
    { value: 3, label: '3 jornadas' },
    { value: 4, label: '4 jornadas' }
]

export const arbitros = [
    { value: 'Seleccionar', label: 'Seleccionar' },
    { value: 'Negreira', label: 'Negreira' },
    { value: 'Fulanito Perez', label: 'Fulanito Perez' },
    { value: 'Jesus Cabrita', label: 'Jesus Cabrita' },
    { value: 'Gil Manzano', label: 'Gil Manzano' }
]

export const nationalities = [
    { value: 'Seleccionar', label: 'Seleccionar' },
    { value: 'Argentina', label: 'Argentina' },
    { value: 'Peru', label: 'Peru' },
    { value: 'Bolivia', label: 'Bolivia' },
    { value: 'Brazil', label: 'Brazil' },
    { value: 'Chile', label: 'Chile' },
    { value: 'Colombia', label: 'Colombia' },
    { value: 'Costa Rica', label: 'Costa Rica' },
    { value: 'Cuba', label: 'Cuba' },
    { value: 'Republica Dominicana', label: 'Republica Dominicana' },
    { value: 'Paraguay', label: 'Paraguay' },
    { value: 'Uruguay', label: 'Uruguay' },
    { value: 'Mexico', label: 'Mexico' },
    { value: 'Ecuador', label: 'Ecuador' },
    { value: 'Venezuela', label: 'Venezuela' },
    { value: 'Estados Unidos', label: 'Estados Unidos' },
];

export const headers = [
    { label: 'Equipo', align: 'center' },
    { label: 'PTS', align: 'center' },
    { label: 'PJ', align: 'center' },
    { label: 'G', align: 'center' },
    { label: 'E', align: 'center' },
    { label: 'P', align: 'center' },
    { label: 'GF', align: 'center' },
    { label: 'GC', align: 'center' },
    { label: 'DG', align: 'center' },
    { label: 'Ultimos 5', align: 'center' },
];

export const planilla = (isUserAdmin, isSameEmail) => {
    const planillas = [
        { label: 'Posicion', align: '' },
        { label: 'Nombre', align: 'left' },
        { label: 'Dorsal', align: 'left' },
        { label: 'Pais', align: 'center' },
    ];

    if (isUserAdmin) {
        planillas.push({ label: '', align: '' });
        planillas.push({ label: '', align: '' });
        planillas.push({ label: '', align: '' });
        planillas.push({ label: '', align: '' });
        planillas.push({ label: '', align: '' });
    }

    if (isSameEmail) {
        planillas.push({ label: '', align: '' });
    }

    return planillas;
};

export const posicionesOrdenadas = {
    'Portero': 1,
    'Defensa': 2,
    'Medio': 3,
    'Delantero': 4,
};

export const roles = [
    { codigo: 'usuario', descripcion: 'usuario' },
    { codigo: 'super_admin', descripcion: 'super_admin' },
    { codigo: 'admin', descripcion: 'admin' },
]

export const contratos = [
    { value: 'Seleccionar', label: 'Seleccionar' },
    { value: 0.5, label: 'Media temporada' },
    { value: 1, label: '1 Temporada' },
    { value: 2, label: '2 Temporada' },
    { value: 3, label: '3 Temporada' },
    { value: 4, label: '4 Temporada' },
]

