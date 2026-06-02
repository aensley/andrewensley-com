import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/Layout'
import { getAllPosts, type PostMeta } from '../lib/posts'

interface BlogProps {
  posts: PostMeta[]
}

const ZERO = 0
const FONT_WEIGHT_SEMIBOLD = 600
const BORDER_RADIUS_SM = 4

const Blog: NextPage<BlogProps> = ({ posts }) => (
  <Layout>
    <Head>
      <title>Blog – My Blog</title>
      <meta name='description' content='All posts' />
    </Head>

    <h1 style={{ marginTop: ZERO }}>Blog</h1>

    {posts.length === ZERO && <p>No posts yet.</p>}

    <ul style={{ listStyle: 'none', padding: ZERO, margin: ZERO }}>
      {posts.map((post) => (
        <li key={post.slug} style={{ marginBottom: '2rem' }}>
          <Link href={`/posts/${post.slug}`} style={{ fontSize: '1.25rem', fontWeight: FONT_WEIGHT_SEMIBOLD }}>
            {post.title}
          </Link>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.5rem',
              alignItems: 'center',
              fontSize: '0.85rem',
              color: '#888',
              marginTop: '0.25rem'
            }}
          >
            {post.date !== '' && <span>{post.date}</span>}
            {post.category !== undefined && (
              <>
                {post.date !== '' && <span>·</span>}
                <Link href={`/categories/${post.category}`}>{post.category}</Link>
              </>
            )}
          </div>
          {post.tags.length > ZERO && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '0.4rem' }}>
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/tags/${tag}`}
                  style={{
                    background: '#303030',
                    border: '1px solid #444',
                    borderRadius: BORDER_RADIUS_SM,
                    padding: '0.1rem 0.5rem',
                    fontSize: '0.8rem',
                    color: '#adb5bd'
                  }}
                >
                  {tag}
                </Link>
              ))}
            </div>
          )}
          {post.excerpt !== undefined && <p style={{ margin: '0.5rem 0 0', color: '#adb5bd' }}>{post.excerpt}</p>}
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
