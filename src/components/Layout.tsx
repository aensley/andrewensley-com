import Link from 'next/link'
import React from 'react'
import { Col, Container, Nav, Navbar, Row } from 'react-bootstrap'
import SearchButton from './SearchButton'
import ThemeToggle from './ThemeToggle'

interface LayoutProps {
  children: React.ReactNode
}

const MINWIDTH_ZERO = 0

export default function Layout({ children }: LayoutProps): React.JSX.Element {
  return (
    <>
      <Navbar bg='primary' variant='dark' expand='md'>
        <Container>
          <Row className='justify-content-center w-100'>
            <Col xs={12} lg={8} className='d-flex align-items-center flex-wrap'>
              <Navbar.Brand as={Link} href='/' className='d-flex align-items-center gap-2'>
                <img src='/icon.svg' alt='AndrewEnsley.com' className='navbar-brand-icon' />
              </Navbar.Brand>
              <Navbar.Toggle aria-controls='main-nav' />
              <Navbar.Collapse id='main-nav'>
                <Nav className='ms-auto align-items-center'>
                  <Nav.Link as={Link} href='/blog'>
                    Blog
                  </Nav.Link>
                  <Nav.Link as={Link} href='/about'>
                    About
                  </Nav.Link>
                  <Nav.Link as={Link} href='/contact'>
                    Contact
                  </Nav.Link>
                  <SearchButton />
                  <ThemeToggle />
                </Nav>
              </Navbar.Collapse>
            </Col>
          </Row>
        </Container>
      </Navbar>
      <Container className='py-4'>
        <Row className='justify-content-center'>
          <Col xs={12} lg={8} style={{ minWidth: MINWIDTH_ZERO }}>
            <main>{children}</main>
            <footer className='mt-5 pt-3 border-top text-muted small'>
              © {new Date().getFullYear()} Andrew Ensley
            </footer>
          </Col>
        </Row>
      </Container>
    </>
  )
}
