import { Grid } from "@mui/material"

export const EquipoDetalle =({data})=>{
    return (
        <Grid>
            {data && data?.name}
        </Grid>
    )
}