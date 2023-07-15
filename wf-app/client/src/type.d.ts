type todos = {
  id: string;
  title: string;
  done: boolean;
};

export type User = {
  id: string;
  name: string;
  email: string;
  authToken?: string;
};

export type AuthState = {
  user: User;
  isLoggedIn: boolean;
  isLoading: boolean;
};
