export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export type UserState = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
};