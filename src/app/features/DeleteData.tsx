import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  positionIndex: -1,
  bookMarkData: [],
};

export const bookmarkSlice = createSlice({
  name: "deleteData",
  initialState,
  reducers: {
    storeData: (state, action) => {
      state.positionIndex = action.payload.positionIndex;
      state.bookMarkData = action.payload.bookMarkData;
    },
  },
});

// Action creators are generated for each case reducer function
export const { storeData } = bookmarkSlice.actions;

export default bookmarkSlice.reducer;
