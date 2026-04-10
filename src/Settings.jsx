import {useState,useEffect,useContext} from 'react'
import Checkbox from './components/Checkbox'
import { SettingsContext } from './SettingsContext'
const Settings = () => {
  const {isSearchEnabled,setIsSearchEnabled} = useContext(SettingsContext)

  // const [searchED, setSearchED] = useState()
  // useEffect(() => {
  //   const savedData = localStorage.getItem("upwallSettings")
  //   const parsedData = JSON.parse(savedData)
  //   setSearchED(parsedData.search)
    
  // }, [])
  

  
  return (
    <>
    <div className="header flex justify-between m-3">
      <div className="settingsname text-2xl">Settings</div>
      <div className="appname text-4xl font-mono">Upwalls</div>
    </div>

    <div className="main flex justify-center items-center mt-12 ml-40 mr-40 border border-green-800">
      <div className="item  p-4 flex justify-between w-full text-xl">
        <div className="iname">Search box</div>
        <div className="itemstate">
          <Checkbox checked={isSearchEnabled} onChange={(e)=>setIsSearchEnabled(e.target.checked)} />
        </div>
      </div>
    </div>
    </>
  )
}

export default Settings