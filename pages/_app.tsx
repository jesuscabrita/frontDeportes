import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import es from "date-fns/locale/es";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { Layout } from "../components/Layout/Layout";
import "../styles/globals.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthenticatedApp } from "../components/auth/AuthenticatedApp";
import { useMemo } from "react";
// import { Auth0Provider } from "@auth0/auth0-react";
import { Analytics } from '@vercel/analytics/react';
import { InfoContextProvider } from "../context/contextPrincipal";

const MyApp = ({ Component, pageProps }) => {
    const origin = useMemo(() => {
        if (typeof window != "undefined") {
            return window.location.origin;
        }
    }, []);
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                refetchInterval: 60 * 60000,
                refetchIntervalInBackground: true,
            },
        },
    });

    return (
        <>
            {/* <Auth0Provider
                domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN}
                clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID}
                // redirectUri={origin}
                // audience="admin"
                // scope="openid profile email phone"
            > */}
                {/* <AuthenticatedApp> */}
                    <QueryClientProvider client={queryClient}>
                        <LocalizationProvider adapterLocale={es} dateAdapter={AdapterDateFns}>
                            <InfoContextProvider>
                                <Layout>
                                    <Component {...pageProps}/>
                                    <Analytics />
                                </Layout>
                            </InfoContextProvider>
                        </LocalizationProvider>
                    </QueryClientProvider>
                {/* </AuthenticatedApp> */}
            {/* </Auth0Provider> */}
        </>
    );
};
export default MyApp;