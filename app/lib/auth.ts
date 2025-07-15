import { convexAdapter } from "@convex-dev/better-auth";
import { convex } from "@convex-dev/better-auth/plugins";
import { betterAuth } from "better-auth";
import { betterAuthComponent } from "../../convex/auth";
import { type GenericCtx } from "../../convex/_generated/server";

export const createAuth = (ctx: GenericCtx) =>
  // Configure your Better Auth instance here
  betterAuth({
    baseURL: process.env.SITE_URL,
    secret: process.env.BETTER_AUTH_SECRET,
    database: convexAdapter(ctx, betterAuthComponent),
    trustedOrigins: [
      // biome-ignore lint/style/noNonNullAssertion: <explanation>
      process.env.CONVEX_SITE_URL!,
      process.env.SITE_URL || 'http://localhost:5173',
    ],

    emailAndPassword: {
      enabled: true,
      requireEmailVerification: true,
      sendResetPassword: async ({ user, url, token }) => {
        if (process.env.ENVIRONMENT === 'development') {
          console.log('Send email to reset password');
          console.log('User', user);
          console.log('URL', url);
          console.log('Token', token);
        } else {
          // Send email to user ...
        }
      },
    },
    emailVerification: {
      sendOnSignUp: true,
      autoSignInAfterVerification: true,
      sendVerificationEmail: async ({ user, url, token }) => {
        if (process.env.ENVIRONMENT === 'development') {
          console.log('Send email to verify email address');
          console.log(user, url, token);
        } else {
          // Send email to user ...
        }
      },
    },
    socialProviders: {
      google: {
        clientId: process.env.GOOGLE_CLIENT_ID || 'your-google-client-id',
        clientSecret:
          process.env.GOOGLE_CLIENT_SECRET || 'your-google-client-secret',
      },
    },
    account: {
      accountLinking: {
        enabled: true,
        allowDifferentEmails: true,
        trustedProviders: ['google'],
      },
    },
    user: {
      deleteUser: {
        enabled: true,
        afterDelete: async (_user) => {
          // if (user.image) {
          // 	await deleteUserImageFromR2(user.image);
          // }
        },
      },
    },
    plugins: [
      // The Convex plugin is required
      convex(),
    ],
  });
