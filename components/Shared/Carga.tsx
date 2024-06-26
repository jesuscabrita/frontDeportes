import React from "react";
import { CircularProgress } from "@mui/material";

export const Carga = () => {
    const styles = {
        spinner: {
            position: 'absolute',
        },
    };
    return (
        <>
            <CircularProgress color="inherit" size={110} thickness={1} sx={styles.spinner} />
            <img src="/images/logo1.png" alt="logo" style={{ height: '80px', marginTop: '10px' }} />
        </>
    )
}