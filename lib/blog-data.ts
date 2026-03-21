export interface BlogPost {
  slug: string;
  category: string;
  title: string;
  date: string;
  excerpt: string;
  image: string;
  content: string; // HTML string 
}

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

export interface BlogPost {
  slug: string;
  category: string;
  title: string;
  date: string;
  excerpt: string;
  image: string;
  content: string; // Dynamic HTML string from Markdown
}

const postsDirectory = path.join(process.cwd(), 'content/blog');

async function getPostsData(): Promise<BlogPost[]> {
  // Get file names under /content/blog (filtering out non-md files)
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory).filter(fileName => fileName.endsWith('.md') && fileName !== 'template.md');
  const allPostsData = await Promise.all(fileNames.map(async (fileName) => {
    // Remove ".md" from file name to get slug
    const slug = fileName.replace(/\.md$/, '');

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Use remark to convert markdown into HTML string
    const processedContent = await remark()
      .use(html)
      .process(matterResult.content);
    const contentHtml = processedContent.toString();

    // Combine the data with the slug
    return {
      slug,
      content: contentHtml,
      ...(matterResult.data as { title: string; category: string; date: string; excerpt: string; image: string }),
    };
  }));

  // Sort posts by date
  return allPostsData.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

import { cache } from 'react';

export const getBlogPosts = cache(async (): Promise<BlogPost[]> => {
  return getPostsData();
});
