import {
  type AuthFunctions,
  BetterAuth,
} from '@convex-dev/better-auth';
import { components, internal } from './_generated/api';
import type { DataModel, Id } from './_generated/dataModel';
import { query } from './_generated/server';

// Typesafe way to pass Convex functions defined in this file
const authFunctions: AuthFunctions = internal.auth;

// Initialize the component
export const betterAuthComponent = new BetterAuth(components.betterAuth, {
  authFunctions,
});


// These are required named exports
export const { createUser, updateUser, deleteUser, createSession } =
  betterAuthComponent.createAuthFunctions<DataModel>({
    // Must create a user and return the user id
    onCreateUser: async (ctx, user) => {
      const userId = await ctx.db.insert('users', {
        // Create a new user in the database
        name: user.name,
        email: user.email,
        image: user.image,
      });

      return userId;
    },

    // Delete the user when they are deleted from Better Auth
    onDeleteUser: async (ctx, userId) => {
      await ctx.db.delete(userId as Id<'users'>);
    },
  });

// Example function for getting the current user
// Feel free to edit, omit, etc.
export const getCurrentUser = query({
  args: {},
  handler: async (ctx) => {
    // Get user data from Better Auth - email, name, image, etc.
    const userMetadata = await betterAuthComponent.getAuthUser(ctx);

    if (!userMetadata) {
      return null;
    }

    return {
      user: userMetadata,
    };
  },
});
