
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Checkout payment thunk
export const checkOutPayment = createAsyncThunk(
  'cart/checkOutPayment',
  async ({ cartId, shippingAddress }, { rejectWithValue }) => {
    if (!getToken()) return rejectWithValue('No user token found');
    try {
      const response = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`,
        { shippingAddress },
        { headers: head() }
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const initialState = {
  numOfCartItems: null,
  cart: null,
  status: 'idle',
  error: null,
};

const getToken = () => localStorage.getItem('userToken');
const head = () => ({ token: getToken() });

export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async (id, { rejectWithValue }) => {
    if (!getToken()) return rejectWithValue('No user token found');
    try {
      const response = await axios.post(
        'https://ecommerce.routemisr.com/api/v1/cart',
        { productId: id },
        { headers: head() }
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const getLoggedUserCart = createAsyncThunk(
  'cart/getLoggedUserCart',
  async (_, { rejectWithValue }) => {
    if (!getToken()) return rejectWithValue('No user token found');
    try {
      const response = await axios.get(
        'https://ecommerce.routemisr.com/api/v1/cart',
        { headers: head() }
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const removeCartItem = createAsyncThunk(
  'cart/removeCartItem',
  async (productId, { rejectWithValue }) => {
    if (!getToken()) return rejectWithValue('No user token found');
    try {
      const response = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        { headers: head() }
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const updateProductQuantity = createAsyncThunk(
  'cart/updateProductQuantity',
  async ({ productId, count }, { rejectWithValue }) => {
    if (!getToken()) return rejectWithValue('No user token found');
    try {
      const response = await axios.put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        { count },
        { headers: head() }
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setNumOfCartItems(state, action) {
      state.numOfCartItems = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.fulfilled, (state, action) => {
        state.cart = action.payload;
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(addToCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(getLoggedUserCart.fulfilled, (state, action) => {
        state.cart = action.payload;
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(getLoggedUserCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getLoggedUserCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(removeCartItem.fulfilled, (state, action) => {
        state.cart = action.payload;
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(removeCartItem.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(removeCartItem.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(updateProductQuantity.fulfilled, (state, action) => {
        state.cart = action.payload;
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(updateProductQuantity.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateProductQuantity.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { setNumOfCartItems } = cartSlice.actions;
export default cartSlice.reducer;
