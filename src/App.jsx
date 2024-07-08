import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Intro from './pages/Intro'
import Trips from './pages/Trips'
import { TripProvider } from './contexts/TripContext'

function App() {
    return <div>
        <BrowserRouter>
            <Routes>
                <Route index element={<Intro />} />
                    <Route path="trips" element={<TripProvider>
                        <Trips />
                    </TripProvider>} />
            </Routes>
        </BrowserRouter>
    </div>
}

export default App
