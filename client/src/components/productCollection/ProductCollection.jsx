// src/pages/productCollection/ProductCollection.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import "./productCollection.css";

import { assets } from "../../assets/assets";
import ProductItem from "../collection/ProductItem";

const ProductCollection = () => {
  // ================= STATES =================
  const [showFilter, setShowFilter] = useState(false);

  const [filterProducts, setFilterProducts] = useState([]);

  const [category, setCategory] = useState([]);

  const [subCategory, setSubCategory] = useState([]);

  const [products, setProducts] = useState([]);

  const [sortType, setSortType] = useState("relevant");

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // ================= CATEGORY FILTER =================
  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory((prev) =>
        prev.filter((item) => item !== e.target.value)
      );
    } else {
      setCategory((prev) => [...prev, e.target.value]);
    }
  };

  // ================= SUBCATEGORY FILTER =================
  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory((prev) =>
        prev.filter((item) => item !== e.target.value)
      );
    } else {
      setSubCategory((prev) => [...prev, e.target.value]);
    }
  };

  // ================= APPLY FILTER + SORT =================
  const applyFilter = () => {
    let productsCopy = [...products];

    // ================= CATEGORY FILTER =================
    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        category.includes(item.category.toLowerCase())
      );
    }

    // ================= SUBCATEGORY FILTER =================
    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        subCategory.includes(item.subCategory.toLowerCase())
      );
    }

    // ================= SORTING =================
    switch (sortType) {
      case "low":
        productsCopy.sort((a, b) => a.price - b.price);
        break;

      case "high":
        productsCopy.sort((a, b) => b.price - a.price);
        break;

      default:
        break;
    }

    // ================= UPDATE FILTERED PRODUCTS =================
    setFilterProducts(productsCopy);
  };

  // ================= FETCH PRODUCTS =================
  const getProductsData = async () => {
    try {
      const response = await axios.get(
        backendUrl + "/api/product/list"
      );

      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // ================= INITIAL LOAD =================
  useEffect(() => {
    getProductsData();
  }, []);

  // ================= FILTER + SORT =================
  useEffect(() => {
    applyFilter();
  }, [category, subCategory, sortType, products]);

  return (
    <div className="collection-container container">
      {/* ================= FILTER SECTION ================= */}
      <div className="filter-container">
        <p
          className="filter-title"
          onClick={() => setShowFilter((prev) => !prev)}
        >
          FILTER

          <img
            className={`dropdown-icon ${
              showFilter ? "rotate" : ""
            }`}
            src={assets.dropdown_icon}
            alt="dropdown"
          />
        </p>

        {/* ================= CATEGORY ================= */}
        <div
          className={`filter-category ${
            showFilter ? "show" : ""
          }`}
        >
          <p className="category-title">CATEGORY</p>

          <div className="category-checkBox">
            <label className="checkbox-item">
              <input
                type="checkbox"
                value="men"
                onChange={toggleCategory}
              />
              Men
            </label>

            <label className="checkbox-item">
              <input
                type="checkbox"
                value="women"
                onChange={toggleCategory}
              />
              Women
            </label>

            <label className="checkbox-item">
              <input
                type="checkbox"
                value="kids"
                onChange={toggleCategory}
              />
              Kids
            </label>
          </div>
        </div>

        {/* ================= TYPE ================= */}
        <div
          className={`filter-category ${
            showFilter ? "show" : ""
          }`}
        >
          <p className="category-title">TYPE</p>

          <div className="category-checkBox">
            <label className="checkbox-item">
              <input
                type="checkbox"
                value="topwear"
                onChange={toggleSubCategory}
              />
              Topwear
            </label>

            <label className="checkbox-item">
              <input
                type="checkbox"
                value="bottomwear"
                onChange={toggleSubCategory}
              />
              Bottomwear
            </label>

            <label className="checkbox-item">
              <input
                type="checkbox"
                value="winterwear"
                onChange={toggleSubCategory}
              />
              Winterwear
            </label>
          </div>
        </div>
      </div>

      {/* ================= PRODUCT SECTION ================= */}
      <div className="collection-content">
        {/* ================= HEADER ================= */}
        <div className="collection-header">
          <h2 className="all-collection-title">
            <span>All</span> Collection
          </h2>

          {/* ================= SORT ================= */}
          <select
            className="sort-select"
            onChange={(e) => setSortType(e.target.value)}
          >
            <option value="relevant">
              Sort by : Relevant
            </option>

            <option value="low">
              Sort by : Low to High
            </option>

            <option value="high">
              Sort by : High to Low
            </option>
          </select>
        </div>

        {/* ================= PRODUCTS GRID ================= */}
        <div className="all-products">
          {filterProducts.length > 0 ? (
            filterProducts.map((item) => (
              <ProductItem
                key={item._id}
                id={item._id}
                name={item.name}
                price={item.price}
                image={item.image}
              />
            ))
          ) : (
            <p className="no-products">
              No Products Found
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCollection;