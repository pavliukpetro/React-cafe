import { useContext, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { toast } from 'react-toastify';
import { CartContext } from "../../store/cart-context";

export default function Product({ product }) {
    const [productQty, setProductQty] = useState(1);
    const cart = useContext(CartContext);

    function handleSubmit(e) {
        // console.log(productQty, product);
        e.preventDefault();

        const addedProduct = {
            ...product,
            qty: productQty
        };

        cart.addItem(addedProduct);

        toast.success(`${productQty} ${product.name} ${productQty > 1 ? 'are' : 'is'} added to cart`, {

        });
    }

    return (
        <Card className="mb-4">
            <Card.Body>
                <Container>
                    <Row>
                        <Col>
                            <Card.Title>{product.name}</Card.Title>
                            <Card.Text>
                                {product.description}
                            </Card.Text>
                            <Card.Text as={'h3'} className="text-success">
                                ${product.price}
                            </Card.Text>
                        </Col>
                        <Col sm={3}>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Quantity</Form.Label>
                                    <Form.Control
                                        type="number"
                                        min="1"
                                        placeholder="Enter qty"
                                        value={productQty}
                                        onChange={(e) => setProductQty(Number(e.target.value))}
                                    />
                                </Form.Group>
                                <Button type="submit">Buy</Button>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </Card.Body>
        </Card>
    );
}
