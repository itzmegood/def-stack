import { api } from 'convex/_generated/api';
import { fetchQuery } from 'convex/nextjs';
import { ArrowRightIcon } from 'lucide-react';
import { href, Link, redirect } from 'react-router';
import { AppLogo } from '~/components/app-logo';
import { ColorSchemeToggle } from '~/components/color-scheme-toggle';
import { GithubIcon } from '~/components/icons';
import { Button, buttonVariants } from '~/components/ui/button';
import { AppInfo } from '~/lib/config';
import { cn, getJWTToken } from '~/lib/utils';
import type { Route } from './+types/index';

export async function loader({ request }: Route.LoaderArgs) {
  const convexJWT = getJWTToken(request);

  if (!convexJWT) {
    return null;
  }

  const convexURL = process.env.VITE_CONVEX_URL;

  const user = await fetchQuery(
    api.auth.getCurrentUser,
    {},
    {
      url: convexURL,
      token: convexJWT,
    }
  );

  if (user) {
    return { user };
  }

  return redirect('/home');
}

export const meta: Route.MetaFunction = () => {
  return [{ title: AppInfo.name }];
};

export default function HomeRoute() {
  return (
    <div className="relative flex h-dvh w-full flex-col bg-background">
      <div className="absolute top-4 right-4 sm:right-10">
        <ColorSchemeToggle />
      </div>
      <main className="mx-auto flex max-w-xl flex-1 flex-col items-center justify-center px-6 sm:px-10">
        <section className="flex flex-col items-center gap-4">
          <AppLogo />

          <div className="font-extrabold text-4xl text-primary leading-8 tracking-tight sm:text-5xl sm:leading-10">
            React Router v7 with Convex + Better auth.
          </div>

          <p className="text-center font-normal text-base opacity-80">
            {AppInfo.description}
          </p>

          <div className="flex items-center gap-4">
            <Button asChild variant="outline">
              <Link
                reloadDocument
                to="https://github.com/itzmegood/rr7-convex-better-auth"
              >
                <GithubIcon />
                Star on Github
              </Link>
            </Button>
            <Link
              className={cn(buttonVariants({ variant: 'outline' }))}
              to={href('/auth/sign-in')}
            >
              Get Started <ArrowRightIcon className="size-4" />
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
