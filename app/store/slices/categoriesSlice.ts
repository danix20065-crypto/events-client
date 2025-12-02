import { createSlice } from "@reduxjs/toolkit";
import { fetchCategories } from "../thunks/categoriesThunks";
import { Category } from "@/app/shared/interfaces/category";

const initialState = {
  loading: false,
  error: null as string | null,
  categories: null as Category[] | null,
};
export const categoriesSlice = createSlice({
  name: "categories",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch event";
      });
  },
});

export const {} = categoriesSlice.actions;

export default categoriesSlice.reducer;
