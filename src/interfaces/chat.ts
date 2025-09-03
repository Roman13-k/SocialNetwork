import { MessageInterface } from "./message";
import { UserMainInfo } from "./user";

export interface ChatInterface {
  id: string;
  created_at: string;
  participants: UserMainInfo[];
  lastMessage?: MessageInterface;
}
