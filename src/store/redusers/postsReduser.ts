import { PostInterface } from "@/interfaces/post";
import { createSlice } from "@reduxjs/toolkit";

interface PostState {
  posts: PostInterface[];
  loading: boolean;
  error: string | null;
}

const initialState: PostState = {
  posts: [],
  loading: false,
  error: null,
};

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addNewPost: (state, action) => {
      state.posts = [...action.payload, ...state.posts];
    },
    addPrevPosts: (state, action) => {
      state.posts = [...state.posts, ...action.payload];
    },
  },
});

export const { addPrevPosts, addNewPost } = postsSlice.actions;

export default postsSlice.reducer;
