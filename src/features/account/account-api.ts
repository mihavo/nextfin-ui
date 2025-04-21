import { nextfinRequest } from '@/api/api-client';
import { Account, AccountType } from '@/types/Account';

interface UserAccountsResponse {
  accounts: Account[];
  message: string;
}

interface CreateAccountRequest {
  managerId: string;
  accountType: AccountType;
}

interface CreateAccountResponse {
  id: string;
  balance: number;
  accountType: AccountType;
  holderId: string;
  transactionLimit: number;
}
export const fetchUserAccounts = async (): Promise<UserAccountsResponse> => {
  return await nextfinRequest('/accounts', 'GET');
};

export const createAccount = async (
  account: CreateAccountRequest
): Promise<CreateAccountResponse> => {
  return await nextfinRequest('/accounts', 'POST', account);
};
