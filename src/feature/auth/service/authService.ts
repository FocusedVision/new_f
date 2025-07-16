import api from '../../../store/api';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignUpRequest {
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  user: {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
    role: string;
  };
  token: string;
  refreshToken: string;
  sessionExpiry: number;
}

export interface ValidateTokenResponse {
  user: {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
    role: string;
  };
}

class AuthService {
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/login', credentials);
    return response.data;
  }

  async signUp(userData: SignUpRequest): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/signup', userData);
    return response.data;
  }

  async validateToken(): Promise<ValidateTokenResponse> {
    const response = await api.get<ValidateTokenResponse>('/auth/validate');
    return response.data;
  }

  async logout(): Promise<void> {
    await api.post('/auth/logout');
  }

  async refreshToken(): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/refresh');
    return response.data;
  }
}

export const authService = new AuthService();
export default authService;
