import { Avatar, Grid } from "@mui/material";
import { useState } from "react";
import { stringAvatar } from "../../../utils/utils";

export const UserMenu = ({ handleLogout, user, router }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleMenuToggle = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleMenuClose = () => {
        setIsMenuOpen(false);
    };

    return (
        <Grid className="relative ml-3">
            <Grid>
                <button
                    type="button"
                    className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    id="user-menu-button"
                    aria-expanded={isMenuOpen}
                    aria-haspopup="true"
                    onClick={handleMenuToggle}
                    >
                    <Avatar {...stringAvatar(user?.nombre)} sx={{ height: '35px', width: '35px' }} />
                </button>
            </Grid>
            {isMenuOpen && (
                <Grid className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabIndex={-1}>
                    <Grid sx={{ cursor: 'pointer', '&:hover': { backgroundColor: 'var(--neutral)' } }} className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex={-1} id="user-menu-item-0"
                        onClick={() => { router.push("/perfil"); handleMenuClose();}}>
                        Perfil
                    </Grid>
                    {user?.role === 'super_admin' && 
                    <Grid className="block px-4 py-2 text-sm text-gray-700" sx={{ cursor: 'pointer', '&:hover': { backgroundColor: 'var(--neutral)' } }} role="menuitem" tabIndex={-1} id="user-menu-item-1"
                        onClick={() => { router.push("/usuarios"); handleMenuClose(); }}>
                        Usuarios
                    </Grid>}
                    <Grid className="block px-4 py-2 text-sm text-gray-700" sx={{ cursor: 'pointer', '&:hover': { backgroundColor: 'var(--neutral)' } }} role="menuitem" tabIndex={-1} id="user-menu-item-2"
                        onClick={() => { handleLogout(); handleMenuClose();}}>
                        Cerrar sesión
                    </Grid>
                </Grid>
            )}
        </Grid>
    );
};