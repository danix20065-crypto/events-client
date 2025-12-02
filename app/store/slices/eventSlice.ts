import { createSlice } from "@reduxjs/toolkit";
import { fetchEventDetails } from "../thunks/eventsThunks";
import { EventInterface } from "@/app/shared/interfaces/event.interface";

const initialState = {
  loading: false,
  error: null as string | null,
  event: null as EventInterface | null,
};
export const eventSlice = createSlice({
  name: "event",
  initialState: initialState,
  reducers: {
    setSelectedEvent(state, action) {
      console.log("Setting user manually is not recommended.", action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEventDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEventDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.event = action.payload;
      })
      .addCase(fetchEventDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch event";
      });
  },
});

export const { setSelectedEvent } = eventSlice.actions;

export default eventSlice.reducer;
