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

export function convertTimeAndDateToTimestamp(date: string, time: string): string {
  const dateTimeString = `${date}T${time}`;
  const dateTime = new Date(dateTimeString);
  return Math.floor(dateTime.getTime() / 1000).toString();
}