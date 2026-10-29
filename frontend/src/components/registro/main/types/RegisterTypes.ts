export interface RegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface RegisterUser {
  id: string;
  email: string;
  profile?: {
    firstName: string;
    lastName: string;
  } | null;
}

export interface RegisterResponse {
  user: RegisterUser;
  token: string;
}

export interface RegisterMainTypes {
  className?: string;
}

export interface RegisterState {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  loading: boolean;
  error: string | null;
}

export interface RegisterActions {
  handleFirstNameChange: (value: string) => void;
  handleLastNameChange: (value: string) => void;
  handleEmailChange: (value: string) => void;
  handlePasswordChange: (value: string) => void;
  handleSubmit: () => Promise<void>;
  navigateToLogin: () => void;
}
