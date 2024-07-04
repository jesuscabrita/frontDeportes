import { SelectChangeEvent } from "@mui/material";

// ADMIN USUARIOS

export interface AdminUsuariosProps {
    mobile: boolean;
    light: boolean;
    queryClient: any;
    eliminarUsuario: any;
    searchQuery: string;
    isLoading: boolean;
    isError: boolean;
    data: { nombre: string; apellido: string; email: string; role: string; foto: string; fecha_de_nacimiento: string; edad: string; categoria: string; subCategoria: string; equipo: string, _id: string; }[]
    setSearchQuery: React.Dispatch<React.SetStateAction<any>>;
    setOpenModal: React.Dispatch<React.SetStateAction<any>>;
    setUserSeleccionado: React.Dispatch<React.SetStateAction<any>>;
}

export interface TableUsuariosProps {
    mobile: boolean;
    light: boolean;
    searchQuery: string;
    queryClient: any;
    eliminarUsuario: any;
    data: { nombre: string; apellido: string; email: string; role: string; foto: string; fecha_de_nacimiento: string; edad: string; categoria: string; subCategoria: string; equipo: string, _id: string; }[]
    setOpenModal: React.Dispatch<React.SetStateAction<any>>;
    setUserSeleccionado: React.Dispatch<React.SetStateAction<any>>;
}

export interface UsuariosPageProps {
    nombre: string;
    apellido: string;
    email: string;
    fecha_de_nacimiento: string;
    _id: string;
    role: string;
}

//PERFIL USUARO

export interface PerfilInfoProps {
    mobile: boolean;
    light: boolean;
    usuario: { foto: string; nombre: string; apellido: string; role: string; email: string; fecha_de_nacimiento: string; edad: string, equipo: string; categoria: string; subCategoria: string; }
    isLoading: boolean;
    isError: boolean;
    handleAtrasClick: () => void;
    handleEditar: () => void;
}

export interface FormLoginProps {
    mobile: boolean;
    light: boolean;
    emailOrUsername: string;
    loading: boolean;
    password: any;
    setEmailOrUsername: React.Dispatch<React.SetStateAction<any>>;
    setPassword: React.Dispatch<React.SetStateAction<any>>;
    handleLogin: () => void;
    navigateToForgotPassword: () => void;
    navigateToRegister: () => void;
}

// FORGOT-PASSWORD

export interface FormForgotPasswordProps {
    mobile: boolean;
    light: boolean;
    email: string
    error: boolean;
    textError: string;
    cargando: any
    setEmail: React.Dispatch<React.SetStateAction<any>>;
    handleSolicitarPassword: () => void;
    navigateToLogin: () => void;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

//REGISTER

export interface RegisterUserProps {
    mobile: boolean;
    light: boolean;
    nombre: string;
    apellido: string;
    email: string;
    fecha_de_nacimiento: any
    password: string;
    repeated_password: string;
    equipo: string;
    cargando: any
    categoria: any;
    setNombre: React.Dispatch<React.SetStateAction<any>>;
    setApellido: React.Dispatch<React.SetStateAction<any>>;
    setEmail: React.Dispatch<React.SetStateAction<any>>;
    setFecha_de_nacimiento: React.Dispatch<React.SetStateAction<any>>;
    setPassword: React.Dispatch<React.SetStateAction<any>>;
    setRepeated_password: React.Dispatch<React.SetStateAction<any>>;
    setEquipo: React.Dispatch<React.SetStateAction<any>>;
    handleRegistrar: () => void;
    navigateToLogin: () => void;
    handleSelect: (event: SelectChangeEvent<any>) => void;
}

//RESET TOKEN

export interface FormResetProps {
    mobile: boolean;
    light: boolean;
    email: string;
    password: string;
    repeated_password: string;
    cargando: any;
    errorEmail: boolean;
    textErrorEmail: string;
    PasswordError: boolean;
    PasswordErrorText: string;
    Repeated_passwordError: boolean;
    Repeated_passwordErrorText: string;
    setEmail: React.Dispatch<React.SetStateAction<any>>;
    setPassword: React.Dispatch<React.SetStateAction<any>>;
    setRepeated_password: React.Dispatch<React.SetStateAction<any>>;
    handleResetPassword: () => void;
    handleAtrasClick: () => void;
    handleEmail: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handlePassword: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleRepeatedPassword: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

// REGISTRAR EQUIPO

export interface RegistrarEquipoProps {
    mobile: boolean;
    light: boolean;
    name: string;
    email: string;
    instagram: string;
    categoria: string;
    subCategoria: string;
    dataSubCategoria: any;
    logoAdded: boolean;
    imageName: string;
    image: any;
    user: any;
    crearEquipo: any;
    queryClient: any;
    isUserEmailInDataEnCola: any;
    isUserEmailInData: any;
    router: any;
    setName: React.Dispatch<React.SetStateAction<any>>;
    setEmail: React.Dispatch<React.SetStateAction<any>>;
    setInstagram: React.Dispatch<React.SetStateAction<any>>;
    setCategoria: React.Dispatch<React.SetStateAction<any>>;
    handleSelect: (event: SelectChangeEvent<any>) => void;
    setImage: React.Dispatch<React.SetStateAction<any>>;
    setLogoAdded: React.Dispatch<React.SetStateAction<any>>;
    setImageName: React.Dispatch<React.SetStateAction<any>>;
    handleImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    setIsLoading: React.Dispatch<React.SetStateAction<any>>;
}

export interface dataModalProps {
    name: string;
    logo: any;
    correo: string;
    instagram: string;
    _id: string;
    categoria: string
}

export interface TableEquiposColaProps {
    light: boolean;
    dataEquiposLiga: {
        name: string;
        logo: string;
        categoria: string;
        subCategoria: string;
        correo: string;
        _id: string;
    }[];
    mobile: boolean;
    eliminarEquipo: any;
    queryClient: any;
    editarEstados: any;
}

export interface TableEquiposLigasProps {
    light: boolean;
    dataEquipos: {
        name: string;
        logo: string;
        categoria: string;
        subCategoria: string;
        correo: string;
        _id: string;
    }[];
    mobile: boolean;
    queryClient: any;
    editarEstados: any;
}

export interface PanelEquiposAdminProps {
    mobile: boolean;
    light: boolean;
    isLoading: boolean;
    isError: boolean;
    data: {}[];
    eliminarEquipo: any;
    queryClient: any;
    editarEstados: any;
    reseteoEquipos: any;
    devolver: any;
    calculo: any
    setIsLoadinng: React.Dispatch<React.SetStateAction<any>>;
}

export interface PanelAccionesProps {
    mobile: boolean;
    light: boolean;
    queryClient: any;
    data: {}[];
    reseteoEquipos: any;
    devolver: any;
    calculo: any;
    setIsLoadinng: React.Dispatch<React.SetStateAction<any>>;
}

//EQUIPO ID

export interface DatosEquipoProps {
    data: {
        correo: string;
        name: string;
        logo: string;
        partidosJugados: number;
        puntaje_anterior: number;
        instagram: string;
        banco_fondo: number;
        categoria: string;
        tarjetasAmarillas: number;
        tarjetasRojas: number;
        puntos: number;
        empates: number;
        ganados: number;
        perdidos: number;
        goles_a_Favor: number;
        goles_en_Contra: number;
        diferencia_de_Goles: number;
        delegado: { name: string; _id: string; }[];
    };
    light: boolean;
    equipoIndex: number;
    mobile: boolean;
    isSameEmail: boolean;
    isUserAdmin: boolean;
    equipo_id: any;
    eliminarDelegado: any;
    queryClient: any;
    setDelegadoSeleccionado: React.Dispatch<React.SetStateAction<any>>;
    setModalDelegadoChat: React.Dispatch<React.SetStateAction<any>>;
    setModalDelegadoEditar: React.Dispatch<React.SetStateAction<any>>;
}

export interface JugadorEquipoDetalle {
    _id: string;
}

export interface TablaPlantillaProps {
    jugadores: {}[];
    equipo: { _id: string; correo: string; }
    light: boolean;
    mobile: boolean;
    queryClient: any;
    eliminarJugador: any;
    lesion_jugador: any;
    inscribir: any;
    listaTransferibleJugador: any;
    isUserAdmin: boolean;
    isSameEmail: boolean;
    setIsLoadinng: React.Dispatch<React.SetStateAction<any>>;
    setJugadorSeleccionado: React.Dispatch<React.SetStateAction<any>>;
    setModalEditarJugador: React.Dispatch<React.SetStateAction<any>>;
    setModalRecindir: React.Dispatch<React.SetStateAction<any>>;
    setModalRenovar: React.Dispatch<React.SetStateAction<any>>;
    setModalDorsal: React.Dispatch<React.SetStateAction<any>>;
    setModalJugadorCapitan: React.Dispatch<React.SetStateAction<any>>;
    setModalEditarJornada: React.Dispatch<React.SetStateAction<any>>;
    setModalJugadorInfo: React.Dispatch<React.SetStateAction<any>>;
}

export interface AccionesProps {
    light: boolean;
    mobile: boolean;
    isUserAdmin: boolean;
    isSameEmail: boolean;
    jugador: { lesion: string; _id: string; jornadas_suspendido: number };
    equipo: { _id: string; }
    queryClient: any;
    eliminarJugador: any;
    lesion_jugador: any;
    setJugadorSeleccionado: React.Dispatch<React.SetStateAction<any>>;
    setModalJugadorCapitan: React.Dispatch<React.SetStateAction<any>>;
    setModalEditarJugador: React.Dispatch<React.SetStateAction<any>>;
    setModalEditarJornada: React.Dispatch<React.SetStateAction<any>>;
}

export interface ContratosProps {
    light: boolean;
    mobile: boolean;
    isUserAdmin: boolean;
    isSameEmail: boolean;
    jugador: {
        inscrito: string;
        transferible: string;
        sueldo: number;
        valor_mercado: number;
        clausula: number;
        contrato: number;
        _id: string;
    };
    equipo: { _id: string; };
    inscribir: any;
    listaTransferibleJugador: any;
    queryClient: any;
    setJugadorSeleccionado: React.Dispatch<React.SetStateAction<any>>;
    setModalRenovar: React.Dispatch<React.SetStateAction<any>>;
    setModalRecindir: React.Dispatch<React.SetStateAction<any>>;
    setModalDorsal: React.Dispatch<React.SetStateAction<any>>;
    setIsLoadinng: React.Dispatch<React.SetStateAction<any>>;
}

export interface AccionesAdminProps {
    light: boolean;
    mobile: boolean;
    data: { delegado: { name: string; _id: string; }[]; };
    modalJugador: boolean;
    modalDelegado: boolean;
    setModalJugador: React.Dispatch<React.SetStateAction<any>>;
    setModalDelegado: React.Dispatch<React.SetStateAction<any>>;
}

export interface TablaEstadisticasProps {
    jugadores: {}[];
    goles?: boolean;
    asistencias?: boolean;
    amarillas?: boolean;
    rojas?: boolean;
    label: string;
    light: boolean;
    mobile: boolean;
}

export interface TablaFichajesProps {
    jugadores: {}
    equipoId: any;
    data: { correo: string; };
    light: boolean;
    mobile: boolean;
    user: any;
    eliminarOfert: any;
    queryClient: any;
    setIsLoadinng: React.Dispatch<React.SetStateAction<any>>;
    setModalJugadorInfo: React.Dispatch<React.SetStateAction<any>>;
    setJugadorSeleccionado: React.Dispatch<React.SetStateAction<any>>;
    setModalOferta: React.Dispatch<React.SetStateAction<any>>;
    setModalOfertaRecibida: React.Dispatch<React.SetStateAction<any>>;
    setModalAceptarOferta: React.Dispatch<React.SetStateAction<any>>;
    setModalPrestamo: React.Dispatch<React.SetStateAction<any>>;
    setModalNegociar: React.Dispatch<React.SetStateAction<any>>;
}
