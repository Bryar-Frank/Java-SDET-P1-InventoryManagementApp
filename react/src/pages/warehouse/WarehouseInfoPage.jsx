import { Link } from "react-router-dom"
import WarehouseTable from "../../components/tables/WarehouseTable"

export function WarehouseInfoPage () {
    
    
    return <>
        <h1>TODO: Show Warehouse Info</h1>
        <WarehouseTable />
        <Link to="/newwarehouse"><button id="addwarehouse" >Add New Warehouse</button></Link>
    </>
}