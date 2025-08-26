import { ActionReducerMapBuilder, AsyncThunk, Draft, PayloadAction } from "@reduxjs/toolkit";

interface AsyncBaseState {
  loading: boolean;
  error: string | null;
}

export function addAsyncCase<State extends AsyncBaseState, Returned, Arg = void>(
  builder: ActionReducerMapBuilder<State>,
  thunk: AsyncThunk<Returned, Arg, { rejectValue: string }>,
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
      state.error = (action.payload as string) || action.error.message || "Error";
    });
}
