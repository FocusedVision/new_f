import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService, { LoginRequest, SignUpRequest } from '../../feature/auth/service/authService';

interface AuthState {
  user: {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
    role: string;
  } | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  sessionExpiry: number | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  refreshToken: null,
  isAuthenticated: false,
  sessionExpiry: null,
  loading: false,
  error: null,
};

// Async thunks for API calls
export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials: LoginRequest, { rejectWithValue }) => {
    try {
      const response = await authService.login(credentials);
      // Store token in localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('token', response.token);
        localStorage.setItem('refreshToken', response.refreshToken);
      }
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  },
);

export const signUpUser = createAsyncThunk(
  'auth/signup',
  async (userData: SignUpRequest, { rejectWithValue }) => {
    try {
      const response = await authService.signUp(userData);
      // Store token in localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('token', response.token);
        localStorage.setItem('refreshToken', response.refreshToken);
      }
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Sign up failed');
    }
  },
);

export const validateUserToken = createAsyncThunk(
  'auth/validateUserToken',
  async (_, { rejectWithValue }) => {
    try {
      const response = await authService.validateToken();
      return response;
    } catch (error: any) {
      // Clear tokens if validation fails
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
      }
      return rejectWithValue(error.response?.data?.message || 'Token validation failed');
    }
  },
);

export const logoutUser = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
  try {
    await authService.logout();
    // Clear tokens from localStorage
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
    }
  } catch (error: any) {
    // Even if logout API fails, clear local tokens
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
    }
    return rejectWithValue(error.response?.data?.message || 'Logout failed');
  }
});

export const refreshUserToken = createAsyncThunk(
  'auth/refreshToken',
  async (_, { rejectWithValue }) => {
    try {
      const response = await authService.refreshToken();
      // Update tokens in localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('token', response.token);
        localStorage.setItem('refreshToken', response.refreshToken);
      }
      return response;
    } catch (error: any) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
      }
      return rejectWithValue(error.response?.data?.message || 'Token refresh failed');
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login cases
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.refreshToken = action.payload.refreshToken;
        state.sessionExpiry = action.payload.sessionExpiry;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
      })

      // Sign up cases
      .addCase(signUpUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.refreshToken = action.payload.refreshToken;
        state.sessionExpiry = action.payload.sessionExpiry;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
      })

      // Validate token cases
      .addCase(validateUserToken.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(validateUserToken.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(validateUserToken.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
        state.user = null;
      })

      // Logout cases
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.token = null;
        state.refreshToken = null;
        state.sessionExpiry = null;
        state.isAuthenticated = false;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.token = null;
        state.refreshToken = null;
        state.sessionExpiry = null;
        state.isAuthenticated = false;
        state.error = action.payload as string;
      })

      // Refresh token cases
      .addCase(refreshUserToken.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(refreshUserToken.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.refreshToken = action.payload.refreshToken;
        state.sessionExpiry = action.payload.sessionExpiry;
        state.error = null;
      })
      .addCase(refreshUserToken.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
        state.user = null;
      });
  },
});

export const { clearError, setLoading } = authSlice.actions;
export default authSlice.reducer;
