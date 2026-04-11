import { useState, useEffect, useContext } from 'react'
import Checkbox from './components/Checkbox'
import { SettingsContext } from './SettingsContext'
import { MdCheck } from 'react-icons/md'
const Settings = () => {
  const { isSearchEnabled, setIsSearchEnabled, isWeatherEnabled, setIsWeatherEnabled, cityInp, setCityInp, links, setLinks } = useContext(SettingsContext)

  const [cityType, setCityType] = useState("")
  const [showLinkAdd, setShowLinkAdd] = useState(false)
  const [typedLink, setTypedLink] = useState("")
  useEffect(() => {
    console.log(cityType)
  }, [cityType])


  const addCity = () => {
    setCityInp(cityType)
    setCityType("")
  }

  const addLink = () => {
    setShowLinkAdd(true)
  }


  const addLinkhere = () => {
    setShowLinkAdd(false)

    let safeUrl = typedLink;
    if (!safeUrl.startsWith('http://') && !safeUrl.startsWith('https://')) {
      safeUrl = 'https://' + safeUrl;
    }

    const urlObj = new URL(safeUrl);
    const domain = urlObj.hostname;

    const iconUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;


    const saveToArray = {

      name: domain.replace('www.', '').split('.')[0], 
      url: safeUrl,
      imageText: iconUrl
    }

    setLinks([...(links || []), saveToArray])
    setTypedLink("")
  }

  // const addLinkhere = async ()=>{
  //   setShowLinkAdd(false)
  //   const logoString = await getBase64Logo(typedLink)
  //   console.log(logoString)

  //   const saveToArray = {
  //     name:typedLink.includes("https") ? typedLink.split("/").slice(2)[0].split(".")[0] :  typedLink.split(".")[0],
  //     url:typedLink,
  //     imageText: logoString
  //   }
  //   setLinks([...links || [], saveToArray])
  //   setTypedLink("")

  // }
  // const getBase64Logo = async (websiteUrl) => {
  //   try {
  //     let safeUrl = websiteUrl;
  //     if (!safeUrl.startsWith('http://') && !safeUrl.startsWith('https://')) {
  //       safeUrl = 'https://' + safeUrl;
  //     }
  //     const urlObj = new URL(safeUrl)
  //     const domain = urlObj.hostname

  //     const googleFaviconUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=128`
  //     const response = await fetch(googleFaviconUrl)
  //     const blob = await response.blob()
      
  //     return new Promise((resolve, reject) => {
  //       const reader = new FileReader()
        
  //       reader.onloadend = () => resolve(reader.result)
  //       reader.onerror = reject

  //       reader.readAsDataURL(blob) 
  //     });

  //   } catch (error) {
  //     console.log(error)
  //     return null
  //   }
  // };

  return (
    <>
      <div className="header flex justify-between m-3">
        <div className="settingsname text-2xl">Settings</div>
        <div className="appname text-4xl font-mono">Upwalls</div>
      </div>

      <div className="main flex justify-center items-center flex-col mt-12 ml-40 mr-40 border border-green-800">
        <div className="item  p-4 flex justify-between w-full text-xl">
          <div className="iname">Search</div>
          <div className="itemstate">
            <Checkbox checked={isSearchEnabled} onChange={(e) => setIsSearchEnabled(e.target.checked)} />
          </div>
        </div>

        <div className="item  p-4 flex justify-between w-full text-xl">
          <div className="iname">Weather</div>
          <div className="itemstate">
            <Checkbox checked={isWeatherEnabled} onChange={(e) => setIsWeatherEnabled(e.target.checked)} />
          </div>
        </div>
        {isWeatherEnabled && <div className="weatherAddons flex mt-2 ml-8  w-full ">
          <div className="cityname">City</div>
          <input type="text" className='ml-6 mb-3 border border-blue-500 outline-teal-400  w-60 h-6 rounded-2xl p-4' value={cityType} placeholder={cityInp} onChange={(e) => { setCityType(e.target.value) }} />
          <div className="tick  ">
            <MdCheck className="text-2xl text-white bg-violet-800 rounded-full ml-2 mt-1  cursor-pointer" onClick={addCity} />
          </div>
        </div>}

        <div className="item  p-4 flex flex-col  justify-between w-full text-xl">
          <div className="linkinfo flex justify-between w-full">
            <div className="iname">Quick Links</div>
            <div className="itemstate">
              {/* <Checkbox checked={isWeatherEnabled} onChange={(e) => setIsWeatherEnabled(e.target.checked)} /> */}
              <button className="group cursor-pointer outline-none hover:rotate-90 duration-300" title="Add New" onClick={addLink}>
                <svg className="stroke-teal-500 fill-none group-hover:fill-teal-800 group-active:stroke-teal-200 group-active:fill-teal-600 group-active:duration-0 duration-300" viewBox="0 0 24 24" height="34px" width="34px" xmlns="http://www.w3.org/2000/svg">
                  <path strokeWidth="1.5" d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z" />
                  <path strokeWidth="1.5" d="M8 12H16" />
                  <path strokeWidth="1.5" d="M12 16V8" />
                </svg>
              </button>
            </div>
          </div>
          {showLinkAdd && <div className="linkadd flex mt-3">
            <input type="text" placeholder='Add link' className='w-50 h-8 border border-y-emerald-500 outline-emerald-600 rounded-3xl p-2 text-sm' value={typedLink} onChange={(e)=>{setTypedLink(e.target.value)}} />
            <div className="tick">
            <MdCheck className="text-2xl text-white bg-violet-800 rounded-full ml-2 mt-1  cursor-pointer" onClick={addLinkhere} />
          </div>
          </div>}
        </div>
      </div>
    </>
  )
}

export default Settings