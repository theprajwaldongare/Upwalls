import { useState, useEffect, useContext } from 'react'
import Checkbox from './components/Checkbox'
import { SettingsContext } from './SettingsContext'
import { MdCheck } from 'react-icons/md'
import { HiOutlineTrash, HiCheckCircle } from 'react-icons/hi'
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
      safeUrl = 'https://' + safeUrl
    }

    const urlObj = new URL(safeUrl)
    const domain = urlObj.hostname

    // const iconUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=128`
    const iconUrl = `https://icons.duckduckgo.com/ip3/${domain}.ico`;


    const saveToArray = {

      name: domain.replace('www.', '').split('.')[0],
      url: safeUrl,
      imageText: iconUrl
    }

    setLinks([...(links || []), saveToArray])
    setTypedLink("")
  }

  const deleteLink = (nameOfLink)=>{
    const remLinks = links.filter((item)=>item.name!=nameOfLink)
    setLinks(remLinks)
  }

  return (
    <>
      <div className="header flex justify-between m-3">
        <div className="settingsname text-2xl">Settings</div>
        <div className="appname text-4xl font-mono">Upwalls</div>
      </div>

      <div className="main flex justify-center items-center flex-col mt-12 ml-40 mr-40 ">
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
        {isWeatherEnabled && <div className="weatherAddons flex mt-2 ml-8  items-center  pl-4 border-l-2 border-gray-700 w-full mb-6">
          <div className="cityname">City</div>
          {/* <input type="text" className='ml-6 mb-3 border border-blue-500 outline-teal-400  w-60 h-6 rounded-2xl p-4 ' value={cityType} placeholder={cityInp} onChange={(e) => { setCityType(e.target.value) }} /> */}
          <input type="text" className='ml-6    bg-gray-800 text-gray-200 px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-violet-500 transition-colors w-64' value={cityType} placeholder={cityInp} onChange={(e) => { setCityType(e.target.value) }} onKeyDown={(e) => {
            if (e.key === 'Enter') {
              addCity()
            }
          }} />

          <div className="tick  ">
            {/* <MdCheck className="text-2xl text-white bg-violet-800 rounded-full ml-2 mt-1  cursor-pointer" onClick={addCity} /> */}
            <HiCheckCircle className="text-4xl ml-2 text-violet-500 hover:text-violet-400 cursor-pointer transition-colors" onClick={addCity}></HiCheckCircle>
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
          {showLinkAdd && <div className="linkadd flex mt-3 items-center  pl-4 border-l-2 border-gray-700 w-full mb-6">
            <div className="addname text-base">Add link</div>
            <input type="text" className='ml-4 bg-gray-800 text-gray-200 px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-violet-500 transition-colors w-64' value={typedLink} onChange={(e) => { setTypedLink(e.target.value) }} onKeyDown={(e) => {
            if (e.key === 'Enter') {
              addLinkhere()
            }
          }} />
            <div className="tick">
              {/* <MdCheck className="text-2xl text-white bg-violet-800 rounded-full ml-2 mt-1  cursor-pointer" onClick={addLinkhere} /> */}
              <HiCheckCircle className="text-4xl ml-2 text-violet-500 hover:text-violet-400 cursor-pointer transition-colors" onClick={addLinkhere}></HiCheckCircle>
            </div>
          </div>}
        </div>
        <div className="quickshow  w-full">
          {links?.map((valOfLink) => (
            <div key={valOfLink.name} className='flex justify-between items-center w-full' >
              <div className="content flex ml-4 items-center">
                <div className="logo" ><img src={valOfLink.imageText} alt="" className='w-8 h-8 rounded-lg mt-2 mr-2' /></div>
                <div className="lname text-sm mt-1 capitalize">{valOfLink.name}</div>
              </div>
              <div className="btns mr-4">
                <HiOutlineTrash className="text-2xl cursor-pointer text-gray-400 hover:text-red-600 transition-colors" onClick={()=>{deleteLink(valOfLink.name)}} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Settings