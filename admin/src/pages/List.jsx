import axios from "axios";
import React, { useEffect, useState } from "react";
import { backUrl } from "../App";

const List = () => {
  const [list, setList] = useState([]);

  // Fetch Products
  const fetchList = async () => {
    try {
      const response = await axios.get(
        backUrl + "/api/product/list"
      );

      if (response.data.success) {
        setList(response.data.products);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Remove Product
  const removeProduct = async (id) => {
    try {
      const response = await axios.post(
        backUrl + "/api/product/remove",
        { id },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );

      if (response.data.success) {
        console.log(response.data.message);

        // Refresh List
        fetchList();
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="w-full px-4 sm:px-8 py-8">
      {/* Heading */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          All Products List
        </h1>

        <p className="text-gray-500 mt-2">
          Manage all your uploaded products here.
        </p>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        {/* Table Header */}
        <div className="hidden md:grid grid-cols-[120px_2fr_1fr_1fr_120px] gap-4 items-center bg-black text-white px-6 py-5 text-sm font-semibold">
          <p>Image</p>
          <p>Name</p>
          <p>Category</p>
          <p>Price</p>
          <p className="text-center">Action</p>
        </div>

        {/* Product List */}
        {list.length > 0 ? (
          list.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-1 md:grid-cols-[120px_2fr_1fr_1fr_120px] gap-4 items-center px-6 py-5 border-b border-gray-100 hover:bg-gray-50 transition"
            >
              {/* Image */}
              <div className="flex justify-center md:justify-start">
                <img
                  src={item.image[0]}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-2xl border border-gray-200 shadow-sm"
                />
              </div>

              {/* Name */}
              <div>
                <p className="text-lg font-semibold text-gray-800">
                  {item.name}
                </p>

                <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                  {item.description}
                </p>
              </div>

              {/* Category */}
              <div>
                <p className="inline-block px-4 py-2 rounded-xl bg-gray-100 text-gray-700 font-medium">
                  {item.category}
                </p>
              </div>

              {/* Price */}
              <div>
                <p className="text-xl font-bold text-black">
                  ${item.price}
                </p>
              </div>

              {/* Action */}
              <div className="flex justify-center md:justify-start">
                <button
                  onClick={() => removeProduct(item._id)}
                  className="px-5 py-2 rounded-xl bg-red-500 text-white font-medium hover:bg-red-600 transition-all duration-300 shadow-md"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="py-16 text-center">
            <p className="text-gray-500 text-lg">
              No products found.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default List;