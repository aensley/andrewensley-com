import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { MDXRemote, type MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import { Badge } from 'react-bootstrap'
import Layout from '../../components/Layout'
import { getAllPosts, getPostBySlug, type PostMeta } from '../../lib/posts'
import { formatDate } from '../../lib/format'

interface PostPageProps {
  meta: PostMeta
  source: MDXRemoteSerializeResult
}

const EMPTY = 0

const PostPage: NextPage<PostPageProps> = ({ meta, source }) => (
  <Layout>
    <Head>
      <title>{meta.title} | AndrewEnsley.com</title>
      {meta.excerpt !== undefined && <meta name='description' content={meta.excerpt} />}
      {meta.featuredImage !== undefined && <meta property='og:image' content={meta.featuredImage} />}
    </Head>

    <article>
      <header className='mb-4'>
        <h1 className='mt-0'>{meta.title}</h1>
        <div className='d-flex flex-wrap gap-2 align-items-center text-muted small'>
          {meta.date !== '' && <span>{formatDate(meta.date)}</span>}
          {meta.category !== undefined && (
            <>
              {meta.date !== '' && <span>·</span>}
              <Link href={`/category/${meta.category}`}>{meta.category}</Link>
            </>
          )}
        </div>
        {meta.tags.length !== EMPTY && (
          <div className='d-flex flex-wrap gap-1 mt-2'>
            {meta.tags.map((tag) => (
              <Link key={tag} href={`/tag/${tag}`} className='text-decoration-none'>
                <Badge bg='secondary' className='fw-normal'>
                  {tag}
                </Badge>
              </Link>
            ))}
          </div>
        )}
        {meta.featuredImage !== undefined && (
          // featuredImage is a URL string with unknown dimensions, so next/image cannot be used without additional complexity
          <img
            src={meta.featuredImage}
            alt={meta.title}
            className='img-fluid rounded mt-4 w-100'
            style={{ objectFit: 'cover', maxHeight: '400px' }}
          />
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
        tags: post.tags,
        ...(post.featuredImage !== undefined && { featuredImage: post.featuredImage })
      },
      source
    }
  }
}

export default PostPage
