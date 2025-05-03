import { nextfinRequest } from '@/api/api-client';
import { PageRequest } from '@/types/PageRequest';
import { Transaction } from '@/types/Transaction';
import * as qs from 'qs';

export interface GetTransactionsResponse {
  content: Transaction[];
  page: PageRequest;
}

export type GetAccountTransactionsResponse = GetTransactionsResponse;

export const fetchUserTransactions = async (
  page?: PageRequest
): Promise<GetTransactionsResponse> => {
  if (page == null) {
    page = {
      pageSize: 4,
    };
  }
  const query = '?' + qs.stringify(page, { skipNulls: true });
  return await nextfinRequest('/transactions/' + query, 'GET');
};
