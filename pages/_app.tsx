import React from "react";
import Head from "next/head";
import "../styles/globals.css";
import { Layout } from "../components/Layout/Layout";
import { QueryClient, QueryClientProvider } from "react-query";
import { InfoContextProvider } from "../context/contextPrincipal";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { InfoContextRefac } from "../context/contextLogin";
import { AppProps } from 'next/app';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#dc004e',
        },
        action: {
            hover: '#f5f5f5',
        },
    },
});

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                refetchInterval: 60 * 60000,
                refetchIntervalInBackground: true,
            },
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <LocalizationProvider dateAdapter={AdapterMoment}>
                <QueryClientProvider client={queryClient}>
                    <InfoContextProvider>
                        <Head>
                            <title>La liga</title>
                            <link rel="icon" type="image/x-icon" href="/images/logo1.png" />
                        </Head>
                        <InfoContextRefac>
                            <Layout>
                                <Component {...pageProps} />
                            </Layout>
                        </InfoContextRefac>
                    </InfoContextProvider>
                </QueryClientProvider>
            </LocalizationProvider>
        </ThemeProvider>
    );
};

export default MyApp;