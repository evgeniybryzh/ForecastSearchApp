"use strict";
import { showWeatherInfo } from "./render";
import { showWeatherHourlyInfo } from "./render";
import { useMap } from "./map";
export const getGeo = () => {
  function success(pos) {
    const crd = pos.coords;
    const API_KEY_CRD = "d6e7fd6926ec77363ffce0e10bfe83b3";
    const geoLink = `https://api.openweathermap.org/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&appid=${API_KEY_CRD}`;
    const hourlyGeoLink = `https://api.openweathermap.org/data/2.5/forecast?lat=${crd.latitude}&lon=${crd.longitude}&appid=${API_KEY_CRD}`;
    const getResponse = () => {
      fetch(geoLink)
        .then((res) => res.json())
        .then((data) => {
          showWeatherInfo(data);
          let coords = [data.coord.lat, data.coord.lon];
          useMap(coords);
        })
        .catch((err) => {
          console.log(err);
          $cityName.innerText = `Write City name to watch the forecast`;
        });
    };
    const getResponseForDays = () => {
      fetch(hourlyGeoLink)
        .then((res) => res.json())
        .then((data) => {
          showWeatherHourlyInfo(data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getResponse();
    getResponseForDays();
  }
  navigator.geolocation.getCurrentPosition(success);
};
getGeo();
