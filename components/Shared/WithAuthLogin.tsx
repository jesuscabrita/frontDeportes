import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import ContextRefac from '../../context/contextLogin';

export const WithAuthLogin = (WrappedComponent) => {
    return (props) => {
        const { state: { user } }: any = useContext(ContextRefac);
        const router = useRouter();

        useEffect(() => {
            if (user) {
                router.push('/');
            }
        }, [user, router]);

        if (user) {
            return null;
        }

        return <WrappedComponent {...props} />;
    };
};