import dynamic from 'next/dynamic'
import React, { useState } from 'react'
import { Modal, Nav } from 'react-bootstrap'

const SearchWidget = dynamic(async () => await import('./SearchWidget'), { ssr: false })

const SearchIcon = (): React.JSX.Element => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='16'
    height='16'
    fill='currentColor'
    viewBox='0 0 16 16'
    aria-hidden='true'
  >
    <path d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.099zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z' />
  </svg>
)

export default function SearchButton(): React.JSX.Element {
  const [show, setShow] = useState(false)

  return (
    <>
      <Nav.Link
        as='button'
        type='button'
        onClick={() => {
          setShow(true)
        }}
        className='px-2'
        aria-label='Open search'
      >
        <SearchIcon />
      </Nav.Link>

      <Modal
        show={show}
        onHide={() => {
          setShow(false)
        }}
        size='lg'
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Search</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <SearchWidget />
        </Modal.Body>
      </Modal>
    </>
  )
}
