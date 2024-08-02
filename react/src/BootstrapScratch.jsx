import 'bootstrap/dist/css/bootstrap.min.css'
import { Button, Alert, Breadcrumb, Card, Form } from 'react-bootstrap'
import { Container, Row, Col } from 'react-bootstrap'


export default function BootstrapScratch () {


    return <>
    <Container>
        <Breadcrumb>
            <Breadcrumb.Item>Test 1</Breadcrumb.Item>
            <Breadcrumb.Item active>Test 2</Breadcrumb.Item>
            <Breadcrumb.Item>Test 3</Breadcrumb.Item>
        </Breadcrumb>
        {/* mb-3 is 3 units of margin border */}
        <Card className="mb-3" style={{ background: "#DEF"}}>
            <Card.Img src='https://cdn.britannica.com/70/234870-050-D4D024BB/Orange-colored-cat-yawns-displaying-teeth.jpg'/>
            <Card.Body>
                <Card.Title>
                    Card Example
                </Card.Title>
                <Card.Body>
                    This is an example of react bootstrap cards
                </Card.Body>
                <Button variant='primary'>Read More</Button>
            </Card.Body>
        </Card>

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
    </Container>

        <Alert variant='success'>This is an Alert</Alert>
        <Button>Test Button</Button>
    </>
}