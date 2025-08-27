import { UserInterface } from "@/interfaces/user";
import { supabase } from "@/lib/supabaseClient";
import { LoginProviderType } from "@/types/login";
import { addAsyncCase } from "@/utils/addAsyncCase";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface UserState {
  user: UserInterface | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  loading: true,
  error: null,
};

export const loginUser = createAsyncThunk<
  UserInterface | null,
  LoginProviderType,
  { rejectValue: string }
>("user/loginUser", async (provider, { rejectWithValue }) => {
  try {
    const { error } = await supabase.auth.signInWithOAuth({ provider });
    if (error) throw error;

    const { data: sessionData, error: userError } = await supabase.auth.getUser();
    if (userError) throw userError;
    return sessionData.user ?? null;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Error";
    return rejectWithValue(message);
  }
});

export const fetchSession = createAsyncThunk<UserInterface | null, void, { rejectValue: string }>(
  "user/fetchSession",
  async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    return session?.user ?? null;
  },
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.error = null;
      state.user = null;
      supabase.auth.signOut();
    },
  },
  extraReducers: (builder) => {
    addAsyncCase(builder, loginUser, (state, action) => {
      state.user = action.payload;
    }),
      addAsyncCase(builder, fetchSession, (state, action) => {
        state.user = action.payload;
        if (!action.payload) {
          state.error = "You are not logged in";
        } else {
          state.error = null;
        }
      });
  },
});

export const { logoutUser } = userSlice.actions;

export default userSlice.reducer;
