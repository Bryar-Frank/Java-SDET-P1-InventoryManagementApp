import { Link } from "react-router-dom"
import WarehouseTable from "../../components/tables/WarehouseTable"

export function AllWarehousesPage () {
    //This is just a placeholder for the page that contains the Warehouse Table
    //Having the page here instead of just the table allows for easier
    //expandability as the app gets more complex
    
    return <>
        <h1>All Warehouses</h1>
        <WarehouseTable />
        <Link to="/newwarehouse"><button id="addwarehouse" >Add New Warehouse</button></Link>
    </>
}