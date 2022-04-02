/* global FormData, fetch */

export const setupContactForm = function () {
  document.querySelectorAll('.contact-form').forEach(function (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault()
      form.querySelector('.loading').classList.add('d-block')
      form.querySelector('.error-message').classList.remove('d-block')
      form.querySelector('.sent-message').classList.remove('d-block')
      submitForm(form, form.getAttribute('action'), new FormData(form))
    })
  })
}

const submitForm = function (thisForm, action, formData) {
  fetch(action, {
    method: 'POST',
    body: formData
  })
    .then((response) => {
      if (response.ok) {
        return response.text()
      } else {
        throw new Error(`${response.status} ${response.statusText} ${response.text() || ''}`)
      }
    })
    .then((data) => {
      thisForm.querySelector('.loading').classList.remove('d-block')
      thisForm.querySelector('.sent-message').classList.add('d-block')
      thisForm.reset()
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
