import React from "react";
import { Grid, Paper, SelectChangeEvent } from "@mui/material";
import { InputFields } from "../Material/InputFields";
import { InputSelects } from "../Material/InputSelect";
import { InputUpload } from "../Material/InputUpload";
import { ButtomPrimario } from "../Material/ButtonSend";
import { MdPlaylistAddCheckCircle } from "react-icons/md";
import { nuevoEquipo } from "../../utils/utilsEquipos";
import { IoTimerSharp } from "react-icons/io5";
import { FaCircleCheck } from "react-icons/fa6";
import { RegistrarEquipoProps } from "../../interfaces/general";

export const RegistrarEquipo: React.FC<RegistrarEquipoProps> = ({
    light,
    mobile,
    name,
    email,
    instagram,
    categoria,
    subCategoria,
    dataSubCategoria,
    logoAdded,
    imageName,
    user,
    image,
    crearEquipo,
    queryClient,
    isUserEmailInDataEnCola,
    isUserEmailInData,
    router,
    setName,
    setEmail,
    setInstagram,
    setCategoria,
    handleSelect,
    setImage,
    setLogoAdded,
    setImageName,
    handleImageChange,
    setIsLoading,
}) => {

    return (
        <Paper elevation={3} sx={{ padding: mobile ? "20px" : "40px", display: "flex", flexDirection: "column", alignItems: "center", background: light ? 'var(--gris)' : 'var(--dark2)' }}>
            <Grid item container alignItems={'center'} justifyContent={'center'}>
                <Grid item container alignItems={'center'} justifyContent={'center'}>
                    <img style={{ height: mobile ? '140px' : '150px' }} src={`/images/${light ? 'logoLight.png' : 'logoDark1.png'}`} alt="logo" />
                </Grid>
                <Grid item container alignItems={'center'} justifyContent={'center'} sx={{ color: light ? "var(--dark2)" : "var(--cero)", letterSpacing: '2px', fontSize: '20px', fontWeight: '500' }}>
                    Registrar equipo
                </Grid>
                {(!isUserEmailInData && !isUserEmailInDataEnCola) ?
                    <Grid item container mt={2} gap={2} alignItems={'center'} justifyContent={'center'}>
                        <Grid item container md={5}>
                            <InputFields
                                title="Nombre"
                                descripcion="Este es el nombre de tu equipo"
                                type="text"
                                setValue={setName}
                                value={name}
                            />
                        </Grid>
                        <Grid item container md={5}>
                            <InputFields
                                title="Email"
                                descripcion="Este es el email de tu equipo"
                                type="text"
                                setValue={setEmail}
                                value={email}
                            />
                        </Grid>
                        <Grid item container md={5}>
                            <InputFields
                                title="Categoria"
                                descripcion="Este es la categoria de tu equipo"
                                type="text"
                                setValue={setCategoria}
                                value={categoria}
                            />
                        </Grid>
                        <Grid item container md={5}>
                            <InputSelects
                                title="Sub-categoria"
                                descripcion="Seleccionar una Sub-categoria"
                                value={subCategoria}
                                data={dataSubCategoria}
                                handleSelect={handleSelect}
                            />
                        </Grid>
                        <Grid item container md={5}>
                            <InputUpload
                                title='Logo'
                                descripcion="Carga o arrastra aqui tu logo"
                                handleImageChange={handleImageChange}
                                imageName={imageName}
                                setImage={setImage}
                                setImageName={setImageName}
                                logoAdded={logoAdded}
                                setLogoAdded={setLogoAdded}
                            />
                        </Grid>
                        <Grid item container md={5}>
                            <InputFields
                                title="Instagram"
                                descripcion="Escriba su instagram"
                                type="text"
                                placeholder="Instagram"
                                setValue={setInstagram}
                                value={instagram}
                            />
                        </Grid>
                        <Grid item container md={5}>
                            <ButtomPrimario
                                title="Registrar"
                                handleclick={() => { nuevoEquipo(user?.equipo, image, user?.email, instagram, setIsLoading, crearEquipo, queryClient, setImage, setInstagram, setLogoAdded, setImageName, subCategoria, router, categoria) }}
                                icon={MdPlaylistAddCheckCircle}
                            />
                        </Grid>
                    </Grid>
                    :
                    <Grid item sx={{ color: light ? 'var(--dark2)' : 'var(--cero)', fontSize: '18px', height: mobile ? '60vh' : '70vh' }}>
                        <Grid item mt={6} mb={2} container alignItems={'center'} justifyContent={'center'}>
                            {isUserEmailInDataEnCola ? <IoTimerSharp size={mobile ? 160 : 200} /> : <FaCircleCheck size={mobile ? 160 : 200} />}
                        </Grid>
                        {isUserEmailInDataEnCola ? 'Tu equipo paso a lista de espera' : 'Ya tienes un equipo registrado'}
                    </Grid>
                }
            </Grid>
        </Paper>
    )
}