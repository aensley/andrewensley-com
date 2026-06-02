import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { MDXRemote, type MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import Layout from '../../components/Layout'
import { getAllPosts, getPostBySlug, type PostMeta } from '../../lib/posts'

interface PostPageProps {
  meta: PostMeta
  source: MDXRemoteSerializeResult
}

const PostPage: NextPage<PostPageProps> = ({ meta, source }) => {
  return (
    <Layout>
      <Head>
        <title>{meta.title}</title>
        {meta.excerpt && <meta name='description' content={meta.excerpt} />}
      </Head>

      <article>
        <header style={{ marginBottom: '2rem' }}>
          <h1 style={{ marginTop: 0 }}>{meta.title}</h1>
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
            {meta.date && <span>{meta.date}</span>}
            {meta.category && (
              <>
                {meta.date && <span>·</span>}
                <Link href={`/categories/${meta.category}`}>{meta.category}</Link>
              </>
            )}
          </div>
          {meta.tags.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '0.5rem' }}>
              {meta.tags.map((tag) => (
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
        </header>

        <MDXRemote {...source} />
      </article>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = getAllPosts()
  return {
    paths: posts.map((p) => ({ params: { slug: p.slug } })),
    fallback: false
  }
}

export const getStaticProps: GetStaticProps<PostPageProps> = async ({ params }) => {
  const slug = params?.slug as string
  const post = getPostBySlug(slug)
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
