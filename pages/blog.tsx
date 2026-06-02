import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/Layout'
import { getAllPosts, type PostMeta } from '../lib/posts'

interface BlogProps {
  posts: PostMeta[]
}

const Blog: NextPage<BlogProps> = ({ posts }) => {
  return (
    <Layout>
      <Head>
        <title>Blog – My Blog</title>
        <meta name='description' content='All posts' />
      </Head>

      <h1 style={{ marginTop: 0 }}>Blog</h1>

      {posts.length === 0 && <p>No posts yet.</p>}

      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {posts.map((post) => (
          <li key={post.slug} style={{ marginBottom: '2rem' }}>
            <Link href={`/posts/${post.slug}`} style={{ fontSize: '1.25rem', fontWeight: 600 }}>
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
              {post.date && <span>{post.date}</span>}
              {post.category && (
                <>
                  {post.date && <span>·</span>}
                  <Link href={`/categories/${post.category}`}>{post.category}</Link>
                </>
              )}
            </div>
            {post.tags.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '0.4rem' }}>
                {post.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/tags/${tag}`}
                    style={{
                      background: '#303030',
                      border: '1px solid #444',
                      borderRadius: 4,
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
            {post.excerpt && <p style={{ margin: '0.5rem 0 0', color: '#adb5bd' }}>{post.excerpt}</p>}
          </li>
        ))}
      </ul>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps<BlogProps> = async () => {
  const posts = getAllPosts()
  return { props: { posts } }
}

export default Blog
