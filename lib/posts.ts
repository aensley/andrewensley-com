import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'posts')

export interface PostMeta {
  slug: string
  title: string
  date: string
  excerpt?: string
  category?: string
  tags: string[]
}

export interface Post extends PostMeta {
  content: string
}

export function getPostSlugs (): string[] {
  return fs
    .readdirSync(postsDirectory)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace(/\.mdx$/, ''))
}

export function getPostBySlug (slug: string): Post {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  const rawTags = data.tags
  const tags: string[] = Array.isArray(rawTags)
    ? rawTags.map(String)
    : typeof rawTags === 'string'
      ? rawTags
        .split(',')
        .map((t: string) => t.trim())
        .filter(Boolean)
      : []

  return {
    slug,
    title: data.title ?? slug,
    date: data.date ?? '',
    excerpt: data.excerpt,
    category: data.category,
    tags,
    content
  }
}

export function getAllPosts (): PostMeta[] {
  return getPostSlugs()
    .map((slug) => {
      const { content: _content, ...meta } = getPostBySlug(slug)
      return meta
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function getAllCategories (): string[] {
  const categories = getAllPosts()
    .map((p) => p.category)
    .filter((c): c is string => Boolean(c))
  return Array.from(new Set(categories)).sort()
}

export function getAllTags (): string[] {
  const tags = getAllPosts().flatMap((p) => p.tags)
  return Array.from(new Set(tags)).sort()
}

export function getPostsByCategory (category: string): PostMeta[] {
  return getAllPosts().filter((p) => p.category === category)
}

export function getPostsByTag (tag: string): PostMeta[] {
  return getAllPosts().filter((p) => p.tags.includes(tag))
}
