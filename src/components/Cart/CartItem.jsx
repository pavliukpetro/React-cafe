import { Button, Card, Col, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { cartActions } from "../../store";

export default function CartItem({ item }) {
    const dispatch = useDispatch();

    function handleDelete() {
        dispatch(cartActions.removeItem(item));
    }

    return (
        <Card className="mb-3">
            <Card.Body>
                <Row>
                    <Col>
                        <Card.Title>{item.name}</Card.Title>
                        <Card.Text as={'h5'} className="text-success">${item.price}</Card.Text>
                    </Col>
                    <Col sm={4}>
                        <Card.Text>
                            <Button variant="outline-primary" className="me-2">-</Button>
                            {item.qty}
                            <Button variant="outline-primary" className="ms-2">+</Button>
                        </Card.Text>
                    </Col>
                    <Col sm={3}>
                        <Card.Text>
                            <Button variant="danger" onClick={handleDelete}>Delete</Button>
                        </Card.Text>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    )
}
