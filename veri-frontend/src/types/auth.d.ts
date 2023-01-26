export interface Login {
  email: string;
  password: string;
}

export interface SignUp {
  email: string;
  Name: string;
  password: string;
}

interface AuthContextType {
  user?: User;
  loading: boolean;
  error?: any;
  login: (loginData: Login) => void;
  signUp: (signUpData: SignUp) => void;
  logout: () => void;
}
