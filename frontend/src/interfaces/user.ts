export interface SignupUser {
  name: string;
  email: string;
  password: string;
}

export interface LoginUser {
  email: string;
  password: string;
}

export interface CurrentUser {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  token: string;
}

export interface UserState {
  currentUser: CurrentUser | null;
  loading: boolean;
  error: string | null;
  isLoggedIn: boolean;
}
