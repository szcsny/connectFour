import { createContext, useState, useContext, useEffect } from "react";

const defaultValues = {
    p1Color: "red",
    p2Color: "yellow",
    p1Name: "Player 1",
    p2Name: "Player 2",
    rounds: 10,
    timer: 20
}

const SettingsContext = createContext();

export const SettingsProvider = ({children}) => {
    const [config, setConfig] = useState(() => {
        return JSON.parse(localStorage.getItem("config")) || defaultValues;
    });

    useEffect(() => {
        localStorage.setItem("config", JSON.stringify(config));
    }, [config]);

    return (
        <SettingsContext.Provider value={{config, setConfig}}>
            {children}
        </SettingsContext.Provider>
    );
}

export function useSettings()
{
    const context = useContext(SettingsContext);
    if(!context)
    {
        throw new Error("useSettings must be used within a SettingsProvider");
    }
    return context;
}