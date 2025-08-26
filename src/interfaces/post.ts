export interface PostInterface {
  id: string;
  content: string;
  created_at: Date;
  likes: { count: number }[];
  comments: { count: number }[];
  user: {
    id: string;
    username: string;
    avatar_url: string;
  };
  liked_by_user: boolean;
  image_url?: string[];
}
