export default function NewProductForm () {

    return <>
        <h2>New Product Form</h2>
        <Form onSubmit={submitForm}>
            <Form.Group className="mb-3" >
                <Form.Label>Warehouse</Form.Label>
                <Form.Control type="text" name='warehouseName' />
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