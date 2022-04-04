/* global PureCounter */

import { setLiames, setEnohps } from './crypt.js'
import { setupContactForm } from './form.js'

window.addEventListener('load', () => {
  setLiames()
  setEnohps()
  new PureCounter() // eslint-disable-line no-new
  setupContactForm()
})
