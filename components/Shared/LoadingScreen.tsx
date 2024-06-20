import React from 'react';
import { CircularProgress, Backdrop, Box } from '@mui/material';

export const LoadingScreen = () => {
    const styles = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'relative',
        },
        spinner: {
            position: 'absolute',
        },
    };

    return (
        <Backdrop sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, color: '#fff', }} open={true} >
            <Box display="flex" flexDirection="column" alignItems="center">
                <CircularProgress color="inherit" size={110} thickness={1} sx={styles.spinner} />
                <img src="/images/logo1.png" alt="logo" style={{ height: '80px', marginTop: '10px' }} />
            </Box>
        </Backdrop>
    );
};