import { ConvexError } from 'convex/values';
import {
  customCtx,
  customMutation,
  customQuery,
} from 'convex-helpers/server/customFunctions';
import { mutation, query } from './_generated/server';

// !MIDDLEWARES

export const authenticatedUserQuery = customQuery(
  query,
  customCtx(async (ctx) => {
    const user = await ctx.auth.getUserIdentity();

    if (!user) throw new ConvexError('Unauthorized');

    return { user };
  })
);

export const authenticatedUserMutation = customMutation(mutation, {
  args: {},
  input: async (ctx, _args) => {
    const user = await ctx.auth.getUserIdentity();

    if (!user) throw new ConvexError('Unauthorized');

    return { ctx: { userId: user.subject }, args: {} };
  },
});
