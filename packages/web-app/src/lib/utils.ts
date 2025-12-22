import { createIsomorphicFn } from '@tanstack/react-start';
import { getCookies } from '@tanstack/react-start/server';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { parse } from 'cookie-es';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getIsomorphicCookies = createIsomorphicFn()
  .server(() => {
    return getCookies();
  })
  .client(() => {
    return parse(document.cookie);
  });

export function getCookieValue(
  cookieHeader: string | null | undefined,
  cookieName: string
): string | undefined {
  if (!cookieHeader) return undefined;
  const cookies = cookieHeader.split(';').map((c) => c.trim());
  const cookie = cookies.find((c) => c.startsWith(`${cookieName}=`));
  if (!cookie) return undefined;
  return cookie.substring(cookieName.length + 1);
}
