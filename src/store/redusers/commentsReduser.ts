import { ErrorState } from "@/interfaces";
import { CommentInterface } from "@/interfaces/comment";
import { supabase } from "@/lib/supabaseClient";
import { addAsyncCase } from "@/utils/addAsyncCase";
import { mapAuthError } from "@/utils/mapAuthError";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface commentsState {
  comments: CommentInterface[];
  loading: boolean;
  error: ErrorState | null;
  offset: number | null;
}

const initialState: commentsState = {
  comments: [],
  loading: false,
  error: null,
  offset: 0,
};

const limit = 5;

const commentInformation = `*,  
        user:profiles (
            id,
            username,
            avatar_url
        )`;

export const createNewComment = createAsyncThunk<
  CommentInterface,
  { user_id: string; content: string; post_id: string },
  { rejectValue: ErrorState }
>("comments/createNewComment", async ({ user_id, content, post_id }, { rejectWithValue }) => {
  const { error, data } = await supabase
    .from("comments")
    .insert([{ user_id, content, post_id }])
    .select(commentInformation)
    .single();

  if (error) return rejectWithValue(mapAuthError(error));
  return data;
});

export const deleteCommentById = createAsyncThunk<string, string, { rejectValue: ErrorState }>(
  "comments/deleteCommentById",
  async (commentId, { rejectWithValue }) => {
    const { error } = await supabase.from("comments").delete().eq("id", commentId);
    if (error) return rejectWithValue(mapAuthError(error));
    return commentId;
  },
);

export const loadComments = createAsyncThunk<
  CommentInterface[],
  { offset: number; postId: string },
  { rejectValue: ErrorState }
>("comments/loadComments", async ({ offset, postId }, { rejectWithValue }) => {
  const { data, error } = await supabase
    .from("comments")
    .select(commentInformation)
    .eq("post_id", postId)
    .range(offset, offset + limit - 1)
    .order("created_at", { ascending: false });
  if (error) return rejectWithValue(mapAuthError(error));

  return data;
});

export const loadUserComments = createAsyncThunk<
  CommentInterface[],
  { offset: number; userId?: string },
  { rejectValue: ErrorState }
>("comments/loadUserComments", async ({ offset, userId }, { rejectWithValue }) => {
  const { data, error } = await supabase
    .from("comments")
    .select(commentInformation)
    .eq("user_id", userId)
    .range(offset, offset + limit - 1)
    .order("created_at", { ascending: false });
  if (error) return rejectWithValue(mapAuthError(error));

  return data;
});

export const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    resetComments: (state) => {
      state.comments = [];
      state.offset = 0;
    },
  },
  extraReducers: (builder) => {
    addAsyncCase(builder, createNewComment, (state, action) => {
      state.comments.unshift(action.payload);
    });
    addAsyncCase(builder, deleteCommentById, (state, action) => {
      state.comments = state.comments.filter((comment) => comment.id !== action.payload);
    });
    addAsyncCase(builder, loadComments, (state, action) => {
      if (action.payload.length === 0) {
        state.offset = null;
      } else if (state.offset !== null) {
        state.comments.push(...action.payload);
        state.offset += limit;
      }
    });
    addAsyncCase(builder, loadUserComments, (state, action) => {
      if (action.payload.length === 0) {
        state.offset = null;
      } else if (state.offset !== null) {
        state.comments.push(...action.payload);
        state.offset += limit;
      }
    });
  },
});

export const { resetComments } = commentsSlice.actions;

export default commentsSlice.reducer;
