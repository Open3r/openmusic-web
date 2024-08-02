export interface User {
  id: number;
  nickname: string;
  email: string;
  provider: string;
  avatarUrl: string;
  role: string;
  status: string;
  genres: string[];
}
