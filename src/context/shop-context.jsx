/* eslint-disable no-case-declarations */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-expressions */
import React, { createContext, useEffect, useReducer, useState } from "react";

import foodService from "../services/foodService";

export const ShopContext = createContext(null);
// eslint-disable-next-line react/prop-types

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const id = action.payload;
      return {
        ...state,
        [id]: (state[id] || 0) + 1,
      };
    case "REMOVE_FROM_CART":
      const itemId = action.payload;
      const newCart = { ...state };
      // eslint-disable-next-line no-plusplus
      newCart[itemId] > 1 ? newCart[itemId]-- : delete newCart[itemId];

      return newCart;
    case "CLEAR_CART":
      return {};
    default:
      return state;
  }
};

function ShopContextProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, {});

  const addToCart = (itemId) => {
    dispatch({ type: "ADD_TO_CART", payload: itemId });
  };

  const removeFromCart = (itemId) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: itemId });
  };
  const updateCartNum = (itemId, newAmount) => {
    dispatch({ type: "UPDATE_CART_NUM", payload: { itemId, newAmount } });
  };
  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  const [data, setData] = useState([]);
  const { getFullCollection } = foodService();

  const onDataLoaded = (newData) => {
    setData(newData);
  };

  const getData = () => {
    getFullCollection("PRODUCTS").then(onDataLoaded);
  };

  useEffect(() => {
    getData();
  }, []);

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    // eslint-disable-next-line no-restricted-syntax
    for (const item in cart) {
      if (cart[item] > 0) {
        const itemInfo = data.find((product) => product.id === item);
        totalAmount += cart[item] * itemInfo.price;
      }
    }
    return totalAmount;
  };

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const contextValue = {
    cart,
    updateCartNum,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    data,
    clearCart,
  };
  return (
    <ShopContext.Provider value={contextValue}>{children}</ShopContext.Provider>
  );
}

export default ShopContextProvider;
