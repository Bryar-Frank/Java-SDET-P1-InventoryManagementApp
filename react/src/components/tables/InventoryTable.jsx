import { useState } from "react";
import { useEffect } from "react";
import { Container, Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { baseURL } from "../../App";

export default function InventoryTable () {

  const url = baseURL + "/inventory";

    //is loaded is for when the table first loads
    //reload is for when the table gets updated while on the page
    const [items, setItems] = useState({});
    const [isLoaded, setIsLoaded] = useState(false);
    const [reload, setReload] = useState(0);
    
    //runs from the delete buttons. parameter is id of warehouse
    const deleteItem = (id) => {
      console.log(id)
      fetch(url + "/delete", {
          method: "DELETE",
          headers: {
          'Content-Type': 'application/json' 
          },
          body: JSON.stringify(id)
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
              "Remove?" : "X", //this is for the delete button
              "item" : item //save the entity to pass with the delete button
            }
            formatedItems.push(formatedItem)
  
            // console.log(item)
            // console.log(formatedItem)
          }  
      
          setItems(formatedItems); //save all the entries in a state variable
          setIsLoaded(true); //this is let the table wait to load until the GET request has processed
      })
      .catch(err => { alert(err); console.log(err) })
    }, [reload]) //allows the GET to be called after the table changes
    
    // fetch data from backend and display in table
    // when the component is mounted
    
    //This was to make the building of the table easier without
    //having to manually type it all out
    function getHeadings (data) {
      //data parameter will consist of a list of all the warehouses
      //so we can grabe the first warehouse data[0] and get its keys
      let headings = Object?.keys(data[0]).map(name => {
        if (name != 'item') {
          return <th key={name}>{name}</th>
        }
      });
      
      return headings;
    }


    //data is a list of warehouses, so for eachwarehouse    
    function getRows (data) {
      //we can create a row and then call the getCells for that row     
      return data?.map(obj => {
        return <tr key={obj.item.id.product.id + " " + obj.item.id.warehouse.id}>{getCells(obj)}</tr>
      });
    }


    //returns a cell for each element in the warehouse obj sent in    
    function getCells(obj) {
      return Object?.entries(obj).map(entry => {
        
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
        
        // this will take every other cell and print its value or "none" if empty  
        } else if (entry[0] != 'item') {
          return <td key={entry[0]}>{entry[1] ?? "None"}</td>
        }
      });
    }

    //creating the functions to make the table makes the return simple.    
    return (<>        

      {isLoaded && items.length > 0 &&
      <Container>
        <Table striped bordered hover>
          <thead><tr>{getHeadings(items)}</tr></thead>
          <tbody>{getRows(items)}</tbody>
        </Table>
      </Container>
      }

    </>);
}

