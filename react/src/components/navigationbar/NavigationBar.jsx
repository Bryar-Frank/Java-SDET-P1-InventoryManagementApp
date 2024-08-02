import './NavigationBar.css'
import { Navbar, Container, Nav } from 'react-bootstrap'
import logo from '../../assets/tabIcon.png'
import { Link } from 'react-router-dom'

export default function NavigationBar() {

  return <>
    <Navbar bg="dark" data-bs-theme="dark" id='navbar'>
        <Container>

          <Navbar.Brand as={Link} to="/home">
            <img
              alt="Inventory Manager Logo"
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}Inventory Manager
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/inventory">All Inventory</Nav.Link>
            <Nav.Link as={Link} to="/warehouses">Warehouses</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
  </>
}