import React, { useReducer, createContext } from "react";

const initialState = {
  selectedItems: [], //object of product(s) selected by user
  itemCounter: 0,
  total: 0,
  checkout: false,
};

const cartReducer = (state, action) => {
  console.log(state);
  switch (action.type) {
    case "ADD_ITEM":
      if (!state.selectedItems.find((item) => item.id === action.payload.id)) {
        state.selectedItems.push({ ...action.payload, quantity: 1 });
      }
      return {
        ...state,
        selectedItems: [...state.selectedItems],
      };
    case "REMOVE_ITEM":
      const newSelectedItems = state.selectedItems.filter(
        (item) => item.id !== action.payload.id
      );
      return { ...state, selectedItems: [...newSelectedItems] };
    case "INCREASE":
      const itemI = state.selectedItems.findIndex(
        (item) => item.id === action.payload.id
      );
      state.selectedItems[itemI].quantity++;
      return { ...state };
    case "DECREASE":
      const itemD = state.selectedItems.findIndex(
        (item) => item.id === action.payload.id
      );
      state.selectedItems[itemD].quantity--;
      return { ...state };
    case "CHECKOUT":
      return {
        selectedItems: [],
        itemCounter: 0,
        total: 0,
        checkout: true,
      };
    case "CLEAR":
      return {
        selectedItems: [],
        itemCounter: 0,
        total: 0,
        checkout: false,
      };
    default:
      return state;
  }
};

export const CartContext = createContext();

const CartContextProvider = (props) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
