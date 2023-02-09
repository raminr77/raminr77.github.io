import { createSlice } from '@reduxjs/toolkit';
import { REDUCER_NAMES } from '@/shared/constants/reducer-names';

const initialState: GUser = {
  isAuthenticated: false
};

const userSlice = createSlice({
  name: REDUCER_NAMES.USER,
  initialState,
  reducers: {
    userLogoutAction: (state) => {
      state.isAuthenticated = false;
    }
  }
});

export const { userLogoutAction } = userSlice.actions;

export default userSlice.reducer;
