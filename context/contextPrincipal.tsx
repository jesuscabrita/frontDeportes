import { createContext, useEffect, useState } from "react";

const Context = createContext([]);

export const InfoContextProvider = ({ children }) => {
    const verifyLight = typeof window !== "undefined" ? localStorage.getItem("light") : null;
    const [light, setLight] = useState(verifyLight === "false" ? false : true);

    useEffect(() => {
        document.querySelector("body").classList.toggle("light");
    }, []);

    return (
        <Context.Provider value={[light, setLight]}>
            {children}
        </Context.Provider>
    );
};
export default Context;