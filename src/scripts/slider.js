var slider = document.getElementById('sliders')
var prevButton = document.getElementById('prev')
var nextButton = document.getElementById('next')
var circles = document.getElementById('circles')

const number_of_pictures = slider.getElementsByTagName('*').length
var images = slider.querySelectorAll('img')
let current
let current_img
let cirs = []

const createCircles = () => {
  for (let i = 0; i < number_of_pictures; i++) {
    const circle = document.createElement('div')
    circle.classList.add('circle')
    circles.appendChild(circle)
    cirs.push(circle)
  }
}

createCircles()

const setFirstElement = () => {
  current = 0
  current_img = images[0]
  current_img.classList.add('show')
  var cir = cirs[0]
  cir.classList.add('active')
  for (let i = 1; i < number_of_pictures; i++) {
    images[i].classList.add('invisible')
  }
}

setFirstElement()
prevButton.addEventListener('click', () => {
  if (prevButton.getAttribute('disabled') === null) {
    prevButton.setAttribute("disabled", 'disabled')
    nextButton.setAttribute("disabled", 'disabled')
    let following_img
    cirs[current].classList.remove('active')
    if (current === 0) {
      following_img = images[number_of_pictures - 1]
      current = number_of_pictures - 1
    }
    else {
      following_img = images[current - 1]
      current = current - 1
    }
    following_img.classList.remove('invisible')
    following_img.classList.add('show')
    current_img.classList.add('swipe__left__current')
    following_img.classList.add('swipe__left__following')
    setTimeout(() => {
      current_img.classList.add('invisible')
      current_img.classList.remove('show')
      current_img.classList.remove('swipe__left__current')
      following_img.classList.remove('swipe__left__following')
      current_img = following_img
      cirs[current].classList.add('active')
      prevButton.removeAttribute('disabled')
      nextButton.removeAttribute('disabled')
    }, 950)
  }
})

nextButton.addEventListener('click', () => {
  if (nextButton.getAttribute('disabled') === null) {
    prevButton.setAttribute("disabled", 'disabled')
    nextButton.setAttribute("disabled", 'disabled')
    let following_img
    cirs[current].classList.remove('active')
    if (current === number_of_pictures - 1) {
      following_img = images[0]
      current = 0
    }
    else {
      following_img = images[current + 1]
      current = current + 1
    }
    following_img.classList.remove('invisible')
    following_img.classList.add('show')
    current_img.classList.add('swipe__right__current')
    following_img.classList.add('swipe__right__following')
    setTimeout(() => {
      current_img.classList.add('invisible')
      current_img.classList.remove('show')
      current_img.classList.remove('swipe__right__current')
      following_img.classList.remove('swipe__right__following')
      current_img = following_img
      cirs[current].classList.add('active')
      prevButton.removeAttribute('disabled')
      nextButton.removeAttribute('disabled')
    }, 950)
  }
})

cirs.forEach((item, index) => {
  item.addEventListener('click', async () => {
    prevButton.setAttribute("disabled", 'disabled')
    nextButton.setAttribute("disabled", 'disabled')
    cirs[current].classList.remove('active')
    const counts = Math.abs(current - index)
    if (index > current) {
      for (let i = 0; i < counts; i++) {
        const currentImg = images[current + i]
        const followingImg = images[current + i + 1]

        followingImg.classList.remove('invisible')
        followingImg.classList.add('show')
        currentImg.style.animation = `swipe__right__current ${1 / counts}s`

        followingImg.style.animation = `swipe__right__following ${1 / counts}s`
        const timeout = () => {
          return new Promise((resolve) => {
            setTimeout(() => {
              currentImg.classList.add('invisible')
              currentImg.classList.remove('show')
              currentImg.style.animation = null
              followingImg.style.animation = null
              resolve()
            }, 1000 / counts)
          })
        }
        await timeout()
      }
    }
    else if (current > index) {
      for (let i = 0; i < counts; i++) {

      }
    }
    item.classList.add('active')
    current = index
    prevButton.removeAttribute('disabled')
    nextButton.removeAttribute('disabled')
  })
})