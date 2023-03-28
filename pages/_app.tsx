import { Layout } from "../components/Layout/Layout";
import "../styles/globals.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { InfoContextProvider } from "../context/contextPrincipal";

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
                <Layout>
                    <Component {...pageProps}/>
                </Layout>
            </InfoContextProvider>
        </QueryClientProvider>
    );
};
export default MyApp;