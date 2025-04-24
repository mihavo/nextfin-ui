import { nextfinRequest } from '@/api/api-client';
import { PageRequest } from '@/types/PageRequest';
import { Transaction } from '@/types/Transaction';
import qs from 'qs';

export interface GetTransactionsResponse {
  content: Transaction[];
  page: PageRequest;
}

export type GetAccountTransactionsResponse = GetTransactionsResponse;

export const fetchUserTransactions = async (
  page?: PageRequest
): Promise<GetTransactionsResponse> => {
  const query = qs.stringify(page, { skipNulls: true });
  console.log(query);
  return await nextfinRequest('/transactions' + query, 'GET');
};
