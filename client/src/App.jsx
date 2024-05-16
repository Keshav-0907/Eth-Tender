import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Bid from './components/Bid'
import CreateTender from './pages/CreateTender'
import ShowTenders from './pages/ShowAllTenders'

function App() {

  return (
   <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      {/* <Route path="/bid" element={<Bid />} /> */}
      <Route path="/create" element={<CreateTender />} />
      <Route path="/show" element={<ShowTenders />} />
    </Routes>
   </BrowserRouter>
  )
}

export default App
