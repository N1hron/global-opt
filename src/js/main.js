import slider from "./modules/slider";

window.addEventListener('DOMContentLoaded', () => {
    'use strict'

    slider({
        sliderSelector: '.reviews__slider', 
        rightSelector: '.right', 
        leftSelector: '.left', 
        slideClass: 'reviews__slide',
        slidesContainerSelector: '.reviews__slides',
        activeClass: 'active',
        animationForwardClass: 'slide-change-forward',
        animationBackwardClass: 'slide-change-backward'
    });

    console.log('Pet project made by N1hron');
});