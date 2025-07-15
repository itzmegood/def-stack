import {
  data,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  type ShouldRevalidateFunctionArgs,
} from 'react-router';

import type { Route } from './+types/root';
import './app.css';
import { ConvexBetterAuthProvider } from '@convex-dev/better-auth/react';
import { ConvexReactClient } from 'convex/react';
import { useMemo } from 'react';
import { getToast } from 'remix-toast';
import { Toaster } from 'sonner';
import { authClient } from '~/lib/auth-client';
import { GeneralErrorBoundary } from './components/error-boundary';
import { useNonce } from './hooks/use-nonce';
import {
  ColorSchemeScript,
  useColorScheme,
} from './lib/color-scheme/components';
import { parseColorScheme } from './lib/color-scheme/server';

export const links: Route.LinksFunction = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Geist:wght@100..900&display=swap',
  },
];

export async function loader({ request }: Route.LoaderArgs) {
  const colorScheme = await parseColorScheme(request);
  const { toast, headers } = await getToast(request);

  return data({ colorScheme, toast }, { headers });
}

export const shouldRevalidate = ({
  formAction,
}: ShouldRevalidateFunctionArgs) => {
  // Only revalidate when color scheme change is requested
  return formAction === '/api/color-scheme';
};

export function Layout({ children }: { children: React.ReactNode }) {
  // const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL);
  const convex = useMemo(
    () => new ConvexReactClient(import.meta.env.VITE_CONVEX_URL),
    []
  );

  const colorScheme = useColorScheme();
  const nonce = useNonce();

  return (
    <html
      className={`h-full w-full bg-background text-foreground ${colorScheme === 'dark' ? 'dark' : ''}`}
      lang="en"
      suppressHydrationWarning
    >
      <head>
        <meta charSet="utf-8" />
        <meta
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
          name="viewport"
        />
        <Meta />
        <Links />
        <ColorSchemeScript nonce={nonce} />
      </head>
      <body className="h-full w-full">
        <ConvexBetterAuthProvider authClient={authClient} client={convex}>
          {children}
        </ConvexBetterAuthProvider>
        <ScrollRestoration />
        <Toaster position="top-center" theme={colorScheme} />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  return <GeneralErrorBoundary />;
}
