import { Col, Container, Nav, Row, Tab } from "react-bootstrap";
import LoginForm from "../components/Auth/LoginForm";
import SignUpForm from "../components/Auth/SignUpForm";

export default function Login() {
    return (
        <Container className="m-5">
            <Row className="justify-content-center">
                <Col sm={8}>
                    <h1 className="mb-4">Login</h1>
                    <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                        <Nav variant="underline" className="mb-4">
                            <Nav.Item>
                                <Nav.Link eventKey="first">Login</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="second">Sign up</Nav.Link>
                            </Nav.Item>
                        </Nav>
                        <Tab.Content>
                            <Tab.Pane eventKey="first">
                                <LoginForm />
                            </Tab.Pane>
                            <Tab.Pane eventKey="second">
                                <SignUpForm />
                            </Tab.Pane>
                        </Tab.Content>
                    </Tab.Container>
                </Col>
            </Row>
        </Container>
    )
}
