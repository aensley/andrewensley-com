import Link from 'next/link'
import React from 'react'

interface LayoutProps {
  children: React.ReactNode
}

const MAX_WIDTH = 960
const FONT_WEIGHT_BOLD = 700

export default function Layout({ children }: LayoutProps): React.JSX.Element {
  return (
    <div style={{ background: '#222', minHeight: '100vh' }}>
      <header style={{ background: '#303030', borderBottom: '1px solid #444', padding: '0 1rem' }}>
        <div
          style={{
            maxWidth: MAX_WIDTH,
            margin: '0 auto',
            padding: '1rem 0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem'
          }}
        >
          <Link href='/' style={{ fontSize: '1.5rem', fontWeight: FONT_WEIGHT_BOLD, color: '#fff' }}>
            My Blog
          </Link>
          <nav style={{ display: 'flex', gap: '1.5rem', fontSize: '0.95rem' }}>
            <Link href='/blog' style={{ color: '#fff' }}>
              Blog
            </Link>
            <Link href='/about' style={{ color: '#fff' }}>
              About
            </Link>
            <Link href='/contact' style={{ color: '#fff' }}>
              Contact
            </Link>
          </nav>
        </div>
      </header>
      <div style={{ maxWidth: MAX_WIDTH, margin: '0 auto', padding: '2rem 1rem' }}>
        <main>{children}</main>
        <footer
          style={{
            marginTop: '4rem',
            borderTop: '1px solid #444',
            paddingTop: '1rem',
            color: '#888',
            fontSize: '0.85rem'
          }}
        >
          © {new Date().getFullYear()} My Blog
        </footer>
      </div>
    </div>
  )
}
