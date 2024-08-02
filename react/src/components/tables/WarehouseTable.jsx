import { useState } from "react";
import { useEffect } from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function WarehouseTable () {

    // fetch data from backend and display in table
    // when the component is mounted

    const url = "http://localhost:8080/warehouse";

    const [warehouses, setWarehouses] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);



    useEffect(() => {
        fetch(url, {
            method: "GET",
            headers: {
            'Content-Type': 'application/json' 
            }
        }).then(data => data.json())  
        .then(returnedData => {
            
            //unpack the json in the order we want
            for (let warehouse of returnedData) {
                let formatedData = {
                    "id": warehouse["id"],
                    "warehouseName": warehouse["warehouseName"],
                    "state": warehouse["stat"],
                    "city": warehouse["city"],
                    "address": warehouse["address"],
                    "capacity": warehouse["capacity"]
                }

                warehouse=formatedData;
            }

            // console.log(returnedData)
            setWarehouses(returnedData);
            setIsLoaded(true);
        
        }).catch(err => { alert(err); console.log(err) })
        // TODO instead show your own alert not builtin 
        //  might MUI snackbar etc
        //  Toast Messages
        // only fetch when mounting
    }, [])
    

    return (<>        
      <h1>All Warehouses</h1>
      
      {isLoaded && 
        <Table striped bordered hover>
          <thead><tr>{getHeadings(warehouses)}</tr></thead>
          <tbody>{getRows(warehouses)}</tbody>
        </Table>
      }
    </>);
    //TODO CREATE NEW WAREHOUSE PAGE
}

function getHeadings (data) {
  
  let headings = Object.keys(data[0]).map(name => {
    if (name != 'id') {
      return <th key={name}>{(name == 'warehouseName') ? "Warehouse" : name}</th>
    }
  });
  
  return headings;
}

function getRows (data) {
  return data.map(obj => {
    //console.log(obj);
    return <tr key={obj.id}>{getCells(obj)}</tr>
  });
}

//TODO MAKE EDITWAREHOUSE FORM AND FIX IF STATEMENTS
function getCells(obj) {
  //console.log(Object.entries(obj));
  return Object.entries(obj).map(entry => {
    if (entry[0] == 'warehouseName') {
      //console.log(obj);
      return <td key={entry[0]}>
        <Link to='/editwarehouse' state={obj}>{entry[1]}</Link>
      </td>
    }
    if (entry[0] != 'id') {
      return <td key={entry[0]}>{entry[1] ?? "None"}</td>
    }
  });
}