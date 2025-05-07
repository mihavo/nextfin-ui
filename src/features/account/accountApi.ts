import { nextfinRequest } from '@/api/apiClient';
import { Account, AccountType } from '@/types/Account';

export interface UserAccountsResponse {
  accounts: Account[];
  message: string;
}

export interface CreateAccountRequest {
  managerId: string;
  accountType: AccountType;
}

export interface CreateAccountResponse {
  id: string;
  balance: number;
  accountType: AccountType;
  holderId: string;
  transactionLimit: number;
}

interface AccountByIdResponse {
  account: Account;
  messsage: string;
}
export const fetchUserAccounts = async (): Promise<UserAccountsResponse> => {
  return await nextfinRequest('/accounts', 'GET');
};

export const fetchAccountById = async (accountId: string): Promise<Account> => {
  const response = (await nextfinRequest(
    `/accounts/${accountId}`,
    'GET'
  )) as AccountByIdResponse;
  return response.account;
};
export const createAccount = async (
  account: CreateAccountRequest
): Promise<CreateAccountResponse> => {
  return await nextfinRequest('/accounts', 'POST', account);
};
