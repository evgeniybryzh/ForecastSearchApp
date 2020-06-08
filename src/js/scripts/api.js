"use strict";

export function getResponse() {
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

  const getSearchUrl = (city) => {
    return `${BASE_URL}${city}&units=celsius&appid=${API_KEY}`;
  };

  const getSearchUrlForDays = (city) => {
    return `${SECONDARY_URL}${city}&units=celsius&appid=${API_KEY}`;
  };
  const showWeatherInfo = (data) => {
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

  const getResponse = (query) => {
    if (query) {
      fetch(getSearchUrl(query))
        .then((res) => res.json())
        .then((data) => {
          showWeatherInfo(data);
        })
        .catch((err) => {
          console.log(err);
          const $cityName = document.getElementById("city-name");
          $cityName.innerText = `"${query}" - is wrong City name!`;
        });
    }
  };
  const getResponseForDays = (query) => {
    if (query) {
      fetch(getSearchUrlForDays(query))
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
          const $cityName = document.getElementById("city-name");
          $cityName.innerText = `"${query}" - is wrong City name!`;
        });
    }
  };

  document.addEventListener("click", (event) => {
    if (event.target == $searchButton || event.target == $searchIcon) {
      getResponse($input.value.toLowerCase());
      getResponseForDays($input.value.toLowerCase());
    }
  });
  document.addEventListener("keypress", (event) => {
    if (event.target == $input && event.code == "Enter") {
      getResponse($input.value.toLowerCase());
      getResponseForDays($input.value.toLowerCase());
    }
  });
}
