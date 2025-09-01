import { ChatInterface } from "@/interfaces/chat";
import { supabase } from "@/lib/supabaseClient";
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
  { userId: string },
  { rejectValue: string }
>("/chats/getUsersChats", async ({ userId }, { rejectWithValue }) => {
  const { data, error } = await supabase.from("chats").select(
    `id,
      created_at,
      chat_participants (
        user_id,
        profiles ( id, username, avatar_url )
      )`,
  );

  if (error) return rejectWithValue(error.message);

  // проблема типа supabase возвращ массив обектов
  return data.map((chat) => ({
    id: chat.id,
    created_at: chat.created_at,
    participants: chat.chat_participants.map((p: any) => p.profiles).filter((u) => u.id !== userId),
  }));
});

export const chatsSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    addAsyncCase(builder, getOrCreateNewChat, () => {});
    addAsyncCase(builder, getUsersChats, (state, action) => {
      state.chats = action.payload;
    });
  },
});

export const {} = chatsSlice.actions;

export default chatsSlice.reducer;
