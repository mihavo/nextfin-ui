import { nextfinRequest } from '@/api/apiClient';
import { User } from '@/types/User';

export interface UserLoginResponse {
  message: string;
}

export interface UserLoginRequest {
  username: string;
  password: string;
}
export type UserLogoutResponse = UserLoginResponse;

export type GetUserResponse = User;

export type UserRegisterRequest = {
  username: string;
  password: string;
  email: string;
  socialSecurityNumber: string;
  phoneNumber: string;
};

export type UserRegisterResponse = {
  message: string;
  user: User;
};

export const login = async (
  requestBody: UserLoginRequest
): Promise<UserLoginResponse> => {
  return await nextfinRequest('/auth/login', 'POST', requestBody);
};

export const register = async (
  requestBody: UserRegisterRequest
): Promise<UserRegisterResponse> => {
  return await nextfinRequest('/auth/register', 'POST', requestBody);
};

export const logout = async (): Promise<UserLogoutResponse> => {
  return await nextfinRequest('/auth/logout', 'POST');
};

export const fetchCurrentUser = async (): Promise<GetUserResponse> => {
  return await nextfinRequest('/auth/me', 'GET');
};
