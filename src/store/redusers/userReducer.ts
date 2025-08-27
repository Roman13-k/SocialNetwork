import { UserInterface, UserStats } from "@/interfaces/user";
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
    const stats: UserStats = {
      posts_count: 0,
      likes_count: 0,
      comments_count: 0,
    };
    const userWithStats: UserInterface = {
      ...sessionData.user,
      stats,
    };
    return userWithStats;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Error";
    return rejectWithValue(message);
  }
});

export const fetchSession = createAsyncThunk<UserInterface | null, void, { rejectValue: string }>(
  "user/fetchSessionWithStats",
  async (_, { rejectWithValue }) => {
    try {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();
      if (error) throw error;
      if (!session?.user) return null;

      const userId = session.user.id;

      const { data: statsData, error: statsError } = await supabase.rpc("get_user_stats", {
        p_user_id: userId,
      });

      if (statsError) throw statsError;

      const stats: UserStats = {
        posts_count: statsData[0].posts_count,
        likes_count: statsData[0].likes_count,
        comments_count: statsData[0].comments_count,
      };
      const userWithStats: UserInterface = {
        ...session.user,
        stats,
      };

      return userWithStats;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Error";
      return rejectWithValue(message);
    }
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
