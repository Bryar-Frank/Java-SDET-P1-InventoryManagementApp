import { Link } from "react-router-dom"
import InventoryTable from "../../components/tables/InventoryTable"

export function AllInventoryPage () {
    
    
    return <>
      <h1>All Inventory</h1>
      <InventoryTable/>      
      <Link to="/newitem"><button id="additem" >Add New Item</button></Link>
    </>
}
