import { apiClient } from "@/app/shared/api/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async () => {
    const result = await apiClient.get("/category");
    return result;
  }
);
