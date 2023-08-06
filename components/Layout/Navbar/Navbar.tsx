import { Disclosure } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Grid, useMediaQuery, Avatar } from '@mui/material';
import { ButtonNavbar } from './ButtonNavbar';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useContext, useEffect, useState } from 'react';
import Context from '../../../context/contextPrincipal';
import { MaterialUISwitch } from './MaterialUISwitch';
import ContextRefac from '../../../context/contextLogin';
import { useMutation } from 'react-query';
import { logoutRequest } from '../../../service/session';
import { useRouter } from 'next/router';
import { UserMenu } from './UserMenu';
import { stringAvatar } from '../../../utils/utils';

export const Navbar = () => {
    const [light, setLight] = useContext(Context);
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });
    const { state: { user },dispatch }: any = useContext(ContextRefac);
    const { mutate:cerrarSesion } = useMutation(logoutRequest);
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(!!user);

    const setChangeDark = () => {
        setLight(light ? false : true);
        localStorage.setItem("light", "false");
    };

    const handleLogout = () => {
        cerrarSesion();
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("lastActivity");
        setIsLoggedIn(false);
        dispatch({ type: "SET_USER", payload: null });
        dispatch({ type: "LOGOUT" })
        router.push("/login");
    }

    useEffect(() => {
        setIsLoggedIn(!!user);
    }, [user]);

    return (
        <Disclosure as="nav" className="bg-gray-800 fixed top-0 left-0 right-0 z-10">
            {({ open }) => (
                <>
                    <Grid className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                        <Grid className="relative flex h-16 items-center justify-between">
                            <Grid className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                    {open ? (
                                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                    ) : (
                                        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                    )}
                                </Disclosure.Button>
                            </Grid>
                            <Grid className="flex flex-1 items-center justify-center sm:items-sr4tretch sm:justify-start">
                                <Grid className="flex flex-shrink-0 items-center">
                                    <img
                                        className="block h-8 w-auto lg:hidden"
                                        src={light ?
                                            "https://assets.laliga.com/assets/logos/laliga-v/laliga-v-1200x1200.png" :
                                            "https://assets.laliga.com/assets/logos/laliga-v-negativo-monocolor/laliga-v-negativo-monocolor-1200x1200.png"
                                        }
                                        alt="Your Company"
                                    />
                                    <img
                                        className="hidden h-8 w-auto lg:block"
                                        src={light ?
                                            "https://assets.laliga.com/assets/logos/laliga-v/laliga-v-1200x1200.png" :
                                            "https://assets.laliga.com/assets/logos/laliga-v-negativo-monocolor/laliga-v-negativo-monocolor-1200x1200.png"
                                        }
                                        alt="Your Company"
                                    />
                                </Grid>
                                <Grid className="hidden sm:ml-6 sm:block">
                                    <Grid className="flex space-x-4">
                                        <ButtonNavbar href='/'>Home</ButtonNavbar>
                                        <ButtonNavbar href='/calendario'>Calendario</ButtonNavbar>
                                        <ButtonNavbar href='/tabla'>Tabla</ButtonNavbar>
                                        <ButtonNavbar href='/noticias'>Noticias</ButtonNavbar>
                                        {isLoggedIn && user && <ButtonNavbar href='/manager/registrar'>Registrar equipo</ButtonNavbar>}
                                        {isLoggedIn && (user?.role === 'super_admin' || user?.role === 'admin') && <ButtonNavbar href='/admin/panel'>Panel</ButtonNavbar>}
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                <FormControlLabel
                                    onClick={() => setChangeDark()}
                                    label=""
                                    control={<MaterialUISwitch sx={{ m: 1 }} defaultChecked={!light ? true : false} />}
                                />
                                {isLoggedIn && !mobile ? (
                                <UserMenu handleLogout={handleLogout} user={user} router={router} />
                                ) : (
                                !mobile && <ButtonNavbar href="/login">Login</ButtonNavbar>
                                )}
                            </Grid>
                        </Grid>
                    </Grid>
                    <Disclosure.Panel className="sm:hidden">
                        <Grid className="space-y-1 px-2 pt-2 pb-3">
                            {!isLoggedIn && <ButtonNavbar href='/login'>Login</ButtonNavbar>}
                            <ButtonNavbar href='/'>Home</ButtonNavbar>
                            <ButtonNavbar href='/calendario'>Calendario</ButtonNavbar>
                            <ButtonNavbar href='/tabla'>Tabla</ButtonNavbar>
                            <ButtonNavbar href='/noticias'>Noticias</ButtonNavbar>
                            {isLoggedIn && user &&<ButtonNavbar href='/manager/registrar'>Registrar equipo</ButtonNavbar>}
                            {isLoggedIn && (user?.role === 'super_admin' || user?.role === 'admin') &&<ButtonNavbar href='/admin/panel'>Panel</ButtonNavbar>}
                            {isLoggedIn &&
                            <>
                            <Grid item sx={{ border: '1px solid var(--primario)' }} />
                            <Grid item sx={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primario)', paddingTop: '10px' }}>
                                <Avatar {...stringAvatar(user?.nombre)} sx={{ height: '35px', width: '35px' }} />
                                <Grid>{`${user?.nombre} ${user?.apellido}`}</Grid>
                            </Grid>
                            <ButtonNavbar href='/perfil'>Perfil</ButtonNavbar>
                            {user?.role === 'super_admin' && <ButtonNavbar href='/admin/usuarios'>Usuarios</ButtonNavbar>}
                            <Grid onClick={() => { handleLogout(); } } className="text-blue hover:bg-gray-700" item sx={{ color: 'var(--primario)', cursor: 'pointer', display: "block", padding: "8px 12px 8px 12px", borderRadius: "6px", fontSize: "16px" }}>
                                Cerrar cesion
                            </Grid>
                            </>}
                        </Grid>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    )
}