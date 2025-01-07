// counterSlice.js
import { createSlice } from "@reduxjs/toolkit";

const dataSlice = createSlice({
  name: "data",
  initialState: {
    place: "",
    viewAll: [],
    bookingdata: {},
    paymentdata: {},
    confirmdata: {},
    frompage: "",
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
    setconfirmdata: (state, action) => {
      state.confirmdata = action.payload;
    },
    setfrompage: (state, action) => {
      state.frompage = action.payload;
    },
  },
});

export const {
  setplace,
  setviewall,
  setbookingdata,
  setpaymentdata,
  setconfirmdata,
  setfrompage,
} = dataSlice.actions;
export default dataSlice.reducer;
