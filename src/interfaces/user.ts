import { LoginProviderType } from "@/types/login";

export interface UserInterface {
  id: string;
  email?: string;
  phone?: string;
  created_at: string;
  app_metadata: {
    provider?: LoginProviderType | string;
    providers?: (LoginProviderType | string)[];
    [key: string]: any;
  };
  user_metadata: {
    avatar_url?: string;
    email?: string;
    email_verified?: boolean;
    full_name?: string;
    iss?: string;
    name?: string;
    phone_verified?: boolean;
    picture?: string;
    provider_id?: string;
    sub?: string;
    [key: string]: any;
  };
  is_anonymous?: boolean;
}
