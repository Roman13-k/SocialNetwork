import { UserMainInfo } from "./user";

export interface CommentInterface {
  id: string;
  post_id: string;
  user_id: string;
  content: string;
  created_at: Date;
  user: UserMainInfo;
}
