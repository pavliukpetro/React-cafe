import { useContext } from "react";
import { Badge, Button, Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { BsCartFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { CartContext } from "../store/cart-context";

export default function Header() {
    const cart = useContext(CartContext);

    console.log(cart);

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container fluid>
                <Navbar.Brand href="#">Navbar scroll</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Link to='/' className="nav-link">Home</Link>
                        <NavDropdown title="Link" id="navbarScrollingDropdown">
                            <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action4">
                                Another action
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action5">
                                Something else here
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Link to='/login' className="me-3 nav-link">Login</Link>
                    <Button variant="success" onClick={cart.showCart} >
                        <BsCartFill className="me-2" />
                        Cart <Badge bg="secondary">{cart.totalQuantity}</Badge>
                    </Button>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
