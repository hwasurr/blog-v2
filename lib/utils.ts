import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export const getRandomColor = (): string => {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

export function getRandomColors(howMany: number = 5): string[] {
  return new Array(howMany).fill(null).map(() => getRandomColor());
}
