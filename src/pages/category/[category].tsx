import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Layout from '../../components/Layout'
import { getAllCategories, getPostsByCategory, type PostMeta } from '../../lib/posts'
import { formatDate } from '../../lib/format'

interface CategoryPageProps {
  category: string
  posts: PostMeta[]
}

const CategoryPage: NextPage<CategoryPageProps> = ({ category, posts }) => (
  <Layout>
    <Head>
      <title>{category} | AndrewEnsley.com</title>
    </Head>

    <p className='text-muted small mb-0'>Category</p>
    <h1 className='mt-0'>{category}</h1>

    <ul className='list-unstyled'>
      {posts.map((post) => (
        <li key={post.slug} className='mb-3'>
          <Link href={`/post/${post.slug}`} className='fs-6 fw-semibold'>
            {post.title}
          </Link>
          {post.date !== '' && <p className='mb-0 mt-1 text-muted small'>{formatDate(post.date)}</p>}
          {post.excerpt !== undefined && <p className='mb-0 mt-1 text-muted small'>{post.excerpt}</p>}
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
