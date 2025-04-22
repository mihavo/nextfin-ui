import { nextfinRequest } from '@/api/api-client';

export interface UserLoginResponse {
  message: string;
}

export interface UserLoginRequest {
  username: string;
  password: string;
}
export type UserLogoutResponse = UserLoginResponse;

export const login = async (
  requestBody: UserLoginRequest
): Promise<UserLoginResponse> => {
  return await nextfinRequest('/auth/login', 'POST', requestBody);
};

export const logout = async (): Promise<UserLogoutResponse> => {
  return await nextfinRequest('/auth/logout', 'POST');
};