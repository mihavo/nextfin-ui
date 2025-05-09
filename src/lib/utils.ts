import { Status } from '@/features/account/accountSlice';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatEnumKey(key: string): string {
  return key
    .toLowerCase()
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export const getProgressValue = (status: Status) => {
  switch (status) {
    case 'pending':
      return 33;
    case 'submitting':
      return 66;
    case 'succeeded':
      return 100;
    case 'failed':
      return 0;
    default:
      return 0;
  }
};
