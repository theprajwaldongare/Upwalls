import { createContext, useState,useEffect } from 'react';

export const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
    const [isSearchEnabled, setIsSearchEnabled] = useState(() => {
        const savedData = localStorage.getItem("upwallSettings")
        if (savedData) {
            const parsedData = JSON.parse(savedData)
            // setIsSearchEnabled(parsedData.search)
            return parsedData.search
        }
        // setIsSearchEnabled(true)
        return true
    });

    useEffect(() => {
        console.log("The val of searchED", isSearchEnabled)
        const dataToLocal = {
            "search": isSearchEnabled
        }
        localStorage.setItem("upwallSettings", JSON.stringify(dataToLocal))
    }, [isSearchEnabled])

    return (

        <SettingsContext.Provider value={{ isSearchEnabled, setIsSearchEnabled }}>
            {children}
        </SettingsContext.Provider>
    );
};