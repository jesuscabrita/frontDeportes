import React, { useContext } from "react";
import { Grid, useMediaQuery } from "@mui/material"
import Context from "../../context/contextPrincipal";

export const MenuTabla = ({ opcion, valueSelect, handleChange }) => {
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });
    const [light] = useContext(Context);

    return (
        <Grid
            item
            key={opcion.name}
            id={opcion.name}
            sx={{
                width: !mobile ? '150px' : '60px',
                background: !light && valueSelect === opcion.id ? 'var(--dark4)' : light && valueSelect === opcion.id ? 'var(--gris3)' : '',
                height: '48px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderBottom: light && valueSelect === opcion.id ? '3px solid var(--dark2)' : valueSelect === opcion.id ? '3px solid var(--cero)' : 'none',
                color: !light && valueSelect === opcion.id ? 'var(--cero)' : light && valueSelect === opcion.id ? 'var(--dark2)' : light ? 'var(--dark3)' : 'var(--neutral)',
                cursor: 'pointer',
                gap: '8px',
                fontSize: mobile ? '15px' : '12px',
            }}
            onClick={() => handleChange(opcion.id)}
        >
            {opcion.icono} {!mobile && opcion.name}
        </Grid>
    )
}