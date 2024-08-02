import { useState } from "react";
import { useEffect } from "react";
import { Container, Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function InventoryTable () {

    // fetch data from backend and display in table
    // when the component is mounted

    const urlGet = "http://localhost:8080/inventory";
    const urlDelete = "http://localhost:8080/inventory/delete"

    const [items, setItems] = useState({});
    const [isLoaded, setIsLoaded] = useState(false);
    const [reload, setReload] = useState(0);
    
    const deleteItem = (id) => {
      console.log(id)
      fetch(urlDelete, {
          method: "DELETE",
          headers: {
          'Content-Type': 'application/json' 
          },
          body: JSON.stringify(id)
        }).then( () => setReload(reload+1) )
        .catch(err => console.error(err));
    }

    useEffect(() => {
      fetch(urlGet, {
        method: "GET",
        headers: {
        'Content-Type': 'application/json' 
        }
      })
      .then(data => data.json())  
      .then(returnedData => {
          //unpack the json in the order we want
          let formatedItems = []
          for (let item of returnedData) {
            let formatedItem = {
              "Warehouse Name" : item?.id?.warehouse?.warehouseName,
              "Product Name" : item?.id?.product?.productName,
              "Quantity" : item?.quantity,
              "Price" : item?.price,
              "Size" : item?.id?.product?.size,
              "Warehouse Capacity" : item?.id?.warehouse?.capacity,
              "Item Capacity" : item?.itemCap,
              "Remove?" : "X",
              "item" : item
            }
            formatedItems.push(formatedItem)
            // console.log("Item: ")
            // console.log(item)
            // console.log("Formated Item: ")
            // console.log(formatedItem)
          }          
          setItems(formatedItems);
          setIsLoaded(true);
      })
      .catch(err => { alert(err); console.log(err) })
    }, [reload])
    
    function getHeadings (data) {
  
      let headings = Object.keys(data[0]).map(name => {
        if (name != 'item') {
          return <th key={name}>{name}</th>
        }
      });
      
      return headings;
    }
    
    function getRows (data) {
      return data.map(obj => {
        return <tr key={obj.item.id.product.id + " " + obj.item.id.warehouse.id}>{getCells(obj)}</tr>
      });
    }
    
    function getCells(obj) {
      //console.log(Object.entries(obj));
      return Object.entries(obj).map(entry => {
        
        //if table column is Product Name or Warehouse Name, create links to edit forms
        if (entry[0] == 'Product Name') {
          return <td key={entry[0]}>
            <Link to='/editproduct' state={obj.item}>{entry[1]}</Link>
          </td>
    
        } else if (entry[0] == 'Warehouse Name') {
          return <td key={entry[0]}>
            <Link to='/editwarehouse' state={obj.item.id.warehouse}>{entry[1]}</Link>
          </td>
    
        //Also create delete buttons
        } else if (entry[0] == "Remove?") {
          return <td key={entry[0]}>
            <Button onClick={()=>{deleteItem(obj.item.id)}}>{entry[1]}</Button>
          </td>
        //  
        } else if (entry[0] != 'item') {
          return <td key={entry[0]}>{entry[1] ?? "None"}</td>
        }
      });
    }

    return (<>        

      {isLoaded && 
      <Container>
        <Table striped bordered hover>
          <thead><tr>{getHeadings(items)}</tr></thead>
          <tbody>{getRows(items)}</tbody>
        </Table>
      </Container>
      }

    </>);
}

