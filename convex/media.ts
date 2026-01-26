import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const get = query({
  handler: async (ctx) => {
    return await ctx.db.query("media").order("desc").collect();
  },
});

export const add = mutation({
  args: {
    name: v.string(),
    secureUrl: v.string(),
    publicId: v.string(),
    type: v.string(),
    format: v.optional(v.string()),
    category: v.optional(v.string()),
    visible: v.boolean(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("media", args);
  },
});

export const remove = mutation({
  args: { id: v.id("media") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
