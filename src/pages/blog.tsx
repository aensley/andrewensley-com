import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { Badge } from 'react-bootstrap'
import Layout from '../components/Layout'
import { getAllPosts, type PostMeta } from '../lib/posts'
import { formatDate } from '../lib/format'

interface BlogProps {
  posts: PostMeta[]
}

const EMPTY = 0

const Blog: NextPage<BlogProps> = ({ posts }) => (
  <Layout>
    <Head>
      <title>Blog | AndrewEnsley.com</title>
      <meta name='description' content='All posts' />
    </Head>

    <h1 className='mt-0'>Blog</h1>

    {posts.length === EMPTY && <p>No posts yet.</p>}

    <ul className='list-unstyled'>
      {posts.map((post) => (
        <li key={post.slug} className='mb-4'>
          <Link href={`/post/${post.slug}`} className='fs-5 fw-semibold'>
            {post.title}
          </Link>
          <div className='d-flex flex-wrap gap-2 align-items-center text-muted small mt-1'>
            {post.date !== '' && <span>{formatDate(post.date)}</span>}
            {post.category !== undefined && (
              <>
                {post.date !== '' && <span>·</span>}
                <Link href={`/category/${post.category}`}>{post.category}</Link>
              </>
            )}
          </div>
          {post.tags.length !== EMPTY && (
            <div className='d-flex flex-wrap gap-1 mt-1'>
              {post.tags.map((tag) => (
                <Link key={tag} href={`/tag/${tag}`} className='text-decoration-none'>
                  <Badge bg='dark' className='fw-normal text-white'>
                    {tag}
                  </Badge>
                </Link>
              ))}
            </div>
          )}
          {post.excerpt !== undefined && <p className='mb-0 mt-1 text-muted small'>{post.excerpt}</p>}
        </li>
      ))}
    </ul>
  </Layout>
)

export const getStaticProps: GetStaticProps<BlogProps> = () => {
  const posts = getAllPosts()
  return { props: { posts } }
}

export default Blog
