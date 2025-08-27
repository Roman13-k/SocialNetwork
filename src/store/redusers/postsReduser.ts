import { PostInterface } from "@/interfaces/post";
import { supabase } from "@/lib/supabaseClient";
import { addAsyncCase } from "@/utils/addAsyncCase";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const limit = 5;

interface PostState {
  posts: PostInterface[];
  loading: boolean;
  error: string | null;
  offset: number | null;
}

const initialState: PostState = {
  posts: [],
  loading: false,
  error: null,
  offset: 0,
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
  ),
  image_url
`;

export const createNewPost = createAsyncThunk<
  PostInterface[],
  { content: string; userId: string; image_url?: string[]; postId: string },
  { rejectValue: string }
>("posts/createNewPost", async ({ content, userId, image_url, postId }, { rejectWithValue }) => {
  try {
    const { data, error } = await supabase
      .from("posts")
      .insert([{ content, user_id: userId, image_url, id: postId }])
      .select(postInformation);

    if (error) throw error;

    return data.map((post) => ({
      ...post,
      liked_by_user: false,
      user: Array.isArray(post.user) ? post.user[0] : post.user,
    }));
  } catch (err) {
    return rejectWithValue((err as Error).message);
  }
});

export const deletePostById = createAsyncThunk<
  string,
  { postId: string; image_url: string[] | undefined },
  { rejectValue: string }
>("posts/deletePost", async ({ postId, image_url }, { rejectWithValue }) => {
  try {
    if (image_url && image_url?.length !== 0) {
      for (let url of image_url) {
        const parts = url.split("/public/posts-images/");
        await supabase.storage.from("posts-images").remove([parts[1]]);
      }
    }

    const { error } = await supabase.from("posts").delete().eq("id", postId);
    if (error) throw error;

    return postId;
  } catch (err) {
    return rejectWithValue((err as Error).message);
  }
});

export const loadPosts = createAsyncThunk<
  PostInterface[],
  { userId?: string; offset: number | null },
  { rejectValue: string }
>("posts/loadPosts", async ({ userId, offset }, { rejectWithValue }) => {
  if (offset === null) return rejectWithValue("Offset is null");
  try {
    const { data, error } = await supabase
      .from("posts")
      .select(postInformation)
      .range(offset, offset + limit - 1)
      .order("created_at", { ascending: false });
    if (error) throw error;

    return data.map((post) => ({
      ...post,
      liked_by_user: userId ? post.liked_by_user.some((like) => like.user_id === userId) : false,
      user: Array.isArray(post.user) ? post.user[0] : post.user,
    }));
  } catch (err) {
    return rejectWithValue((err as Error).message);
  }
});

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
  },
  extraReducers: (builder) => {
    addAsyncCase(builder, createNewPost, (state, action) => {
      state.posts = [...action.payload, ...state.posts];
    });
    addAsyncCase(builder, loadPosts, (state, action) => {
      if (action.payload.length === 0) {
        state.offset = null;
      } else if (state.offset !== null) {
        state.posts.push(...action.payload);
        state.offset += limit;
      }
    });
    addAsyncCase(builder, deletePostById, (state, action) => {
      state.posts = state.posts.filter((post) => post.id !== action.payload);
    });
  },
});

export const { setLoading } = postsSlice.actions;

export default postsSlice.reducer;
