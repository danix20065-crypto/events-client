import { configureStore } from "@reduxjs/toolkit";
import eventsReducer from "./slices/eventSlice";
import categoriesReducer from "./slices/categoriesSlice";
export function makeStore() {
  return configureStore({
    reducer: {
      events: eventsReducer,
      categories: categoriesReducer,
    },
  });
}

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
