import type { NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import Layout from '../components/Layout'

const Contact: NextPage = () => {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitted(true)
  }

  const fieldStyle: React.CSSProperties = {
    display: 'block',
    width: '100%',
    padding: '0.5rem 0.75rem',
    fontSize: '1rem',
    border: '1px solid #444',
    borderRadius: 4,
    fontFamily: 'inherit',
    boxSizing: 'border-box',
    background: '#303030',
    color: '#fff'
  }

  return (
    <Layout>
      <Head>
        <title>Contact – My Blog</title>
        <meta name='description' content='Get in touch' />
      </Head>

      <h1 style={{ marginTop: 0 }}>Contact</h1>
      <p style={{ color: '#adb5bd' }}>Have a question or just want to say hello? Fill out the form below.</p>

      {submitted
        ? (
          <p style={{ color: '#00bc8c', fontWeight: 600 }}>Thanks for reaching out — I'll get back to you soon!</p>
          )
        : (
          <form
            onSubmit={handleSubmit}
            style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', maxWidth: 480 }}
          >
            <label
              style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.9rem', fontWeight: 600 }}
            >
              Name
              <input type='text' name='name' required style={fieldStyle} />
            </label>

            <label
              style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.9rem', fontWeight: 600 }}
            >
              Email
              <input type='email' name='email' required style={fieldStyle} />
            </label>

            <label
              style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.9rem', fontWeight: 600 }}
            >
              Message
              <textarea name='message' required rows={5} style={fieldStyle} />
            </label>

            <button
              type='submit'
              style={{
                alignSelf: 'flex-start',
                background: '#375a7f',
                color: '#fff',
                border: 'none',
                padding: '0.6rem 1.4rem',
                borderRadius: 6,
                fontSize: '1rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Send message
            </button>
          </form>
          )}
    </Layout>
  )
}

export default Contact
