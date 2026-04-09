import { Routes, Route } from 'react-router-dom'
import Home from './Home'
import Settings from './Settings'
function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/settings" element={<Settings />} />
            </Routes>
        </>
    )
}

export default App