import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/Layout'
import { getAllPosts, type PostMeta } from '../lib/posts'
import { formatDate } from '../lib/format'

interface HomeProps {
  recentPosts: PostMeta[]
}

const ZERO = 0
const LINE_HEIGHT = 1.7
const BORDER_RADIUS_MD = 6
const FONT_WEIGHT_SEMIBOLD = 600
const RECENT_POST_COUNT = 3

const Home: NextPage<HomeProps> = ({ recentPosts }) => (
  <Layout>
    <Head>
      <title>My Blog</title>
      <meta name='description' content='Welcome to My Blog' />
    </Head>

    <section style={{ marginBottom: '3rem' }}>
      <h1 style={{ marginTop: ZERO, fontSize: '2.5rem' }}>Welcome to My Blog</h1>
      <p style={{ fontSize: '1.15rem', color: '#adb5bd', lineHeight: LINE_HEIGHT }}>
        A place to share thoughts on software, technology, and everything in between. Dive into the latest posts below
        or learn more <Link href='/about'>about me</Link>.
      </p>
      <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
        <Link
          href='/blog'
          style={{
            background: '#375a7f',
            color: '#fff',
            padding: '0.6rem 1.4rem',
            borderRadius: BORDER_RADIUS_MD,
            fontWeight: FONT_WEIGHT_SEMIBOLD
          }}
        >
          Read the blog
        </Link>
        <Link
          href='/contact'
          style={{ border: '1px solid #444', padding: '0.6rem 1.4rem', borderRadius: BORDER_RADIUS_MD, color: '#fff' }}
        >
          Get in touch
        </Link>
      </div>
    </section>

    {recentPosts.length > ZERO && (
      <section>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '1.25rem' }}>Recent Posts</h2>
        <ul style={{ listStyle: 'none', padding: ZERO, margin: ZERO }}>
          {recentPosts.map((post) => (
            <li
              key={post.slug}
              style={{ marginBottom: '1.25rem', paddingBottom: '1.25rem', borderBottom: '1px solid #444' }}
            >
              <Link href={`/posts/${post.slug}`} style={{ fontWeight: FONT_WEIGHT_SEMIBOLD }}>
                {post.title}
              </Link>
              {post.date !== '' && (
                <span style={{ marginLeft: '0.75rem', fontSize: '0.85rem', color: '#888' }}>
                  {formatDate(post.date)}
                </span>
              )}
              {post.excerpt !== undefined && (
                <p style={{ margin: '0.3rem 0 0', color: '#adb5bd', fontSize: '0.95rem' }}>{post.excerpt}</p>
              )}
            </li>
          ))}
        </ul>
        <Link href='/blog' style={{ fontSize: '0.9rem' }}>
          All posts →
        </Link>
      </section>
    )}
  </Layout>
)

export const getStaticProps: GetStaticProps<HomeProps> = () => {
  const recentPosts = getAllPosts().slice(ZERO, RECENT_POST_COUNT)
  return { props: { recentPosts } }
}

export default Home
