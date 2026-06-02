import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'src/posts')

const SORT_DESC = -1
const SORT_ASC = 1

function asString(value: unknown): string | undefined {
  return typeof value === 'string' ? value : undefined
}

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

export function getPostSlugs(): string[] {
  return fs
    .readdirSync(postsDirectory)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace(/\.mdx$/v, ''))
}

export function getPostBySlug(slug: string): Post {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)
  const safeData: Record<string, unknown> = data

  const { tags: rawTags } = safeData
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
    title: asString(safeData.title) ?? slug,
    date: asString(safeData.date) ?? '',
    excerpt: asString(safeData.excerpt),
    category: asString(safeData.category),
    tags,
    content
  }
}

export function getAllPosts(): PostMeta[] {
  return getPostSlugs()
    .map((slug) => {
      const { content: _content, ...meta } = getPostBySlug(slug)
      return meta
    })
    .sort((a, b) => (a.date > b.date ? SORT_DESC : SORT_ASC))
}

export function getAllCategories(): string[] {
  const categories = getAllPosts()
    .map((p) => p.category)
    .filter((c): c is string => Boolean(c))
  return Array.from(new Set(categories)).sort()
}

export function getAllTags(): string[] {
  const tags = getAllPosts().flatMap((p) => p.tags)
  return Array.from(new Set(tags)).sort()
}

export function getPostsByCategory(category: string): PostMeta[] {
  return getAllPosts().filter((p) => p.category === category)
}

export function getPostsByTag(tag: string): PostMeta[] {
  return getAllPosts().filter((p) => p.tags.includes(tag))
}
