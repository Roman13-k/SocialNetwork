import { UserInterface, UserMainInfo } from "@/interfaces/user";
import { supabase } from "@/lib/supabaseClient";
import { LoginProviderType } from "@/types/login";
import { ProfileWithStats } from "@/types/user";
import { addAsyncCase } from "@/utils/addAsyncCase";
import { mapUserWithStats } from "@/utils/mapUserWithStats";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface UserState {
  user: UserInterface | null;
  profile: ProfileWithStats | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  profile: null,
  loading: true,
  error: null,
};

export const loginUser = createAsyncThunk<
  UserInterface | null,
  LoginProviderType,
  { rejectValue: string }
>("user/loginUser", async (provider, { rejectWithValue }) => {
  const { error } = await supabase.auth.signInWithOAuth({ provider });
  if (error) return rejectWithValue(error.message);

  const { data: sessionData, error: userError } = await supabase.auth.getUser();
  if (userError) return rejectWithValue(userError.message);
  if (!sessionData.user) return null;
  return mapUserWithStats(sessionData.user);
});

export const loginWithEmail = createAsyncThunk<
  UserInterface | null,
  { email: string; password: string },
  { rejectValue: string }
>("user/loginWithEmail", async ({ email, password }, { rejectWithValue }) => {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return rejectWithValue(error.message);
  if (!data.user) return null;
  return mapUserWithStats(data.user);
});

export const registerUser = createAsyncThunk<
  UserInterface | null,
  { email: string; password: string },
  { rejectValue: string }
>("user/registerUser", async ({ email, password }, { rejectWithValue }) => {
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) return rejectWithValue(error.message);
  if (!data.user) return null;
  return mapUserWithStats(data.user);
});

export const fetchSession = createAsyncThunk<UserInterface | null, void, { rejectValue: string }>(
  "user/fetchSessionWithStats",
  async () => {
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

    return mapUserWithStats(session.user, statsData?.[0]);
  },
);

export const getProfileById = createAsyncThunk<
  ProfileWithStats | null,
  string,
  { rejectValue: string }
>("user/getProfileById", async (userId, { rejectWithValue }) => {
  const { data, error } = await supabase
    .rpc("get_full_user", { p_user_id: userId })
    .single<UserMainInfo>();

  if (error) return rejectWithValue(error.message);

  const { data: statsData, error: statsError } = await supabase.rpc("get_user_stats", {
    p_user_id: userId,
  });
  if (statsError) return rejectWithValue(statsError.message);

  return mapUserWithStats(data, statsData?.[0]);
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
    addAsyncCase(builder, loginUser, (state, action) => {
      state.user = action.payload;
    }),
      addAsyncCase(builder, loginWithEmail, (state, action) => {
        state.user = action.payload;
      }),
      addAsyncCase(builder, registerUser, (state, action) => {
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
    addAsyncCase(builder, getProfileById, (state, action) => {
      state.profile = action.payload;
      if (!action.payload) {
        state.error = "No profile with this ID";
      } else {
        state.error = null;
      }
    });
  },
});

export const { logoutUser } = userSlice.actions;

export default userSlice.reducer;
