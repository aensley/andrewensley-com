import PureCounter from '@srexi/purecounterjs'
import AOS from 'aos'
import Typed from 'typed.js'
import { setLiames } from './crypt.js'
import { setupContactForm } from './form.js'
require('./fontawesome')
require('../../../node_modules/waypoints/lib/noframework.waypoints')

window.addEventListener('load', () => {
  setLiames()
  new PureCounter() // eslint-disable-line no-new
  setupContactForm()

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    const selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach((e) => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  const navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    const position = window.scrollY + 200
    navbarlinks.forEach((navbarlink) => {
      if (!navbarlink.hash) return
      const section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= section.offsetTop + section.offsetHeight) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  navbarlinksActive()
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    const elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos,
      behavior: 'smooth'
    })
  }

  /**
   * Back to top button
   */
  const backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    toggleBacktotop()
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function (e) {
    select('body').classList.toggle('mobile-nav-active')
    this.children[0].classList.toggle('fa-bars')
    this.children[0].classList.toggle('fa-times')
  })

  /**
   * Scroll with offset on links with a class name .scrollto
   */
  on(
    'click',
    '.scrollto',
    function (e) {
      if (select(this.hash)) {
        e.preventDefault()

        const body = select('body')
        if (body.classList.contains('mobile-nav-active')) {
          body.classList.remove('mobile-nav-active')
          const navbarToggle = select('.mobile-nav-toggle')
          navbarToggle.children[0].classList.toggle('fa-bars')
          navbarToggle.children[0].classList.toggle('fa-times')
        }
        scrollto(this.hash)
      }
    },
    true
  )

  /**
   * Scroll with offset on page load with hash links in the url
   */
  if (window.location.hash) {
    if (select(window.location.hash)) {
      scrollto(window.location.hash)
    }
  }

  /**
   * Preloader
   */
  const preloader = select('#preloader')
  if (preloader) {
    preloader.remove()
  }

  /**
   * Hero type effect
   */
  const typed = select('.typed')
  if (typed) {
    let typedStrings = typed.getAttribute('data-typed-items')
    typedStrings = typedStrings.split(',')
    /* eslint-disable no-new */
    new Typed('.typed', {
      strings: typedStrings,
      loop: true,
      typeSpeed: 75,
      backSpeed: 50,
      backDelay: 2000
    })
    /* eslint-enable no-new */
  }

  /**
   * Skills animation
   */
  const skillsContent = select('.skills-content')
  if (skillsContent) {
    /* eslint-disable no-new */
    new Waypoint({
      element: skillsContent,
      offset: '80%',
      handler: function (direction) {
        const progress = select('.progress .progress-bar', true)
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        })
      }
    })
    /* eslint-enable no-new */
  }

  /**
   * Animation on scroll
   */
  AOS.init({
    duration: 1000,
    easing: 'ease-in-out',
    once: true,
    mirror: false
  })
})
