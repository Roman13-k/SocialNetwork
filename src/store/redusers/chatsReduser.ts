import { ChatInterface } from "@/interfaces/chat";
import { addAsyncCase } from "@/utils/addAsyncCase";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface ChatState {
  chats: ChatInterface[];
  loading: boolean;
  error: string | null;
}

const initialState: ChatState = {
  chats: [],
  loading: false,
  error: null,
};

export const getOrCreateNewChat = createAsyncThunk("/chats/getOrCreateNewChat", async () => {});

export const getUsersChats = createAsyncThunk("/chats/getUsersChats", async () => {});

export const chatsSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    addAsyncCase(builder, getOrCreateNewChat, (state, action) => {});
    addAsyncCase(builder, getUsersChats, (state, action) => {});
  },
});

export const {} = chatsSlice.actions;

export default chatsSlice.reducer;
