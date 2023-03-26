import React, { createContext, useEffect, useState } from "react";
import foodService from "../services/foodService";
export const ShopContext = createContext(null);
const ShopContextProvider = (props) => {
  const [data, setData] = useState([]);
  const { getFullCollection } = foodService();

  useEffect(() => {
    getData();
    //  getDefaultCart(data);
  }, []);

  const getData = () => {
    getFullCollection("PRODUCTS").then(onDataLoaded);
  };

  const onDataLoaded = (data) => {
    setData(data);
  };

  const getDefaultCart = () => {
    const cart = {};
    for (const item of data) {
      cart[item.id] = 0;
    }

    return cart;
  };

  const [cartItems, setCartItems] = useState();

  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    console.log(cartItems);
  };
  const removeToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };
  const addToCartNum = (itemId, newAmount) => {
    setCartItems((prev) => ({ ...prev, [itemId]: newAmount }));
  };
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = data.find((product) => product.id === Number(item));
        totalAmount += cartItems[item] * itemInfo.price;
      }
    }
    return totalAmount;
  };

  const contextValue = {
    cartItems,
    getDefaultCart,
    addToCart,
    removeToCart,
    addToCartNum,
    getTotalCartAmount,
  };
  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
