/* global FormData, fetch */

export const setupContactForm = function () {
  document.querySelectorAll('.contact-form').forEach(function (el) {
    el.addEventListener('submit', function (e) {
      e.preventDefault()
      const thisForm = this
      const action = thisForm.getAttribute('action')
      if (!action) {
        displayError(thisForm, 'The form action property is not set!')
        return
      }

      thisForm.querySelector('.loading').classList.add('d-block')
      thisForm.querySelector('.error-message').classList.remove('d-block')
      thisForm.querySelector('.sent-message').classList.remove('d-block')

      const formData = new FormData(thisForm)
      submitForm(thisForm, action, formData)
    })
  })
}

const submitForm = function (thisForm, action, formData) {
  fetch(action, {
    method: 'POST',
    body: formData,
    headers: { 'X-Requested-With': 'XMLHttpRequest' }
  })
    .then((response) => {
      if (response.ok) {
        return response.text()
      } else {
        throw new Error(`${response.status} ${response.statusText} ${response.url}`)
      }
    })
    .then((data) => {
      thisForm.querySelector('.loading').classList.remove('d-block')
      if (data.trim() === 'OK') {
        thisForm.querySelector('.sent-message').classList.add('d-block')
        thisForm.reset()
      } else {
        throw new Error(data || 'Form submission failed and no error message returned from: ' + action)
      }
    })
    .catch((error) => {
      displayError(thisForm, error)
    })
}

const displayError = function (thisForm, error) {
  thisForm.querySelector('.loading').classList.remove('d-block')
  thisForm.querySelector('.error-message').innerHTML = error
  thisForm.querySelector('.error-message').classList.add('d-block')
}
