import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  products: [],
  error: "",
};

const url = "https://fakestoreapi.com/products";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (name, thunkAPI) => {
    try {
      // console.log(name);
      // console.log(thunkAPI);
      // console.log(thunkAPI.getState());
      // thunkAPI.dispatch(openModal());
      const response = await axios.get(url);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  // reducers: {},
  extraReducers: {
    [fetchProducts.pending]: (state) => {
      state.loading = true;
    },
    [fetchProducts.fulfilled]: (state, action) => {
      state.loading = false;
      state.products = action.payload;
    },
    [fetchProducts.rejected]: (state, action) => {
      state.loading = "false";
      state.error = action.payload;
    },
  },
});

export default productsSlice.reducer;
