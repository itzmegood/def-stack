import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  users: defineTable({
    // Fields are optional
    name: v.optional(v.string()),
    username: v.optional(v.string()),
    email: v.optional(v.string()),
    image: v.optional(v.string()),
  })
    .index('by_email', ['email'])
    .index('by_username', ['username']),
});
