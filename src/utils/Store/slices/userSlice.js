import { createSlice } from "@reduxjs/toolkit";



const userSlice = createSlice({
  name: "user",
  initialState:{user:""},
  reducers: {
    addUser: (state, action) => {
      state.user = action.payload;
      
    },
    removeUser: (state) => {
      state.user = null;
      state.online = false;
    },
  },
});

export const { addUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
