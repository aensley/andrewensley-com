import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Layout from '../../components/Layout'
import { getAllTags, getPostsByTag, type PostMeta } from '../../lib/posts'

interface TagPageProps {
  tag: string
  posts: PostMeta[]
}

const ZERO = 0
const FONT_WEIGHT_SEMIBOLD = 600

const TagPage: NextPage<TagPageProps> = ({ tag, posts }) => (
  <Layout>
    <Head>
      <title>#{tag} — My Blog</title>
    </Head>

    <p style={{ color: '#888', fontSize: '0.85rem', margin: ZERO }}>Tag</p>
    <h1 style={{ marginTop: ZERO }}>#{tag}</h1>

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
