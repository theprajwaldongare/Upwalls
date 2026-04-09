import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [timeval, setTimeval] = useState("")
  const [dateval, setDate] = useState("")
  useEffect(() => {
    dateSet()
    const updatetime = setInterval(timeupdate, 1000)
    return () => clearInterval(updatetime)
  }, [])
  const timeupdate = () => {
    const date = new Date()
    setTimeval(date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds())
    // console.log("Hello world")
  }
  const dateSet = () => {
    const date = new Date()
    let day = date.getDay()
    const datehere = date.getDate()
    let month = date.getMonth() + 1
    if (day == 0) {
      day = "Sunday"
    }
    else if (day == 1) {
      day = "Monday"
    }
    else if (day == 2) {
      day = "Tuesday"
    }
    else if (day == 3) {
      day = "Wednesday"
    }
    else if (day == 4) {
      day = "Thursday"
    }
    else if (day == 5) {
      day = "Friday"
    }
    else if (day == 6) {
      day = "Saturday"
    }

    if (month == 1) {
      month = "January"
    }
    else if (month == 2) {
      month = "February"
    }
    else if (month == 3) {
      month = "March"
    }
    else if (month == 4) {
      month = "April"
    }
    else if (month == 5) {
      month = "May"
    }
    else if (month == 6) {
      month = "June"
    }
    else if (month == 7) {
      month = "July"
    }
    else if (month == 8) {
      month = "August"
    }
    else if (month == 9) {
      month = "September"
    }
    else if (month == 10) {
      month = "October"
    }
    else if (month == 11) {
      month = "November"
    }
    else if (month == 12) {
      month = "December"
    }
    setDate(`${day}, ${month} ${datehere}`)
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
