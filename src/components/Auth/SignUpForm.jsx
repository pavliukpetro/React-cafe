import { useFormik } from 'formik';
import { Button, Form } from 'react-bootstrap';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../../store/firebase';
import { toast } from "react-toastify";
import { userActions } from '../../store';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ref, set } from "firebase/database";
import { database } from '../../store/firebase';

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
    const dispatch = useDispatch();
    const navigate = useNavigate();

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

                    // Update User name in Firebase Auth
                    updateProfile(auth.currentUser, {
                        displayName: values.name
                    }).then(() => {
                        // Profile updated!
                        console.log('Profile updated!');
                        dispatch(userActions.setActiveuser(user));
                    }).catch((error) => {
                        // An error occurred
                        toast.danger(`User is not updated`, {});
                    });

                    // Create User in DB
                    set(ref(database, 'users/' + user.uid), {
                        name: values.name,
                        email: values.email,
                        uid: user.uid,
                        orders: {},
                        cart: {}
                    });

                    navigate('/');

                    toast.success(`User is created`, {});

                })
                .catch((error) => {
                    const errorMessage = error.message;
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
