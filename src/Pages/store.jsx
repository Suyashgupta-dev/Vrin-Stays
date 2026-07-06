import { configureStore, createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    items: [],
  },
  reducers: {
    addToWishlist: (state, action) => {
      const exists = state.items.find((item) => item.id === action.payload.id);
      if (!exists) {
        state.items.push(action.payload);
      }
    },
    removeFromWishlist: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
});


const bookingSlice = createSlice({
  name: "booking",
  initialState: {
    hotelDetails: null, 
    bookingDetails: {
      checkIn: "",
      checkOut: "",
      rooms: 1,
      adults: 1,
      children: 0,
      roomCategory: "Standard",
    },
  },
  reducers: {
    saveBookingData: (state, action) => {
      state.hotelDetails = action.payload.hotelDetails;
      state.bookingDetails = action.payload.bookingDetails;
    },
  },
});


export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;
export const { saveBookingData } = bookingSlice.actions; 


export const store = configureStore({
  reducer: {
    wishlist: wishlistSlice.reducer,
    booking: bookingSlice.reducer,
  },
});