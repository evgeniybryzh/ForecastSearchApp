"use strict";
export function changeBG() {
  const $buttonSunny = document.getElementById("sunny");
  const $buttonRainy = document.getElementById("rainy");
  const $buttonFoggy = document.getElementById("foggy");
  const $buttonThunder = document.getElementById("thunder");
  const $videoSource = document.getElementById("video-source");
  const $video = document.getElementById("video");
  document.addEventListener("click", (event) => {
    if (event.target == $buttonSunny) {
      $video.src = "images/sunny.mp4";
      $video.poster = "images/sunny-poster.jpg";
    }
    if (event.target == $buttonRainy) {
      $video.src = "images/rainy.mp4";
      $video.poster = "images/rainy-poster.jpg";
    }
    if (event.target == $buttonFoggy) {
      $video.src = "images/foggy.mp4";
      $video.poster = "images/foggy-poster.jpg";
    }
    if (event.target == $buttonThunder) {
      $video.src = "images/thunder.mp4";
      $video.poster = "images/thunder-poster.jpg";
    }
  });
}
