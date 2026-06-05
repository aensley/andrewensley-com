import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
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
      <title>AndrewEnsley.com</title>
      <meta name='description' content='Welcome to AndrewEnsley.com' />
    </Head>

    <section className='mb-5'>
      <h1 className='mt-0'>Welcome to AndrewEnsley.com</h1>
      <p className='lead text-muted'>
        A place to share thoughts on software, technology, and everything in between. Dive into the latest posts below
        or learn more <Link href='/about'>about me</Link>.
      </p>
      <div className='d-flex gap-2 mt-3'>
        <Link href='/blog' className='btn btn-primary'>
          Read the blog
        </Link>
        <Link href='/contact' className='btn btn-secondary'>
          Get in touch
        </Link>
      </div>
    </section>

    {recentPosts.length !== EMPTY && (
      <section>
        <h2 className='h5 mb-3'>Recent Posts</h2>
        <ul className='list-unstyled'>
          {recentPosts.map((post) => (
            <li key={post.slug} className='mb-3 pb-3 border-bottom'>
              <Link href={`/post/${post.slug}`} className='fw-semibold'>
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
