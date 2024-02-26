import { useFormik } from 'formik';
import { Button, Form } from 'react-bootstrap';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../store/firebase';
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { userActions } from '../../store';

const validateForm = (values) => {
    const errors = {};

    if (!values.email) {
        errors.email = 'Required';
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(values.email)) {
        errors.email = 'Not valide Email value';
    }

    if (!values.password) {
        errors.password = 'Required';
    } else if (values.password.length < 5) {
        errors.password = 'Must be > 5';
    }

    return errors;
}

export default function LoginForm() {
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            // values
            email: '',
            password: ''
        },
        validate: validateForm,
        onSubmit: (values) => {
            console.log('Login')

            signInWithEmailAndPassword(auth, values.email, values.password)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    // ...
                    console.log(user);

                    dispatch(userActions.setActiveuser(user));

                    toast.success(`Welcome back!`, {});
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;

                    console.log(errorMessage);

                    toast.error(`${errorMessage}`, {});
                });
        }
    });

    return (
        <Form onSubmit={formik.handleSubmit}>
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
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
}
