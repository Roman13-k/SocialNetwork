export interface PostInterface {
  id: string;
  user_id: string;
  content: string;
  created_at: Date;
  likes: [{ count: number }];
  comments: [{ count: number }];
}
