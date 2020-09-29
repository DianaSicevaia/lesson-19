/* eslint-disable no-unused-vars */
/* eslint-disable func-style */
/* eslint-disable require-jsdoc */

let container = null;
let prevIndicator = null;

function createCarousel(slidesCount = 5) {
    let container = document.querySelector('#carousel');
    createStyle();

    let createSlides = document.createElement('ul');
    createSlides.setAttribute('class', 'slides');

    createSlides.addItem = function (slide) {

        let slideItem = document.createElement('li');
        slideItem.setAttribute('class', 'slides__item');
        if (slide === 0) slideItem.classList.add('active');

        let slideLink = document.createElement('a');
        slideLink.setAttribute('href', '#');
        
        slideItem.appendChild(slideLink);
        this.appendChild(slideItem);
    }

    
        let createIndicators = document.createElement('div');
        createIndicators.setAttribute('class', 'indicators');
        createIndicators.addEventListener('click', handler);
        createIndicators.addItem = function (n) {
    
            let indicators__item = document.createElement('span');
            indicators__item.setAttribute('class', 'indicators__item');
            if(n === 0) indicators__item.classList.add('active');
            indicators__item.setAttribute('data-slide-to', n);
            this.appendChild(indicators__item);
        }
    

    let createControls = document.createElement('div');
    createControls.setAttribute('class', 'controls');
    createControls.addItem = function (button) {
            if(button > 2) return;
            let controlItem = document.createElement('div');
            controlItem.setAttribute('class', 'controls__item');
    
            let controlIcon = document.createElement('i');
            controlIcon.setAttribute('class', 'fas');

            controlItem.appendChild(controlIcon);
            switch (button) { 
                case 0:
                    controlItem.classList.add('controls__prev');
                    controlIcon.classList.add('fa-chevron-left');
                    break;
                case 1:
                    controlItem.classList.add('controls__next');
                    controlIcon.classList.add('fa-chevron-right');
                    break;
                case 2:
                    controlItem.classList.add('controls__pause');
                    controlIcon.classList.add('fa-play');
                    break;
            }
            controlItem.appendChild(controlIcon);
            this.appendChild(controlItem);
            console.log(controlItem);
      }
   

    
    for (let i=0; i < slidesCount; i++) {
        createSlides.addItem(i);
        createIndicators.addItem(i);
        createControls.addItem(i);
    }

    container.appendChild(createSlides);
    container.appendChild(createIndicators);
    container.appendChild(createControls);

    
}

function handler(e) {
    let target = e.target;

  if (target.classList.contains('indicators__item')) {
    target.style.backgroundColor = 'red';

    if (prevIndicator !== null) prevIndicator.removeAttribute('style');

    prevIndicator = target;
  }
}

function createStyle() {
    let css = `
    .controls, .slides {
        position: relative;
    }
    .slides {
        position: relative;
    
        height: 150px;
        margin: 0;
        padding: 0;
    
        list-style-type: none;

        box-sizing: border-box;
        padding: 40px;
        color: #ffffff;
        background: #333333;
        font-size: 40px;
    }

    .slides__item {
        position: absolute;
        z-index: -100;
        top: 0;
        left: 0;
    
        width: 100%;
        height: 100%;
    
        transition: opacity 1s;
    
        opacity: 0;
    }
    .indicators {
        display: flex;
    }
    .indicators__item {
        width: 24px;
        height: 24px;
        border-radius: 12px;
        border: 1px solid;
        cursor: pointer;
        background-color: gray;
    }
    
    .control {
        width: 100px;
    }
    .controls__item {
        height: 24px;
        display: inline-block;
        margin-bottom: 10px;
        cursor: pointer;`;
    let head = document.querySelector('head');
    let style = document.createElement('style');
    style.setAttribute('type', 'text/css');
    style.appendChild(document.createTextNode(css));
    head.appendChild(style);
}
  
   createCarousel(5);
















  
//let carousel = new Carousel();

// let carousel = new SwipeCarousel();

// carousel.init();

// (function anyname() {
//     let container = document.querySelector('#carousel');
//     let slides = container.querySelectorAll('.slide');
//     let indicatorContainer = container.querySelector('#indicators-container');
//     let indicators = indicatorContainer.querySelectorAll('.indicator');
//     let controls = container.querySelector('#controls-container');
//     let pauseBtn = controls.querySelector('#pause-btn');
//     let prevBtn = controls.querySelector('#prev-btn');
//     let nextBtn = controls.querySelector('#next-btn');

//     let currentSlide = 0;
//     let timerID = null;
//     let slidesCount = slides.length;
//     let interval = 2000;
//     let isPlaying = true;
//     let swipeStartX = null; 
//     let swipeEndX = null;

//     const SPACE = ' ';
//     const RIGHT_ARROW = 'ArrowRight';
//     const LEFT_ARROW = 'ArrowLeft';
//     const FA_PAUSE = '<i class="fas fa-pause"></i>';
//     const FA_PLAY = '<i class="fas fa-play"></i>';

//     function gotoNth(n) {
//         slides[currentSlide].classList.toggle('active');
//         indicators[currentSlide].classList.toggle('active');
//         currentSlide = (slidesCount +n) % slidesCount;
//         slides[currentSlide].classList.toggle('active');
//         indicators[currentSlide].classList.toggle('active');
//     }
    
//     function gotoPrev() {
//         gotoNth(currentSlide - 1);
//     }
    
//     function gotoNext() {
//         gotoNth(currentSlide + 1);
//     }
    
//     function play() {
//         pauseBtn.innerHTML = FA_PAUSE;
//         isPlaying = !isPlaying;
//         timerID = setInterval (gotoNext, interval);
//     }
    
//     function pause() {
//         pauseBtn.innerHTML = FA_PLAY;
//         isPlaying = !isPlaying;
//         clearInterval(timerID);
//     }
    
//     function pausePlay() {
//         if (isPlaying) pause();
//         else play();
//     }
    
//     function prev() {
//         pause();
//         gotoPrev();
//     }
    
//     function next() {
//         pause();
//         gotoNext();
//     }
    
//     function indicate(e) {
//         let target = e.target;
    
//         if (target.classList.contains('indicator')) {
//             pause();
//             gotoNth (+target.dataset.slideTo);
//         }
//     } 
    
//     function pressKey(e) {
//         if (e.key === LEFT_ARROW) prev();
//         if (e.key === RIGHT_ARROW) next();
//         if (e.key === SPACE) pausePlay();
//         console.log(e.key);
//     }
    
//     function swiperStart(e) {
//         swipeStartX = e.changedTouches[0].pageX;
//     }
    
//     function swiperEnd(e) {
//         swipeEndX = e.changedTouches[0].pageX;
    
//         if (swipeStartX - swipeEndX > 100) next();
//         if (swipeStartX - swipeEndX < -100) prev();
//     }
    
//     pauseBtn.addEventListener('click', pausePlay);
//     prevBtn.addEventListener('click', gotoPrev);
//     nextBtn.addEventListener('click', gotoNext);
//     indicatorContainer.addEventListener('click', indicate);
//     document.addEventListener('keydown', pressKey);
//     container.addEventListener('touchstart', swiperStart)
//     container.addEventListener('touchend', swiperEnd)
    
//     timerID = setInterval (gotoNext, interval);
        
// }()); 
