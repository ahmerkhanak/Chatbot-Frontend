import ChatBot from "./components/ChatBot"
import Login from './components/Login.jsx'
import SignUp from "./components/SignUp.jsx"
import LandingPage from "./components/LandingPage.jsx"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import ProtectedRoute from "./components/ProtectedRoute.jsx"
import PublicRoute from "./components/PublicRoute.jsx"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PublicRoute><LandingPage /></PublicRoute>} />
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/register" element={<PublicRoute><SignUp /></PublicRoute>} />
          <Route path="/chat" element={<ProtectedRoute> <ChatBot /> </ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
