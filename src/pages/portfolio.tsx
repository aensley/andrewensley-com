import type { NextPage } from 'next'
import Head from 'next/head'
import { Badge, Card, Col, Row } from 'react-bootstrap'
import Layout from '../components/Layout'

interface Project {
  name: string
  description: string
  language: string
  languageColor: string
  stars: number
  topics: string[]
  url: string
  homepage: string
}

const LANG_DOT_SIZE = 12
const ZERO_STARS = 0

/* eslint-disable @typescript-eslint/no-magic-numbers -- star counts are raw data values */
const PROJECTS: Project[] = [
  {
    name: 'semantic-release-openapi',
    description: 'A Semantic Release plugin to update versions in OpenAPI / Swagger specification files',
    language: 'TypeScript',
    languageColor: '#3178c6',
    stars: 3,
    topics: ['openapi', 'semantic-release', 'swagger'],
    url: 'https://github.com/aensley/semantic-release-openapi',
    homepage: 'https://npmjs.com/package/semantic-release-openapi'
  },
  {
    name: 'liturgy-day',
    description: 'A REST API for Liturgical queries',
    language: 'TypeScript',
    languageColor: '#3178c6',
    stars: 7,
    topics: ['api', 'rest-api', 'catholic', 'liturgy', 'openapi'],
    url: 'https://github.com/aensley/liturgy-day',
    homepage: 'https://liturgy.day'
  },
  {
    name: 'rosary-art',
    description: 'A simple aid for praying the rosary',
    language: 'JavaScript',
    languageColor: '#f1e05a',
    stars: 0,
    topics: ['catholic', 'prayer', 'rosary', 'art'],
    url: 'https://github.com/aensley/rosary-art',
    homepage: 'https://rosary.art'
  },
  {
    name: 'bus',
    description: 'Basic URL Shortener for Cloudflare Pages',
    language: 'TypeScript',
    languageColor: '#3178c6',
    stars: 2,
    topics: ['url-shortener'],
    url: 'https://github.com/aensley/bus',
    homepage: 'https://ensl.ee/bus'
  },
  {
    name: 'backdrop',
    description: 'Set a new desktop wallpaper every day from various sources',
    language: 'Shell',
    languageColor: '#89e051',
    stars: 0,
    topics: ['wallpaper', 'linux', 'bash', 'gnome', 'kde'],
    url: 'https://github.com/aensley/backdrop',
    homepage: ''
  },
  {
    name: 'UbuntuScripts',
    description: 'Scripts I use on Ubuntu / Debian systems',
    language: 'Shell',
    languageColor: '#89e051',
    stars: 3,
    topics: ['bash', 'ubuntu', 'debian', 'scripts'],
    url: 'https://github.com/aensley/UbuntuScripts',
    homepage: 'https://aensley.github.io/UbuntuScripts/'
  },
  {
    name: 'media-organizer',
    description: 'Organize images and videos (or any files) into date-based folders',
    language: 'PHP',
    languageColor: '#4F5D95',
    stars: 2,
    topics: ['media', 'organization', 'exif', 'image', 'video'],
    url: 'https://github.com/aensley/media-organizer',
    homepage: 'https://packagist.org/packages/aensley/media-organizer'
  },
  {
    name: 'file',
    description: 'PHP File Manipulation Utilities',
    language: 'PHP',
    languageColor: '#4F5D95',
    stars: 2,
    topics: ['filesystem', 'utility', 'directories'],
    url: 'https://github.com/aensley/file',
    homepage: 'https://packagist.org/packages/aensley/file'
  }
]
/* eslint-enable @typescript-eslint/no-magic-numbers */

const Portfolio: NextPage = () => (
  <Layout>
    <Head>
      <title>Portfolio | AndrewEnsley.com</title>
      <meta name='description' content='Andrew Ensley - Open-source projects and GitHub repositories.' />
    </Head>
    <div data-pagefind-body>
      <h1 className='mt-0'>Portfolio</h1>
      <p className='lead text-muted mb-4'>A selection of my open-source projects.</p>
      <Row xs={1} md={2} className='g-4'>
        {PROJECTS.map((project) => (
          <Col key={project.name}>
            <Card className='h-100'>
              <Card.Body className='d-flex flex-column'>
                <Card.Title className='mb-1'>
                  <a href={project.url} target='_blank' rel='noreferrer' className='text-decoration-none'>
                    {project.name}
                  </a>
                </Card.Title>
                <Card.Text className='text-muted mb-2 flex-grow-1'>{project.description}</Card.Text>
                <div className='d-flex flex-wrap gap-1 mt-auto pt-2'>
                  {project.topics.map((topic) => (
                    <Badge key={topic} pill bg='dark' className='fw-normal text-white'>
                      {topic}
                    </Badge>
                  ))}
                </div>
              </Card.Body>
              <Card.Footer className='d-flex justify-content-between align-items-center small text-muted'>
                <div className='d-flex align-items-center gap-3'>
                  <span className='d-flex align-items-center gap-1'>
                    <span
                      className='rounded-circle d-inline-block'
                      style={{ width: LANG_DOT_SIZE, height: LANG_DOT_SIZE, backgroundColor: project.languageColor }}
                    />
                    {project.language}
                  </span>
                  {project.stars > ZERO_STARS && <span>★ {project.stars}</span>}
                </div>
                {project.homepage !== '' && (
                  <a href={project.homepage} target='_blank' rel='noreferrer' className='text-decoration-none'>
                    Website ↗
                  </a>
                )}
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  </Layout>
)

export default Portfolio
