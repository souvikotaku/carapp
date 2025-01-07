// counterSlice.js
import { createSlice } from "@reduxjs/toolkit";

const dataSlice = createSlice({
  name: "data",
  initialState: {
    place: "",
    viewAll: [],
    bookingdata: {},
    paymentdata: {},
  },
  reducers: {
    setviewall: (state, action) => {
      state.viewAll = action.payload;
    },
    setplace: (state, action) => {
      state.place = action.payload;
    },
    setbookingdata: (state, action) => {
      state.bookingdata = action.payload;
    },
    setpaymentdata: (state, action) => {
      state.paymentdata = action.payload;
    },
  },
});

export const { setplace, setviewall, setbookingdata, setpaymentdata } =
  dataSlice.actions;
export default dataSlice.reducer;
