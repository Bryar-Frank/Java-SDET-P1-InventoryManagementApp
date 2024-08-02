import { useState } from "react";
import { useEffect } from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function InventoryTable () {

    // fetch data from backend and display in table
    // when the component is mounted

    const url = "http://localhost:8080/inventory";

    const [items, setItems] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);



    useEffect(() => {
      fetch(url, {method: "GET"})
      .then(data => data.json())  
      .then(returnedData => {
          //unpack the json in the order we want
          for (let item of returnedData) {
            item["product"] = item?.id?.product?.productName;
            item["size"] = item?.id?.product?.size;
            item["warehouse"] = item?.id?.warehouse?.warehouseName;
            item["warehouse capacity"] = item?.id?.warehouse?.capacity;
            //console.log(item)
          }          
          setItems(returnedData);
          setIsLoaded(true);
      })
      .catch(err => { alert(err); console.log(err) })
        // TODO instead show your own alert not builtin 
        //  might MUI snackbar etc
        //  Toast Messages
        // only fetch when mounting
    }, [])
    

    return (<>        

      {isLoaded && 
        <Table striped bordered hover>
          <thead><tr>{getHeadings(items)}</tr></thead>
          <tbody>{getRows(items)}</tbody>
        </Table>
      }

    </>);
}

function getHeadings (data) {
  
  let headings = Object.keys(data[0]).map(name => {
    if (name != 'id') {
      return <th key={name}>{name}</th>
    }
  });
  
  return headings;
}

function getRows (data) {
  return data.map(obj => {
    //console.log(obj.product + obj.warehouse);
    return <tr key={obj.product + "," + obj.warehouse}>{getCells(obj)}</tr>
  });
}

function getCells(obj) {
  //console.log(Object.entries(obj));
  return Object.entries(obj).map(entry => {
    if (entry[0] == 'product') {
      //console.log(obj);
      return <td key={entry[0]}>
        <Link to='/editproduct' state={obj}>{entry[1]}</Link>
      </td>
    }
    if (entry[0] != 'id') {
      return <td key={entry[0]}>{entry[1] ?? "None"}</td>
    }
  });
}