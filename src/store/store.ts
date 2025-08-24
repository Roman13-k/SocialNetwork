import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./redusers/usersReducer";

export const makeStore = () => {
  return configureStore({
    reducer: {
      users: usersReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
