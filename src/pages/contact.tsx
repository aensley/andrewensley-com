import type { NextPage } from 'next'
import Head from 'next/head'
import type { SyntheticEvent } from 'react'
import { useState } from 'react'
import { Alert, Button, Col, Form, Row } from 'react-bootstrap'
import Layout from '../components/Layout'

const Contact: NextPage = () => {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: SyntheticEvent<HTMLFormElement>): void {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <Layout>
      <Head>
        <title>Contact | AndrewEnsley.com</title>
        <meta name='description' content='Get in touch' />
      </Head>

      <h1 className='mt-0'>Contact</h1>
      <p className='text-muted'>Have a question or just want to say hello? Fill out the form below.</p>

      {submitted ? (
        <Alert variant='success'>Thanks for reaching out — I'll get back to you soon!</Alert>
      ) : (
        <Row>
          <Col md={6}>
            <Form onSubmit={handleSubmit}>
              <Form.Group className='mb-3' controlId='contactName'>
                <Form.Label>Name</Form.Label>
                <Form.Control type='text' name='name' required />
              </Form.Group>

              <Form.Group className='mb-3' controlId='contactEmail'>
                <Form.Label>Email</Form.Label>
                <Form.Control type='email' name='email' required />
              </Form.Group>

              <Form.Group className='mb-3' controlId='contactMessage'>
                <Form.Label>Message</Form.Label>
                <Form.Control as='textarea' name='message' required rows={5} />
              </Form.Group>

              <Button type='submit' variant='primary'>
                Send message
              </Button>
            </Form>
          </Col>
        </Row>
      )}
    </Layout>
  )
}

export default Contact
