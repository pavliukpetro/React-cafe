import { NavDropdown } from "react-bootstrap";
import { auth } from "../../store/firebase";
import { signOut } from "firebase/auth";
import { useDispatch } from "react-redux";
import { cartActions, userActions } from "../../store";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export default function HeaderUser({ user }) {
    const dispatch = useDispatch();

    function handleLogout() {
        signOut(auth).then(() => {
            // Sign-out successful.
            dispatch(userActions.logOut());
            dispatch(cartActions.clear());
        }).catch((error) => {
            // An error happened.
            toast.danger(`Cannot log out`, {});
        });
    }

    return (
        <NavDropdown
            id="nav-dropdown-dark-example"
            title="User"
            drop="down-centered"
            align="start"
            className="me-3"
        >
            <NavDropdown.Header>Welcome, {user.name ? user.name : 'Jonh Doe'}!</NavDropdown.Header>
            <NavDropdown.Divider />
            <Link to="/account" className="dropdown-item">Account</Link>
            <Link to="/orders" className="dropdown-item">Orders</Link>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#" onClick={handleLogout}>Logout</NavDropdown.Item>
        </NavDropdown>
    )
}
