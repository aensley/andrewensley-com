import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/Layout'

const About: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>About – My Blog</title>
        <meta name='description' content='About this blog and its author' />
      </Head>

      <h1 style={{ marginTop: 0 }}>About</h1>

      <p>
        Hi, I'm the author of this blog. I write about software development, technology, and whatever else catches my
        interest.
      </p>

      <p>
        This site is built with{' '}
        <a href='https://nextjs.org' target='_blank' rel='noopener noreferrer'>
          Next.js
        </a>{' '}
        and content is written in MDX, making it easy to mix markdown prose with React components.
      </p>

      <h2>What you'll find here</h2>
      <ul>
        <li>Technical deep-dives and tutorials</li>
        <li>Notes on tools and workflows</li>
        <li>Opinions on software and the industry</li>
      </ul>

      <p>
        Have a question or want to collaborate? <Link href='/contact'>Get in touch</Link>.
      </p>
    </Layout>
  )
}

export default About
