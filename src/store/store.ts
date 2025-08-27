import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer, { userSlice } from "./redusers/userReducer";
import postsReducer, { postsSlice } from "./redusers/postsReduser";
import commentsReducer, { commentsSlice } from "./redusers/commentsReduser";

const rootReducer = combineReducers({
  [userSlice.name]: userReducer,
  [postsSlice.name]: postsReducer,
  [commentsSlice.name]: commentsReducer,
});

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
