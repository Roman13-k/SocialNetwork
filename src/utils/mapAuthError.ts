import { ErrorState } from "@/interfaces";
import { AuthError, PostgrestError } from "@supabase/supabase-js";

export function mapAuthError(error: AuthError | PostgrestError): ErrorState {
  return {
    code: error.code ?? "UNKNOWN",
    message: error.message,
  };
}
