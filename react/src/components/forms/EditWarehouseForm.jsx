import 'bootstrap/dist/css/bootstrap.min.css'
import { Button, Alert, Breadcrumb, Form } from 'react-bootstrap'
import { useLocation } from 'react-router-dom';

export default function EditWarehouseForm () {
    
    const location = useLocation();
    const warehouse = useLocation().state;

    
    //checking to make sure state was transferred correctly through useLocation()
    //console.log(warehouse);

    const url = "http://localhost:8080/warehouse/update";

    let sendPUT = function(data) {
        fetch(url, {
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
        // console.log("formData: ")
        // console.log(formData);
        
        let formatedData = {
            "id": warehouse.id,
            "warehouseName": formData["warehouseName"] || warehouse.warehouseName,
            "state": formData["state"] || warehouse.state,
            "city": formData["city"] || warehouse.city,
            "address": formData["address"] || warehouse.address,
            "capacity": formData["capacity"] || warehouse.capacity 
        };

        // console.log("formatedDate: ")
        // console.log(formatedData)
        sendPUT( formatedData );
    }


    return <>
        <h2>"{warehouse.warehouseName}"</h2>
        <Form onSubmit={submitForm}>
            <Form.Group className="mb-3" >
                <Form.Label>Name of Warehouse</Form.Label>
                <Form.Control type="text" name='warehouseName' placeholder={warehouse.warehouseName}/>
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label>State <em>(abbreviations only, i.e. "KY")</em></Form.Label>
                <Form.Control type="text" name='state' placeholder={warehouse.state} />
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label>City</Form.Label>
                <Form.Control type="text" name='city' placeholder={warehouse.city}/>
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label>Warehouse Address <em>(Street Number and Name)</em></Form.Label>
                <Form.Control type="text" name='address' placeholder={warehouse.address} />
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label>Warehouse Capacity</Form.Label>
                <Form.Control type="integer" name='capacity' placeholder={warehouse.capacity}/>
                <Form.Text className='text-muted'>
                    <em>cubic feet</em>
                </Form.Text>
            </Form.Group>

            <Button className="mt-3" variant='primary' type='submit'>
                Submit
            </Button>           
        </Form>
    </>
}