import { Grid } from "@mui/material"
import { useContext } from "react"
import Context from "../../context/contextPrincipal";
import Link from "next/link";

export const Equipos = ({ data }) => {
    const [light] = useContext(Context);

    return (
        <>
            {data.map((equipo) => (
                <Link href={`/manager/${equipo._id}`} key={equipo._id}>
                    <Grid
                        sx={{
                            display: "flex",
                            padding: "10px",
                            minHeight: "120px",
                            minWidth: "140px",
                            justifyContent: "center",
                            "&:hover": {
                                background: !light ? "var(--dark2)" : "var(--gris)",
                                borderRadius: "16px",
                            },
                        }}
                    >
                        <img
                            src={equipo.logo}
                            alt={equipo.name}
                            style={{ height: "80px", cursor: "pointer" }}
                        />
                    </Grid>
                </Link>
            ))}
        </>
    );
};