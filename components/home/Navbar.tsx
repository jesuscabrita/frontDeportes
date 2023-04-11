import { Disclosure } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Grid } from '@mui/material';
import { ButtonNavbar } from './ButtonNavbar';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useContext } from 'react';
import Context from '../../context/contextPrincipal';
import { MaterialUISwitch } from './MaterialUISwitch';

export const Navbar = () => {
    const [light, setLight] = useContext(Context);

    const setChangeDark = () => {
        setLight(light ? false : true);
        localStorage.setItem("light", "false");
    };

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
                            <Grid className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
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
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                <FormControlLabel
                                    onClick={() => setChangeDark()}
                                    label=""
                                    control={<MaterialUISwitch sx={{ m: 1 }} defaultChecked={!light ? true : false} />}
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