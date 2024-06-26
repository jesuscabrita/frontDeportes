import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Box, CircularProgress } from '@mui/material';
import ContextRefac from '../../context/contextLogin';

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

export const WithAdmin = (WrappedComponent: any) => {
    return (props: any) => {
        const router = useRouter();
        const { state: { user } }: any = useContext(ContextRefac);
        const [isLoading, setIsLoading] = useState(true);

        useEffect(() => {
            if (!(user?.role === 'super_admin')) {
                router.push('/404');
            } else {
                setIsLoading(false);
            }
        }, [user, router]);

        if (isLoading) {
            return (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', opacity: 0.5, }}>
                    <CircularProgress color="inherit" size={110} thickness={1} sx={styles.spinner} />
                    <img src="/images/logo1.png" alt="logo" style={{ height: '80px', marginTop: '10px' }} />
                </Box>
            );
        }
        return <WrappedComponent {...props} />;
    };
};