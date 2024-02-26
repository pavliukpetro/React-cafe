import { useFormik } from 'formik';
import { Button, Form } from 'react-bootstrap';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../store/firebase';
import { toast } from "react-toastify";

const validateForm = (values) => {
    const errors = {};

    if (!values.name) {
        errors.name = 'Required';
    }

    if (!values.email) {
        errors.email = 'Required';
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(values.email)) {
        errors.email = 'Not valide Email value';
    }

    if (!values.password) {
        errors.password = 'Required';
    } else if (values.password.length < 6) {
        errors.password = 'Must be at least 6';
    }

    return errors;
}

export default function SignUpForm() {
    const formik = useFormik({
        initialValues: {
            // values
            name: '',
            email: '',
            password: ''
        },
        validate: validateForm,
        onSubmit: (values) => {
            console.log('Submit');

            createUserWithEmailAndPassword(auth, values.email, values.password)
                .then((userCredential) => {
                    // Signed up 
                    const user = userCredential.user;
                    // ...
                    console.log(user);

                    toast.success(`User is created`, {});

                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    // ..
                    console.log(errorMessage);
                    toast.error(`${errorMessage}`, {});
                });
        }
    });

    return (
        <Form onSubmit={formik.handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                    type="text"
                    name="name"
                    placeholder="Enter name"
                    value={formik.values.name}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                />
                {formik.touched.name && formik.errors.name &&
                    <Form.Text className="text-danger">
                        {formik.errors.name}
                    </Form.Text>
                }
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                    type="text"
                    name="email"
                    placeholder="Enter email"
                    value={formik.values.email}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                />
                {formik.touched.email && formik.errors.email &&
                    <Form.Text className="text-danger">
                        {formik.errors.email}
                    </Form.Text>
                }
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formik.values.password}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                />
                {formik.touched.password && formik.errors.password &&
                    <Form.Text className="text-danger">
                        {formik.errors.password}
                    </Form.Text>
                }
            </Form.Group>

            <Button variant="primary" type="submit">
                Submit
            </Button>

        </Form>
    )
}
