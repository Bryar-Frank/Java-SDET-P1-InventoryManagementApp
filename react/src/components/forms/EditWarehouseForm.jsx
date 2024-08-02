import 'bootstrap/dist/css/bootstrap.min.css'
import { useState } from 'react';
import { Button, Alert, Breadcrumb, Form, Container } from 'react-bootstrap'
import { useLocation } from 'react-router-dom';

export default function EditWarehouseForm () {
    
    const warehouse = useLocation().state 

    
    //checking to make sure state was transferred correctly through useLocation()
    //console.log(warehouse);

    const url = "http://localhost:8080/warehouse/update";

    //parameter is json repesentation of an warehouse that needs to be updated
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

    //This function runs when submit button is pressed
    const submitForm = (e) => {
        e.preventDefault()

        let formData =  new FormData(e.target)
        formData = Object.fromEntries(formData)
        //formats the date into a proper representation of the warehouse
        // the doubl pipe " || " lines will keep the information from state the same
        // in case no information is put in the form fields
        let formatedData = {
            "id": warehouse.id,
            "warehouseName": formData["warehouseName"] || warehouse.warehouseName,
            "state": formData["state"] || warehouse.state,
            "city": formData["city"] || warehouse.city,
            "address": formData["address"] || warehouse.address,
            "capacity": formData["capacity"] || warehouse.capacity 
        };

        // after formatting send the PUT request
        sendPUT( formatedData );
    }

    //The for is in the return. The warehouse info from state is used in the placeholders
    //when the page loads.
    return <>
    { warehouse && 
        <Container>
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
        </Container>
    }</>
}