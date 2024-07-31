import { useState } from 'react'
import './App.css'
import NavigationBar from './components/navigationbar/NavigationBar'
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom'
import { HomePage, AllInventoryPage, WarehouseInfoPage } from './pages/index'

function App() {

  return (
    <>


      <main>

      <h1><header>Inventory Management App</header></h1><br />
        <BrowserRouter basename='/'> 
            <NavigationBar/>     
            <Routes>
                <Route path='/inventory' element={<AllInventoryPage />} />
                <Route path='/warehouses' element={<WarehouseInfoPage />} />
                <Route path='/' element={<HomePage />} />
                
                <Route path='*' element={<Navigate to='/' />} />
            </Routes>
        </BrowserRouter>
      </main>
    </>
  )
}

export default App
