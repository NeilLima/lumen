export interface LoginFormData {
  email: string;
  password: string;
}

export interface LoginUser {
  id: string;
  email: string;
  profile?: {
    firstName: string;
    lastName: string;
  } | null;
}

export interface LoginResponse {
  user: LoginUser;
  token: string;
}

export interface LoginMainTypes {
  className?: string;
}

export interface LoginState {
  email: string;
  password: string;
  loading: boolean;
  error: string | null;
}

export interface LoginActions {
  handleEmailChange: (value: string) => void;
  handlePasswordChange: (value: string) => void;
  handleSubmit: () => Promise<void>;
  navigateToRegister: () => void;
}
