import { clsx, type ClassValue } from 'clsx';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { twMerge } from 'tailwind-merge';

dayjs.extend(customParseFormat);

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

export function convertTimeAndDateToTimestamp(
  date: string,
  time: string
): string {
  const dateTime = dayjs(`${date}T${time}`);
  return dateTime.format('DD-MM-YYYYTHH:mm:ss');
}

export function convertTimestampToDateAndTime(timestamp: string): {
  date: string;
  time: string;
} {
  console.log(timestamp);
  const dt = dayjs(timestamp, 'DD-MM-YYYYTHH:mm:ss');
  return {
    date: dt.format('YYYY-MM-DD'),
    time: dt.format('HH:mm'),
  };
}

