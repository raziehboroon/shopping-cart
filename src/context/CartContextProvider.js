import React, { useReducer, createContext } from "react";

const initialState = {
  selectedItems: [], //object of product(s) selected by user
  itemCounter: 0,
  total: 0,
  checkout: false,
};

//counting total number of products
const sumItems = (items) => {
  // console.log(items);
  const itemCounter = items.reduce((acc, item) => acc + item.quantity, 0);
  const total = items
    .reduce((acc, item) => acc + item.quantity * item.price, 0)
    .toFixed(2);

  return { itemCounter, total };
};

const cartReducer = (state, action) => {
  // console.log(state);
  switch (action.type) {
    case "ADD_ITEM":
      if (!state.selectedItems.find((item) => item.id === action.payload.id)) {
        state.selectedItems.push({ ...action.payload, quantity: 1 });
      }
      return {
        ...state,
        selectedItems: [...state.selectedItems],
        ...sumItems(state.selectedItems),
        checkout: false,
      };
    case "REMOVE_ITEM":
      const newSelectedItems = state.selectedItems.filter(
        (item) => item.id !== action.payload.id
      );
      return {
        ...state,
        selectedItems: [...newSelectedItems],
        ...sumItems(newSelectedItems),
      };
    case "INCREASE":
      const itemI = state.selectedItems.findIndex(
        (item) => item.id === action.payload.id
      );
      state.selectedItems[itemI].quantity++;
      return { ...state, ...sumItems(state.selectedItems) };
    case "DECREASE":
      const itemD = state.selectedItems.findIndex(
        (item) => item.id === action.payload.id
      );
      state.selectedItems[itemD].quantity--;
      return { ...state, ...sumItems(state.selectedItems) };
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
