(function () {
  'use strict';

  function useBurgerMenu() {
    const $burgerBtn = document.getElementById("burger");
    const $burgerStripes = $burgerBtn.children;
    const $burgerMenu = document.getElementById("burger-menu");
    const $firstStripe = document.getElementById("first-stripe");
    const $secondStripe = document.getElementById("second-stripe");
    const $thirdStripe = document.getElementById("third-stripe");
    const $burgerMenuListItems = document.getElementById("menu-list");
    let topCounter = -40;
    let rightCounter = 40;
    let count = 90;

    function changeVisibilityTohidden() {
      $burgerMenu.style.display = "none";
    }

    function changeVisibilityToVisible() {
      $burgerMenu.style.display = "flex";
    }

    function returnDirection() {
      topCounter = -40;
      rightCounter = 40;
      $burgerMenu.style.top = `${topCounter}px`;
      $burgerMenu.style.right = `${rightCounter}px`;
    }

    function moveTop() {
      if (count == -40) {
        return count = 90;
      } else {
        $burgerMenu.style.top = `${count -= 5}px`;
      }

      setTimeout(moveTop, 1);
    }

    function animateMenuBack() {
      moveTop();
      setTimeout(changeVisibilityTohidden, 50);
      setTimeout(returnDirection, 500);
    }

    function animateMenuForward() {
      changeVisibilityToVisible();
      if (rightCounter == 360) return true;

      if (topCounter < 90 && rightCounter == 40) {
        $burgerMenu.style.top = `${topCounter += 10}px`;
      }

      if (topCounter == 90 && rightCounter < 360) {
        $burgerMenu.style.right = `${rightCounter += 10}px`;
      }

      setTimeout(animateMenuForward, 5);
    }

    function removeStripesChanges() {
      $firstStripe.classList.remove("pushed");
      $secondStripe.classList.remove("pushed");
      $thirdStripe.classList.remove("pushed");
    }

    function addStripeChanges() {
      $firstStripe.classList.add("pushed");
      $secondStripe.classList.add("pushed");
      $thirdStripe.classList.add("pushed");
    }

    const useBurger = () => {
      document.addEventListener("click", event => {
        if (event.target === $burgerBtn || event.target === $burgerStripes[0] || event.target === $burgerStripes[1] || event.target === $burgerStripes[2]) {
          if ($firstStripe.classList[1] == "pushed") {
            removeStripesChanges();
            animateMenuBack();
          } else {
            addStripeChanges();
            animateMenuForward();
          }
        }

        if (event.target === $burgerMenuListItems.children[0] || event.target === $burgerMenuListItems.children[1] || event.target === $burgerMenuListItems.children[2] || event.target === $burgerMenuListItems.children[3]) {
          animateMenuBack();
          removeStripesChanges();
        }
      });
    };

    useBurger();
  }

  function slowVideo() {
    const player = document.getElementById("video");
    player.playbackRate = 0.4;
  }

  function changeBG() {
    const $buttonSunny = document.getElementById("sunny");
    const $buttonRainy = document.getElementById("rainy");
    const $buttonFoggy = document.getElementById("foggy");
    const $buttonThunder = document.getElementById("thunder");
    const $videoSource = document.getElementById("video-source");
    const $video = document.getElementById("video");
    document.addEventListener("click", event => {
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

  const showWeatherInfo = data => {
    const $cityName = document.getElementById("city-name");
    const cityName = data.name;
    const cityCountry = data.sys.country;
    const $temperature = document.getElementById("temperature");
    const currentTemp = Math.round(data.main.temp - 273.15);
    const $humidityInfo = document.getElementById("humidity-info");
    const humidity = data.main.humidity;
    const $pressureInfo = document.getElementById("pressure-info");
    const pressure = data.main.pressure;
    const currentWeather = data.weather[0].main;
    const $windDirInfo = document.getElementById("wind-dir-info");
    const windDirection = data.wind.deg;
    const $windSpeedInfo = document.getElementById("wind-speed-info");
    const windSpeed = data.wind.speed;
    const $weatherIconBig = document.getElementById("weather-icon-big");
    const icon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    $cityName.innerText = `${cityName}, ${cityCountry}`;

    if (cityCountry == undefined) {
      $cityName.innerText = `${cityName}`;
    }

    $temperature.innerHTML = `${currentTemp} &deg;`;
    $weatherIconBig.setAttribute("src", icon);
    $humidityInfo.innerText = `Humidity:  ${humidity}%`;
    $pressureInfo.innerText = `Pressure: ${pressure} hPa`;
    $windDirInfo.innerText = `Wind Direction: ${windDirection} deg`;
    $windSpeedInfo.innerText = `Wind Speed: ${windSpeed} mps`;
  };
  const showWeatherHourlyInfo = data => {
    const $dateTimeFirst = document.getElementById("firstTime");
    $dateTimeFirst.innerText = data.list[0].dt_txt;
    const $hourlyHumidityFirst = document.getElementById("hourly-00-humidity");
    $hourlyHumidityFirst.innerText = `Humidity:  ${data.list[0].main.humidity}%`;
    const $hourlyPressureFirst = document.getElementById("hourly-00-pressure");
    $hourlyPressureFirst.innerText = `Pressure: ${data.list[0].main.pressure} hPa`;
    const $hourlyWdirFirst = document.getElementById("hourly-00-wdir");
    $hourlyWdirFirst.innerText = `Wind Direction: ${data.list[0].wind.deg} deg`;
    const $hourlyWspeedFirst = document.getElementById("hourly-00-wspeed");
    $hourlyWspeedFirst.innerText = `Wind Speed: ${data.list[0].wind.speed} mps`;
    const $hourlyTemperatureFirst = document.getElementById("hourly-00-temperature");
    $hourlyTemperatureFirst.innerHTML = `${Math.round(data.list[0].main.temp - 273.15)} &deg;`;
    const $hourlyIconFirst = document.getElementById("hourly-00-icon");
    $hourlyIconFirst.setAttribute("src", `https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png`);
    const $dateTimeSecond = document.getElementById("secondTime");
    $dateTimeSecond.innerText = data.list[1].dt_txt;
    const $hourlyHumiditysecond = document.getElementById("hourly-06-humidity");
    $hourlyHumiditysecond.innerText = `Humidity:  ${data.list[1].main.humidity}%`;
    const $hourlyPressuresecond = document.getElementById("hourly-06-pressure");
    $hourlyPressuresecond.innerText = `Pressure: ${data.list[1].main.pressure} hPa`;
    const $hourlyWdirsecond = document.getElementById("hourly-06-wdir");
    $hourlyWdirsecond.innerText = `Wind Direction: ${data.list[1].wind.deg} deg`;
    const $hourlyWspeedsecond = document.getElementById("hourly-06-wspeed");
    $hourlyWspeedsecond.innerText = `Wind Speed: ${data.list[1].wind.speed} mps`;
    const $hourlyTemperaturesecond = document.getElementById("hourly-06-temperature");
    $hourlyTemperaturesecond.innerHTML = `${Math.round(data.list[1].main.temp - 273.15)} &deg;`;
    const $hourlyIconsecond = document.getElementById("hourly-06-icon");
    $hourlyIconsecond.setAttribute("src", `https://openweathermap.org/img/wn/${data.list[1].weather[0].icon}@2x.png`);
    const $dateTimeThird = document.getElementById("thirdTime");
    $dateTimeThird.innerText = data.list[2].dt_txt;
    const $hourlyHumidityThird = document.getElementById("hourly-12-humidity");
    $hourlyHumidityThird.innerText = `Humidity:  ${data.list[2].main.humidity}%`;
    const $hourlyPressureThird = document.getElementById("hourly-12-pressure");
    $hourlyPressureThird.innerText = `Pressure: ${data.list[2].main.pressure} hPa`;
    const $hourlyWdirThird = document.getElementById("hourly-12-wdir");
    $hourlyWdirThird.innerText = `Wind Direction: ${data.list[2].wind.deg} deg`;
    const $hourlyWspeedThird = document.getElementById("hourly-12-wspeed");
    $hourlyWspeedThird.innerText = `Wind Speed: ${data.list[2].wind.speed} mps`;
    const $hourlyTemperatureThird = document.getElementById("hourly-12-temperature");
    $hourlyTemperatureThird.innerHTML = `${Math.round(data.list[2].main.temp - 273.15)} &deg;`;
    const $hourlyIconThird = document.getElementById("hourly-12-icon");
    $hourlyIconThird.setAttribute("src", `https://openweathermap.org/img/wn/${data.list[2].weather[0].icon}@2x.png`);
    const $dateTimeFourth = document.getElementById("fourthTime");
    $dateTimeFourth.innerText = data.list[3].dt_txt;
    const $hourlyHumidityFourth = document.getElementById("hourly-18-humidity");
    $hourlyHumidityFourth.innerText = `Humidity:  ${data.list[3].main.humidity}%`;
    const $hourlyPressureFourth = document.getElementById("hourly-18-pressure");
    $hourlyPressureFourth.innerText = `Pressure: ${data.list[3].main.pressure} hPa`;
    const $hourlyWdirFourth = document.getElementById("hourly-18-wdir");
    $hourlyWdirFourth.innerText = `Wind Direction: ${data.list[3].wind.deg} deg`;
    const $hourlyWspeedFourth = document.getElementById("hourly-18-wspeed");
    $hourlyWspeedFourth.innerText = `Wind Speed: ${data.list[3].wind.speed} mps`;
    const $hourlyTemperatureFourth = document.getElementById("hourly-18-temperature");
    $hourlyTemperatureFourth.innerHTML = `${Math.round(data.list[3].main.temp - 273.15)} &deg;`;
    const $hourlyIconFourth = document.getElementById("hourly-18-icon");
    $hourlyIconFourth.setAttribute("src", `https://openweathermap.org/img/wn/${data.list[3].weather[0].icon}@2x.png`);
    const $dateTimeLast = document.getElementById("lastTime");
    $dateTimeLast.innerText = data.list[4].dt_txt;
    const $hourlyHumidityLast = document.getElementById("hourly-21-humidity");
    $hourlyHumidityLast.innerText = `Humidity:  ${data.list[4].main.humidity}%`;
    const $hourlyPressureLast = document.getElementById("hourly-21-pressure");
    $hourlyPressureLast.innerText = `Pressure: ${data.list[4].main.pressure} hPa`;
    const $hourlyWdirLast = document.getElementById("hourly-21-wdir");
    $hourlyWdirLast.innerText = `Wind Direction: ${data.list[4].wind.deg} deg`;
    const $hourlyWspeedLast = document.getElementById("hourly-21-wspeed");
    $hourlyWspeedLast.innerText = `Wind Speed: ${data.list[4].wind.speed} mps`;
    const $hourlyTemperatureLast = document.getElementById("hourly-21-temperature");
    $hourlyTemperatureLast.innerHTML = `${Math.round(data.list[4].main.temp - 273.15)} &deg;`;
    const $hourlyIconLast = document.getElementById("hourly-21-icon");
    $hourlyIconLast.setAttribute("src", `https://openweathermap.org/img/wn/${data.list[4].weather[0].icon}@2x.png`);
  };

  function getResponse() {
    const API_KEY = "d6e7fd6926ec77363ffce0e10bfe83b3";
    const BASE_URL = `https://api.openweathermap.org/data/2.5/weather?q=`;
    const SECONDARY_URL = `https://api.openweathermap.org/data/2.5/forecast?q=`;
    const $cards = document.getElementById("cards");
    const $cardsInfo = document.getElementById("cards-info");
    const $infoDetails = document.getElementById("info-details");
    const $infoTitle = document.getElementById("info-title");
    const $input = document.getElementById("input");
    const dailyInfoItems = document.getElementsByClassName("info__daily-info");
    const $searchButton = document.getElementById("button");
    const $searchIcon = document.getElementById("search-icon");

    const getSearchUrl = city => {
      return `${BASE_URL}${city}&units=celsius&appid=${API_KEY}`;
    };

    const getSearchUrlForDays = city => {
      return `${SECONDARY_URL}${city}&units=celsius&appid=${API_KEY}`;
    };

    const getResponse = query => {
      if (query) {
        fetch(getSearchUrl(query)).then(res => res.json()).then(data => {
          showWeatherInfo(data);
        }).catch(err => {
          console.log(err);
          const $cityName = document.getElementById("city-name");
          $cityName.innerText = `"${query}" - is wrong City name!`;
        });
      }
    };

    const getResponseForDays = query => {
      if (query) {
        fetch(getSearchUrlForDays(query)).then(res => res.json()).then(data => {
          showWeatherHourlyInfo(data);
          console.log(data);
        }).catch(err => {
          console.log(err);
          const $cityName = document.getElementById("city-name");
          $cityName.innerText = `"${query}" - is wrong City name!`;
        });
      }
    };

    document.addEventListener("click", event => {
      if (event.target == $searchButton || event.target == $searchIcon) {
        getResponse($input.value.toLowerCase());
        getResponseForDays($input.value.toLowerCase());
      }
    });
    document.addEventListener("keypress", event => {
      if (event.target == $input && event.code == "Enter") {
        getResponse($input.value.toLowerCase());
        getResponseForDays($input.value.toLowerCase());
      }
    });
  }

  slowVideo();
  useBurgerMenu();
  changeBG();
  getResponse();

}());

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsic3JjL2pzL3NjcmlwdHMvYnVyZ2VyLmpzIiwic3JjL2pzL3NjcmlwdHMvdmlkZW8uanMiLCJzcmMvanMvc2NyaXB0cy9iZy5qcyIsInNyYy9qcy9zY3JpcHRzL3JlbmRlci5qcyIsInNyYy9qcy9zY3JpcHRzL2FwaS5qcyIsInNyYy9qcy9tYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xyXG5leHBvcnQgZnVuY3Rpb24gdXNlQnVyZ2VyTWVudSgpIHtcclxuICBjb25zdCAkYnVyZ2VyQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJidXJnZXJcIik7XHJcbiAgY29uc3QgJGJ1cmdlclN0cmlwZXMgPSAkYnVyZ2VyQnRuLmNoaWxkcmVuO1xyXG4gIGNvbnN0ICRidXJnZXJNZW51ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJidXJnZXItbWVudVwiKTtcclxuICBjb25zdCAkZmlyc3RTdHJpcGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZpcnN0LXN0cmlwZVwiKTtcclxuICBjb25zdCAkc2Vjb25kU3RyaXBlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzZWNvbmQtc3RyaXBlXCIpO1xyXG4gIGNvbnN0ICR0aGlyZFN0cmlwZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGhpcmQtc3RyaXBlXCIpO1xyXG4gIGNvbnN0ICRidXJnZXJNZW51TGlzdEl0ZW1zID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtZW51LWxpc3RcIik7XHJcbiAgbGV0IHRvcENvdW50ZXIgPSAtNDA7XHJcbiAgbGV0IHJpZ2h0Q291bnRlciA9IDQwO1xyXG4gIGxldCBjb3VudCA9IDkwO1xyXG5cclxuICBmdW5jdGlvbiBjaGFuZ2VWaXNpYmlsaXR5VG9oaWRkZW4oKSB7XHJcbiAgICAkYnVyZ2VyTWVudS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgfVxyXG4gIGZ1bmN0aW9uIGNoYW5nZVZpc2liaWxpdHlUb1Zpc2libGUoKSB7XHJcbiAgICAkYnVyZ2VyTWVudS5zdHlsZS5kaXNwbGF5ID0gXCJmbGV4XCI7XHJcbiAgfVxyXG4gIGZ1bmN0aW9uIHJldHVybkRpcmVjdGlvbigpIHtcclxuICAgIHRvcENvdW50ZXIgPSAtNDA7XHJcbiAgICByaWdodENvdW50ZXIgPSA0MDtcclxuICAgICRidXJnZXJNZW51LnN0eWxlLnRvcCA9IGAke3RvcENvdW50ZXJ9cHhgO1xyXG4gICAgJGJ1cmdlck1lbnUuc3R5bGUucmlnaHQgPSBgJHtyaWdodENvdW50ZXJ9cHhgO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gbW92ZVRvcCgpIHtcclxuICAgIGlmIChjb3VudCA9PSAtNDApIHtcclxuICAgICAgcmV0dXJuIChjb3VudCA9IDkwKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICRidXJnZXJNZW51LnN0eWxlLnRvcCA9IGAkeyhjb3VudCAtPSA1KX1weGA7XHJcbiAgICB9XHJcbiAgICBzZXRUaW1lb3V0KG1vdmVUb3AsIDEpO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gYW5pbWF0ZU1lbnVCYWNrKCkge1xyXG4gICAgbW92ZVRvcCgpO1xyXG4gICAgc2V0VGltZW91dChjaGFuZ2VWaXNpYmlsaXR5VG9oaWRkZW4sIDUwKTtcclxuICAgIHNldFRpbWVvdXQocmV0dXJuRGlyZWN0aW9uLCA1MDApO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gYW5pbWF0ZU1lbnVGb3J3YXJkKCkge1xyXG4gICAgY2hhbmdlVmlzaWJpbGl0eVRvVmlzaWJsZSgpO1xyXG4gICAgaWYgKHJpZ2h0Q291bnRlciA9PSAzNjApIHJldHVybiB0cnVlO1xyXG4gICAgaWYgKHRvcENvdW50ZXIgPCA5MCAmJiByaWdodENvdW50ZXIgPT0gNDApIHtcclxuICAgICAgJGJ1cmdlck1lbnUuc3R5bGUudG9wID0gYCR7KHRvcENvdW50ZXIgKz0gMTApfXB4YDtcclxuICAgIH1cclxuICAgIGlmICh0b3BDb3VudGVyID09IDkwICYmIHJpZ2h0Q291bnRlciA8IDM2MCkge1xyXG4gICAgICAkYnVyZ2VyTWVudS5zdHlsZS5yaWdodCA9IGAkeyhyaWdodENvdW50ZXIgKz0gMTApfXB4YDtcclxuICAgIH1cclxuICAgIHNldFRpbWVvdXQoYW5pbWF0ZU1lbnVGb3J3YXJkLCA1KTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHJlbW92ZVN0cmlwZXNDaGFuZ2VzKCkge1xyXG4gICAgJGZpcnN0U3RyaXBlLmNsYXNzTGlzdC5yZW1vdmUoXCJwdXNoZWRcIik7XHJcbiAgICAkc2Vjb25kU3RyaXBlLmNsYXNzTGlzdC5yZW1vdmUoXCJwdXNoZWRcIik7XHJcbiAgICAkdGhpcmRTdHJpcGUuY2xhc3NMaXN0LnJlbW92ZShcInB1c2hlZFwiKTtcclxuICB9XHJcbiAgZnVuY3Rpb24gYWRkU3RyaXBlQ2hhbmdlcygpIHtcclxuICAgICRmaXJzdFN0cmlwZS5jbGFzc0xpc3QuYWRkKFwicHVzaGVkXCIpO1xyXG4gICAgJHNlY29uZFN0cmlwZS5jbGFzc0xpc3QuYWRkKFwicHVzaGVkXCIpO1xyXG4gICAgJHRoaXJkU3RyaXBlLmNsYXNzTGlzdC5hZGQoXCJwdXNoZWRcIik7XHJcbiAgfVxyXG5cclxuICBjb25zdCB1c2VCdXJnZXIgPSAoKSA9PiB7XHJcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50KSA9PiB7XHJcbiAgICAgIGlmIChcclxuICAgICAgICBldmVudC50YXJnZXQgPT09ICRidXJnZXJCdG4gfHxcclxuICAgICAgICBldmVudC50YXJnZXQgPT09ICRidXJnZXJTdHJpcGVzWzBdIHx8XHJcbiAgICAgICAgZXZlbnQudGFyZ2V0ID09PSAkYnVyZ2VyU3RyaXBlc1sxXSB8fFxyXG4gICAgICAgIGV2ZW50LnRhcmdldCA9PT0gJGJ1cmdlclN0cmlwZXNbMl1cclxuICAgICAgKSB7XHJcbiAgICAgICAgaWYgKCRmaXJzdFN0cmlwZS5jbGFzc0xpc3RbMV0gPT0gXCJwdXNoZWRcIikge1xyXG4gICAgICAgICAgcmVtb3ZlU3RyaXBlc0NoYW5nZXMoKTtcclxuICAgICAgICAgIGFuaW1hdGVNZW51QmFjaygpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBhZGRTdHJpcGVDaGFuZ2VzKCk7XHJcbiAgICAgICAgICBhbmltYXRlTWVudUZvcndhcmQoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChcclxuICAgICAgICBldmVudC50YXJnZXQgPT09ICRidXJnZXJNZW51TGlzdEl0ZW1zLmNoaWxkcmVuWzBdIHx8XHJcbiAgICAgICAgZXZlbnQudGFyZ2V0ID09PSAkYnVyZ2VyTWVudUxpc3RJdGVtcy5jaGlsZHJlblsxXSB8fFxyXG4gICAgICAgIGV2ZW50LnRhcmdldCA9PT0gJGJ1cmdlck1lbnVMaXN0SXRlbXMuY2hpbGRyZW5bMl0gfHxcclxuICAgICAgICBldmVudC50YXJnZXQgPT09ICRidXJnZXJNZW51TGlzdEl0ZW1zLmNoaWxkcmVuWzNdXHJcbiAgICAgICkge1xyXG4gICAgICAgIGFuaW1hdGVNZW51QmFjaygpO1xyXG4gICAgICAgIHJlbW92ZVN0cmlwZXNDaGFuZ2VzKCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH07XHJcbiAgdXNlQnVyZ2VyKCk7XHJcbn1cclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc2xvd1ZpZGVvKCkge1xyXG4gIGNvbnN0IHBsYXllciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidmlkZW9cIik7XHJcbiAgcGxheWVyLnBsYXliYWNrUmF0ZSA9IDAuNDtcclxufVxyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuZXhwb3J0IGZ1bmN0aW9uIGNoYW5nZUJHKCkge1xyXG4gIGNvbnN0ICRidXR0b25TdW5ueSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3VubnlcIik7XHJcbiAgY29uc3QgJGJ1dHRvblJhaW55ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyYWlueVwiKTtcclxuICBjb25zdCAkYnV0dG9uRm9nZ3kgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZvZ2d5XCIpO1xyXG4gIGNvbnN0ICRidXR0b25UaHVuZGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0aHVuZGVyXCIpO1xyXG4gIGNvbnN0ICR2aWRlb1NvdXJjZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidmlkZW8tc291cmNlXCIpO1xyXG4gIGNvbnN0ICR2aWRlbyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidmlkZW9cIik7XHJcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudCkgPT4ge1xyXG4gICAgaWYgKGV2ZW50LnRhcmdldCA9PSAkYnV0dG9uU3VubnkpIHtcclxuICAgICAgJHZpZGVvLnNyYyA9IFwiaW1hZ2VzL3N1bm55Lm1wNFwiO1xyXG4gICAgICAkdmlkZW8ucG9zdGVyID0gXCJpbWFnZXMvc3VubnktcG9zdGVyLmpwZ1wiO1xyXG4gICAgfVxyXG4gICAgaWYgKGV2ZW50LnRhcmdldCA9PSAkYnV0dG9uUmFpbnkpIHtcclxuICAgICAgJHZpZGVvLnNyYyA9IFwiaW1hZ2VzL3JhaW55Lm1wNFwiO1xyXG4gICAgICAkdmlkZW8ucG9zdGVyID0gXCJpbWFnZXMvcmFpbnktcG9zdGVyLmpwZ1wiO1xyXG4gICAgfVxyXG4gICAgaWYgKGV2ZW50LnRhcmdldCA9PSAkYnV0dG9uRm9nZ3kpIHtcclxuICAgICAgJHZpZGVvLnNyYyA9IFwiaW1hZ2VzL2ZvZ2d5Lm1wNFwiO1xyXG4gICAgICAkdmlkZW8ucG9zdGVyID0gXCJpbWFnZXMvZm9nZ3ktcG9zdGVyLmpwZ1wiO1xyXG4gICAgfVxyXG4gICAgaWYgKGV2ZW50LnRhcmdldCA9PSAkYnV0dG9uVGh1bmRlcikge1xyXG4gICAgICAkdmlkZW8uc3JjID0gXCJpbWFnZXMvdGh1bmRlci5tcDRcIjtcclxuICAgICAgJHZpZGVvLnBvc3RlciA9IFwiaW1hZ2VzL3RodW5kZXItcG9zdGVyLmpwZ1wiO1xyXG4gICAgfVxyXG4gIH0pO1xyXG59XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5leHBvcnQgY29uc3Qgc2hvd1dlYXRoZXJJbmZvID0gKGRhdGEpID0+IHtcclxuICBjb25zdCAkY2l0eU5hbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNpdHktbmFtZVwiKTtcclxuICBjb25zdCBjaXR5TmFtZSA9IGRhdGEubmFtZTtcclxuICBjb25zdCBjaXR5Q291bnRyeSA9IGRhdGEuc3lzLmNvdW50cnk7XHJcbiAgY29uc3QgJHRlbXBlcmF0dXJlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0ZW1wZXJhdHVyZVwiKTtcclxuICBjb25zdCBjdXJyZW50VGVtcCA9IE1hdGgucm91bmQoZGF0YS5tYWluLnRlbXAgLSAyNzMuMTUpO1xyXG4gIGNvbnN0ICRodW1pZGl0eUluZm8gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImh1bWlkaXR5LWluZm9cIik7XHJcbiAgY29uc3QgaHVtaWRpdHkgPSBkYXRhLm1haW4uaHVtaWRpdHk7XHJcbiAgY29uc3QgJHByZXNzdXJlSW5mbyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJlc3N1cmUtaW5mb1wiKTtcclxuICBjb25zdCBwcmVzc3VyZSA9IGRhdGEubWFpbi5wcmVzc3VyZTtcclxuICBjb25zdCBjdXJyZW50V2VhdGhlciA9IGRhdGEud2VhdGhlclswXS5tYWluO1xyXG4gIGNvbnN0ICR3aW5kRGlySW5mbyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwid2luZC1kaXItaW5mb1wiKTtcclxuICBjb25zdCB3aW5kRGlyZWN0aW9uID0gZGF0YS53aW5kLmRlZztcclxuICBjb25zdCAkd2luZFNwZWVkSW5mbyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwid2luZC1zcGVlZC1pbmZvXCIpO1xyXG4gIGNvbnN0IHdpbmRTcGVlZCA9IGRhdGEud2luZC5zcGVlZDtcclxuICBjb25zdCAkd2VhdGhlckljb25CaWcgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIndlYXRoZXItaWNvbi1iaWdcIik7XHJcbiAgY29uc3QgaWNvbiA9IGBodHRwczovL29wZW53ZWF0aGVybWFwLm9yZy9pbWcvd24vJHtkYXRhLndlYXRoZXJbMF0uaWNvbn1AMngucG5nYDtcclxuICAkY2l0eU5hbWUuaW5uZXJUZXh0ID0gYCR7Y2l0eU5hbWV9LCAke2NpdHlDb3VudHJ5fWA7XHJcbiAgaWYgKGNpdHlDb3VudHJ5ID09IHVuZGVmaW5lZCkge1xyXG4gICAgJGNpdHlOYW1lLmlubmVyVGV4dCA9IGAke2NpdHlOYW1lfWA7XHJcbiAgfVxyXG4gICR0ZW1wZXJhdHVyZS5pbm5lckhUTUwgPSBgJHtjdXJyZW50VGVtcH0gJmRlZztgO1xyXG4gICR3ZWF0aGVySWNvbkJpZy5zZXRBdHRyaWJ1dGUoXCJzcmNcIiwgaWNvbik7XHJcbiAgJGh1bWlkaXR5SW5mby5pbm5lclRleHQgPSBgSHVtaWRpdHk6ICAke2h1bWlkaXR5fSVgO1xyXG4gICRwcmVzc3VyZUluZm8uaW5uZXJUZXh0ID0gYFByZXNzdXJlOiAke3ByZXNzdXJlfSBoUGFgO1xyXG4gICR3aW5kRGlySW5mby5pbm5lclRleHQgPSBgV2luZCBEaXJlY3Rpb246ICR7d2luZERpcmVjdGlvbn0gZGVnYDtcclxuICAkd2luZFNwZWVkSW5mby5pbm5lclRleHQgPSBgV2luZCBTcGVlZDogJHt3aW5kU3BlZWR9IG1wc2A7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3Qgc2hvd1dlYXRoZXJIb3VybHlJbmZvID0gKGRhdGEpID0+IHtcclxuICBjb25zdCAkZGF0ZVRpbWVGaXJzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZmlyc3RUaW1lXCIpO1xyXG4gICRkYXRlVGltZUZpcnN0LmlubmVyVGV4dCA9IGRhdGEubGlzdFswXS5kdF90eHQ7XHJcbiAgY29uc3QgJGhvdXJseUh1bWlkaXR5Rmlyc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImhvdXJseS0wMC1odW1pZGl0eVwiKTtcclxuICAkaG91cmx5SHVtaWRpdHlGaXJzdC5pbm5lclRleHQgPSBgSHVtaWRpdHk6ICAke2RhdGEubGlzdFswXS5tYWluLmh1bWlkaXR5fSVgO1xyXG4gIGNvbnN0ICRob3VybHlQcmVzc3VyZUZpcnN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJob3VybHktMDAtcHJlc3N1cmVcIik7XHJcbiAgJGhvdXJseVByZXNzdXJlRmlyc3QuaW5uZXJUZXh0ID0gYFByZXNzdXJlOiAke2RhdGEubGlzdFswXS5tYWluLnByZXNzdXJlfSBoUGFgO1xyXG4gIGNvbnN0ICRob3VybHlXZGlyRmlyc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImhvdXJseS0wMC13ZGlyXCIpO1xyXG4gICRob3VybHlXZGlyRmlyc3QuaW5uZXJUZXh0ID0gYFdpbmQgRGlyZWN0aW9uOiAke2RhdGEubGlzdFswXS53aW5kLmRlZ30gZGVnYDtcclxuICBjb25zdCAkaG91cmx5V3NwZWVkRmlyc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImhvdXJseS0wMC13c3BlZWRcIik7XHJcbiAgJGhvdXJseVdzcGVlZEZpcnN0LmlubmVyVGV4dCA9IGBXaW5kIFNwZWVkOiAke2RhdGEubGlzdFswXS53aW5kLnNwZWVkfSBtcHNgO1xyXG4gIGNvbnN0ICRob3VybHlUZW1wZXJhdHVyZUZpcnN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXHJcbiAgICBcImhvdXJseS0wMC10ZW1wZXJhdHVyZVwiXHJcbiAgKTtcclxuICAkaG91cmx5VGVtcGVyYXR1cmVGaXJzdC5pbm5lckhUTUwgPSBgJHtNYXRoLnJvdW5kKFxyXG4gICAgZGF0YS5saXN0WzBdLm1haW4udGVtcCAtIDI3My4xNVxyXG4gICl9ICZkZWc7YDtcclxuICBjb25zdCAkaG91cmx5SWNvbkZpcnN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJob3VybHktMDAtaWNvblwiKTtcclxuICAkaG91cmx5SWNvbkZpcnN0LnNldEF0dHJpYnV0ZShcclxuICAgIFwic3JjXCIsXHJcbiAgICBgaHR0cHM6Ly9vcGVud2VhdGhlcm1hcC5vcmcvaW1nL3duLyR7ZGF0YS5saXN0WzBdLndlYXRoZXJbMF0uaWNvbn1AMngucG5nYFxyXG4gICk7XHJcblxyXG4gIGNvbnN0ICRkYXRlVGltZVNlY29uZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2Vjb25kVGltZVwiKTtcclxuICAkZGF0ZVRpbWVTZWNvbmQuaW5uZXJUZXh0ID0gZGF0YS5saXN0WzFdLmR0X3R4dDtcclxuICBjb25zdCAkaG91cmx5SHVtaWRpdHlzZWNvbmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImhvdXJseS0wNi1odW1pZGl0eVwiKTtcclxuICAkaG91cmx5SHVtaWRpdHlzZWNvbmQuaW5uZXJUZXh0ID0gYEh1bWlkaXR5OiAgJHtkYXRhLmxpc3RbMV0ubWFpbi5odW1pZGl0eX0lYDtcclxuICBjb25zdCAkaG91cmx5UHJlc3N1cmVzZWNvbmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImhvdXJseS0wNi1wcmVzc3VyZVwiKTtcclxuICAkaG91cmx5UHJlc3N1cmVzZWNvbmQuaW5uZXJUZXh0ID0gYFByZXNzdXJlOiAke2RhdGEubGlzdFsxXS5tYWluLnByZXNzdXJlfSBoUGFgO1xyXG4gIGNvbnN0ICRob3VybHlXZGlyc2Vjb25kID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJob3VybHktMDYtd2RpclwiKTtcclxuICAkaG91cmx5V2RpcnNlY29uZC5pbm5lclRleHQgPSBgV2luZCBEaXJlY3Rpb246ICR7ZGF0YS5saXN0WzFdLndpbmQuZGVnfSBkZWdgO1xyXG4gIGNvbnN0ICRob3VybHlXc3BlZWRzZWNvbmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImhvdXJseS0wNi13c3BlZWRcIik7XHJcbiAgJGhvdXJseVdzcGVlZHNlY29uZC5pbm5lclRleHQgPSBgV2luZCBTcGVlZDogJHtkYXRhLmxpc3RbMV0ud2luZC5zcGVlZH0gbXBzYDtcclxuICBjb25zdCAkaG91cmx5VGVtcGVyYXR1cmVzZWNvbmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcclxuICAgIFwiaG91cmx5LTA2LXRlbXBlcmF0dXJlXCJcclxuICApO1xyXG4gICRob3VybHlUZW1wZXJhdHVyZXNlY29uZC5pbm5lckhUTUwgPSBgJHtNYXRoLnJvdW5kKFxyXG4gICAgZGF0YS5saXN0WzFdLm1haW4udGVtcCAtIDI3My4xNVxyXG4gICl9ICZkZWc7YDtcclxuICBjb25zdCAkaG91cmx5SWNvbnNlY29uZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaG91cmx5LTA2LWljb25cIik7XHJcbiAgJGhvdXJseUljb25zZWNvbmQuc2V0QXR0cmlidXRlKFxyXG4gICAgXCJzcmNcIixcclxuICAgIGBodHRwczovL29wZW53ZWF0aGVybWFwLm9yZy9pbWcvd24vJHtkYXRhLmxpc3RbMV0ud2VhdGhlclswXS5pY29ufUAyeC5wbmdgXHJcbiAgKTtcclxuXHJcbiAgY29uc3QgJGRhdGVUaW1lVGhpcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRoaXJkVGltZVwiKTtcclxuICAkZGF0ZVRpbWVUaGlyZC5pbm5lclRleHQgPSBkYXRhLmxpc3RbMl0uZHRfdHh0O1xyXG4gIGNvbnN0ICRob3VybHlIdW1pZGl0eVRoaXJkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJob3VybHktMTItaHVtaWRpdHlcIik7XHJcbiAgJGhvdXJseUh1bWlkaXR5VGhpcmQuaW5uZXJUZXh0ID0gYEh1bWlkaXR5OiAgJHtkYXRhLmxpc3RbMl0ubWFpbi5odW1pZGl0eX0lYDtcclxuICBjb25zdCAkaG91cmx5UHJlc3N1cmVUaGlyZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaG91cmx5LTEyLXByZXNzdXJlXCIpO1xyXG4gICRob3VybHlQcmVzc3VyZVRoaXJkLmlubmVyVGV4dCA9IGBQcmVzc3VyZTogJHtkYXRhLmxpc3RbMl0ubWFpbi5wcmVzc3VyZX0gaFBhYDtcclxuICBjb25zdCAkaG91cmx5V2RpclRoaXJkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJob3VybHktMTItd2RpclwiKTtcclxuICAkaG91cmx5V2RpclRoaXJkLmlubmVyVGV4dCA9IGBXaW5kIERpcmVjdGlvbjogJHtkYXRhLmxpc3RbMl0ud2luZC5kZWd9IGRlZ2A7XHJcbiAgY29uc3QgJGhvdXJseVdzcGVlZFRoaXJkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJob3VybHktMTItd3NwZWVkXCIpO1xyXG4gICRob3VybHlXc3BlZWRUaGlyZC5pbm5lclRleHQgPSBgV2luZCBTcGVlZDogJHtkYXRhLmxpc3RbMl0ud2luZC5zcGVlZH0gbXBzYDtcclxuICBjb25zdCAkaG91cmx5VGVtcGVyYXR1cmVUaGlyZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFxyXG4gICAgXCJob3VybHktMTItdGVtcGVyYXR1cmVcIlxyXG4gICk7XHJcbiAgJGhvdXJseVRlbXBlcmF0dXJlVGhpcmQuaW5uZXJIVE1MID0gYCR7TWF0aC5yb3VuZChcclxuICAgIGRhdGEubGlzdFsyXS5tYWluLnRlbXAgLSAyNzMuMTVcclxuICApfSAmZGVnO2A7XHJcbiAgY29uc3QgJGhvdXJseUljb25UaGlyZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaG91cmx5LTEyLWljb25cIik7XHJcbiAgJGhvdXJseUljb25UaGlyZC5zZXRBdHRyaWJ1dGUoXHJcbiAgICBcInNyY1wiLFxyXG4gICAgYGh0dHBzOi8vb3BlbndlYXRoZXJtYXAub3JnL2ltZy93bi8ke2RhdGEubGlzdFsyXS53ZWF0aGVyWzBdLmljb259QDJ4LnBuZ2BcclxuICApO1xyXG5cclxuICBjb25zdCAkZGF0ZVRpbWVGb3VydGggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZvdXJ0aFRpbWVcIik7XHJcbiAgJGRhdGVUaW1lRm91cnRoLmlubmVyVGV4dCA9IGRhdGEubGlzdFszXS5kdF90eHQ7XHJcbiAgY29uc3QgJGhvdXJseUh1bWlkaXR5Rm91cnRoID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJob3VybHktMTgtaHVtaWRpdHlcIik7XHJcbiAgJGhvdXJseUh1bWlkaXR5Rm91cnRoLmlubmVyVGV4dCA9IGBIdW1pZGl0eTogICR7ZGF0YS5saXN0WzNdLm1haW4uaHVtaWRpdHl9JWA7XHJcbiAgY29uc3QgJGhvdXJseVByZXNzdXJlRm91cnRoID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJob3VybHktMTgtcHJlc3N1cmVcIik7XHJcbiAgJGhvdXJseVByZXNzdXJlRm91cnRoLmlubmVyVGV4dCA9IGBQcmVzc3VyZTogJHtkYXRhLmxpc3RbM10ubWFpbi5wcmVzc3VyZX0gaFBhYDtcclxuICBjb25zdCAkaG91cmx5V2RpckZvdXJ0aCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaG91cmx5LTE4LXdkaXJcIik7XHJcbiAgJGhvdXJseVdkaXJGb3VydGguaW5uZXJUZXh0ID0gYFdpbmQgRGlyZWN0aW9uOiAke2RhdGEubGlzdFszXS53aW5kLmRlZ30gZGVnYDtcclxuICBjb25zdCAkaG91cmx5V3NwZWVkRm91cnRoID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJob3VybHktMTgtd3NwZWVkXCIpO1xyXG4gICRob3VybHlXc3BlZWRGb3VydGguaW5uZXJUZXh0ID0gYFdpbmQgU3BlZWQ6ICR7ZGF0YS5saXN0WzNdLndpbmQuc3BlZWR9IG1wc2A7XHJcbiAgY29uc3QgJGhvdXJseVRlbXBlcmF0dXJlRm91cnRoID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXHJcbiAgICBcImhvdXJseS0xOC10ZW1wZXJhdHVyZVwiXHJcbiAgKTtcclxuICAkaG91cmx5VGVtcGVyYXR1cmVGb3VydGguaW5uZXJIVE1MID0gYCR7TWF0aC5yb3VuZChcclxuICAgIGRhdGEubGlzdFszXS5tYWluLnRlbXAgLSAyNzMuMTVcclxuICApfSAmZGVnO2A7XHJcbiAgY29uc3QgJGhvdXJseUljb25Gb3VydGggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImhvdXJseS0xOC1pY29uXCIpO1xyXG4gICRob3VybHlJY29uRm91cnRoLnNldEF0dHJpYnV0ZShcclxuICAgIFwic3JjXCIsXHJcbiAgICBgaHR0cHM6Ly9vcGVud2VhdGhlcm1hcC5vcmcvaW1nL3duLyR7ZGF0YS5saXN0WzNdLndlYXRoZXJbMF0uaWNvbn1AMngucG5nYFxyXG4gICk7XHJcblxyXG4gIGNvbnN0ICRkYXRlVGltZUxhc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxhc3RUaW1lXCIpO1xyXG4gICRkYXRlVGltZUxhc3QuaW5uZXJUZXh0ID0gZGF0YS5saXN0WzRdLmR0X3R4dDtcclxuICBjb25zdCAkaG91cmx5SHVtaWRpdHlMYXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJob3VybHktMjEtaHVtaWRpdHlcIik7XHJcbiAgJGhvdXJseUh1bWlkaXR5TGFzdC5pbm5lclRleHQgPSBgSHVtaWRpdHk6ICAke2RhdGEubGlzdFs0XS5tYWluLmh1bWlkaXR5fSVgO1xyXG4gIGNvbnN0ICRob3VybHlQcmVzc3VyZUxhc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImhvdXJseS0yMS1wcmVzc3VyZVwiKTtcclxuICAkaG91cmx5UHJlc3N1cmVMYXN0LmlubmVyVGV4dCA9IGBQcmVzc3VyZTogJHtkYXRhLmxpc3RbNF0ubWFpbi5wcmVzc3VyZX0gaFBhYDtcclxuICBjb25zdCAkaG91cmx5V2Rpckxhc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImhvdXJseS0yMS13ZGlyXCIpO1xyXG4gICRob3VybHlXZGlyTGFzdC5pbm5lclRleHQgPSBgV2luZCBEaXJlY3Rpb246ICR7ZGF0YS5saXN0WzRdLndpbmQuZGVnfSBkZWdgO1xyXG4gIGNvbnN0ICRob3VybHlXc3BlZWRMYXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJob3VybHktMjEtd3NwZWVkXCIpO1xyXG4gICRob3VybHlXc3BlZWRMYXN0LmlubmVyVGV4dCA9IGBXaW5kIFNwZWVkOiAke2RhdGEubGlzdFs0XS53aW5kLnNwZWVkfSBtcHNgO1xyXG4gIGNvbnN0ICRob3VybHlUZW1wZXJhdHVyZUxhc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcclxuICAgIFwiaG91cmx5LTIxLXRlbXBlcmF0dXJlXCJcclxuICApO1xyXG4gICRob3VybHlUZW1wZXJhdHVyZUxhc3QuaW5uZXJIVE1MID0gYCR7TWF0aC5yb3VuZChcclxuICAgIGRhdGEubGlzdFs0XS5tYWluLnRlbXAgLSAyNzMuMTVcclxuICApfSAmZGVnO2A7XHJcbiAgY29uc3QgJGhvdXJseUljb25MYXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJob3VybHktMjEtaWNvblwiKTtcclxuICAkaG91cmx5SWNvbkxhc3Quc2V0QXR0cmlidXRlKFxyXG4gICAgXCJzcmNcIixcclxuICAgIGBodHRwczovL29wZW53ZWF0aGVybWFwLm9yZy9pbWcvd24vJHtkYXRhLmxpc3RbNF0ud2VhdGhlclswXS5pY29ufUAyeC5wbmdgXHJcbiAgKTtcclxufTtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbmltcG9ydCB7IHNob3dXZWF0aGVySW5mbywgc2hvd1dlYXRoZXJIb3VybHlJbmZvIH0gZnJvbSBcIi4vcmVuZGVyXCI7XHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRSZXNwb25zZSgpIHtcclxuICBjb25zdCBBUElfS0VZID0gXCJkNmU3ZmQ2OTI2ZWM3NzM2M2ZmY2UwZTEwYmZlODNiM1wiO1xyXG4gIGNvbnN0IEJBU0VfVVJMID0gYGh0dHBzOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9kYXRhLzIuNS93ZWF0aGVyP3E9YDtcclxuICBjb25zdCBTRUNPTkRBUllfVVJMID0gYGh0dHBzOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9kYXRhLzIuNS9mb3JlY2FzdD9xPWA7XHJcbiAgY29uc3QgJGNhcmRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjYXJkc1wiKTtcclxuICBjb25zdCAkY2FyZHNJbmZvID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjYXJkcy1pbmZvXCIpO1xyXG4gIGNvbnN0ICRpbmZvRGV0YWlscyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaW5mby1kZXRhaWxzXCIpO1xyXG4gIGNvbnN0ICRpbmZvVGl0bGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImluZm8tdGl0bGVcIik7XHJcbiAgY29uc3QgJGlucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpbnB1dFwiKTtcclxuICBjb25zdCBkYWlseUluZm9JdGVtcyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJpbmZvX19kYWlseS1pbmZvXCIpO1xyXG4gIGNvbnN0ICRzZWFyY2hCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJ1dHRvblwiKTtcclxuICBjb25zdCAkc2VhcmNoSWNvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2VhcmNoLWljb25cIik7XHJcblxyXG4gIGNvbnN0IGdldFNlYXJjaFVybCA9IChjaXR5KSA9PiB7XHJcbiAgICByZXR1cm4gYCR7QkFTRV9VUkx9JHtjaXR5fSZ1bml0cz1jZWxzaXVzJmFwcGlkPSR7QVBJX0tFWX1gO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IGdldFNlYXJjaFVybEZvckRheXMgPSAoY2l0eSkgPT4ge1xyXG4gICAgcmV0dXJuIGAke1NFQ09OREFSWV9VUkx9JHtjaXR5fSZ1bml0cz1jZWxzaXVzJmFwcGlkPSR7QVBJX0tFWX1gO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IGdldFJlc3BvbnNlID0gKHF1ZXJ5KSA9PiB7XHJcbiAgICBpZiAocXVlcnkpIHtcclxuICAgICAgZmV0Y2goZ2V0U2VhcmNoVXJsKHF1ZXJ5KSlcclxuICAgICAgICAudGhlbigocmVzKSA9PiByZXMuanNvbigpKVxyXG4gICAgICAgIC50aGVuKChkYXRhKSA9PiB7XHJcbiAgICAgICAgICBzaG93V2VhdGhlckluZm8oZGF0YSk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goKGVycikgPT4ge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgICAgICAgIGNvbnN0ICRjaXR5TmFtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2l0eS1uYW1lXCIpO1xyXG4gICAgICAgICAgJGNpdHlOYW1lLmlubmVyVGV4dCA9IGBcIiR7cXVlcnl9XCIgLSBpcyB3cm9uZyBDaXR5IG5hbWUhYDtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICB9O1xyXG4gIGNvbnN0IGdldFJlc3BvbnNlRm9yRGF5cyA9IChxdWVyeSkgPT4ge1xyXG4gICAgaWYgKHF1ZXJ5KSB7XHJcbiAgICAgIGZldGNoKGdldFNlYXJjaFVybEZvckRheXMocXVlcnkpKVxyXG4gICAgICAgIC50aGVuKChyZXMpID0+IHJlcy5qc29uKCkpXHJcbiAgICAgICAgLnRoZW4oKGRhdGEpID0+IHtcclxuICAgICAgICAgIHNob3dXZWF0aGVySG91cmx5SW5mbyhkYXRhKTtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKChlcnIpID0+IHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICAgICAgICBjb25zdCAkY2l0eU5hbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNpdHktbmFtZVwiKTtcclxuICAgICAgICAgICRjaXR5TmFtZS5pbm5lclRleHQgPSBgXCIke3F1ZXJ5fVwiIC0gaXMgd3JvbmcgQ2l0eSBuYW1lIWA7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudCkgPT4ge1xyXG4gICAgaWYgKGV2ZW50LnRhcmdldCA9PSAkc2VhcmNoQnV0dG9uIHx8IGV2ZW50LnRhcmdldCA9PSAkc2VhcmNoSWNvbikge1xyXG4gICAgICBnZXRSZXNwb25zZSgkaW5wdXQudmFsdWUudG9Mb3dlckNhc2UoKSk7XHJcbiAgICAgIGdldFJlc3BvbnNlRm9yRGF5cygkaW5wdXQudmFsdWUudG9Mb3dlckNhc2UoKSk7XHJcbiAgICB9XHJcbiAgfSk7XHJcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleXByZXNzXCIsIChldmVudCkgPT4ge1xyXG4gICAgaWYgKGV2ZW50LnRhcmdldCA9PSAkaW5wdXQgJiYgZXZlbnQuY29kZSA9PSBcIkVudGVyXCIpIHtcclxuICAgICAgZ2V0UmVzcG9uc2UoJGlucHV0LnZhbHVlLnRvTG93ZXJDYXNlKCkpO1xyXG4gICAgICBnZXRSZXNwb25zZUZvckRheXMoJGlucHV0LnZhbHVlLnRvTG93ZXJDYXNlKCkpO1xyXG4gICAgfVxyXG4gIH0pO1xyXG59XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5pbXBvcnQgeyB1c2VCdXJnZXJNZW51IH0gZnJvbSBcIi4vc2NyaXB0cy9idXJnZXJcIjtcclxuaW1wb3J0IHsgc2xvd1ZpZGVvIH0gZnJvbSBcIi4vc2NyaXB0cy92aWRlb1wiO1xyXG5pbXBvcnQgeyBjaGFuZ2VCRyB9IGZyb20gXCIuL3NjcmlwdHMvYmdcIjtcclxuaW1wb3J0IHsgZ2V0UmVzcG9uc2UgfSBmcm9tIFwiLi9zY3JpcHRzL2FwaVwiO1xyXG5zbG93VmlkZW8oKTtcclxudXNlQnVyZ2VyTWVudSgpO1xyXG5jaGFuZ2VCRygpO1xyXG5nZXRSZXNwb25zZSgpO1xyXG4iXSwibmFtZXMiOlsidXNlQnVyZ2VyTWVudSIsIiRidXJnZXJCdG4iLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiJGJ1cmdlclN0cmlwZXMiLCJjaGlsZHJlbiIsIiRidXJnZXJNZW51IiwiJGZpcnN0U3RyaXBlIiwiJHNlY29uZFN0cmlwZSIsIiR0aGlyZFN0cmlwZSIsIiRidXJnZXJNZW51TGlzdEl0ZW1zIiwidG9wQ291bnRlciIsInJpZ2h0Q291bnRlciIsImNvdW50IiwiY2hhbmdlVmlzaWJpbGl0eVRvaGlkZGVuIiwic3R5bGUiLCJkaXNwbGF5IiwiY2hhbmdlVmlzaWJpbGl0eVRvVmlzaWJsZSIsInJldHVybkRpcmVjdGlvbiIsInRvcCIsInJpZ2h0IiwibW92ZVRvcCIsInNldFRpbWVvdXQiLCJhbmltYXRlTWVudUJhY2siLCJhbmltYXRlTWVudUZvcndhcmQiLCJyZW1vdmVTdHJpcGVzQ2hhbmdlcyIsImNsYXNzTGlzdCIsInJlbW92ZSIsImFkZFN0cmlwZUNoYW5nZXMiLCJhZGQiLCJ1c2VCdXJnZXIiLCJhZGRFdmVudExpc3RlbmVyIiwiZXZlbnQiLCJ0YXJnZXQiLCJzbG93VmlkZW8iLCJwbGF5ZXIiLCJwbGF5YmFja1JhdGUiLCJjaGFuZ2VCRyIsIiRidXR0b25TdW5ueSIsIiRidXR0b25SYWlueSIsIiRidXR0b25Gb2dneSIsIiRidXR0b25UaHVuZGVyIiwiJHZpZGVvU291cmNlIiwiJHZpZGVvIiwic3JjIiwicG9zdGVyIiwic2hvd1dlYXRoZXJJbmZvIiwiZGF0YSIsIiRjaXR5TmFtZSIsImNpdHlOYW1lIiwibmFtZSIsImNpdHlDb3VudHJ5Iiwic3lzIiwiY291bnRyeSIsIiR0ZW1wZXJhdHVyZSIsImN1cnJlbnRUZW1wIiwiTWF0aCIsInJvdW5kIiwibWFpbiIsInRlbXAiLCIkaHVtaWRpdHlJbmZvIiwiaHVtaWRpdHkiLCIkcHJlc3N1cmVJbmZvIiwicHJlc3N1cmUiLCJjdXJyZW50V2VhdGhlciIsIndlYXRoZXIiLCIkd2luZERpckluZm8iLCJ3aW5kRGlyZWN0aW9uIiwid2luZCIsImRlZyIsIiR3aW5kU3BlZWRJbmZvIiwid2luZFNwZWVkIiwic3BlZWQiLCIkd2VhdGhlckljb25CaWciLCJpY29uIiwiaW5uZXJUZXh0IiwidW5kZWZpbmVkIiwiaW5uZXJIVE1MIiwic2V0QXR0cmlidXRlIiwic2hvd1dlYXRoZXJIb3VybHlJbmZvIiwiJGRhdGVUaW1lRmlyc3QiLCJsaXN0IiwiZHRfdHh0IiwiJGhvdXJseUh1bWlkaXR5Rmlyc3QiLCIkaG91cmx5UHJlc3N1cmVGaXJzdCIsIiRob3VybHlXZGlyRmlyc3QiLCIkaG91cmx5V3NwZWVkRmlyc3QiLCIkaG91cmx5VGVtcGVyYXR1cmVGaXJzdCIsIiRob3VybHlJY29uRmlyc3QiLCIkZGF0ZVRpbWVTZWNvbmQiLCIkaG91cmx5SHVtaWRpdHlzZWNvbmQiLCIkaG91cmx5UHJlc3N1cmVzZWNvbmQiLCIkaG91cmx5V2RpcnNlY29uZCIsIiRob3VybHlXc3BlZWRzZWNvbmQiLCIkaG91cmx5VGVtcGVyYXR1cmVzZWNvbmQiLCIkaG91cmx5SWNvbnNlY29uZCIsIiRkYXRlVGltZVRoaXJkIiwiJGhvdXJseUh1bWlkaXR5VGhpcmQiLCIkaG91cmx5UHJlc3N1cmVUaGlyZCIsIiRob3VybHlXZGlyVGhpcmQiLCIkaG91cmx5V3NwZWVkVGhpcmQiLCIkaG91cmx5VGVtcGVyYXR1cmVUaGlyZCIsIiRob3VybHlJY29uVGhpcmQiLCIkZGF0ZVRpbWVGb3VydGgiLCIkaG91cmx5SHVtaWRpdHlGb3VydGgiLCIkaG91cmx5UHJlc3N1cmVGb3VydGgiLCIkaG91cmx5V2RpckZvdXJ0aCIsIiRob3VybHlXc3BlZWRGb3VydGgiLCIkaG91cmx5VGVtcGVyYXR1cmVGb3VydGgiLCIkaG91cmx5SWNvbkZvdXJ0aCIsIiRkYXRlVGltZUxhc3QiLCIkaG91cmx5SHVtaWRpdHlMYXN0IiwiJGhvdXJseVByZXNzdXJlTGFzdCIsIiRob3VybHlXZGlyTGFzdCIsIiRob3VybHlXc3BlZWRMYXN0IiwiJGhvdXJseVRlbXBlcmF0dXJlTGFzdCIsIiRob3VybHlJY29uTGFzdCIsImdldFJlc3BvbnNlIiwiQVBJX0tFWSIsIkJBU0VfVVJMIiwiU0VDT05EQVJZX1VSTCIsIiRjYXJkcyIsIiRjYXJkc0luZm8iLCIkaW5mb0RldGFpbHMiLCIkaW5mb1RpdGxlIiwiJGlucHV0IiwiZGFpbHlJbmZvSXRlbXMiLCJnZXRFbGVtZW50c0J5Q2xhc3NOYW1lIiwiJHNlYXJjaEJ1dHRvbiIsIiRzZWFyY2hJY29uIiwiZ2V0U2VhcmNoVXJsIiwiY2l0eSIsImdldFNlYXJjaFVybEZvckRheXMiLCJxdWVyeSIsImZldGNoIiwidGhlbiIsInJlcyIsImpzb24iLCJjYXRjaCIsImVyciIsImNvbnNvbGUiLCJsb2ciLCJnZXRSZXNwb25zZUZvckRheXMiLCJ2YWx1ZSIsInRvTG93ZXJDYXNlIiwiY29kZSJdLCJtYXBwaW5ncyI6Ijs7O0VBQ08sU0FBU0EsYUFBVCxHQUF5QjtFQUM5QixRQUFNQyxVQUFVLEdBQUdDLFFBQVEsQ0FBQ0MsY0FBVCxDQUF3QixRQUF4QixDQUFuQjtFQUNBLFFBQU1DLGNBQWMsR0FBR0gsVUFBVSxDQUFDSSxRQUFsQztFQUNBLFFBQU1DLFdBQVcsR0FBR0osUUFBUSxDQUFDQyxjQUFULENBQXdCLGFBQXhCLENBQXBCO0VBQ0EsUUFBTUksWUFBWSxHQUFHTCxRQUFRLENBQUNDLGNBQVQsQ0FBd0IsY0FBeEIsQ0FBckI7RUFDQSxRQUFNSyxhQUFhLEdBQUdOLFFBQVEsQ0FBQ0MsY0FBVCxDQUF3QixlQUF4QixDQUF0QjtFQUNBLFFBQU1NLFlBQVksR0FBR1AsUUFBUSxDQUFDQyxjQUFULENBQXdCLGNBQXhCLENBQXJCO0VBQ0EsUUFBTU8sb0JBQW9CLEdBQUdSLFFBQVEsQ0FBQ0MsY0FBVCxDQUF3QixXQUF4QixDQUE3QjtFQUNBLE1BQUlRLFVBQVUsR0FBRyxDQUFDLEVBQWxCO0VBQ0EsTUFBSUMsWUFBWSxHQUFHLEVBQW5CO0VBQ0EsTUFBSUMsS0FBSyxHQUFHLEVBQVo7O0VBRUEsV0FBU0Msd0JBQVQsR0FBb0M7RUFDbENSLElBQUFBLFdBQVcsQ0FBQ1MsS0FBWixDQUFrQkMsT0FBbEIsR0FBNEIsTUFBNUI7RUFDRDs7RUFDRCxXQUFTQyx5QkFBVCxHQUFxQztFQUNuQ1gsSUFBQUEsV0FBVyxDQUFDUyxLQUFaLENBQWtCQyxPQUFsQixHQUE0QixNQUE1QjtFQUNEOztFQUNELFdBQVNFLGVBQVQsR0FBMkI7RUFDekJQLElBQUFBLFVBQVUsR0FBRyxDQUFDLEVBQWQ7RUFDQUMsSUFBQUEsWUFBWSxHQUFHLEVBQWY7RUFDQU4sSUFBQUEsV0FBVyxDQUFDUyxLQUFaLENBQWtCSSxHQUFsQixHQUF5QixHQUFFUixVQUFXLElBQXRDO0VBQ0FMLElBQUFBLFdBQVcsQ0FBQ1MsS0FBWixDQUFrQkssS0FBbEIsR0FBMkIsR0FBRVIsWUFBYSxJQUExQztFQUNEOztFQUVELFdBQVNTLE9BQVQsR0FBbUI7RUFDakIsUUFBSVIsS0FBSyxJQUFJLENBQUMsRUFBZCxFQUFrQjtFQUNoQixhQUFRQSxLQUFLLEdBQUcsRUFBaEI7RUFDRCxLQUZELE1BRU87RUFDTFAsTUFBQUEsV0FBVyxDQUFDUyxLQUFaLENBQWtCSSxHQUFsQixHQUF5QixHQUFHTixLQUFLLElBQUksQ0FBRyxJQUF4QztFQUNEOztFQUNEUyxJQUFBQSxVQUFVLENBQUNELE9BQUQsRUFBVSxDQUFWLENBQVY7RUFDRDs7RUFFRCxXQUFTRSxlQUFULEdBQTJCO0VBQ3pCRixJQUFBQSxPQUFPO0VBQ1BDLElBQUFBLFVBQVUsQ0FBQ1Isd0JBQUQsRUFBMkIsRUFBM0IsQ0FBVjtFQUNBUSxJQUFBQSxVQUFVLENBQUNKLGVBQUQsRUFBa0IsR0FBbEIsQ0FBVjtFQUNEOztFQUVELFdBQVNNLGtCQUFULEdBQThCO0VBQzVCUCxJQUFBQSx5QkFBeUI7RUFDekIsUUFBSUwsWUFBWSxJQUFJLEdBQXBCLEVBQXlCLE9BQU8sSUFBUDs7RUFDekIsUUFBSUQsVUFBVSxHQUFHLEVBQWIsSUFBbUJDLFlBQVksSUFBSSxFQUF2QyxFQUEyQztFQUN6Q04sTUFBQUEsV0FBVyxDQUFDUyxLQUFaLENBQWtCSSxHQUFsQixHQUF5QixHQUFHUixVQUFVLElBQUksRUFBSSxJQUE5QztFQUNEOztFQUNELFFBQUlBLFVBQVUsSUFBSSxFQUFkLElBQW9CQyxZQUFZLEdBQUcsR0FBdkMsRUFBNEM7RUFDMUNOLE1BQUFBLFdBQVcsQ0FBQ1MsS0FBWixDQUFrQkssS0FBbEIsR0FBMkIsR0FBR1IsWUFBWSxJQUFJLEVBQUksSUFBbEQ7RUFDRDs7RUFDRFUsSUFBQUEsVUFBVSxDQUFDRSxrQkFBRCxFQUFxQixDQUFyQixDQUFWO0VBQ0Q7O0VBRUQsV0FBU0Msb0JBQVQsR0FBZ0M7RUFDOUJsQixJQUFBQSxZQUFZLENBQUNtQixTQUFiLENBQXVCQyxNQUF2QixDQUE4QixRQUE5QjtFQUNBbkIsSUFBQUEsYUFBYSxDQUFDa0IsU0FBZCxDQUF3QkMsTUFBeEIsQ0FBK0IsUUFBL0I7RUFDQWxCLElBQUFBLFlBQVksQ0FBQ2lCLFNBQWIsQ0FBdUJDLE1BQXZCLENBQThCLFFBQTlCO0VBQ0Q7O0VBQ0QsV0FBU0MsZ0JBQVQsR0FBNEI7RUFDMUJyQixJQUFBQSxZQUFZLENBQUNtQixTQUFiLENBQXVCRyxHQUF2QixDQUEyQixRQUEzQjtFQUNBckIsSUFBQUEsYUFBYSxDQUFDa0IsU0FBZCxDQUF3QkcsR0FBeEIsQ0FBNEIsUUFBNUI7RUFDQXBCLElBQUFBLFlBQVksQ0FBQ2lCLFNBQWIsQ0FBdUJHLEdBQXZCLENBQTJCLFFBQTNCO0VBQ0Q7O0VBRUQsUUFBTUMsU0FBUyxHQUFHLE1BQU07RUFDdEI1QixJQUFBQSxRQUFRLENBQUM2QixnQkFBVCxDQUEwQixPQUExQixFQUFvQ0MsS0FBRCxJQUFXO0VBQzVDLFVBQ0VBLEtBQUssQ0FBQ0MsTUFBTixLQUFpQmhDLFVBQWpCLElBQ0ErQixLQUFLLENBQUNDLE1BQU4sS0FBaUI3QixjQUFjLENBQUMsQ0FBRCxDQUQvQixJQUVBNEIsS0FBSyxDQUFDQyxNQUFOLEtBQWlCN0IsY0FBYyxDQUFDLENBQUQsQ0FGL0IsSUFHQTRCLEtBQUssQ0FBQ0MsTUFBTixLQUFpQjdCLGNBQWMsQ0FBQyxDQUFELENBSmpDLEVBS0U7RUFDQSxZQUFJRyxZQUFZLENBQUNtQixTQUFiLENBQXVCLENBQXZCLEtBQTZCLFFBQWpDLEVBQTJDO0VBQ3pDRCxVQUFBQSxvQkFBb0I7RUFDcEJGLFVBQUFBLGVBQWU7RUFDaEIsU0FIRCxNQUdPO0VBQ0xLLFVBQUFBLGdCQUFnQjtFQUNoQkosVUFBQUEsa0JBQWtCO0VBQ25CO0VBQ0Y7O0VBRUQsVUFDRVEsS0FBSyxDQUFDQyxNQUFOLEtBQWlCdkIsb0JBQW9CLENBQUNMLFFBQXJCLENBQThCLENBQTlCLENBQWpCLElBQ0EyQixLQUFLLENBQUNDLE1BQU4sS0FBaUJ2QixvQkFBb0IsQ0FBQ0wsUUFBckIsQ0FBOEIsQ0FBOUIsQ0FEakIsSUFFQTJCLEtBQUssQ0FBQ0MsTUFBTixLQUFpQnZCLG9CQUFvQixDQUFDTCxRQUFyQixDQUE4QixDQUE5QixDQUZqQixJQUdBMkIsS0FBSyxDQUFDQyxNQUFOLEtBQWlCdkIsb0JBQW9CLENBQUNMLFFBQXJCLENBQThCLENBQTlCLENBSm5CLEVBS0U7RUFDQWtCLFFBQUFBLGVBQWU7RUFDZkUsUUFBQUEsb0JBQW9CO0VBQ3JCO0VBQ0YsS0F6QkQ7RUEwQkQsR0EzQkQ7O0VBNEJBSyxFQUFBQSxTQUFTO0VBQ1Y7O0VDM0ZNLFNBQVNJLFNBQVQsR0FBcUI7RUFDMUIsUUFBTUMsTUFBTSxHQUFHakMsUUFBUSxDQUFDQyxjQUFULENBQXdCLE9BQXhCLENBQWY7RUFDQWdDLEVBQUFBLE1BQU0sQ0FBQ0MsWUFBUCxHQUFzQixHQUF0QjtFQUNEOztFQ0pNLFNBQVNDLFFBQVQsR0FBb0I7RUFDekIsUUFBTUMsWUFBWSxHQUFHcEMsUUFBUSxDQUFDQyxjQUFULENBQXdCLE9BQXhCLENBQXJCO0VBQ0EsUUFBTW9DLFlBQVksR0FBR3JDLFFBQVEsQ0FBQ0MsY0FBVCxDQUF3QixPQUF4QixDQUFyQjtFQUNBLFFBQU1xQyxZQUFZLEdBQUd0QyxRQUFRLENBQUNDLGNBQVQsQ0FBd0IsT0FBeEIsQ0FBckI7RUFDQSxRQUFNc0MsY0FBYyxHQUFHdkMsUUFBUSxDQUFDQyxjQUFULENBQXdCLFNBQXhCLENBQXZCO0VBQ0EsUUFBTXVDLFlBQVksR0FBR3hDLFFBQVEsQ0FBQ0MsY0FBVCxDQUF3QixjQUF4QixDQUFyQjtFQUNBLFFBQU13QyxNQUFNLEdBQUd6QyxRQUFRLENBQUNDLGNBQVQsQ0FBd0IsT0FBeEIsQ0FBZjtFQUNBRCxFQUFBQSxRQUFRLENBQUM2QixnQkFBVCxDQUEwQixPQUExQixFQUFvQ0MsS0FBRCxJQUFXO0VBQzVDLFFBQUlBLEtBQUssQ0FBQ0MsTUFBTixJQUFnQkssWUFBcEIsRUFBa0M7RUFDaENLLE1BQUFBLE1BQU0sQ0FBQ0MsR0FBUCxHQUFhLGtCQUFiO0VBQ0FELE1BQUFBLE1BQU0sQ0FBQ0UsTUFBUCxHQUFnQix5QkFBaEI7RUFDRDs7RUFDRCxRQUFJYixLQUFLLENBQUNDLE1BQU4sSUFBZ0JNLFlBQXBCLEVBQWtDO0VBQ2hDSSxNQUFBQSxNQUFNLENBQUNDLEdBQVAsR0FBYSxrQkFBYjtFQUNBRCxNQUFBQSxNQUFNLENBQUNFLE1BQVAsR0FBZ0IseUJBQWhCO0VBQ0Q7O0VBQ0QsUUFBSWIsS0FBSyxDQUFDQyxNQUFOLElBQWdCTyxZQUFwQixFQUFrQztFQUNoQ0csTUFBQUEsTUFBTSxDQUFDQyxHQUFQLEdBQWEsa0JBQWI7RUFDQUQsTUFBQUEsTUFBTSxDQUFDRSxNQUFQLEdBQWdCLHlCQUFoQjtFQUNEOztFQUNELFFBQUliLEtBQUssQ0FBQ0MsTUFBTixJQUFnQlEsY0FBcEIsRUFBb0M7RUFDbENFLE1BQUFBLE1BQU0sQ0FBQ0MsR0FBUCxHQUFhLG9CQUFiO0VBQ0FELE1BQUFBLE1BQU0sQ0FBQ0UsTUFBUCxHQUFnQiwyQkFBaEI7RUFDRDtFQUNGLEdBakJEO0VBa0JEOztFQ3pCTSxNQUFNQyxlQUFlLEdBQUlDLElBQUQsSUFBVTtFQUN2QyxRQUFNQyxTQUFTLEdBQUc5QyxRQUFRLENBQUNDLGNBQVQsQ0FBd0IsV0FBeEIsQ0FBbEI7RUFDQSxRQUFNOEMsUUFBUSxHQUFHRixJQUFJLENBQUNHLElBQXRCO0VBQ0EsUUFBTUMsV0FBVyxHQUFHSixJQUFJLENBQUNLLEdBQUwsQ0FBU0MsT0FBN0I7RUFDQSxRQUFNQyxZQUFZLEdBQUdwRCxRQUFRLENBQUNDLGNBQVQsQ0FBd0IsYUFBeEIsQ0FBckI7RUFDQSxRQUFNb0QsV0FBVyxHQUFHQyxJQUFJLENBQUNDLEtBQUwsQ0FBV1YsSUFBSSxDQUFDVyxJQUFMLENBQVVDLElBQVYsR0FBaUIsTUFBNUIsQ0FBcEI7RUFDQSxRQUFNQyxhQUFhLEdBQUcxRCxRQUFRLENBQUNDLGNBQVQsQ0FBd0IsZUFBeEIsQ0FBdEI7RUFDQSxRQUFNMEQsUUFBUSxHQUFHZCxJQUFJLENBQUNXLElBQUwsQ0FBVUcsUUFBM0I7RUFDQSxRQUFNQyxhQUFhLEdBQUc1RCxRQUFRLENBQUNDLGNBQVQsQ0FBd0IsZUFBeEIsQ0FBdEI7RUFDQSxRQUFNNEQsUUFBUSxHQUFHaEIsSUFBSSxDQUFDVyxJQUFMLENBQVVLLFFBQTNCO0VBQ0EsUUFBTUMsY0FBYyxHQUFHakIsSUFBSSxDQUFDa0IsT0FBTCxDQUFhLENBQWIsRUFBZ0JQLElBQXZDO0VBQ0EsUUFBTVEsWUFBWSxHQUFHaEUsUUFBUSxDQUFDQyxjQUFULENBQXdCLGVBQXhCLENBQXJCO0VBQ0EsUUFBTWdFLGFBQWEsR0FBR3BCLElBQUksQ0FBQ3FCLElBQUwsQ0FBVUMsR0FBaEM7RUFDQSxRQUFNQyxjQUFjLEdBQUdwRSxRQUFRLENBQUNDLGNBQVQsQ0FBd0IsaUJBQXhCLENBQXZCO0VBQ0EsUUFBTW9FLFNBQVMsR0FBR3hCLElBQUksQ0FBQ3FCLElBQUwsQ0FBVUksS0FBNUI7RUFDQSxRQUFNQyxlQUFlLEdBQUd2RSxRQUFRLENBQUNDLGNBQVQsQ0FBd0Isa0JBQXhCLENBQXhCO0VBQ0EsUUFBTXVFLElBQUksR0FBSSxxQ0FBb0MzQixJQUFJLENBQUNrQixPQUFMLENBQWEsQ0FBYixFQUFnQlMsSUFBSyxTQUF2RTtFQUNBMUIsRUFBQUEsU0FBUyxDQUFDMkIsU0FBVixHQUF1QixHQUFFMUIsUUFBUyxLQUFJRSxXQUFZLEVBQWxEOztFQUNBLE1BQUlBLFdBQVcsSUFBSXlCLFNBQW5CLEVBQThCO0VBQzVCNUIsSUFBQUEsU0FBUyxDQUFDMkIsU0FBVixHQUF1QixHQUFFMUIsUUFBUyxFQUFsQztFQUNEOztFQUNESyxFQUFBQSxZQUFZLENBQUN1QixTQUFiLEdBQTBCLEdBQUV0QixXQUFZLFFBQXhDO0VBQ0FrQixFQUFBQSxlQUFlLENBQUNLLFlBQWhCLENBQTZCLEtBQTdCLEVBQW9DSixJQUFwQztFQUNBZCxFQUFBQSxhQUFhLENBQUNlLFNBQWQsR0FBMkIsY0FBYWQsUUFBUyxHQUFqRDtFQUNBQyxFQUFBQSxhQUFhLENBQUNhLFNBQWQsR0FBMkIsYUFBWVosUUFBUyxNQUFoRDtFQUNBRyxFQUFBQSxZQUFZLENBQUNTLFNBQWIsR0FBMEIsbUJBQWtCUixhQUFjLE1BQTFEO0VBQ0FHLEVBQUFBLGNBQWMsQ0FBQ0ssU0FBZixHQUE0QixlQUFjSixTQUFVLE1BQXBEO0VBQ0QsQ0EzQk07QUE2QlAsRUFBTyxNQUFNUSxxQkFBcUIsR0FBSWhDLElBQUQsSUFBVTtFQUM3QyxRQUFNaUMsY0FBYyxHQUFHOUUsUUFBUSxDQUFDQyxjQUFULENBQXdCLFdBQXhCLENBQXZCO0VBQ0E2RSxFQUFBQSxjQUFjLENBQUNMLFNBQWYsR0FBMkI1QixJQUFJLENBQUNrQyxJQUFMLENBQVUsQ0FBVixFQUFhQyxNQUF4QztFQUNBLFFBQU1DLG9CQUFvQixHQUFHakYsUUFBUSxDQUFDQyxjQUFULENBQXdCLG9CQUF4QixDQUE3QjtFQUNBZ0YsRUFBQUEsb0JBQW9CLENBQUNSLFNBQXJCLEdBQWtDLGNBQWE1QixJQUFJLENBQUNrQyxJQUFMLENBQVUsQ0FBVixFQUFhdkIsSUFBYixDQUFrQkcsUUFBUyxHQUExRTtFQUNBLFFBQU11QixvQkFBb0IsR0FBR2xGLFFBQVEsQ0FBQ0MsY0FBVCxDQUF3QixvQkFBeEIsQ0FBN0I7RUFDQWlGLEVBQUFBLG9CQUFvQixDQUFDVCxTQUFyQixHQUFrQyxhQUFZNUIsSUFBSSxDQUFDa0MsSUFBTCxDQUFVLENBQVYsRUFBYXZCLElBQWIsQ0FBa0JLLFFBQVMsTUFBekU7RUFDQSxRQUFNc0IsZ0JBQWdCLEdBQUduRixRQUFRLENBQUNDLGNBQVQsQ0FBd0IsZ0JBQXhCLENBQXpCO0VBQ0FrRixFQUFBQSxnQkFBZ0IsQ0FBQ1YsU0FBakIsR0FBOEIsbUJBQWtCNUIsSUFBSSxDQUFDa0MsSUFBTCxDQUFVLENBQVYsRUFBYWIsSUFBYixDQUFrQkMsR0FBSSxNQUF0RTtFQUNBLFFBQU1pQixrQkFBa0IsR0FBR3BGLFFBQVEsQ0FBQ0MsY0FBVCxDQUF3QixrQkFBeEIsQ0FBM0I7RUFDQW1GLEVBQUFBLGtCQUFrQixDQUFDWCxTQUFuQixHQUFnQyxlQUFjNUIsSUFBSSxDQUFDa0MsSUFBTCxDQUFVLENBQVYsRUFBYWIsSUFBYixDQUFrQkksS0FBTSxNQUF0RTtFQUNBLFFBQU1lLHVCQUF1QixHQUFHckYsUUFBUSxDQUFDQyxjQUFULENBQzlCLHVCQUQ4QixDQUFoQztFQUdBb0YsRUFBQUEsdUJBQXVCLENBQUNWLFNBQXhCLEdBQXFDLEdBQUVyQixJQUFJLENBQUNDLEtBQUwsQ0FDckNWLElBQUksQ0FBQ2tDLElBQUwsQ0FBVSxDQUFWLEVBQWF2QixJQUFiLENBQWtCQyxJQUFsQixHQUF5QixNQURZLENBRXJDLFFBRkY7RUFHQSxRQUFNNkIsZ0JBQWdCLEdBQUd0RixRQUFRLENBQUNDLGNBQVQsQ0FBd0IsZ0JBQXhCLENBQXpCO0VBQ0FxRixFQUFBQSxnQkFBZ0IsQ0FBQ1YsWUFBakIsQ0FDRSxLQURGLEVBRUcscUNBQW9DL0IsSUFBSSxDQUFDa0MsSUFBTCxDQUFVLENBQVYsRUFBYWhCLE9BQWIsQ0FBcUIsQ0FBckIsRUFBd0JTLElBQUssU0FGcEU7RUFLQSxRQUFNZSxlQUFlLEdBQUd2RixRQUFRLENBQUNDLGNBQVQsQ0FBd0IsWUFBeEIsQ0FBeEI7RUFDQXNGLEVBQUFBLGVBQWUsQ0FBQ2QsU0FBaEIsR0FBNEI1QixJQUFJLENBQUNrQyxJQUFMLENBQVUsQ0FBVixFQUFhQyxNQUF6QztFQUNBLFFBQU1RLHFCQUFxQixHQUFHeEYsUUFBUSxDQUFDQyxjQUFULENBQXdCLG9CQUF4QixDQUE5QjtFQUNBdUYsRUFBQUEscUJBQXFCLENBQUNmLFNBQXRCLEdBQW1DLGNBQWE1QixJQUFJLENBQUNrQyxJQUFMLENBQVUsQ0FBVixFQUFhdkIsSUFBYixDQUFrQkcsUUFBUyxHQUEzRTtFQUNBLFFBQU04QixxQkFBcUIsR0FBR3pGLFFBQVEsQ0FBQ0MsY0FBVCxDQUF3QixvQkFBeEIsQ0FBOUI7RUFDQXdGLEVBQUFBLHFCQUFxQixDQUFDaEIsU0FBdEIsR0FBbUMsYUFBWTVCLElBQUksQ0FBQ2tDLElBQUwsQ0FBVSxDQUFWLEVBQWF2QixJQUFiLENBQWtCSyxRQUFTLE1BQTFFO0VBQ0EsUUFBTTZCLGlCQUFpQixHQUFHMUYsUUFBUSxDQUFDQyxjQUFULENBQXdCLGdCQUF4QixDQUExQjtFQUNBeUYsRUFBQUEsaUJBQWlCLENBQUNqQixTQUFsQixHQUErQixtQkFBa0I1QixJQUFJLENBQUNrQyxJQUFMLENBQVUsQ0FBVixFQUFhYixJQUFiLENBQWtCQyxHQUFJLE1BQXZFO0VBQ0EsUUFBTXdCLG1CQUFtQixHQUFHM0YsUUFBUSxDQUFDQyxjQUFULENBQXdCLGtCQUF4QixDQUE1QjtFQUNBMEYsRUFBQUEsbUJBQW1CLENBQUNsQixTQUFwQixHQUFpQyxlQUFjNUIsSUFBSSxDQUFDa0MsSUFBTCxDQUFVLENBQVYsRUFBYWIsSUFBYixDQUFrQkksS0FBTSxNQUF2RTtFQUNBLFFBQU1zQix3QkFBd0IsR0FBRzVGLFFBQVEsQ0FBQ0MsY0FBVCxDQUMvQix1QkFEK0IsQ0FBakM7RUFHQTJGLEVBQUFBLHdCQUF3QixDQUFDakIsU0FBekIsR0FBc0MsR0FBRXJCLElBQUksQ0FBQ0MsS0FBTCxDQUN0Q1YsSUFBSSxDQUFDa0MsSUFBTCxDQUFVLENBQVYsRUFBYXZCLElBQWIsQ0FBa0JDLElBQWxCLEdBQXlCLE1BRGEsQ0FFdEMsUUFGRjtFQUdBLFFBQU1vQyxpQkFBaUIsR0FBRzdGLFFBQVEsQ0FBQ0MsY0FBVCxDQUF3QixnQkFBeEIsQ0FBMUI7RUFDQTRGLEVBQUFBLGlCQUFpQixDQUFDakIsWUFBbEIsQ0FDRSxLQURGLEVBRUcscUNBQW9DL0IsSUFBSSxDQUFDa0MsSUFBTCxDQUFVLENBQVYsRUFBYWhCLE9BQWIsQ0FBcUIsQ0FBckIsRUFBd0JTLElBQUssU0FGcEU7RUFLQSxRQUFNc0IsY0FBYyxHQUFHOUYsUUFBUSxDQUFDQyxjQUFULENBQXdCLFdBQXhCLENBQXZCO0VBQ0E2RixFQUFBQSxjQUFjLENBQUNyQixTQUFmLEdBQTJCNUIsSUFBSSxDQUFDa0MsSUFBTCxDQUFVLENBQVYsRUFBYUMsTUFBeEM7RUFDQSxRQUFNZSxvQkFBb0IsR0FBRy9GLFFBQVEsQ0FBQ0MsY0FBVCxDQUF3QixvQkFBeEIsQ0FBN0I7RUFDQThGLEVBQUFBLG9CQUFvQixDQUFDdEIsU0FBckIsR0FBa0MsY0FBYTVCLElBQUksQ0FBQ2tDLElBQUwsQ0FBVSxDQUFWLEVBQWF2QixJQUFiLENBQWtCRyxRQUFTLEdBQTFFO0VBQ0EsUUFBTXFDLG9CQUFvQixHQUFHaEcsUUFBUSxDQUFDQyxjQUFULENBQXdCLG9CQUF4QixDQUE3QjtFQUNBK0YsRUFBQUEsb0JBQW9CLENBQUN2QixTQUFyQixHQUFrQyxhQUFZNUIsSUFBSSxDQUFDa0MsSUFBTCxDQUFVLENBQVYsRUFBYXZCLElBQWIsQ0FBa0JLLFFBQVMsTUFBekU7RUFDQSxRQUFNb0MsZ0JBQWdCLEdBQUdqRyxRQUFRLENBQUNDLGNBQVQsQ0FBd0IsZ0JBQXhCLENBQXpCO0VBQ0FnRyxFQUFBQSxnQkFBZ0IsQ0FBQ3hCLFNBQWpCLEdBQThCLG1CQUFrQjVCLElBQUksQ0FBQ2tDLElBQUwsQ0FBVSxDQUFWLEVBQWFiLElBQWIsQ0FBa0JDLEdBQUksTUFBdEU7RUFDQSxRQUFNK0Isa0JBQWtCLEdBQUdsRyxRQUFRLENBQUNDLGNBQVQsQ0FBd0Isa0JBQXhCLENBQTNCO0VBQ0FpRyxFQUFBQSxrQkFBa0IsQ0FBQ3pCLFNBQW5CLEdBQWdDLGVBQWM1QixJQUFJLENBQUNrQyxJQUFMLENBQVUsQ0FBVixFQUFhYixJQUFiLENBQWtCSSxLQUFNLE1BQXRFO0VBQ0EsUUFBTTZCLHVCQUF1QixHQUFHbkcsUUFBUSxDQUFDQyxjQUFULENBQzlCLHVCQUQ4QixDQUFoQztFQUdBa0csRUFBQUEsdUJBQXVCLENBQUN4QixTQUF4QixHQUFxQyxHQUFFckIsSUFBSSxDQUFDQyxLQUFMLENBQ3JDVixJQUFJLENBQUNrQyxJQUFMLENBQVUsQ0FBVixFQUFhdkIsSUFBYixDQUFrQkMsSUFBbEIsR0FBeUIsTUFEWSxDQUVyQyxRQUZGO0VBR0EsUUFBTTJDLGdCQUFnQixHQUFHcEcsUUFBUSxDQUFDQyxjQUFULENBQXdCLGdCQUF4QixDQUF6QjtFQUNBbUcsRUFBQUEsZ0JBQWdCLENBQUN4QixZQUFqQixDQUNFLEtBREYsRUFFRyxxQ0FBb0MvQixJQUFJLENBQUNrQyxJQUFMLENBQVUsQ0FBVixFQUFhaEIsT0FBYixDQUFxQixDQUFyQixFQUF3QlMsSUFBSyxTQUZwRTtFQUtBLFFBQU02QixlQUFlLEdBQUdyRyxRQUFRLENBQUNDLGNBQVQsQ0FBd0IsWUFBeEIsQ0FBeEI7RUFDQW9HLEVBQUFBLGVBQWUsQ0FBQzVCLFNBQWhCLEdBQTRCNUIsSUFBSSxDQUFDa0MsSUFBTCxDQUFVLENBQVYsRUFBYUMsTUFBekM7RUFDQSxRQUFNc0IscUJBQXFCLEdBQUd0RyxRQUFRLENBQUNDLGNBQVQsQ0FBd0Isb0JBQXhCLENBQTlCO0VBQ0FxRyxFQUFBQSxxQkFBcUIsQ0FBQzdCLFNBQXRCLEdBQW1DLGNBQWE1QixJQUFJLENBQUNrQyxJQUFMLENBQVUsQ0FBVixFQUFhdkIsSUFBYixDQUFrQkcsUUFBUyxHQUEzRTtFQUNBLFFBQU00QyxxQkFBcUIsR0FBR3ZHLFFBQVEsQ0FBQ0MsY0FBVCxDQUF3QixvQkFBeEIsQ0FBOUI7RUFDQXNHLEVBQUFBLHFCQUFxQixDQUFDOUIsU0FBdEIsR0FBbUMsYUFBWTVCLElBQUksQ0FBQ2tDLElBQUwsQ0FBVSxDQUFWLEVBQWF2QixJQUFiLENBQWtCSyxRQUFTLE1BQTFFO0VBQ0EsUUFBTTJDLGlCQUFpQixHQUFHeEcsUUFBUSxDQUFDQyxjQUFULENBQXdCLGdCQUF4QixDQUExQjtFQUNBdUcsRUFBQUEsaUJBQWlCLENBQUMvQixTQUFsQixHQUErQixtQkFBa0I1QixJQUFJLENBQUNrQyxJQUFMLENBQVUsQ0FBVixFQUFhYixJQUFiLENBQWtCQyxHQUFJLE1BQXZFO0VBQ0EsUUFBTXNDLG1CQUFtQixHQUFHekcsUUFBUSxDQUFDQyxjQUFULENBQXdCLGtCQUF4QixDQUE1QjtFQUNBd0csRUFBQUEsbUJBQW1CLENBQUNoQyxTQUFwQixHQUFpQyxlQUFjNUIsSUFBSSxDQUFDa0MsSUFBTCxDQUFVLENBQVYsRUFBYWIsSUFBYixDQUFrQkksS0FBTSxNQUF2RTtFQUNBLFFBQU1vQyx3QkFBd0IsR0FBRzFHLFFBQVEsQ0FBQ0MsY0FBVCxDQUMvQix1QkFEK0IsQ0FBakM7RUFHQXlHLEVBQUFBLHdCQUF3QixDQUFDL0IsU0FBekIsR0FBc0MsR0FBRXJCLElBQUksQ0FBQ0MsS0FBTCxDQUN0Q1YsSUFBSSxDQUFDa0MsSUFBTCxDQUFVLENBQVYsRUFBYXZCLElBQWIsQ0FBa0JDLElBQWxCLEdBQXlCLE1BRGEsQ0FFdEMsUUFGRjtFQUdBLFFBQU1rRCxpQkFBaUIsR0FBRzNHLFFBQVEsQ0FBQ0MsY0FBVCxDQUF3QixnQkFBeEIsQ0FBMUI7RUFDQTBHLEVBQUFBLGlCQUFpQixDQUFDL0IsWUFBbEIsQ0FDRSxLQURGLEVBRUcscUNBQW9DL0IsSUFBSSxDQUFDa0MsSUFBTCxDQUFVLENBQVYsRUFBYWhCLE9BQWIsQ0FBcUIsQ0FBckIsRUFBd0JTLElBQUssU0FGcEU7RUFLQSxRQUFNb0MsYUFBYSxHQUFHNUcsUUFBUSxDQUFDQyxjQUFULENBQXdCLFVBQXhCLENBQXRCO0VBQ0EyRyxFQUFBQSxhQUFhLENBQUNuQyxTQUFkLEdBQTBCNUIsSUFBSSxDQUFDa0MsSUFBTCxDQUFVLENBQVYsRUFBYUMsTUFBdkM7RUFDQSxRQUFNNkIsbUJBQW1CLEdBQUc3RyxRQUFRLENBQUNDLGNBQVQsQ0FBd0Isb0JBQXhCLENBQTVCO0VBQ0E0RyxFQUFBQSxtQkFBbUIsQ0FBQ3BDLFNBQXBCLEdBQWlDLGNBQWE1QixJQUFJLENBQUNrQyxJQUFMLENBQVUsQ0FBVixFQUFhdkIsSUFBYixDQUFrQkcsUUFBUyxHQUF6RTtFQUNBLFFBQU1tRCxtQkFBbUIsR0FBRzlHLFFBQVEsQ0FBQ0MsY0FBVCxDQUF3QixvQkFBeEIsQ0FBNUI7RUFDQTZHLEVBQUFBLG1CQUFtQixDQUFDckMsU0FBcEIsR0FBaUMsYUFBWTVCLElBQUksQ0FBQ2tDLElBQUwsQ0FBVSxDQUFWLEVBQWF2QixJQUFiLENBQWtCSyxRQUFTLE1BQXhFO0VBQ0EsUUFBTWtELGVBQWUsR0FBRy9HLFFBQVEsQ0FBQ0MsY0FBVCxDQUF3QixnQkFBeEIsQ0FBeEI7RUFDQThHLEVBQUFBLGVBQWUsQ0FBQ3RDLFNBQWhCLEdBQTZCLG1CQUFrQjVCLElBQUksQ0FBQ2tDLElBQUwsQ0FBVSxDQUFWLEVBQWFiLElBQWIsQ0FBa0JDLEdBQUksTUFBckU7RUFDQSxRQUFNNkMsaUJBQWlCLEdBQUdoSCxRQUFRLENBQUNDLGNBQVQsQ0FBd0Isa0JBQXhCLENBQTFCO0VBQ0ErRyxFQUFBQSxpQkFBaUIsQ0FBQ3ZDLFNBQWxCLEdBQStCLGVBQWM1QixJQUFJLENBQUNrQyxJQUFMLENBQVUsQ0FBVixFQUFhYixJQUFiLENBQWtCSSxLQUFNLE1BQXJFO0VBQ0EsUUFBTTJDLHNCQUFzQixHQUFHakgsUUFBUSxDQUFDQyxjQUFULENBQzdCLHVCQUQ2QixDQUEvQjtFQUdBZ0gsRUFBQUEsc0JBQXNCLENBQUN0QyxTQUF2QixHQUFvQyxHQUFFckIsSUFBSSxDQUFDQyxLQUFMLENBQ3BDVixJQUFJLENBQUNrQyxJQUFMLENBQVUsQ0FBVixFQUFhdkIsSUFBYixDQUFrQkMsSUFBbEIsR0FBeUIsTUFEVyxDQUVwQyxRQUZGO0VBR0EsUUFBTXlELGVBQWUsR0FBR2xILFFBQVEsQ0FBQ0MsY0FBVCxDQUF3QixnQkFBeEIsQ0FBeEI7RUFDQWlILEVBQUFBLGVBQWUsQ0FBQ3RDLFlBQWhCLENBQ0UsS0FERixFQUVHLHFDQUFvQy9CLElBQUksQ0FBQ2tDLElBQUwsQ0FBVSxDQUFWLEVBQWFoQixPQUFiLENBQXFCLENBQXJCLEVBQXdCUyxJQUFLLFNBRnBFO0VBSUQsQ0E5R007O0VDNUJBLFNBQVMyQyxXQUFULEdBQXVCO0VBQzVCLFFBQU1DLE9BQU8sR0FBRyxrQ0FBaEI7RUFDQSxRQUFNQyxRQUFRLEdBQUksb0RBQWxCO0VBQ0EsUUFBTUMsYUFBYSxHQUFJLHFEQUF2QjtFQUNBLFFBQU1DLE1BQU0sR0FBR3ZILFFBQVEsQ0FBQ0MsY0FBVCxDQUF3QixPQUF4QixDQUFmO0VBQ0EsUUFBTXVILFVBQVUsR0FBR3hILFFBQVEsQ0FBQ0MsY0FBVCxDQUF3QixZQUF4QixDQUFuQjtFQUNBLFFBQU13SCxZQUFZLEdBQUd6SCxRQUFRLENBQUNDLGNBQVQsQ0FBd0IsY0FBeEIsQ0FBckI7RUFDQSxRQUFNeUgsVUFBVSxHQUFHMUgsUUFBUSxDQUFDQyxjQUFULENBQXdCLFlBQXhCLENBQW5CO0VBQ0EsUUFBTTBILE1BQU0sR0FBRzNILFFBQVEsQ0FBQ0MsY0FBVCxDQUF3QixPQUF4QixDQUFmO0VBQ0EsUUFBTTJILGNBQWMsR0FBRzVILFFBQVEsQ0FBQzZILHNCQUFULENBQWdDLGtCQUFoQyxDQUF2QjtFQUNBLFFBQU1DLGFBQWEsR0FBRzlILFFBQVEsQ0FBQ0MsY0FBVCxDQUF3QixRQUF4QixDQUF0QjtFQUNBLFFBQU04SCxXQUFXLEdBQUcvSCxRQUFRLENBQUNDLGNBQVQsQ0FBd0IsYUFBeEIsQ0FBcEI7O0VBRUEsUUFBTStILFlBQVksR0FBSUMsSUFBRCxJQUFVO0VBQzdCLFdBQVEsR0FBRVosUUFBUyxHQUFFWSxJQUFLLHdCQUF1QmIsT0FBUSxFQUF6RDtFQUNELEdBRkQ7O0VBSUEsUUFBTWMsbUJBQW1CLEdBQUlELElBQUQsSUFBVTtFQUNwQyxXQUFRLEdBQUVYLGFBQWMsR0FBRVcsSUFBSyx3QkFBdUJiLE9BQVEsRUFBOUQ7RUFDRCxHQUZEOztFQUlBLFFBQU1ELFdBQVcsR0FBSWdCLEtBQUQsSUFBVztFQUM3QixRQUFJQSxLQUFKLEVBQVc7RUFDVEMsTUFBQUEsS0FBSyxDQUFDSixZQUFZLENBQUNHLEtBQUQsQ0FBYixDQUFMLENBQ0dFLElBREgsQ0FDU0MsR0FBRCxJQUFTQSxHQUFHLENBQUNDLElBQUosRUFEakIsRUFFR0YsSUFGSCxDQUVTeEYsSUFBRCxJQUFVO0VBQ2RELFFBQUFBLGVBQWUsQ0FBQ0MsSUFBRCxDQUFmO0VBQ0QsT0FKSCxFQUtHMkYsS0FMSCxDQUtVQyxHQUFELElBQVM7RUFDZEMsUUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVlGLEdBQVo7RUFDQSxjQUFNM0YsU0FBUyxHQUFHOUMsUUFBUSxDQUFDQyxjQUFULENBQXdCLFdBQXhCLENBQWxCO0VBQ0E2QyxRQUFBQSxTQUFTLENBQUMyQixTQUFWLEdBQXVCLElBQUcwRCxLQUFNLHlCQUFoQztFQUNELE9BVEg7RUFVRDtFQUNGLEdBYkQ7O0VBY0EsUUFBTVMsa0JBQWtCLEdBQUlULEtBQUQsSUFBVztFQUNwQyxRQUFJQSxLQUFKLEVBQVc7RUFDVEMsTUFBQUEsS0FBSyxDQUFDRixtQkFBbUIsQ0FBQ0MsS0FBRCxDQUFwQixDQUFMLENBQ0dFLElBREgsQ0FDU0MsR0FBRCxJQUFTQSxHQUFHLENBQUNDLElBQUosRUFEakIsRUFFR0YsSUFGSCxDQUVTeEYsSUFBRCxJQUFVO0VBQ2RnQyxRQUFBQSxxQkFBcUIsQ0FBQ2hDLElBQUQsQ0FBckI7RUFDQTZGLFFBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZOUYsSUFBWjtFQUNELE9BTEgsRUFNRzJGLEtBTkgsQ0FNVUMsR0FBRCxJQUFTO0VBQ2RDLFFBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZRixHQUFaO0VBQ0EsY0FBTTNGLFNBQVMsR0FBRzlDLFFBQVEsQ0FBQ0MsY0FBVCxDQUF3QixXQUF4QixDQUFsQjtFQUNBNkMsUUFBQUEsU0FBUyxDQUFDMkIsU0FBVixHQUF1QixJQUFHMEQsS0FBTSx5QkFBaEM7RUFDRCxPQVZIO0VBV0Q7RUFDRixHQWREOztFQWdCQW5JLEVBQUFBLFFBQVEsQ0FBQzZCLGdCQUFULENBQTBCLE9BQTFCLEVBQW9DQyxLQUFELElBQVc7RUFDNUMsUUFBSUEsS0FBSyxDQUFDQyxNQUFOLElBQWdCK0YsYUFBaEIsSUFBaUNoRyxLQUFLLENBQUNDLE1BQU4sSUFBZ0JnRyxXQUFyRCxFQUFrRTtFQUNoRVosTUFBQUEsV0FBVyxDQUFDUSxNQUFNLENBQUNrQixLQUFQLENBQWFDLFdBQWIsRUFBRCxDQUFYO0VBQ0FGLE1BQUFBLGtCQUFrQixDQUFDakIsTUFBTSxDQUFDa0IsS0FBUCxDQUFhQyxXQUFiLEVBQUQsQ0FBbEI7RUFDRDtFQUNGLEdBTEQ7RUFNQTlJLEVBQUFBLFFBQVEsQ0FBQzZCLGdCQUFULENBQTBCLFVBQTFCLEVBQXVDQyxLQUFELElBQVc7RUFDL0MsUUFBSUEsS0FBSyxDQUFDQyxNQUFOLElBQWdCNEYsTUFBaEIsSUFBMEI3RixLQUFLLENBQUNpSCxJQUFOLElBQWMsT0FBNUMsRUFBcUQ7RUFDbkQ1QixNQUFBQSxXQUFXLENBQUNRLE1BQU0sQ0FBQ2tCLEtBQVAsQ0FBYUMsV0FBYixFQUFELENBQVg7RUFDQUYsTUFBQUEsa0JBQWtCLENBQUNqQixNQUFNLENBQUNrQixLQUFQLENBQWFDLFdBQWIsRUFBRCxDQUFsQjtFQUNEO0VBQ0YsR0FMRDtFQU1EOztFQzVERDlHLFNBQVM7RUFDVGxDLGFBQWE7RUFDYnFDLFFBQVE7RUFDUmdGLFdBQVc7Ozs7In0=
