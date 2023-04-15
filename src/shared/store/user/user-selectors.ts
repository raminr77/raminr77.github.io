import { createDraftSafeSelector } from '@reduxjs/toolkit';

const userInfo = createDraftSafeSelector(
  (state: { USER: GUser }) => state.USER,
  (state) => ({
    ...state
  })
);

export const userSelectors = {
  userInfo
};
