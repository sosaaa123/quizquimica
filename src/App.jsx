import "./App.css"
import { Routes, Route } from "react-router-dom"
import Inicio from "./Inicio"
import Quiz from "./components/Quiz"
import ReactHowler from "react-howler"
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/Quiz" element={<Quiz />} />
      </Routes>
    </>
  )
}

export default App
