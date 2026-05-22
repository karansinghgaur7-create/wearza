// src/pages/Add.jsx

import React, { useState } from "react";
import axios from "axios";
import upload_area from "../assets/upload_area.png";

const Add = () => {
  // Image States
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  // Product States
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [price, setPrice] = useState("");
  const [bestseller, setBestseller] = useState(false);

  // Sizes
  const [sizes, setSizes] = useState([]);

  // Toggle Sizes
  const toggleSize = (size) => {
    if (sizes.includes(size)) {
      setSizes((prev) => prev.filter((item) => item !== size));
    } else {
      setSizes((prev) => [...prev, size]);
    }
  };

  // Submit Handler
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      if (sizes.length === 0) {
        alert("Please select at least one size");
        return;
      }

      const formData = new FormData();

      // Text Data
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestseller", bestseller);
      formData.append("sizes", JSON.stringify(sizes));

      // Images
      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      const response = await axios.post(
        "http://localhost:8000/api/product/add",
        formData,
        {
          headers: {
            token: localStorage.getItem("token"),
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        alert(response.data.message);

        // Reset Form
        setName("");
        setDescription("");
        setCategory("Men");
        setSubCategory("Topwear");
        setPrice("");
        setBestseller(false);
        setSizes([]);

        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  return (
    <div className="w-full py-8 px-2 sm:px-6">
      <form
        onSubmit={onSubmitHandler}
        className="w-full max-w-5xl bg-white rounded-3xl shadow-xl border border-gray-100 p-6 sm:p-10 flex flex-col gap-10"
      >
        {/* Heading */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Add New Product
          </h1>

          <p className="text-gray-500 mt-2 text-sm">
            Fill in the product details and upload product images.
          </p>
        </div>

        {/* Upload Images */}
        <div>
          <p className="text-lg font-semibold text-gray-800 mb-5">
            Upload Product Images
          </p>

          <div className="flex flex-wrap gap-5">
            {[1, 2, 3, 4].map((num) => (
              <label
                key={num}
                htmlFor={`image${num}`}
                className="group cursor-pointer"
              >
                <div className="w-40 h-36 rounded-2xl border-2 border-dashed border-gray-300 overflow-hidden bg-gray-50 hover:border-black hover:shadow-lg transition-all duration-300">
                  <img
                    className="w-full h-full group-hover:scale-105 transition duration-300"
                    src={
                      !eval(`image${num}`)
                        ? upload_area
                        : URL.createObjectURL(eval(`image${num}`))
                    }
                    alt=""
                  />
                </div>

                <input
                  type="file"
                  id={`image${num}`}
                  hidden
                  accept="image/*"
                  required={num === 1}
                  onChange={(e) => {
                    const file = e.target.files[0];

                    if (num === 1) setImage1(file);
                    if (num === 2) setImage2(file);
                    if (num === 3) setImage3(file);
                    if (num === 4) setImage4(file);
                  }}
                />
              </label>
            ))}
          </div>
        </div>

        {/* Product Name */}
        <div>
          <p className="text-lg font-semibold text-gray-800 mb-3">
            Product Name
          </p>

          <input
            required
            type="text"
            placeholder="Enter product name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full max-w-2xl px-5 py-4 rounded-xl border border-gray-300 focus:border-black focus:ring-2 focus:ring-gray-200 outline-none transition"
          />
        </div>

        {/* Product Description */}
        <div>
          <p className="text-lg font-semibold text-gray-800 mb-3">
            Product Description
          </p>

          <textarea
            required
            rows={6}
            placeholder="Write product description here..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full max-w-2xl px-5 py-4 rounded-xl border border-gray-300 focus:border-black focus:ring-2 focus:ring-gray-200 outline-none resize-none transition"
          />
        </div>

        {/* Category + Subcategory + Price */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Category */}
          <div>
            <p className="text-lg font-semibold text-gray-800 mb-3">
              Category
            </p>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-5 py-4 rounded-xl border border-gray-300 focus:border-black focus:ring-2 focus:ring-gray-200 outline-none transition"
            >
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
            </select>
          </div>

          {/* Sub Category */}
          <div>
            <p className="text-lg font-semibold text-gray-800 mb-3">
              Sub Category
            </p>

            <select
              value={subCategory}
              onChange={(e) => setSubCategory(e.target.value)}
              className="w-full px-5 py-4 rounded-xl border border-gray-300 focus:border-black focus:ring-2 focus:ring-gray-200 outline-none transition"
            >
              <option value="Topwear">Topwear</option>
              <option value="Bottomwear">Bottomwear</option>
              <option value="Winterwear">Winterwear</option>
            </select>
          </div>

          {/* Price */}
          <div>
            <p className="text-lg font-semibold text-gray-800 mb-3">
              Price
            </p>

            <input
              required
              type="number"
              placeholder="$25"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full px-5 py-4 rounded-xl border border-gray-300 focus:border-black focus:ring-2 focus:ring-gray-200 outline-none transition"
            />
          </div>
        </div>

        {/* Sizes */}
        <div>
          <p className="text-lg font-semibold text-gray-800 mb-4">
            Available Sizes
          </p>

          <div className="flex flex-wrap gap-4">
            {["S", "M", "L", "XL", "XXL"].map((size, index) => (
              <button
                type="button"
                key={index}
                onClick={() => toggleSize(size)}
                className={`px-6 py-3 rounded-xl border transition-all duration-300 font-medium
                  ${
                    sizes.includes(size)
                      ? "bg-black text-white border-black"
                      : "border-gray-300 bg-gray-50 hover:bg-black hover:text-white hover:border-black"
                  }
                `}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Bestseller */}
        <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-2xl border border-gray-200 w-fit">
          <input
            type="checkbox"
            id="bestseller"
            checked={bestseller}
            onChange={() => setBestseller(!bestseller)}
            className="w-5 h-5 accent-black cursor-pointer"
          />

          <label
            htmlFor="bestseller"
            className="text-gray-700 font-medium cursor-pointer"
          >
            Add to Bestseller
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full sm:w-56 py-4 rounded-2xl bg-black text-white font-semibold text-lg hover:bg-gray-800 hover:shadow-xl transition-all duration-300"
        >
          ADD PRODUCT
        </button>
      </form>
    </div>
  );
};

export default Add;