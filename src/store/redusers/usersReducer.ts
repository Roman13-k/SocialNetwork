import { UserInterface } from "@/interfaces/user";
import { supabase } from "@/lib/supabaseClient";
import { LoginProviderType } from "@/types/login";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface UserState {
  user: UserInterface | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
};

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (provider: LoginProviderType, { rejectWithValue }) => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({ provider });
      if (error) throw error;
      const { data: sessionData } = await supabase.auth.getUser();
      console.log(sessionData.user);
      return sessionData.user;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  },
);

export const fetchSession = createAsyncThunk("user/fetchSession", async () => {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return session?.user ?? null;
});

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
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.error = action.payload as string;
      state.loading = false;
    });

    builder.addCase(fetchSession.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchSession.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
      if (!action.payload) {
        state.error = "Вы не авторизованы";
      } else {
        state.error = null;
      }
    });
    builder.addCase(fetchSession.rejected, (state) => {
      state.loading = false;
      state.user = null;
    });
  },
});

export const { logoutUser } = userSlice.actions;

export default userSlice.reducer;
