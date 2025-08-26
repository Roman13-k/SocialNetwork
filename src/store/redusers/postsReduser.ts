import { PostInterface } from "@/interfaces/post";
import { supabase } from "@/lib/supabaseClient";
import { addAsyncCase } from "@/utils/addAsyncCase";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { tryCatchCover } from "@/utils/tryCatchCover";

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

const postInformation = `
  id,
  content,
  created_at,
  likes(count),
  comments(count),
  user:profiles (
    id,
    username,
    avatar_url
  ),
  liked_by_user:likes (
    user_id
  )
`;

export const createNewPost = createAsyncThunk<
  PostInterface[],
  { content: string; userId: string },
  { rejectValue: string }
>("posts/createNewPost", async ({ content, userId }, { rejectWithValue }) => {
  return tryCatchCover(async () => {
    const { data, error } = await supabase
      .from("posts")
      .insert([{ content, user_id: userId }])
      .select(postInformation);

    if (error) throw error;
    return data.map((post) => ({
      ...post,
      liked_by_user: false,
    }));
  }, rejectWithValue);
});

export const deletePostById = createAsyncThunk<string, string, { rejectValue: string }>(
  "posts/deletePost",
  async (postId, { rejectWithValue }) => {
    return await tryCatchCover(async () => {
      const { error } = await supabase.from("posts").delete().eq("id", postId);
      if (error) throw error;
      return postId;
    }, rejectWithValue);
  },
);

export const loadPosts = createAsyncThunk<
  PostInterface[],
  { userId: string },
  { rejectValue: string }
>("posts/loadPosts", async ({ userId }, { rejectWithValue }) => {
  return await tryCatchCover(async () => {
    const { data, error } = await supabase
      .from("posts")
      .select(postInformation)
      .range(0, 5)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data.map((post) => ({
      ...post,
      liked_by_user: post.liked_by_user.some((like) => like.user_id === userId),
    }));
  }, rejectWithValue);
});

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    addAsyncCase(builder, createNewPost, (state, action) => {
      state.posts = [...action.payload, ...state.posts];
    }),
      addAsyncCase(builder, loadPosts, (state, action) => {
        state.posts = [...state.posts, ...action.payload];
      });
    addAsyncCase(builder, deletePostById, (state, action) => {
      state.posts = state.posts.filter((post) => post.id !== action.payload);
    });
  },
});

export default postsSlice.reducer;
