import { Disclosure } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Grid } from '@mui/material';
import { ButtonNavbar } from './ButtonNavbar';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { styled } from '@mui/material/styles';
import { useContext } from 'react';
import Context from '../../context/contextPrincipal';

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
    width: 62,
    height: 34,
    padding: 7,
    '& .MuiSwitch-switchBase': { margin: 1, padding: 0,transform: 'translateX(6px)',
        '&.Mui-checked': { color: '#fff', transform: 'translateX(22px)',
            '& .MuiSwitch-thumb:before': {
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
            '#fff',
            )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
        },
        '& + .MuiSwitch-track': { opacity: 1, backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',},
        },
    },
    '& .MuiSwitch-thumb': {
    backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
    width: 32,
    height: 32,
    '&:before': {
        content: "''",
        position: 'absolute',
        width: '100%',
        height: '100%',
        left: 0,
        top: 0,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        '#fff',
        )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
    },
    '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
    borderRadius: 20 / 2,
    },
}));

export const Navbar = () => {
    const [light, setLight] = useContext(Context);

    const setChangeDark = () => {
        setLight(light ? false : true);
        localStorage.setItem("light", "false");
    };

return (
    <Disclosure as="nav" className="bg-gray-800">
        {({ open }) => (
        <>
            <Grid className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <Grid className="relative flex h-16 items-center justify-between">
                    <Grid className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                            <Grid className="sr-only">Open main menu</Grid>
                                {open ? (
                                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                ) : (
                                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                )}
                        </Disclosure.Button>
                    </Grid>
                    <Grid className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                        <Grid className="flex flex-shrink-0 items-center">
                            <img
                                className="block h-8 w-auto lg:hidden"
                                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                                alt="Your Company"
                            />
                            <img
                                className="hidden h-8 w-auto lg:block"
                                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                                alt="Your Company"
                            />
                        </Grid>
                        <Grid className="hidden sm:ml-6 sm:block">
                            <Grid className="flex space-x-4">
                                <ButtonNavbar href='/'>Home</ButtonNavbar>
                                <ButtonNavbar href='/calendario'>Calendario</ButtonNavbar>
                                <ButtonNavbar href='/tabla'>Tabla</ButtonNavbar>
                                <ButtonNavbar href='/noticias'>Noticias</ButtonNavbar>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        <FormControlLabel 
                        control={<MaterialUISwitch 
                        sx={{ m: 1 }} defaultChecked={!light ? true : false} />} 
                        label=''
                        onClick={() => setChangeDark()} 
                        />
                    </Grid>
                </Grid>
            </Grid>
            <Disclosure.Panel className="sm:hidden">
                <Grid className="space-y-1 px-2 pt-2 pb-3">                      
                    <ButtonNavbar href='/'>Home</ButtonNavbar>
                    <ButtonNavbar href='/calendario'>Calendario</ButtonNavbar>
                    <ButtonNavbar href='/tabla'>Tabla</ButtonNavbar>
                    <ButtonNavbar href='/noticias'>Noticias</ButtonNavbar>
                </Grid>
            </Disclosure.Panel>
        </>
        )}
    </Disclosure>
    )
}