// ==========================================
// src/context/ShopContext.jsx
// ==========================================

import React, {
  createContext,
  useEffect,
  useState,
} from "react";

import axios from "axios";
import { toast } from "react-toastify";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {

  const currency = "$";

  const delivery_fee = 10;

  const backendUrl =
    import.meta.env.VITE_BACKEND_URL;

  // ==========================================
  // STATES
  // ==========================================

  const [token, setToken] = useState(
    localStorage.getItem("token") || ""
  );

  const [cartItems, setCartItems] =
    useState([]);

  const [products, setProducts] =
    useState([]);

  // ==========================================
  // GET CART COUNT
  // ==========================================

  const getCartCount = () => {
    return cartItems.reduce(
      (total, item) =>
        total + item.quantity,
      0
    );
  };

  // ==========================================
  // ADD TO CART
  // ==========================================

  const addToCart = async (
    product,
    size
  ) => {

    if (!size) {
      toast.error(
        "Select Product Size"
      );
      return;
    }

    let cartData =
      JSON.parse(
        localStorage.getItem(
          "cartItems"
        )
      ) || [];

    const existingIndex =
      cartData.findIndex(
        (item) =>
          item._id === product._id &&
          item.size === size
      );

    if (existingIndex !== -1) {
      cartData[
        existingIndex
      ].quantity += 1;
    } else {
      cartData.push({
        _id: product._id,
        name: product.name,
        image: product.image[0] || product.image,
        price: product.price,
        quantity: 1,
        size,
      });
    }

    setCartItems(cartData);

    localStorage.setItem(
      "cartItems",
      JSON.stringify(cartData)
    );

    // Update count for navbar compatibility
    const totalCount = cartData.reduce(
      (total, item) => total + item.quantity,
      0
    );
    localStorage.setItem("cartCount", totalCount);
    window.dispatchEvent(new Event("cartUpdated"));

    // OPTIONAL BACKEND SAVE
    if (token) {
      try {
        await axios.post(
          `${backendUrl}/api/cart/update`,
          {
            cartData,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }

    toast.success(
      "Product Added To Cart"
    );
  };

  // ==========================================
  // UPDATE CART
  // ==========================================

  const updateCart = async (updatedCart) => {
    setCartItems(updatedCart);
    localStorage.setItem(
      "cartItems",
      JSON.stringify(updatedCart)
    );

    // Update count for navbar compatibility
    const totalCount = updatedCart.reduce(
      (total, item) => total + item.quantity,
      0
    );
    localStorage.setItem("cartCount", totalCount);
    window.dispatchEvent(new Event("cartUpdated"));

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
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  // ==========================================
  // GET USER CART
  // ==========================================

  const getUserCart = async (activeToken) => {
    const currentToken = activeToken || token;
    if (!currentToken) return;

    try {
      const response = await axios.post(
        `${backendUrl}/api/cart/get`,
        {},
        {
          headers: {
            Authorization: `Bearer ${currentToken}`,
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

        // Update count for navbar compatibility
        const totalCount = backendCart.reduce(
          (total, item) => total + item.quantity,
          0
        );
        localStorage.setItem("cartCount", totalCount);
        window.dispatchEvent(new Event("cartUpdated"));
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // ==========================================
  // CLEAR CART
  // ==========================================

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cartItems");
    localStorage.setItem("cartCount", 0);
    window.dispatchEvent(new Event("cartUpdated"));
  };

  // ==========================================
  // FETCH PRODUCTS
  // ==========================================

  const getProductsData = async () => {
    try {
      const response =
        await axios.get(
          backendUrl +
            "/api/product/list"
        );

      if (response.data.success) {
        setProducts(
          response.data.products
        );
      } else {
        toast.error(
          response.data.message
        );
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // ==========================================
  // LOAD CART & TOKEN ON INITIAL MOUNT
  // ==========================================

  useEffect(() => {
    const storedCart =
      JSON.parse(
        localStorage.getItem(
          "cartItems"
        )
      ) || [];

    setCartItems(storedCart);
  }, []);

  useEffect(() => {
    getProductsData();
  }, []);

  // FETCH BACKEND CART WHEN TOKEN CHANGES
  useEffect(() => {
    if (token) {
      getUserCart(token);
    }
  }, [token]);

  const value = {
    products,
    currency,
    delivery_fee,
    cartItems,
    setCartItems,
    addToCart,
    getCartCount,
    backendUrl,
    token,
    setToken,
    updateCart,
    getUserCart,
    clearCart,
  };

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;