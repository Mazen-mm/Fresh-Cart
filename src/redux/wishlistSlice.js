import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  numOfWishItems: null,
  wishlist: null,
  status: 'idle',
  error: null,
};

const getToken = () => localStorage.getItem('userToken');
const head = () => ({ token: getToken() });

export const addToWish = createAsyncThunk(
  'wishlist/addToWish',
  async (id, { rejectWithValue }) => {
    if (!getToken()) return rejectWithValue('No user token found');
    try {
      const response = await axios.post(
        'https://ecommerce.routemisr.com/api/v1/wishlist',
        { productId: id },
        { headers: head() }
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const getLoggedUserWish = createAsyncThunk(
  'wishlist/getLoggedUserWish',
  async (_, { rejectWithValue }) => {
    if (!getToken()) return rejectWithValue('No user token found');
    try {
      const response = await axios.get(
        'https://ecommerce.routemisr.com/api/v1/Wishlist',
        { headers: head() }
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const removeWishItem = createAsyncThunk(
  'wishlist/removeWishItem',
  async (productId, { rejectWithValue }) => {
    if (!getToken()) return rejectWithValue('No user token found');
    try {
      const response = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/Wishlist/${productId}`,
        { headers: head() }
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    setNumOfWishItems(state, action) {
      state.numOfWishItems = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToWish.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(addToWish.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addToWish.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(getLoggedUserWish.fulfilled, (state, action) => {
        state.wishlist = action.payload;
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(getLoggedUserWish.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getLoggedUserWish.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(removeWishItem.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(removeWishItem.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(removeWishItem.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { setNumOfWishItems } = wishlistSlice.actions;
export default wishlistSlice.reducer;
