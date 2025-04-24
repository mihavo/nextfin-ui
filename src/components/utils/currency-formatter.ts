export const currencyFormatter = (currency: string, amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency ?? 'USD',
  }).format(amount);
};
