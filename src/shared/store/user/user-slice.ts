import { createSlice } from '@reduxjs/toolkit';
import { REDUCER_NAMES } from '@/shared/constants/reducer-names';

const initialState: GUser = {
  showBurgerMenu: false
};

const userSlice = createSlice({
  name: REDUCER_NAMES.USER,
  initialState,
  reducers: {
    toggleBurgerMenu: (state) => {
      state.showBurgerMenu = !state.showBurgerMenu;
    }
  }
});

export const { toggleBurgerMenu } = userSlice.actions;

export default userSlice.reducer;
