import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const stories = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/stories' }),
  schema: z.object({
    title: z.string(),              // 故事标题
    author: z.string(),             // 作者昵称
    cover: z.string().optional(),   // 封面图路径，如 /images/昵称/照片.jpg；没有照片可不写
    excerpt: z.string(),            // 一句话摘要，显示在首页卡片上
    date: z.coerce.date(),          // 日期，格式 2026-09-10
  }),
});

export const collections = { stories };
