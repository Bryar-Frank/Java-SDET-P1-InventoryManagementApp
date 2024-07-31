import './NavigationBar.css'
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom'

export default function NavigationBar() {

  return <>
    <div id="navbar">
        <nav>
            <Link to="/home"><button>Home</button></Link>
            <Link to="/inventory"><button>All Inventory</button></Link>
            <Link to="/warehouses"><button>Warehouses</button></Link>
        </nav>
    </div>
  </>
}