import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Layout from '../../components/Layout'
import { getAllTags, getPostsByTag, type PostMeta } from '../../lib/posts'

interface TagPageProps {
  tag: string
  posts: PostMeta[]
}

const TagPage: NextPage<TagPageProps> = ({ tag, posts }) => {
  return (
    <Layout>
      <Head>
        <title>#{tag} — My Blog</title>
      </Head>

      <p style={{ color: '#888', fontSize: '0.85rem', margin: '0 0 0.25rem' }}>Tag</p>
      <h1 style={{ marginTop: 0 }}>#{tag}</h1>

      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {posts.map((post) => (
          <li key={post.slug} style={{ marginBottom: '1.5rem' }}>
            <Link href={`/posts/${post.slug}`} style={{ fontSize: '1.1rem', fontWeight: 600 }}>
              {post.title}
            </Link>
            {post.date && <p style={{ margin: '0.2rem 0 0', color: '#888', fontSize: '0.85rem' }}>{post.date}</p>}
            {post.excerpt && <p style={{ margin: '0.4rem 0 0' }}>{post.excerpt}</p>}
          </li>
        ))}
      </ul>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const tags = getAllTags()
  return {
    paths: tags.map((tag) => ({ params: { tag } })),
    fallback: false
  }
}

export const getStaticProps: GetStaticProps<TagPageProps> = async ({ params }) => {
  const tag = params?.tag as string
  const posts = getPostsByTag(tag)
  return { props: { tag, posts } }
}

export default TagPage
