import { createContext, useState, useEffect } from 'react';

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

    const [cityInp, setCityInp] = useState(() => {
        const savedData = localStorage.getItem("upwallSettings")
        if (savedData) {
            const parsedData = JSON.parse(savedData)
            return parsedData.city
        }
        return ""
    })

    const [links, setLinks] = useState(() => {
        const savedData = localStorage.getItem("upwallSettings")
        if (savedData) {
            const parsedData = JSON.parse(savedData)
            return parsedData.links || []
        }
        return []
    })

    const [imageLoc, setImageLoc] = useState(() => {
        const savedData = localStorage.getItem("upwallSettings")
        if (savedData) {
            const parsedData = JSON.parse(savedData)
            if (parsedData.imageLoc !== undefined) {
                return parsedData.imageLoc
            }
        }
        return 0
    })
    const [imgHourCnt, setImgHourCnt] = useState(() => {
        const savedData = localStorage.getItem("upwallSettings")
        if (savedData) {
            const parsedData = JSON.parse(savedData)
            if (parsedData.imgHourCnt !== undefined) {
                return parsedData.imgHourCnt
            }
        }
        return 0;
    });
    const [bgImage, setBgImage] = useState(() => {
        const savedBg = localStorage.getItem("upwallBackground")
        if (savedBg) {
            return JSON.parse(savedBg)
        }
        return []
    })




    useEffect(() => {
        console.log("The val of searchED", isSearchEnabled, isWeatherEnabled, cityInp)
        if (imageLoc == 20) {
            setImageLoc(0)
        }

        const dataToLocal = {
            "search": isSearchEnabled,
            "weather": isWeatherEnabled,
            "city": cityInp,
            "links": links,
            "imageLoc": imageLoc,
            "imgHourCnt": imgHourCnt,
        }
        localStorage.setItem("upwallSettings", JSON.stringify(dataToLocal))
        console.log(links)
    }, [isSearchEnabled, isWeatherEnabled, cityInp, links, imageLoc])

    return (

        <SettingsContext.Provider value={{ isSearchEnabled, setIsSearchEnabled, isWeatherEnabled, setIsWeatherEnabled, cityInp, setCityInp, links, setLinks, bgImage, setBgImage, imageLoc, setImageLoc, imgHourCnt, setImgHourCnt }}>
            {children}
        </SettingsContext.Provider>
    );
};