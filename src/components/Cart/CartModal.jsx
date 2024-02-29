// import { useContext } from "react";
import { Modal } from "react-bootstrap";
// import { CartContext } from "../../store/cart-context";
import CartItem from "./CartItem";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { cartActions, userActions } from "../../store";
import { useEffect } from "react";

function CartModal() {
    // const cart = useContext(CartContext);
    const cart = useSelector(state => state.cart);
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        if (user.isLoggedIn) {
            console.log('cart is updated');
            console.log(cart);
            // sendCartToDB()
            dispatch(userActions.sendCartToDB(cart));
        }
    }, [cart]);

    function handleHideModal() {
        // call method from context Api
        // cart.hideCart();
        dispatch(cartActions.hide());
    }

    return (
        <>
            <Modal show={cart.isCartVisible} onHide={handleHideModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{cart.title}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {cart.items.length === 0 && <p>Cart is empty</p>}
                    {cart.items.length > 0 && (
                        <div>
                            {cart.items.map((item) => (
                                <CartItem key={item.id} item={item} />
                            ))}
                        </div>
                    )}
                </Modal.Body>

                <Modal.Footer>
                    <div className="me-auto">
                        Total Amount: ${cart.totalAmount}
                    </div>

                    <Link to='/checkout' className="btn btn-primary">Order</Link>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default CartModal;