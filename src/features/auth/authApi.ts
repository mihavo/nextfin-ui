import { nextfinRequest } from '@/api/api-client';
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

export const login = async (
  requestBody: UserLoginRequest
): Promise<UserLoginResponse> => {
  return await nextfinRequest('/auth/login', 'POST', requestBody);
};

export const logout = async (): Promise<UserLogoutResponse> => {
  return await nextfinRequest('/auth/logout', 'POST');
};

export const fetchCurrentUser = async (): Promise<GetUserResponse> => {
  return await nextfinRequest('/auth/me', 'GET');
};