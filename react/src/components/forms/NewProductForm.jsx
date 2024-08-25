import { Form, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { baseURL } from "../../App";

export default function NewProductForm () {
    
    const urlAdd = baseURL + "/inventory/add";
    const urlWarehouses = baseURL + "/warehouse";
    const [warehouses, setWarehouses] = useState([]);
    const [chosenWarehouse, setChosenWarehouse] = useState({});
    const [isLoaded, setIsLoaded] = useState(false);


    //useEffect is used to load the page on mount
    //and reload page when table is changed
    useEffect(() => {
        fetch(urlWarehouses, {
            method: "GET",
            headers: {
            'Content-Type': 'application/json' 
            }
        }).then(data => data.json())  
        .then(returnedData => {

            setWarehouses(returnedData);
            setChosenWarehouse(returnedData[0])
            setIsLoaded(true);
        }).catch(err => { alert(err); console.log(err) })
    }, [])

    let sendPOST = function(data) {
        fetch(urlAdd, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response => response.json())
        .then(data => console.log(data))
        .catch(err => console.error(err));
    }

    const submitForm = (e) => {
        e.preventDefault() //prevent the default behavior of submit form

        let formData =  new FormData(e.target)
        formData = Object.fromEntries(formData)

        //formats the data for an inventory item
        //including dropdown options for warehouse
        let formatedData = {
            "id": {
                "product": {
                    "productName": formData["productName"],
                    "size": formData["size"]
                },
                "warehouse": {
                    "id": chosenWarehouse["id"],
                    "warehouseName": chosenWarehouse["warehouseName"],
                    "state": chosenWarehouse["state"],
                    "city": chosenWarehouse["city"],
                    "address": chosenWarehouse["address"],
                    "capacity": chosenWarehouse["capacity"] 
                }
            },
            "quantity": formData["quantity"],
            "price": formData["price"],
            "itemCap": formData["itemCap"]
        };

        //send the POST request
        sendPOST( formatedData );
    }

    // update the chosen warehouse that will be used for POST request
    function changeWarehouse (e) {
        const {selectedIndex } = e.target;
        setChosenWarehouse(warehouses[selectedIndex]);
    }
    
    //form waits for warehouses to be loaded for dropdown menu
    return <>
        <h2>New Product Form</h2>
    {isLoaded && 
        <Form onSubmit={submitForm}>
            <Form.Group className="mb-3" >
                <Form.Label>Warehouse</Form.Label>
                <Form.Control as="select" name='warehouseName' onChange={changeWarehouse} >
                    {getOptions(warehouses)}
                </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label>Product Name</Form.Label>
                <Form.Control type="text" name='productName' placeholder="required"/>
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label>Product Size </Form.Label>
                <Form.Control type="text" name='size' placeholder="required"/>
                <Form.Text className='text-muted'>
                    rounded to nearest cubic inch
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label>Quantity of Item</Form.Label>
                <Form.Control type="text" name='quantity' placeholder='required' />
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label>Price</Form.Label>
                <Form.Control type="text" name='price' placeholder="required"/>
                <Form.Text className='text-muted'>
                    must be in 0.00 format
                </Form.Text>
            </Form.Group>
            
            <Form.Group className="mb-3" >
                <Form.Label>Max Capacity for Item in This Warehouse</Form.Label>
                <Form.Control type="text" name='itemCap' />
                <Form.Text className='text-muted'>
                    <em>optional</em>
                </Form.Text>
            </Form.Group>

            <Button className="mt-3" variant='primary' type='submit'>
                Submit
            </Button>           
        </Form>
  }</>
}

function getOptions (data) {
  
    let options = Object.entries(data).map(entry => {
        //console.log(entry)
        return <option key={entry[0]}>{entry[1]["warehouseName"]}</option>
    });
    
    return options;
  }