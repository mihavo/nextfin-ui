import { nextfinRequest } from '@/api/apiClient';
import { Address } from '@/types/Address';
import { Holder } from '@/types/Holder';
import qs from 'qs';

export interface RegisterHolderResponse {
  message: string;
  holder: Holder;
}

export type HolderRequest = {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  phoneNumber: string;
  address: Address;
};

export interface RegisterHolderRequest {
  username: string;
  request: HolderRequest;
}

export const registerHolder = async (
  request: RegisterHolderRequest
): Promise<RegisterHolderResponse> => {
  const params = qs.stringify(
    { username: request.username },
    { skipNulls: true, addQueryPrefix: true }
  );
  return await nextfinRequest(
    '/holders/register-holder' + params,
    'POST',
    request
  );
};
