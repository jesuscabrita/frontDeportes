import React, { useContext, useState } from "react";
import { Button, CircularProgress, Grid, useMediaQuery } from "@mui/material"
import Context from "../../context/contextPrincipal";

export const ButtonSend = ({ title, handle, disable, icon: IconComponent, iconSize, iconColor }) => {
    const [light] = useContext(Context);
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });

    return (
        <Button
            disabled={disable}
            onClick={handle}
            sx={{
                whiteSpace: 'nowrap',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                color: light ? 'var(--dark2)' : 'var(--neutral)',
                border: disable ? 'none' : 'solid 1px var(--neutral)',
                fontSize: mobile ? '9px' : '12px',
            }}
        >
            {title}
            {IconComponent && (
                <IconComponent size={iconSize} color={disable ? 'var(--dark3)' : iconColor} />
            )}
        </Button>
    );
};

interface ButtomProps {
    title: string;
    handleclick: () => void;
    width?: string;
    widthBorder?: string;
    disabled?: boolean;
    isLoading?: boolean;
    icon?: React.ElementType;
    iconSize?: number;
    iconColor?: string;
}

export const ButtomPrimario: React.FC<ButtomProps> = ({ title, handleclick, width, widthBorder, disabled = false, isLoading = false, icon: IconComponent, iconSize = 24, iconColor }) => {
    const [isClicked, setIsClicked] = useState(false);
    const [light] = useContext(Context);

    const handleMouseDown = () => {
        if (!disabled) {
            setIsClicked(true);
        }
    };

    const handleMouseUp = () => {
        if (!disabled) {
            handleclick();
            setTimeout(() => setIsClicked(false), 8000);
        }
    };

    return (
        <Grid
            item
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={() => setIsClicked(false)}
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '8px',
                width: widthBorder ? widthBorder : '100%',
                height: '50px',
                border: isClicked ? (light ? '1px solid var(--dark2)' : '1px solid #aab4be') : 'none',
            }}>
            <Grid
                item
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '45px',
                    borderRadius: '7px',
                    background: disabled ? (light ? '#1f293790 !important' : '#aab4be58 !important') : light ? 'var(--dark2) !important' : '#aab4be !important',
                    color: disabled ? (light ? '#d1d1d186' : '#1f293781') : light ? '#FEFEFE' : 'var(--dark2)',
                    fontSize: '16px',
                    cursor: disabled ? 'no-drop' : 'pointer',
                    gap: '10px',
                    width: width ? width : '100%',
                    userSelect: 'none',
                    fontWeight: '600',
                    '&:hover': {
                        background: disabled ? '#E1E3E3' : light ? 'var(--dark4) !important' : 'var(--gris2) !important'
                    }
                }}
            >
                {isLoading && <CircularProgress size={25} color="inherit" />}
                {title}
                {IconComponent && (
                    <IconComponent size={iconSize} color={disabled ? 'var(--dark3)' : iconColor} />
                )}
            </Grid>
        </Grid>
    )
}

export const ButtomSecundario: React.FC<ButtomProps> = ({ title, handleclick, width, widthBorder, disabled = false, isLoading = false, icon: IconComponent, iconSize = 24, iconColor }) => {
    const [isClicked, setIsClicked] = useState(false);
    const [light] = useContext(Context);

    const handleMouseDown = () => {
        if (!disabled) {
            setIsClicked(true);
        }
    };

    const handleMouseUp = () => {
        if (!disabled) {
            handleclick();
            setTimeout(() => setIsClicked(false), 8000);
        }
    };

    return (
        <Grid
            item
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={() => setIsClicked(false)}
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '8px',
                width: widthBorder ? widthBorder : '100%',
                height: '50px',
                border: isClicked ? (light ? '1px solid var(--dark2)' : '1px solid #aab4be') : 'none',
            }}>
            <Grid
                item
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '45px',
                    borderRadius: '7px',
                    border: disabled ? (light ? '1px #1f29376f solid' : '1px #d1d1d13d solid') : light ? '1px var(--dark2) solid' : '1px var(--gris) solid',
                    background: disabled ? '#e1e3e34 !important' : light ? 'transparent !important' : 'transparent !important',
                    color: disabled ? (light ? '#1f29376f' : '#d1d1d13d') : light ? 'var(--dark2)' : 'var(--cero)',
                    fontSize: '16px',
                    cursor: disabled ? 'no-drop' : 'pointer',
                    gap: '10px',
                    width: width ? width : '100%',
                    userSelect: 'none',
                    fontWeight: '600',
                    '&:hover': {
                        background: disabled ? 'none' : light ? '#aab4be !important' : '#aab4be2d !important'
                    }
                }}
            >
                {isLoading && <CircularProgress size={25} color="inherit" />}
                {title}
                {IconComponent && (
                    <IconComponent size={iconSize} color={disabled ? 'var(--dark3)' : iconColor} />
                )}
            </Grid>
        </Grid>
    )
}

export const ButtomDanger: React.FC<ButtomProps> = ({ title, handleclick, width, widthBorder, disabled = false, isLoading = false, icon: IconComponent, iconSize = 24, iconColor }) => {
    const [isClicked, setIsClicked] = useState(false);
    const [light] = useContext(Context);

    const handleMouseDown = () => {
        if (!disabled) {
            setIsClicked(true);
        }
    };

    const handleMouseUp = () => {
        if (!disabled) {
            handleclick();
            setTimeout(() => setIsClicked(false), 8000);
        }
    };

    return (
        <Grid
            item
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={() => setIsClicked(false)}
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '8px',
                width: widthBorder ? widthBorder : '100%',
                height: '50px',
                border: isClicked ? (light ? '1px solid var(--danger)' : '1px solid #bb415e') : 'none',
            }}>
            <Grid
                item
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '45px',
                    borderRadius: '7px',
                    background: disabled ? '#bb415d73 !important' : light ? 'var(--danger) !important' : '#bb415e !important',
                    color: disabled ? '#d1d1d17e' : light ? '#FEFEFE' : '#FEFEFE',
                    fontSize: '16px',
                    cursor: disabled ? 'no-drop' : 'pointer',
                    gap: '10px',
                    width: width ? width : '100%',
                    userSelect: 'none',
                    fontWeight: '600',
                    '&:hover': {
                        background: disabled ? '#E1E3E3' : light ? '#b74848f2 !important' : '#bb415dba !important'
                    }
                }}
            >
                {isLoading && <CircularProgress size={25} color="inherit" />}
                {title}
                {IconComponent && (
                    <IconComponent size={iconSize} color={disabled ? 'var(--dark3)' : iconColor} />
                )}
            </Grid>
        </Grid>
    )
}

export const ButtomWarnnig: React.FC<ButtomProps> = ({ title, handleclick, width, widthBorder, disabled = false, isLoading = false, icon: IconComponent, iconSize = 24, iconColor }) => {
    const [isClicked, setIsClicked] = useState(false);
    const [light] = useContext(Context);

    const handleMouseDown = () => {
        if (!disabled) {
            setIsClicked(true);
        }
    };

    const handleMouseUp = () => {
        if (!disabled) {
            handleclick();
            setTimeout(() => setIsClicked(false), 8000);
        }
    };

    return (
        <Grid
            item
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={() => setIsClicked(false)}
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '8px',
                width: widthBorder ? widthBorder : '100%',
                height: '50px',
                border: isClicked ? (light ? '1px solid #a57128' : '1px solid #90662b') : 'none',
            }}>
            <Grid
                item
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '45px',
                    borderRadius: '7px',
                    background: disabled ? '#a5712855 !important' : light ? '#a57128 !important' : '#90662b !important',
                    color: disabled ? '#d1d1d17d' : light ? '#FEFEFE' : '#FEFEFE',
                    fontSize: '16px',
                    cursor: disabled ? 'no-drop' : 'pointer',
                    gap: '10px',
                    width: width ? width : '100%',
                    userSelect: 'none',
                    fontWeight: '600',
                    '&:hover': {
                        background: disabled ? '#E1E3E3' : light ? '#a57128ec !important' : '#90662ba2 !important'
                    }
                }}
            >
                {isLoading && <CircularProgress size={25} color="inherit" />}
                {title}
                {IconComponent && (
                    <IconComponent size={iconSize} color={disabled ? 'var(--dark3)' : iconColor} />
                )}
            </Grid>
        </Grid>
    )
}