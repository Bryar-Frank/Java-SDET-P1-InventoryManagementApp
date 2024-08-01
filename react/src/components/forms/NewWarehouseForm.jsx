import 'bootstrap/dist/css/bootstrap.min.css'
import { Button, Alert, Breadcrumb, Card, Form } from 'react-bootstrap'

export default function NewWarehouseForm () {

    const submitForm = (e) => {
        e.preventDefault()

        let formData =  new FormData(e.target)
        formData = Object.fromEntries(formData)
        let formatedData = {
            "warehouseName": formData["warehouseName"],
            "state": formData["state"],
            "city": formData["city"],
            "address": formData["address"],
            "capacity": formData["capacity"]
        };


        console.log( formatedData )
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