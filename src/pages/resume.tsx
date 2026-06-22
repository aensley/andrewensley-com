import type { NextPage } from 'next'
import Head from 'next/head'
import Layout from '../components/Layout'

const Resume: NextPage = () => (
  <Layout>
    <Head>
      <title>Résumé | AndrewEnsley.com</title>
      <meta
        name='description'
        content='Andrew Ensley - Innovative and motivated Software Engineering Leader with 18+ years of experience setting goals, measuring
          performance, and delivering ahead of schedule.'
      />
    </Head>

    <div data-pagefind-body>
      <h1 className='mt-0'>Résumé</h1>

      <h3 className='my-4'>Andrew Ensley</h3>

      <p className='lead'>
        <em>
          Innovative and motivated Software Engineering Leader with 18+ years of experience setting goals, measuring
          performance, and delivering ahead of schedule.
        </em>
      </p>

      <p className='text-muted mb-4'>Pensacola, FL, USA</p>

      <h2>Experience</h2>

      <div className='mb-4'>
        <div className='d-flex justify-content-between align-items-baseline flex-wrap bg-primary text-white p-2 rounded'>
          <h3 className='h5 mb-0'>Technology Product Manager</h3>
          <span className='text-light small'>May 2022 – Present</span>
        </div>
        <p className='text-muted mb-2'>Navy Federal Credit Union</p>
        <p>
          <span className='fw-bold'>I lead the Fraud product delivery team</span> for Navy Federal Credit Union. The
          team creates innovative solutions leveraging <span className='fw-bold'>Machine Learning and AI</span> to
          prevent application and payment fraud. The team's solutions integrate with vendor, cloud, on-prem, and
          mainframe systems.
        </p>
        <ul>
          <li>
            Achieved team ROI of <span className='fw-bold'>several million dollars monthly</span>
          </li>
          <li>Led transformation from Waterfall to Agile methodology</li>
          <li>Created regional quarterly Agile maturity metrics</li>
          <li>
            Certified{' '}
            <a href='https://www.credly.com/badges/a08d182d-ea6c-49d9-95a0-01646c86d8d1' target='_blank'>
              SAFe 6 Product Owner/Product Manager
            </a>
          </li>
          <li>
            Certified{' '}
            <a href='https://www.credly.com/badges/dc5f6edf-78e9-499a-a4f5-c551fa9c64f0' target='_blank'>
              SAFe 6 Agilist
            </a>
          </li>
        </ul>
      </div>

      <div className='mb-4'>
        <div className='d-flex justify-content-between align-items-baseline flex-wrap bg-primary text-white p-2 rounded'>
          <h3 className='h5 mb-0'>Senior Site Reliability Engineer</h3>
          <span className='text-light small'>June 2021 – May 2022</span>
        </div>
        <p className='text-muted mb-2'>Navy Federal Credit Union</p>
        <p>Implemented CI/CD, TDD, and automation for containerized applications.</p>
        <ul>
          <li>Mentored three internal program mentees</li>
          <li>Assisted in 19 interviews resulting in 6 successful hires</li>
          <li>Trained developers on Tanzu Application Service</li>
          <li>Performed emergency Log4Shell vulnerability patching</li>
          <li>Awarded Enterprise Strategy Coin for automation tool development</li>
        </ul>
      </div>

      <div className='mb-4'>
        <div className='d-flex justify-content-between align-items-baseline flex-wrap bg-primary text-white p-2 rounded'>
          <h3 className='h5 mb-0'>Senior Software Developer</h3>
          <span className='text-light small'>January 2018 – June 2021</span>
        </div>
        <p className='text-muted mb-2'>Navy Federal Credit Union</p>
        <p>
          Served as Tech Lead; led development team promoting new tools and policies across a 200-person department.
        </p>
        <ul>
          <li>Mentored seven internal program mentees</li>
          <li>Trained 550+ employees on Git/GitHub using self-created materials</li>
          <li>Wrote shared CI/CD pipeline library for CloudBees Jenkins</li>
          <li>Converted 1,400+ legacy Jenkins builds to standardized pipelines in 4 months</li>
          <li>Migrated 600+ repositories from Serena Dimensions to GitHub in 3 months</li>
          <li>Created Spring starters for Java application modernization</li>
          <li>Launched cross-departmental early adopter group</li>
          <li>Employee Voice Q4 2019 Award recipient</li>
        </ul>
      </div>

      <div className='mb-4'>
        <div className='d-flex justify-content-between align-items-baseline flex-wrap bg-primary text-white p-2 rounded'>
          <h3 className='h5 mb-0'>Chief Technology Officer</h3>
          <span className='text-light small'>May 2007 – January 2018</span>
        </div>
        <p className='text-muted mb-2'>TaskMaster Pro Technologies, Inc.</p>
        <p>
          Started as sole developer; grew to manage technical staff including developers, engineers, analysts, testers,
          administrators, and support personnel. Oversaw SDLC, compliance (SOC 1, SOC 2 Types I &amp; II), server and
          software administration, full-stack development, and database administration.
        </p>
        <ul>
          <li>Established geo-distributed database cluster for disaster recovery</li>
          <li>Engineered load-balancing systems (cloud and physical)</li>
          <li>Refactored 100,000 lines of procedural code into an OOP framework</li>
          <li>Built responsive web UI in under one month</li>
          <li>Developed primary product from inception</li>
        </ul>
      </div>

      <h2>Skills</h2>
      <ul>
        <li>MySQL</li>
        <li>JavaScript</li>
        <li>CSS</li>
        <li>HTML5</li>
        <li>CI/CD (Jenkins, CloudBees, Tanzu)</li>
        <li>Agile / SAFe</li>
        <li>Machine Learning &amp; AI product delivery</li>
        <li>Team leadership &amp; mentoring</li>
      </ul>

      <h2>Certifications</h2>
      <ul>
        <li>SAFe 6 Product Owner/Product Manager</li>
        <li>SAFe 6 Agilist</li>
      </ul>
    </div>
  </Layout>
)

export default Resume
