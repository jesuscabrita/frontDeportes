import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import ContextRefac from '../../context/contextLogin';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

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
                    <CircularProgress />
                </Box>
            );
        }

        return <WrappedComponent {...props} />;
    };
};