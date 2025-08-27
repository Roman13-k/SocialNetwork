import { UserMainInfo } from "./user";

export interface PostInterface {
  id: string;
  content: string;
  created_at: Date;
  likes: { count: number }[];
  comments: { count: number }[];
  user: UserMainInfo;
  liked_by_user: boolean;
  image_url?: string[];
}
