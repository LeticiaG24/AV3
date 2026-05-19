import Aeronave from "./pages/Aeronave"
import Login from "./pages/Login"
import Home from "./pages/Home"

import { Navigate } from 'react-router-dom'
import { BrowserRouter, Routes, Route } from "react-router-dom"

function App() {
  return (

    <BrowserRouter>
    
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/aeronave/:id" element={<Aeronave />}/>
        <Route path="/admin" element={<Home nome={"Letícia Furtado"} nivel={"Admin"} />}/>
        <Route path="/engenheiro" element={<Home nome={"Isaura de Lourdes"} nivel={"Engenheiro"} />}/>
        <Route path="/operador" element={<Home nome={"Guilherme Rosa"} nivel={"Operador"} />}/>
        <Route path="*" element={<Navigate to="/" />} /> 
      </Routes>

    </BrowserRouter>
  )
}

export default App