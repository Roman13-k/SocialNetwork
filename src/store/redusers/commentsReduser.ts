import { CommentInterface } from "@/interfaces/comment";
import { supabase } from "@/lib/supabaseClient";
import { addAsyncCase } from "@/utils/addAsyncCase";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface commentsState {
  comments: CommentInterface[];
  loading: boolean;
  error: string | null;
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
  { rejectValue: string }
>("comments/createNewComment", async ({ user_id, content, post_id }, { rejectWithValue }) => {
  try {
    const { error, data } = await supabase
      .from("comments")
      .insert([{ user_id, content, post_id }])
      .select(commentInformation)
      .single();

    if (error) throw error;

    return data;
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

export const deleteCommentById = createAsyncThunk<string, string, { rejectValue: string }>(
  "comments/deleteCommentById",
  async (commentId, { rejectWithValue }) => {
    try {
      const { error } = await supabase.from("comments").delete().eq("id", commentId);
      if (error) throw error;
      return commentId;
    } catch (err) {
      return rejectWithValue((err as Error).message);
    }
  },
);

export const loadComments = createAsyncThunk<
  CommentInterface[],
  { offset: number | null; postId: string },
  { rejectValue: string }
>("comments/loadComments", async ({ offset, postId }, { rejectWithValue }) => {
  if (offset === null) return rejectWithValue("Offset is null");
  try {
    const { data, error } = await supabase
      .from("comments")
      .select(commentInformation)
      .eq("post_id", postId)
      .range(offset, offset + limit - 1)
      .order("created_at", { ascending: false });
    if (error) throw error;

    return data;
  } catch (err) {
    return rejectWithValue((err as Error).message);
  }
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
      if (state.comments.length != 0) {
        state.comments.unshift(action.payload);
      }
    });
    addAsyncCase(builder, deleteCommentById, (state, action) => {
      state.comments = state.comments.filter((comment: any) => comment.id !== action.payload);
    });
    addAsyncCase(builder, loadComments, (state, action) => {
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
