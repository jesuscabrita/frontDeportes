import { Layout } from "../components/Layout/Layout";
import "../styles/globals.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { InfoContextProvider } from "../context/contextPrincipal";
import Head from "next/head";

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
    );
};
export default MyApp;