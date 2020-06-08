"use strict";

export function getResponse() {
  const API_KEY = "d6e7fd6926ec77363ffce0e10bfe83b3";
  const BASE_URL = `http://api.openweathermap.org/data/2.5/weather?q=`;

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

  const showWeatherInfo = (data) => {
    const cityName = data.name;
    const cityCountry = data.sys.country;
    const currentTemp = Math.round(data.main.temp - 273.15);
    const humidity = data.main.humidity;
    const pressure = data.main.pressure;
    const currentWeather = data.weather[0].main;
    const windDirection = data.wind.deg;
    const windSpeed = data.wind.speed;
    const icon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    console.log(
      cityName,
      cityCountry,
      currentTemp,
      humidity,
      pressure,
      currentWeather,
      windDirection,
      windSpeed
    );
  };

  const getResponse = (query) => {
    if (query) {
      fetch(getSearchUrl(query))
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          showWeatherInfo(data);
        })
        .catch((err) => console.log(err));
    }
  };

  document.addEventListener("click", (event) => {
    if (event.target == $searchButton || event.target == $searchIcon) {
      getResponse($input.value);
    }
  });
}
