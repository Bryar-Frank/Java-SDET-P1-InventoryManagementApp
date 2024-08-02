import { Link } from "react-router-dom"
import WarehouseTable from "../../components/tables/WarehouseTable"

export function AllWarehousesPage () {
    
    
    return <>
        <h1>All Warehouses</h1>
        <WarehouseTable />
        <Link to="/newwarehouse"><button id="addwarehouse" >Add New Warehouse</button></Link>
    </>
}