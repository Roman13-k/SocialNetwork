import { ErrorState } from "@/interfaces";
import { ChatInterface } from "@/interfaces/chat";
import { UserMainInfo } from "@/interfaces/user";
import { supabase } from "@/lib/supabaseClient";
import { addAsyncCase } from "@/utils/addAsyncCase";
import { mapAuthError } from "@/utils/mapAuthError";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface ChatState {
  chats: ChatInterface[];
  activeChat: ChatInterface | null;
  loading: boolean;
  offset: number | null;
  error: ErrorState | null;
}

const initialState: ChatState = {
  chats: [],
  activeChat: null,
  loading: true,
  offset: 0,
  error: null,
};

const limit = 5;

export const getOrCreateNewChat = createAsyncThunk<
  ChatInterface,
  { userA: string; userB: string },
  { rejectValue: ErrorState }
>("/chats/getOrCreateNewChat", async ({ userA, userB }, { rejectWithValue }) => {
  const { data: existing, error: findError } = await supabase.rpc("get_chat_with_users", {
    user_ids: [userA, userB],
  });
  if (findError) return rejectWithValue(mapAuthError(findError));
  if (existing && existing?.length) {
    return existing[0].chat_id;
  }

  const { data: newChat, error: chatError } = await supabase
    .from("chats")
    .insert({})
    .select("id")
    .single();
  if (chatError) return rejectWithValue(mapAuthError(chatError));

  const { error: participantsError } = await supabase
    .from("chat_participants")
    .insert([{ chat_id: newChat.id, user_id: userB }]);
  if (participantsError) return rejectWithValue(mapAuthError(participantsError));

  return newChat.id;
});

export const getUsersChats = createAsyncThunk<
  ChatInterface[],
  { userId: string; offset: number },
  { rejectValue: ErrorState }
>("/chats/getUsersChats", async ({ userId, offset }, { rejectWithValue }) => {
  const { data, error } = await supabase
    .from("chats_with_last_message")
    .select(
      `id,
      created_at,
      last_message,
      chat_participants (
        user_id,
        profiles ( id, username, avatar_url )
      )`,
    )
    .range(offset, offset + limit - 1);

  if (error) return rejectWithValue(mapAuthError(error));

  return data.map((chat) => ({
    id: chat.id,
    created_at: chat.created_at,
    lastMessage: chat.last_message,
    participants: chat.chat_participants
      .map((p) => p.profiles as unknown as UserMainInfo)
      .filter((u) => u.id !== userId),
  }));
});

export const chatsSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    enterChat: (state, action) => {
      const chat = state.chats.find((chat) => chat.id === action.payload);

      state.activeChat = chat ?? null;
    },
    leaveChat: (state) => {
      state.activeChat = null;
    },
  },
  extraReducers: (builder) => {
    addAsyncCase(builder, getOrCreateNewChat, () => {});
    addAsyncCase(builder, getUsersChats, (state, action) => {
      if (state.offset !== null) {
        state.chats.push(...action.payload);
        state.offset += limit;
      }
      if (action.payload.length < limit && state.chats.length !== 0) {
        state.offset = null;
      }
    });
  },
});

export const { enterChat, leaveChat } = chatsSlice.actions;

export default chatsSlice.reducer;
