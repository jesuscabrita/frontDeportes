import React, { createContext, useEffect, useState, Dispatch, SetStateAction } from "react";

type ContextType = [boolean, Dispatch<SetStateAction<boolean>>];

const Context = createContext<ContextType>([false, () => { }]);

export const InfoContextProvider = ({ children }: { children: React.ReactNode }) => {
    const verifyLight = typeof window !== "undefined" ? localStorage.getItem("light") : null;
    const [light, setLight] = useState<boolean>(verifyLight === "false" ? false : true);

    useEffect(() => {
        const bodyElement = document.querySelector("body");
        if (bodyElement) {
            bodyElement.classList.toggle("light");
        }
    }, []);

    return (
        <Context.Provider value={[light, setLight]}>
            {children}
        </Context.Provider>
    );
};

export default Context;