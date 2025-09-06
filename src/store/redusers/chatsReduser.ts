import { ChatInterface } from "@/interfaces/chat";
import { supabase } from "@/lib/supabaseClient";
import { addAsyncCase } from "@/utils/addAsyncCase";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ChatState {
  chats: ChatInterface[];
  activeChat: ChatInterface | null;
  loading: boolean;
  offset: number | null;
  error: string | null;
}

const initialState: ChatState = {
  chats: [],
  activeChat: null,
  loading: false,
  offset: 0,
  error: null,
};

const limit = 5;

export const getOrCreateNewChat = createAsyncThunk<
  ChatInterface,
  { userA: string; userB: string },
  { rejectValue: string }
>("/chats/getOrCreateNewChat", async ({ userA, userB }, { rejectWithValue }) => {
  const { data: existing, error: findError } = await supabase
    .from("chats")
    .select("id, chat_participants!inner(user_id)")
    .in("chat_participants.user_id", [userA, userB])
    .maybeSingle();
  if (findError) return rejectWithValue(findError.message);
  if (existing) {
    return existing.id;
  }

  const { data: newChat, error: chatError } = await supabase
    .from("chats")
    .insert({})
    .select("id")
    .single();
  if (chatError) return rejectWithValue(chatError.message);

  const { error: participantsError } = await supabase
    .from("chat_participants")
    .insert([{ chat_id: newChat.id, user_id: userB }]);
  if (participantsError) return rejectWithValue(participantsError.message);

  return newChat.id;
});

export const getUsersChats = createAsyncThunk<
  ChatInterface[],
  { userId: string; offset: number },
  { rejectValue: string }
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

  if (error) return rejectWithValue(error.message);

  // проблема типа supabase возвращ массив обектов
  return data.map((chat) => ({
    id: chat.id,
    created_at: chat.created_at,
    lastMessage: chat.last_message,
    participants: chat.chat_participants.map((p: any) => p.profiles).filter((u) => u.id !== userId),
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
