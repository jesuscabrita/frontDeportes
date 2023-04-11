import { createContext, useEffect, useState } from "react";

const Context = createContext([]);

export const InfoContextProvider = ({ children }) => {
    const verifyLight = typeof window !== "undefined" ? localStorage.getItem("light") : null;
    const [light, setLight] = useState(verifyLight === "false" ? false : true);

    useEffect(() => {
        // Agregar estas lineas para guardar el valor de light en localStorage
        localStorage.setItem("light", light.toString());
        document.querySelector("body").classList.toggle("light");
    }, [light]); // Agregar light como dependencia

    return (
        <Context.Provider value={[light, setLight]}>{children}</Context.Provider>
    );
};
export default Context;