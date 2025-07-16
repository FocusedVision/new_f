import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../../store';
import {
  loginUser,
  signUpUser,
  validateUserToken,
  logoutUser,
  refreshUserToken,
  clearError,
  setLoading,
} from '../../../store/slice/authSlice';
import { LoginRequest, SignUpRequest } from '../service/authService';

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const auth = useSelector((state: RootState) => state.auth);

  const login = async (credentials: LoginRequest) => {
    return await dispatch(loginUser(credentials));
  };

  const signUp = async (userData: SignUpRequest) => {
    return await dispatch(signUpUser(userData));
  };

  const validateToken = async () => {
    return await dispatch(validateUserToken());
  };

  const logout = async () => {
    return await dispatch(logoutUser());
  };

  const refreshTokenAction = async () => {
    return await dispatch(refreshUserToken());
  };

  const clearAuthError = () => {
    dispatch(clearError());
  };

  const setAuthLoading = (loading: boolean) => {
    dispatch(setLoading(loading));
  };

  return {
    // State
    user: auth.user,
    token: auth.token,
    refreshToken: auth.refreshToken,
    isAuthenticated: auth.isAuthenticated,
    sessionExpiry: auth.sessionExpiry,
    loading: auth.loading,
    error: auth.error,

    // Actions
    login,
    signUp,
    validateToken,
    logout,
    clearAuthError,
    setAuthLoading,
    refreshTokenAction,
  };
};
