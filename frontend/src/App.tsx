import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"
import Home from "./pages/Home"
import ResumeShow from "./pages/ResumeShow"

const App = () => {
  return (
    <div>
      <BrowserRouter>
    <Routes>

      <Route path="/" element={<Home/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/resumes" element={<ResumeShow/>}/>
      
    </Routes>
  </BrowserRouter>
    </div>
  )
}

export default App