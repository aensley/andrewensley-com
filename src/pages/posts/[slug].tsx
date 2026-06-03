import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { MDXRemote, type MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import Layout from '../../components/Layout'
import { getAllPosts, getPostBySlug, type PostMeta } from '../../lib/posts'
import { formatDate } from '../../lib/format'

interface PostPageProps {
  meta: PostMeta
  source: MDXRemoteSerializeResult
}

const ZERO = 0
const BORDER_RADIUS_SM = 4

const PostPage: NextPage<PostPageProps> = ({ meta, source }) => (
  <Layout>
    <Head>
      <title>{meta.title}</title>
      {meta.excerpt !== undefined && <meta name='description' content={meta.excerpt} />}
    </Head>

    <article>
      <header style={{ marginBottom: '2rem' }}>
        <h1 style={{ marginTop: ZERO }}>{meta.title}</h1>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.5rem',
            alignItems: 'center',
            fontSize: '0.85rem',
            color: '#888'
          }}
        >
          {meta.date !== '' && <span>{formatDate(meta.date)}</span>}
          {meta.category !== undefined && (
            <>
              {meta.date !== '' && <span>·</span>}
              <Link href={`/categories/${meta.category}`}>{meta.category}</Link>
            </>
          )}
        </div>
        {meta.tags.length > ZERO && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '0.5rem' }}>
            {meta.tags.map((tag) => (
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
      </header>

      <MDXRemote {...source} />
    </article>
  </Layout>
)

export const getStaticPaths: GetStaticPaths = () => {
  const posts = getAllPosts()
  return {
    paths: posts.map((p) => ({ params: { slug: p.slug } })),
    fallback: false
  }
}

export const getStaticProps: GetStaticProps<PostPageProps> = async ({ params }) => {
  const slugParam = params?.slug
  if (typeof slugParam !== 'string') {
    return { notFound: true }
  }
  const post = getPostBySlug(slugParam)
  const source = await serialize(post.content, {
    mdxOptions: { remarkPlugins: [remarkGfm], rehypePlugins: [rehypeHighlight] }
  })

  return {
    props: {
      meta: {
        slug: post.slug,
        title: post.title,
        date: post.date,
        excerpt: post.excerpt,
        category: post.category,
        tags: post.tags
      },
      source
    }
  }
}

export default PostPage
