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

const submitForm = async function (thisForm, action, formData) {
  const response = await fetch(action, {
    method: 'POST',
    body: formData
  }).catch((error) => {
    displayError(thisForm, error)
  })

  switch (response.status) {
    case 200:
      thisForm.querySelector('.loading').classList.remove('d-block')
      thisForm.querySelector('.sent-message').classList.add('d-block')
      thisForm.reset()
      break
    case 400:
      displayError(thisForm, 'Bad request. Please update your inputs and try again.')
      break
    case 500:
      displayError(
        thisForm,
        `A server side error has occurred: ${response.status} ${response.statusText} ${await response.text()}`
      )
      break
    default:
      displayError(thisForm, `${response.status} ${response.statusText} ${await response.text()}`)
      break
  }
}

const displayError = function (thisForm, error) {
  thisForm.querySelector('.loading').classList.remove('d-block')
  thisForm.querySelector('.error-message').innerHTML = error
  thisForm.querySelector('.error-message').classList.add('d-block')
}
