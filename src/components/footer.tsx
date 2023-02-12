import { SITE_TAG_LINE } from '../lib/constants'
import Container from './container'
import { FaGithub } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="bg-neutral-50 border-t border-neutral-200">
      <Container>
        <div className="py-28 flex flex-col lg:flex-row items-center">
          <h3 className="text-4xl lg:text-[2.5rem] font-bold tracking-tighter leading-tight text-center lg:text-left mb-10 lg:mb-0 lg:pr-4 lg:w-1/2">
            {SITE_TAG_LINE}
          </h3>
          <div className="flex flex-col lg:flex-row justify-center items-center lg:pl-4 lg:w-1/2">
            <a href={`https://github.com/aensley`} className="mx-3 font-bold hover:underline">
              <FaGithub className="fa-fw inline-block" /> GitHub
            </a>
          </div>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
