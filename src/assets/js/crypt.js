const liames = document.getElementsByClassName('liame')
const sqtlki = [
  'Lg',
  'aA',
  'cw',
  'QA',
  'YQ',
  'ZQ',
  'ZQ',
  'ZA',
  'ZQ',
  'eQ',
  'bA',
  'ZQ',
  'dw',
  'Yw',
  'bg',
  'cg',
  'dA',
  'bg'
]
const xucqiu = [13, 17, 9, 6, 0, 7, 11, 2, 4, 12, 10, 15, 5, 16, 8, 3, 14, 1]
const jncowu = []
const eadgwr = ['bw', 'bQ', 'bA', 'aQ', 'Og', 'YQ', 'dA']
const ichxmy = [5, 0, 3, 2, 6, 1, 4]
const oaneic = []

const getOaneicString = () => {
  let asdfoin = ''
  for (let j = 0; j < oaneic.length; j++) {
    asdfoin += window.atob(oaneic[j] + '==')
  }

  return asdfoin
}

const getLiameString = () => {
  let liame = ''
  for (let j = 0; j < jncowu.length; j++) {
    liame += window.atob(jncowu[j] + '==')
  }

  return liame
}

const openLiame = (e) => {
  e.stopPropagation()
  window.location = getOaneicString() + getLiameString()
  return false
}

export const setLiames = () => {
  for (let i = 0; i < xucqiu.length; i++) {
    jncowu[xucqiu[i]] = sqtlki[i]
  }

  for (let i = 0; i < ichxmy.length; i++) {
    oaneic[ichxmy[i]] = eadgwr[i]
  }

  for (let i = 0; i < liames.length; i++) {
    const liame = getLiameString()
    const liameLink = document.createElement('a')
    liameLink.href = ' '
    liameLink.onclick = openLiame
    for (let j = 0; j < liame.length; j++) {
      const span = document.createElement('span')
      span.className = 'yunzr'
      span.appendChild(document.createTextNode(liame[j]))
      liameLink.appendChild(span)
      if (yesOrNo()) {
        const span = document.createElement('span')
        span.className = 'yvnzr'
        span.appendChild(document.createTextNode(randomString(1)))
        liameLink.appendChild(span)
      }
    }

    liames[i].appendChild(liameLink)
  }
}

/**
 * Returns true or false based on Math.random value.
 *
 * @returns {Boolean} Randomly true or false.
 */
const yesOrNo = () => {
  return !!(Math.floor(Math.random() * 100) % 2)
}

/**
 * Returns a random string of the given length.
 *
 * @param {Number} len The length of the string to return.
 * @returns {String} The random string.
 */
const randomString = (len) => {
  const allCapsAlpha = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ']
  const allLowerAlpha = [...'abcdefghijklmnopqrstuvwxyz']
  const allNumbers = [...'0123456789']
  const characterBase = [...allCapsAlpha, ...allNumbers, ...allLowerAlpha]
  return [...Array(len)].map((i) => characterBase[(Math.random() * characterBase.length) | 0]).join('')
}
