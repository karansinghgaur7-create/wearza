// Product.jsx

import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { ShopContext } from "../context/shopContext";

import "./Product.css";

import { assets } from "../assets/assets";

import RelatedProducts from "../components/RelatedProducts";

const Product = () => {

  const { productId } = useParams();

  const { products } = useContext(ShopContext);

  const [productData, setProductData] = useState(null);

  const [image, setImage] = useState("");

  const [size, setSize] = useState("");

  const [message, setMessage] = useState("");

  // FETCH PRODUCT
  useEffect(() => {

    const product = products.find(
      (item) => item._id === productId
    );

    if (product) {

      setProductData(product);

      setImage(product.image[0]);

    }

  }, [productId, products]);

  // CLEAR MESSAGE
  useEffect(() => {

    if (!message) return;

    const timer = setTimeout(() => {
      setMessage("");
    }, 2000);

    return () => clearTimeout(timer);

  }, [message]);

  // ADD TO CART
  const addToCart = () => {

    if (!size) {
      setMessage("Please select a size");
      return;
    }

    // GET EXISTING CART
    const existingCart =
      JSON.parse(localStorage.getItem("cartItems")) || [];

    // NEW PRODUCT
    const newProduct = {
      _id: productData._id,
      name: productData.name,
      price: productData.price,
      image: productData.image[0],
      size: size,
      quantity: 1,
    };

    // CHECK PRODUCT EXISTS
    const productIndex = existingCart.findIndex(
      (item) =>
        item._id === newProduct._id &&
        item.size === newProduct.size
    );

    if (productIndex !== -1) {

      // INCREASE QUANTITY
      existingCart[productIndex].quantity += 1;

    } else {

      // ADD NEW PRODUCT
      existingCart.push(newProduct);

    }

    // SAVE CART
    localStorage.setItem(
      "cartItems",
      JSON.stringify(existingCart)
    );

    // UPDATE COUNT
    const totalCount = existingCart.reduce(
      (total, item) => total + item.quantity,
      0
    );

    localStorage.setItem(
      "cartCount",
      totalCount
    );

    // UPDATE NAVBAR
    window.dispatchEvent(new Event("cartUpdated"));

    setMessage("Product added to cart");
  };

  if (!productData) {
    return <div className="loading"></div>;
  }

  return (
    <div className="product container">

      <div className="product-container">

        {/* LEFT SIDE */}
        <div className="product-images">

          {/* THUMBNAILS */}
          <div className="thumbnail-container">

            {productData.image.map((item, index) => (

              <img
                key={index}
                src={item}
                alt={productData.name}
                className="thumbnail-image"
                onClick={() => setImage(item)}
              />

            ))}

          </div>

          {/* MAIN IMAGE */}
          <div className="main-image-container">

            <img
              src={image}
              alt={productData.name}
              className="main-image"
            />

          </div>

          {/* DETAILS */}
          <div className="product-details">

            <h1 className="product-title">
              {productData.name}
            </h1>

            {/* RATING */}
            <div className="rating-container">

              {[1, 2, 3, 4].map((star) => (

                <img
                  key={star}
                  src={assets.star_icon}
                  alt="star"
                  className="star-icon"
                />

              ))}

              <img
                src={assets.star_dull_icon}
                alt="star"
                className="star-icon"
              />

              <p className="rating-count">(122)</p>

            </div>

            {/* PRICE */}
            <p className="product-priceee">
              ${productData.price}
            </p>

            {/* DESCRIPTION */}
            <p className="product-description">
              {productData.description}
            </p>

            {/* SIZE */}
            <div className="size-section">

              <p className="size-title">
                Select Size
              </p>

              <div className="size-buttons">

                {productData.sizes.map((item) => (

                  <button
                    key={item}
                    onClick={() => setSize(item)}
                    className={`size-button ${
                      size === item
                        ? "active-size"
                        : ""
                    }`}
                  >
                    {item}
                  </button>

                ))}

              </div>

              {/* ADD TO CART BUTTON */}
              <button
                onClick={addToCart}
                className="add-to-cart-btn"
              >
                ADD TO CART
              </button>

              {/* MESSAGE */}
              {message && (
                <p className="cart-message">
                  {message}
                </p>
              )}

              <hr className="product-divider" />

              {/* INFO */}
              <div className="product-info">

                <p>100% Original product.</p>

                <p>
                  Cash on delivery is available on this product.
                </p>

                <p>
                  Easy return and exchange policy within 7 days.
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* TABS */}
      <div className="product-tabs-section">

        <div className="tabs-header">

          <div className="tab-button active-tab">
            Description
          </div>

          <div className="tab-button">
            Review (122)
          </div>

        </div>

        <div className="tab-content">

          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>

          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>

        </div>

      </div>

      {/* RELATED PRODUCTS */}
      <RelatedProducts
        category={productData.category}
        subCategory={productData.subCategory}
      />

    </div>
  );
};

export default Product;