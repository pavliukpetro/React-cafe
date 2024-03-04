import { Button, Form, Input, List, Typography } from "antd";
import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { child, push, ref, set, update } from "firebase/database";
import { database } from "../store/firebase";
import { toast } from "react-toastify";
import { cartActions } from "../store";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector(state => state.user);
    const cart = useSelector(state => state.cart);
    const [firstName, setFirstName] = useState('');
    const [lastName, setlastName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [phone, setPhone] = useState('');

    const data = cart.items;

    function handleSubmit() {
        const order = {
            items: cart.items,
            orderInfo: {
                firstName,
                lastName,
                email,
                address,
                city,
                phone
            }
        };

        const newOrderKey = push(child(ref(database), 'users/' + user.userId + '/orders')).key;

        const updates = {};
        updates['users/' + user.userId + '/orders' + '/' + newOrderKey] = order;

        update(ref(database), updates)
            .then(() => {
                // Data saved successfully!
                toast.success('Order has been placed!');
                dispatch(cartActions.clear());
                navigate('/orders');
            })
            .catch((error) => {
                // The write failed...
                toast.danger('Error!');
            });
    }

    return (
        <Container>
            <Row className="justify-content-center">
                <Col sm={9} className="text-center my-5">
                    <h1>Checkout</h1>
                </Col>
            </Row>
            <Row className="justify-content-center">
                <Col sm={9}>
                    <Row>
                        <Col sm={8}>
                            <Typography.Title level={4}>Billing address</Typography.Title>
                            <Form layout="vertical" onFinish={handleSubmit}>
                                <Row>
                                    <Col sm={6}>
                                        <Form.Item
                                            name="firstname"
                                            label="First Name"
                                            rules={[{ required: true, message: 'Please input your first name!' }]}
                                        >
                                            <Input placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                                        </Form.Item>
                                    </Col>

                                    <Col sm={6}>
                                        <Form.Item
                                            name="lastname"
                                            label="Last Name"
                                            rules={[{ required: true, message: 'Please input your Last name!' }]}
                                        >
                                            <Input placeholder="Last Name" value={lastName} onChange={(e) => setlastName(e.target.value)} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Item
                                            name="email"
                                            label="Email"
                                            rules={[{ required: true, message: 'Please input your Email!' }]}
                                        >
                                            <Input placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Item
                                            name="address"
                                            label="Address"
                                            rules={[{ required: true, message: 'Please input your Address' }]}
                                        >
                                            <Input placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={6}>
                                        <Form.Item
                                            name="city"
                                            label="City"
                                            rules={[{ required: true, message: 'Please input your City' }]}
                                        >
                                            <Input placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} />
                                        </Form.Item>
                                    </Col>
                                    <Col sm={6}>
                                        <Form.Item
                                            name="phone"
                                            label="Phone"
                                            rules={[{ required: true, message: 'Please input your Phone' }]}
                                        >
                                            <Input placeholder="Phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Form.Item>
                                    <Button type="primary" htmlType="submit">Submit</Button>
                                </Form.Item>
                            </Form>
                        </Col>
                        <Col sm={4}>
                            <Typography.Title level={4}>Your Cart</Typography.Title>
                            <List
                                footer={<Typography.Title level={5}>Total: ${cart.totalAmount}</Typography.Title>}
                                bordered
                                dataSource={data}
                                renderItem={(item) => (
                                    <List.Item>
                                        <Typography.Text>{item.name} x {item.qty}</Typography.Text>
                                        <div>${item.price}</div>
                                    </List.Item>
                                )}
                            />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}
