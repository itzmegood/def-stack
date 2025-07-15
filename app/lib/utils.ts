import { type ClassValue, clsx } from 'clsx';
// import { createCookie } from 'react-router';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getJWTToken(request: Request): string | null {
  const cookies = request.headers.get('cookie');

  if (!cookies) {
    return null;
  }

  const jwtCookie = cookies
    .split(';')
    .find((cookie) => cookie.trim().includes('convex_jwt='));

  return jwtCookie ? jwtCookie.split('=')[1] : null;
}

// export const prefs = createCookie('prefs');
