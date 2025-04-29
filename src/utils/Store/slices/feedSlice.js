import { createSlice } from "@reduxjs/toolkit";

// Define the initial state as an empty array
const initialState = [];

const feedSlice = createSlice({
  name: "feed",
  initialState, // Use the defined initial state
  reducers: {
   
    addFeed: (state, action) => {
      // Check if the payload is actually an array
      if (!Array.isArray(action.payload.data)) {
        // Optionally log an error or handle non-array payloads differently
        console.error("addFeed expected an array payload, received:", action.payload.data);
        // Return the current state unchanged or handle as needed
        // Returning an empty array as in the original code might clear the feed unexpectedly.
        // Let's return the current state to avoid unintended clearing.
        return state;
      }

      // Use push with spread operator to add all items from the payload array
      // Immer handles the immutable update behind the scenes.
      state.push(...action.payload.data);

      // Note: You could also use state = state.concat(action.payload)
      // but push is often more idiomatic with Immer.
      // DO NOT use state = [...state, ...action.payload] directly,
      // as Immer expects you to either mutate the draft state or return a new state.
      // Pushing into the draft state is the recommended way here.
    },
    /**
     * Removes a user from the feed based on their _id.
     * @param {Array} state - The current feed state array.
     * @param {Object} action - The Redux action.
     * @param {string} action.payload - The _id of the user to remove.
     * @returns {Array} - A new state array with the specified user filtered out.
     */
    removeUserFromFeed: (state, action) => {
      // Filter returns a new array, which is a valid way to update state in Redux Toolkit.
      // Immer detects that a new state is returned and uses it.
      const userIdToRemove = action.payload;
      return state.filter((user) => user._id !== userIdToRemove);
    },
  },
});

// Export the actions
export const { addFeed, removeUserFromFeed } = feedSlice.actions;

// Export the reducer
export default feedSlice.reducer;
