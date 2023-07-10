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
    { value: 'Armenia', label: 'Armenia' },
    { value: 'Alemania', label: 'Alemania' },
    { value: 'Bolivia', label: 'Bolivia' },
    { value: 'Brazil', label: 'Brazil' },
    { value: 'Canada', label: 'CA' },
    { value: 'Chile', label: 'Chile' },
    { value: 'China', label: 'China' },
    { value: 'Colombia', label: 'Colombia' },
    { value: 'Costa Rica', label: 'Costa Rica' },
    { value: 'Croatia', label: 'Croatia' },
    { value: 'Cuba', label: 'Cuba' },
    { value: 'Dominican Republic', label: 'Dominican Republic' },
    { value: 'Paraguay', label: 'Paraguay' },
    { value: 'Uruguay', label: 'Uruguay' },
    { value: 'Mexico', label: 'Mexico' },
    { value: 'Ecuador', label: 'Ecuador' },
    { value: 'Venezuela', label: 'Venezuela' },
];

export const headers = [
    { label: 'Club', align: 'left' },
    { label: 'PTS', align: 'right' },
    { label: 'PJ', align: 'right' },
    { label: 'G', align: 'right' },
    { label: 'E', align: 'right' },
    { label: 'P', align: 'right' },
    { label: 'GF', align: 'right' },
    { label: 'GC', align: 'right' },
    { label: 'DG', align: 'right' },
    { label: 'Ultimos 5', align: 'center' },
];

export const planilla = ( isUserAdmin, isSameEmail ) => {
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

    if(isSameEmail){
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
