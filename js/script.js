document.addEventListener('DOMContentLoaded', () => {
  'use strict'
  // Loader
  const loader = document.querySelector('.loader')
  setTimeout(function () {
    loader.style.opacity = '0'
    setTimeout(function () {
      loader.style.display = 'none'
    }, 500)
  }, 1500)
  // Loader
  // Tabs
  const tabContents = document.querySelectorAll('.tabcontent'),
    headerParent = document.querySelector('.tabheader__items'),
    tabs = headerParent.querySelectorAll('.tabheader__item')

  function hideTabContent() {
    tabContents.forEach((item) => {
      item.style.display = 'none'
    })
    tabs.forEach((item) => {
      item.classList.remove('tabheader__item_active')
    })
  }
  function showTabContent(i = 0) {
    tabContents[i].style.display = 'block'
    tabs[i].classList.add('tabheader__item_active')
  }

  hideTabContent()
  showTabContent()
  headerParent.addEventListener('click', (e) => {
    if (e.target && e.target.classList.contains('tabheader__item')) {
      tabs.forEach((item, i) => {
        if (e.target == item) {
          hideTabContent()
          showTabContent(i)
        }
      })
    }
  })
  // Tabs
  // Slider
  const slider = document.querySelector('.offer__slider'),
    slideParent = document.querySelector('.offer__slider-wrapper'),
    slideCounter = document.querySelector('.offer__slider-counter'),
    offerSlide = slideParent.querySelectorAll('.offer__slide'),
    slidePrev = document.querySelector('.offer__slider-prev'),
    slideNext = document.querySelector('.offer__slider-next'),
    current = document.querySelector('#current'),
    total = document.querySelector('#total'),
    width = window.getComputedStyle(slideParent).width,
    innerSlider = document.querySelector('.offer__slider-inner')

  const intCarousel = setInterval(addCarousel, 2000)

  function addCarousel() {
    if (
      offset ===
      +width.slice(0, width.length - 2) * (offerSlide.length - 1)
    ) {
      offset = 0
    } else {
      offset += +width.slice(0, width.length - 2)
    }
    innerSlider.style.transform = `translateX(-${offset}px)`

    if (slideIndex >= offerSlide.length) {
      slideIndex = 1
    } else {
      slideIndex += 1
    }

    if (slideIndex < 10) {
      current.textContent = `0${slideIndex}`
    } else {
      current.textContent = slideIndex
    }

    dots.forEach((dot) => (dot.style.opacity = '.5'))
    dots[slideIndex - 1].style.opacity = '1'
  }

  function stopCarousel() {
    clearInterval(intCarousel)
  }
  // Stop on hover
  slideParent.addEventListener('mouseover', () => stopCarousel())
  slideCounter.addEventListener('mouseover', () => stopCarousel())
  // Stop on hover

  let slideIndex = 1,
    offset = 0

  current.textContent = slideIndex

  innerSlider.style.cssText = `
  width: ${100 * offerSlide.length}%;
  display: flex;
  transition: all .5s;
  `
  slideParent.style.overflow = 'hidden'

  slideNext.addEventListener('click', () => {
    if (
      offset ===
      +width.slice(0, width.length - 2) * (offerSlide.length - 1)
    ) {
      offset = 0
    } else {
      offset += +width.slice(0, width.length - 2)
    }
    innerSlider.style.transform = `translateX(-${offset}px)`

    if (slideIndex >= offerSlide.length) {
      slideIndex = 1
    } else {
      slideIndex += 1
    }

    if (slideIndex < 10) {
      current.textContent = `0${slideIndex}`
    } else {
      current.textContent = slideIndex
    }

    dots.forEach((dot) => (dot.style.opacity = '.5'))
    dots[slideIndex - 1].style.opacity = '1'
  })

  slidePrev.addEventListener('click', () => {
    if (offset === 0) {
      offset = +width.slice(0, width.length - 2) * (offerSlide.length - 1)
    } else {
      offset -= +width.slice(0, width.length - 2)
    }
    innerSlider.style.transform = `translateX(-${offset}px)`

    if (slideIndex <= 1) {
      slideIndex = offerSlide.length
    } else {
      slideIndex -= 1
    }

    if (slideIndex < 10) {
      current.textContent = `0${slideIndex}`
    } else {
      current.textContent = slideIndex
    }

    dots.forEach((dot) => (dot.style.opacity = '.5'))
    dots[slideIndex - 1].style.opacity = '1'

    stopCarousel()
  })

  if (slideIndex > 10) {
    current.textContent = slideIndex
    total.textContent = slideIndex
  } else {
    current.textContent = `0${slideIndex}`
  }

  slider.style.position = 'relative'
  let indicator = document.createElement('ol'),
    dots = []

  indicator.style.cssText = `
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 15;
  display: flex;
  justify-content: center;
  margin-right: 15%;
  margin-left: 15%;
  list-style: none
`

  slider.append(indicator)

  for (let i = 0; i < offerSlide.length; i++) {
    const dot = document.createElement('li')
    dot.setAttribute('data-slide-to', i + 1)
    dot.style.cssText = `
      box-sizing: content-box;
      flex: 0 1 auto;
      width: 30px;
      height: 6px;
      margin: 0 3px;
      cursor: pointer;
      background-color: #fff;
      background-clip: padding-box;
      border-top: 10px solid transparent;
      border-bottom: 10px solid transparent;
      opacity: .5;
      transform: opacity .6s ease;
    `

    if (i === 0) {
      dot.style.opacity = '1'
    }
    indicator.append(dot)
    dots.push(dot)
  }

  dots.forEach((dot) => {
    dot.addEventListener('click', (e) => {
      const slideTo = e.target.getAttribute('data-slide-to')

      slideIndex = slideTo

      offset = +width.slice(0, width.length - 2) * (slideTo - 1)
      innerSlider.style.transform = `translateX(-${offset}px)`

      if (slideIndex > 10) {
        current.textContent = slideIndex
        total.textContent = slideIndex
      } else {
        current.textContent = `0${slideIndex}`
      }

      dots.forEach((dot) => (dot.style.opacity = '.5'))
      dots[slideIndex - 1].style.opacity = 1
    })
  })
  // Slider easy method
  // Modal
  const allModalBtn = document.querySelectorAll('[data-modal]'),
    modal = document.querySelector('.modal'),
    modalClose = document.querySelector('[data-close]')

  allModalBtn.forEach((btn) => {
    btn.addEventListener('click', () => {
      openModal()
    })
  })

  modalClose.addEventListener('click', closeModal)

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal()
    }
  })

  function openModal() {
    modal.classList.add('show')
    modal.classList.remove('hide')
    document.body.style.overflow = 'hidden'
    clearInterval(modalTimer)
  }

  function closeModal() {
    modal.classList.add('hide')
    modal.classList.remove('show')
    document.body.style.overflow = ''
  }

  const modalTimer = setTimeout(openModal, 5000)

  function showMyModalByScroll() {
    if (
      window.pageYOffset + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight
    ) {
      console.log('Hi')
      openModal()
      window.removeEventListener('scroll', showMyModalByScroll)
    }
  }
  window.addEventListener('scroll', showMyModalByScroll)
  // Modal
  // Data
  const deadline = '2024-03-28'

  function getTime(endtime) {
    const total = Date.parse(endtime) - Date.parse(new Date()),
      days = Math.floor(total / (1000 * 60 * 60 * 24)),
      seconds = Math.floor((total / 1000) % 60),
      minutes = Math.floor((total / 1000 / 60) % 60),
      hours = Math.floor((total / (1000 * 60 * 60)) % 24)
    return {
      total: total,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    }
  }

  function getZero(num) {
    if (num >= 0 && num < 10) {
      return '0' + num
    } else {
      return num
    }
  }

  function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
      days = timer.querySelector('#days'),
      hours = timer.querySelector('#hours'),
      minutes = timer.querySelector('#minutes'),
      seconds = timer.querySelector('#seconds'),
      timeInterval = setInterval(updateClock, 1000)

    updateClock()

    function updateClock() {
      const time = getTime(endtime)
      days.innerHTML = getZero(time.days)
      hours.innerHTML = getZero(time.hours)
      minutes.innerHTML = getZero(time.minutes)
      seconds.innerHTML = getZero(time.seconds)
      if (time.total <= 0) {
        clearInterval(timeInterval)
      }
    }
  }

  setClock('.timer', deadline)
  // Data
  // Class
  class CarCard {
    constructor(src, alt, title, descr, price, parentSelector, ...classes) {
      this.src = src
      this.alt = alt
      this.title = title
      this.descr = descr
      this.price = price
      this.classes = classes
      this.parent = document.querySelector(parentSelector)
      this.transfer = 10.5
      this.changeToUSD()
    }

    changeToUSD() {
      this.price = this.price / this.transfer
    }

    render() {
      const element = document.createElement('div')

      // if(this.classes.length == 0) {
      //   this.classes = 'menu_item';
      //   element.classList.add(this.classes);
      // } else {
      //   this.classes.forEach(className => element.classList.add(className));
      // }

      element.innerHTML = `
      <div class="menu__item">
        <img src=${this.src} alt=${this.alt} />
        <h3 class="menu__item-subtitle">${this.title}</h3>
        <div class="menu__item-descr">${this.descr}</div>
        <div class="menu__item-divider"></div>
        <div class="menu__item-price">
          <div class="menu__item-cost">Price:</div>
          <div class="menu__item-total"><span>${this.price}</span> $</div>
        </div>
    </div>
      `
      this.parent.append(element)
    }
  }

  new CarCard(
    'img/tabs/1.jpg',
    'vegy',
    '2021 Mercedes-Benz C-Class',
    ` The 2021 Mercedes-Benz C-Class finishes in the top half of our luxury small car rankings. It's powerful and upscale, but it hasso-so handli...`,
    10500 * 77.69,
    '.menu .container'
    // 'red'
  ).render()

  new CarCard(
    'img/tabs/2.jpg',
    'vegy',
    '2021 Mercedes-Benz C-Class',
    ` The 2021 Mercedes-Benz C-Class finishes in the top half of our luxury small car rankings. It's powerful and upscale, but it hasso-so handli...`,
    10500 * 62.99,
    '.menu .container'
  ).render()

  new CarCard(
    'img/tabs/3.jpg',
    'vegy',
    '2021 Mercedes-Benz C-Class',
    ` The 2021 Mercedes-Benz C-Class finishes in the top half of our luxury small car rankings. It's powerful and upscale, but it hasso-so handli...`,
    10500 * 131.5,
    '.menu .container'
  ).render()
  // Class
  // Accordion
  const accordion = document.querySelectorAll('.accordion')

  accordion.forEach((acc) => {
    acc.addEventListener('click', () => {
      acc.classList.toggle('active')
      const panel = acc.nextElementSibling
      if (panel.style.maxHeight) {
        panel.style.maxHeight = null
      } else {
        panel.style.maxHeight = panel.scrollHeight + 'px'
      }
    })
  })

  // Accordion
})
