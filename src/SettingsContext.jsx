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

    const [isWeatherEnabled, setIsWeatherEnabled] = useState(() => {
        const savedData = localStorage.getItem("upwallSettings")
        if (savedData) {
            const parsedData = JSON.parse(savedData)
            return parsedData.weather
        }
        return false
    });

    const [cityInp, setCityInp] = useState(()=>{
        const savedData = localStorage.getItem("upwallSettings")
        if (savedData) {
            const parsedData = JSON.parse(savedData)
            return parsedData.city
        }
        return ""
    })

    const [links, setLinks] = useState(()=>{
        const savedData = localStorage.getItem("upwallSettings")
        if (savedData) {
            const parsedData = JSON.parse(savedData)
            return parsedData.links || []
        }
        return []
    })


    useEffect(() => {
        console.log("The val of searchED", isSearchEnabled,isWeatherEnabled,cityInp)
        const dataToLocal = {
            "search": isSearchEnabled,
            "weather":isWeatherEnabled,
            "city":cityInp,
            "links":links
        }
        localStorage.setItem("upwallSettings", JSON.stringify(dataToLocal))
        console.log(links)
    }, [isSearchEnabled,isWeatherEnabled,cityInp,links])

    return (

        <SettingsContext.Provider value={{ isSearchEnabled, setIsSearchEnabled,isWeatherEnabled,setIsWeatherEnabled,cityInp,setCityInp,links, setLinks }}>
            {children}
        </SettingsContext.Provider>
    );
};