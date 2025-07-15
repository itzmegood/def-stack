import type { ActionFunctionArgs, LoaderFunctionArgs } from 'react-router';

export const authHandler = (
  request: Request,
  opts?: { convexSiteUrl?: string }
) => {
  const convexSiteUrl = opts?.convexSiteUrl ?? process.env.CONVEX_SITE_URL;
  const requestUrl = new URL(request.url);
  const nextUrl = `${convexSiteUrl}${requestUrl.pathname}${requestUrl.search}`;
  request.headers.set('accept-encoding', 'application/json');

  // request.headers.set('origin', requestUrl.origin);

  return fetch(nextUrl, new Request(request, { redirect: 'manual' }));
};

export async function loader({ request }: LoaderFunctionArgs) {
  return authHandler(request);
}

export async function action({ request }: ActionFunctionArgs) {
  return authHandler(request);
}
