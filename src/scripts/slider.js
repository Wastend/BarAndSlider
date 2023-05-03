var slider = document.getElementById('sliders')
var prevButton = document.getElementById('prevButton')
var nextButton = document.getElementById('nextButton')
var circles = document.getElementById('circles')
const buttons = [prevButton, nextButton]

const numberOfPictures = slider.getElementsByTagName('*').length
var images = slider.querySelectorAll('img')
let current
let currentImg
let cirsArray = []

const createCircles = () => {
  for (let i = 0; i < numberOfPictures; i++) {
    const circle = document.createElement('div')
    circle.classList.add('circle')
    circles.appendChild(circle)
    cirsArray.push(circle)
  }
}

createCircles()

const setFirstElement = () => {
  current = 0
  currentImg = images[0]
  currentImg.classList.add('show')
  var cir = cirsArray[0]
  cir.classList.add('active')
  for (let i = 1; i < numberOfPictures; i++) {
    images[i].classList.add('invisible')
  }
}

setFirstElement()

buttons.forEach((item, index) => {
  item.addEventListener('click', () => {
    if (!prevButton.getAttribute('disabled')) {
      prevButton.setAttribute('disabled', 'disabled')
      nextButton.setAttribute('disabled', 'disabled')
      let followingImg
      cirsArray[current].classList.remove('active')
      if (index === 0) {
        if (current === 0) {
          followingImg = images[numberOfPictures - 1]
          current = numberOfPictures - 1
        }
        else {
          followingImg = images[--current]
        }
      }
      else {
        if (current === numberOfPictures - 1) {
          followingImg = images[0]
          current = 0
        }
        else {
          followingImg = images[++current]
        }
      }
      followingImg.classList.remove('invisible')
      followingImg.classList.add('show')
      currentImg.classList.add(`swipe__${index === 1 ? 'right' : 'left'}__current`)
      followingImg.classList.add(`swipe__${index === 1 ? 'right' : 'left'}__following`)
      setTimeout(() => {
        currentImg.classList.add('invisible')
        currentImg.classList.remove('show')
        currentImg.classList.remove(`swipe__${index === 1 ? 'right' : 'left'}__current`)
        followingImg.classList.remove(`swipe__${index === 1 ? 'right' : 'left'}__following`)
        currentImg = followingImg
        cirsArray[current].classList.add('active')
        prevButton.removeAttribute('disabled')
        nextButton.removeAttribute('disabled')
      }, 950)
    }
  })
})

const timeout = (followingImg, counts) => {
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

cirsArray.forEach((item, index) => {
  item.addEventListener('click', async () => {
    prevButton.setAttribute('disabled', 'disabled')
    nextButton.setAttribute('disabled', 'disabled')
    cirsArray[current].classList.remove('active')
    const counts = Math.abs(current - index)
    const direction = index > current ? 1 : -1
    for (let i = 0; i < counts; i++) {
      currentImg = images[current + i * direction]
      const followingImg = images[current + i * direction + 1 * direction]
      followingImg.classList.remove('invisible')
      followingImg.classList.add('show')
      currentImg.style.animation = `swipe__${direction > 0 ? 'right' : 'left'}__current ${1 / counts}s`
      followingImg.style.animation = `swipe__${direction > 0 ? 'right' : 'left'}__following ${1 / counts}s`
      await timeout(followingImg, counts)
    }
    item.classList.add('active')
    currentImg = images[index]
    current = index
    prevButton.removeAttribute('disabled')
    nextButton.removeAttribute('disabled')
  })
})
