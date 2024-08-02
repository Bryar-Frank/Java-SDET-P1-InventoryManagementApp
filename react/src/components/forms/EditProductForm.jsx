import 'bootstrap/dist/css/bootstrap.min.css'
import { Button, Alert, Breadcrumb, Form } from 'react-bootstrap'
import { useLocation } from 'react-router-dom';

export default function EditProductForm () {
    
    const location = useLocation();
    const item = useLocation().state;
    const product = item.id.product;
    const warehouse = item.id.warehouse;
    

    //console.log(data["id"])

    const url = "http://localhost:8080/inventory/update";

    // const dummyData = {
    //     "id": {
    //         "product": {
    //             "id": ,
    //             "productName": "",
    //             "size": 
    //         },
    //         "warehouse": {
    //             "id": ,
    //             "warehouseName": "r",
    //             "state": "",
    //             "city": "",
    //             "address": "",
    //             "capacity": 
    //         }
    //     },
    //     "quantity": ,
    //     "price": ,
    //     "itemCap": 
    // };

    let sendPUT = function(data) {
        fetch(url, {
            method: 'PUT',
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
        console.log("formData: ")
        console.log(formData);
        let formatedData = {
            "id": {
                "product": {
                    "id": product.id,
                    "productName": formData["productName"] || product.productName,
                    "size": formData["size"] || product.size
                },
                "warehouse": {
                    "id": warehouse.id,
                    "warehouseName": formData["warehouseName"] || warehouse.warehouseName,
                    "state": warehouse.state,
                    "city": warehouse.city,
                    "address": warehouse.address,
                    "capacity": warehouse.capacity 
                }
            },
            "quantity": formData["quantity"] || item.quantity,
            "price": formData["price"] || item.price,
            "itemCap": formData["itemCap"] || item.itemCap
        };

        sendPUT( formatedData );
    }


    return <>
        <h2>Edit "{product.productName}"</h2>
        <h3>from "{warehouse.warehouseName}"</h3>
        <Form onSubmit={submitForm}>
            <Form.Group className="mb-3" >
                <Form.Label>Name of Warehouse</Form.Label>
                <Form.Control readOnly type="text" name='warehouseName' value={warehouse.warehouseName}/>
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label>Name of Product</Form.Label>
                <Form.Control type="text" name='productName' placeholder={product.productName} />
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label>Size of Product</Form.Label>
                <Form.Control type="text" name='size' placeholder={product.size}/>
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label>Quantity of Product</Form.Label>
                <Form.Control type="text" name='quantity' placeholder={item.quantity} />
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label>Product Price</Form.Label>
                <Form.Control type="text" name='price' placeholder={item.price}/>
            </Form.Group>
            
            <Form.Group className="mb-3" >
                <Form.Label>Max Number of Product for {warehouse.warehouseName}</Form.Label>
                <Form.Control type="text" name='itemCap' placeholder={item.itemCap}/>
                <Form.Text className='text-muted'>
                    <em>*optional</em>
                </Form.Text>
            </Form.Group>

            <Button className="mt-3" variant='primary' type='submit'>
                Submit
            </Button>           
        </Form>
    </>
}