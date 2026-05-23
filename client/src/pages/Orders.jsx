import React from "react";
import { products } from "../assets/assets.js";
import "./Order.css";

const Orders = () => {
  return (
    <div className="orders container">
      <div className="orders-title">
        <h2>MY ORDERS</h2>
      </div>

      <div>
        {products.slice(1, 4).map((item, index) => (
          <div key={index} className="order-item">
            <div className="order-info">
              <img
                className="order-image"
                src={item.image[0]}
                alt=""
              />

              <div>
                <p>{item.name}</p>
                <p>${item.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;