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
const buttons = [prevButton, nextButton]
buttons.forEach((item, index) => {
  item.addEventListener('click', () => {
    if (prevButton.getAttribute('disabled') === null) {
      prevButton.setAttribute("disabled", 'disabled')
      nextButton.setAttribute("disabled", 'disabled')
      let followingImg
      cirs[current].classList.remove('active')
      if (index === 0) {
        if (current === 0) {
          followingImg = images[number_of_pictures - 1]
          current = number_of_pictures - 1
        }
        else {
          followingImg = images[current - 1]
          current = current - 1
        }
      }
      else {
        if (current === number_of_pictures - 1) {
          followingImg = images[0]
          current = 0
        }
        else {
          followingImg = images[current + 1]
          current = current + 1
        }
      }
      followingImg.classList.remove('invisible')
      followingImg.classList.add('show')
      current_img.classList.add(`swipe__${index === 1 ? 'right' : 'left'}__current`)
      followingImg.classList.add(`swipe__${index === 1 ? 'right' : 'left'}__following`)
      setTimeout(() => {
        current_img.classList.add('invisible')
        current_img.classList.remove('show')
        current_img.classList.remove(`swipe__${index === 1 ? 'right' : 'left'}__current`)
        followingImg.classList.remove(`swipe__${index === 1 ? 'right' : 'left'}__following`)
        current_img = followingImg
        cirs[current].classList.add('active')
        prevButton.removeAttribute('disabled')
        nextButton.removeAttribute('disabled')
      }, 950)
    }
  })
})

const timeout = (followingImg, counts) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      current_img.classList.add('invisible')
      current_img.classList.remove('show')
      current_img.style.animation = null
      followingImg.style.animation = null
      resolve()
    }, 1000 / counts)
  })
}

cirs.forEach((item, index) => {
  item.addEventListener('click', async () => {
    prevButton.setAttribute("disabled", 'disabled')
    nextButton.setAttribute("disabled", 'disabled')
    cirs[current].classList.remove('active')
    const counts = Math.abs(current - index)
    const direction = index > current ? 1 : -1
    for (let i = 0; i < counts; i++) {
      current_img = images[current + i * direction]
      const followingImg = images[current + i * direction + 1 * direction]
      followingImg.classList.remove('invisible')
      followingImg.classList.add('show')
      current_img.style.animation = `swipe__${direction > 0 ? 'right' : 'left'}__current ${1 / counts}s`
      followingImg.style.animation = `swipe__${direction > 0 ? 'right' : 'left'}__following ${1 / counts}s`
      await timeout(followingImg, counts)
    }
    item.classList.add('active')
    current_img = images[index]
    current = index
    prevButton.removeAttribute('disabled')
    nextButton.removeAttribute('disabled')
  })
})
