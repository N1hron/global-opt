export default function slider(sliderInfo) {
    const {
        rightSelector, 
        leftSelector, 
        slideClass, 
        sliderSelector, 
        slidesContainerSelector, 
        activeClass, 
        animationBackwardClass, 
        animationForwardClass
    } = sliderInfo;

    const slider = document.querySelector(sliderSelector),
          right = slider.querySelector(rightSelector),
          left = slider.querySelector(leftSelector),
          slidesContainer = slider.querySelector(slidesContainerSelector);

    let slides = slider.getElementsByClassName(slideClass);

    right.addEventListener('click', () => changeSlide('forward'));
    left.addEventListener('click', () => changeSlide('backward'));

    function changeSlide(direction) {
        switch(direction) {
            case 'forward':
                slidesContainer.append(slides[0]);
                slides[1].classList.add(activeClass);
                slides[1].classList.add(animationForwardClass);
                slides[0].classList.remove(activeClass);
                slides[0].classList.remove(animationForwardClass, animationBackwardClass);
                break;
            case 'backward':
                slidesContainer.prepend(slides[slides.length - 1]);
                slides[1].classList.add(activeClass);
                slides[1].classList.add(animationBackwardClass);
                slides[2].classList.remove(activeClass);
                slides[2].classList.remove(animationBackwardClass, animationForwardClass);
                break;
            default:
                break;
        }
    }
}