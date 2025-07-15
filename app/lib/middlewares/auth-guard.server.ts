import { betterFetch } from '@better-fetch/fetch';
import { redirect, type unstable_MiddlewareFunction } from 'react-router';
import { authSessionContext } from '~/lib/contexts';

export async function fetchAuthSession(request: Request) {
  const baseURL = new URL(request.url).origin;
  const { data: session } = await betterFetch('/api/auth/get-session', {
    baseURL,
    headers: request.headers,
  });

  return session;
}

export const authMiddleware: unstable_MiddlewareFunction = async (
  { request, context },
  next
) => {
  const authSession = await fetchAuthSession(request);

  if (!authSession) {
    throw redirect('/auth/sign-in');
  }

  context.set(authSessionContext, authSession);

  return await next();
};

export const noAuthMiddleware: unstable_MiddlewareFunction = async (
  { request },
  next
) => {
  const authSession = await fetchAuthSession(request);

  if (authSession) {
    throw redirect('/');
  }

  return await next();
};
