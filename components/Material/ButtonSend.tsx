import { Button } from "@mui/material"
import { useContext } from "react";
import Context from "../../context/contextPrincipal";


export const ButtonSend = ({ title, handle, disable, icon: IconComponent, iconSize, iconColor }) => {
    const [light] = useContext(Context);

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
                border: disable? 'none': 'solid 1px var(--neutral)'
            }}
        >
            {title}
            {IconComponent && (
                <IconComponent size={iconSize} color={iconColor} />
            )}
        </Button>
    );
};