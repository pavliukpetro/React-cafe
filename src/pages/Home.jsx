import { Col, Container, Row } from "react-bootstrap";
import Products from "../components/Products/Products";

export default function Home() {
    return (
        <>
            <Container>
                <Row className="justify-content-center">
                    <Col sm={9} className="text-center my-5">
                        <h1>React Cafe</h1>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati laborum sunt ad molestiae deserunt perferendis aliquam porro eos animi non. Et, deleniti eum maxime sed earum libero saepe corrupti molestiae.</p>
                    </Col>
                </Row>

                <Row className="justify-content-center">
                    <Col sm={9} className="my-5">
                        <Products />
                    </Col>
                </Row>
            </Container>
        </>
    )
}
