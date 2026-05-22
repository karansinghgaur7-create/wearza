// ==========================================
// frontend/pages/PlaceOrder.jsx
// ==========================================

import React, {
  useEffect,
  useState,
} from "react";

import "./PlaceOrder.css";

import { useNavigate } from "react-router-dom";

import axios from "axios";

const PlaceOrder = () => {
  const navigate = useNavigate();

  const backendUrl =
    import.meta.env.VITE_BACKEND_URL;

  const [cartItems, setCartItems] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({
      firstName: "",
      lastName: "",
      email: "",
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
      phone: "",
    });

  // LOAD CART
  useEffect(() => {
    try {
      const items =
        JSON.parse(
          localStorage.getItem(
            "cartItems"
          )
        ) || [];

      setCartItems(items);
    } catch (error) {
      console.log(error);

      setCartItems([]);
    }
  }, []);

  // HANDLE INPUT
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // TOTALS
  const subtotal = cartItems.reduce(
    (total, item) =>
      total +
      Number(item.price || 0) *
        Number(item.quantity || 1),
    0
  );

  const deliveryFee =
    subtotal > 0 ? 10 : 0;

  const totalAmount =
    subtotal + deliveryFee;

  // PLACE ORDER
  const handlePlaceOrder =
    async () => {
      try {
        const emptyField =
          Object.values(formData).some(
            (value) =>
              !String(value).trim()
          );

        if (emptyField) {
          alert(
            "Please fill all fields"
          );
          return;
        }

        if (cartItems.length === 0) {
          alert("Cart is empty");
          return;
        }

        const token =
          localStorage.getItem("token");

        if (!token) {
          alert("Please login first");

          navigate("/login");

          return;
        }

        setLoading(true);

        const orderItems =
          cartItems.map((item) => ({
            _id: item._id,
            quantity:
              item.quantity || 1,
            size: item.size || "",
          }));

        const orderData = {
          items: orderItems,
          shippingAddress:
            formData,
        };

        const response =
          await axios.post(
            `${backendUrl}/api/order/create`,
            orderData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

        if (response.data.success) {
          alert(
            "Order Placed Successfully"
          );

          localStorage.removeItem(
            "cartItems"
          );

          setCartItems([]);

          navigate("/orders");
        } else {
          alert(
            response.data.message
          );
        }
      } catch (error) {
        console.log(error);

        alert(
          error.response?.data
            ?.message ||
            "Something went wrong"
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <section className="checkout">
      {/* LEFT SIDE */}
      <div className="checkout-left">
        <h2 className="title">
          <span>Delivery</span> Details
        </h2>

        <form
          className="checkout-form"
          onSubmit={(e) => {
            e.preventDefault();
            handlePlaceOrder();
          }}
        >
          <div className="row">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={
                formData.firstName
              }
              onChange={
                handleChange
              }
            />

            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={
                formData.lastName
              }
              onChange={
                handleChange
              }
            />
          </div>

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
          />

          <input
            type="text"
            name="street"
            placeholder="Street Address"
            value={formData.street}
            onChange={handleChange}
          />

          <div className="row">
            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
            />

            <input
              type="text"
              name="state"
              placeholder="State"
              value={formData.state}
              onChange={handleChange}
            />
          </div>

          <div className="row">
            <input
              type="text"
              name="zipCode"
              placeholder="Zip Code"
              value={
                formData.zipCode
              }
              onChange={
                handleChange
              }
            />

            <input
              type="text"
              name="country"
              placeholder="Country"
              value={
                formData.country
              }
              onChange={
                handleChange
              }
            />
          </div>

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
          />

          <button
            type="submit"
            className="place-btn"
            disabled={loading}
          >
            {loading
              ? "Placing..."
              : "Place Order"}
          </button>
        </form>
      </div>

      {/* RIGHT SIDE */}
      <div className="checkout-right">
        <div className="cart-box">
          <h3>
            <span>Cart</span> Summary
          </h3>

          <div className="cart-info-total">
            <p>Subtotal</p>

            <p>
              $
              {subtotal.toFixed(2)}
            </p>
          </div>

          <div className="cart-info-total">
            <p>Delivery Fee</p>

            <p>
              $
              {deliveryFee.toFixed(
                2
              )}
            </p>
          </div>

          <div className="cart-total-count">
            <p>Total</p>

            <p>
              $
              {totalAmount.toFixed(
                2
              )}
            </p>
          </div>
        </div>

        <div className="payment-box">
          <h3>
            <span>Payment</span>{" "}
            Method
          </h3>

          <div className="payment-options">
            <label className="payment-option active">
              <input
                type="radio"
                checked
                readOnly
              />

              <p>
                Cash on Delivery
              </p>
            </label>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlaceOrder;