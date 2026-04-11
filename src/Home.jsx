import { useState, useEffect, useContext } from 'react'
import { MdSearch, MdChangeCircle } from "react-icons/md";
import { HiCog } from 'react-icons/hi'
import { Link } from 'react-router-dom'
import { SettingsContext } from './SettingsContext'
import googleLogo from './assets/googleLogo.png'
import background from './assets/background.jpg'
import './App.css'

function Home() {

  const { isSearchEnabled, isWeatherEnabled, cityInp, links, bgImage, setBgImage, imageLoc, setImageLoc, imgHourCnt, setImgHourCnt } = useContext(SettingsContext)

  const [now, setNow] = useState(new Date())
  const [searchData, setsearchData] = useState("")
  const [temp, setTemp] = useState("")



  useEffect(() => {
    const updatetime = setInterval(() => {
      setNow(new Date())
    }, 1000)

    return () => clearInterval(updatetime)
  }, [])





  useEffect(() => {
    const wttrdata = async () => {
      try {
        const response = await fetch(`https://wttr.in/${cityInp}?format=j1`)
        const data = await response.json()
        setTemp(`${data.current_condition[0].temp_C},${data.current_condition[0].weatherDesc[0].value},${data.current_condition[0].weatherIconUrl[0].value}`)
      } catch (error) {
        console.log(error)
      }
    }
    wttrdata()
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
    const query = searchData.trim()
    const isWebsite = /^[^\s]+\.[a-zA-Z]{2,}(\/.*)?$/.test(query)

    if (isWebsite) {
      const finalUrl = query.startsWith('http') ? query : `https://${query}`
      window.location.href = finalUrl
    }
    else {
      window.location.href = `https://www.google.com/search?q=${searchData}`
    }
  }
  const handleKeyEnter = (e) => {
    if (e.key === 'Enter') {
      GoSearch()
    }
  }

  const fetchImage = async () => {
    const currentTime = Date.now();
    const oneHour = 60 * 60 * 1000;
    let currentImages = [...bgImage];

    // if (now.getHours()-imgHourCnt>=1) {
    //   setBgImage([]) // to add new 20 images when user click next image button

    // }
    if (imgHourCnt > 0 && (currentTime - imgHourCnt >= oneHour)) {
      currentImages = []
      setImgHourCnt(currentTime)

    }

    if (currentImages.length < 20) {
      if (currentImages.length == 0) {
        setImgHourCnt(currentTime)
      }
      try {
        const url = `https://api.unsplash.com/photos/random?orientation=landscape&query=wallpapers&client_id=${import.meta.env.VITE_UNSPLASH_KEY}`
        const response = await fetch(url)
        const dataImg = await response.json()
        const newImageUrl = dataImg.urls.regular

        currentImages.push(newImageUrl)
        setBgImage(currentImages)




        localStorage.setItem("upwallBackground", JSON.stringify(currentImages))
        setImageLoc(currentImages.length - 1)
      } catch (error) {
        console.log(error)
        if (currentImages.length > 0) {
          setImageLoc((prev) => (prev + 1) % currentImages.length);
        }
      }
    }
    else {
      if (imageLoc >= 19) {
        setImageLoc(0)
      }
      else {
        setImageLoc(imageLoc + 1)
      }
    }
    // if (bgImage.length < 20) {
    //   if (bgImage.length==0) {
    //     setImgHourCnt(now.getHours())
    //   }
    //   try {
    //     const url = `https://api.unsplash.com/photos/random?orientation=landscape&query=wallpapers&client_id=${import.meta.env.VITE_UNSPLASH_KEY}`
    //     const response = await fetch(url)
    //     const dataImg = await response.json()
    //     const newImageUrl = dataImg.urls.regular
    //     setBgImage([...(bgImage || []),newImageUrl])



    //     // localStorage.setItem("upwallBackground", newImageUrl)
    //     localStorage.setItem("upwallBackground", bgImage)
    //   } catch (error) {
    //     console.log(error)
    //   }
    // }
    // else{
    //   if (imageLoc>=20) {
    //     setImageLoc(0)
    //   }
    //   setImageLoc(imageLoc+1)
    // }

  }


  return (
    <>
      <div className="main w-full h-screen bg-cover overflow-hidden select-none" style={{ backgroundImage: `url(${bgImage[imageLoc] || background})` }}>
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

        {isSearchEnabled &&
          <div className="search flex w-full justify-center mt-6">
            <div className="srch flex items-center rounded-3xl bg-black/20  p-4 backdrop-blur-md border-white/20 shadow-xl transition-all hover:bg-black/30 group">
              <input type="text" placeholder='Search... ' className='bg-transparent outline-none px-2 w-96 ml-2  text-white selection:bg-violet-500' value={searchData || ""} onChange={(e) => { setsearchData(e.target.value) }} onKeyDown={handleKeyEnter} />
              <MdSearch className="text-2xl text-black" onClick={GoSearch} />
            </div>
          </div>
        }

        <div className="setting absolute bottom-6 right-6 flex justify-center mt-6">
          <Link to="/settings">
            {/* <div className="set bg-pink-900 h-6 w-6 rounded-full cursor-pointer">
          </div> */}
            <HiCog className="set  h-10 w-10 rounded-full cursor-pointer"></HiCog>
          </Link>
        </div>

        {isWeatherEnabled && <div className="weather flex flex-col items-center justify-center">
          <div className="weatherIcon">
            <img src={temp.split(",")[2]} className='w-16 h-16 rounded-full' />
          </div>
          <div className="tempc mt-6 text-2xl">
            {temp.split(",")[0]} ℃
          </div>
          <div className="tempCondition mt-2 text-2xl">
            {temp.split(",")[1]}
          </div>
          <div className="cityname mt-2 text-2xl">
            {cityInp}
          </div>
        </div>}

        <div className="linkRender flex gap-4 mt-8 justify-center flex-wrap max-w-4xl mx-auto">
          {/* <div className="linkRender grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-4 mt-8 justify-items-center"> */}
          {links?.map((valOfLink) => (
            <div key={valOfLink.name} className='cursor-pointer flex flex-col justify-center items-center ' onClick={() => { window.location.href = valOfLink.url }} >
              <div className="logo" ><img src={valOfLink.imageText} alt="" className='w-10 h-10 rounded-lg ' /></div>
              <div className="lname text-sm mt-1 capitalize">{valOfLink.name}</div>
            </div>
          ))}
        </div>

        <div
          className="flex justify-center items-center  absolute bottom-6 right-18 bg-black/50 hover:bg-black/80 text-white  rounded-full cursor-pointer backdrop-blur-sm transition-all shadow-lg text-sm border border-white/20"
          onClick={fetchImage}
        >
          <MdChangeCircle className='w-10 h-10 text-5xl'></MdChangeCircle>
        </div>



      </div>
    </>
  )
}

export default Home
