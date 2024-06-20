import React, { useContext, useEffect, useState, useRef } from 'react';
import { Disclosure } from '@headlessui/react';
import { Grid, useMediaQuery, Avatar, FormControlLabel } from '@mui/material';
import { ButtonNavbar } from './ButtonNavbar';
import { MaterialUISwitch } from './MaterialUISwitch';
import { useMutation } from 'react-query';
import { logoutRequest } from '../../../service/session';
import { useRouter } from 'next/router';
import { UserMenu } from './UserMenu';
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { stringAvatar } from '../../../utils/utils';
import ContextRefac from '../../../context/contextLogin';
import Context from '../../../context/contextPrincipal';
import { CustomButton, CustomButtonDark } from './CustomButton';
import { LoadingScreen } from '../../Shared/LoadingScreen';

export const Navbar = () => {
    const [light, setLight] = useContext(Context);
    const [isOpen, setIsOpen] = useState(false);
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });
    const { state: { user }, dispatch }: any = useContext(ContextRefac);
    const { mutate: cerrarSesion } = useMutation(logoutRequest);
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(!!user);
    const [position, setPosition] = useState<DOMRect>();
    const ref1 = useRef<HTMLDivElement>(null);
    const ref2 = useRef<HTMLDivElement>(null);
    const ref3 = useRef<HTMLDivElement>(null);
    const ref4 = useRef<HTMLDivElement>(null);
    const ref5 = useRef<HTMLDivElement>(null);
    const ref6 = useRef<HTMLDivElement>(null);
    const ref7 = useRef<HTMLDivElement>(null);
    const ref8 = useRef<HTMLDivElement>(null);
    const ref9 = useRef<HTMLDivElement>(null);
    const current_view = useSelector<any>((store) => store.section.current_view);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (ref1.current) {
            const refs = [ref1, ref2, ref3, ref4, ref5, ref6, ref7, ref8, ref9];
            refs.forEach((r) => {
                r.current?.addEventListener('mouseenter', (e: any) => {
                    setPosition(e.target?.getBoundingClientRect());
                });
            });
            const target_ref = refs.find((r) => r.current?.id === current_view);
            const target_bounds = target_ref?.current?.getBoundingClientRect();
            setPosition(target_bounds);
        }
    }, [current_view]);

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

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        setIsLoggedIn(!!user);
    }, [user]);

    useEffect(() => {
        const mediaQuery = window?.matchMedia('(min-width: 640px)');
        const closeMenuOnLargeScreen = () => {
            if (mediaQuery.matches && isOpen) {
                setIsOpen(false);
            }
        };
        mediaQuery.addEventListener('change', closeMenuOnLargeScreen);
        return () => {
            mediaQuery.removeEventListener('change', closeMenuOnLargeScreen);
        };
    }, [isOpen]);

    useEffect(() => {
        const handleStartLoading = () => {
            setIsLoading(true);
        };

        const handleStopLoading = () => {
            setIsLoading(false);
        };

        const startLoadingOnRouteChange = () => {
            router.events.on('routeChangeStart', handleStartLoading);
            router.events.on('routeChangeComplete', handleStopLoading);
            router.events.on('routeChangeError', handleStopLoading);
        };
        startLoadingOnRouteChange();

        return () => {
            router.events.off('routeChangeStart', handleStartLoading);
            router.events.off('routeChangeComplete', handleStopLoading);
            router.events.off('routeChangeError', handleStopLoading);
        };
    }, [router]);

    return (
        <Disclosure as="nav" style={{ background: light ? 'var(--light)' : 'var(--dark2)' }} className="fixed top-0 left-0 right-0 z-10">
            <>
                <Grid className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                    {!mobile && (
                        <motion.div style={{ background: '#9a6d79' }}
                            className="absolute opacity-40 rounded z-20 pointer-events-none"
                            animate={{
                                top: position?.top,
                                left: position?.left,
                                width: position?.width,
                                height: position?.height,
                                right: position?.right,
                                bottom: position?.bottom,
                            }}
                        />
                    )}
                    <Grid className="relative flex h-16 items-center justify-between">
                        <Grid className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                            {!light ? <CustomButton isOpen={isOpen} toggle={toggleMenu} /> : <CustomButtonDark isOpen={isOpen} toggle={toggleMenu} />}
                        </Grid>
                        <Grid className="flex flex-1 items-center justify-center sm:items-sr4tretch sm:justify-start">
                            <Grid className="flex flex-shrink-0 items-center">
                                <img
                                    style={{ height: '60px', width: '42px' }}
                                    className="block w-auto lg:hidden"
                                    src={light ?
                                        "/images/logo1.png" :
                                        "/images/logo2.png"
                                    }
                                    alt="Your Company"
                                />
                                <img
                                    style={{ height: '60px', width: '42px' }}
                                    className="hidden lg:block"
                                    src={light ?
                                        "/images/logo1.png" :
                                        "/images/logo2.png"
                                    }
                                    alt="Your Company"
                                />
                            </Grid>
                            <Grid className="hidden sm:ml-6 sm:block">
                                <Grid className="flex space-x-4">
                                    <ButtonNavbar href='/' handleOpenRuta={toggleMenu} mobile={false}>
                                        <div ref={ref1} id="A" style={{ padding: '6px' }}>
                                            Home
                                        </div>
                                    </ButtonNavbar>
                                    <ButtonNavbar href='/calendario' handleOpenRuta={toggleMenu} mobile={false}>
                                        <div ref={ref2} id="B" style={{ padding: '6px' }}>
                                            Calendario
                                        </div>
                                    </ButtonNavbar>
                                    <ButtonNavbar href='/tabla' handleOpenRuta={toggleMenu} mobile={false}>
                                        <div ref={ref3} id="C" style={{ padding: '6px' }}>
                                            Tabla
                                        </div>
                                    </ButtonNavbar>
                                    <ButtonNavbar href='/noticias' handleOpenRuta={toggleMenu} mobile={false}>
                                        <div ref={ref4} id="D" style={{ padding: '6px' }}>
                                            Noticias
                                        </div>
                                    </ButtonNavbar>
                                    {isLoggedIn && user &&
                                        <ButtonNavbar href='/manager/registrar' handleOpenRuta={toggleMenu} mobile={false}>
                                            <div ref={ref5} id="E" style={{ padding: '6px' }}>
                                                Registrar equipo
                                            </div>
                                        </ButtonNavbar>}
                                    {isLoggedIn && user &&
                                        <ButtonNavbar href='/libres' handleOpenRuta={toggleMenu} mobile={false}>
                                            <div ref={ref6} id="F" style={{ padding: '6px' }}>
                                                J. Libre
                                            </div>
                                        </ButtonNavbar>}
                                    {isLoggedIn && (user?.role === 'super_admin' || user?.role === 'admin') &&
                                        <ButtonNavbar href='/admin/panel' handleOpenRuta={toggleMenu} mobile={false}>
                                            <div ref={ref7} id="G" style={{ padding: '6px' }}>
                                                Panel
                                            </div>
                                        </ButtonNavbar>}
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                            <FormControlLabel
                                onClick={() => setChangeDark()}
                                label=""
                                control={<MaterialUISwitch light={light} sx={{ m: 1 }} defaultChecked={light ? true : false} />}
                            />
                            {isLoggedIn && !mobile ? (
                                <UserMenu handleLogout={handleLogout} user={user} router={router} />
                            ) : (
                                !mobile &&
                                <ButtonNavbar href="/login" handleOpenRuta={toggleMenu} mobile={false}>
                                    <div ref={ref8} id="G" style={{ padding: '6px' }}>
                                        Login
                                    </div>
                                </ButtonNavbar>
                            )}
                        </Grid>
                    </Grid>
                </Grid>
                {isOpen &&
                    <Grid className="space-y-1 px-2 pt-2 pb-3">
                        {!isLoggedIn && <ButtonNavbar href='/login' handleOpenRuta={toggleMenu} mobile={true}>Login</ButtonNavbar>}
                        <ButtonNavbar href='/' handleOpenRuta={toggleMenu} mobile={true}>Home</ButtonNavbar>
                        <ButtonNavbar href='/calendario' handleOpenRuta={toggleMenu} mobile={true}>Calendario</ButtonNavbar>
                        <ButtonNavbar href='/tabla' handleOpenRuta={toggleMenu} mobile={true}>Tabla</ButtonNavbar>
                        <ButtonNavbar href='/noticias' handleOpenRuta={toggleMenu} mobile={true}>Noticias</ButtonNavbar>
                        {isLoggedIn && user && <ButtonNavbar href='/manager/registrar' handleOpenRuta={toggleMenu} mobile={true}>Registrar equipo</ButtonNavbar>}
                        {isLoggedIn && user && <ButtonNavbar href='/libres' handleOpenRuta={toggleMenu} mobile={true}>J. Libre</ButtonNavbar>}
                        {isLoggedIn && (user?.role === 'super_admin' || user?.role === 'admin') && <ButtonNavbar href='/admin/panel' handleOpenRuta={toggleMenu} mobile={true}>Panel</ButtonNavbar>}
                        {isLoggedIn &&
                            <>
                                <Grid item sx={{ border: light ? '1px solid var(--dark2)' : '1px solid var(--cero)' }} />
                                <Grid item sx={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primario)', paddingTop: '10px' }}>
                                    <Avatar {...stringAvatar(user?.nombre)} sx={{ height: '35px', width: '35px' }} />
                                    <Grid item sx={{ color: light ? "var(--dark2)" : "white", fontWeight: '700', letterSpacing: '2px', }}>{`${user?.nombre} ${user?.apellido}`}</Grid>
                                </Grid>
                                <ButtonNavbar href='/perfil' handleOpenRuta={toggleMenu} mobile={true}>Perfil</ButtonNavbar>
                                {user?.role === 'super_admin' && <ButtonNavbar href='/admin/usuarios' handleOpenRuta={toggleMenu} mobile={true}>Usuarios</ButtonNavbar>}
                                <Grid onClick={() => { handleLogout(); }} item sx={{ color: light ? "var(--dark2)" : "white", cursor: 'pointer', display: "block", padding: "8px 12px 8px 12px", fontSize: "12px", letterSpacing: '2px', fontWeight: light ? '900' : '400' }}>
                                    Cerrar cesion
                                </Grid>
                            </>}
                    </Grid>
                }
            </>
            {isLoading && <LoadingScreen />}
        </Disclosure>
    )
}