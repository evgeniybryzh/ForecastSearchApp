"use strict";
export const showWeatherInfo = (data) => {
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
  $cityName.style.color = "white";
  $cityName.innerText = `${cityName}, ${cityCountry}`;
  if (cityCountry == undefined) {
    $cityName.innerText = `${cityName}`;
  }
  if (cityName == "Avtozavodskiy Rayon") {
    $cityName.innerText = `Kremenchuk, ${cityCountry}`;
  }

  $temperature.innerHTML = `${currentTemp} &deg;`;
  $weatherIconBig.setAttribute("src", icon);
  $humidityInfo.innerText = `Humidity:  ${humidity}%`;
  $pressureInfo.innerText = `Pressure: ${pressure} hPa`;
  $windDirInfo.innerText = `Wind Direction: ${windDirection} deg`;
  $windSpeedInfo.innerText = `Wind Speed: ${windSpeed} mps`;
};

export const showWeatherHourlyInfo = (data) => {
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
  const $hourlyTemperatureFirst = document.getElementById(
    "hourly-00-temperature"
  );
  $hourlyTemperatureFirst.innerHTML = `${Math.round(
    data.list[0].main.temp - 273.15
  )} &deg;`;
  const $hourlyIconFirst = document.getElementById("hourly-00-icon");
  $hourlyIconFirst.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png`
  );

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
  const $hourlyTemperaturesecond = document.getElementById(
    "hourly-06-temperature"
  );
  $hourlyTemperaturesecond.innerHTML = `${Math.round(
    data.list[1].main.temp - 273.15
  )} &deg;`;
  const $hourlyIconsecond = document.getElementById("hourly-06-icon");
  $hourlyIconsecond.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${data.list[1].weather[0].icon}@2x.png`
  );

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
  const $hourlyTemperatureThird = document.getElementById(
    "hourly-12-temperature"
  );
  $hourlyTemperatureThird.innerHTML = `${Math.round(
    data.list[2].main.temp - 273.15
  )} &deg;`;
  const $hourlyIconThird = document.getElementById("hourly-12-icon");
  $hourlyIconThird.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${data.list[2].weather[0].icon}@2x.png`
  );

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
  const $hourlyTemperatureFourth = document.getElementById(
    "hourly-18-temperature"
  );
  $hourlyTemperatureFourth.innerHTML = `${Math.round(
    data.list[3].main.temp - 273.15
  )} &deg;`;
  const $hourlyIconFourth = document.getElementById("hourly-18-icon");
  $hourlyIconFourth.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${data.list[3].weather[0].icon}@2x.png`
  );

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
  const $hourlyTemperatureLast = document.getElementById(
    "hourly-21-temperature"
  );
  $hourlyTemperatureLast.innerHTML = `${Math.round(
    data.list[4].main.temp - 273.15
  )} &deg;`;
  const $hourlyIconLast = document.getElementById("hourly-21-icon");
  $hourlyIconLast.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${data.list[4].weather[0].icon}@2x.png`
  );
};
