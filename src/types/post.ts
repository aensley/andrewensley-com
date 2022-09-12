import Author from './author'

type PostType = {
  slug: string
  title: string
  date: string
  coverImage: string
  author: Author
  excerpt: string
  categories: [string]
  tags: [string]
  ogImage: {
    url: string
  }
  content: string
}

export default PostType
