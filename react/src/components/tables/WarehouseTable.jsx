import { useState } from "react";
import { useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function WarehouseTable () {

    // fetch data from backend and display in table
    // when the component is mounted

    const url = "http://localhost:8080/warehouse";

    const [warehouses, setWarehouses] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [reload, setReload] = useState(0);

    const deleteWarehouse = (id) => {
        
        fetch(url + "/" + id, {
            method: "DELETE",
        }).then( () => setReload(reload+1) )
        .catch(err => console.error(err));
    }

    useEffect(() => {
        fetch(url, {
            method: "GET",
            headers: {
            'Content-Type': 'application/json' 
            }
        }).then(data => data.json())  
        .then(returnedData => {
            
            let formatedWarehouses = []
            
            //unpack the json in the order we want
            for (let warehouse of returnedData) {
                let formatedData = {
                    "Warehouse Name": warehouse["warehouseName"],
                    "State": warehouse["state"],
                    "City": warehouse["city"],
                    "Address": warehouse["address"],
                    "Capacity": warehouse["capacity"],
                    "Remove?": "X",
                    "warehouse": warehouse 
                }
                formatedWarehouses.push(formatedData);
            }

            // console.log(returnedData)
            setWarehouses(formatedWarehouses);
            setIsLoaded(true);
        
        }).catch(err => { alert(err); console.log(err) })
    }, [reload])
    
    function getHeadings (data) {
  
    let headings = Object.keys(data[0]).map(name => {
        if (name != 'warehouse') {
        return <th key={name}>{name}</th>
        }
    });
    
    return headings;
    }
    
    function getRows (data) {
    return data.map(obj => {
        //console.log(obj);
        return <tr key={obj.warehouse.id}>{getCells(obj)}</tr>
    });
    }
    
    
    function getCells(obj) {
    //   console.log(Object.entries(obj));
    return Object.entries(obj).map(entry => {
    
        if (entry[0] == 'Warehouse Name') {
        
        return <td key={entry[0]}>
            <Link to='/editwarehouse' state={obj.warehouse}>{entry[1]}</Link>
        </td>
    
        } else if (entry[0] == "Remove?") {
    
            return <td key={entry[0]}>
            <Button onClick={()=>{deleteWarehouse(obj.warehouse.id)}}>{entry[1]}</Button>
            </td> 
    
        }else if (entry[0] != 'warehouse') {
    
        return <td key={entry[0]}>{entry[1] ?? "None"}</td>
    
        }
    });
    }
    return (<>       
      {isLoaded && 
        <Table striped bordered hover>
          <thead><tr>{getHeadings(warehouses)}</tr></thead>
          <tbody>{getRows(warehouses)}</tbody>
        </Table>
      }
    </>);
}

