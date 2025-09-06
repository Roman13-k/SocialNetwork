import { UserStats } from "@/interfaces/user";

export function mapUserWithStats<T extends { id: string }>(
  user: T,
  stats?: Partial<UserStats>,
): T & { stats: UserStats } {
  return {
    ...user,
    stats: {
      posts_count: stats?.posts_count ?? 0,
      likes_count: stats?.likes_count ?? 0,
      comments_count: stats?.comments_count ?? 0,
    },
  };
}
