import { createContext, useState, useEffect } from 'react';
import { saveToStorage, loadFromStorage } from './storage';

export const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
    
    const [isSearchEnabled, setIsSearchEnabled] = useState(true);
    const [isWeatherEnabled, setIsWeatherEnabled] = useState(false);
    const [cityInp, setCityInp] = useState("");
    const [links, setLinks] = useState([]);
    const [imageLoc, setImageLoc] = useState(0);
    const [imgHourCnt, setImgHourCnt] = useState(0);
    const [bgImage, setBgImage] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);



    useEffect(() => {
        const fetchInitialData = async () => {
  
            const savedSettings = await loadFromStorage("upwallSettings");
            if (savedSettings) {

                if (savedSettings.search !== undefined) setIsSearchEnabled(savedSettings.search);
                if (savedSettings.weather !== undefined) setIsWeatherEnabled(savedSettings.weather);
                if (savedSettings.city !== undefined) setCityInp(savedSettings.city);
                if (savedSettings.links !== undefined) setLinks(savedSettings.links);
                if (savedSettings.imageLoc !== undefined) setImageLoc(savedSettings.imageLoc);
                if (savedSettings.imgHourCnt !== undefined) setImgHourCnt(savedSettings.imgHourCnt);
            }


            const savedBg = await loadFromStorage("upwallBackground");
            if (savedBg) {
                setBgImage(savedBg);
            }
            setIsLoaded(true)
        };

        fetchInitialData();
    }, []); 



    useEffect(() => {
        if (!isLoaded) return;
        if (links === undefined) return; 

        if (imageLoc === 20) {
            setImageLoc(0);
        }

        const dataToLocal = {
            "search": isSearchEnabled,
            "weather": isWeatherEnabled,
            "city": cityInp,
            "links": links,
            "imageLoc": imageLoc,
            "imgHourCnt": imgHourCnt,
        };
        
        saveToStorage("upwallSettings", dataToLocal);
        
    }, [isSearchEnabled, isWeatherEnabled, cityInp, links, imageLoc, imgHourCnt,isLoaded]);

    return (
        <SettingsContext.Provider value={{ isSearchEnabled, setIsSearchEnabled, isWeatherEnabled, setIsWeatherEnabled, cityInp, setCityInp, links, setLinks, bgImage, setBgImage, imageLoc, setImageLoc, imgHourCnt, setImgHourCnt }}>
            {children}
        </SettingsContext.Provider>
    );
};

