import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Layout from '../../components/Layout'
import { getAllCategories, getPostsByCategory, type PostMeta } from '../../lib/posts'

interface CategoryPageProps {
  category: string
  posts: PostMeta[]
}

const ZERO = 0
const FONT_WEIGHT_SEMIBOLD = 600

const CategoryPage: NextPage<CategoryPageProps> = ({ category, posts }) => (
  <Layout>
    <Head>
      <title>{category} — My Blog</title>
    </Head>

    <p style={{ color: '#888', fontSize: '0.85rem', margin: ZERO }}>Category</p>
    <h1 style={{ marginTop: ZERO }}>{category}</h1>

    <ul style={{ listStyle: 'none', padding: ZERO, margin: ZERO }}>
      {posts.map((post) => (
        <li key={post.slug} style={{ marginBottom: '1.5rem' }}>
          <Link href={`/posts/${post.slug}`} style={{ fontSize: '1.1rem', fontWeight: FONT_WEIGHT_SEMIBOLD }}>
            {post.title}
          </Link>
          {post.date !== '' && <p style={{ margin: '0.2rem 0 0', color: '#888', fontSize: '0.85rem' }}>{post.date}</p>}
          {post.excerpt !== undefined && <p style={{ margin: '0.4rem 0 0' }}>{post.excerpt}</p>}
        </li>
      ))}
    </ul>
  </Layout>
)

export const getStaticPaths: GetStaticPaths = () => {
  const categories = getAllCategories()
  return {
    paths: categories.map((category) => ({ params: { category } })),
    fallback: false
  }
}

export const getStaticProps: GetStaticProps<CategoryPageProps> = ({ params }) => {
  const categoryParam = params?.category
  if (typeof categoryParam !== 'string') {
    return { notFound: true }
  }
  const posts = getPostsByCategory(categoryParam)
  return { props: { category: categoryParam, posts } }
}

export default CategoryPage
