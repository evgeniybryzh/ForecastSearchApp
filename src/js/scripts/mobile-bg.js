"use strict"
import { slowVideo } from "./video";
export const changeBGForMobile = () => {
    const $forecastSection = document.getElementById('forecast');
    const $videoBG = document.getElementById('video');
    if (window.matchMedia("(min-width: 768px)").matches) {
        slowVideo();
    } else {
        $forecastSection.removeChild($videoBG);
        document.body.classList.add('bg');
    }
}