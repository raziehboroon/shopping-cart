import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedItems: [], //object of product(s) selected by user
  itemCounter: 0,
  total: 0,
  checkout: false,
};

const sumItems = (items) => {
  const itemCounter = items.reduce((acc, item) => acc + item.quantity, 0);
  const total = items
    .reduce((acc, item) => acc + item.quantity * item.price, 0)
    .toFixed(2);

  return { itemCounter, total };
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      if (!state.selectedItems.find((item) => item.id === action.payload.id)) {
        state.selectedItems.push({ ...action.payload, quantity: 1 });
      }
      state.itemCounter = sumItems([...state.selectedItems]).itemCounter;
      state.total = sumItems([...state.selectedItems]).total;
    },
    removeItem: (state, action) => {
      const newSelectedItems = state.selectedItems.filter(
        (item) => item.id !== action.payload.id
      );
      state.selectedItems = [...newSelectedItems];
      state.itemCounter = sumItems([...newSelectedItems]).itemCounter;
      state.total = sumItems([...newSelectedItems]).total;
    },
    increaseItem: (state, action) => {
      const itemI = state.selectedItems.findIndex(
        (item) => item.id === action.payload.id
      );
      state.selectedItems[itemI].quantity++;
      state.itemCounter = sumItems([...state.selectedItems]).itemCounter;
      state.total = sumItems([...state.selectedItems]).total;
    },
    decreaseItem: (state, action) => {
      const itemD = state.selectedItems.findIndex(
        (item) => item.id === action.payload.id
      );
      state.selectedItems[itemD].quantity--;
      state.itemCounter = sumItems([...state.selectedItems]).itemCounter;
      state.total = sumItems([...state.selectedItems]).total;
    },
    checkout: (state, action) => {
      state.selectedItems = [];
      state.itemCounter = 0;
      state.total = 0;
      state.checkout = true;
    },
    clear: (state, action) => {
      state.selectedItems = [];
      state.itemCounter = 0;
      state.total = 0;
      state.checkout = false;
    },
  },
});

export const {
  addItem,
  removeItem,
  increaseItem,
  decreaseItem,
  checkout,
  clear,
} = cartSlice.actions;
export default cartSlice.reducer;
