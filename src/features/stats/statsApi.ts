import { nextfinRequest } from '@/api/apiClient';
import { ExpensesStats, IncomeStats, StatsRange } from '@/types/Stats';
import qs from 'qs';

export interface StatsRequest {
  range: StatsRange;
}

export type IncomeStatsResponse = IncomeStats;
export type ExpensesStatsResponse = ExpensesStats;

export const getIncomeStats = async (
  request: StatsRequest
): Promise<IncomeStatsResponse> => {
  const query = qs.stringify(request, {
    addQueryPrefix: true,
    skipNulls: true,
  });
  return await nextfinRequest('/stats/income' + query, 'GET');
};

export const getExpensesStats = async (
  request: StatsRequest
): Promise<ExpensesStatsResponse> => {
  const query = qs.stringify(request, {
    addQueryPrefix: true,
    skipNulls: true,
  });
  return await nextfinRequest('/stats/expenses' + query, 'GET');
};
