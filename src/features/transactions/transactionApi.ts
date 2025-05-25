import { nextfinRequest } from '@/api/apiClient';
import { PageRequest } from '@/types/PageRequest';
import { Transaction } from '@/types/Transaction';
import * as qs from 'qs';

export interface GetTransactionsResponse {
  content: Transaction[];
  page: PageRequest;
}

export interface TransactionRequest {
  sourceAccountId: string;
  targetAccountId: string;
  amount: number;
  currency: string;
  transactionType: string;
}

export interface TransactionSchedulingOptions {
  isScheduled: boolean;
  timestamp?: string;
}

export interface NewTransactionResponse {
  transactionId: string;
  sourceAccountId: string;
  targetAccountId: string;
  currency: string;
  amount: number;
  status: string;
  category: string;
  message: string;
  timestamp: string;
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

export const transact = async (
  request: TransactionRequest,
  options: TransactionSchedulingOptions
): Promise<NewTransactionResponse> => {
  if (options.isScheduled) {
    return await nextfinRequest('/transactions/schedule', 'POST', {
      transactionDetails: {
        ...request,
      },
      timestamp: options.timestamp,
    });
  }
  return await nextfinRequest('/transactions/initiate', 'POST', request);
};