import { useState } from "react";
import { useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { baseURL } from "../../App";

export default function WarehouseTable () {

    // fetch data from backend and display in table
    // when the component is mounted

    const url = baseURL + "/warehouse";

    //is loaded is for when the table first loads
    //reload is for when the table gets updated while on the page
    const [warehouses, setWarehouses] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [reload, setReload] = useState(0);

    //runs from the delete buttons. parameter is id of warehouse
    const deleteWarehouse = (id) => {
        
        fetch(url + "/" + id, {
            method: "DELETE",
        }).then( () => setReload(reload+1) )
        .catch(err => console.error(err));
    }

    //use effect here allows for the fetch to happen when component is mounted
    //and when the table is edited
    useEffect(() => {
        fetch(url, {
            method: "GET",
            headers: {
            'Content-Type': 'application/json' 
            }
        }).then(data => data.json())  
        .then(returnedData => {
            
            let formatedWarehouses = []
            
            //unpack the json in the order we want to diplay table the way we want
            for (let warehouse of returnedData) {
                let formatedData = {
                    "Warehouse Name": warehouse["warehouseName"],
                    "State": warehouse["state"],
                    "City": warehouse["city"],
                    "Address": warehouse["address"],
                    "Capacity": warehouse["capacity"],
                    "Remove?": "X", //this is for the delete button
                    "warehouse": warehouse //attach the entity so delete button can pass it to new page
                }
                formatedWarehouses.push(formatedData);
            }

            // console.log(returnedData)
            setWarehouses(formatedWarehouses); //save all the entries in a state variable
            setIsLoaded(true); //this is let the table wait to load until the GET request has processed
        
        }).catch(err => { alert(err); console.log(err) })
    }, [reload]) //allows the GET to be called after the table changes
    
    //This was to make the building of the table easier without
    //having to manually type it all out
    function getHeadings (data) {
        //data parameter will consist of a list of all the warehouses
        //so we can grabe the first warehouse data[0] and get its keys
        let headings = Object?.keys(data[0]).map(name => {
                if (name != 'warehouse') {
                return <th key={name}>{name}</th>
                }
        });
        
        return headings;
    }
    

    //data is a list of warehouses, so for eachwarehouse
    function getRows (data) {
    //we can create a row and then call the getCells for that row
    return data?.map(obj => {
            return <tr key={obj.warehouse.id}>{getCells(obj)}</tr>
        });
    }
    
    //returns a cell for each element in the warehouse obj sent in
    function getCells(obj) {
    return Object?.entries(obj).map(entry => {
        
            //this will add a link to each name so it can direct to the edit that warehouse
            if (entry[0] == 'Warehouse Name') {
            return <td key={entry[0]}>
                <Link to='/editwarehouse' state={obj.warehouse}>{entry[1]}</Link>
            </td>

            //this will add a button to the end of each row to delete that row
            } else if (entry[0] == "Remove?") {
                return <td key={entry[0]}>
                <Button onClick={()=>{deleteWarehouse(obj.warehouse.id)}}>{entry[1]}</Button>
                </td> 

            // this will take every other cell and print its value or "none" if empty
            }else if (entry[0] != 'warehouse') {
                return <td key={entry[0]}>{entry[1] ?? "None"}</td>
            }
        });
    }


    return (<>       
      {isLoaded && warehouses.length > 0 &&
        <Table striped bordered hover>
          <thead><tr>{getHeadings(warehouses)}</tr></thead>
          <tbody>{getRows(warehouses)}</tbody>
        </Table>
      }
    </>);
}

