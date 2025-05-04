import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
// import { Provider } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Home2 from './pages/Home2/Home2'
import Sidebar from './components/Sidebar/Sidebar'
import WeatherNews from './pages/News/WeatherNews'
import Login from './pages/Login/Login'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element = {<Home/>} />
        <Route path='/home2' element = {<Home2/>} />
        <Route path='/news' element = {<WeatherNews/>} />
        <Route path='/login' element = {<Login/>} />
        <Route path='/signup' element = {<Login/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
