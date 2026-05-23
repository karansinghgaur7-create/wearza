import React, { useContext } from "react";
import { FaTrash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Cart.css";
import { ShopContext } from "../context/shopContext";

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, token, updateCart } = useContext(ShopContext);

  // INCREASE QUANTITY
  const increaseQty = (index) => {
    const updatedCart = [...cartItems];

    updatedCart[index].quantity += 1;

    updateCart(updatedCart);
  };

  // DECREASE QUANTITY
  const decreaseQty = (index) => {
    const updatedCart = [...cartItems];

    if (updatedCart[index].quantity > 1) {
      updatedCart[index].quantity -= 1;
    } else {
      updatedCart.splice(index, 1);
    }

    updateCart(updatedCart);
  };

  // REMOVE ITEM
  const removeItem = (index) => {
    const updatedCart = [...cartItems];

    updatedCart.splice(index, 1);

    updateCart(updatedCart);
  };

  // TOTAL PRICE
  const totalPrice = cartItems.reduce(
    (total, item) =>
      total + Number(item.price) * item.quantity,
    0
  );

  return (
    <div className="cart-container">
      <h1 className="cart-title">
        <span>Shopping</span> Cart
      </h1>

      <div className="cart-items">
        {cartItems.length === 0 ? (
          <p className="empty-cart">
            Your cart is empty.
          </p>
        ) : (
          cartItems.map((item, index) => (
            <div
              className="cart-item"
              key={`${item._id}-${item.size}`}
            >
              <div className="cart-left">
                <img
                  src={item.image}
                  alt={item.name}
                  className="cart-image"
                />

                <div className="cart-info">
                  <h3>{item.name}</h3>

                  <p>Size: {item.size}</p>

                  <p className="price">
                    ${Number(item.price).toFixed(2)}
                  </p>

                  <div className="quantity-box">
                    <button
                      className="qty-btn"
                      onClick={() =>
                        decreaseQty(index)
                      }
                    >
                      -
                    </button>

                    <span className="qty-number">
                      {item.quantity}
                    </span>

                    <button
                      className="qty-btn"
                      onClick={() =>
                        increaseQty(index)
                      }
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <button
                className="remove-btn"
                onClick={() =>
                  removeItem(index)
                }
              >
                <FaTrash />
              </button>
            </div>
          ))
        )}
      </div>

      {cartItems.length > 0 && (
        <div className="cart-summary">
          <h2>
            Total: ${totalPrice.toFixed(2)}
          </h2>

          <Link
            to="/place-order"
            className="checkout-btn"
          >
            PROCEED TO CHECKOUT
          </Link>
        </div>
      )}
    </div>
  );
};

export default Cart;