import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bookmarks: [],
  quantity: 0
};

export const bookmarkSlice = createSlice({
  name: "bookmark",
  initialState,
  reducers: {
    addBookmark: (state, action) => {
      const { content, ...rest } = action.payload; 
      // check if bookmark already added
      const existingBookmark = state.bookmarks.find(
        (bookmark) => bookmark.slug === rest.slug
      );

      if (!existingBookmark) {
        state.bookmarks.push(rest);
        state.quantity += 1;
      }
    },
    removeBookmark: (state, action) => {
      const nonexistingBookmarks = state.bookmarks.filter(
        (bookmark) => bookmark.slug !== action.payload
      );
      state.bookmarks = nonexistingBookmarks;
      state.quantity = nonexistingBookmarks.length;
    },
    clearBookmarks: (state) => {
      state.bookmarks = [];
      state.quantity = 0;
    }
  }
});

export const { addBookmark, removeBookmark, clearBookmarks } = bookmarkSlice.actions;
export default bookmarkSlice.reducer;
