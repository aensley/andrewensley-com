import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { Button } from 'react-bootstrap'
import Layout from '../components/Layout'
import { getAllPosts, type PostMeta } from '../lib/posts'
import { formatDate } from '../lib/format'

interface HomeProps {
  recentPosts: PostMeta[]
}

const EMPTY = 0
const RECENT_POST_COUNT = 3

const Home: NextPage<HomeProps> = ({ recentPosts }) => (
  <Layout>
    <Head>
      <title>My Blog</title>
      <meta name='description' content='Welcome to My Blog' />
    </Head>

    <section className='mb-5'>
      <h1 className='mt-0'>Welcome to My Blog</h1>
      <p className='lead text-muted'>
        A place to share thoughts on software, technology, and everything in between. Dive into the latest posts below
        or learn more <Link href='/about'>about me</Link>.
      </p>
      <div className='d-flex gap-2 mt-3'>
        <Link href='/blog' passHref legacyBehavior>
          <Button as='a' variant='primary'>
            Read the blog
          </Button>
        </Link>
        <Link href='/contact' passHref legacyBehavior>
          <Button as='a' variant='secondary'>
            Get in touch
          </Button>
        </Link>
      </div>
    </section>

    {recentPosts.length !== EMPTY && (
      <section>
        <h2 className='h5 mb-3'>Recent Posts</h2>
        <ul className='list-unstyled'>
          {recentPosts.map((post) => (
            <li key={post.slug} className='mb-3 pb-3 border-bottom'>
              <Link href={`/posts/${post.slug}`} className='fw-semibold'>
                {post.title}
              </Link>
              {post.date !== '' && <span className='ms-2 text-muted small'>{formatDate(post.date)}</span>}
              {post.excerpt !== undefined && <p className='mb-0 mt-1 text-muted small'>{post.excerpt}</p>}
            </li>
          ))}
        </ul>
        <Link href='/blog' className='small'>
          All posts →
        </Link>
      </section>
    )}
  </Layout>
)

export const getStaticProps: GetStaticProps<HomeProps> = () => {
  const recentPosts = getAllPosts().filter((_, i) => i < RECENT_POST_COUNT)
  return { props: { recentPosts } }
}

export default Home
