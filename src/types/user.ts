import { UserInterface, UserMainInfo, UserStats } from "@/interfaces/user";

export type CurrentProfileType = UserInterface | ProfileWithStats | null;

export type ProfileWithStats = UserMainInfo & { stats: UserStats };

export function isUserInterface(user: CurrentProfileType): user is UserInterface {
  return !!user && "user_metadata" in user;
}
