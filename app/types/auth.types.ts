export interface LoginFormData {
  email: string;
  password: string;
}

export interface FormErrors {
  email?: string;
  password?: string;
  auth?: string;
}

export interface MockUser {
  email: string;
  password: string;
  username: string;
}
