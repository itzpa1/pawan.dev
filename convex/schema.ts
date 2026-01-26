import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  projects: defineTable({
    title: v.string(),
    description: v.optional(v.string()),
    repoUrl: v.optional(v.string()),
    demoUrl: v.optional(v.string()),
    techStack: v.optional(v.array(v.string())),
    visible: v.boolean(),
    featured: v.boolean(),
    thumbnail: v.optional(v.string()),
  }),
  testimonials: defineTable({
    name: v.string(),
    role: v.string(),
    message: v.string(),
    avatarUrl: v.optional(v.string()),
    gender: v.optional(v.string()),
    category: v.optional(v.string()), // 'tech' or 'marketing'
    visible: v.boolean(),
  }),
  media: defineTable({
    name: v.string(),
    secureUrl: v.string(),
    publicId: v.string(),
    type: v.string(),
    format: v.optional(v.string()),
    category: v.optional(v.string()), // 'Portfolio', 'Logo', etc.
    visible: v.boolean(),
  }),
});
