import { useState,useEffect } from 'react'
import './App.css'

function App() {
  const [timeval, setTimeval] = useState("")
  
  useEffect(() => {
    const date = new Date()
    setTimeval(date.getHours() + ":" + date.getMinutes() + ":"+ date.getSeconds())
  }, [timeval])
  

  return (
    <>
      <div className="timeAndDate">
        <div className="time">
          {timeval}
        </div>
        <div className="date"></div>
      </div>
    </>
  )
}

export default App
