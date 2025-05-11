import { nextfinRequest } from '@/api/apiClient';
import { Account, AccountType } from '@/types/Account';
import { PageResponse } from '@/types/PageResponse';
import { Transaction, TransactionRequestOptions } from '@/types/Transaction';
import qs from 'qs';

export interface UserAccountsResponse {
  accounts: Account[];
  message: string;
}

export interface CreateAccountRequest {
  managerId: string;
  accountType: AccountType;
}

export type CreateAccountResponse = Account;

export interface AccountByIdResponse {
  account: Account;
  messsage: string;
}

export interface GetAccountTransactionsRequest {
  accountId: string;
  options: TransactionRequestOptions;
}

export interface GetAccountTransactionsResponse {
  content: Transaction[];
  page: PageResponse;
}

export interface AccountSearchOptions {
  pageSize: number;
  skip: number;
}

export interface AccountSearchResult {
  id: number;
  iban: string;
  firstName: string;
  lastName: string;
  currency: string;
}

export interface AccountSearchResponse {
  content: AccountSearchResult[];
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
    { ...request.options },
    { skipNulls: true, addQueryPrefix: true }
  );
  return await nextfinRequest(
    `/accounts/${request.accountId}/transactions${query}`,
    'GET'
  );
};

export const searchAccounts = async (
  query: string,
  options?: AccountSearchOptions
): Promise<AccountSearchResponse> => {
  const parsedOptions = qs.stringify(options, { skipNulls: true });
  return await nextfinRequest(
    `/accounts/search?${query}&${parsedOptions}`,
    'GET'
  );
};