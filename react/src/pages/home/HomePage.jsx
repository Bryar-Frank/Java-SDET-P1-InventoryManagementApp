import 'bootstrap/dist/css/bootstrap.min.css'
import { Button, Alert, Breadcrumb, Card, Form } from 'react-bootstrap'
import { Container, Row, Col } from 'react-bootstrap'
import inventoryLogo from '../../assets/inventoryLogo.jpg'


export function HomePage () {
    
    
    return <>
    <Container>
        {/* mb-3 is 3 units of margin border */}
        <Card className="mb-2" style={{ background: "#AAA"}}>
            <Card.Body>
                <Card.Title>
                    <h2>Inventory Manager</h2>
                </Card.Title>
            </Card.Body>
            <Card.Img src={inventoryLogo} width="120" height="480"/>
        </Card>
    </Container>
    </>
}