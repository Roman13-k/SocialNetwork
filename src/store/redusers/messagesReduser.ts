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
  reducers: {},
  extraReducers: (builder) => {},
});

export const {} = messagesSlice.actions;

export default messagesSlice.reducer;
