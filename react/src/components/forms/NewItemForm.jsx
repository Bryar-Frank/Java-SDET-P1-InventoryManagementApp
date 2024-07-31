export default function NewItemForm () {
    
    // Sample Data from Server:
    // {
    //     "id": {
    //         "product": {
    //             "id": 1,
    //             "productName": "Lucky Charms",
    //             "size": 10
    //         },
    //         "warehouse": {
    //             "id": 2,
    //             "warehouseName": "Walmart Warehouse - Winchester",
    //             "state": "VA",
    //             "city": "Winchester",
    //             "address": "278 Goldbug Rd",
    //             "capacity": "1578"
    //         }
    //     },
    //     "quantity": 12,
    //     "price": 3.49,
    //     "itemCap": null
    // }
    return <>
        <Form className="mb-3">
            <Row>
                <Col>
                    <Form.Group controlId='formEmail'>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type="email" placeholder='example@email.com'/>
                        <Form.Text className='text-muted'>
                            We will not share your email address
                        </Form.Text>
                    </Form.Group>
                </Col>
                <Col>    
                    <Form.Group controlId='formPassword'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder='examplepassword'/>
                    </Form.Group>
                    <Button className="mt-3" variant='secondary' type='submit'>Login</Button>
                </Col>
            </Row>
            
        </Form>
    </>
}