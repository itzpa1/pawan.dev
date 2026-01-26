import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const get = query({
  handler: async (ctx) => {
    return await ctx.db.query("projects").order("desc").collect();
  },
});

export const add = mutation({
  args: {
    title: v.string(),
    description: v.optional(v.string()),
    repoUrl: v.optional(v.string()),
    demoUrl: v.optional(v.string()),
    techStack: v.optional(v.array(v.string())),
    visible: v.boolean(),
    featured: v.boolean(),
    thumbnail: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("projects", args);
  },
});

export const remove = mutation({
  args: { id: v.id("projects") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

export const toggleVisibility = mutation({
  args: { id: v.id("projects") },
  handler: async (ctx, args) => {
    const item = await ctx.db.get(args.id);
    if (item) {
      await ctx.db.patch(args.id, { visible: !item.visible });
    }
  },
});

export const update = mutation({
  args: {
    id: v.id("projects"),
    title: v.string(),
    description: v.optional(v.string()),
    repoUrl: v.optional(v.string()),
    demoUrl: v.optional(v.string()),
    techStack: v.optional(v.array(v.string())),
    visible: v.boolean(),
    featured: v.boolean(),
    thumbnail: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, ...data } = args;
    await ctx.db.patch(id, data);
  },
});
