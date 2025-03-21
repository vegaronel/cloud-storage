export interface Links {
  link: string;
  href: string;
}
export interface LoginFormType {
  email: string;
  password: string;
}
export interface Session {
  user: {
    id: string;
    email: string;
    // Add other user properties if needed
  };
  access_token?: string;
  refresh_token?: string;
  expires_in?: number;
  token_type?: string;
  // Add other session properties if needed
}

export interface Profile {
  id: string;
  username?: string;
  website?: string;
  avatar_url?: string | null;
  updated_at: Date;
}
