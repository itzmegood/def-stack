import {
  index,
  layout,
  prefix,
  type RouteConfig,
  route,
} from '@react-router/dev/routes';

export default [
  index('routes/index.tsx'),

  ...prefix('auth', [
    layout('routes/auth/layout.tsx', [
      route('sign-in', 'routes/auth/sign-in.tsx'),
      route('sign-up', 'routes/auth/sign-up.tsx'),
      route('sign-out', 'routes/auth/sign-out.tsx'),
    ]),
    route('forget-password', 'routes/auth/forget-password.tsx'),
    route('reset-password', 'routes/auth/reset-password.tsx'),
  ]),

  ...prefix('api', [
    route('auth/*', 'routes/api/auth/better.ts'),
    route('auth/error', 'routes/api/auth/better-error.tsx'),
    route('color-scheme', 'routes/api/color-scheme.ts'),
  ]),

  route('*', 'routes/not-found.tsx'),
] satisfies RouteConfig;
