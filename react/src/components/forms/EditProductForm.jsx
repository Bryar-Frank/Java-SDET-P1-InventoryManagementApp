import 'bootstrap/dist/css/bootstrap.min.css'
import { Button, Alert, Breadcrumb, Form } from 'react-bootstrap'

export default function EditProductForm (props) {

    const url = "http://localhost:8080/inventory/update";

    const dummyData = {
        "id": {
            "product": {
                "id": 1,
                "productName": "Lucky Charms",
                "size": 10
            },
            "warehouse": {
                "id": 2,
                "warehouseName": "Walmart Warehouse - Winchester",
                "state": "VA",
                "city": "Winchester",
                "address": "278 Goldbug Rd",
                "capacity": 1700
            }
        },
        "quantity": 40,
        "price": 3.49,
        "itemCap": 200
    };

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

        // let formData =  new FormData(e.target)
        // formData = Object.fromEntries(formData)
        // let formatedData = {
        //     "warehouseName": formData["warehouseName"],
        //     "state": formData["state"],
        //     "city": formData["city"],
        //     "address": formData["address"],
        //     "capacity": formData["capacity"]
        // };


        sendPUT( dummyData )
    }


    return <>
        <h2>New Warehouse Form</h2>
        <Form onSubmit={submitForm}>
            <Form.Group className="mb-3" >
                <Form.Label>Name of Warehouse</Form.Label>
                <Form.Control type="text" name='warehouseName' />
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label>State</Form.Label>
                <Form.Control type="text" name='state' />
                <Form.Text className='text-muted'>
                    <em>Only Two Letter Abbreviations (i.e. "KY")</em>
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label>City</Form.Label>
                <Form.Control type="text" name='city' />
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label>Street Address including Street Number</Form.Label>
                <Form.Control type="text" name='address' />
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label>Max Capacity</Form.Label>
                <Form.Control type="text" name='capacity' />
            </Form.Group>

            <Button className="mt-3" variant='primary' type='submit'>
                Submit
            </Button>           
        </Form>
    </>
}