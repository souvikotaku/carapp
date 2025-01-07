// counterSlice.js
import { createSlice } from "@reduxjs/toolkit";

const dataSlice = createSlice({
  name: "data",
  initialState: {
    place: "",
    viewAll: [],
  },
  reducers: {
    setviewall: (state, action) => {
      state.viewAll = action.payload;
    },
    setplace: (state, action) => {
      state.place = action.payload;
    },
  },
});

export const { setplace, setviewall } = dataSlice.actions;
export default dataSlice.reducer;
