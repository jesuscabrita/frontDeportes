import React, { useContext } from "react";
import { Button, useMediaQuery } from "@mui/material"
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