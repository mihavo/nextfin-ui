import { nextfinRequest } from '@/api/api-client';

export interface UserLoginResponse {
  message: string;
}

export interface UserLoginRequest {
  email: string;
  password: string;
}

export const login = async (
  requestBody: UserLoginRequest
): Promise<UserLoginResponse> => {
  return await nextfinRequest('/auth/login', 'POST', requestBody);
};
