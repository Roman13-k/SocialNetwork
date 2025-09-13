import { ErrorState } from "@/interfaces";
import { MessageInterface } from "@/interfaces/message";
import { supabase } from "@/lib/supabaseClient";
import { addAsyncCase } from "@/utils/addAsyncCase";
import { mapAuthError } from "@/utils/mapAuthError";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface MessageState {
  messages: MessageInterface[];
  loading: boolean;
  error: ErrorState | null;
  offset: number | null;
}

const initialState: MessageState = {
  messages: [],
  loading: false,
  error: null,
  offset: 0,
};

const limit = 10;

export const loadMessages = createAsyncThunk<
  MessageInterface[],
  { offset: number; chatId: string },
  { rejectValue: ErrorState }
>("/messages/loadMessages", async ({ offset, chatId }, { rejectWithValue }) => {
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .eq("chat_id", chatId)
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) return rejectWithValue(mapAuthError(error));

  return data.reverse();
});

export const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    messageReceived: (state, action) => {
      state.messages.push(action.payload);
    },

    clearMessages: (state) => {
      state.messages = [];
      state.offset = 0;
    },
    incrOffset: (state) => {
      if (state.offset !== null) state.offset += 1;
    },
  },
  extraReducers: (builder) => {
    addAsyncCase(builder, loadMessages, (state, action) => {
      if (action.payload.length === 0) {
        state.offset = null;
      } else if (state.offset !== null) {
        state.messages.unshift(...action.payload);
        state.offset += limit;
      }
    });
  },
});

export const { messageReceived, clearMessages, incrOffset } = messagesSlice.actions;

export default messagesSlice.reducer;
