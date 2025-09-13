import { ErrorState } from "@/interfaces";
import { ActionReducerMapBuilder, AsyncThunk, Draft, PayloadAction } from "@reduxjs/toolkit";
import { AuthError } from "@supabase/supabase-js";
import { mapAuthError } from "./mapAuthError";

interface AsyncBaseState {
  loading: boolean;
  error: ErrorState | null;
}

export function addAsyncCase<State extends AsyncBaseState, Returned, Arg = void>(
  builder: ActionReducerMapBuilder<State>,
  thunk: AsyncThunk<Returned, Arg, { rejectValue: ErrorState }>,
  onFullfiled: (state: Draft<State>, action: PayloadAction<Returned>) => void,
) {
  builder
    .addCase(thunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(thunk.fulfilled, (state, action) => {
      onFullfiled(state, action);
      state.loading = false;
    })
    .addCase(thunk.rejected, (state, action) => {
      state.loading = false;
      if (!action.payload) state.error = null;
      else state.error = action.payload;
    });
}
