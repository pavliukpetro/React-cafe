import { useContext } from "react";
import { Modal } from "react-bootstrap";
import { CartContext } from "../../store/cart-context";
import CartItem from "./CartItem";
import { Link } from "react-router-dom";

function CartModal() {
    const cart = useContext(CartContext);

    function handleHideModal() {
        // call method from context Api
        cart.hideCart();
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