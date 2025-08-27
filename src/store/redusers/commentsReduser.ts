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

export const createNewComment = createAsyncThunk<
  void,
  { user_id: string; content: string; post_id: string },
  { rejectValue: string }
>("comments/createNewComment", async ({ user_id, content, post_id }, { rejectWithValue }) => {
  try {
    const { error } = await supabase.from("comments").insert([{ user_id, content, post_id }]);

    if (error) throw error;
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

export const deleteCommentById = createAsyncThunk<string, string, { rejectValue: string }>(
  "comments/deleteCommentById",
  async (commentId, { rejectWithValue }) => {
    try {
      const { error } = await supabase.from("posts").delete().eq("id", commentId);
      if (error) throw error;
      return commentId;
    } catch (err) {
      return rejectWithValue((err as Error).message);
    }
  },
);

export const loadComments = createAsyncThunk<
  CommentInterface[],
  { offset: number | null },
  { rejectValue: string }
>("comments/loadComments", async ({ offset }, { rejectWithValue }) => {
  if (offset === null) return rejectWithValue("Offset is null");
  try {
    const { data, error } = await supabase
      .from("comments")
      .select(
        `*,  
        user:profiles (
            id,
            username,
            avatar_url
        )`,
      )
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
  reducers: {},
  extraReducers: (builder) => {
    addAsyncCase(builder, createNewComment, () => {});
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

export const {} = commentsSlice.actions;

export default commentsSlice.reducer;
