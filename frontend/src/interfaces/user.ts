export interface SignupUser {
  name: string;
  email: string;
  password: string;
  agreedToTerms: boolean;
}

export interface LoginUser {
  email: string;
  password: string;
  keepMeLoggedIn?: boolean;
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
