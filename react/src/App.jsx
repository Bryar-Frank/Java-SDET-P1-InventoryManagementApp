import 'bootstrap/dist/css/bootstrap.min.css'
import { useState } from 'react'
import './App.css'
import NavigationBar from './components/navigationbar/NavigationBar'
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom'
import { HomePage, AllInventoryPage, AllWarehousesPage, NewInventoryPage, NewWarehousePage, EditProductPage, EditWarehousePage } from './pages/index'
import { Container } from 'react-bootstrap'




export const baseURL = "http://simplesort.us-east-1.elasticbeanstalk.com"

function App() {

  return (
    <>
        <BrowserRouter basename='/'>  
        <NavigationBar/>
            <Routes>
                <Route path='/inventory' element={<AllInventoryPage />} />
                <Route path='/newitem' element={<NewInventoryPage />} />
                <Route path='/editproduct' element={<EditProductPage />} />

                <Route path='/warehouses' element={<AllWarehousesPage />} />
                <Route path='/newwarehouse' element={<NewWarehousePage />} />
                <Route path='/editwarehouse' element={<EditWarehousePage />} />
                
                <Route path='/deleteitem' element={<AllInventoryPage/>} />
                <Route path='/deletewarehouse' element={<AllWarehousesPage/>} />
                <Route path='/home' element={<HomePage />} />
                
                <Route path='*' element={<Navigate to='/home' />} />
            </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
