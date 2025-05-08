import { nextfinRequest } from '@/api/apiClient';
import { Account, AccountType } from '@/types/Account';
import { PageRequest } from '@/types/PageRequest';
import { PageResponse } from '@/types/PageResponse';
import { Transaction } from '@/types/Transaction';
import qs from 'qs';
import { TransactionDirection } from '../transactions/transactionApi';

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

export interface AccountByIdResponse {
  account: Account;
  messsage: string;
}

export interface GetAccountTransactionsRequest {
  accountId: string;
  direction: TransactionDirection;
  pageRequest?: PageRequest;
}

export interface GetAccountTransactionsResponse {
  content: Transaction[];
  page: PageResponse;
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

export const getAccountTransactions = async (
  request: GetAccountTransactionsRequest
): Promise<GetAccountTransactionsResponse> => {
  const query = qs.stringify(
    { direction: request.direction, ...request.pageRequest },
    { skipNulls: true, addQueryPrefix: true }
  );
  return await nextfinRequest(
    `/accounts/${request.accountId}/transactions/${query}`,
    'GET'
  );
};