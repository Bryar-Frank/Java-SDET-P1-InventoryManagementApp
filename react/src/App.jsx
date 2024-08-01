import { useState } from 'react'
import './App.css'

import NavigationBar from './components/navigationbar/NavigationBar'
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom'
import { HomePage, AllInventoryPage, WarehouseInfoPage, NewInventoryPage, NewWarehousePage, EditProductPage } from './pages/index'
import BootstrapScratch from './BootstrapScratch'
import EditProductForm from './components/forms/EditProductForm'
import InventoryTable from './components/inventorytable/InventoryTable'



function App() {

  return (
    <>

      <main>
        <BrowserRouter basename='/'> 
            <NavigationBar/>     
            <Routes>
                <Route path='/inventory' element={<AllInventoryPage />} />
                <Route path='/warehouses' element={<WarehouseInfoPage />} />
                <Route path='/newitem' element={<InventoryTable />} />
                <Route path='/newwarehouse' element={<NewWarehousePage />} />
                <Route path='/editproduct' element={<EditProductForm />} />
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
