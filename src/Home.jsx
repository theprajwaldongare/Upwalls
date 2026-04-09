import { useState, useEffect } from 'react'
import { MdSearch } from "react-icons/md";
import { Link } from 'react-router-dom'
import googleLogo from './assets/googleLogo.png'
import background from './assets/background.jpg'
import './App.css'

function Home() {

  const [now, setNow] = useState(new Date())
  const [searchShow, setSearchShow] = useState(true)
  const [searchData, setsearchData] = useState("")
  useEffect(() => {
    const updatetime = setInterval(() => {
      setNow(new Date())
    }, 1000)

    return () => clearInterval(updatetime)
  }, [])

  const timeval = now.toLocaleTimeString('en-US')
  const [timeOnly, amPm] = timeval.split(' ')
  const dateval = now.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  })

  const getGreeting = () => {
    const hour = now.getHours()

    if (hour < 6 || hour > 18) return "Good Night"
    if (hour < 12) return "Good Morning"
    if (hour < 17) return "Good Afternoon"
    return "Good Evening"
  }

  const GoSearch = () => {
    window.location.href = `https://www.google.com/search?q=${searchData}`
  }
  const handleKeyEnter = (e) => {
    if (e.key === 'Enter') {
      GoSearch()
    }
  }


  return (
    <>
    {/* <div className="main w-full h-screen bg-cover overflow-hidden" style={{backgroundImage:`url(${background})`}}> */}
      <div className="timeAndDate flex justify-center mt-4">
        <div className="greet">
          {getGreeting()}
        </div>
        <div className="time ml-4">
          {timeOnly.slice(0, -3)}
        </div>
        <div className="ampm ml-2">
          {amPm}
        </div>
        <div className="date ml-6">
          {dateval}
        </div>
      </div>

      {searchShow &&
        <div className="search flex w-full justify-center mt-6">
          <div className="srch bg-violet-400 flex p-4 rounded-3xl">
            <input type="text" placeholder='Search... ' className=' outline-none ml-2 w-100' value={searchData} onChange={(e) => { setsearchData(e.target.value) }} onKeyDown={handleKeyEnter} />
            <MdSearch className="text-2xl text-black" onClick={GoSearch} />
          </div>
        </div>
      }

      <div className="setting flex justify-center mt-6">
        <Link to="/settings">
          <div className="set bg-pink-900 h-6 w-6 rounded-full cursor-pointer">
          </div>
        </Link>
      </div>

      <div className="appicon flex justify-center mt-8">
        <div className="google flex flex-col content-center">
          <div className="applogo h-14 w-14 bg-cyan-950  rounded-lg"><img src={googleLogo} alt="" /></div>
          <div className="appname mt-2">Google</div>
        </div>
      </div>
      {/* </div> */}
    </>
  )
}

export default Home
