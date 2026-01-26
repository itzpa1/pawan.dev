import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const get = query({
  handler: async (ctx) => {
    return await ctx.db.query("testimonials").order("desc").collect();
  },
});

export const add = mutation({
  args: {
    name: v.string(),
    role: v.string(),
    message: v.string(),
    avatarUrl: v.optional(v.string()),
    gender: v.optional(v.string()),
    category: v.optional(v.string()),
    visible: v.boolean(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("testimonials", args);
  },
});

export const remove = mutation({
  args: { id: v.id("testimonials") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

export const toggleVisibility = mutation({
  args: { id: v.id("testimonials") },
  handler: async (ctx, args) => {
    const item = await ctx.db.get(args.id);
    if (item) {
      await ctx.db.patch(args.id, { visible: !item.visible });
    }
  },
});
