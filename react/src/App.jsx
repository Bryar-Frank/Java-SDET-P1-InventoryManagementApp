import { useState } from 'react'
import './App.css'

import NavigationBar from './components/navigationbar/NavigationBar'
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom'
import { HomePage, AllInventoryPage, AllWarehousesPage, NewInventoryPage, NewWarehousePage, EditProductPage, EditWarehousePage } from './pages/index'
import BootstrapScratch from './BootstrapScratch'
import EditProductForm from './components/forms/EditProductForm'
import InventoryTable from './components/tables/InventoryTable'



function App() {

  return (
    <>

      <main>
        <BrowserRouter basename='/'> 
            <NavigationBar/>     
            <Routes>
                <Route path='/inventory' element={<AllInventoryPage />} />
                <Route path='/newitem' element={<NewInventoryPage />} />
                <Route path='/editproduct' element={<EditProductPage />} />

                <Route path='/warehouses' element={<AllWarehousesPage />} />
                <Route path='/newwarehouse' element={<NewWarehousePage />} />
                <Route path='/editproduct' element={<EditWarehousePage />} />
                
                {/* <Route path='/' element={<HomePage />} /> */}
                <Route path='/' element={<BootstrapScratch />} />

                <Route path='*' element={<Navigate to='/' />} />
            </Routes>
        </BrowserRouter>
      </main>
    </>
  )
}

export default App
