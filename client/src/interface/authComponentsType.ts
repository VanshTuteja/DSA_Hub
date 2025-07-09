import type { Dispatch,SetStateAction } from "react";

export interface FormData {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword?: string;
  name?: string;
}

export interface AuthComponentProps {
  onLogin?: (data: FormData) => void;
  onSignup?: (data: FormData) => void;
  onGoogleAuth?: () => void;
  setIsOpen:Dispatch<SetStateAction<boolean>>;
  isOpen:boolean;
}