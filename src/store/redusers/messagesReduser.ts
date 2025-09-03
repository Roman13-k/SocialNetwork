import { MessageInterface } from "@/interfaces/message";
import { createSlice } from "@reduxjs/toolkit";

interface MessageState {
  messages: MessageInterface[];
  loading: boolean;
  error: string | null;
}

const initialState: MessageState = {
  messages: [],
  loading: false,
  error: null,
};

export const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    messageReceived: (state, action) => {
      state.messages.push(action.payload);
    },

    clearMessages: (state) => {
      state.messages = [];
    },
  },
  extraReducers: (builder) => {},
});

export const { messageReceived, clearMessages } = messagesSlice.actions;

export default messagesSlice.reducer;
