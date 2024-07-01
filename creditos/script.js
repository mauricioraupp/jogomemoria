const mainText = document.querySelector('.main-text')
const imgBG = document.querySelector('.imgBG')

function applyStyles(mediaQuery) {
    if (mediaQuery.matches) {
        mainText.innerHTML = 'DEVS'
    } else {
        mainText.innerHTML = 'DESENVOLVEDORES'
    }
}

const mediaQuery = window.matchMedia('(max-width: 768px)');
mediaQuery.addListener(applyStyles);
applyStyles(mediaQuery);




function rotateCircle() {
    scrollar = window.pageYOffset

    imgBG.style.marginTop = `${0 - scrollar * 0.05}vh`


    requestAnimationFrame(rotateCircle);

}

rotateCircle();