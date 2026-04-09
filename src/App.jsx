import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [timeval, setTimeval] = useState("")
  const [dateval, setDate] = useState("")
  const [greet, setGreet] = useState("")
  useEffect(() => {
    const updatetime = setInterval(timeupdate, 1000)
    return () => clearInterval(updatetime)
  }, [])
  const timeupdate = () => {
    const date = new Date()

    const formattedDate = date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric'
    })
    setDate(formattedDate)

    setTimeval(date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds())
    // console.log("Hello world")
    const ampm = date.getHours() >= 12 ? 'PM' : 'AM';
    if (date.getHours()<6 || date.getHours()>18) {
      setGreet("Good Night")
    }
    else if (date.getHours()<12) {
      setGreet("Good Morning")
    }
    else if (date.getHours()<17) {
      setGreet("Good Afternoon")
    }
    else{
      setGreet("Good Evening")
    }
  }




  return (
    <>
      <div className="timeAndDate flex justify-center mt-4">
        <div className="time">
          {timeval}
        </div>
        <div className="date ml-6">
          {dateval}
        </div>
      </div>
    </>
  )
}

export default App
