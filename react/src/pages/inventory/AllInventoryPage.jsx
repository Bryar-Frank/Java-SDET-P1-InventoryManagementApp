import { Link } from "react-router-dom"
import InventoryTable from "../../components/tables/InventoryTable"

export function AllInventoryPage () {
    //This is just a placeholder for the page that contains the Inventory Table
    //Having the page here instead of just the table allows for easier
    //expandability as the app gets more complex
    
    return <>
      <h1>All Inventory</h1>
      <InventoryTable/>      
      <Link to="/newitem"><button id="additem" >Add New Item</button></Link>
    </>
}
