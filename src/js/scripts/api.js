"use strict";
import { showWeatherInfo, showWeatherHourlyInfo } from "./render";
import { getGeo } from "./geo";
import { useMap } from "./map";
import { changeBGByWeather } from "./bg";

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

  const getResponse = (query) => {
    if (query) {
      fetch(getSearchUrl(query))
        .then((res) => res.json())
        .then((data) => {
          showWeatherInfo(data);
          let coords = [data.coord.lat, data.coord.lon];
          useMap(coords);
          if (window.matchMedia("(min-width: 768px)").matches) {
            changeBGByWeather(data);
          } else {
            return true;
          }
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
          showWeatherHourlyInfo(data);
        })
        .catch((err) => {
          console.log(err);
          const $cityName = document.getElementById("city-name");
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
