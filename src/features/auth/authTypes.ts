export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  mobile: string;
  email: string;
  dateOfBirth?: string;
  gender?: "Male" | "Female" | "Other";
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
}

export interface LoginRequest {
  mobile: string;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  mobile: string;
  email: string;
}

export interface AuthSession {
  token: string;
  patient: Patient;
}