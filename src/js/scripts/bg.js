"use strict";
export function changeBG() {
  const $buttonSunny = document.getElementById("sunny");
  const $buttonRainy = document.getElementById("rainy");
  const $buttonsnowy = document.getElementById("snowy");
  const $buttoncloudy = document.getElementById("cloudy");
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
    if (event.target == $buttonsnowy) {
      $video.src = "images/snowy.mp4";
      $video.poster = "images/snowy-poster.jpg";
    }
    if (event.target == $buttoncloudy) {
      $video.src = "images/cloudy.mp4";
      $video.poster = "images/cloudy-poster.jpg";
    }
  });
}

export function changeBGByWeather(data) {
  const $buttonSunny = document.getElementById("sunny");
  const $buttonRainy = document.getElementById("rainy");
  const $buttonsnowy = document.getElementById("snowy");
  const $buttoncloudy = document.getElementById("cloudy");
  const $videoSource = document.getElementById("video-source");
  const $video = document.getElementById("video");

  if (data.weather[0].id == 800) {
    $video.src = "images/sunny.mp4";
    $video.poster = "images/sunny-poster.jpg";
  }
  if (
    data.weather[0].id == 500 ||
    data.weather[0].id == 501 ||
    data.weather[0].id == 502 ||
    data.weather[0].id == 503 ||
    data.weather[0].id == 504 ||
    data.weather[0].id == 511 ||
    data.weather[0].id == 520 ||
    data.weather[0].id == 521 ||
    data.weather[0].id == 522 ||
    data.weather[0].id == 531 ||
    data.weather[0].id == 300 ||
    data.weather[0].id == 301 ||
    data.weather[0].id == 302 ||
    data.weather[0].id == 310 ||
    data.weather[0].id == 311 ||
    data.weather[0].id == 312 ||
    data.weather[0].id == 313 ||
    data.weather[0].id == 314 ||
    data.weather[0].id == 321
  ) {
    $video.src = "images/rainy.mp4";
    $video.poster = "images/rainy-poster.jpg";
  }
  if (
    data.weather[0].id == 600 ||
    data.weather[0].id == 601 ||
    data.weather[0].id == 602 ||
    data.weather[0].id == 611 ||
    data.weather[0].id == 612 ||
    data.weather[0].id == 613 ||
    data.weather[0].id == 615 ||
    data.weather[0].id == 616 ||
    data.weather[0].id == 620 ||
    data.weather[0].id == 621 ||
    data.weather[0].id == 622
  ) {
    $video.src = "images/snowy.mp4";
    $video.poster = "images/snowy-poster.jpg";
  }
  if (
    data.weather[0].id == 801 ||
    data.weather[0].id == 802 ||
    data.weather[0].id == 803 ||
    data.weather[0].id == 804
  ) {
    $video.src = "images/cloudy.mp4";
    $video.poster = "images/cloudy-poster.jpg";
  }
  if (
    data.weather[0].id == 200 ||
    data.weather[0].id == 201 ||
    data.weather[0].id == 202 ||
    data.weather[0].id == 210 ||
    data.weather[0].id == 211 ||
    data.weather[0].id == 212 ||
    data.weather[0].id == 221 ||
    data.weather[0].id == 230 ||
    data.weather[0].id == 231 ||
    data.weather[0].id == 232
  ) {
    $video.src = "images/thunder.mp4";
    $video.poster = "images/thunder-poster.jpg";
  }
}
