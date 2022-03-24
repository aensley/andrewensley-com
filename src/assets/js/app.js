/* global PureCounter */

import { setLiames, setEnohps } from './crypt.js'

window.addEventListener('load', () => {
  setLiames()
  setEnohps()
  const pluralsightIcon = document.getElementById('pluralsightIcon')
  if (pluralsightIcon) {
    pluralsightIcon.addEventListener('mouseover', (e) => {
      pluralsightIcon.setAttribute('src', 'assets/img/pluralsight-930000.svg')
    })
    pluralsightIcon.addEventListener('mouseout', (e) => {
      pluralsightIcon.setAttribute('src', 'assets/img/pluralsight-45505b.svg')
    })
  }

  const garminConnectIcon = document.getElementById('garminConnectIcon')
  if (garminConnectIcon) {
    garminConnectIcon.addEventListener('mouseover', (e) => {
      garminConnectIcon.setAttribute('src', 'assets/img/garmin-circle-930000.png')
    })
    garminConnectIcon.addEventListener('mouseout', (e) => {
      garminConnectIcon.setAttribute('src', 'assets/img/garmin-circle-45505b.png')
    })
  }

  new PureCounter() // eslint-disable-line no-new
})
