import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Layout from '../../components/Layout'
import { getAllTags, getPostsByTag, type PostMeta } from '../../lib/posts'
import { formatDate } from '../../lib/format'

interface TagPageProps {
  tag: string
  posts: PostMeta[]
}

const TagPage: NextPage<TagPageProps> = ({ tag, posts }) => (
  <Layout>
    <Head>
      <title>#{tag} | AndrewEnsley.com</title>
    </Head>

    <p className='text-muted small mb-0'>Tag</p>
    <h1 className='mt-0'>#{tag}</h1>

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
  const tags = getAllTags()
  return {
    paths: tags.map((tag) => ({ params: { tag } })),
    fallback: false
  }
}

export const getStaticProps: GetStaticProps<TagPageProps> = ({ params }) => {
  const tagParam = params?.tag
  if (typeof tagParam !== 'string') {
    return { notFound: true }
  }
  const posts = getPostsByTag(tagParam)
  return { props: { tag: tagParam, posts } }
}

export default TagPage
