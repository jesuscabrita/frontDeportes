import { Layout } from "../components/Layout/Layout";
import "../styles/globals.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { InfoContextProvider } from "../context/contextPrincipal";
import Head from "next/head";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'

const MyApp = ({ Component, pageProps }) => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                refetchInterval: 60 * 60000,
                refetchIntervalInBackground: true,
            },
        },
    });

    return (
        <LocalizationProvider dateAdapter={AdapterMoment}>
            <QueryClientProvider client={queryClient}>
                <InfoContextProvider>
                    <Head>
                        <title>La liga</title>
                        <link rel="icon" type="image/x-icon" href="https://assets.laliga.com/assets/logos/laliga-v/laliga-v-1200x1200.png" />
                    </Head>
                    <Layout>
                        <Component {...pageProps}/>
                    </Layout>
                </InfoContextProvider>
            </QueryClientProvider>
        </LocalizationProvider>
    );
};
export default MyApp;