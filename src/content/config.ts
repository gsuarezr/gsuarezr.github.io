import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    date: z.date(),
    description: z.string().optional(),
    tags: z.array(z.string()).optional(),
    jupyter: z.object({
      jupytext: z.object({
        text_representation: z.object({
          extension: z.string(),
          format_name: z.string(),
          format_version: z.string(),
          jupytext_version: z.string(),
        }),
      }),
      kernelspec: z.object({
        display_name: z.string(),
        language: z.string(),
        name: z.string(),
      }),
    }).optional(),
  }),
});

export const collections = {
  blog: blogCollection,
};