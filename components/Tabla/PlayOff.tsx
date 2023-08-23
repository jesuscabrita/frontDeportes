import { Grid } from "@mui/material"

export const PlayOff = ({ data }) => {

    const equiposCuartos = data.slice(0, 8);
    const generarEnfrentamientosCuartos = (equiposCuartos) => {
        const enfrentamientos = [];
        const mitadEquipos = Math.floor(equiposCuartos.length / 2);

        for (let i = 0; i < mitadEquipos; i++) {
            const enfrentamiento = [equiposCuartos[i], equiposCuartos[equiposCuartos.length - 1 - i]];
            enfrentamientos.push(enfrentamiento);
        }

        return enfrentamientos;
    };

    const enfrentamientosCuartos = generarEnfrentamientosCuartos(equiposCuartos);



    const equiposSemis = data.slice(0, 2);
    const generarEnfrentamientosSemis = (equiposSemis) => {
        const enfrentamientos = [];
        const mitadEquipos = Math.floor(equiposSemis.length / 2);

        for (let i = 0; i < mitadEquipos; i++) {
            const enfrentamiento = [equiposSemis[i], equiposSemis[equiposSemis.length - 1 - i]];
            enfrentamientos.push(enfrentamiento);
        }

        return enfrentamientos;
    };

    const enfrentamientosSemis = generarEnfrentamientosSemis(equiposSemis);
    

    return (
        <Grid mt={2} sx={{display:'flex', justifyContent:'space-between'}}>
            <Grid item sx={{width:'100%'}}>
                {enfrentamientosCuartos.slice(0, 2).map((enfrentamiento, index) => (
                    <Grid item sx={{display:'flex',alignItems:'center',width:'100%'}}>
                        <Grid item key={index} mb={5} sx={{width:'110px'}}>
                            <Grid item sx={{display:'flex',alignItems:'center', flexDirection:'column',}}>
                                <img style={{ height: '60px' }} src={enfrentamiento[0].logo} alt={enfrentamiento[0].name} />
                                <Grid item sx={{color:'var(--neutral)', fontSize:'10px'}}>{enfrentamiento[0].name}</Grid>
                                <Grid item sx={{color:'var(--check)', fontWeight:'700',display:'flex',alignItems:'center'}}>VS</Grid>
                            </Grid>
                            <Grid item sx={{display:'flex',alignItems:'center', flexDirection:'column',}}>
                                <img style={{ height: '60px' }} src={enfrentamiento[1].logo} alt={enfrentamiento[1].name} />
                                <Grid item sx={{color:'var(--neutral)', fontSize:'10px'}}>{enfrentamiento[1].name}</Grid>
                            </Grid>
                        </Grid>

                        <Grid item sx={{border:'1px red solid',width:'180px'}}></Grid>
                        <Grid item sx={{borderLeft:'1px red solid',height:'60px',marginTop:index === 0 ?'60px':'-60px'}}></Grid>
                        <Grid item sx={{borderBottom:index === 0 &&'1px red solid',borderTop:index === 1 &&'1px red solid' ,width:'20px',height:'60px',marginTop:index === 0 ?'60px':'-60px'}}></Grid>
                        
                        <Grid mb={index === 0 ?-15:15} item sx={{display:'flex',alignItems:'center', flexDirection:'column',}}>
                            <img style={{ height: '60px' }} src={enfrentamiento[0].logo} alt={enfrentamiento[0].name} />
                            <Grid item sx={{color:'var(--neutral)', fontSize:'10px'}}>{enfrentamiento[0].name}</Grid>
                            {index === 0 && <Grid item sx={{color:'var(--check)', fontWeight:'700',display:'flex',alignItems:'center'}}>VS</Grid>}
                        </Grid>
                        {index === 0 && <Grid item sx={{border:'1px red solid',width:'100px',marginTop:index === 0 ?'200px':'-200px'}}></Grid>}
                        {index === 1 && <Grid item sx={{width:'200px',marginBottom:'200px'}}></Grid>}
                        {index === 0 &&
                        <Grid mb={-25} item sx={{display:'flex',alignItems:'center', flexDirection:'column'}}>
                            <img style={{ height: '60px' }} src={enfrentamiento[0].logo} alt={enfrentamiento[0].name} />
                            <Grid item sx={{color:'var(--neutral)', fontSize:'10px'}}>{enfrentamiento[0].name}</Grid>
                        </Grid>}
                    </Grid>
                ))}               
            </Grid>
            <Grid item  sx={{display:'flex',alignItems:'center', flexDirection:'column', justifyContent:'center'}}>
                <img style={{ height: '60px' }} src={enfrentamientosCuartos.slice(0, 2)[0][0].logo} alt={enfrentamientosCuartos.slice(0, 2)[0][0].name} />
                <Grid mb={10} item sx={{color:'var(--neutral)', fontSize:'10px'}}>{enfrentamientosCuartos.slice(0, 2)[0][0].name}</Grid>
                <Grid mb={25} item sx={{color:'var(--check)', fontWeight:'700',display:'flex',alignItems:'center'}}>VS</Grid>
            </Grid>
            <Grid item sx={{width:'100%'}}>
                {enfrentamientosCuartos.slice(0, 2).map((enfrentamiento, index) => (
                    <Grid item sx={{display:'flex',alignItems:'center',width:'100%'}}>
                        {index === 0 &&
                        <Grid mb={-25} item sx={{display:'flex',alignItems:'center', flexDirection:'column',}}>
                            <img style={{ height: '60px' }} src={enfrentamiento[0].logo} alt={enfrentamiento[0].name} />
                            <Grid item sx={{color:'var(--neutral)', fontSize:'10px'}}>{enfrentamiento[0].name}</Grid>
                        </Grid>}
                        {index === 0 && <Grid item sx={{border:'1px red solid',width:'100px',marginTop:index === 0 ?'200px':'-200px'}}></Grid>}
                        {index === 1 && <Grid item sx={{width:'200px',marginBottom:'200px'}}></Grid>}
                        <Grid mb={index === 0 ?-15:15} item sx={{display:'flex',alignItems:'center', flexDirection:'column',}}>
                            <img style={{ height: '60px' }} src={enfrentamiento[0].logo} alt={enfrentamiento[0].name} />
                            <Grid item sx={{color:'var(--neutral)', fontSize:'10px'}}>{enfrentamiento[0].name}</Grid>
                            {index === 0 && <Grid item sx={{color:'var(--check)', fontWeight:'700',display:'flex',alignItems:'center'}}>VS</Grid>}
                        </Grid>

                        <Grid item sx={{borderBottom:index === 0 &&'1px red solid',borderTop:index === 1 &&'1px red solid' ,width:'20px',height:'60px',marginTop:index === 0 ?'60px':'-60px'}}></Grid>
                        <Grid item sx={{borderRight:'1px red solid',height:'60px',marginTop:index === 0 ?'60px':'-60px'}}></Grid>
                        <Grid item sx={{border:'1px red solid',width:'180px'}}></Grid>

                        <Grid item key={index} mb={5} sx={{width:'110px'}}>
                            <Grid item sx={{display:'flex',alignItems:'center', flexDirection:'column',}}>
                                <img style={{ height: '60px' }} src={enfrentamiento[0].logo} alt={enfrentamiento[0].name} />
                                <Grid item sx={{color:'var(--neutral)', fontSize:'10px'}}>{enfrentamiento[0].name}</Grid>
                                <Grid item sx={{color:'var(--check)', fontWeight:'700',display:'flex',alignItems:'center'}}>VS</Grid>
                            </Grid>
                            <Grid item sx={{display:'flex',alignItems:'center', flexDirection:'column',}}>
                                <img style={{ height: '60px' }} src={enfrentamiento[1].logo} alt={enfrentamiento[1].name} />
                                <Grid item sx={{color:'var(--neutral)', fontSize:'10px'}}>{enfrentamiento[1].name}</Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                ))}               
            </Grid>
        </Grid>
    )
}