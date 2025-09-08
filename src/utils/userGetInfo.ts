import { CurrentProfileType } from "@/types/user";

export function getUserName(user: CurrentProfileType): string {
  if (!user) return "";
  return "user_metadata" in user
    ? user.user_metadata?.name ?? user.user_metadata?.full_name ?? "Anonim"
    : user.username;
}

export function getUserAvatar(user: CurrentProfileType): string | null {
  if (!user) return "";
  return "user_metadata" in user ? user.user_metadata?.avatar_url ?? null : user.avatar_url ?? null;
}

export function getUserEmail(user: CurrentProfileType): string | undefined {
  if (!user) return undefined;
  return "user_metadata" in user ? user.user_metadata?.email : user?.email ?? "not found";
}
