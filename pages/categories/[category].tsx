import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Layout from '../../components/Layout'
import { getAllCategories, getPostsByCategory, type PostMeta } from '../../lib/posts'

interface CategoryPageProps {
  category: string
  posts: PostMeta[]
}

const CategoryPage: NextPage<CategoryPageProps> = ({ category, posts }) => {
  return (
    <Layout>
      <Head>
        <title>{category} — My Blog</title>
      </Head>

      <p style={{ color: '#888', fontSize: '0.85rem', margin: '0 0 0.25rem' }}>Category</p>
      <h1 style={{ marginTop: 0 }}>{category}</h1>

      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {posts.map((post) => (
          <li key={post.slug} style={{ marginBottom: '1.5rem' }}>
            <Link href={`/posts/${post.slug}`} style={{ fontSize: '1.1rem', fontWeight: 600 }}>
              {post.title}
            </Link>
            {post.date && <p style={{ margin: '0.2rem 0 0', color: '#888', fontSize: '0.85rem' }}>{post.date}</p>}
            {post.excerpt && <p style={{ margin: '0.4rem 0 0' }}>{post.excerpt}</p>}
          </li>
        ))}
      </ul>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const categories = getAllCategories()
  return {
    paths: categories.map((category) => ({ params: { category } })),
    fallback: false
  }
}

export const getStaticProps: GetStaticProps<CategoryPageProps> = async ({ params }) => {
  const category = params?.category as string
  const posts = getPostsByCategory(category)
  return { props: { category, posts } }
}

export default CategoryPage
