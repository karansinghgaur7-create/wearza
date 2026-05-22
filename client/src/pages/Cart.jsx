
import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Cart.css";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const token = localStorage.getItem("token");

  // LOAD CART FROM LOCAL STORAGE
  useEffect(() => {
    try {
      const items =
        JSON.parse(localStorage.getItem("cartItems")) || [];

      setCartItems(items);
    } catch (error) {
      console.error("Invalid cart data:", error);
      setCartItems([]);
    }
  }, []);

  // GET USER CART FROM BACKEND
  const getUserCart = async () => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/cart/get`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        const backendCart = response.data.cartData || [];

        setCartItems(backendCart);

        localStorage.setItem(
          "cartItems",
          JSON.stringify(backendCart)
        );
      }
    } catch (error) {
      console.error(
        "Failed to fetch cart:",
        error.response?.data || error.message
      );
    }
  };

  // FETCH CART
  useEffect(() => {
    if (token) {
      getUserCart();
    }
  }, []);

  // UPDATE CART
  const updateCart = async (updatedCart) => {
    setCartItems(updatedCart);

    localStorage.setItem(
      "cartItems",
      JSON.stringify(updatedCart)
    );

    if (token) {
      try {
        await axios.post(
          `${backendUrl}/api/cart/update`,
          {
            cartData: updatedCart,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } catch (error) {
        console.error(
          "Failed to update cart:",
          error.response?.data || error.message
        );
      }
    }
  };

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