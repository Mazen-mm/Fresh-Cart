import { createSlice } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';

const initialToken = localStorage.getItem('userToken');
const initialUserData = initialToken ? jwtDecode(initialToken) : null;

const initialState = {
  userToken: initialToken,
  userData: initialUserData,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserToken(state, action) {
      state.userToken = action.payload;
      if (action.payload) {
        localStorage.setItem('userToken', action.payload);
        state.userData = jwtDecode(action.payload);
      } else {
        localStorage.removeItem('userToken');
        state.userData = null;
      }
    },
    setUserData(state, action) {
      state.userData = action.payload;
    },
    logout(state) {
      state.userToken = null;
      state.userData = null;
      localStorage.removeItem('userToken');
    },
  },
});

export const { setUserToken, setUserData, logout } = userSlice.actions;
export default userSlice.reducer;
