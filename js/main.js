let slides = document.querySelectorAll('.slide');
let indicatorContainer = document.querySelector('#indicators-container');
let indicators = document.querySelectorAll('.indicator');
let pauseBtn = document.querySelector('#pause-btn');
let prevBtn = document.querySelector('#prev-btn');
let nextBtn = document.querySelector('#next-btn');


let currentSlide = 0;
let timerID = null;
let slidesCount = slides.length;
let interval = 2000;
let isPlaying = true;

const SPACE = ' ';
const RIGHT_ARROW = 'ArrowRight';
const LEFT_ARROW = 'ArrowLeft';
const FA_PAUSE = '<i class="fas fa-pause"></i>';
const FA_PLAY = '<i class="fas fa-play"></i>';


function gotoNth(n) {
    slides[currentSlide].classList.toggle('active');
    indicators[currentSlide].classList.toggle('active');
    currentSlide = (slidesCount +n) % slidesCount;
    slides[currentSlide].classList.toggle('active');
    indicators[currentSlide].classList.toggle('active');
}

function gotoPrev() {
    gotoNth(currentSlide - 1);
}

function gotoNext() {
    gotoNth(currentSlide + 1);
}

function play() {
    pauseBtn.innerHTML = FA_PAUSE;
    isPlaying = !isPlaying;
    timerID = setInterval (gotoNext, interval);
}

function pause() {
    pauseBtn.innerHTML = FA_PLAY;
    isPlaying = !isPlaying;
    clearInterval(timerID);
}

function pausePlay() {
    if (isPlaying) pause();
    else play();
}

function prev() {
    pause();
    gotoPrev();
}

function next() {
    pause();
    gotoNext();
}

function indicate(e) {
    let target = e.target;

    if (target.classList.contains('indicator')) {
        pause();
        gotoNth (+target.dataset.slideTo);
    }
} 

function pressKey(e) {
    if (e.key === LEFT_ARROW) prev();
    if (e.key === RIGHT_ARROW) next();
    if (e.key === SPACE) pausePlay();
    console.log(e.key);
}

pauseBtn.addEventListener('click', pausePlay);
prevBtn.addEventListener('click', gotoPrev);
nextBtn.addEventListener('click', gotoNext);
indicatorContainer.addEventListener('click', indicate);
document.addEventListener('keydown', pressKey);

timerID = setInterval (gotoNext, interval);

 