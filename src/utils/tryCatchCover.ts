export async function tryCatchCover<T>(
  callback: () => Promise<T>,
  rejectWithValue: (value: string) => any,
): Promise<T | ReturnType<typeof rejectWithValue>> {
  try {
    return await callback();
  } catch (error) {
    const message = error instanceof Error ? error.message : "Error";
    return rejectWithValue(message);
  }
}
