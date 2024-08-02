import { Form, Button } from "react-bootstrap";
import { useState, useEffect } from "react";

export default function NewProductForm () {
    
    const urlAdd = "http://localhost:8080/inventory/add";
    const urlWarehouses = "http://localhost:8080/warehouse";
    const [warehouses, setWarehouses] = useState([]);
    const [chosenWarehouse, setChosenWarehouse] = useState({});
    const [isLoaded, setIsLoaded] = useState(false);



    useEffect(() => {
        fetch(urlWarehouses, {
            method: "GET",
            headers: {
            'Content-Type': 'application/json' 
            }
        }).then(data => data.json())  
        .then(returnedData => {
            //console.log("warehouses: ")
            //console.log(returnedData)
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
        e.preventDefault()

        let formData =  new FormData(e.target)
        formData = Object.fromEntries(formData)
        //console.log("formData: ")
        //console.log(formData);
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
        console.log("Sending POST...")
        console.log(formatedData)
        //sendPOST( formatedData );
    }

    // update the chosen warehouse that will be used for POST request
    function changeWarehouse (e) {
        const {selectedIndex } = e.target;
        setChosenWarehouse(warehouses[selectedIndex]);
    }

    return <>
        <h2>New Product Form</h2>
        <Form onSubmit={submitForm}>
            <Form.Group className="mb-3" >
                <Form.Label>Warehouse</Form.Label>
                <Form.Control as="select" name='warehouseName' onChange={changeWarehouse} >
                    {getOptions(warehouses)}
                </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label>Product Name</Form.Label>
                <Form.Control type="text" name='productName' />
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label>Product Size </Form.Label>
                <Form.Control type="text" name='size' />
                <Form.Text className='text-muted'>
                    rounded to nearest cubic inch
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label>Quantity of Item</Form.Label>
                <Form.Control type="text" name='quantity' placeholder='0' />
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label>Price</Form.Label>
                <Form.Control type="text" name='price' placeholder='99.99'/>
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
    </>
}

function getOptions (data) {
  
    let options = Object.entries(data).map(entry => {
        //console.log(entry)
        return <option key={entry[0]}>{entry[1]["warehouseName"]}</option>
    });
    
    return options;
  }