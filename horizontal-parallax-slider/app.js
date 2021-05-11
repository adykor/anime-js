// variables
let images = [...document.querySelectorAll('.img')]; // spread operator in an array
let slider = document.querySelector('.slider');
let sliderWidth;
let imageWidth;
let current = 0;
let target = 0;
let ease = .05; // ease variable

window.addEventListener('resize', init);

// forEach function passes in the index for each image; using +1 as starting on 1 not 0
images.forEach((img, idx) => {
    img.style.backgroundImage = `url(./images/${idx+1}.jpg)`
})

// linear interpolation function: establish start & end position & t easing variable works out the % between the start & end
function lerp(start, end, t){ // t variable is the ease
    return start * (1-t) + end * t;
}

function setTransform(el, transform){
    el.style.transform = transform;
}

function init(){
    sliderWidth = slider.getBoundingClientRect().width;
    imageWidth = sliderWidth / images.length;
    document.body.style.height = `${sliderWidth - (window.innerWidth - window.innerHeight)}px`
}

function animate(){
    current = parseFloat(lerp(current, target, ease)).toFixed(2);
    target = window.scrollY; // amount of pixels we've scrolled down by
    setTransform(slider, `translateX(-${current}px)`)
    animateImages();
    requestAnimationFrame(animate);
}

function animateImages(){
    let ratio = current / imageWidth;
    let intersectionRatioValue;

    images.forEach((image, idx) => {
        intersectionRatioValue = ratio - (idx * 0.7);
        setTransform(image, `translateX(${intersectionRatioValue * 70}px)`)
    })
}

init();
animate();
