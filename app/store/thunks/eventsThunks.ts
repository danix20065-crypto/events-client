import { apiClient } from "@/app/shared/api/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchEventDetails = createAsyncThunk(
  "event/fetchEventDetails",
  async (id: string) => {
    const result = await apiClient.get(`/event/${id}`);
    return result;
  }
);
