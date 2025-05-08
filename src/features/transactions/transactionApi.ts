import { nextfinRequest } from '@/api/apiClient';
import { PageRequest } from '@/types/PageRequest';
import { Transaction } from '@/types/Transaction';
import * as qs from 'qs';

export interface GetTransactionsResponse {
  content: Transaction[];
  page: PageRequest;
}

export type TransactionDirection = 'INCOMING' | 'OUTGOING' | 'ALL';
export const fetchUserTransactions = async (
  page?: PageRequest
): Promise<GetTransactionsResponse> => {
  if (page == null) {
    page = {
      pageSize: 4,
    };
  }
  const query = qs.stringify(page, { skipNulls: true, addQueryPrefix: true });
  return await nextfinRequest('/transactions/' + query, 'GET');
};
