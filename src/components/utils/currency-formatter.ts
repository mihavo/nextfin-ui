import { currencies } from './currency';

export const currencyFormatter = (currency: string, amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency ?? 'USD',
  }).format(amount);
};

export const mapCurrencyToFlag = (currencyCode: string) => {
  return currencies.find((curr) => curr.code == currencyCode)?.flag;
};
