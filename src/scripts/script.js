var form = document.getElementById("registration-form")
var registration_name = document.getElementById("name")
var venue_name = document.getElementById("venue-name")
var venue_city = document.getElementById("venue-city")
var state_city = document.getElementById("state-city")
var email = document.getElementById("email")
var subject = document.getElementById("subject")
var message = document.getElementById("message")

let cookieNotification = document.getElementById('cookie')
let cookie_button = document.getElementById('cookie__button')

const fields = [registration_name, venue_name, venue_city, state_city, email, subject, message]

const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu

form.addEventListener("submit", (e) => {
  e.preventDefault()
  let canSubmit = true

  fields.forEach(element => {
    if (element.value === '') {
      canSubmit = false
      element.classList.add("error")
    }
    else if (element.id === 'email' && !isEmailValid(element.value)) {
      canSubmit = false
      element.classList.add("error")
    } else {
      element.classList.remove("error")
    }
  })
  if (canSubmit) {
    fields.forEach(element => {
      element.value = ''
    })
  }
}
)

function isEmailValid(value) {
  return EMAIL_REGEXP.test(value)
}

for (let field of fields) {
  field.addEventListener('input', (e) => {
    field.classList.remove('error')
  })
}

function checkCookies() {
  cookieNotification.classList.add('show')

  cookie_button.addEventListener('click', function () {
    cookieNotification.classList.add('hide')
    setTimeout(() => { cookieNotification.classList.remove('show') }, 1000)
  })
}
checkCookies()