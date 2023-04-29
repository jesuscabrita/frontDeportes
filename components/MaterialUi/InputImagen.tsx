import { Button, Grid } from "@mui/material";
import { RiImageAddFill as Add } from 'react-icons/ri';
import { IoMdImages as Images } from 'react-icons/io';
import { TiDeleteOutline as Delete } from 'react-icons/ti';
import { useContext } from "react";
import Context from "../../context/contextPrincipal";

export const InputImagen =({value, valueAdded, valueName, setValue, setValueAdded, setValueName})=>{
    const [light] = useContext(Context);

    const handleFotoChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            setValue(reader.result);
            setValueAdded(true); 
            setValueName(file.name);
        };
        reader.readAsDataURL(file);
    };

    return(
        <>
        {value && (
            <img src={value} alt="Logo del equipo" style={{ maxWidth: "150px", maxHeight: "150px" }} />
                )}
                <Button
                    variant="contained"
                    component="label"
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "10px",
                        background: "var(--dark2)",
                        "&:hover": { background: "var(--dark2hover)" },
                    }}
                >
                    <Add /> Agregue foto
                    <input hidden accept="image/*" multiple type="file" onChange={handleFotoChange} />
                </Button>
        {valueAdded && (
            <Grid container flexDirection={'column'}>
                <Grid item sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    color: 'var(--check)'
                }}>
                    Logo agregado correctamente
                    <Images size={25} />
                </Grid>
                <Grid item sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: light ? 'var(--dark2)' : 'var(--gris)'
                }}>
                    {valueName}
                </Grid>
                <Grid item sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--danger)',
                }}>
                    <Delete
                        size={30}
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                            setValue(null);
                            setValueAdded(false);
                            setValueName('');
                        }} />
                </Grid>
            </Grid>
        )}
        </>
    )
}