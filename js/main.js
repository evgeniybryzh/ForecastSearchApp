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

  const getGeo = () => {
    function success(pos) {
      const crd = pos.coords;
      const API_KEY_CRD = "d6e7fd6926ec77363ffce0e10bfe83b3";
      const geoLink = `https://api.openweathermap.org/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&appid=${API_KEY_CRD}`;
      const hourlyGeoLink = `https://api.openweathermap.org/data/2.5/forecast?lat=${crd.latitude}&lon=${crd.longitude}&appid=${API_KEY_CRD}`;

      const getResponse = () => {
        fetch(geoLink).then(res => res.json()).then(data => {
          showWeatherInfo(data);
          console.log(data);
        }).catch(err => {
          console.log(err);
          const $cityName = document.getElementById("city-name");
          $cityName.innerText = `Write City name to watch the forecast`;
        });
      };

      const getResponseForDays = () => {
        fetch(hourlyGeoLink).then(res => res.json()).then(data => {
          showWeatherHourlyInfo(data);
        }).catch(err => {
          console.log(err);
          const $cityName = document.getElementById("city-name");
        });
      };

      getResponse();
      getResponseForDays();
    }

    navigator.geolocation.getCurrentPosition(success);
  };
  getGeo();

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

  /*!
   * Glide.js v3.4.1
   * (c) 2013-2019 Jędrzej Chałubek <jedrzej.chalubek@gmail.com> (http://jedrzejchalubek.com/)
   * Released under the MIT License.
   */
  var defaults = {
    /**
     * Type of the movement.
     *
     * Available types:
     * `slider` - Rewinds slider to the start/end when it reaches the first or last slide.
     * `carousel` - Changes slides without starting over when it reaches the first or last slide.
     *
     * @type {String}
     */
    type: 'slider',

    /**
     * Start at specific slide number defined with zero-based index.
     *
     * @type {Number}
     */
    startAt: 0,

    /**
     * A number of slides visible on the single viewport.
     *
     * @type {Number}
     */
    perView: 1,

    /**
     * Focus currently active slide at a specified position in the track.
     *
     * Available inputs:
     * `center` - Current slide will be always focused at the center of a track.
     * `0,1,2,3...` - Current slide will be focused on the specified zero-based index.
     *
     * @type {String|Number}
     */
    focusAt: 0,

    /**
     * A size of the gap added between slides.
     *
     * @type {Number}
     */
    gap: 10,

    /**
     * Change slides after a specified interval. Use `false` for turning off autoplay.
     *
     * @type {Number|Boolean}
     */
    autoplay: false,

    /**
     * Stop autoplay on mouseover event.
     *
     * @type {Boolean}
     */
    hoverpause: true,

    /**
     * Allow for changing slides with left and right keyboard arrows.
     *
     * @type {Boolean}
     */
    keyboard: true,

    /**
     * Stop running `perView` number of slides from the end. Use this
     * option if you don't want to have an empty space after
     * a slider. Works only with `slider` type and a
     * non-centered `focusAt` setting.
     *
     * @type {Boolean}
     */
    bound: false,

    /**
     * Minimal swipe distance needed to change the slide. Use `false` for turning off a swiping.
     *
     * @type {Number|Boolean}
     */
    swipeThreshold: 80,

    /**
     * Minimal mouse drag distance needed to change the slide. Use `false` for turning off a dragging.
     *
     * @type {Number|Boolean}
     */
    dragThreshold: 120,

    /**
     * A maximum number of slides to which movement will be made on swiping or dragging. Use `false` for unlimited.
     *
     * @type {Number|Boolean}
     */
    perTouch: false,

    /**
     * Moving distance ratio of the slides on a swiping and dragging.
     *
     * @type {Number}
     */
    touchRatio: 0.5,

    /**
     * Angle required to activate slides moving on swiping or dragging.
     *
     * @type {Number}
     */
    touchAngle: 45,

    /**
     * Duration of the animation in milliseconds.
     *
     * @type {Number}
     */
    animationDuration: 400,

    /**
     * Allows looping the `slider` type. Slider will rewind to the first/last slide when it's at the start/end.
     *
     * @type {Boolean}
     */
    rewind: true,

    /**
     * Duration of the rewinding animation of the `slider` type in milliseconds.
     *
     * @type {Number}
     */
    rewindDuration: 800,

    /**
     * Easing function for the animation.
     *
     * @type {String}
     */
    animationTimingFunc: 'cubic-bezier(.165, .840, .440, 1)',

    /**
     * Throttle costly events at most once per every wait milliseconds.
     *
     * @type {Number}
     */
    throttle: 10,

    /**
     * Moving direction mode.
     *
     * Available inputs:
     * - 'ltr' - left to right movement,
     * - 'rtl' - right to left movement.
     *
     * @type {String}
     */
    direction: 'ltr',

    /**
     * The distance value of the next and previous viewports which
     * have to peek in the current view. Accepts number and
     * pixels as a string. Left and right peeking can be
     * set up separately with a directions object.
     *
     * For example:
     * `100` - Peek 100px on the both sides.
     * { before: 100, after: 50 }` - Peek 100px on the left side and 50px on the right side.
     *
     * @type {Number|String|Object}
     */
    peek: 0,

    /**
     * Collection of options applied at specified media breakpoints.
     * For example: display two slides per view under 800px.
     * `{
     *   '800px': {
     *     perView: 2
     *   }
     * }`
     */
    breakpoints: {},

    /**
     * Collection of internally used HTML classes.
     *
     * @todo Refactor `slider` and `carousel` properties to single `type: { slider: '', carousel: '' }` object
     * @type {Object}
     */
    classes: {
      direction: {
        ltr: 'glide--ltr',
        rtl: 'glide--rtl'
      },
      slider: 'glide--slider',
      carousel: 'glide--carousel',
      swipeable: 'glide--swipeable',
      dragging: 'glide--dragging',
      cloneSlide: 'glide__slide--clone',
      activeNav: 'glide__bullet--active',
      activeSlide: 'glide__slide--active',
      disabledArrow: 'glide__arrow--disabled'
    }
  };
  /**
   * Outputs warning message to the bowser console.
   *
   * @param  {String} msg
   * @return {Void}
   */

  function warn(msg) {
    console.error("[Glide warn]: " + msg);
  }

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };

  var classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  var createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  var get = function get(object, property, receiver) {
    if (object === null) object = Function.prototype;
    var desc = Object.getOwnPropertyDescriptor(object, property);

    if (desc === undefined) {
      var parent = Object.getPrototypeOf(object);

      if (parent === null) {
        return undefined;
      } else {
        return get(parent, property, receiver);
      }
    } else if ("value" in desc) {
      return desc.value;
    } else {
      var getter = desc.get;

      if (getter === undefined) {
        return undefined;
      }

      return getter.call(receiver);
    }
  };

  var inherits = function (subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  };

  var possibleConstructorReturn = function (self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  };
  /**
   * Converts value entered as number
   * or string to integer value.
   *
   * @param {String} value
   * @returns {Number}
   */


  function toInt(value) {
    return parseInt(value);
  }
  /**
   * Converts value entered as number
   * or string to flat value.
   *
   * @param {String} value
   * @returns {Number}
   */


  function toFloat(value) {
    return parseFloat(value);
  }
  /**
   * Indicates whether the specified value is a string.
   *
   * @param  {*}   value
   * @return {Boolean}
   */


  function isString(value) {
    return typeof value === 'string';
  }
  /**
   * Indicates whether the specified value is an object.
   *
   * @param  {*} value
   * @return {Boolean}
   *
   * @see https://github.com/jashkenas/underscore
   */


  function isObject(value) {
    var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
    return type === 'function' || type === 'object' && !!value; // eslint-disable-line no-mixed-operators
  }
  /**
   * Indicates whether the specified value is a number.
   *
   * @param  {*} value
   * @return {Boolean}
   */


  function isNumber(value) {
    return typeof value === 'number';
  }
  /**
   * Indicates whether the specified value is a function.
   *
   * @param  {*} value
   * @return {Boolean}
   */


  function isFunction(value) {
    return typeof value === 'function';
  }
  /**
   * Indicates whether the specified value is undefined.
   *
   * @param  {*} value
   * @return {Boolean}
   */


  function isUndefined(value) {
    return typeof value === 'undefined';
  }
  /**
   * Indicates whether the specified value is an array.
   *
   * @param  {*} value
   * @return {Boolean}
   */


  function isArray(value) {
    return value.constructor === Array;
  }
  /**
   * Creates and initializes specified collection of extensions.
   * Each extension receives access to instance of glide and rest of components.
   *
   * @param {Object} glide
   * @param {Object} extensions
   *
   * @returns {Object}
   */


  function mount(glide, extensions, events) {
    var components = {};

    for (var name in extensions) {
      if (isFunction(extensions[name])) {
        components[name] = extensions[name](glide, components, events);
      } else {
        warn('Extension must be a function');
      }
    }

    for (var _name in components) {
      if (isFunction(components[_name].mount)) {
        components[_name].mount();
      }
    }

    return components;
  }
  /**
   * Defines getter and setter property on the specified object.
   *
   * @param  {Object} obj         Object where property has to be defined.
   * @param  {String} prop        Name of the defined property.
   * @param  {Object} definition  Get and set definitions for the property.
   * @return {Void}
   */


  function define(obj, prop, definition) {
    Object.defineProperty(obj, prop, definition);
  }
  /**
   * Sorts aphabetically object keys.
   *
   * @param  {Object} obj
   * @return {Object}
   */


  function sortKeys(obj) {
    return Object.keys(obj).sort().reduce(function (r, k) {
      r[k] = obj[k];
      return r[k], r;
    }, {});
  }
  /**
   * Merges passed settings object with default options.
   *
   * @param  {Object} defaults
   * @param  {Object} settings
   * @return {Object}
   */


  function mergeOptions(defaults, settings) {
    var options = _extends({}, defaults, settings); // `Object.assign` do not deeply merge objects, so we
    // have to do it manually for every nested object
    // in options. Although it does not look smart,
    // it's smaller and faster than some fancy
    // merging deep-merge algorithm script.


    if (settings.hasOwnProperty('classes')) {
      options.classes = _extends({}, defaults.classes, settings.classes);

      if (settings.classes.hasOwnProperty('direction')) {
        options.classes.direction = _extends({}, defaults.classes.direction, settings.classes.direction);
      }
    }

    if (settings.hasOwnProperty('breakpoints')) {
      options.breakpoints = _extends({}, defaults.breakpoints, settings.breakpoints);
    }

    return options;
  }

  var EventsBus = function () {
    /**
     * Construct a EventBus instance.
     *
     * @param {Object} events
     */
    function EventsBus() {
      var events = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      classCallCheck(this, EventsBus);
      this.events = events;
      this.hop = events.hasOwnProperty;
    }
    /**
     * Adds listener to the specifed event.
     *
     * @param {String|Array} event
     * @param {Function} handler
     */


    createClass(EventsBus, [{
      key: 'on',
      value: function on(event, handler) {
        if (isArray(event)) {
          for (var i = 0; i < event.length; i++) {
            this.on(event[i], handler);
          }
        } // Create the event's object if not yet created


        if (!this.hop.call(this.events, event)) {
          this.events[event] = [];
        } // Add the handler to queue


        var index = this.events[event].push(handler) - 1; // Provide handle back for removal of event

        return {
          remove: function remove() {
            delete this.events[event][index];
          }
        };
      }
      /**
       * Runs registered handlers for specified event.
       *
       * @param {String|Array} event
       * @param {Object=} context
       */

    }, {
      key: 'emit',
      value: function emit(event, context) {
        if (isArray(event)) {
          for (var i = 0; i < event.length; i++) {
            this.emit(event[i], context);
          }
        } // If the event doesn't exist, or there's no handlers in queue, just leave


        if (!this.hop.call(this.events, event)) {
          return;
        } // Cycle through events queue, fire!


        this.events[event].forEach(function (item) {
          item(context || {});
        });
      }
    }]);
    return EventsBus;
  }();

  var Glide = function () {
    /**
     * Construct glide.
     *
     * @param  {String} selector
     * @param  {Object} options
     */
    function Glide(selector) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      classCallCheck(this, Glide);
      this._c = {};
      this._t = [];
      this._e = new EventsBus();
      this.disabled = false;
      this.selector = selector;
      this.settings = mergeOptions(defaults, options);
      this.index = this.settings.startAt;
    }
    /**
     * Initializes glide.
     *
     * @param {Object} extensions Collection of extensions to initialize.
     * @return {Glide}
     */


    createClass(Glide, [{
      key: 'mount',
      value: function mount$$1() {
        var extensions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        this._e.emit('mount.before');

        if (isObject(extensions)) {
          this._c = mount(this, extensions, this._e);
        } else {
          warn('You need to provide a object on `mount()`');
        }

        this._e.emit('mount.after');

        return this;
      }
      /**
       * Collects an instance `translate` transformers.
       *
       * @param  {Array} transformers Collection of transformers.
       * @return {Void}
       */

    }, {
      key: 'mutate',
      value: function mutate() {
        var transformers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

        if (isArray(transformers)) {
          this._t = transformers;
        } else {
          warn('You need to provide a array on `mutate()`');
        }

        return this;
      }
      /**
       * Updates glide with specified settings.
       *
       * @param {Object} settings
       * @return {Glide}
       */

    }, {
      key: 'update',
      value: function update() {
        var settings = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        this.settings = mergeOptions(this.settings, settings);

        if (settings.hasOwnProperty('startAt')) {
          this.index = settings.startAt;
        }

        this._e.emit('update');

        return this;
      }
      /**
       * Change slide with specified pattern. A pattern must be in the special format:
       * `>` - Move one forward
       * `<` - Move one backward
       * `={i}` - Go to {i} zero-based slide (eq. '=1', will go to second slide)
       * `>>` - Rewinds to end (last slide)
       * `<<` - Rewinds to start (first slide)
       *
       * @param {String} pattern
       * @return {Glide}
       */

    }, {
      key: 'go',
      value: function go(pattern) {
        this._c.Run.make(pattern);

        return this;
      }
      /**
       * Move track by specified distance.
       *
       * @param {String} distance
       * @return {Glide}
       */

    }, {
      key: 'move',
      value: function move(distance) {
        this._c.Transition.disable();

        this._c.Move.make(distance);

        return this;
      }
      /**
       * Destroy instance and revert all changes done by this._c.
       *
       * @return {Glide}
       */

    }, {
      key: 'destroy',
      value: function destroy() {
        this._e.emit('destroy');

        return this;
      }
      /**
       * Start instance autoplaying.
       *
       * @param {Boolean|Number} interval Run autoplaying with passed interval regardless of `autoplay` settings
       * @return {Glide}
       */

    }, {
      key: 'play',
      value: function play() {
        var interval = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

        if (interval) {
          this.settings.autoplay = interval;
        }

        this._e.emit('play');

        return this;
      }
      /**
       * Stop instance autoplaying.
       *
       * @return {Glide}
       */

    }, {
      key: 'pause',
      value: function pause() {
        this._e.emit('pause');

        return this;
      }
      /**
       * Sets glide into a idle status.
       *
       * @return {Glide}
       */

    }, {
      key: 'disable',
      value: function disable() {
        this.disabled = true;
        return this;
      }
      /**
       * Sets glide into a active status.
       *
       * @return {Glide}
       */

    }, {
      key: 'enable',
      value: function enable() {
        this.disabled = false;
        return this;
      }
      /**
       * Adds cuutom event listener with handler.
       *
       * @param  {String|Array} event
       * @param  {Function} handler
       * @return {Glide}
       */

    }, {
      key: 'on',
      value: function on(event, handler) {
        this._e.on(event, handler);

        return this;
      }
      /**
       * Checks if glide is a precised type.
       *
       * @param  {String} name
       * @return {Boolean}
       */

    }, {
      key: 'isType',
      value: function isType(name) {
        return this.settings.type === name;
      }
      /**
       * Gets value of the core options.
       *
       * @return {Object}
       */

    }, {
      key: 'settings',
      get: function get$$1() {
        return this._o;
      }
      /**
       * Sets value of the core options.
       *
       * @param  {Object} o
       * @return {Void}
       */
      ,
      set: function set$$1(o) {
        if (isObject(o)) {
          this._o = o;
        } else {
          warn('Options must be an `object` instance.');
        }
      }
      /**
       * Gets current index of the slider.
       *
       * @return {Object}
       */

    }, {
      key: 'index',
      get: function get$$1() {
        return this._i;
      }
      /**
       * Sets current index a slider.
       *
       * @return {Object}
       */
      ,
      set: function set$$1(i) {
        this._i = toInt(i);
      }
      /**
       * Gets type name of the slider.
       *
       * @return {String}
       */

    }, {
      key: 'type',
      get: function get$$1() {
        return this.settings.type;
      }
      /**
       * Gets value of the idle status.
       *
       * @return {Boolean}
       */

    }, {
      key: 'disabled',
      get: function get$$1() {
        return this._d;
      }
      /**
       * Sets value of the idle status.
       *
       * @return {Boolean}
       */
      ,
      set: function set$$1(status) {
        this._d = !!status;
      }
    }]);
    return Glide;
  }();

  function Run(Glide, Components, Events) {
    var Run = {
      /**
       * Initializes autorunning of the glide.
       *
       * @return {Void}
       */
      mount: function mount() {
        this._o = false;
      },

      /**
       * Makes glides running based on the passed moving schema.
       *
       * @param {String} move
       */
      make: function make(move) {
        var _this = this;

        if (!Glide.disabled) {
          Glide.disable();
          this.move = move;
          Events.emit('run.before', this.move);
          this.calculate();
          Events.emit('run', this.move);
          Components.Transition.after(function () {
            if (_this.isStart()) {
              Events.emit('run.start', _this.move);
            }

            if (_this.isEnd()) {
              Events.emit('run.end', _this.move);
            }

            if (_this.isOffset('<') || _this.isOffset('>')) {
              _this._o = false;
              Events.emit('run.offset', _this.move);
            }

            Events.emit('run.after', _this.move);
            Glide.enable();
          });
        }
      },

      /**
       * Calculates current index based on defined move.
       *
       * @return {Void}
       */
      calculate: function calculate() {
        var move = this.move,
            length = this.length;
        var steps = move.steps,
            direction = move.direction;
        var countableSteps = isNumber(toInt(steps)) && toInt(steps) !== 0;

        switch (direction) {
          case '>':
            if (steps === '>') {
              Glide.index = length;
            } else if (this.isEnd()) {
              if (!(Glide.isType('slider') && !Glide.settings.rewind)) {
                this._o = true;
                Glide.index = 0;
              }
            } else if (countableSteps) {
              Glide.index += Math.min(length - Glide.index, -toInt(steps));
            } else {
              Glide.index++;
            }

            break;

          case '<':
            if (steps === '<') {
              Glide.index = 0;
            } else if (this.isStart()) {
              if (!(Glide.isType('slider') && !Glide.settings.rewind)) {
                this._o = true;
                Glide.index = length;
              }
            } else if (countableSteps) {
              Glide.index -= Math.min(Glide.index, toInt(steps));
            } else {
              Glide.index--;
            }

            break;

          case '=':
            Glide.index = steps;
            break;

          default:
            warn('Invalid direction pattern [' + direction + steps + '] has been used');
            break;
        }
      },

      /**
       * Checks if we are on the first slide.
       *
       * @return {Boolean}
       */
      isStart: function isStart() {
        return Glide.index === 0;
      },

      /**
       * Checks if we are on the last slide.
       *
       * @return {Boolean}
       */
      isEnd: function isEnd() {
        return Glide.index === this.length;
      },

      /**
       * Checks if we are making a offset run.
       *
       * @param {String} direction
       * @return {Boolean}
       */
      isOffset: function isOffset(direction) {
        return this._o && this.move.direction === direction;
      }
    };
    define(Run, 'move', {
      /**
       * Gets value of the move schema.
       *
       * @returns {Object}
       */
      get: function get() {
        return this._m;
      },

      /**
       * Sets value of the move schema.
       *
       * @returns {Object}
       */
      set: function set(value) {
        var step = value.substr(1);
        this._m = {
          direction: value.substr(0, 1),
          steps: step ? toInt(step) ? toInt(step) : step : 0
        };
      }
    });
    define(Run, 'length', {
      /**
       * Gets value of the running distance based
       * on zero-indexing number of slides.
       *
       * @return {Number}
       */
      get: function get() {
        var settings = Glide.settings;
        var length = Components.Html.slides.length; // If the `bound` option is acitve, a maximum running distance should be
        // reduced by `perView` and `focusAt` settings. Running distance
        // should end before creating an empty space after instance.

        if (Glide.isType('slider') && settings.focusAt !== 'center' && settings.bound) {
          return length - 1 - (toInt(settings.perView) - 1) + toInt(settings.focusAt);
        }

        return length - 1;
      }
    });
    define(Run, 'offset', {
      /**
       * Gets status of the offsetting flag.
       *
       * @return {Boolean}
       */
      get: function get() {
        return this._o;
      }
    });
    return Run;
  }
  /**
   * Returns a current time.
   *
   * @return {Number}
   */


  function now() {
    return new Date().getTime();
  }
  /**
   * Returns a function, that, when invoked, will only be triggered
   * at most once during a given window of time.
   *
   * @param {Function} func
   * @param {Number} wait
   * @param {Object=} options
   * @return {Function}
   *
   * @see https://github.com/jashkenas/underscore
   */


  function throttle(func, wait, options) {
    var timeout = void 0,
        context = void 0,
        args = void 0,
        result = void 0;
    var previous = 0;
    if (!options) options = {};

    var later = function later() {
      previous = options.leading === false ? 0 : now();
      timeout = null;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    };

    var throttled = function throttled() {
      var at = now();
      if (!previous && options.leading === false) previous = at;
      var remaining = wait - (at - previous);
      context = this;
      args = arguments;

      if (remaining <= 0 || remaining > wait) {
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }

        previous = at;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }

      return result;
    };

    throttled.cancel = function () {
      clearTimeout(timeout);
      previous = 0;
      timeout = context = args = null;
    };

    return throttled;
  }

  var MARGIN_TYPE = {
    ltr: ['marginLeft', 'marginRight'],
    rtl: ['marginRight', 'marginLeft']
  };

  function Gaps(Glide, Components, Events) {
    var Gaps = {
      /**
       * Applies gaps between slides. First and last
       * slides do not receive it's edge margins.
       *
       * @param {HTMLCollection} slides
       * @return {Void}
       */
      apply: function apply(slides) {
        for (var i = 0, len = slides.length; i < len; i++) {
          var style = slides[i].style;
          var direction = Components.Direction.value;

          if (i !== 0) {
            style[MARGIN_TYPE[direction][0]] = this.value / 2 + 'px';
          } else {
            style[MARGIN_TYPE[direction][0]] = '';
          }

          if (i !== slides.length - 1) {
            style[MARGIN_TYPE[direction][1]] = this.value / 2 + 'px';
          } else {
            style[MARGIN_TYPE[direction][1]] = '';
          }
        }
      },

      /**
       * Removes gaps from the slides.
       *
       * @param {HTMLCollection} slides
       * @returns {Void}
      */
      remove: function remove(slides) {
        for (var i = 0, len = slides.length; i < len; i++) {
          var style = slides[i].style;
          style.marginLeft = '';
          style.marginRight = '';
        }
      }
    };
    define(Gaps, 'value', {
      /**
       * Gets value of the gap.
       *
       * @returns {Number}
       */
      get: function get() {
        return toInt(Glide.settings.gap);
      }
    });
    define(Gaps, 'grow', {
      /**
       * Gets additional dimentions value caused by gaps.
       * Used to increase width of the slides wrapper.
       *
       * @returns {Number}
       */
      get: function get() {
        return Gaps.value * (Components.Sizes.length - 1);
      }
    });
    define(Gaps, 'reductor', {
      /**
       * Gets reduction value caused by gaps.
       * Used to subtract width of the slides.
       *
       * @returns {Number}
       */
      get: function get() {
        var perView = Glide.settings.perView;
        return Gaps.value * (perView - 1) / perView;
      }
    });
    /**
     * Apply calculated gaps:
     * - after building, so slides (including clones) will receive proper margins
     * - on updating via API, to recalculate gaps with new options
     */

    Events.on(['build.after', 'update'], throttle(function () {
      Gaps.apply(Components.Html.wrapper.children);
    }, 30));
    /**
     * Remove gaps:
     * - on destroying to bring markup to its inital state
     */

    Events.on('destroy', function () {
      Gaps.remove(Components.Html.wrapper.children);
    });
    return Gaps;
  }
  /**
   * Finds siblings nodes of the passed node.
   *
   * @param  {Element} node
   * @return {Array}
   */


  function siblings(node) {
    if (node && node.parentNode) {
      var n = node.parentNode.firstChild;
      var matched = [];

      for (; n; n = n.nextSibling) {
        if (n.nodeType === 1 && n !== node) {
          matched.push(n);
        }
      }

      return matched;
    }

    return [];
  }
  /**
   * Checks if passed node exist and is a valid element.
   *
   * @param  {Element} node
   * @return {Boolean}
   */


  function exist(node) {
    if (node && node instanceof window.HTMLElement) {
      return true;
    }

    return false;
  }

  var TRACK_SELECTOR = '[data-glide-el="track"]';

  function Html(Glide, Components) {
    var Html = {
      /**
       * Setup slider HTML nodes.
       *
       * @param {Glide} glide
       */
      mount: function mount() {
        this.root = Glide.selector;
        this.track = this.root.querySelector(TRACK_SELECTOR);
        this.slides = Array.prototype.slice.call(this.wrapper.children).filter(function (slide) {
          return !slide.classList.contains(Glide.settings.classes.cloneSlide);
        });
      }
    };
    define(Html, 'root', {
      /**
       * Gets node of the glide main element.
       *
       * @return {Object}
       */
      get: function get() {
        return Html._r;
      },

      /**
       * Sets node of the glide main element.
       *
       * @return {Object}
       */
      set: function set(r) {
        if (isString(r)) {
          r = document.querySelector(r);
        }

        if (exist(r)) {
          Html._r = r;
        } else {
          warn('Root element must be a existing Html node');
        }
      }
    });
    define(Html, 'track', {
      /**
       * Gets node of the glide track with slides.
       *
       * @return {Object}
       */
      get: function get() {
        return Html._t;
      },

      /**
       * Sets node of the glide track with slides.
       *
       * @return {Object}
       */
      set: function set(t) {
        if (exist(t)) {
          Html._t = t;
        } else {
          warn('Could not find track element. Please use ' + TRACK_SELECTOR + ' attribute.');
        }
      }
    });
    define(Html, 'wrapper', {
      /**
       * Gets node of the slides wrapper.
       *
       * @return {Object}
       */
      get: function get() {
        return Html.track.children[0];
      }
    });
    return Html;
  }

  function Peek(Glide, Components, Events) {
    var Peek = {
      /**
       * Setups how much to peek based on settings.
       *
       * @return {Void}
       */
      mount: function mount() {
        this.value = Glide.settings.peek;
      }
    };
    define(Peek, 'value', {
      /**
       * Gets value of the peek.
       *
       * @returns {Number|Object}
       */
      get: function get() {
        return Peek._v;
      },

      /**
       * Sets value of the peek.
       *
       * @param {Number|Object} value
       * @return {Void}
       */
      set: function set(value) {
        if (isObject(value)) {
          value.before = toInt(value.before);
          value.after = toInt(value.after);
        } else {
          value = toInt(value);
        }

        Peek._v = value;
      }
    });
    define(Peek, 'reductor', {
      /**
       * Gets reduction value caused by peek.
       *
       * @returns {Number}
       */
      get: function get() {
        var value = Peek.value;
        var perView = Glide.settings.perView;

        if (isObject(value)) {
          return value.before / perView + value.after / perView;
        }

        return value * 2 / perView;
      }
    });
    /**
     * Recalculate peeking sizes on:
     * - when resizing window to update to proper percents
     */

    Events.on(['resize', 'update'], function () {
      Peek.mount();
    });
    return Peek;
  }

  function Move(Glide, Components, Events) {
    var Move = {
      /**
       * Constructs move component.
       *
       * @returns {Void}
       */
      mount: function mount() {
        this._o = 0;
      },

      /**
       * Calculates a movement value based on passed offset and currently active index.
       *
       * @param  {Number} offset
       * @return {Void}
       */
      make: function make() {
        var _this = this;

        var offset = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        this.offset = offset;
        Events.emit('move', {
          movement: this.value
        });
        Components.Transition.after(function () {
          Events.emit('move.after', {
            movement: _this.value
          });
        });
      }
    };
    define(Move, 'offset', {
      /**
       * Gets an offset value used to modify current translate.
       *
       * @return {Object}
       */
      get: function get() {
        return Move._o;
      },

      /**
       * Sets an offset value used to modify current translate.
       *
       * @return {Object}
       */
      set: function set(value) {
        Move._o = !isUndefined(value) ? toInt(value) : 0;
      }
    });
    define(Move, 'translate', {
      /**
       * Gets a raw movement value.
       *
       * @return {Number}
       */
      get: function get() {
        return Components.Sizes.slideWidth * Glide.index;
      }
    });
    define(Move, 'value', {
      /**
       * Gets an actual movement value corrected by offset.
       *
       * @return {Number}
       */
      get: function get() {
        var offset = this.offset;
        var translate = this.translate;

        if (Components.Direction.is('rtl')) {
          return translate + offset;
        }

        return translate - offset;
      }
    });
    /**
     * Make movement to proper slide on:
     * - before build, so glide will start at `startAt` index
     * - on each standard run to move to newly calculated index
     */

    Events.on(['build.before', 'run'], function () {
      Move.make();
    });
    return Move;
  }

  function Sizes(Glide, Components, Events) {
    var Sizes = {
      /**
       * Setups dimentions of slides.
       *
       * @return {Void}
       */
      setupSlides: function setupSlides() {
        var width = this.slideWidth + 'px';
        var slides = Components.Html.slides;

        for (var i = 0; i < slides.length; i++) {
          slides[i].style.width = width;
        }
      },

      /**
       * Setups dimentions of slides wrapper.
       *
       * @return {Void}
       */
      setupWrapper: function setupWrapper(dimention) {
        Components.Html.wrapper.style.width = this.wrapperSize + 'px';
      },

      /**
       * Removes applied styles from HTML elements.
       *
       * @returns {Void}
       */
      remove: function remove() {
        var slides = Components.Html.slides;

        for (var i = 0; i < slides.length; i++) {
          slides[i].style.width = '';
        }

        Components.Html.wrapper.style.width = '';
      }
    };
    define(Sizes, 'length', {
      /**
       * Gets count number of the slides.
       *
       * @return {Number}
       */
      get: function get() {
        return Components.Html.slides.length;
      }
    });
    define(Sizes, 'width', {
      /**
       * Gets width value of the glide.
       *
       * @return {Number}
       */
      get: function get() {
        return Components.Html.root.offsetWidth;
      }
    });
    define(Sizes, 'wrapperSize', {
      /**
       * Gets size of the slides wrapper.
       *
       * @return {Number}
       */
      get: function get() {
        return Sizes.slideWidth * Sizes.length + Components.Gaps.grow + Components.Clones.grow;
      }
    });
    define(Sizes, 'slideWidth', {
      /**
       * Gets width value of the single slide.
       *
       * @return {Number}
       */
      get: function get() {
        return Sizes.width / Glide.settings.perView - Components.Peek.reductor - Components.Gaps.reductor;
      }
    });
    /**
     * Apply calculated glide's dimensions:
     * - before building, so other dimentions (e.g. translate) will be calculated propertly
     * - when resizing window to recalculate sildes dimensions
     * - on updating via API, to calculate dimensions based on new options
     */

    Events.on(['build.before', 'resize', 'update'], function () {
      Sizes.setupSlides();
      Sizes.setupWrapper();
    });
    /**
     * Remove calculated glide's dimensions:
     * - on destoting to bring markup to its inital state
     */

    Events.on('destroy', function () {
      Sizes.remove();
    });
    return Sizes;
  }

  function Build(Glide, Components, Events) {
    var Build = {
      /**
       * Init glide building. Adds classes, sets
       * dimensions and setups initial state.
       *
       * @return {Void}
       */
      mount: function mount() {
        Events.emit('build.before');
        this.typeClass();
        this.activeClass();
        Events.emit('build.after');
      },

      /**
       * Adds `type` class to the glide element.
       *
       * @return {Void}
       */
      typeClass: function typeClass() {
        Components.Html.root.classList.add(Glide.settings.classes[Glide.settings.type]);
      },

      /**
       * Sets active class to current slide.
       *
       * @return {Void}
       */
      activeClass: function activeClass() {
        var classes = Glide.settings.classes;
        var slide = Components.Html.slides[Glide.index];

        if (slide) {
          slide.classList.add(classes.activeSlide);
          siblings(slide).forEach(function (sibling) {
            sibling.classList.remove(classes.activeSlide);
          });
        }
      },

      /**
       * Removes HTML classes applied at building.
       *
       * @return {Void}
       */
      removeClasses: function removeClasses() {
        var classes = Glide.settings.classes;
        Components.Html.root.classList.remove(classes[Glide.settings.type]);
        Components.Html.slides.forEach(function (sibling) {
          sibling.classList.remove(classes.activeSlide);
        });
      }
    };
    /**
     * Clear building classes:
     * - on destroying to bring HTML to its initial state
     * - on updating to remove classes before remounting component
     */

    Events.on(['destroy', 'update'], function () {
      Build.removeClasses();
    });
    /**
     * Remount component:
     * - on resizing of the window to calculate new dimentions
     * - on updating settings via API
     */

    Events.on(['resize', 'update'], function () {
      Build.mount();
    });
    /**
     * Swap active class of current slide:
     * - after each move to the new index
     */

    Events.on('move.after', function () {
      Build.activeClass();
    });
    return Build;
  }

  function Clones(Glide, Components, Events) {
    var Clones = {
      /**
       * Create pattern map and collect slides to be cloned.
       */
      mount: function mount() {
        this.items = [];

        if (Glide.isType('carousel')) {
          this.items = this.collect();
        }
      },

      /**
       * Collect clones with pattern.
       *
       * @return {Void}
       */
      collect: function collect() {
        var items = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
        var slides = Components.Html.slides;
        var _Glide$settings = Glide.settings,
            perView = _Glide$settings.perView,
            classes = _Glide$settings.classes;
        var peekIncrementer = +!!Glide.settings.peek;
        var part = perView + peekIncrementer;
        var start = slides.slice(0, part);
        var end = slides.slice(-part);

        for (var r = 0; r < Math.max(1, Math.floor(perView / slides.length)); r++) {
          for (var i = 0; i < start.length; i++) {
            var clone = start[i].cloneNode(true);
            clone.classList.add(classes.cloneSlide);
            items.push(clone);
          }

          for (var _i = 0; _i < end.length; _i++) {
            var _clone = end[_i].cloneNode(true);

            _clone.classList.add(classes.cloneSlide);

            items.unshift(_clone);
          }
        }

        return items;
      },

      /**
       * Append cloned slides with generated pattern.
       *
       * @return {Void}
       */
      append: function append() {
        var items = this.items;
        var _Components$Html = Components.Html,
            wrapper = _Components$Html.wrapper,
            slides = _Components$Html.slides;
        var half = Math.floor(items.length / 2);
        var prepend = items.slice(0, half).reverse();
        var append = items.slice(half, items.length);
        var width = Components.Sizes.slideWidth + 'px';

        for (var i = 0; i < append.length; i++) {
          wrapper.appendChild(append[i]);
        }

        for (var _i2 = 0; _i2 < prepend.length; _i2++) {
          wrapper.insertBefore(prepend[_i2], slides[0]);
        }

        for (var _i3 = 0; _i3 < items.length; _i3++) {
          items[_i3].style.width = width;
        }
      },

      /**
       * Remove all cloned slides.
       *
       * @return {Void}
       */
      remove: function remove() {
        var items = this.items;

        for (var i = 0; i < items.length; i++) {
          Components.Html.wrapper.removeChild(items[i]);
        }
      }
    };
    define(Clones, 'grow', {
      /**
       * Gets additional dimentions value caused by clones.
       *
       * @return {Number}
       */
      get: function get() {
        return (Components.Sizes.slideWidth + Components.Gaps.value) * Clones.items.length;
      }
    });
    /**
     * Append additional slide's clones:
     * - while glide's type is `carousel`
     */

    Events.on('update', function () {
      Clones.remove();
      Clones.mount();
      Clones.append();
    });
    /**
     * Append additional slide's clones:
     * - while glide's type is `carousel`
     */

    Events.on('build.before', function () {
      if (Glide.isType('carousel')) {
        Clones.append();
      }
    });
    /**
     * Remove clones HTMLElements:
     * - on destroying, to bring HTML to its initial state
     */

    Events.on('destroy', function () {
      Clones.remove();
    });
    return Clones;
  }

  var EventsBinder = function () {
    /**
     * Construct a EventsBinder instance.
     */
    function EventsBinder() {
      var listeners = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      classCallCheck(this, EventsBinder);
      this.listeners = listeners;
    }
    /**
     * Adds events listeners to arrows HTML elements.
     *
     * @param  {String|Array} events
     * @param  {Element|Window|Document} el
     * @param  {Function} closure
     * @param  {Boolean|Object} capture
     * @return {Void}
     */


    createClass(EventsBinder, [{
      key: 'on',
      value: function on(events, el, closure) {
        var capture = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

        if (isString(events)) {
          events = [events];
        }

        for (var i = 0; i < events.length; i++) {
          this.listeners[events[i]] = closure;
          el.addEventListener(events[i], this.listeners[events[i]], capture);
        }
      }
      /**
       * Removes event listeners from arrows HTML elements.
       *
       * @param  {String|Array} events
       * @param  {Element|Window|Document} el
       * @param  {Boolean|Object} capture
       * @return {Void}
       */

    }, {
      key: 'off',
      value: function off(events, el) {
        var capture = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

        if (isString(events)) {
          events = [events];
        }

        for (var i = 0; i < events.length; i++) {
          el.removeEventListener(events[i], this.listeners[events[i]], capture);
        }
      }
      /**
       * Destroy collected listeners.
       *
       * @returns {Void}
       */

    }, {
      key: 'destroy',
      value: function destroy() {
        delete this.listeners;
      }
    }]);
    return EventsBinder;
  }();

  function Resize(Glide, Components, Events) {
    /**
     * Instance of the binder for DOM Events.
     *
     * @type {EventsBinder}
     */
    var Binder = new EventsBinder();
    var Resize = {
      /**
       * Initializes window bindings.
       */
      mount: function mount() {
        this.bind();
      },

      /**
       * Binds `rezsize` listener to the window.
       * It's a costly event, so we are debouncing it.
       *
       * @return {Void}
       */
      bind: function bind() {
        Binder.on('resize', window, throttle(function () {
          Events.emit('resize');
        }, Glide.settings.throttle));
      },

      /**
       * Unbinds listeners from the window.
       *
       * @return {Void}
       */
      unbind: function unbind() {
        Binder.off('resize', window);
      }
    };
    /**
     * Remove bindings from window:
     * - on destroying, to remove added EventListener
     */

    Events.on('destroy', function () {
      Resize.unbind();
      Binder.destroy();
    });
    return Resize;
  }

  var VALID_DIRECTIONS = ['ltr', 'rtl'];
  var FLIPED_MOVEMENTS = {
    '>': '<',
    '<': '>',
    '=': '='
  };

  function Direction(Glide, Components, Events) {
    var Direction = {
      /**
       * Setups gap value based on settings.
       *
       * @return {Void}
       */
      mount: function mount() {
        this.value = Glide.settings.direction;
      },

      /**
       * Resolves pattern based on direction value
       *
       * @param {String} pattern
       * @returns {String}
       */
      resolve: function resolve(pattern) {
        var token = pattern.slice(0, 1);

        if (this.is('rtl')) {
          return pattern.split(token).join(FLIPED_MOVEMENTS[token]);
        }

        return pattern;
      },

      /**
       * Checks value of direction mode.
       *
       * @param {String} direction
       * @returns {Boolean}
       */
      is: function is(direction) {
        return this.value === direction;
      },

      /**
       * Applies direction class to the root HTML element.
       *
       * @return {Void}
       */
      addClass: function addClass() {
        Components.Html.root.classList.add(Glide.settings.classes.direction[this.value]);
      },

      /**
       * Removes direction class from the root HTML element.
       *
       * @return {Void}
       */
      removeClass: function removeClass() {
        Components.Html.root.classList.remove(Glide.settings.classes.direction[this.value]);
      }
    };
    define(Direction, 'value', {
      /**
       * Gets value of the direction.
       *
       * @returns {Number}
       */
      get: function get() {
        return Direction._v;
      },

      /**
       * Sets value of the direction.
       *
       * @param {String} value
       * @return {Void}
       */
      set: function set(value) {
        if (VALID_DIRECTIONS.indexOf(value) > -1) {
          Direction._v = value;
        } else {
          warn('Direction value must be `ltr` or `rtl`');
        }
      }
    });
    /**
     * Clear direction class:
     * - on destroy to bring HTML to its initial state
     * - on update to remove class before reappling bellow
     */

    Events.on(['destroy', 'update'], function () {
      Direction.removeClass();
    });
    /**
     * Remount component:
     * - on update to reflect changes in direction value
     */

    Events.on('update', function () {
      Direction.mount();
    });
    /**
     * Apply direction class:
     * - before building to apply class for the first time
     * - on updating to reapply direction class that may changed
     */

    Events.on(['build.before', 'update'], function () {
      Direction.addClass();
    });
    return Direction;
  }
  /**
   * Reflects value of glide movement.
   *
   * @param  {Object} Glide
   * @param  {Object} Components
   * @return {Object}
   */


  function Rtl(Glide, Components) {
    return {
      /**
       * Negates the passed translate if glide is in RTL option.
       *
       * @param  {Number} translate
       * @return {Number}
       */
      modify: function modify(translate) {
        if (Components.Direction.is('rtl')) {
          return -translate;
        }

        return translate;
      }
    };
  }
  /**
   * Updates glide movement with a `gap` settings.
   *
   * @param  {Object} Glide
   * @param  {Object} Components
   * @return {Object}
   */


  function Gap(Glide, Components) {
    return {
      /**
       * Modifies passed translate value with number in the `gap` settings.
       *
       * @param  {Number} translate
       * @return {Number}
       */
      modify: function modify(translate) {
        return translate + Components.Gaps.value * Glide.index;
      }
    };
  }
  /**
   * Updates glide movement with width of additional clones width.
   *
   * @param  {Object} Glide
   * @param  {Object} Components
   * @return {Object}
   */


  function Grow(Glide, Components) {
    return {
      /**
       * Adds to the passed translate width of the half of clones.
       *
       * @param  {Number} translate
       * @return {Number}
       */
      modify: function modify(translate) {
        return translate + Components.Clones.grow / 2;
      }
    };
  }
  /**
   * Updates glide movement with a `peek` settings.
   *
   * @param  {Object} Glide
   * @param  {Object} Components
   * @return {Object}
   */


  function Peeking(Glide, Components) {
    return {
      /**
       * Modifies passed translate value with a `peek` setting.
       *
       * @param  {Number} translate
       * @return {Number}
       */
      modify: function modify(translate) {
        if (Glide.settings.focusAt >= 0) {
          var peek = Components.Peek.value;

          if (isObject(peek)) {
            return translate - peek.before;
          }

          return translate - peek;
        }

        return translate;
      }
    };
  }
  /**
   * Updates glide movement with a `focusAt` settings.
   *
   * @param  {Object} Glide
   * @param  {Object} Components
   * @return {Object}
   */


  function Focusing(Glide, Components) {
    return {
      /**
       * Modifies passed translate value with index in the `focusAt` setting.
       *
       * @param  {Number} translate
       * @return {Number}
       */
      modify: function modify(translate) {
        var gap = Components.Gaps.value;
        var width = Components.Sizes.width;
        var focusAt = Glide.settings.focusAt;
        var slideWidth = Components.Sizes.slideWidth;

        if (focusAt === 'center') {
          return translate - (width / 2 - slideWidth / 2);
        }

        return translate - slideWidth * focusAt - gap * focusAt;
      }
    };
  }
  /**
   * Applies diffrent transformers on translate value.
   *
   * @param  {Object} Glide
   * @param  {Object} Components
   * @return {Object}
   */


  function mutator(Glide, Components, Events) {
    /**
     * Merge instance transformers with collection of default transformers.
     * It's important that the Rtl component be last on the list,
     * so it reflects all previous transformations.
     *
     * @type {Array}
     */
    var TRANSFORMERS = [Gap, Grow, Peeking, Focusing].concat(Glide._t, [Rtl]);
    return {
      /**
       * Piplines translate value with registered transformers.
       *
       * @param  {Number} translate
       * @return {Number}
       */
      mutate: function mutate(translate) {
        for (var i = 0; i < TRANSFORMERS.length; i++) {
          var transformer = TRANSFORMERS[i];

          if (isFunction(transformer) && isFunction(transformer().modify)) {
            translate = transformer(Glide, Components, Events).modify(translate);
          } else {
            warn('Transformer should be a function that returns an object with `modify()` method');
          }
        }

        return translate;
      }
    };
  }

  function Translate(Glide, Components, Events) {
    var Translate = {
      /**
       * Sets value of translate on HTML element.
       *
       * @param {Number} value
       * @return {Void}
       */
      set: function set(value) {
        var transform = mutator(Glide, Components).mutate(value);
        Components.Html.wrapper.style.transform = 'translate3d(' + -1 * transform + 'px, 0px, 0px)';
      },

      /**
       * Removes value of translate from HTML element.
       *
       * @return {Void}
       */
      remove: function remove() {
        Components.Html.wrapper.style.transform = '';
      }
    };
    /**
     * Set new translate value:
     * - on move to reflect index change
     * - on updating via API to reflect possible changes in options
     */

    Events.on('move', function (context) {
      var gap = Components.Gaps.value;
      var length = Components.Sizes.length;
      var width = Components.Sizes.slideWidth;

      if (Glide.isType('carousel') && Components.Run.isOffset('<')) {
        Components.Transition.after(function () {
          Events.emit('translate.jump');
          Translate.set(width * (length - 1));
        });
        return Translate.set(-width - gap * length);
      }

      if (Glide.isType('carousel') && Components.Run.isOffset('>')) {
        Components.Transition.after(function () {
          Events.emit('translate.jump');
          Translate.set(0);
        });
        return Translate.set(width * length + gap * length);
      }

      return Translate.set(context.movement);
    });
    /**
     * Remove translate:
     * - on destroying to bring markup to its inital state
     */

    Events.on('destroy', function () {
      Translate.remove();
    });
    return Translate;
  }

  function Transition(Glide, Components, Events) {
    /**
     * Holds inactivity status of transition.
     * When true transition is not applied.
     *
     * @type {Boolean}
     */
    var disabled = false;
    var Transition = {
      /**
       * Composes string of the CSS transition.
       *
       * @param {String} property
       * @return {String}
       */
      compose: function compose(property) {
        var settings = Glide.settings;

        if (!disabled) {
          return property + ' ' + this.duration + 'ms ' + settings.animationTimingFunc;
        }

        return property + ' 0ms ' + settings.animationTimingFunc;
      },

      /**
       * Sets value of transition on HTML element.
       *
       * @param {String=} property
       * @return {Void}
       */
      set: function set() {
        var property = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'transform';
        Components.Html.wrapper.style.transition = this.compose(property);
      },

      /**
       * Removes value of transition from HTML element.
       *
       * @return {Void}
       */
      remove: function remove() {
        Components.Html.wrapper.style.transition = '';
      },

      /**
       * Runs callback after animation.
       *
       * @param  {Function} callback
       * @return {Void}
       */
      after: function after(callback) {
        setTimeout(function () {
          callback();
        }, this.duration);
      },

      /**
       * Enable transition.
       *
       * @return {Void}
       */
      enable: function enable() {
        disabled = false;
        this.set();
      },

      /**
       * Disable transition.
       *
       * @return {Void}
       */
      disable: function disable() {
        disabled = true;
        this.set();
      }
    };
    define(Transition, 'duration', {
      /**
       * Gets duration of the transition based
       * on currently running animation type.
       *
       * @return {Number}
       */
      get: function get() {
        var settings = Glide.settings;

        if (Glide.isType('slider') && Components.Run.offset) {
          return settings.rewindDuration;
        }

        return settings.animationDuration;
      }
    });
    /**
     * Set transition `style` value:
     * - on each moving, because it may be cleared by offset move
     */

    Events.on('move', function () {
      Transition.set();
    });
    /**
     * Disable transition:
     * - before initial build to avoid transitioning from `0` to `startAt` index
     * - while resizing window and recalculating dimentions
     * - on jumping from offset transition at start and end edges in `carousel` type
     */

    Events.on(['build.before', 'resize', 'translate.jump'], function () {
      Transition.disable();
    });
    /**
     * Enable transition:
     * - on each running, because it may be disabled by offset move
     */

    Events.on('run', function () {
      Transition.enable();
    });
    /**
     * Remove transition:
     * - on destroying to bring markup to its inital state
     */

    Events.on('destroy', function () {
      Transition.remove();
    });
    return Transition;
  }
  /**
   * Test via a getter in the options object to see
   * if the passive property is accessed.
   *
   * @see https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md#feature-detection
   */


  var supportsPassive = false;

  try {
    var opts = Object.defineProperty({}, 'passive', {
      get: function get() {
        supportsPassive = true;
      }
    });
    window.addEventListener('testPassive', null, opts);
    window.removeEventListener('testPassive', null, opts);
  } catch (e) {}

  var supportsPassive$1 = supportsPassive;
  var START_EVENTS = ['touchstart', 'mousedown'];
  var MOVE_EVENTS = ['touchmove', 'mousemove'];
  var END_EVENTS = ['touchend', 'touchcancel', 'mouseup', 'mouseleave'];
  var MOUSE_EVENTS = ['mousedown', 'mousemove', 'mouseup', 'mouseleave'];

  function Swipe(Glide, Components, Events) {
    /**
     * Instance of the binder for DOM Events.
     *
     * @type {EventsBinder}
     */
    var Binder = new EventsBinder();
    var swipeSin = 0;
    var swipeStartX = 0;
    var swipeStartY = 0;
    var disabled = false;
    var capture = supportsPassive$1 ? {
      passive: true
    } : false;
    var Swipe = {
      /**
       * Initializes swipe bindings.
       *
       * @return {Void}
       */
      mount: function mount() {
        this.bindSwipeStart();
      },

      /**
       * Handler for `swipestart` event. Calculates entry points of the user's tap.
       *
       * @param {Object} event
       * @return {Void}
       */
      start: function start(event) {
        if (!disabled && !Glide.disabled) {
          this.disable();
          var swipe = this.touches(event);
          swipeSin = null;
          swipeStartX = toInt(swipe.pageX);
          swipeStartY = toInt(swipe.pageY);
          this.bindSwipeMove();
          this.bindSwipeEnd();
          Events.emit('swipe.start');
        }
      },

      /**
       * Handler for `swipemove` event. Calculates user's tap angle and distance.
       *
       * @param {Object} event
       */
      move: function move(event) {
        if (!Glide.disabled) {
          var _Glide$settings = Glide.settings,
              touchAngle = _Glide$settings.touchAngle,
              touchRatio = _Glide$settings.touchRatio,
              classes = _Glide$settings.classes;
          var swipe = this.touches(event);
          var subExSx = toInt(swipe.pageX) - swipeStartX;
          var subEySy = toInt(swipe.pageY) - swipeStartY;
          var powEX = Math.abs(subExSx << 2);
          var powEY = Math.abs(subEySy << 2);
          var swipeHypotenuse = Math.sqrt(powEX + powEY);
          var swipeCathetus = Math.sqrt(powEY);
          swipeSin = Math.asin(swipeCathetus / swipeHypotenuse);

          if (swipeSin * 180 / Math.PI < touchAngle) {
            event.stopPropagation();
            Components.Move.make(subExSx * toFloat(touchRatio));
            Components.Html.root.classList.add(classes.dragging);
            Events.emit('swipe.move');
          } else {
            return false;
          }
        }
      },

      /**
       * Handler for `swipeend` event. Finitializes user's tap and decides about glide move.
       *
       * @param {Object} event
       * @return {Void}
       */
      end: function end(event) {
        if (!Glide.disabled) {
          var settings = Glide.settings;
          var swipe = this.touches(event);
          var threshold = this.threshold(event);
          var swipeDistance = swipe.pageX - swipeStartX;
          var swipeDeg = swipeSin * 180 / Math.PI;
          var steps = Math.round(swipeDistance / Components.Sizes.slideWidth);
          this.enable();

          if (swipeDistance > threshold && swipeDeg < settings.touchAngle) {
            // While swipe is positive and greater than threshold move backward.
            if (settings.perTouch) {
              steps = Math.min(steps, toInt(settings.perTouch));
            }

            if (Components.Direction.is('rtl')) {
              steps = -steps;
            }

            Components.Run.make(Components.Direction.resolve('<' + steps));
          } else if (swipeDistance < -threshold && swipeDeg < settings.touchAngle) {
            // While swipe is negative and lower than negative threshold move forward.
            if (settings.perTouch) {
              steps = Math.max(steps, -toInt(settings.perTouch));
            }

            if (Components.Direction.is('rtl')) {
              steps = -steps;
            }

            Components.Run.make(Components.Direction.resolve('>' + steps));
          } else {
            // While swipe don't reach distance apply previous transform.
            Components.Move.make();
          }

          Components.Html.root.classList.remove(settings.classes.dragging);
          this.unbindSwipeMove();
          this.unbindSwipeEnd();
          Events.emit('swipe.end');
        }
      },

      /**
       * Binds swipe's starting event.
       *
       * @return {Void}
       */
      bindSwipeStart: function bindSwipeStart() {
        var _this = this;

        var settings = Glide.settings;

        if (settings.swipeThreshold) {
          Binder.on(START_EVENTS[0], Components.Html.wrapper, function (event) {
            _this.start(event);
          }, capture);
        }

        if (settings.dragThreshold) {
          Binder.on(START_EVENTS[1], Components.Html.wrapper, function (event) {
            _this.start(event);
          }, capture);
        }
      },

      /**
       * Unbinds swipe's starting event.
       *
       * @return {Void}
       */
      unbindSwipeStart: function unbindSwipeStart() {
        Binder.off(START_EVENTS[0], Components.Html.wrapper, capture);
        Binder.off(START_EVENTS[1], Components.Html.wrapper, capture);
      },

      /**
       * Binds swipe's moving event.
       *
       * @return {Void}
       */
      bindSwipeMove: function bindSwipeMove() {
        var _this2 = this;

        Binder.on(MOVE_EVENTS, Components.Html.wrapper, throttle(function (event) {
          _this2.move(event);
        }, Glide.settings.throttle), capture);
      },

      /**
       * Unbinds swipe's moving event.
       *
       * @return {Void}
       */
      unbindSwipeMove: function unbindSwipeMove() {
        Binder.off(MOVE_EVENTS, Components.Html.wrapper, capture);
      },

      /**
       * Binds swipe's ending event.
       *
       * @return {Void}
       */
      bindSwipeEnd: function bindSwipeEnd() {
        var _this3 = this;

        Binder.on(END_EVENTS, Components.Html.wrapper, function (event) {
          _this3.end(event);
        });
      },

      /**
       * Unbinds swipe's ending event.
       *
       * @return {Void}
       */
      unbindSwipeEnd: function unbindSwipeEnd() {
        Binder.off(END_EVENTS, Components.Html.wrapper);
      },

      /**
       * Normalizes event touches points accorting to different types.
       *
       * @param {Object} event
       */
      touches: function touches(event) {
        if (MOUSE_EVENTS.indexOf(event.type) > -1) {
          return event;
        }

        return event.touches[0] || event.changedTouches[0];
      },

      /**
       * Gets value of minimum swipe distance settings based on event type.
       *
       * @return {Number}
       */
      threshold: function threshold(event) {
        var settings = Glide.settings;

        if (MOUSE_EVENTS.indexOf(event.type) > -1) {
          return settings.dragThreshold;
        }

        return settings.swipeThreshold;
      },

      /**
       * Enables swipe event.
       *
       * @return {self}
       */
      enable: function enable() {
        disabled = false;
        Components.Transition.enable();
        return this;
      },

      /**
       * Disables swipe event.
       *
       * @return {self}
       */
      disable: function disable() {
        disabled = true;
        Components.Transition.disable();
        return this;
      }
    };
    /**
     * Add component class:
     * - after initial building
     */

    Events.on('build.after', function () {
      Components.Html.root.classList.add(Glide.settings.classes.swipeable);
    });
    /**
     * Remove swiping bindings:
     * - on destroying, to remove added EventListeners
     */

    Events.on('destroy', function () {
      Swipe.unbindSwipeStart();
      Swipe.unbindSwipeMove();
      Swipe.unbindSwipeEnd();
      Binder.destroy();
    });
    return Swipe;
  }

  function Images(Glide, Components, Events) {
    /**
     * Instance of the binder for DOM Events.
     *
     * @type {EventsBinder}
     */
    var Binder = new EventsBinder();
    var Images = {
      /**
       * Binds listener to glide wrapper.
       *
       * @return {Void}
       */
      mount: function mount() {
        this.bind();
      },

      /**
       * Binds `dragstart` event on wrapper to prevent dragging images.
       *
       * @return {Void}
       */
      bind: function bind() {
        Binder.on('dragstart', Components.Html.wrapper, this.dragstart);
      },

      /**
       * Unbinds `dragstart` event on wrapper.
       *
       * @return {Void}
       */
      unbind: function unbind() {
        Binder.off('dragstart', Components.Html.wrapper);
      },

      /**
       * Event handler. Prevents dragging.
       *
       * @return {Void}
       */
      dragstart: function dragstart(event) {
        event.preventDefault();
      }
    };
    /**
     * Remove bindings from images:
     * - on destroying, to remove added EventListeners
     */

    Events.on('destroy', function () {
      Images.unbind();
      Binder.destroy();
    });
    return Images;
  }

  function Anchors(Glide, Components, Events) {
    /**
     * Instance of the binder for DOM Events.
     *
     * @type {EventsBinder}
     */
    var Binder = new EventsBinder();
    /**
     * Holds detaching status of anchors.
     * Prevents detaching of already detached anchors.
     *
     * @private
     * @type {Boolean}
     */

    var detached = false;
    /**
     * Holds preventing status of anchors.
     * If `true` redirection after click will be disabled.
     *
     * @private
     * @type {Boolean}
     */

    var prevented = false;
    var Anchors = {
      /**
       * Setups a initial state of anchors component.
       *
       * @returns {Void}
       */
      mount: function mount() {
        /**
         * Holds collection of anchors elements.
         *
         * @private
         * @type {HTMLCollection}
         */
        this._a = Components.Html.wrapper.querySelectorAll('a');
        this.bind();
      },

      /**
       * Binds events to anchors inside a track.
       *
       * @return {Void}
       */
      bind: function bind() {
        Binder.on('click', Components.Html.wrapper, this.click);
      },

      /**
       * Unbinds events attached to anchors inside a track.
       *
       * @return {Void}
       */
      unbind: function unbind() {
        Binder.off('click', Components.Html.wrapper);
      },

      /**
       * Handler for click event. Prevents clicks when glide is in `prevent` status.
       *
       * @param  {Object} event
       * @return {Void}
       */
      click: function click(event) {
        if (prevented) {
          event.stopPropagation();
          event.preventDefault();
        }
      },

      /**
       * Detaches anchors click event inside glide.
       *
       * @return {self}
       */
      detach: function detach() {
        prevented = true;

        if (!detached) {
          for (var i = 0; i < this.items.length; i++) {
            this.items[i].draggable = false;
            this.items[i].setAttribute('data-href', this.items[i].getAttribute('href'));
            this.items[i].removeAttribute('href');
          }

          detached = true;
        }

        return this;
      },

      /**
       * Attaches anchors click events inside glide.
       *
       * @return {self}
       */
      attach: function attach() {
        prevented = false;

        if (detached) {
          for (var i = 0; i < this.items.length; i++) {
            this.items[i].draggable = true;
            this.items[i].setAttribute('href', this.items[i].getAttribute('data-href'));
          }

          detached = false;
        }

        return this;
      }
    };
    define(Anchors, 'items', {
      /**
       * Gets collection of the arrows HTML elements.
       *
       * @return {HTMLElement[]}
       */
      get: function get() {
        return Anchors._a;
      }
    });
    /**
     * Detach anchors inside slides:
     * - on swiping, so they won't redirect to its `href` attributes
     */

    Events.on('swipe.move', function () {
      Anchors.detach();
    });
    /**
     * Attach anchors inside slides:
     * - after swiping and transitions ends, so they can redirect after click again
     */

    Events.on('swipe.end', function () {
      Components.Transition.after(function () {
        Anchors.attach();
      });
    });
    /**
     * Unbind anchors inside slides:
     * - on destroying, to bring anchors to its initial state
     */

    Events.on('destroy', function () {
      Anchors.attach();
      Anchors.unbind();
      Binder.destroy();
    });
    return Anchors;
  }

  var NAV_SELECTOR = '[data-glide-el="controls[nav]"]';
  var CONTROLS_SELECTOR = '[data-glide-el^="controls"]';

  function Controls(Glide, Components, Events) {
    /**
     * Instance of the binder for DOM Events.
     *
     * @type {EventsBinder}
     */
    var Binder = new EventsBinder();
    var capture = supportsPassive$1 ? {
      passive: true
    } : false;
    var Controls = {
      /**
       * Inits arrows. Binds events listeners
       * to the arrows HTML elements.
       *
       * @return {Void}
       */
      mount: function mount() {
        /**
         * Collection of navigation HTML elements.
         *
         * @private
         * @type {HTMLCollection}
         */
        this._n = Components.Html.root.querySelectorAll(NAV_SELECTOR);
        /**
         * Collection of controls HTML elements.
         *
         * @private
         * @type {HTMLCollection}
         */

        this._c = Components.Html.root.querySelectorAll(CONTROLS_SELECTOR);
        this.addBindings();
      },

      /**
       * Sets active class to current slide.
       *
       * @return {Void}
       */
      setActive: function setActive() {
        for (var i = 0; i < this._n.length; i++) {
          this.addClass(this._n[i].children);
        }
      },

      /**
       * Removes active class to current slide.
       *
       * @return {Void}
       */
      removeActive: function removeActive() {
        for (var i = 0; i < this._n.length; i++) {
          this.removeClass(this._n[i].children);
        }
      },

      /**
       * Toggles active class on items inside navigation.
       *
       * @param  {HTMLElement} controls
       * @return {Void}
       */
      addClass: function addClass(controls) {
        var settings = Glide.settings;
        var item = controls[Glide.index];

        if (item) {
          item.classList.add(settings.classes.activeNav);
          siblings(item).forEach(function (sibling) {
            sibling.classList.remove(settings.classes.activeNav);
          });
        }
      },

      /**
       * Removes active class from active control.
       *
       * @param  {HTMLElement} controls
       * @return {Void}
       */
      removeClass: function removeClass(controls) {
        var item = controls[Glide.index];

        if (item) {
          item.classList.remove(Glide.settings.classes.activeNav);
        }
      },

      /**
       * Adds handles to the each group of controls.
       *
       * @return {Void}
       */
      addBindings: function addBindings() {
        for (var i = 0; i < this._c.length; i++) {
          this.bind(this._c[i].children);
        }
      },

      /**
       * Removes handles from the each group of controls.
       *
       * @return {Void}
       */
      removeBindings: function removeBindings() {
        for (var i = 0; i < this._c.length; i++) {
          this.unbind(this._c[i].children);
        }
      },

      /**
       * Binds events to arrows HTML elements.
       *
       * @param {HTMLCollection} elements
       * @return {Void}
       */
      bind: function bind(elements) {
        for (var i = 0; i < elements.length; i++) {
          Binder.on('click', elements[i], this.click);
          Binder.on('touchstart', elements[i], this.click, capture);
        }
      },

      /**
       * Unbinds events binded to the arrows HTML elements.
       *
       * @param {HTMLCollection} elements
       * @return {Void}
       */
      unbind: function unbind(elements) {
        for (var i = 0; i < elements.length; i++) {
          Binder.off(['click', 'touchstart'], elements[i]);
        }
      },

      /**
       * Handles `click` event on the arrows HTML elements.
       * Moves slider in driection precised in
       * `data-glide-dir` attribute.
       *
       * @param {Object} event
       * @return {Void}
       */
      click: function click(event) {
        event.preventDefault();
        Components.Run.make(Components.Direction.resolve(event.currentTarget.getAttribute('data-glide-dir')));
      }
    };
    define(Controls, 'items', {
      /**
       * Gets collection of the controls HTML elements.
       *
       * @return {HTMLElement[]}
       */
      get: function get() {
        return Controls._c;
      }
    });
    /**
     * Swap active class of current navigation item:
     * - after mounting to set it to initial index
     * - after each move to the new index
     */

    Events.on(['mount.after', 'move.after'], function () {
      Controls.setActive();
    });
    /**
     * Remove bindings and HTML Classes:
     * - on destroying, to bring markup to its initial state
     */

    Events.on('destroy', function () {
      Controls.removeBindings();
      Controls.removeActive();
      Binder.destroy();
    });
    return Controls;
  }

  function Keyboard(Glide, Components, Events) {
    /**
     * Instance of the binder for DOM Events.
     *
     * @type {EventsBinder}
     */
    var Binder = new EventsBinder();
    var Keyboard = {
      /**
       * Binds keyboard events on component mount.
       *
       * @return {Void}
       */
      mount: function mount() {
        if (Glide.settings.keyboard) {
          this.bind();
        }
      },

      /**
       * Adds keyboard press events.
       *
       * @return {Void}
       */
      bind: function bind() {
        Binder.on('keyup', document, this.press);
      },

      /**
       * Removes keyboard press events.
       *
       * @return {Void}
       */
      unbind: function unbind() {
        Binder.off('keyup', document);
      },

      /**
       * Handles keyboard's arrows press and moving glide foward and backward.
       *
       * @param  {Object} event
       * @return {Void}
       */
      press: function press(event) {
        if (event.keyCode === 39) {
          Components.Run.make(Components.Direction.resolve('>'));
        }

        if (event.keyCode === 37) {
          Components.Run.make(Components.Direction.resolve('<'));
        }
      }
    };
    /**
     * Remove bindings from keyboard:
     * - on destroying to remove added events
     * - on updating to remove events before remounting
     */

    Events.on(['destroy', 'update'], function () {
      Keyboard.unbind();
    });
    /**
     * Remount component
     * - on updating to reflect potential changes in settings
     */

    Events.on('update', function () {
      Keyboard.mount();
    });
    /**
     * Destroy binder:
     * - on destroying to remove listeners
     */

    Events.on('destroy', function () {
      Binder.destroy();
    });
    return Keyboard;
  }

  function Autoplay(Glide, Components, Events) {
    /**
     * Instance of the binder for DOM Events.
     *
     * @type {EventsBinder}
     */
    var Binder = new EventsBinder();
    var Autoplay = {
      /**
       * Initializes autoplaying and events.
       *
       * @return {Void}
       */
      mount: function mount() {
        this.start();

        if (Glide.settings.hoverpause) {
          this.bind();
        }
      },

      /**
       * Starts autoplaying in configured interval.
       *
       * @param {Boolean|Number} force Run autoplaying with passed interval regardless of `autoplay` settings
       * @return {Void}
       */
      start: function start() {
        var _this = this;

        if (Glide.settings.autoplay) {
          if (isUndefined(this._i)) {
            this._i = setInterval(function () {
              _this.stop();

              Components.Run.make('>');

              _this.start();
            }, this.time);
          }
        }
      },

      /**
       * Stops autorunning of the glide.
       *
       * @return {Void}
       */
      stop: function stop() {
        this._i = clearInterval(this._i);
      },

      /**
       * Stops autoplaying while mouse is over glide's area.
       *
       * @return {Void}
       */
      bind: function bind() {
        var _this2 = this;

        Binder.on('mouseover', Components.Html.root, function () {
          _this2.stop();
        });
        Binder.on('mouseout', Components.Html.root, function () {
          _this2.start();
        });
      },

      /**
       * Unbind mouseover events.
       *
       * @returns {Void}
       */
      unbind: function unbind() {
        Binder.off(['mouseover', 'mouseout'], Components.Html.root);
      }
    };
    define(Autoplay, 'time', {
      /**
       * Gets time period value for the autoplay interval. Prioritizes
       * times in `data-glide-autoplay` attrubutes over options.
       *
       * @return {Number}
       */
      get: function get() {
        var autoplay = Components.Html.slides[Glide.index].getAttribute('data-glide-autoplay');

        if (autoplay) {
          return toInt(autoplay);
        }

        return toInt(Glide.settings.autoplay);
      }
    });
    /**
     * Stop autoplaying and unbind events:
     * - on destroying, to clear defined interval
     * - on updating via API to reset interval that may changed
     */

    Events.on(['destroy', 'update'], function () {
      Autoplay.unbind();
    });
    /**
     * Stop autoplaying:
     * - before each run, to restart autoplaying
     * - on pausing via API
     * - on destroying, to clear defined interval
     * - while starting a swipe
     * - on updating via API to reset interval that may changed
     */

    Events.on(['run.before', 'pause', 'destroy', 'swipe.start', 'update'], function () {
      Autoplay.stop();
    });
    /**
     * Start autoplaying:
     * - after each run, to restart autoplaying
     * - on playing via API
     * - while ending a swipe
     */

    Events.on(['run.after', 'play', 'swipe.end'], function () {
      Autoplay.start();
    });
    /**
     * Remount autoplaying:
     * - on updating via API to reset interval that may changed
     */

    Events.on('update', function () {
      Autoplay.mount();
    });
    /**
     * Destroy a binder:
     * - on destroying glide instance to clearup listeners
     */

    Events.on('destroy', function () {
      Binder.destroy();
    });
    return Autoplay;
  }
  /**
   * Sorts keys of breakpoint object so they will be ordered from lower to bigger.
   *
   * @param {Object} points
   * @returns {Object}
   */


  function sortBreakpoints(points) {
    if (isObject(points)) {
      return sortKeys(points);
    } else {
      warn('Breakpoints option must be an object');
    }

    return {};
  }

  function Breakpoints(Glide, Components, Events) {
    /**
     * Instance of the binder for DOM Events.
     *
     * @type {EventsBinder}
     */
    var Binder = new EventsBinder();
    /**
     * Holds reference to settings.
     *
     * @type {Object}
     */

    var settings = Glide.settings;
    /**
     * Holds reference to breakpoints object in settings. Sorts breakpoints
     * from smaller to larger. It is required in order to proper
     * matching currently active breakpoint settings.
     *
     * @type {Object}
     */

    var points = sortBreakpoints(settings.breakpoints);
    /**
     * Cache initial settings before overwritting.
     *
     * @type {Object}
     */

    var defaults = _extends({}, settings);

    var Breakpoints = {
      /**
       * Matches settings for currectly matching media breakpoint.
       *
       * @param {Object} points
       * @returns {Object}
       */
      match: function match(points) {
        if (typeof window.matchMedia !== 'undefined') {
          for (var point in points) {
            if (points.hasOwnProperty(point)) {
              if (window.matchMedia('(max-width: ' + point + 'px)').matches) {
                return points[point];
              }
            }
          }
        }

        return defaults;
      }
    };
    /**
     * Overwrite instance settings with currently matching breakpoint settings.
     * This happens right after component initialization.
     */

    _extends(settings, Breakpoints.match(points));
    /**
     * Update glide with settings of matched brekpoint:
     * - window resize to update slider
     */


    Binder.on('resize', window, throttle(function () {
      Glide.settings = mergeOptions(settings, Breakpoints.match(points));
    }, Glide.settings.throttle));
    /**
     * Resort and update default settings:
     * - on reinit via API, so breakpoint matching will be performed with options
     */

    Events.on('update', function () {
      points = sortBreakpoints(points);
      defaults = _extends({}, settings);
    });
    /**
     * Unbind resize listener:
     * - on destroying, to bring markup to its initial state
     */

    Events.on('destroy', function () {
      Binder.off('resize', window);
    });
    return Breakpoints;
  }

  var COMPONENTS = {
    // Required
    Html: Html,
    Translate: Translate,
    Transition: Transition,
    Direction: Direction,
    Peek: Peek,
    Sizes: Sizes,
    Gaps: Gaps,
    Move: Move,
    Clones: Clones,
    Resize: Resize,
    Build: Build,
    Run: Run,
    // Optional
    Swipe: Swipe,
    Images: Images,
    Anchors: Anchors,
    Controls: Controls,
    Keyboard: Keyboard,
    Autoplay: Autoplay,
    Breakpoints: Breakpoints
  };

  var Glide$1 = function (_Core) {
    inherits(Glide$$1, _Core);

    function Glide$$1() {
      classCallCheck(this, Glide$$1);
      return possibleConstructorReturn(this, (Glide$$1.__proto__ || Object.getPrototypeOf(Glide$$1)).apply(this, arguments));
    }

    createClass(Glide$$1, [{
      key: 'mount',
      value: function mount() {
        var extensions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        return get(Glide$$1.prototype.__proto__ || Object.getPrototypeOf(Glide$$1.prototype), 'mount', this).call(this, _extends({}, COMPONENTS, extensions));
      }
    }]);
    return Glide$$1;
  }(Glide);

  slowVideo();
  useBurgerMenu();
  changeBG();
  getResponse();
  const config = {
    type: "carousel"
  };
  new Glide$1(".glide", config).mount();

}());

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsic3JjL2pzL3NjcmlwdHMvYnVyZ2VyLmpzIiwic3JjL2pzL3NjcmlwdHMvdmlkZW8uanMiLCJzcmMvanMvc2NyaXB0cy9iZy5qcyIsInNyYy9qcy9zY3JpcHRzL3JlbmRlci5qcyIsInNyYy9qcy9zY3JpcHRzL2dlby5qcyIsInNyYy9qcy9zY3JpcHRzL2FwaS5qcyIsIm5vZGVfbW9kdWxlcy9AZ2xpZGVqcy9nbGlkZS9kaXN0L2dsaWRlLmVzbS5qcyIsInNyYy9qcy9tYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xyXG5leHBvcnQgZnVuY3Rpb24gdXNlQnVyZ2VyTWVudSgpIHtcclxuICBjb25zdCAkYnVyZ2VyQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJidXJnZXJcIik7XHJcbiAgY29uc3QgJGJ1cmdlclN0cmlwZXMgPSAkYnVyZ2VyQnRuLmNoaWxkcmVuO1xyXG4gIGNvbnN0ICRidXJnZXJNZW51ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJidXJnZXItbWVudVwiKTtcclxuICBjb25zdCAkZmlyc3RTdHJpcGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZpcnN0LXN0cmlwZVwiKTtcclxuICBjb25zdCAkc2Vjb25kU3RyaXBlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzZWNvbmQtc3RyaXBlXCIpO1xyXG4gIGNvbnN0ICR0aGlyZFN0cmlwZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGhpcmQtc3RyaXBlXCIpO1xyXG4gIGNvbnN0ICRidXJnZXJNZW51TGlzdEl0ZW1zID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtZW51LWxpc3RcIik7XHJcbiAgbGV0IHRvcENvdW50ZXIgPSAtNDA7XHJcbiAgbGV0IHJpZ2h0Q291bnRlciA9IDQwO1xyXG4gIGxldCBjb3VudCA9IDkwO1xyXG5cclxuICBmdW5jdGlvbiBjaGFuZ2VWaXNpYmlsaXR5VG9oaWRkZW4oKSB7XHJcbiAgICAkYnVyZ2VyTWVudS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgfVxyXG4gIGZ1bmN0aW9uIGNoYW5nZVZpc2liaWxpdHlUb1Zpc2libGUoKSB7XHJcbiAgICAkYnVyZ2VyTWVudS5zdHlsZS5kaXNwbGF5ID0gXCJmbGV4XCI7XHJcbiAgfVxyXG4gIGZ1bmN0aW9uIHJldHVybkRpcmVjdGlvbigpIHtcclxuICAgIHRvcENvdW50ZXIgPSAtNDA7XHJcbiAgICByaWdodENvdW50ZXIgPSA0MDtcclxuICAgICRidXJnZXJNZW51LnN0eWxlLnRvcCA9IGAke3RvcENvdW50ZXJ9cHhgO1xyXG4gICAgJGJ1cmdlck1lbnUuc3R5bGUucmlnaHQgPSBgJHtyaWdodENvdW50ZXJ9cHhgO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gbW92ZVRvcCgpIHtcclxuICAgIGlmIChjb3VudCA9PSAtNDApIHtcclxuICAgICAgcmV0dXJuIChjb3VudCA9IDkwKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICRidXJnZXJNZW51LnN0eWxlLnRvcCA9IGAkeyhjb3VudCAtPSA1KX1weGA7XHJcbiAgICB9XHJcbiAgICBzZXRUaW1lb3V0KG1vdmVUb3AsIDEpO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gYW5pbWF0ZU1lbnVCYWNrKCkge1xyXG4gICAgbW92ZVRvcCgpO1xyXG4gICAgc2V0VGltZW91dChjaGFuZ2VWaXNpYmlsaXR5VG9oaWRkZW4sIDUwKTtcclxuICAgIHNldFRpbWVvdXQocmV0dXJuRGlyZWN0aW9uLCA1MDApO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gYW5pbWF0ZU1lbnVGb3J3YXJkKCkge1xyXG4gICAgY2hhbmdlVmlzaWJpbGl0eVRvVmlzaWJsZSgpO1xyXG4gICAgaWYgKHJpZ2h0Q291bnRlciA9PSAzNjApIHJldHVybiB0cnVlO1xyXG4gICAgaWYgKHRvcENvdW50ZXIgPCA5MCAmJiByaWdodENvdW50ZXIgPT0gNDApIHtcclxuICAgICAgJGJ1cmdlck1lbnUuc3R5bGUudG9wID0gYCR7KHRvcENvdW50ZXIgKz0gMTApfXB4YDtcclxuICAgIH1cclxuICAgIGlmICh0b3BDb3VudGVyID09IDkwICYmIHJpZ2h0Q291bnRlciA8IDM2MCkge1xyXG4gICAgICAkYnVyZ2VyTWVudS5zdHlsZS5yaWdodCA9IGAkeyhyaWdodENvdW50ZXIgKz0gMTApfXB4YDtcclxuICAgIH1cclxuICAgIHNldFRpbWVvdXQoYW5pbWF0ZU1lbnVGb3J3YXJkLCA1KTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHJlbW92ZVN0cmlwZXNDaGFuZ2VzKCkge1xyXG4gICAgJGZpcnN0U3RyaXBlLmNsYXNzTGlzdC5yZW1vdmUoXCJwdXNoZWRcIik7XHJcbiAgICAkc2Vjb25kU3RyaXBlLmNsYXNzTGlzdC5yZW1vdmUoXCJwdXNoZWRcIik7XHJcbiAgICAkdGhpcmRTdHJpcGUuY2xhc3NMaXN0LnJlbW92ZShcInB1c2hlZFwiKTtcclxuICB9XHJcbiAgZnVuY3Rpb24gYWRkU3RyaXBlQ2hhbmdlcygpIHtcclxuICAgICRmaXJzdFN0cmlwZS5jbGFzc0xpc3QuYWRkKFwicHVzaGVkXCIpO1xyXG4gICAgJHNlY29uZFN0cmlwZS5jbGFzc0xpc3QuYWRkKFwicHVzaGVkXCIpO1xyXG4gICAgJHRoaXJkU3RyaXBlLmNsYXNzTGlzdC5hZGQoXCJwdXNoZWRcIik7XHJcbiAgfVxyXG5cclxuICBjb25zdCB1c2VCdXJnZXIgPSAoKSA9PiB7XHJcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50KSA9PiB7XHJcbiAgICAgIGlmIChcclxuICAgICAgICBldmVudC50YXJnZXQgPT09ICRidXJnZXJCdG4gfHxcclxuICAgICAgICBldmVudC50YXJnZXQgPT09ICRidXJnZXJTdHJpcGVzWzBdIHx8XHJcbiAgICAgICAgZXZlbnQudGFyZ2V0ID09PSAkYnVyZ2VyU3RyaXBlc1sxXSB8fFxyXG4gICAgICAgIGV2ZW50LnRhcmdldCA9PT0gJGJ1cmdlclN0cmlwZXNbMl1cclxuICAgICAgKSB7XHJcbiAgICAgICAgaWYgKCRmaXJzdFN0cmlwZS5jbGFzc0xpc3RbMV0gPT0gXCJwdXNoZWRcIikge1xyXG4gICAgICAgICAgcmVtb3ZlU3RyaXBlc0NoYW5nZXMoKTtcclxuICAgICAgICAgIGFuaW1hdGVNZW51QmFjaygpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBhZGRTdHJpcGVDaGFuZ2VzKCk7XHJcbiAgICAgICAgICBhbmltYXRlTWVudUZvcndhcmQoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChcclxuICAgICAgICBldmVudC50YXJnZXQgPT09ICRidXJnZXJNZW51TGlzdEl0ZW1zLmNoaWxkcmVuWzBdIHx8XHJcbiAgICAgICAgZXZlbnQudGFyZ2V0ID09PSAkYnVyZ2VyTWVudUxpc3RJdGVtcy5jaGlsZHJlblsxXSB8fFxyXG4gICAgICAgIGV2ZW50LnRhcmdldCA9PT0gJGJ1cmdlck1lbnVMaXN0SXRlbXMuY2hpbGRyZW5bMl0gfHxcclxuICAgICAgICBldmVudC50YXJnZXQgPT09ICRidXJnZXJNZW51TGlzdEl0ZW1zLmNoaWxkcmVuWzNdXHJcbiAgICAgICkge1xyXG4gICAgICAgIGFuaW1hdGVNZW51QmFjaygpO1xyXG4gICAgICAgIHJlbW92ZVN0cmlwZXNDaGFuZ2VzKCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH07XHJcbiAgdXNlQnVyZ2VyKCk7XHJcbn1cclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc2xvd1ZpZGVvKCkge1xyXG4gIGNvbnN0IHBsYXllciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidmlkZW9cIik7XHJcbiAgcGxheWVyLnBsYXliYWNrUmF0ZSA9IDAuNDtcclxufVxyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuZXhwb3J0IGZ1bmN0aW9uIGNoYW5nZUJHKCkge1xyXG4gIGNvbnN0ICRidXR0b25TdW5ueSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3VubnlcIik7XHJcbiAgY29uc3QgJGJ1dHRvblJhaW55ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyYWlueVwiKTtcclxuICBjb25zdCAkYnV0dG9uRm9nZ3kgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZvZ2d5XCIpO1xyXG4gIGNvbnN0ICRidXR0b25UaHVuZGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0aHVuZGVyXCIpO1xyXG4gIGNvbnN0ICR2aWRlb1NvdXJjZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidmlkZW8tc291cmNlXCIpO1xyXG4gIGNvbnN0ICR2aWRlbyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidmlkZW9cIik7XHJcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudCkgPT4ge1xyXG4gICAgaWYgKGV2ZW50LnRhcmdldCA9PSAkYnV0dG9uU3VubnkpIHtcclxuICAgICAgJHZpZGVvLnNyYyA9IFwiaW1hZ2VzL3N1bm55Lm1wNFwiO1xyXG4gICAgICAkdmlkZW8ucG9zdGVyID0gXCJpbWFnZXMvc3VubnktcG9zdGVyLmpwZ1wiO1xyXG4gICAgfVxyXG4gICAgaWYgKGV2ZW50LnRhcmdldCA9PSAkYnV0dG9uUmFpbnkpIHtcclxuICAgICAgJHZpZGVvLnNyYyA9IFwiaW1hZ2VzL3JhaW55Lm1wNFwiO1xyXG4gICAgICAkdmlkZW8ucG9zdGVyID0gXCJpbWFnZXMvcmFpbnktcG9zdGVyLmpwZ1wiO1xyXG4gICAgfVxyXG4gICAgaWYgKGV2ZW50LnRhcmdldCA9PSAkYnV0dG9uRm9nZ3kpIHtcclxuICAgICAgJHZpZGVvLnNyYyA9IFwiaW1hZ2VzL2ZvZ2d5Lm1wNFwiO1xyXG4gICAgICAkdmlkZW8ucG9zdGVyID0gXCJpbWFnZXMvZm9nZ3ktcG9zdGVyLmpwZ1wiO1xyXG4gICAgfVxyXG4gICAgaWYgKGV2ZW50LnRhcmdldCA9PSAkYnV0dG9uVGh1bmRlcikge1xyXG4gICAgICAkdmlkZW8uc3JjID0gXCJpbWFnZXMvdGh1bmRlci5tcDRcIjtcclxuICAgICAgJHZpZGVvLnBvc3RlciA9IFwiaW1hZ2VzL3RodW5kZXItcG9zdGVyLmpwZ1wiO1xyXG4gICAgfVxyXG4gIH0pO1xyXG59XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5leHBvcnQgY29uc3Qgc2hvd1dlYXRoZXJJbmZvID0gKGRhdGEpID0+IHtcclxuICBjb25zdCAkY2l0eU5hbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNpdHktbmFtZVwiKTtcclxuICBjb25zdCBjaXR5TmFtZSA9IGRhdGEubmFtZTtcclxuICBjb25zdCBjaXR5Q291bnRyeSA9IGRhdGEuc3lzLmNvdW50cnk7XHJcbiAgY29uc3QgJHRlbXBlcmF0dXJlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0ZW1wZXJhdHVyZVwiKTtcclxuICBjb25zdCBjdXJyZW50VGVtcCA9IE1hdGgucm91bmQoZGF0YS5tYWluLnRlbXAgLSAyNzMuMTUpO1xyXG4gIGNvbnN0ICRodW1pZGl0eUluZm8gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImh1bWlkaXR5LWluZm9cIik7XHJcbiAgY29uc3QgaHVtaWRpdHkgPSBkYXRhLm1haW4uaHVtaWRpdHk7XHJcbiAgY29uc3QgJHByZXNzdXJlSW5mbyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJlc3N1cmUtaW5mb1wiKTtcclxuICBjb25zdCBwcmVzc3VyZSA9IGRhdGEubWFpbi5wcmVzc3VyZTtcclxuICBjb25zdCBjdXJyZW50V2VhdGhlciA9IGRhdGEud2VhdGhlclswXS5tYWluO1xyXG4gIGNvbnN0ICR3aW5kRGlySW5mbyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwid2luZC1kaXItaW5mb1wiKTtcclxuICBjb25zdCB3aW5kRGlyZWN0aW9uID0gZGF0YS53aW5kLmRlZztcclxuICBjb25zdCAkd2luZFNwZWVkSW5mbyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwid2luZC1zcGVlZC1pbmZvXCIpO1xyXG4gIGNvbnN0IHdpbmRTcGVlZCA9IGRhdGEud2luZC5zcGVlZDtcclxuICBjb25zdCAkd2VhdGhlckljb25CaWcgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIndlYXRoZXItaWNvbi1iaWdcIik7XHJcbiAgY29uc3QgaWNvbiA9IGBodHRwczovL29wZW53ZWF0aGVybWFwLm9yZy9pbWcvd24vJHtkYXRhLndlYXRoZXJbMF0uaWNvbn1AMngucG5nYDtcclxuICAkY2l0eU5hbWUuaW5uZXJUZXh0ID0gYCR7Y2l0eU5hbWV9LCAke2NpdHlDb3VudHJ5fWA7XHJcbiAgaWYgKGNpdHlDb3VudHJ5ID09IHVuZGVmaW5lZCkge1xyXG4gICAgJGNpdHlOYW1lLmlubmVyVGV4dCA9IGAke2NpdHlOYW1lfWA7XHJcbiAgfVxyXG4gICR0ZW1wZXJhdHVyZS5pbm5lckhUTUwgPSBgJHtjdXJyZW50VGVtcH0gJmRlZztgO1xyXG4gICR3ZWF0aGVySWNvbkJpZy5zZXRBdHRyaWJ1dGUoXCJzcmNcIiwgaWNvbik7XHJcbiAgJGh1bWlkaXR5SW5mby5pbm5lclRleHQgPSBgSHVtaWRpdHk6ICAke2h1bWlkaXR5fSVgO1xyXG4gICRwcmVzc3VyZUluZm8uaW5uZXJUZXh0ID0gYFByZXNzdXJlOiAke3ByZXNzdXJlfSBoUGFgO1xyXG4gICR3aW5kRGlySW5mby5pbm5lclRleHQgPSBgV2luZCBEaXJlY3Rpb246ICR7d2luZERpcmVjdGlvbn0gZGVnYDtcclxuICAkd2luZFNwZWVkSW5mby5pbm5lclRleHQgPSBgV2luZCBTcGVlZDogJHt3aW5kU3BlZWR9IG1wc2A7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3Qgc2hvd1dlYXRoZXJIb3VybHlJbmZvID0gKGRhdGEpID0+IHtcclxuICBjb25zdCAkZGF0ZVRpbWVGaXJzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZmlyc3RUaW1lXCIpO1xyXG4gICRkYXRlVGltZUZpcnN0LmlubmVyVGV4dCA9IGRhdGEubGlzdFswXS5kdF90eHQ7XHJcbiAgY29uc3QgJGhvdXJseUh1bWlkaXR5Rmlyc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImhvdXJseS0wMC1odW1pZGl0eVwiKTtcclxuICAkaG91cmx5SHVtaWRpdHlGaXJzdC5pbm5lclRleHQgPSBgSHVtaWRpdHk6ICAke2RhdGEubGlzdFswXS5tYWluLmh1bWlkaXR5fSVgO1xyXG4gIGNvbnN0ICRob3VybHlQcmVzc3VyZUZpcnN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJob3VybHktMDAtcHJlc3N1cmVcIik7XHJcbiAgJGhvdXJseVByZXNzdXJlRmlyc3QuaW5uZXJUZXh0ID0gYFByZXNzdXJlOiAke2RhdGEubGlzdFswXS5tYWluLnByZXNzdXJlfSBoUGFgO1xyXG4gIGNvbnN0ICRob3VybHlXZGlyRmlyc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImhvdXJseS0wMC13ZGlyXCIpO1xyXG4gICRob3VybHlXZGlyRmlyc3QuaW5uZXJUZXh0ID0gYFdpbmQgRGlyZWN0aW9uOiAke2RhdGEubGlzdFswXS53aW5kLmRlZ30gZGVnYDtcclxuICBjb25zdCAkaG91cmx5V3NwZWVkRmlyc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImhvdXJseS0wMC13c3BlZWRcIik7XHJcbiAgJGhvdXJseVdzcGVlZEZpcnN0LmlubmVyVGV4dCA9IGBXaW5kIFNwZWVkOiAke2RhdGEubGlzdFswXS53aW5kLnNwZWVkfSBtcHNgO1xyXG4gIGNvbnN0ICRob3VybHlUZW1wZXJhdHVyZUZpcnN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXHJcbiAgICBcImhvdXJseS0wMC10ZW1wZXJhdHVyZVwiXHJcbiAgKTtcclxuICAkaG91cmx5VGVtcGVyYXR1cmVGaXJzdC5pbm5lckhUTUwgPSBgJHtNYXRoLnJvdW5kKFxyXG4gICAgZGF0YS5saXN0WzBdLm1haW4udGVtcCAtIDI3My4xNVxyXG4gICl9ICZkZWc7YDtcclxuICBjb25zdCAkaG91cmx5SWNvbkZpcnN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJob3VybHktMDAtaWNvblwiKTtcclxuICAkaG91cmx5SWNvbkZpcnN0LnNldEF0dHJpYnV0ZShcclxuICAgIFwic3JjXCIsXHJcbiAgICBgaHR0cHM6Ly9vcGVud2VhdGhlcm1hcC5vcmcvaW1nL3duLyR7ZGF0YS5saXN0WzBdLndlYXRoZXJbMF0uaWNvbn1AMngucG5nYFxyXG4gICk7XHJcblxyXG4gIGNvbnN0ICRkYXRlVGltZVNlY29uZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2Vjb25kVGltZVwiKTtcclxuICAkZGF0ZVRpbWVTZWNvbmQuaW5uZXJUZXh0ID0gZGF0YS5saXN0WzFdLmR0X3R4dDtcclxuICBjb25zdCAkaG91cmx5SHVtaWRpdHlzZWNvbmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImhvdXJseS0wNi1odW1pZGl0eVwiKTtcclxuICAkaG91cmx5SHVtaWRpdHlzZWNvbmQuaW5uZXJUZXh0ID0gYEh1bWlkaXR5OiAgJHtkYXRhLmxpc3RbMV0ubWFpbi5odW1pZGl0eX0lYDtcclxuICBjb25zdCAkaG91cmx5UHJlc3N1cmVzZWNvbmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImhvdXJseS0wNi1wcmVzc3VyZVwiKTtcclxuICAkaG91cmx5UHJlc3N1cmVzZWNvbmQuaW5uZXJUZXh0ID0gYFByZXNzdXJlOiAke2RhdGEubGlzdFsxXS5tYWluLnByZXNzdXJlfSBoUGFgO1xyXG4gIGNvbnN0ICRob3VybHlXZGlyc2Vjb25kID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJob3VybHktMDYtd2RpclwiKTtcclxuICAkaG91cmx5V2RpcnNlY29uZC5pbm5lclRleHQgPSBgV2luZCBEaXJlY3Rpb246ICR7ZGF0YS5saXN0WzFdLndpbmQuZGVnfSBkZWdgO1xyXG4gIGNvbnN0ICRob3VybHlXc3BlZWRzZWNvbmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImhvdXJseS0wNi13c3BlZWRcIik7XHJcbiAgJGhvdXJseVdzcGVlZHNlY29uZC5pbm5lclRleHQgPSBgV2luZCBTcGVlZDogJHtkYXRhLmxpc3RbMV0ud2luZC5zcGVlZH0gbXBzYDtcclxuICBjb25zdCAkaG91cmx5VGVtcGVyYXR1cmVzZWNvbmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcclxuICAgIFwiaG91cmx5LTA2LXRlbXBlcmF0dXJlXCJcclxuICApO1xyXG4gICRob3VybHlUZW1wZXJhdHVyZXNlY29uZC5pbm5lckhUTUwgPSBgJHtNYXRoLnJvdW5kKFxyXG4gICAgZGF0YS5saXN0WzFdLm1haW4udGVtcCAtIDI3My4xNVxyXG4gICl9ICZkZWc7YDtcclxuICBjb25zdCAkaG91cmx5SWNvbnNlY29uZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaG91cmx5LTA2LWljb25cIik7XHJcbiAgJGhvdXJseUljb25zZWNvbmQuc2V0QXR0cmlidXRlKFxyXG4gICAgXCJzcmNcIixcclxuICAgIGBodHRwczovL29wZW53ZWF0aGVybWFwLm9yZy9pbWcvd24vJHtkYXRhLmxpc3RbMV0ud2VhdGhlclswXS5pY29ufUAyeC5wbmdgXHJcbiAgKTtcclxuXHJcbiAgY29uc3QgJGRhdGVUaW1lVGhpcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRoaXJkVGltZVwiKTtcclxuICAkZGF0ZVRpbWVUaGlyZC5pbm5lclRleHQgPSBkYXRhLmxpc3RbMl0uZHRfdHh0O1xyXG4gIGNvbnN0ICRob3VybHlIdW1pZGl0eVRoaXJkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJob3VybHktMTItaHVtaWRpdHlcIik7XHJcbiAgJGhvdXJseUh1bWlkaXR5VGhpcmQuaW5uZXJUZXh0ID0gYEh1bWlkaXR5OiAgJHtkYXRhLmxpc3RbMl0ubWFpbi5odW1pZGl0eX0lYDtcclxuICBjb25zdCAkaG91cmx5UHJlc3N1cmVUaGlyZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaG91cmx5LTEyLXByZXNzdXJlXCIpO1xyXG4gICRob3VybHlQcmVzc3VyZVRoaXJkLmlubmVyVGV4dCA9IGBQcmVzc3VyZTogJHtkYXRhLmxpc3RbMl0ubWFpbi5wcmVzc3VyZX0gaFBhYDtcclxuICBjb25zdCAkaG91cmx5V2RpclRoaXJkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJob3VybHktMTItd2RpclwiKTtcclxuICAkaG91cmx5V2RpclRoaXJkLmlubmVyVGV4dCA9IGBXaW5kIERpcmVjdGlvbjogJHtkYXRhLmxpc3RbMl0ud2luZC5kZWd9IGRlZ2A7XHJcbiAgY29uc3QgJGhvdXJseVdzcGVlZFRoaXJkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJob3VybHktMTItd3NwZWVkXCIpO1xyXG4gICRob3VybHlXc3BlZWRUaGlyZC5pbm5lclRleHQgPSBgV2luZCBTcGVlZDogJHtkYXRhLmxpc3RbMl0ud2luZC5zcGVlZH0gbXBzYDtcclxuICBjb25zdCAkaG91cmx5VGVtcGVyYXR1cmVUaGlyZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFxyXG4gICAgXCJob3VybHktMTItdGVtcGVyYXR1cmVcIlxyXG4gICk7XHJcbiAgJGhvdXJseVRlbXBlcmF0dXJlVGhpcmQuaW5uZXJIVE1MID0gYCR7TWF0aC5yb3VuZChcclxuICAgIGRhdGEubGlzdFsyXS5tYWluLnRlbXAgLSAyNzMuMTVcclxuICApfSAmZGVnO2A7XHJcbiAgY29uc3QgJGhvdXJseUljb25UaGlyZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaG91cmx5LTEyLWljb25cIik7XHJcbiAgJGhvdXJseUljb25UaGlyZC5zZXRBdHRyaWJ1dGUoXHJcbiAgICBcInNyY1wiLFxyXG4gICAgYGh0dHBzOi8vb3BlbndlYXRoZXJtYXAub3JnL2ltZy93bi8ke2RhdGEubGlzdFsyXS53ZWF0aGVyWzBdLmljb259QDJ4LnBuZ2BcclxuICApO1xyXG5cclxuICBjb25zdCAkZGF0ZVRpbWVGb3VydGggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZvdXJ0aFRpbWVcIik7XHJcbiAgJGRhdGVUaW1lRm91cnRoLmlubmVyVGV4dCA9IGRhdGEubGlzdFszXS5kdF90eHQ7XHJcbiAgY29uc3QgJGhvdXJseUh1bWlkaXR5Rm91cnRoID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJob3VybHktMTgtaHVtaWRpdHlcIik7XHJcbiAgJGhvdXJseUh1bWlkaXR5Rm91cnRoLmlubmVyVGV4dCA9IGBIdW1pZGl0eTogICR7ZGF0YS5saXN0WzNdLm1haW4uaHVtaWRpdHl9JWA7XHJcbiAgY29uc3QgJGhvdXJseVByZXNzdXJlRm91cnRoID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJob3VybHktMTgtcHJlc3N1cmVcIik7XHJcbiAgJGhvdXJseVByZXNzdXJlRm91cnRoLmlubmVyVGV4dCA9IGBQcmVzc3VyZTogJHtkYXRhLmxpc3RbM10ubWFpbi5wcmVzc3VyZX0gaFBhYDtcclxuICBjb25zdCAkaG91cmx5V2RpckZvdXJ0aCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaG91cmx5LTE4LXdkaXJcIik7XHJcbiAgJGhvdXJseVdkaXJGb3VydGguaW5uZXJUZXh0ID0gYFdpbmQgRGlyZWN0aW9uOiAke2RhdGEubGlzdFszXS53aW5kLmRlZ30gZGVnYDtcclxuICBjb25zdCAkaG91cmx5V3NwZWVkRm91cnRoID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJob3VybHktMTgtd3NwZWVkXCIpO1xyXG4gICRob3VybHlXc3BlZWRGb3VydGguaW5uZXJUZXh0ID0gYFdpbmQgU3BlZWQ6ICR7ZGF0YS5saXN0WzNdLndpbmQuc3BlZWR9IG1wc2A7XHJcbiAgY29uc3QgJGhvdXJseVRlbXBlcmF0dXJlRm91cnRoID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXHJcbiAgICBcImhvdXJseS0xOC10ZW1wZXJhdHVyZVwiXHJcbiAgKTtcclxuICAkaG91cmx5VGVtcGVyYXR1cmVGb3VydGguaW5uZXJIVE1MID0gYCR7TWF0aC5yb3VuZChcclxuICAgIGRhdGEubGlzdFszXS5tYWluLnRlbXAgLSAyNzMuMTVcclxuICApfSAmZGVnO2A7XHJcbiAgY29uc3QgJGhvdXJseUljb25Gb3VydGggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImhvdXJseS0xOC1pY29uXCIpO1xyXG4gICRob3VybHlJY29uRm91cnRoLnNldEF0dHJpYnV0ZShcclxuICAgIFwic3JjXCIsXHJcbiAgICBgaHR0cHM6Ly9vcGVud2VhdGhlcm1hcC5vcmcvaW1nL3duLyR7ZGF0YS5saXN0WzNdLndlYXRoZXJbMF0uaWNvbn1AMngucG5nYFxyXG4gICk7XHJcblxyXG4gIGNvbnN0ICRkYXRlVGltZUxhc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxhc3RUaW1lXCIpO1xyXG4gICRkYXRlVGltZUxhc3QuaW5uZXJUZXh0ID0gZGF0YS5saXN0WzRdLmR0X3R4dDtcclxuICBjb25zdCAkaG91cmx5SHVtaWRpdHlMYXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJob3VybHktMjEtaHVtaWRpdHlcIik7XHJcbiAgJGhvdXJseUh1bWlkaXR5TGFzdC5pbm5lclRleHQgPSBgSHVtaWRpdHk6ICAke2RhdGEubGlzdFs0XS5tYWluLmh1bWlkaXR5fSVgO1xyXG4gIGNvbnN0ICRob3VybHlQcmVzc3VyZUxhc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImhvdXJseS0yMS1wcmVzc3VyZVwiKTtcclxuICAkaG91cmx5UHJlc3N1cmVMYXN0LmlubmVyVGV4dCA9IGBQcmVzc3VyZTogJHtkYXRhLmxpc3RbNF0ubWFpbi5wcmVzc3VyZX0gaFBhYDtcclxuICBjb25zdCAkaG91cmx5V2Rpckxhc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImhvdXJseS0yMS13ZGlyXCIpO1xyXG4gICRob3VybHlXZGlyTGFzdC5pbm5lclRleHQgPSBgV2luZCBEaXJlY3Rpb246ICR7ZGF0YS5saXN0WzRdLndpbmQuZGVnfSBkZWdgO1xyXG4gIGNvbnN0ICRob3VybHlXc3BlZWRMYXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJob3VybHktMjEtd3NwZWVkXCIpO1xyXG4gICRob3VybHlXc3BlZWRMYXN0LmlubmVyVGV4dCA9IGBXaW5kIFNwZWVkOiAke2RhdGEubGlzdFs0XS53aW5kLnNwZWVkfSBtcHNgO1xyXG4gIGNvbnN0ICRob3VybHlUZW1wZXJhdHVyZUxhc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcclxuICAgIFwiaG91cmx5LTIxLXRlbXBlcmF0dXJlXCJcclxuICApO1xyXG4gICRob3VybHlUZW1wZXJhdHVyZUxhc3QuaW5uZXJIVE1MID0gYCR7TWF0aC5yb3VuZChcclxuICAgIGRhdGEubGlzdFs0XS5tYWluLnRlbXAgLSAyNzMuMTVcclxuICApfSAmZGVnO2A7XHJcbiAgY29uc3QgJGhvdXJseUljb25MYXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJob3VybHktMjEtaWNvblwiKTtcclxuICAkaG91cmx5SWNvbkxhc3Quc2V0QXR0cmlidXRlKFxyXG4gICAgXCJzcmNcIixcclxuICAgIGBodHRwczovL29wZW53ZWF0aGVybWFwLm9yZy9pbWcvd24vJHtkYXRhLmxpc3RbNF0ud2VhdGhlclswXS5pY29ufUAyeC5wbmdgXHJcbiAgKTtcclxufTtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbmltcG9ydCB7IHNob3dXZWF0aGVySW5mbyB9IGZyb20gXCIuL3JlbmRlclwiO1xyXG5pbXBvcnQgeyBzaG93V2VhdGhlckhvdXJseUluZm8gfSBmcm9tIFwiLi9yZW5kZXJcIjtcclxuZXhwb3J0IGNvbnN0IGdldEdlbyA9ICgpID0+IHtcclxuICBmdW5jdGlvbiBzdWNjZXNzKHBvcykge1xyXG4gICAgY29uc3QgY3JkID0gcG9zLmNvb3JkcztcclxuICAgIGNvbnN0IEFQSV9LRVlfQ1JEID0gXCJkNmU3ZmQ2OTI2ZWM3NzM2M2ZmY2UwZTEwYmZlODNiM1wiO1xyXG4gICAgY29uc3QgZ2VvTGluayA9IGBodHRwczovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvd2VhdGhlcj9sYXQ9JHtjcmQubGF0aXR1ZGV9Jmxvbj0ke2NyZC5sb25naXR1ZGV9JmFwcGlkPSR7QVBJX0tFWV9DUkR9YDtcclxuICAgIGNvbnN0IGhvdXJseUdlb0xpbmsgPSBgaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L2ZvcmVjYXN0P2xhdD0ke2NyZC5sYXRpdHVkZX0mbG9uPSR7Y3JkLmxvbmdpdHVkZX0mYXBwaWQ9JHtBUElfS0VZX0NSRH1gO1xyXG4gICAgY29uc3QgZ2V0UmVzcG9uc2UgPSAoKSA9PiB7XHJcbiAgICAgIGZldGNoKGdlb0xpbmspXHJcbiAgICAgICAgLnRoZW4oKHJlcykgPT4gcmVzLmpzb24oKSlcclxuICAgICAgICAudGhlbigoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgc2hvd1dlYXRoZXJJbmZvKGRhdGEpO1xyXG5cclxuICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKChlcnIpID0+IHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICAgICAgICBjb25zdCAkY2l0eU5hbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNpdHktbmFtZVwiKTtcclxuICAgICAgICAgICRjaXR5TmFtZS5pbm5lclRleHQgPSBgV3JpdGUgQ2l0eSBuYW1lIHRvIHdhdGNoIHRoZSBmb3JlY2FzdGA7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgY29uc3QgZ2V0UmVzcG9uc2VGb3JEYXlzID0gKCkgPT4ge1xyXG4gICAgICBmZXRjaChob3VybHlHZW9MaW5rKVxyXG4gICAgICAgIC50aGVuKChyZXMpID0+IHJlcy5qc29uKCkpXHJcbiAgICAgICAgLnRoZW4oKGRhdGEpID0+IHtcclxuICAgICAgICAgIHNob3dXZWF0aGVySG91cmx5SW5mbyhkYXRhKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgICAgICAgY29uc3QgJGNpdHlOYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjaXR5LW5hbWVcIik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgZ2V0UmVzcG9uc2UoKTtcclxuICAgIGdldFJlc3BvbnNlRm9yRGF5cygpO1xyXG4gIH1cclxuICBuYXZpZ2F0b3IuZ2VvbG9jYXRpb24uZ2V0Q3VycmVudFBvc2l0aW9uKHN1Y2Nlc3MpO1xyXG59O1xyXG5nZXRHZW8oKTtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbmltcG9ydCB7IHNob3dXZWF0aGVySW5mbywgc2hvd1dlYXRoZXJIb3VybHlJbmZvIH0gZnJvbSBcIi4vcmVuZGVyXCI7XHJcbmltcG9ydCB7IGdldEdlbyB9IGZyb20gXCIuL2dlb1wiO1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0UmVzcG9uc2UoKSB7XHJcbiAgY29uc3QgQVBJX0tFWSA9IFwiZDZlN2ZkNjkyNmVjNzczNjNmZmNlMGUxMGJmZTgzYjNcIjtcclxuICBjb25zdCBCQVNFX1VSTCA9IGBodHRwczovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvd2VhdGhlcj9xPWA7XHJcbiAgY29uc3QgU0VDT05EQVJZX1VSTCA9IGBodHRwczovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvZm9yZWNhc3Q/cT1gO1xyXG4gIGNvbnN0ICRjYXJkcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2FyZHNcIik7XHJcbiAgY29uc3QgJGNhcmRzSW5mbyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2FyZHMtaW5mb1wiKTtcclxuICBjb25zdCAkaW5mb0RldGFpbHMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImluZm8tZGV0YWlsc1wiKTtcclxuICBjb25zdCAkaW5mb1RpdGxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpbmZvLXRpdGxlXCIpO1xyXG4gIGNvbnN0ICRpbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaW5wdXRcIik7XHJcbiAgY29uc3QgZGFpbHlJbmZvSXRlbXMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiaW5mb19fZGFpbHktaW5mb1wiKTtcclxuICBjb25zdCAkc2VhcmNoQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJidXR0b25cIik7XHJcbiAgY29uc3QgJHNlYXJjaEljb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNlYXJjaC1pY29uXCIpO1xyXG5cclxuICBjb25zdCBnZXRTZWFyY2hVcmwgPSAoY2l0eSkgPT4ge1xyXG4gICAgcmV0dXJuIGAke0JBU0VfVVJMfSR7Y2l0eX0mdW5pdHM9Y2Vsc2l1cyZhcHBpZD0ke0FQSV9LRVl9YDtcclxuICB9O1xyXG5cclxuICBjb25zdCBnZXRTZWFyY2hVcmxGb3JEYXlzID0gKGNpdHkpID0+IHtcclxuICAgIHJldHVybiBgJHtTRUNPTkRBUllfVVJMfSR7Y2l0eX0mdW5pdHM9Y2Vsc2l1cyZhcHBpZD0ke0FQSV9LRVl9YDtcclxuICB9O1xyXG5cclxuICBjb25zdCBnZXRSZXNwb25zZSA9IChxdWVyeSkgPT4ge1xyXG4gICAgaWYgKHF1ZXJ5KSB7XHJcbiAgICAgIGZldGNoKGdldFNlYXJjaFVybChxdWVyeSkpXHJcbiAgICAgICAgLnRoZW4oKHJlcykgPT4gcmVzLmpzb24oKSlcclxuICAgICAgICAudGhlbigoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgc2hvd1dlYXRoZXJJbmZvKGRhdGEpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKChlcnIpID0+IHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICAgICAgICBjb25zdCAkY2l0eU5hbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNpdHktbmFtZVwiKTtcclxuICAgICAgICAgICRjaXR5TmFtZS5pbm5lclRleHQgPSBgXCIke3F1ZXJ5fVwiIC0gaXMgd3JvbmcgQ2l0eSBuYW1lIWA7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfTtcclxuICBjb25zdCBnZXRSZXNwb25zZUZvckRheXMgPSAocXVlcnkpID0+IHtcclxuICAgIGlmIChxdWVyeSkge1xyXG4gICAgICBmZXRjaChnZXRTZWFyY2hVcmxGb3JEYXlzKHF1ZXJ5KSlcclxuICAgICAgICAudGhlbigocmVzKSA9PiByZXMuanNvbigpKVxyXG4gICAgICAgIC50aGVuKChkYXRhKSA9PiB7XHJcbiAgICAgICAgICBzaG93V2VhdGhlckhvdXJseUluZm8oZGF0YSk7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgICAgICAgY29uc3QgJGNpdHlOYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjaXR5LW5hbWVcIik7XHJcbiAgICAgICAgICAkY2l0eU5hbWUuaW5uZXJUZXh0ID0gYFwiJHtxdWVyeX1cIiAtIGlzIHdyb25nIENpdHkgbmFtZSFgO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcclxuICAgIGlmIChldmVudC50YXJnZXQgPT0gJHNlYXJjaEJ1dHRvbiB8fCBldmVudC50YXJnZXQgPT0gJHNlYXJjaEljb24pIHtcclxuICAgICAgZ2V0UmVzcG9uc2UoJGlucHV0LnZhbHVlLnRvTG93ZXJDYXNlKCkpO1xyXG4gICAgICBnZXRSZXNwb25zZUZvckRheXMoJGlucHV0LnZhbHVlLnRvTG93ZXJDYXNlKCkpO1xyXG4gICAgfVxyXG4gIH0pO1xyXG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlwcmVzc1wiLCAoZXZlbnQpID0+IHtcclxuICAgIGlmIChldmVudC50YXJnZXQgPT0gJGlucHV0ICYmIGV2ZW50LmNvZGUgPT0gXCJFbnRlclwiKSB7XHJcbiAgICAgIGdldFJlc3BvbnNlKCRpbnB1dC52YWx1ZS50b0xvd2VyQ2FzZSgpKTtcclxuICAgICAgZ2V0UmVzcG9uc2VGb3JEYXlzKCRpbnB1dC52YWx1ZS50b0xvd2VyQ2FzZSgpKTtcclxuICAgIH1cclxuICB9KTtcclxufVxyXG4iLCIvKiFcbiAqIEdsaWRlLmpzIHYzLjQuMVxuICogKGMpIDIwMTMtMjAxOSBKxJlkcnplaiBDaGHFgnViZWsgPGplZHJ6ZWouY2hhbHViZWtAZ21haWwuY29tPiAoaHR0cDovL2plZHJ6ZWpjaGFsdWJlay5jb20vKVxuICogUmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuICovXG5cbnZhciBkZWZhdWx0cyA9IHtcbiAgLyoqXG4gICAqIFR5cGUgb2YgdGhlIG1vdmVtZW50LlxuICAgKlxuICAgKiBBdmFpbGFibGUgdHlwZXM6XG4gICAqIGBzbGlkZXJgIC0gUmV3aW5kcyBzbGlkZXIgdG8gdGhlIHN0YXJ0L2VuZCB3aGVuIGl0IHJlYWNoZXMgdGhlIGZpcnN0IG9yIGxhc3Qgc2xpZGUuXG4gICAqIGBjYXJvdXNlbGAgLSBDaGFuZ2VzIHNsaWRlcyB3aXRob3V0IHN0YXJ0aW5nIG92ZXIgd2hlbiBpdCByZWFjaGVzIHRoZSBmaXJzdCBvciBsYXN0IHNsaWRlLlxuICAgKlxuICAgKiBAdHlwZSB7U3RyaW5nfVxuICAgKi9cbiAgdHlwZTogJ3NsaWRlcicsXG5cbiAgLyoqXG4gICAqIFN0YXJ0IGF0IHNwZWNpZmljIHNsaWRlIG51bWJlciBkZWZpbmVkIHdpdGggemVyby1iYXNlZCBpbmRleC5cbiAgICpcbiAgICogQHR5cGUge051bWJlcn1cbiAgICovXG4gIHN0YXJ0QXQ6IDAsXG5cbiAgLyoqXG4gICAqIEEgbnVtYmVyIG9mIHNsaWRlcyB2aXNpYmxlIG9uIHRoZSBzaW5nbGUgdmlld3BvcnQuXG4gICAqXG4gICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAqL1xuICBwZXJWaWV3OiAxLFxuXG4gIC8qKlxuICAgKiBGb2N1cyBjdXJyZW50bHkgYWN0aXZlIHNsaWRlIGF0IGEgc3BlY2lmaWVkIHBvc2l0aW9uIGluIHRoZSB0cmFjay5cbiAgICpcbiAgICogQXZhaWxhYmxlIGlucHV0czpcbiAgICogYGNlbnRlcmAgLSBDdXJyZW50IHNsaWRlIHdpbGwgYmUgYWx3YXlzIGZvY3VzZWQgYXQgdGhlIGNlbnRlciBvZiBhIHRyYWNrLlxuICAgKiBgMCwxLDIsMy4uLmAgLSBDdXJyZW50IHNsaWRlIHdpbGwgYmUgZm9jdXNlZCBvbiB0aGUgc3BlY2lmaWVkIHplcm8tYmFzZWQgaW5kZXguXG4gICAqXG4gICAqIEB0eXBlIHtTdHJpbmd8TnVtYmVyfVxuICAgKi9cbiAgZm9jdXNBdDogMCxcblxuICAvKipcbiAgICogQSBzaXplIG9mIHRoZSBnYXAgYWRkZWQgYmV0d2VlbiBzbGlkZXMuXG4gICAqXG4gICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAqL1xuICBnYXA6IDEwLFxuXG4gIC8qKlxuICAgKiBDaGFuZ2Ugc2xpZGVzIGFmdGVyIGEgc3BlY2lmaWVkIGludGVydmFsLiBVc2UgYGZhbHNlYCBmb3IgdHVybmluZyBvZmYgYXV0b3BsYXkuXG4gICAqXG4gICAqIEB0eXBlIHtOdW1iZXJ8Qm9vbGVhbn1cbiAgICovXG4gIGF1dG9wbGF5OiBmYWxzZSxcblxuICAvKipcbiAgICogU3RvcCBhdXRvcGxheSBvbiBtb3VzZW92ZXIgZXZlbnQuXG4gICAqXG4gICAqIEB0eXBlIHtCb29sZWFufVxuICAgKi9cbiAgaG92ZXJwYXVzZTogdHJ1ZSxcblxuICAvKipcbiAgICogQWxsb3cgZm9yIGNoYW5naW5nIHNsaWRlcyB3aXRoIGxlZnQgYW5kIHJpZ2h0IGtleWJvYXJkIGFycm93cy5cbiAgICpcbiAgICogQHR5cGUge0Jvb2xlYW59XG4gICAqL1xuICBrZXlib2FyZDogdHJ1ZSxcblxuICAvKipcbiAgICogU3RvcCBydW5uaW5nIGBwZXJWaWV3YCBudW1iZXIgb2Ygc2xpZGVzIGZyb20gdGhlIGVuZC4gVXNlIHRoaXNcbiAgICogb3B0aW9uIGlmIHlvdSBkb24ndCB3YW50IHRvIGhhdmUgYW4gZW1wdHkgc3BhY2UgYWZ0ZXJcbiAgICogYSBzbGlkZXIuIFdvcmtzIG9ubHkgd2l0aCBgc2xpZGVyYCB0eXBlIGFuZCBhXG4gICAqIG5vbi1jZW50ZXJlZCBgZm9jdXNBdGAgc2V0dGluZy5cbiAgICpcbiAgICogQHR5cGUge0Jvb2xlYW59XG4gICAqL1xuICBib3VuZDogZmFsc2UsXG5cbiAgLyoqXG4gICAqIE1pbmltYWwgc3dpcGUgZGlzdGFuY2UgbmVlZGVkIHRvIGNoYW5nZSB0aGUgc2xpZGUuIFVzZSBgZmFsc2VgIGZvciB0dXJuaW5nIG9mZiBhIHN3aXBpbmcuXG4gICAqXG4gICAqIEB0eXBlIHtOdW1iZXJ8Qm9vbGVhbn1cbiAgICovXG4gIHN3aXBlVGhyZXNob2xkOiA4MCxcblxuICAvKipcbiAgICogTWluaW1hbCBtb3VzZSBkcmFnIGRpc3RhbmNlIG5lZWRlZCB0byBjaGFuZ2UgdGhlIHNsaWRlLiBVc2UgYGZhbHNlYCBmb3IgdHVybmluZyBvZmYgYSBkcmFnZ2luZy5cbiAgICpcbiAgICogQHR5cGUge051bWJlcnxCb29sZWFufVxuICAgKi9cbiAgZHJhZ1RocmVzaG9sZDogMTIwLFxuXG4gIC8qKlxuICAgKiBBIG1heGltdW0gbnVtYmVyIG9mIHNsaWRlcyB0byB3aGljaCBtb3ZlbWVudCB3aWxsIGJlIG1hZGUgb24gc3dpcGluZyBvciBkcmFnZ2luZy4gVXNlIGBmYWxzZWAgZm9yIHVubGltaXRlZC5cbiAgICpcbiAgICogQHR5cGUge051bWJlcnxCb29sZWFufVxuICAgKi9cbiAgcGVyVG91Y2g6IGZhbHNlLFxuXG4gIC8qKlxuICAgKiBNb3ZpbmcgZGlzdGFuY2UgcmF0aW8gb2YgdGhlIHNsaWRlcyBvbiBhIHN3aXBpbmcgYW5kIGRyYWdnaW5nLlxuICAgKlxuICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgKi9cbiAgdG91Y2hSYXRpbzogMC41LFxuXG4gIC8qKlxuICAgKiBBbmdsZSByZXF1aXJlZCB0byBhY3RpdmF0ZSBzbGlkZXMgbW92aW5nIG9uIHN3aXBpbmcgb3IgZHJhZ2dpbmcuXG4gICAqXG4gICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAqL1xuICB0b3VjaEFuZ2xlOiA0NSxcblxuICAvKipcbiAgICogRHVyYXRpb24gb2YgdGhlIGFuaW1hdGlvbiBpbiBtaWxsaXNlY29uZHMuXG4gICAqXG4gICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAqL1xuICBhbmltYXRpb25EdXJhdGlvbjogNDAwLFxuXG4gIC8qKlxuICAgKiBBbGxvd3MgbG9vcGluZyB0aGUgYHNsaWRlcmAgdHlwZS4gU2xpZGVyIHdpbGwgcmV3aW5kIHRvIHRoZSBmaXJzdC9sYXN0IHNsaWRlIHdoZW4gaXQncyBhdCB0aGUgc3RhcnQvZW5kLlxuICAgKlxuICAgKiBAdHlwZSB7Qm9vbGVhbn1cbiAgICovXG4gIHJld2luZDogdHJ1ZSxcblxuICAvKipcbiAgICogRHVyYXRpb24gb2YgdGhlIHJld2luZGluZyBhbmltYXRpb24gb2YgdGhlIGBzbGlkZXJgIHR5cGUgaW4gbWlsbGlzZWNvbmRzLlxuICAgKlxuICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgKi9cbiAgcmV3aW5kRHVyYXRpb246IDgwMCxcblxuICAvKipcbiAgICogRWFzaW5nIGZ1bmN0aW9uIGZvciB0aGUgYW5pbWF0aW9uLlxuICAgKlxuICAgKiBAdHlwZSB7U3RyaW5nfVxuICAgKi9cbiAgYW5pbWF0aW9uVGltaW5nRnVuYzogJ2N1YmljLWJlemllciguMTY1LCAuODQwLCAuNDQwLCAxKScsXG5cbiAgLyoqXG4gICAqIFRocm90dGxlIGNvc3RseSBldmVudHMgYXQgbW9zdCBvbmNlIHBlciBldmVyeSB3YWl0IG1pbGxpc2Vjb25kcy5cbiAgICpcbiAgICogQHR5cGUge051bWJlcn1cbiAgICovXG4gIHRocm90dGxlOiAxMCxcblxuICAvKipcbiAgICogTW92aW5nIGRpcmVjdGlvbiBtb2RlLlxuICAgKlxuICAgKiBBdmFpbGFibGUgaW5wdXRzOlxuICAgKiAtICdsdHInIC0gbGVmdCB0byByaWdodCBtb3ZlbWVudCxcbiAgICogLSAncnRsJyAtIHJpZ2h0IHRvIGxlZnQgbW92ZW1lbnQuXG4gICAqXG4gICAqIEB0eXBlIHtTdHJpbmd9XG4gICAqL1xuICBkaXJlY3Rpb246ICdsdHInLFxuXG4gIC8qKlxuICAgKiBUaGUgZGlzdGFuY2UgdmFsdWUgb2YgdGhlIG5leHQgYW5kIHByZXZpb3VzIHZpZXdwb3J0cyB3aGljaFxuICAgKiBoYXZlIHRvIHBlZWsgaW4gdGhlIGN1cnJlbnQgdmlldy4gQWNjZXB0cyBudW1iZXIgYW5kXG4gICAqIHBpeGVscyBhcyBhIHN0cmluZy4gTGVmdCBhbmQgcmlnaHQgcGVla2luZyBjYW4gYmVcbiAgICogc2V0IHVwIHNlcGFyYXRlbHkgd2l0aCBhIGRpcmVjdGlvbnMgb2JqZWN0LlxuICAgKlxuICAgKiBGb3IgZXhhbXBsZTpcbiAgICogYDEwMGAgLSBQZWVrIDEwMHB4IG9uIHRoZSBib3RoIHNpZGVzLlxuICAgKiB7IGJlZm9yZTogMTAwLCBhZnRlcjogNTAgfWAgLSBQZWVrIDEwMHB4IG9uIHRoZSBsZWZ0IHNpZGUgYW5kIDUwcHggb24gdGhlIHJpZ2h0IHNpZGUuXG4gICAqXG4gICAqIEB0eXBlIHtOdW1iZXJ8U3RyaW5nfE9iamVjdH1cbiAgICovXG4gIHBlZWs6IDAsXG5cbiAgLyoqXG4gICAqIENvbGxlY3Rpb24gb2Ygb3B0aW9ucyBhcHBsaWVkIGF0IHNwZWNpZmllZCBtZWRpYSBicmVha3BvaW50cy5cbiAgICogRm9yIGV4YW1wbGU6IGRpc3BsYXkgdHdvIHNsaWRlcyBwZXIgdmlldyB1bmRlciA4MDBweC5cbiAgICogYHtcbiAgICogICAnODAwcHgnOiB7XG4gICAqICAgICBwZXJWaWV3OiAyXG4gICAqICAgfVxuICAgKiB9YFxuICAgKi9cbiAgYnJlYWtwb2ludHM6IHt9LFxuXG4gIC8qKlxuICAgKiBDb2xsZWN0aW9uIG9mIGludGVybmFsbHkgdXNlZCBIVE1MIGNsYXNzZXMuXG4gICAqXG4gICAqIEB0b2RvIFJlZmFjdG9yIGBzbGlkZXJgIGFuZCBgY2Fyb3VzZWxgIHByb3BlcnRpZXMgdG8gc2luZ2xlIGB0eXBlOiB7IHNsaWRlcjogJycsIGNhcm91c2VsOiAnJyB9YCBvYmplY3RcbiAgICogQHR5cGUge09iamVjdH1cbiAgICovXG4gIGNsYXNzZXM6IHtcbiAgICBkaXJlY3Rpb246IHtcbiAgICAgIGx0cjogJ2dsaWRlLS1sdHInLFxuICAgICAgcnRsOiAnZ2xpZGUtLXJ0bCdcbiAgICB9LFxuICAgIHNsaWRlcjogJ2dsaWRlLS1zbGlkZXInLFxuICAgIGNhcm91c2VsOiAnZ2xpZGUtLWNhcm91c2VsJyxcbiAgICBzd2lwZWFibGU6ICdnbGlkZS0tc3dpcGVhYmxlJyxcbiAgICBkcmFnZ2luZzogJ2dsaWRlLS1kcmFnZ2luZycsXG4gICAgY2xvbmVTbGlkZTogJ2dsaWRlX19zbGlkZS0tY2xvbmUnLFxuICAgIGFjdGl2ZU5hdjogJ2dsaWRlX19idWxsZXQtLWFjdGl2ZScsXG4gICAgYWN0aXZlU2xpZGU6ICdnbGlkZV9fc2xpZGUtLWFjdGl2ZScsXG4gICAgZGlzYWJsZWRBcnJvdzogJ2dsaWRlX19hcnJvdy0tZGlzYWJsZWQnXG4gIH1cbn07XG5cbi8qKlxuICogT3V0cHV0cyB3YXJuaW5nIG1lc3NhZ2UgdG8gdGhlIGJvd3NlciBjb25zb2xlLlxuICpcbiAqIEBwYXJhbSAge1N0cmluZ30gbXNnXG4gKiBAcmV0dXJuIHtWb2lkfVxuICovXG5mdW5jdGlvbiB3YXJuKG1zZykge1xuICBjb25zb2xlLmVycm9yKFwiW0dsaWRlIHdhcm5dOiBcIiArIG1zZyk7XG59XG5cbnZhciBfdHlwZW9mID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIgPyBmdW5jdGlvbiAob2JqKSB7XG4gIHJldHVybiB0eXBlb2Ygb2JqO1xufSA6IGZ1bmN0aW9uIChvYmopIHtcbiAgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7XG59O1xuXG52YXIgY2xhc3NDYWxsQ2hlY2sgPSBmdW5jdGlvbiAoaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7XG4gIGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTtcbiAgfVxufTtcblxudmFyIGNyZWF0ZUNsYXNzID0gZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldO1xuICAgICAgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlO1xuICAgICAgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlO1xuICAgICAgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykge1xuICAgIGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7XG4gICAgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7XG4gICAgcmV0dXJuIENvbnN0cnVjdG9yO1xuICB9O1xufSgpO1xuXG52YXIgX2V4dGVuZHMgPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldO1xuXG4gICAgZm9yICh2YXIga2V5IGluIHNvdXJjZSkge1xuICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHtcbiAgICAgICAgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGFyZ2V0O1xufTtcblxudmFyIGdldCA9IGZ1bmN0aW9uIGdldChvYmplY3QsIHByb3BlcnR5LCByZWNlaXZlcikge1xuICBpZiAob2JqZWN0ID09PSBudWxsKSBvYmplY3QgPSBGdW5jdGlvbi5wcm90b3R5cGU7XG4gIHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmplY3QsIHByb3BlcnR5KTtcblxuICBpZiAoZGVzYyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgdmFyIHBhcmVudCA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmplY3QpO1xuXG4gICAgaWYgKHBhcmVudCA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGdldChwYXJlbnQsIHByb3BlcnR5LCByZWNlaXZlcik7XG4gICAgfVxuICB9IGVsc2UgaWYgKFwidmFsdWVcIiBpbiBkZXNjKSB7XG4gICAgcmV0dXJuIGRlc2MudmFsdWU7XG4gIH0gZWxzZSB7XG4gICAgdmFyIGdldHRlciA9IGRlc2MuZ2V0O1xuXG4gICAgaWYgKGdldHRlciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIHJldHVybiBnZXR0ZXIuY2FsbChyZWNlaXZlcik7XG4gIH1cbn07XG5cbnZhciBpbmhlcml0cyA9IGZ1bmN0aW9uIChzdWJDbGFzcywgc3VwZXJDbGFzcykge1xuICBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgXCIgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7XG4gIH1cblxuICBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHtcbiAgICBjb25zdHJ1Y3Rvcjoge1xuICAgICAgdmFsdWU6IHN1YkNsYXNzLFxuICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH1cbiAgfSk7XG4gIGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzcztcbn07XG5cbnZhciBwb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuID0gZnVuY3Rpb24gKHNlbGYsIGNhbGwpIHtcbiAgaWYgKCFzZWxmKSB7XG4gICAgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpO1xuICB9XG5cbiAgcmV0dXJuIGNhbGwgJiYgKHR5cGVvZiBjYWxsID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpID8gY2FsbCA6IHNlbGY7XG59O1xuXG4vKipcbiAqIENvbnZlcnRzIHZhbHVlIGVudGVyZWQgYXMgbnVtYmVyXG4gKiBvciBzdHJpbmcgdG8gaW50ZWdlciB2YWx1ZS5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gdmFsdWVcbiAqIEByZXR1cm5zIHtOdW1iZXJ9XG4gKi9cbmZ1bmN0aW9uIHRvSW50KHZhbHVlKSB7XG4gIHJldHVybiBwYXJzZUludCh2YWx1ZSk7XG59XG5cbi8qKlxuICogQ29udmVydHMgdmFsdWUgZW50ZXJlZCBhcyBudW1iZXJcbiAqIG9yIHN0cmluZyB0byBmbGF0IHZhbHVlLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSB2YWx1ZVxuICogQHJldHVybnMge051bWJlcn1cbiAqL1xuZnVuY3Rpb24gdG9GbG9hdCh2YWx1ZSkge1xuICByZXR1cm4gcGFyc2VGbG9hdCh2YWx1ZSk7XG59XG5cbi8qKlxuICogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIHNwZWNpZmllZCB2YWx1ZSBpcyBhIHN0cmluZy5cbiAqXG4gKiBAcGFyYW0gIHsqfSAgIHZhbHVlXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICovXG5mdW5jdGlvbiBpc1N0cmluZyh2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJztcbn1cblxuLyoqXG4gKiBJbmRpY2F0ZXMgd2hldGhlciB0aGUgc3BlY2lmaWVkIHZhbHVlIGlzIGFuIG9iamVjdC5cbiAqXG4gKiBAcGFyYW0gIHsqfSB2YWx1ZVxuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqXG4gKiBAc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9qYXNoa2VuYXMvdW5kZXJzY29yZVxuICovXG5mdW5jdGlvbiBpc09iamVjdCh2YWx1ZSkge1xuICB2YXIgdHlwZSA9IHR5cGVvZiB2YWx1ZSA9PT0gJ3VuZGVmaW5lZCcgPyAndW5kZWZpbmVkJyA6IF90eXBlb2YodmFsdWUpO1xuXG4gIHJldHVybiB0eXBlID09PSAnZnVuY3Rpb24nIHx8IHR5cGUgPT09ICdvYmplY3QnICYmICEhdmFsdWU7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tbWl4ZWQtb3BlcmF0b3JzXG59XG5cbi8qKlxuICogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIHNwZWNpZmllZCB2YWx1ZSBpcyBhIG51bWJlci5cbiAqXG4gKiBAcGFyYW0gIHsqfSB2YWx1ZVxuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqL1xuZnVuY3Rpb24gaXNOdW1iZXIodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcic7XG59XG5cbi8qKlxuICogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIHNwZWNpZmllZCB2YWx1ZSBpcyBhIGZ1bmN0aW9uLlxuICpcbiAqIEBwYXJhbSAgeyp9IHZhbHVlXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICovXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbic7XG59XG5cbi8qKlxuICogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIHNwZWNpZmllZCB2YWx1ZSBpcyB1bmRlZmluZWQuXG4gKlxuICogQHBhcmFtICB7Kn0gdmFsdWVcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKi9cbmZ1bmN0aW9uIGlzVW5kZWZpbmVkKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICd1bmRlZmluZWQnO1xufVxuXG4vKipcbiAqIEluZGljYXRlcyB3aGV0aGVyIHRoZSBzcGVjaWZpZWQgdmFsdWUgaXMgYW4gYXJyYXkuXG4gKlxuICogQHBhcmFtICB7Kn0gdmFsdWVcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXkodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlLmNvbnN0cnVjdG9yID09PSBBcnJheTtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGFuZCBpbml0aWFsaXplcyBzcGVjaWZpZWQgY29sbGVjdGlvbiBvZiBleHRlbnNpb25zLlxuICogRWFjaCBleHRlbnNpb24gcmVjZWl2ZXMgYWNjZXNzIHRvIGluc3RhbmNlIG9mIGdsaWRlIGFuZCByZXN0IG9mIGNvbXBvbmVudHMuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGdsaWRlXG4gKiBAcGFyYW0ge09iamVjdH0gZXh0ZW5zaW9uc1xuICpcbiAqIEByZXR1cm5zIHtPYmplY3R9XG4gKi9cbmZ1bmN0aW9uIG1vdW50KGdsaWRlLCBleHRlbnNpb25zLCBldmVudHMpIHtcbiAgdmFyIGNvbXBvbmVudHMgPSB7fTtcblxuICBmb3IgKHZhciBuYW1lIGluIGV4dGVuc2lvbnMpIHtcbiAgICBpZiAoaXNGdW5jdGlvbihleHRlbnNpb25zW25hbWVdKSkge1xuICAgICAgY29tcG9uZW50c1tuYW1lXSA9IGV4dGVuc2lvbnNbbmFtZV0oZ2xpZGUsIGNvbXBvbmVudHMsIGV2ZW50cyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHdhcm4oJ0V4dGVuc2lvbiBtdXN0IGJlIGEgZnVuY3Rpb24nKTtcbiAgICB9XG4gIH1cblxuICBmb3IgKHZhciBfbmFtZSBpbiBjb21wb25lbnRzKSB7XG4gICAgaWYgKGlzRnVuY3Rpb24oY29tcG9uZW50c1tfbmFtZV0ubW91bnQpKSB7XG4gICAgICBjb21wb25lbnRzW19uYW1lXS5tb3VudCgpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBjb21wb25lbnRzO1xufVxuXG4vKipcbiAqIERlZmluZXMgZ2V0dGVyIGFuZCBzZXR0ZXIgcHJvcGVydHkgb24gdGhlIHNwZWNpZmllZCBvYmplY3QuXG4gKlxuICogQHBhcmFtICB7T2JqZWN0fSBvYmogICAgICAgICBPYmplY3Qgd2hlcmUgcHJvcGVydHkgaGFzIHRvIGJlIGRlZmluZWQuXG4gKiBAcGFyYW0gIHtTdHJpbmd9IHByb3AgICAgICAgIE5hbWUgb2YgdGhlIGRlZmluZWQgcHJvcGVydHkuXG4gKiBAcGFyYW0gIHtPYmplY3R9IGRlZmluaXRpb24gIEdldCBhbmQgc2V0IGRlZmluaXRpb25zIGZvciB0aGUgcHJvcGVydHkuXG4gKiBAcmV0dXJuIHtWb2lkfVxuICovXG5mdW5jdGlvbiBkZWZpbmUob2JqLCBwcm9wLCBkZWZpbml0aW9uKSB7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIHByb3AsIGRlZmluaXRpb24pO1xufVxuXG4vKipcbiAqIFNvcnRzIGFwaGFiZXRpY2FsbHkgb2JqZWN0IGtleXMuXG4gKlxuICogQHBhcmFtICB7T2JqZWN0fSBvYmpcbiAqIEByZXR1cm4ge09iamVjdH1cbiAqL1xuZnVuY3Rpb24gc29ydEtleXMob2JqKSB7XG4gIHJldHVybiBPYmplY3Qua2V5cyhvYmopLnNvcnQoKS5yZWR1Y2UoZnVuY3Rpb24gKHIsIGspIHtcbiAgICByW2tdID0gb2JqW2tdO1xuXG4gICAgcmV0dXJuIHJba10sIHI7XG4gIH0sIHt9KTtcbn1cblxuLyoqXG4gKiBNZXJnZXMgcGFzc2VkIHNldHRpbmdzIG9iamVjdCB3aXRoIGRlZmF1bHQgb3B0aW9ucy5cbiAqXG4gKiBAcGFyYW0gIHtPYmplY3R9IGRlZmF1bHRzXG4gKiBAcGFyYW0gIHtPYmplY3R9IHNldHRpbmdzXG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKi9cbmZ1bmN0aW9uIG1lcmdlT3B0aW9ucyhkZWZhdWx0cywgc2V0dGluZ3MpIHtcbiAgdmFyIG9wdGlvbnMgPSBfZXh0ZW5kcyh7fSwgZGVmYXVsdHMsIHNldHRpbmdzKTtcblxuICAvLyBgT2JqZWN0LmFzc2lnbmAgZG8gbm90IGRlZXBseSBtZXJnZSBvYmplY3RzLCBzbyB3ZVxuICAvLyBoYXZlIHRvIGRvIGl0IG1hbnVhbGx5IGZvciBldmVyeSBuZXN0ZWQgb2JqZWN0XG4gIC8vIGluIG9wdGlvbnMuIEFsdGhvdWdoIGl0IGRvZXMgbm90IGxvb2sgc21hcnQsXG4gIC8vIGl0J3Mgc21hbGxlciBhbmQgZmFzdGVyIHRoYW4gc29tZSBmYW5jeVxuICAvLyBtZXJnaW5nIGRlZXAtbWVyZ2UgYWxnb3JpdGhtIHNjcmlwdC5cbiAgaWYgKHNldHRpbmdzLmhhc093blByb3BlcnR5KCdjbGFzc2VzJykpIHtcbiAgICBvcHRpb25zLmNsYXNzZXMgPSBfZXh0ZW5kcyh7fSwgZGVmYXVsdHMuY2xhc3Nlcywgc2V0dGluZ3MuY2xhc3Nlcyk7XG5cbiAgICBpZiAoc2V0dGluZ3MuY2xhc3Nlcy5oYXNPd25Qcm9wZXJ0eSgnZGlyZWN0aW9uJykpIHtcbiAgICAgIG9wdGlvbnMuY2xhc3Nlcy5kaXJlY3Rpb24gPSBfZXh0ZW5kcyh7fSwgZGVmYXVsdHMuY2xhc3Nlcy5kaXJlY3Rpb24sIHNldHRpbmdzLmNsYXNzZXMuZGlyZWN0aW9uKTtcbiAgICB9XG4gIH1cblxuICBpZiAoc2V0dGluZ3MuaGFzT3duUHJvcGVydHkoJ2JyZWFrcG9pbnRzJykpIHtcbiAgICBvcHRpb25zLmJyZWFrcG9pbnRzID0gX2V4dGVuZHMoe30sIGRlZmF1bHRzLmJyZWFrcG9pbnRzLCBzZXR0aW5ncy5icmVha3BvaW50cyk7XG4gIH1cblxuICByZXR1cm4gb3B0aW9ucztcbn1cblxudmFyIEV2ZW50c0J1cyA9IGZ1bmN0aW9uICgpIHtcbiAgLyoqXG4gICAqIENvbnN0cnVjdCBhIEV2ZW50QnVzIGluc3RhbmNlLlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gZXZlbnRzXG4gICAqL1xuICBmdW5jdGlvbiBFdmVudHNCdXMoKSB7XG4gICAgdmFyIGV2ZW50cyA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDoge307XG4gICAgY2xhc3NDYWxsQ2hlY2sodGhpcywgRXZlbnRzQnVzKTtcblxuICAgIHRoaXMuZXZlbnRzID0gZXZlbnRzO1xuICAgIHRoaXMuaG9wID0gZXZlbnRzLmhhc093blByb3BlcnR5O1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgbGlzdGVuZXIgdG8gdGhlIHNwZWNpZmVkIGV2ZW50LlxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ3xBcnJheX0gZXZlbnRcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gaGFuZGxlclxuICAgKi9cblxuXG4gIGNyZWF0ZUNsYXNzKEV2ZW50c0J1cywgW3tcbiAgICBrZXk6ICdvbicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIG9uKGV2ZW50LCBoYW5kbGVyKSB7XG4gICAgICBpZiAoaXNBcnJheShldmVudCkpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBldmVudC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIHRoaXMub24oZXZlbnRbaV0sIGhhbmRsZXIpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIENyZWF0ZSB0aGUgZXZlbnQncyBvYmplY3QgaWYgbm90IHlldCBjcmVhdGVkXG4gICAgICBpZiAoIXRoaXMuaG9wLmNhbGwodGhpcy5ldmVudHMsIGV2ZW50KSkge1xuICAgICAgICB0aGlzLmV2ZW50c1tldmVudF0gPSBbXTtcbiAgICAgIH1cblxuICAgICAgLy8gQWRkIHRoZSBoYW5kbGVyIHRvIHF1ZXVlXG4gICAgICB2YXIgaW5kZXggPSB0aGlzLmV2ZW50c1tldmVudF0ucHVzaChoYW5kbGVyKSAtIDE7XG5cbiAgICAgIC8vIFByb3ZpZGUgaGFuZGxlIGJhY2sgZm9yIHJlbW92YWwgb2YgZXZlbnRcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgICAgIGRlbGV0ZSB0aGlzLmV2ZW50c1tldmVudF1baW5kZXhdO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJ1bnMgcmVnaXN0ZXJlZCBoYW5kbGVycyBmb3Igc3BlY2lmaWVkIGV2ZW50LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd8QXJyYXl9IGV2ZW50XG4gICAgICogQHBhcmFtIHtPYmplY3Q9fSBjb250ZXh0XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ2VtaXQnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBlbWl0KGV2ZW50LCBjb250ZXh0KSB7XG4gICAgICBpZiAoaXNBcnJheShldmVudCkpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBldmVudC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIHRoaXMuZW1pdChldmVudFtpXSwgY29udGV4dCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gSWYgdGhlIGV2ZW50IGRvZXNuJ3QgZXhpc3QsIG9yIHRoZXJlJ3Mgbm8gaGFuZGxlcnMgaW4gcXVldWUsIGp1c3QgbGVhdmVcbiAgICAgIGlmICghdGhpcy5ob3AuY2FsbCh0aGlzLmV2ZW50cywgZXZlbnQpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gQ3ljbGUgdGhyb3VnaCBldmVudHMgcXVldWUsIGZpcmUhXG4gICAgICB0aGlzLmV2ZW50c1tldmVudF0uZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICBpdGVtKGNvbnRleHQgfHwge30pO1xuICAgICAgfSk7XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBFdmVudHNCdXM7XG59KCk7XG5cbnZhciBHbGlkZSA9IGZ1bmN0aW9uICgpIHtcbiAgLyoqXHJcbiAgICogQ29uc3RydWN0IGdsaWRlLlxyXG4gICAqXHJcbiAgICogQHBhcmFtICB7U3RyaW5nfSBzZWxlY3RvclxyXG4gICAqIEBwYXJhbSAge09iamVjdH0gb3B0aW9uc1xyXG4gICAqL1xuICBmdW5jdGlvbiBHbGlkZShzZWxlY3Rvcikge1xuICAgIHZhciBvcHRpb25zID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiB7fTtcbiAgICBjbGFzc0NhbGxDaGVjayh0aGlzLCBHbGlkZSk7XG5cbiAgICB0aGlzLl9jID0ge307XG4gICAgdGhpcy5fdCA9IFtdO1xuICAgIHRoaXMuX2UgPSBuZXcgRXZlbnRzQnVzKCk7XG5cbiAgICB0aGlzLmRpc2FibGVkID0gZmFsc2U7XG4gICAgdGhpcy5zZWxlY3RvciA9IHNlbGVjdG9yO1xuICAgIHRoaXMuc2V0dGluZ3MgPSBtZXJnZU9wdGlvbnMoZGVmYXVsdHMsIG9wdGlvbnMpO1xuICAgIHRoaXMuaW5kZXggPSB0aGlzLnNldHRpbmdzLnN0YXJ0QXQ7XG4gIH1cblxuICAvKipcclxuICAgKiBJbml0aWFsaXplcyBnbGlkZS5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBleHRlbnNpb25zIENvbGxlY3Rpb24gb2YgZXh0ZW5zaW9ucyB0byBpbml0aWFsaXplLlxyXG4gICAqIEByZXR1cm4ge0dsaWRlfVxyXG4gICAqL1xuXG5cbiAgY3JlYXRlQ2xhc3MoR2xpZGUsIFt7XG4gICAga2V5OiAnbW91bnQnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBtb3VudCQkMSgpIHtcbiAgICAgIHZhciBleHRlbnNpb25zID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiB7fTtcblxuICAgICAgdGhpcy5fZS5lbWl0KCdtb3VudC5iZWZvcmUnKTtcblxuICAgICAgaWYgKGlzT2JqZWN0KGV4dGVuc2lvbnMpKSB7XG4gICAgICAgIHRoaXMuX2MgPSBtb3VudCh0aGlzLCBleHRlbnNpb25zLCB0aGlzLl9lKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHdhcm4oJ1lvdSBuZWVkIHRvIHByb3ZpZGUgYSBvYmplY3Qgb24gYG1vdW50KClgJyk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX2UuZW1pdCgnbW91bnQuYWZ0ZXInKTtcblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXHJcbiAgICAgKiBDb2xsZWN0cyBhbiBpbnN0YW5jZSBgdHJhbnNsYXRlYCB0cmFuc2Zvcm1lcnMuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtICB7QXJyYXl9IHRyYW5zZm9ybWVycyBDb2xsZWN0aW9uIG9mIHRyYW5zZm9ybWVycy5cclxuICAgICAqIEByZXR1cm4ge1ZvaWR9XHJcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnbXV0YXRlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gbXV0YXRlKCkge1xuICAgICAgdmFyIHRyYW5zZm9ybWVycyA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDogW107XG5cbiAgICAgIGlmIChpc0FycmF5KHRyYW5zZm9ybWVycykpIHtcbiAgICAgICAgdGhpcy5fdCA9IHRyYW5zZm9ybWVycztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHdhcm4oJ1lvdSBuZWVkIHRvIHByb3ZpZGUgYSBhcnJheSBvbiBgbXV0YXRlKClgJyk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlcyBnbGlkZSB3aXRoIHNwZWNpZmllZCBzZXR0aW5ncy5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gc2V0dGluZ3NcclxuICAgICAqIEByZXR1cm4ge0dsaWRlfVxyXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ3VwZGF0ZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHVwZGF0ZSgpIHtcbiAgICAgIHZhciBzZXR0aW5ncyA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDoge307XG5cbiAgICAgIHRoaXMuc2V0dGluZ3MgPSBtZXJnZU9wdGlvbnModGhpcy5zZXR0aW5ncywgc2V0dGluZ3MpO1xuXG4gICAgICBpZiAoc2V0dGluZ3MuaGFzT3duUHJvcGVydHkoJ3N0YXJ0QXQnKSkge1xuICAgICAgICB0aGlzLmluZGV4ID0gc2V0dGluZ3Muc3RhcnRBdDtcbiAgICAgIH1cblxuICAgICAgdGhpcy5fZS5lbWl0KCd1cGRhdGUnKTtcblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXHJcbiAgICAgKiBDaGFuZ2Ugc2xpZGUgd2l0aCBzcGVjaWZpZWQgcGF0dGVybi4gQSBwYXR0ZXJuIG11c3QgYmUgaW4gdGhlIHNwZWNpYWwgZm9ybWF0OlxyXG4gICAgICogYD5gIC0gTW92ZSBvbmUgZm9yd2FyZFxyXG4gICAgICogYDxgIC0gTW92ZSBvbmUgYmFja3dhcmRcclxuICAgICAqIGA9e2l9YCAtIEdvIHRvIHtpfSB6ZXJvLWJhc2VkIHNsaWRlIChlcS4gJz0xJywgd2lsbCBnbyB0byBzZWNvbmQgc2xpZGUpXHJcbiAgICAgKiBgPj5gIC0gUmV3aW5kcyB0byBlbmQgKGxhc3Qgc2xpZGUpXHJcbiAgICAgKiBgPDxgIC0gUmV3aW5kcyB0byBzdGFydCAoZmlyc3Qgc2xpZGUpXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHBhdHRlcm5cclxuICAgICAqIEByZXR1cm4ge0dsaWRlfVxyXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ2dvJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ28ocGF0dGVybikge1xuICAgICAgdGhpcy5fYy5SdW4ubWFrZShwYXR0ZXJuKTtcblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXHJcbiAgICAgKiBNb3ZlIHRyYWNrIGJ5IHNwZWNpZmllZCBkaXN0YW5jZS5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZGlzdGFuY2VcclxuICAgICAqIEByZXR1cm4ge0dsaWRlfVxyXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ21vdmUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBtb3ZlKGRpc3RhbmNlKSB7XG4gICAgICB0aGlzLl9jLlRyYW5zaXRpb24uZGlzYWJsZSgpO1xuICAgICAgdGhpcy5fYy5Nb3ZlLm1ha2UoZGlzdGFuY2UpO1xuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcclxuICAgICAqIERlc3Ryb3kgaW5zdGFuY2UgYW5kIHJldmVydCBhbGwgY2hhbmdlcyBkb25lIGJ5IHRoaXMuX2MuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7R2xpZGV9XHJcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnZGVzdHJveScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGRlc3Ryb3koKSB7XG4gICAgICB0aGlzLl9lLmVtaXQoJ2Rlc3Ryb3knKTtcblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXHJcbiAgICAgKiBTdGFydCBpbnN0YW5jZSBhdXRvcGxheWluZy5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW58TnVtYmVyfSBpbnRlcnZhbCBSdW4gYXV0b3BsYXlpbmcgd2l0aCBwYXNzZWQgaW50ZXJ2YWwgcmVnYXJkbGVzcyBvZiBgYXV0b3BsYXlgIHNldHRpbmdzXHJcbiAgICAgKiBAcmV0dXJuIHtHbGlkZX1cclxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdwbGF5JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gcGxheSgpIHtcbiAgICAgIHZhciBpbnRlcnZhbCA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDogZmFsc2U7XG5cbiAgICAgIGlmIChpbnRlcnZhbCkge1xuICAgICAgICB0aGlzLnNldHRpbmdzLmF1dG9wbGF5ID0gaW50ZXJ2YWw7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX2UuZW1pdCgncGxheScpO1xuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcclxuICAgICAqIFN0b3AgaW5zdGFuY2UgYXV0b3BsYXlpbmcuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7R2xpZGV9XHJcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAncGF1c2UnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBwYXVzZSgpIHtcbiAgICAgIHRoaXMuX2UuZW1pdCgncGF1c2UnKTtcblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIGdsaWRlIGludG8gYSBpZGxlIHN0YXR1cy5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIHtHbGlkZX1cclxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdkaXNhYmxlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZGlzYWJsZSgpIHtcbiAgICAgIHRoaXMuZGlzYWJsZWQgPSB0cnVlO1xuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcclxuICAgICAqIFNldHMgZ2xpZGUgaW50byBhIGFjdGl2ZSBzdGF0dXMuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7R2xpZGV9XHJcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnZW5hYmxlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZW5hYmxlKCkge1xuICAgICAgdGhpcy5kaXNhYmxlZCA9IGZhbHNlO1xuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcclxuICAgICAqIEFkZHMgY3V1dG9tIGV2ZW50IGxpc3RlbmVyIHdpdGggaGFuZGxlci5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd8QXJyYXl9IGV2ZW50XHJcbiAgICAgKiBAcGFyYW0gIHtGdW5jdGlvbn0gaGFuZGxlclxyXG4gICAgICogQHJldHVybiB7R2xpZGV9XHJcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnb24nLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBvbihldmVudCwgaGFuZGxlcikge1xuICAgICAgdGhpcy5fZS5vbihldmVudCwgaGFuZGxlcik7XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxyXG4gICAgICogQ2hlY2tzIGlmIGdsaWRlIGlzIGEgcHJlY2lzZWQgdHlwZS5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9IG5hbWVcclxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59XHJcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnaXNUeXBlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gaXNUeXBlKG5hbWUpIHtcbiAgICAgIHJldHVybiB0aGlzLnNldHRpbmdzLnR5cGUgPT09IG5hbWU7XG4gICAgfVxuXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHZhbHVlIG9mIHRoZSBjb3JlIG9wdGlvbnMuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7T2JqZWN0fVxyXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ3NldHRpbmdzJyxcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCQkMSgpIHtcbiAgICAgIHJldHVybiB0aGlzLl9vO1xuICAgIH1cblxuICAgIC8qKlxyXG4gICAgICogU2V0cyB2YWx1ZSBvZiB0aGUgY29yZSBvcHRpb25zLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSAge09iamVjdH0gb1xyXG4gICAgICogQHJldHVybiB7Vm9pZH1cclxuICAgICAqL1xuICAgICxcbiAgICBzZXQ6IGZ1bmN0aW9uIHNldCQkMShvKSB7XG4gICAgICBpZiAoaXNPYmplY3QobykpIHtcbiAgICAgICAgdGhpcy5fbyA9IG87XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB3YXJuKCdPcHRpb25zIG11c3QgYmUgYW4gYG9iamVjdGAgaW5zdGFuY2UuJyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIGN1cnJlbnQgaW5kZXggb2YgdGhlIHNsaWRlci5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9XHJcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnaW5kZXgnLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0JCQxKCkge1xuICAgICAgcmV0dXJuIHRoaXMuX2k7XG4gICAgfVxuXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIGN1cnJlbnQgaW5kZXggYSBzbGlkZXIuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7T2JqZWN0fVxyXG4gICAgICovXG4gICAgLFxuICAgIHNldDogZnVuY3Rpb24gc2V0JCQxKGkpIHtcbiAgICAgIHRoaXMuX2kgPSB0b0ludChpKTtcbiAgICB9XG5cbiAgICAvKipcclxuICAgICAqIEdldHMgdHlwZSBuYW1lIG9mIHRoZSBzbGlkZXIuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7U3RyaW5nfVxyXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ3R5cGUnLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0JCQxKCkge1xuICAgICAgcmV0dXJuIHRoaXMuc2V0dGluZ3MudHlwZTtcbiAgICB9XG5cbiAgICAvKipcclxuICAgICAqIEdldHMgdmFsdWUgb2YgdGhlIGlkbGUgc3RhdHVzLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59XHJcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnZGlzYWJsZWQnLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0JCQxKCkge1xuICAgICAgcmV0dXJuIHRoaXMuX2Q7XG4gICAgfVxuXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHZhbHVlIG9mIHRoZSBpZGxlIHN0YXR1cy5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufVxyXG4gICAgICovXG4gICAgLFxuICAgIHNldDogZnVuY3Rpb24gc2V0JCQxKHN0YXR1cykge1xuICAgICAgdGhpcy5fZCA9ICEhc3RhdHVzO1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gR2xpZGU7XG59KCk7XG5cbmZ1bmN0aW9uIFJ1biAoR2xpZGUsIENvbXBvbmVudHMsIEV2ZW50cykge1xuICB2YXIgUnVuID0ge1xuICAgIC8qKlxuICAgICAqIEluaXRpYWxpemVzIGF1dG9ydW5uaW5nIG9mIHRoZSBnbGlkZS5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgbW91bnQ6IGZ1bmN0aW9uIG1vdW50KCkge1xuICAgICAgdGhpcy5fbyA9IGZhbHNlO1xuICAgIH0sXG5cblxuICAgIC8qKlxuICAgICAqIE1ha2VzIGdsaWRlcyBydW5uaW5nIGJhc2VkIG9uIHRoZSBwYXNzZWQgbW92aW5nIHNjaGVtYS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBtb3ZlXG4gICAgICovXG4gICAgbWFrZTogZnVuY3Rpb24gbWFrZShtb3ZlKSB7XG4gICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgICBpZiAoIUdsaWRlLmRpc2FibGVkKSB7XG4gICAgICAgIEdsaWRlLmRpc2FibGUoKTtcblxuICAgICAgICB0aGlzLm1vdmUgPSBtb3ZlO1xuXG4gICAgICAgIEV2ZW50cy5lbWl0KCdydW4uYmVmb3JlJywgdGhpcy5tb3ZlKTtcblxuICAgICAgICB0aGlzLmNhbGN1bGF0ZSgpO1xuXG4gICAgICAgIEV2ZW50cy5lbWl0KCdydW4nLCB0aGlzLm1vdmUpO1xuXG4gICAgICAgIENvbXBvbmVudHMuVHJhbnNpdGlvbi5hZnRlcihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgaWYgKF90aGlzLmlzU3RhcnQoKSkge1xuICAgICAgICAgICAgRXZlbnRzLmVtaXQoJ3J1bi5zdGFydCcsIF90aGlzLm1vdmUpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChfdGhpcy5pc0VuZCgpKSB7XG4gICAgICAgICAgICBFdmVudHMuZW1pdCgncnVuLmVuZCcsIF90aGlzLm1vdmUpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChfdGhpcy5pc09mZnNldCgnPCcpIHx8IF90aGlzLmlzT2Zmc2V0KCc+JykpIHtcbiAgICAgICAgICAgIF90aGlzLl9vID0gZmFsc2U7XG5cbiAgICAgICAgICAgIEV2ZW50cy5lbWl0KCdydW4ub2Zmc2V0JywgX3RoaXMubW92ZSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgRXZlbnRzLmVtaXQoJ3J1bi5hZnRlcicsIF90aGlzLm1vdmUpO1xuXG4gICAgICAgICAgR2xpZGUuZW5hYmxlKCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0sXG5cblxuICAgIC8qKlxuICAgICAqIENhbGN1bGF0ZXMgY3VycmVudCBpbmRleCBiYXNlZCBvbiBkZWZpbmVkIG1vdmUuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIGNhbGN1bGF0ZTogZnVuY3Rpb24gY2FsY3VsYXRlKCkge1xuICAgICAgdmFyIG1vdmUgPSB0aGlzLm1vdmUsXG4gICAgICAgICAgbGVuZ3RoID0gdGhpcy5sZW5ndGg7XG4gICAgICB2YXIgc3RlcHMgPSBtb3ZlLnN0ZXBzLFxuICAgICAgICAgIGRpcmVjdGlvbiA9IG1vdmUuZGlyZWN0aW9uO1xuXG5cbiAgICAgIHZhciBjb3VudGFibGVTdGVwcyA9IGlzTnVtYmVyKHRvSW50KHN0ZXBzKSkgJiYgdG9JbnQoc3RlcHMpICE9PSAwO1xuXG4gICAgICBzd2l0Y2ggKGRpcmVjdGlvbikge1xuICAgICAgICBjYXNlICc+JzpcbiAgICAgICAgICBpZiAoc3RlcHMgPT09ICc+Jykge1xuICAgICAgICAgICAgR2xpZGUuaW5kZXggPSBsZW5ndGg7XG4gICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmlzRW5kKCkpIHtcbiAgICAgICAgICAgIGlmICghKEdsaWRlLmlzVHlwZSgnc2xpZGVyJykgJiYgIUdsaWRlLnNldHRpbmdzLnJld2luZCkpIHtcbiAgICAgICAgICAgICAgdGhpcy5fbyA9IHRydWU7XG5cbiAgICAgICAgICAgICAgR2xpZGUuaW5kZXggPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSBpZiAoY291bnRhYmxlU3RlcHMpIHtcbiAgICAgICAgICAgIEdsaWRlLmluZGV4ICs9IE1hdGgubWluKGxlbmd0aCAtIEdsaWRlLmluZGV4LCAtdG9JbnQoc3RlcHMpKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgR2xpZGUuaW5kZXgrKztcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAnPCc6XG4gICAgICAgICAgaWYgKHN0ZXBzID09PSAnPCcpIHtcbiAgICAgICAgICAgIEdsaWRlLmluZGV4ID0gMDtcbiAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuaXNTdGFydCgpKSB7XG4gICAgICAgICAgICBpZiAoIShHbGlkZS5pc1R5cGUoJ3NsaWRlcicpICYmICFHbGlkZS5zZXR0aW5ncy5yZXdpbmQpKSB7XG4gICAgICAgICAgICAgIHRoaXMuX28gPSB0cnVlO1xuXG4gICAgICAgICAgICAgIEdsaWRlLmluZGV4ID0gbGVuZ3RoO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSBpZiAoY291bnRhYmxlU3RlcHMpIHtcbiAgICAgICAgICAgIEdsaWRlLmluZGV4IC09IE1hdGgubWluKEdsaWRlLmluZGV4LCB0b0ludChzdGVwcykpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBHbGlkZS5pbmRleC0tO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICc9JzpcbiAgICAgICAgICBHbGlkZS5pbmRleCA9IHN0ZXBzO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgd2FybignSW52YWxpZCBkaXJlY3Rpb24gcGF0dGVybiBbJyArIGRpcmVjdGlvbiArIHN0ZXBzICsgJ10gaGFzIGJlZW4gdXNlZCcpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH0sXG5cblxuICAgIC8qKlxuICAgICAqIENoZWNrcyBpZiB3ZSBhcmUgb24gdGhlIGZpcnN0IHNsaWRlLlxuICAgICAqXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICAgKi9cbiAgICBpc1N0YXJ0OiBmdW5jdGlvbiBpc1N0YXJ0KCkge1xuICAgICAgcmV0dXJuIEdsaWRlLmluZGV4ID09PSAwO1xuICAgIH0sXG5cblxuICAgIC8qKlxuICAgICAqIENoZWNrcyBpZiB3ZSBhcmUgb24gdGhlIGxhc3Qgc2xpZGUuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgICAqL1xuICAgIGlzRW5kOiBmdW5jdGlvbiBpc0VuZCgpIHtcbiAgICAgIHJldHVybiBHbGlkZS5pbmRleCA9PT0gdGhpcy5sZW5ndGg7XG4gICAgfSxcblxuXG4gICAgLyoqXG4gICAgICogQ2hlY2tzIGlmIHdlIGFyZSBtYWtpbmcgYSBvZmZzZXQgcnVuLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGRpcmVjdGlvblxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAgICovXG4gICAgaXNPZmZzZXQ6IGZ1bmN0aW9uIGlzT2Zmc2V0KGRpcmVjdGlvbikge1xuICAgICAgcmV0dXJuIHRoaXMuX28gJiYgdGhpcy5tb3ZlLmRpcmVjdGlvbiA9PT0gZGlyZWN0aW9uO1xuICAgIH1cbiAgfTtcblxuICBkZWZpbmUoUnVuLCAnbW92ZScsIHtcbiAgICAvKipcbiAgICAgKiBHZXRzIHZhbHVlIG9mIHRoZSBtb3ZlIHNjaGVtYS5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtPYmplY3R9XG4gICAgICovXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5fbTtcbiAgICB9LFxuXG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHZhbHVlIG9mIHRoZSBtb3ZlIHNjaGVtYS5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtPYmplY3R9XG4gICAgICovXG4gICAgc2V0OiBmdW5jdGlvbiBzZXQodmFsdWUpIHtcbiAgICAgIHZhciBzdGVwID0gdmFsdWUuc3Vic3RyKDEpO1xuXG4gICAgICB0aGlzLl9tID0ge1xuICAgICAgICBkaXJlY3Rpb246IHZhbHVlLnN1YnN0cigwLCAxKSxcbiAgICAgICAgc3RlcHM6IHN0ZXAgPyB0b0ludChzdGVwKSA/IHRvSW50KHN0ZXApIDogc3RlcCA6IDBcbiAgICAgIH07XG4gICAgfVxuICB9KTtcblxuICBkZWZpbmUoUnVuLCAnbGVuZ3RoJywge1xuICAgIC8qKlxuICAgICAqIEdldHMgdmFsdWUgb2YgdGhlIHJ1bm5pbmcgZGlzdGFuY2UgYmFzZWRcbiAgICAgKiBvbiB6ZXJvLWluZGV4aW5nIG51bWJlciBvZiBzbGlkZXMuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9XG4gICAgICovXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICB2YXIgc2V0dGluZ3MgPSBHbGlkZS5zZXR0aW5ncztcbiAgICAgIHZhciBsZW5ndGggPSBDb21wb25lbnRzLkh0bWwuc2xpZGVzLmxlbmd0aDtcblxuICAgICAgLy8gSWYgdGhlIGBib3VuZGAgb3B0aW9uIGlzIGFjaXR2ZSwgYSBtYXhpbXVtIHJ1bm5pbmcgZGlzdGFuY2Ugc2hvdWxkIGJlXG4gICAgICAvLyByZWR1Y2VkIGJ5IGBwZXJWaWV3YCBhbmQgYGZvY3VzQXRgIHNldHRpbmdzLiBSdW5uaW5nIGRpc3RhbmNlXG4gICAgICAvLyBzaG91bGQgZW5kIGJlZm9yZSBjcmVhdGluZyBhbiBlbXB0eSBzcGFjZSBhZnRlciBpbnN0YW5jZS5cblxuICAgICAgaWYgKEdsaWRlLmlzVHlwZSgnc2xpZGVyJykgJiYgc2V0dGluZ3MuZm9jdXNBdCAhPT0gJ2NlbnRlcicgJiYgc2V0dGluZ3MuYm91bmQpIHtcbiAgICAgICAgcmV0dXJuIGxlbmd0aCAtIDEgLSAodG9JbnQoc2V0dGluZ3MucGVyVmlldykgLSAxKSArIHRvSW50KHNldHRpbmdzLmZvY3VzQXQpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gbGVuZ3RoIC0gMTtcbiAgICB9XG4gIH0pO1xuXG4gIGRlZmluZShSdW4sICdvZmZzZXQnLCB7XG4gICAgLyoqXG4gICAgICogR2V0cyBzdGF0dXMgb2YgdGhlIG9mZnNldHRpbmcgZmxhZy5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAgICovXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5fbztcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBSdW47XG59XG5cbi8qKlxuICogUmV0dXJucyBhIGN1cnJlbnQgdGltZS5cbiAqXG4gKiBAcmV0dXJuIHtOdW1iZXJ9XG4gKi9cbmZ1bmN0aW9uIG5vdygpIHtcbiAgcmV0dXJuIG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xufVxuXG4vKipcbiAqIFJldHVybnMgYSBmdW5jdGlvbiwgdGhhdCwgd2hlbiBpbnZva2VkLCB3aWxsIG9ubHkgYmUgdHJpZ2dlcmVkXG4gKiBhdCBtb3N0IG9uY2UgZHVyaW5nIGEgZ2l2ZW4gd2luZG93IG9mIHRpbWUuXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuY1xuICogQHBhcmFtIHtOdW1iZXJ9IHdhaXRcbiAqIEBwYXJhbSB7T2JqZWN0PX0gb3B0aW9uc1xuICogQHJldHVybiB7RnVuY3Rpb259XG4gKlxuICogQHNlZSBodHRwczovL2dpdGh1Yi5jb20vamFzaGtlbmFzL3VuZGVyc2NvcmVcbiAqL1xuZnVuY3Rpb24gdGhyb3R0bGUoZnVuYywgd2FpdCwgb3B0aW9ucykge1xuICB2YXIgdGltZW91dCA9IHZvaWQgMCxcbiAgICAgIGNvbnRleHQgPSB2b2lkIDAsXG4gICAgICBhcmdzID0gdm9pZCAwLFxuICAgICAgcmVzdWx0ID0gdm9pZCAwO1xuICB2YXIgcHJldmlvdXMgPSAwO1xuICBpZiAoIW9wdGlvbnMpIG9wdGlvbnMgPSB7fTtcblxuICB2YXIgbGF0ZXIgPSBmdW5jdGlvbiBsYXRlcigpIHtcbiAgICBwcmV2aW91cyA9IG9wdGlvbnMubGVhZGluZyA9PT0gZmFsc2UgPyAwIDogbm93KCk7XG4gICAgdGltZW91dCA9IG51bGw7XG4gICAgcmVzdWx0ID0gZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKTtcbiAgICBpZiAoIXRpbWVvdXQpIGNvbnRleHQgPSBhcmdzID0gbnVsbDtcbiAgfTtcblxuICB2YXIgdGhyb3R0bGVkID0gZnVuY3Rpb24gdGhyb3R0bGVkKCkge1xuICAgIHZhciBhdCA9IG5vdygpO1xuICAgIGlmICghcHJldmlvdXMgJiYgb3B0aW9ucy5sZWFkaW5nID09PSBmYWxzZSkgcHJldmlvdXMgPSBhdDtcbiAgICB2YXIgcmVtYWluaW5nID0gd2FpdCAtIChhdCAtIHByZXZpb3VzKTtcbiAgICBjb250ZXh0ID0gdGhpcztcbiAgICBhcmdzID0gYXJndW1lbnRzO1xuICAgIGlmIChyZW1haW5pbmcgPD0gMCB8fCByZW1haW5pbmcgPiB3YWl0KSB7XG4gICAgICBpZiAodGltZW91dCkge1xuICAgICAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XG4gICAgICAgIHRpbWVvdXQgPSBudWxsO1xuICAgICAgfVxuICAgICAgcHJldmlvdXMgPSBhdDtcbiAgICAgIHJlc3VsdCA9IGZ1bmMuYXBwbHkoY29udGV4dCwgYXJncyk7XG4gICAgICBpZiAoIXRpbWVvdXQpIGNvbnRleHQgPSBhcmdzID0gbnVsbDtcbiAgICB9IGVsc2UgaWYgKCF0aW1lb3V0ICYmIG9wdGlvbnMudHJhaWxpbmcgIT09IGZhbHNlKSB7XG4gICAgICB0aW1lb3V0ID0gc2V0VGltZW91dChsYXRlciwgcmVtYWluaW5nKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcblxuICB0aHJvdHRsZWQuY2FuY2VsID0gZnVuY3Rpb24gKCkge1xuICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiAgICBwcmV2aW91cyA9IDA7XG4gICAgdGltZW91dCA9IGNvbnRleHQgPSBhcmdzID0gbnVsbDtcbiAgfTtcblxuICByZXR1cm4gdGhyb3R0bGVkO1xufVxuXG52YXIgTUFSR0lOX1RZUEUgPSB7XG4gIGx0cjogWydtYXJnaW5MZWZ0JywgJ21hcmdpblJpZ2h0J10sXG4gIHJ0bDogWydtYXJnaW5SaWdodCcsICdtYXJnaW5MZWZ0J11cbn07XG5cbmZ1bmN0aW9uIEdhcHMgKEdsaWRlLCBDb21wb25lbnRzLCBFdmVudHMpIHtcbiAgdmFyIEdhcHMgPSB7XG4gICAgLyoqXG4gICAgICogQXBwbGllcyBnYXBzIGJldHdlZW4gc2xpZGVzLiBGaXJzdCBhbmQgbGFzdFxuICAgICAqIHNsaWRlcyBkbyBub3QgcmVjZWl2ZSBpdCdzIGVkZ2UgbWFyZ2lucy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7SFRNTENvbGxlY3Rpb259IHNsaWRlc1xuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgYXBwbHk6IGZ1bmN0aW9uIGFwcGx5KHNsaWRlcykge1xuICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IHNsaWRlcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICB2YXIgc3R5bGUgPSBzbGlkZXNbaV0uc3R5bGU7XG4gICAgICAgIHZhciBkaXJlY3Rpb24gPSBDb21wb25lbnRzLkRpcmVjdGlvbi52YWx1ZTtcblxuICAgICAgICBpZiAoaSAhPT0gMCkge1xuICAgICAgICAgIHN0eWxlW01BUkdJTl9UWVBFW2RpcmVjdGlvbl1bMF1dID0gdGhpcy52YWx1ZSAvIDIgKyAncHgnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHN0eWxlW01BUkdJTl9UWVBFW2RpcmVjdGlvbl1bMF1dID0gJyc7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaSAhPT0gc2xpZGVzLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICBzdHlsZVtNQVJHSU5fVFlQRVtkaXJlY3Rpb25dWzFdXSA9IHRoaXMudmFsdWUgLyAyICsgJ3B4JztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzdHlsZVtNQVJHSU5fVFlQRVtkaXJlY3Rpb25dWzFdXSA9ICcnO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyBnYXBzIGZyb20gdGhlIHNsaWRlcy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7SFRNTENvbGxlY3Rpb259IHNsaWRlc1xuICAgICAqIEByZXR1cm5zIHtWb2lkfVxuICAgICovXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoc2xpZGVzKSB7XG4gICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gc2xpZGVzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIHZhciBzdHlsZSA9IHNsaWRlc1tpXS5zdHlsZTtcblxuICAgICAgICBzdHlsZS5tYXJnaW5MZWZ0ID0gJyc7XG4gICAgICAgIHN0eWxlLm1hcmdpblJpZ2h0ID0gJyc7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIGRlZmluZShHYXBzLCAndmFsdWUnLCB7XG4gICAgLyoqXG4gICAgICogR2V0cyB2YWx1ZSBvZiB0aGUgZ2FwLlxuICAgICAqXG4gICAgICogQHJldHVybnMge051bWJlcn1cbiAgICAgKi9cbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0b0ludChHbGlkZS5zZXR0aW5ncy5nYXApO1xuICAgIH1cbiAgfSk7XG5cbiAgZGVmaW5lKEdhcHMsICdncm93Jywge1xuICAgIC8qKlxuICAgICAqIEdldHMgYWRkaXRpb25hbCBkaW1lbnRpb25zIHZhbHVlIGNhdXNlZCBieSBnYXBzLlxuICAgICAqIFVzZWQgdG8gaW5jcmVhc2Ugd2lkdGggb2YgdGhlIHNsaWRlcyB3cmFwcGVyLlxuICAgICAqXG4gICAgICogQHJldHVybnMge051bWJlcn1cbiAgICAgKi9cbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiBHYXBzLnZhbHVlICogKENvbXBvbmVudHMuU2l6ZXMubGVuZ3RoIC0gMSk7XG4gICAgfVxuICB9KTtcblxuICBkZWZpbmUoR2FwcywgJ3JlZHVjdG9yJywge1xuICAgIC8qKlxuICAgICAqIEdldHMgcmVkdWN0aW9uIHZhbHVlIGNhdXNlZCBieSBnYXBzLlxuICAgICAqIFVzZWQgdG8gc3VidHJhY3Qgd2lkdGggb2YgdGhlIHNsaWRlcy5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtOdW1iZXJ9XG4gICAgICovXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICB2YXIgcGVyVmlldyA9IEdsaWRlLnNldHRpbmdzLnBlclZpZXc7XG5cbiAgICAgIHJldHVybiBHYXBzLnZhbHVlICogKHBlclZpZXcgLSAxKSAvIHBlclZpZXc7XG4gICAgfVxuICB9KTtcblxuICAvKipcbiAgICogQXBwbHkgY2FsY3VsYXRlZCBnYXBzOlxuICAgKiAtIGFmdGVyIGJ1aWxkaW5nLCBzbyBzbGlkZXMgKGluY2x1ZGluZyBjbG9uZXMpIHdpbGwgcmVjZWl2ZSBwcm9wZXIgbWFyZ2luc1xuICAgKiAtIG9uIHVwZGF0aW5nIHZpYSBBUEksIHRvIHJlY2FsY3VsYXRlIGdhcHMgd2l0aCBuZXcgb3B0aW9uc1xuICAgKi9cbiAgRXZlbnRzLm9uKFsnYnVpbGQuYWZ0ZXInLCAndXBkYXRlJ10sIHRocm90dGxlKGZ1bmN0aW9uICgpIHtcbiAgICBHYXBzLmFwcGx5KENvbXBvbmVudHMuSHRtbC53cmFwcGVyLmNoaWxkcmVuKTtcbiAgfSwgMzApKTtcblxuICAvKipcbiAgICogUmVtb3ZlIGdhcHM6XG4gICAqIC0gb24gZGVzdHJveWluZyB0byBicmluZyBtYXJrdXAgdG8gaXRzIGluaXRhbCBzdGF0ZVxuICAgKi9cbiAgRXZlbnRzLm9uKCdkZXN0cm95JywgZnVuY3Rpb24gKCkge1xuICAgIEdhcHMucmVtb3ZlKENvbXBvbmVudHMuSHRtbC53cmFwcGVyLmNoaWxkcmVuKTtcbiAgfSk7XG5cbiAgcmV0dXJuIEdhcHM7XG59XG5cbi8qKlxuICogRmluZHMgc2libGluZ3Mgbm9kZXMgb2YgdGhlIHBhc3NlZCBub2RlLlxuICpcbiAqIEBwYXJhbSAge0VsZW1lbnR9IG5vZGVcbiAqIEByZXR1cm4ge0FycmF5fVxuICovXG5mdW5jdGlvbiBzaWJsaW5ncyhub2RlKSB7XG4gIGlmIChub2RlICYmIG5vZGUucGFyZW50Tm9kZSkge1xuICAgIHZhciBuID0gbm9kZS5wYXJlbnROb2RlLmZpcnN0Q2hpbGQ7XG4gICAgdmFyIG1hdGNoZWQgPSBbXTtcblxuICAgIGZvciAoOyBuOyBuID0gbi5uZXh0U2libGluZykge1xuICAgICAgaWYgKG4ubm9kZVR5cGUgPT09IDEgJiYgbiAhPT0gbm9kZSkge1xuICAgICAgICBtYXRjaGVkLnB1c2gobik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG1hdGNoZWQ7XG4gIH1cblxuICByZXR1cm4gW107XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIHBhc3NlZCBub2RlIGV4aXN0IGFuZCBpcyBhIHZhbGlkIGVsZW1lbnQuXG4gKlxuICogQHBhcmFtICB7RWxlbWVudH0gbm9kZVxuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqL1xuZnVuY3Rpb24gZXhpc3Qobm9kZSkge1xuICBpZiAobm9kZSAmJiBub2RlIGluc3RhbmNlb2Ygd2luZG93LkhUTUxFbGVtZW50KSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICByZXR1cm4gZmFsc2U7XG59XG5cbnZhciBUUkFDS19TRUxFQ1RPUiA9ICdbZGF0YS1nbGlkZS1lbD1cInRyYWNrXCJdJztcblxuZnVuY3Rpb24gSHRtbCAoR2xpZGUsIENvbXBvbmVudHMpIHtcbiAgdmFyIEh0bWwgPSB7XG4gICAgLyoqXG4gICAgICogU2V0dXAgc2xpZGVyIEhUTUwgbm9kZXMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0dsaWRlfSBnbGlkZVxuICAgICAqL1xuICAgIG1vdW50OiBmdW5jdGlvbiBtb3VudCgpIHtcbiAgICAgIHRoaXMucm9vdCA9IEdsaWRlLnNlbGVjdG9yO1xuICAgICAgdGhpcy50cmFjayA9IHRoaXMucm9vdC5xdWVyeVNlbGVjdG9yKFRSQUNLX1NFTEVDVE9SKTtcbiAgICAgIHRoaXMuc2xpZGVzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwodGhpcy53cmFwcGVyLmNoaWxkcmVuKS5maWx0ZXIoZnVuY3Rpb24gKHNsaWRlKSB7XG4gICAgICAgIHJldHVybiAhc2xpZGUuY2xhc3NMaXN0LmNvbnRhaW5zKEdsaWRlLnNldHRpbmdzLmNsYXNzZXMuY2xvbmVTbGlkZSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH07XG5cbiAgZGVmaW5lKEh0bWwsICdyb290Jywge1xuICAgIC8qKlxuICAgICAqIEdldHMgbm9kZSBvZiB0aGUgZ2xpZGUgbWFpbiBlbGVtZW50LlxuICAgICAqXG4gICAgICogQHJldHVybiB7T2JqZWN0fVxuICAgICAqL1xuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIEh0bWwuX3I7XG4gICAgfSxcblxuXG4gICAgLyoqXG4gICAgICogU2V0cyBub2RlIG9mIHRoZSBnbGlkZSBtYWluIGVsZW1lbnQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAgICovXG4gICAgc2V0OiBmdW5jdGlvbiBzZXQocikge1xuICAgICAgaWYgKGlzU3RyaW5nKHIpKSB7XG4gICAgICAgIHIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHIpO1xuICAgICAgfVxuXG4gICAgICBpZiAoZXhpc3QocikpIHtcbiAgICAgICAgSHRtbC5fciA9IHI7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB3YXJuKCdSb290IGVsZW1lbnQgbXVzdCBiZSBhIGV4aXN0aW5nIEh0bWwgbm9kZScpO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgZGVmaW5lKEh0bWwsICd0cmFjaycsIHtcbiAgICAvKipcbiAgICAgKiBHZXRzIG5vZGUgb2YgdGhlIGdsaWRlIHRyYWNrIHdpdGggc2xpZGVzLlxuICAgICAqXG4gICAgICogQHJldHVybiB7T2JqZWN0fVxuICAgICAqL1xuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIEh0bWwuX3Q7XG4gICAgfSxcblxuXG4gICAgLyoqXG4gICAgICogU2V0cyBub2RlIG9mIHRoZSBnbGlkZSB0cmFjayB3aXRoIHNsaWRlcy5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge09iamVjdH1cbiAgICAgKi9cbiAgICBzZXQ6IGZ1bmN0aW9uIHNldCh0KSB7XG4gICAgICBpZiAoZXhpc3QodCkpIHtcbiAgICAgICAgSHRtbC5fdCA9IHQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB3YXJuKCdDb3VsZCBub3QgZmluZCB0cmFjayBlbGVtZW50LiBQbGVhc2UgdXNlICcgKyBUUkFDS19TRUxFQ1RPUiArICcgYXR0cmlidXRlLicpO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgZGVmaW5lKEh0bWwsICd3cmFwcGVyJywge1xuICAgIC8qKlxuICAgICAqIEdldHMgbm9kZSBvZiB0aGUgc2xpZGVzIHdyYXBwZXIuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAgICovXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gSHRtbC50cmFjay5jaGlsZHJlblswXTtcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBIdG1sO1xufVxuXG5mdW5jdGlvbiBQZWVrIChHbGlkZSwgQ29tcG9uZW50cywgRXZlbnRzKSB7XG4gIHZhciBQZWVrID0ge1xuICAgIC8qKlxuICAgICAqIFNldHVwcyBob3cgbXVjaCB0byBwZWVrIGJhc2VkIG9uIHNldHRpbmdzLlxuICAgICAqXG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICBtb3VudDogZnVuY3Rpb24gbW91bnQoKSB7XG4gICAgICB0aGlzLnZhbHVlID0gR2xpZGUuc2V0dGluZ3MucGVlaztcbiAgICB9XG4gIH07XG5cbiAgZGVmaW5lKFBlZWssICd2YWx1ZScsIHtcbiAgICAvKipcbiAgICAgKiBHZXRzIHZhbHVlIG9mIHRoZSBwZWVrLlxuICAgICAqXG4gICAgICogQHJldHVybnMge051bWJlcnxPYmplY3R9XG4gICAgICovXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gUGVlay5fdjtcbiAgICB9LFxuXG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHZhbHVlIG9mIHRoZSBwZWVrLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtOdW1iZXJ8T2JqZWN0fSB2YWx1ZVxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgc2V0OiBmdW5jdGlvbiBzZXQodmFsdWUpIHtcbiAgICAgIGlmIChpc09iamVjdCh2YWx1ZSkpIHtcbiAgICAgICAgdmFsdWUuYmVmb3JlID0gdG9JbnQodmFsdWUuYmVmb3JlKTtcbiAgICAgICAgdmFsdWUuYWZ0ZXIgPSB0b0ludCh2YWx1ZS5hZnRlcik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YWx1ZSA9IHRvSW50KHZhbHVlKTtcbiAgICAgIH1cblxuICAgICAgUGVlay5fdiA9IHZhbHVlO1xuICAgIH1cbiAgfSk7XG5cbiAgZGVmaW5lKFBlZWssICdyZWR1Y3RvcicsIHtcbiAgICAvKipcbiAgICAgKiBHZXRzIHJlZHVjdGlvbiB2YWx1ZSBjYXVzZWQgYnkgcGVlay5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtOdW1iZXJ9XG4gICAgICovXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICB2YXIgdmFsdWUgPSBQZWVrLnZhbHVlO1xuICAgICAgdmFyIHBlclZpZXcgPSBHbGlkZS5zZXR0aW5ncy5wZXJWaWV3O1xuXG4gICAgICBpZiAoaXNPYmplY3QodmFsdWUpKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZS5iZWZvcmUgLyBwZXJWaWV3ICsgdmFsdWUuYWZ0ZXIgLyBwZXJWaWV3O1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdmFsdWUgKiAyIC8gcGVyVmlldztcbiAgICB9XG4gIH0pO1xuXG4gIC8qKlxuICAgKiBSZWNhbGN1bGF0ZSBwZWVraW5nIHNpemVzIG9uOlxuICAgKiAtIHdoZW4gcmVzaXppbmcgd2luZG93IHRvIHVwZGF0ZSB0byBwcm9wZXIgcGVyY2VudHNcbiAgICovXG4gIEV2ZW50cy5vbihbJ3Jlc2l6ZScsICd1cGRhdGUnXSwgZnVuY3Rpb24gKCkge1xuICAgIFBlZWsubW91bnQoKTtcbiAgfSk7XG5cbiAgcmV0dXJuIFBlZWs7XG59XG5cbmZ1bmN0aW9uIE1vdmUgKEdsaWRlLCBDb21wb25lbnRzLCBFdmVudHMpIHtcbiAgdmFyIE1vdmUgPSB7XG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0cyBtb3ZlIGNvbXBvbmVudC5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtWb2lkfVxuICAgICAqL1xuICAgIG1vdW50OiBmdW5jdGlvbiBtb3VudCgpIHtcbiAgICAgIHRoaXMuX28gPSAwO1xuICAgIH0sXG5cblxuICAgIC8qKlxuICAgICAqIENhbGN1bGF0ZXMgYSBtb3ZlbWVudCB2YWx1ZSBiYXNlZCBvbiBwYXNzZWQgb2Zmc2V0IGFuZCBjdXJyZW50bHkgYWN0aXZlIGluZGV4LlxuICAgICAqXG4gICAgICogQHBhcmFtICB7TnVtYmVyfSBvZmZzZXRcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIG1ha2U6IGZ1bmN0aW9uIG1ha2UoKSB7XG4gICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgICB2YXIgb2Zmc2V0ID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiAwO1xuXG4gICAgICB0aGlzLm9mZnNldCA9IG9mZnNldDtcblxuICAgICAgRXZlbnRzLmVtaXQoJ21vdmUnLCB7XG4gICAgICAgIG1vdmVtZW50OiB0aGlzLnZhbHVlXG4gICAgICB9KTtcblxuICAgICAgQ29tcG9uZW50cy5UcmFuc2l0aW9uLmFmdGVyKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgRXZlbnRzLmVtaXQoJ21vdmUuYWZ0ZXInLCB7XG4gICAgICAgICAgbW92ZW1lbnQ6IF90aGlzLnZhbHVlXG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfVxuICB9O1xuXG4gIGRlZmluZShNb3ZlLCAnb2Zmc2V0Jywge1xuICAgIC8qKlxuICAgICAqIEdldHMgYW4gb2Zmc2V0IHZhbHVlIHVzZWQgdG8gbW9kaWZ5IGN1cnJlbnQgdHJhbnNsYXRlLlxuICAgICAqXG4gICAgICogQHJldHVybiB7T2JqZWN0fVxuICAgICAqL1xuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIE1vdmUuX287XG4gICAgfSxcblxuXG4gICAgLyoqXG4gICAgICogU2V0cyBhbiBvZmZzZXQgdmFsdWUgdXNlZCB0byBtb2RpZnkgY3VycmVudCB0cmFuc2xhdGUuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAgICovXG4gICAgc2V0OiBmdW5jdGlvbiBzZXQodmFsdWUpIHtcbiAgICAgIE1vdmUuX28gPSAhaXNVbmRlZmluZWQodmFsdWUpID8gdG9JbnQodmFsdWUpIDogMDtcbiAgICB9XG4gIH0pO1xuXG4gIGRlZmluZShNb3ZlLCAndHJhbnNsYXRlJywge1xuICAgIC8qKlxuICAgICAqIEdldHMgYSByYXcgbW92ZW1lbnQgdmFsdWUuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9XG4gICAgICovXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gQ29tcG9uZW50cy5TaXplcy5zbGlkZVdpZHRoICogR2xpZGUuaW5kZXg7XG4gICAgfVxuICB9KTtcblxuICBkZWZpbmUoTW92ZSwgJ3ZhbHVlJywge1xuICAgIC8qKlxuICAgICAqIEdldHMgYW4gYWN0dWFsIG1vdmVtZW50IHZhbHVlIGNvcnJlY3RlZCBieSBvZmZzZXQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9XG4gICAgICovXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICB2YXIgb2Zmc2V0ID0gdGhpcy5vZmZzZXQ7XG4gICAgICB2YXIgdHJhbnNsYXRlID0gdGhpcy50cmFuc2xhdGU7XG5cbiAgICAgIGlmIChDb21wb25lbnRzLkRpcmVjdGlvbi5pcygncnRsJykpIHtcbiAgICAgICAgcmV0dXJuIHRyYW5zbGF0ZSArIG9mZnNldDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRyYW5zbGF0ZSAtIG9mZnNldDtcbiAgICB9XG4gIH0pO1xuXG4gIC8qKlxuICAgKiBNYWtlIG1vdmVtZW50IHRvIHByb3BlciBzbGlkZSBvbjpcbiAgICogLSBiZWZvcmUgYnVpbGQsIHNvIGdsaWRlIHdpbGwgc3RhcnQgYXQgYHN0YXJ0QXRgIGluZGV4XG4gICAqIC0gb24gZWFjaCBzdGFuZGFyZCBydW4gdG8gbW92ZSB0byBuZXdseSBjYWxjdWxhdGVkIGluZGV4XG4gICAqL1xuICBFdmVudHMub24oWydidWlsZC5iZWZvcmUnLCAncnVuJ10sIGZ1bmN0aW9uICgpIHtcbiAgICBNb3ZlLm1ha2UoKTtcbiAgfSk7XG5cbiAgcmV0dXJuIE1vdmU7XG59XG5cbmZ1bmN0aW9uIFNpemVzIChHbGlkZSwgQ29tcG9uZW50cywgRXZlbnRzKSB7XG4gIHZhciBTaXplcyA9IHtcbiAgICAvKipcbiAgICAgKiBTZXR1cHMgZGltZW50aW9ucyBvZiBzbGlkZXMuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIHNldHVwU2xpZGVzOiBmdW5jdGlvbiBzZXR1cFNsaWRlcygpIHtcbiAgICAgIHZhciB3aWR0aCA9IHRoaXMuc2xpZGVXaWR0aCArICdweCc7XG4gICAgICB2YXIgc2xpZGVzID0gQ29tcG9uZW50cy5IdG1sLnNsaWRlcztcblxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzbGlkZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgc2xpZGVzW2ldLnN0eWxlLndpZHRoID0gd2lkdGg7XG4gICAgICB9XG4gICAgfSxcblxuXG4gICAgLyoqXG4gICAgICogU2V0dXBzIGRpbWVudGlvbnMgb2Ygc2xpZGVzIHdyYXBwZXIuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIHNldHVwV3JhcHBlcjogZnVuY3Rpb24gc2V0dXBXcmFwcGVyKGRpbWVudGlvbikge1xuICAgICAgQ29tcG9uZW50cy5IdG1sLndyYXBwZXIuc3R5bGUud2lkdGggPSB0aGlzLndyYXBwZXJTaXplICsgJ3B4JztcbiAgICB9LFxuXG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIGFwcGxpZWQgc3R5bGVzIGZyb20gSFRNTCBlbGVtZW50cy5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtWb2lkfVxuICAgICAqL1xuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgdmFyIHNsaWRlcyA9IENvbXBvbmVudHMuSHRtbC5zbGlkZXM7XG5cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2xpZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHNsaWRlc1tpXS5zdHlsZS53aWR0aCA9ICcnO1xuICAgICAgfVxuXG4gICAgICBDb21wb25lbnRzLkh0bWwud3JhcHBlci5zdHlsZS53aWR0aCA9ICcnO1xuICAgIH1cbiAgfTtcblxuICBkZWZpbmUoU2l6ZXMsICdsZW5ndGgnLCB7XG4gICAgLyoqXG4gICAgICogR2V0cyBjb3VudCBudW1iZXIgb2YgdGhlIHNsaWRlcy5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge051bWJlcn1cbiAgICAgKi9cbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiBDb21wb25lbnRzLkh0bWwuc2xpZGVzLmxlbmd0aDtcbiAgICB9XG4gIH0pO1xuXG4gIGRlZmluZShTaXplcywgJ3dpZHRoJywge1xuICAgIC8qKlxuICAgICAqIEdldHMgd2lkdGggdmFsdWUgb2YgdGhlIGdsaWRlLlxuICAgICAqXG4gICAgICogQHJldHVybiB7TnVtYmVyfVxuICAgICAqL1xuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIENvbXBvbmVudHMuSHRtbC5yb290Lm9mZnNldFdpZHRoO1xuICAgIH1cbiAgfSk7XG5cbiAgZGVmaW5lKFNpemVzLCAnd3JhcHBlclNpemUnLCB7XG4gICAgLyoqXG4gICAgICogR2V0cyBzaXplIG9mIHRoZSBzbGlkZXMgd3JhcHBlci5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge051bWJlcn1cbiAgICAgKi9cbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiBTaXplcy5zbGlkZVdpZHRoICogU2l6ZXMubGVuZ3RoICsgQ29tcG9uZW50cy5HYXBzLmdyb3cgKyBDb21wb25lbnRzLkNsb25lcy5ncm93O1xuICAgIH1cbiAgfSk7XG5cbiAgZGVmaW5lKFNpemVzLCAnc2xpZGVXaWR0aCcsIHtcbiAgICAvKipcbiAgICAgKiBHZXRzIHdpZHRoIHZhbHVlIG9mIHRoZSBzaW5nbGUgc2xpZGUuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9XG4gICAgICovXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gU2l6ZXMud2lkdGggLyBHbGlkZS5zZXR0aW5ncy5wZXJWaWV3IC0gQ29tcG9uZW50cy5QZWVrLnJlZHVjdG9yIC0gQ29tcG9uZW50cy5HYXBzLnJlZHVjdG9yO1xuICAgIH1cbiAgfSk7XG5cbiAgLyoqXG4gICAqIEFwcGx5IGNhbGN1bGF0ZWQgZ2xpZGUncyBkaW1lbnNpb25zOlxuICAgKiAtIGJlZm9yZSBidWlsZGluZywgc28gb3RoZXIgZGltZW50aW9ucyAoZS5nLiB0cmFuc2xhdGUpIHdpbGwgYmUgY2FsY3VsYXRlZCBwcm9wZXJ0bHlcbiAgICogLSB3aGVuIHJlc2l6aW5nIHdpbmRvdyB0byByZWNhbGN1bGF0ZSBzaWxkZXMgZGltZW5zaW9uc1xuICAgKiAtIG9uIHVwZGF0aW5nIHZpYSBBUEksIHRvIGNhbGN1bGF0ZSBkaW1lbnNpb25zIGJhc2VkIG9uIG5ldyBvcHRpb25zXG4gICAqL1xuICBFdmVudHMub24oWydidWlsZC5iZWZvcmUnLCAncmVzaXplJywgJ3VwZGF0ZSddLCBmdW5jdGlvbiAoKSB7XG4gICAgU2l6ZXMuc2V0dXBTbGlkZXMoKTtcbiAgICBTaXplcy5zZXR1cFdyYXBwZXIoKTtcbiAgfSk7XG5cbiAgLyoqXG4gICAqIFJlbW92ZSBjYWxjdWxhdGVkIGdsaWRlJ3MgZGltZW5zaW9uczpcbiAgICogLSBvbiBkZXN0b3RpbmcgdG8gYnJpbmcgbWFya3VwIHRvIGl0cyBpbml0YWwgc3RhdGVcbiAgICovXG4gIEV2ZW50cy5vbignZGVzdHJveScsIGZ1bmN0aW9uICgpIHtcbiAgICBTaXplcy5yZW1vdmUoKTtcbiAgfSk7XG5cbiAgcmV0dXJuIFNpemVzO1xufVxuXG5mdW5jdGlvbiBCdWlsZCAoR2xpZGUsIENvbXBvbmVudHMsIEV2ZW50cykge1xuICB2YXIgQnVpbGQgPSB7XG4gICAgLyoqXG4gICAgICogSW5pdCBnbGlkZSBidWlsZGluZy4gQWRkcyBjbGFzc2VzLCBzZXRzXG4gICAgICogZGltZW5zaW9ucyBhbmQgc2V0dXBzIGluaXRpYWwgc3RhdGUuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIG1vdW50OiBmdW5jdGlvbiBtb3VudCgpIHtcbiAgICAgIEV2ZW50cy5lbWl0KCdidWlsZC5iZWZvcmUnKTtcblxuICAgICAgdGhpcy50eXBlQ2xhc3MoKTtcbiAgICAgIHRoaXMuYWN0aXZlQ2xhc3MoKTtcblxuICAgICAgRXZlbnRzLmVtaXQoJ2J1aWxkLmFmdGVyJyk7XG4gICAgfSxcblxuXG4gICAgLyoqXG4gICAgICogQWRkcyBgdHlwZWAgY2xhc3MgdG8gdGhlIGdsaWRlIGVsZW1lbnQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIHR5cGVDbGFzczogZnVuY3Rpb24gdHlwZUNsYXNzKCkge1xuICAgICAgQ29tcG9uZW50cy5IdG1sLnJvb3QuY2xhc3NMaXN0LmFkZChHbGlkZS5zZXR0aW5ncy5jbGFzc2VzW0dsaWRlLnNldHRpbmdzLnR5cGVdKTtcbiAgICB9LFxuXG5cbiAgICAvKipcbiAgICAgKiBTZXRzIGFjdGl2ZSBjbGFzcyB0byBjdXJyZW50IHNsaWRlLlxuICAgICAqXG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICBhY3RpdmVDbGFzczogZnVuY3Rpb24gYWN0aXZlQ2xhc3MoKSB7XG4gICAgICB2YXIgY2xhc3NlcyA9IEdsaWRlLnNldHRpbmdzLmNsYXNzZXM7XG4gICAgICB2YXIgc2xpZGUgPSBDb21wb25lbnRzLkh0bWwuc2xpZGVzW0dsaWRlLmluZGV4XTtcblxuICAgICAgaWYgKHNsaWRlKSB7XG4gICAgICAgIHNsaWRlLmNsYXNzTGlzdC5hZGQoY2xhc3Nlcy5hY3RpdmVTbGlkZSk7XG5cbiAgICAgICAgc2libGluZ3Moc2xpZGUpLmZvckVhY2goZnVuY3Rpb24gKHNpYmxpbmcpIHtcbiAgICAgICAgICBzaWJsaW5nLmNsYXNzTGlzdC5yZW1vdmUoY2xhc3Nlcy5hY3RpdmVTbGlkZSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0sXG5cblxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgSFRNTCBjbGFzc2VzIGFwcGxpZWQgYXQgYnVpbGRpbmcuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIHJlbW92ZUNsYXNzZXM6IGZ1bmN0aW9uIHJlbW92ZUNsYXNzZXMoKSB7XG4gICAgICB2YXIgY2xhc3NlcyA9IEdsaWRlLnNldHRpbmdzLmNsYXNzZXM7XG5cbiAgICAgIENvbXBvbmVudHMuSHRtbC5yb290LmNsYXNzTGlzdC5yZW1vdmUoY2xhc3Nlc1tHbGlkZS5zZXR0aW5ncy50eXBlXSk7XG5cbiAgICAgIENvbXBvbmVudHMuSHRtbC5zbGlkZXMuZm9yRWFjaChmdW5jdGlvbiAoc2libGluZykge1xuICAgICAgICBzaWJsaW5nLmNsYXNzTGlzdC5yZW1vdmUoY2xhc3Nlcy5hY3RpdmVTbGlkZSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIENsZWFyIGJ1aWxkaW5nIGNsYXNzZXM6XG4gICAqIC0gb24gZGVzdHJveWluZyB0byBicmluZyBIVE1MIHRvIGl0cyBpbml0aWFsIHN0YXRlXG4gICAqIC0gb24gdXBkYXRpbmcgdG8gcmVtb3ZlIGNsYXNzZXMgYmVmb3JlIHJlbW91bnRpbmcgY29tcG9uZW50XG4gICAqL1xuICBFdmVudHMub24oWydkZXN0cm95JywgJ3VwZGF0ZSddLCBmdW5jdGlvbiAoKSB7XG4gICAgQnVpbGQucmVtb3ZlQ2xhc3NlcygpO1xuICB9KTtcblxuICAvKipcbiAgICogUmVtb3VudCBjb21wb25lbnQ6XG4gICAqIC0gb24gcmVzaXppbmcgb2YgdGhlIHdpbmRvdyB0byBjYWxjdWxhdGUgbmV3IGRpbWVudGlvbnNcbiAgICogLSBvbiB1cGRhdGluZyBzZXR0aW5ncyB2aWEgQVBJXG4gICAqL1xuICBFdmVudHMub24oWydyZXNpemUnLCAndXBkYXRlJ10sIGZ1bmN0aW9uICgpIHtcbiAgICBCdWlsZC5tb3VudCgpO1xuICB9KTtcblxuICAvKipcbiAgICogU3dhcCBhY3RpdmUgY2xhc3Mgb2YgY3VycmVudCBzbGlkZTpcbiAgICogLSBhZnRlciBlYWNoIG1vdmUgdG8gdGhlIG5ldyBpbmRleFxuICAgKi9cbiAgRXZlbnRzLm9uKCdtb3ZlLmFmdGVyJywgZnVuY3Rpb24gKCkge1xuICAgIEJ1aWxkLmFjdGl2ZUNsYXNzKCk7XG4gIH0pO1xuXG4gIHJldHVybiBCdWlsZDtcbn1cblxuZnVuY3Rpb24gQ2xvbmVzIChHbGlkZSwgQ29tcG9uZW50cywgRXZlbnRzKSB7XG4gIHZhciBDbG9uZXMgPSB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlIHBhdHRlcm4gbWFwIGFuZCBjb2xsZWN0IHNsaWRlcyB0byBiZSBjbG9uZWQuXG4gICAgICovXG4gICAgbW91bnQ6IGZ1bmN0aW9uIG1vdW50KCkge1xuICAgICAgdGhpcy5pdGVtcyA9IFtdO1xuXG4gICAgICBpZiAoR2xpZGUuaXNUeXBlKCdjYXJvdXNlbCcpKSB7XG4gICAgICAgIHRoaXMuaXRlbXMgPSB0aGlzLmNvbGxlY3QoKTtcbiAgICAgIH1cbiAgICB9LFxuXG5cbiAgICAvKipcbiAgICAgKiBDb2xsZWN0IGNsb25lcyB3aXRoIHBhdHRlcm4uXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIGNvbGxlY3Q6IGZ1bmN0aW9uIGNvbGxlY3QoKSB7XG4gICAgICB2YXIgaXRlbXMgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IFtdO1xuICAgICAgdmFyIHNsaWRlcyA9IENvbXBvbmVudHMuSHRtbC5zbGlkZXM7XG4gICAgICB2YXIgX0dsaWRlJHNldHRpbmdzID0gR2xpZGUuc2V0dGluZ3MsXG4gICAgICAgICAgcGVyVmlldyA9IF9HbGlkZSRzZXR0aW5ncy5wZXJWaWV3LFxuICAgICAgICAgIGNsYXNzZXMgPSBfR2xpZGUkc2V0dGluZ3MuY2xhc3NlcztcblxuXG4gICAgICB2YXIgcGVla0luY3JlbWVudGVyID0gKyEhR2xpZGUuc2V0dGluZ3MucGVlaztcbiAgICAgIHZhciBwYXJ0ID0gcGVyVmlldyArIHBlZWtJbmNyZW1lbnRlcjtcbiAgICAgIHZhciBzdGFydCA9IHNsaWRlcy5zbGljZSgwLCBwYXJ0KTtcbiAgICAgIHZhciBlbmQgPSBzbGlkZXMuc2xpY2UoLXBhcnQpO1xuXG4gICAgICBmb3IgKHZhciByID0gMDsgciA8IE1hdGgubWF4KDEsIE1hdGguZmxvb3IocGVyVmlldyAvIHNsaWRlcy5sZW5ndGgpKTsgcisrKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3RhcnQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICB2YXIgY2xvbmUgPSBzdGFydFtpXS5jbG9uZU5vZGUodHJ1ZSk7XG5cbiAgICAgICAgICBjbG9uZS5jbGFzc0xpc3QuYWRkKGNsYXNzZXMuY2xvbmVTbGlkZSk7XG5cbiAgICAgICAgICBpdGVtcy5wdXNoKGNsb25lKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBlbmQubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgdmFyIF9jbG9uZSA9IGVuZFtfaV0uY2xvbmVOb2RlKHRydWUpO1xuXG4gICAgICAgICAgX2Nsb25lLmNsYXNzTGlzdC5hZGQoY2xhc3Nlcy5jbG9uZVNsaWRlKTtcblxuICAgICAgICAgIGl0ZW1zLnVuc2hpZnQoX2Nsb25lKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gaXRlbXM7XG4gICAgfSxcblxuXG4gICAgLyoqXG4gICAgICogQXBwZW5kIGNsb25lZCBzbGlkZXMgd2l0aCBnZW5lcmF0ZWQgcGF0dGVybi5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgYXBwZW5kOiBmdW5jdGlvbiBhcHBlbmQoKSB7XG4gICAgICB2YXIgaXRlbXMgPSB0aGlzLml0ZW1zO1xuICAgICAgdmFyIF9Db21wb25lbnRzJEh0bWwgPSBDb21wb25lbnRzLkh0bWwsXG4gICAgICAgICAgd3JhcHBlciA9IF9Db21wb25lbnRzJEh0bWwud3JhcHBlcixcbiAgICAgICAgICBzbGlkZXMgPSBfQ29tcG9uZW50cyRIdG1sLnNsaWRlcztcblxuXG4gICAgICB2YXIgaGFsZiA9IE1hdGguZmxvb3IoaXRlbXMubGVuZ3RoIC8gMik7XG4gICAgICB2YXIgcHJlcGVuZCA9IGl0ZW1zLnNsaWNlKDAsIGhhbGYpLnJldmVyc2UoKTtcbiAgICAgIHZhciBhcHBlbmQgPSBpdGVtcy5zbGljZShoYWxmLCBpdGVtcy5sZW5ndGgpO1xuICAgICAgdmFyIHdpZHRoID0gQ29tcG9uZW50cy5TaXplcy5zbGlkZVdpZHRoICsgJ3B4JztcblxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcHBlbmQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgd3JhcHBlci5hcHBlbmRDaGlsZChhcHBlbmRbaV0pO1xuICAgICAgfVxuXG4gICAgICBmb3IgKHZhciBfaTIgPSAwOyBfaTIgPCBwcmVwZW5kLmxlbmd0aDsgX2kyKyspIHtcbiAgICAgICAgd3JhcHBlci5pbnNlcnRCZWZvcmUocHJlcGVuZFtfaTJdLCBzbGlkZXNbMF0pO1xuICAgICAgfVxuXG4gICAgICBmb3IgKHZhciBfaTMgPSAwOyBfaTMgPCBpdGVtcy5sZW5ndGg7IF9pMysrKSB7XG4gICAgICAgIGl0ZW1zW19pM10uc3R5bGUud2lkdGggPSB3aWR0aDtcbiAgICAgIH1cbiAgICB9LFxuXG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmUgYWxsIGNsb25lZCBzbGlkZXMuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgdmFyIGl0ZW1zID0gdGhpcy5pdGVtcztcblxuXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGl0ZW1zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIENvbXBvbmVudHMuSHRtbC53cmFwcGVyLnJlbW92ZUNoaWxkKGl0ZW1zW2ldKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgZGVmaW5lKENsb25lcywgJ2dyb3cnLCB7XG4gICAgLyoqXG4gICAgICogR2V0cyBhZGRpdGlvbmFsIGRpbWVudGlvbnMgdmFsdWUgY2F1c2VkIGJ5IGNsb25lcy5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge051bWJlcn1cbiAgICAgKi9cbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiAoQ29tcG9uZW50cy5TaXplcy5zbGlkZVdpZHRoICsgQ29tcG9uZW50cy5HYXBzLnZhbHVlKSAqIENsb25lcy5pdGVtcy5sZW5ndGg7XG4gICAgfVxuICB9KTtcblxuICAvKipcbiAgICogQXBwZW5kIGFkZGl0aW9uYWwgc2xpZGUncyBjbG9uZXM6XG4gICAqIC0gd2hpbGUgZ2xpZGUncyB0eXBlIGlzIGBjYXJvdXNlbGBcbiAgICovXG4gIEV2ZW50cy5vbigndXBkYXRlJywgZnVuY3Rpb24gKCkge1xuICAgIENsb25lcy5yZW1vdmUoKTtcbiAgICBDbG9uZXMubW91bnQoKTtcbiAgICBDbG9uZXMuYXBwZW5kKCk7XG4gIH0pO1xuXG4gIC8qKlxuICAgKiBBcHBlbmQgYWRkaXRpb25hbCBzbGlkZSdzIGNsb25lczpcbiAgICogLSB3aGlsZSBnbGlkZSdzIHR5cGUgaXMgYGNhcm91c2VsYFxuICAgKi9cbiAgRXZlbnRzLm9uKCdidWlsZC5iZWZvcmUnLCBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKEdsaWRlLmlzVHlwZSgnY2Fyb3VzZWwnKSkge1xuICAgICAgQ2xvbmVzLmFwcGVuZCgpO1xuICAgIH1cbiAgfSk7XG5cbiAgLyoqXG4gICAqIFJlbW92ZSBjbG9uZXMgSFRNTEVsZW1lbnRzOlxuICAgKiAtIG9uIGRlc3Ryb3lpbmcsIHRvIGJyaW5nIEhUTUwgdG8gaXRzIGluaXRpYWwgc3RhdGVcbiAgICovXG4gIEV2ZW50cy5vbignZGVzdHJveScsIGZ1bmN0aW9uICgpIHtcbiAgICBDbG9uZXMucmVtb3ZlKCk7XG4gIH0pO1xuXG4gIHJldHVybiBDbG9uZXM7XG59XG5cbnZhciBFdmVudHNCaW5kZXIgPSBmdW5jdGlvbiAoKSB7XG4gIC8qKlxuICAgKiBDb25zdHJ1Y3QgYSBFdmVudHNCaW5kZXIgaW5zdGFuY2UuXG4gICAqL1xuICBmdW5jdGlvbiBFdmVudHNCaW5kZXIoKSB7XG4gICAgdmFyIGxpc3RlbmVycyA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDoge307XG4gICAgY2xhc3NDYWxsQ2hlY2sodGhpcywgRXZlbnRzQmluZGVyKTtcblxuICAgIHRoaXMubGlzdGVuZXJzID0gbGlzdGVuZXJzO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgZXZlbnRzIGxpc3RlbmVycyB0byBhcnJvd3MgSFRNTCBlbGVtZW50cy5cbiAgICpcbiAgICogQHBhcmFtICB7U3RyaW5nfEFycmF5fSBldmVudHNcbiAgICogQHBhcmFtICB7RWxlbWVudHxXaW5kb3d8RG9jdW1lbnR9IGVsXG4gICAqIEBwYXJhbSAge0Z1bmN0aW9ufSBjbG9zdXJlXG4gICAqIEBwYXJhbSAge0Jvb2xlYW58T2JqZWN0fSBjYXB0dXJlXG4gICAqIEByZXR1cm4ge1ZvaWR9XG4gICAqL1xuXG5cbiAgY3JlYXRlQ2xhc3MoRXZlbnRzQmluZGVyLCBbe1xuICAgIGtleTogJ29uJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gb24oZXZlbnRzLCBlbCwgY2xvc3VyZSkge1xuICAgICAgdmFyIGNhcHR1cmUgPSBhcmd1bWVudHMubGVuZ3RoID4gMyAmJiBhcmd1bWVudHNbM10gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1szXSA6IGZhbHNlO1xuXG4gICAgICBpZiAoaXNTdHJpbmcoZXZlbnRzKSkge1xuICAgICAgICBldmVudHMgPSBbZXZlbnRzXTtcbiAgICAgIH1cblxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBldmVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdGhpcy5saXN0ZW5lcnNbZXZlbnRzW2ldXSA9IGNsb3N1cmU7XG5cbiAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcihldmVudHNbaV0sIHRoaXMubGlzdGVuZXJzW2V2ZW50c1tpXV0sIGNhcHR1cmUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgZXZlbnQgbGlzdGVuZXJzIGZyb20gYXJyb3dzIEhUTUwgZWxlbWVudHMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd8QXJyYXl9IGV2ZW50c1xuICAgICAqIEBwYXJhbSAge0VsZW1lbnR8V2luZG93fERvY3VtZW50fSBlbFxuICAgICAqIEBwYXJhbSAge0Jvb2xlYW58T2JqZWN0fSBjYXB0dXJlXG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnb2ZmJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gb2ZmKGV2ZW50cywgZWwpIHtcbiAgICAgIHZhciBjYXB0dXJlID0gYXJndW1lbnRzLmxlbmd0aCA+IDIgJiYgYXJndW1lbnRzWzJdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMl0gOiBmYWxzZTtcblxuICAgICAgaWYgKGlzU3RyaW5nKGV2ZW50cykpIHtcbiAgICAgICAgZXZlbnRzID0gW2V2ZW50c107XG4gICAgICB9XG5cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZXZlbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnRzW2ldLCB0aGlzLmxpc3RlbmVyc1tldmVudHNbaV1dLCBjYXB0dXJlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEZXN0cm95IGNvbGxlY3RlZCBsaXN0ZW5lcnMuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7Vm9pZH1cbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnZGVzdHJveScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGRlc3Ryb3koKSB7XG4gICAgICBkZWxldGUgdGhpcy5saXN0ZW5lcnM7XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBFdmVudHNCaW5kZXI7XG59KCk7XG5cbmZ1bmN0aW9uIFJlc2l6ZSAoR2xpZGUsIENvbXBvbmVudHMsIEV2ZW50cykge1xuICAvKipcbiAgICogSW5zdGFuY2Ugb2YgdGhlIGJpbmRlciBmb3IgRE9NIEV2ZW50cy5cbiAgICpcbiAgICogQHR5cGUge0V2ZW50c0JpbmRlcn1cbiAgICovXG4gIHZhciBCaW5kZXIgPSBuZXcgRXZlbnRzQmluZGVyKCk7XG5cbiAgdmFyIFJlc2l6ZSA9IHtcbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXplcyB3aW5kb3cgYmluZGluZ3MuXG4gICAgICovXG4gICAgbW91bnQ6IGZ1bmN0aW9uIG1vdW50KCkge1xuICAgICAgdGhpcy5iaW5kKCk7XG4gICAgfSxcblxuXG4gICAgLyoqXG4gICAgICogQmluZHMgYHJlenNpemVgIGxpc3RlbmVyIHRvIHRoZSB3aW5kb3cuXG4gICAgICogSXQncyBhIGNvc3RseSBldmVudCwgc28gd2UgYXJlIGRlYm91bmNpbmcgaXQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIGJpbmQ6IGZ1bmN0aW9uIGJpbmQoKSB7XG4gICAgICBCaW5kZXIub24oJ3Jlc2l6ZScsIHdpbmRvdywgdGhyb3R0bGUoZnVuY3Rpb24gKCkge1xuICAgICAgICBFdmVudHMuZW1pdCgncmVzaXplJyk7XG4gICAgICB9LCBHbGlkZS5zZXR0aW5ncy50aHJvdHRsZSkpO1xuICAgIH0sXG5cblxuICAgIC8qKlxuICAgICAqIFVuYmluZHMgbGlzdGVuZXJzIGZyb20gdGhlIHdpbmRvdy5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgdW5iaW5kOiBmdW5jdGlvbiB1bmJpbmQoKSB7XG4gICAgICBCaW5kZXIub2ZmKCdyZXNpemUnLCB3aW5kb3cpO1xuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogUmVtb3ZlIGJpbmRpbmdzIGZyb20gd2luZG93OlxuICAgKiAtIG9uIGRlc3Ryb3lpbmcsIHRvIHJlbW92ZSBhZGRlZCBFdmVudExpc3RlbmVyXG4gICAqL1xuICBFdmVudHMub24oJ2Rlc3Ryb3knLCBmdW5jdGlvbiAoKSB7XG4gICAgUmVzaXplLnVuYmluZCgpO1xuICAgIEJpbmRlci5kZXN0cm95KCk7XG4gIH0pO1xuXG4gIHJldHVybiBSZXNpemU7XG59XG5cbnZhciBWQUxJRF9ESVJFQ1RJT05TID0gWydsdHInLCAncnRsJ107XG52YXIgRkxJUEVEX01PVkVNRU5UUyA9IHtcbiAgJz4nOiAnPCcsXG4gICc8JzogJz4nLFxuICAnPSc6ICc9J1xufTtcblxuZnVuY3Rpb24gRGlyZWN0aW9uIChHbGlkZSwgQ29tcG9uZW50cywgRXZlbnRzKSB7XG4gIHZhciBEaXJlY3Rpb24gPSB7XG4gICAgLyoqXG4gICAgICogU2V0dXBzIGdhcCB2YWx1ZSBiYXNlZCBvbiBzZXR0aW5ncy5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgbW91bnQ6IGZ1bmN0aW9uIG1vdW50KCkge1xuICAgICAgdGhpcy52YWx1ZSA9IEdsaWRlLnNldHRpbmdzLmRpcmVjdGlvbjtcbiAgICB9LFxuXG5cbiAgICAvKipcbiAgICAgKiBSZXNvbHZlcyBwYXR0ZXJuIGJhc2VkIG9uIGRpcmVjdGlvbiB2YWx1ZVxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHBhdHRlcm5cbiAgICAgKiBAcmV0dXJucyB7U3RyaW5nfVxuICAgICAqL1xuICAgIHJlc29sdmU6IGZ1bmN0aW9uIHJlc29sdmUocGF0dGVybikge1xuICAgICAgdmFyIHRva2VuID0gcGF0dGVybi5zbGljZSgwLCAxKTtcblxuICAgICAgaWYgKHRoaXMuaXMoJ3J0bCcpKSB7XG4gICAgICAgIHJldHVybiBwYXR0ZXJuLnNwbGl0KHRva2VuKS5qb2luKEZMSVBFRF9NT1ZFTUVOVFNbdG9rZW5dKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHBhdHRlcm47XG4gICAgfSxcblxuXG4gICAgLyoqXG4gICAgICogQ2hlY2tzIHZhbHVlIG9mIGRpcmVjdGlvbiBtb2RlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGRpcmVjdGlvblxuICAgICAqIEByZXR1cm5zIHtCb29sZWFufVxuICAgICAqL1xuICAgIGlzOiBmdW5jdGlvbiBpcyhkaXJlY3Rpb24pIHtcbiAgICAgIHJldHVybiB0aGlzLnZhbHVlID09PSBkaXJlY3Rpb247XG4gICAgfSxcblxuXG4gICAgLyoqXG4gICAgICogQXBwbGllcyBkaXJlY3Rpb24gY2xhc3MgdG8gdGhlIHJvb3QgSFRNTCBlbGVtZW50LlxuICAgICAqXG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICBhZGRDbGFzczogZnVuY3Rpb24gYWRkQ2xhc3MoKSB7XG4gICAgICBDb21wb25lbnRzLkh0bWwucm9vdC5jbGFzc0xpc3QuYWRkKEdsaWRlLnNldHRpbmdzLmNsYXNzZXMuZGlyZWN0aW9uW3RoaXMudmFsdWVdKTtcbiAgICB9LFxuXG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIGRpcmVjdGlvbiBjbGFzcyBmcm9tIHRoZSByb290IEhUTUwgZWxlbWVudC5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgcmVtb3ZlQ2xhc3M6IGZ1bmN0aW9uIHJlbW92ZUNsYXNzKCkge1xuICAgICAgQ29tcG9uZW50cy5IdG1sLnJvb3QuY2xhc3NMaXN0LnJlbW92ZShHbGlkZS5zZXR0aW5ncy5jbGFzc2VzLmRpcmVjdGlvblt0aGlzLnZhbHVlXSk7XG4gICAgfVxuICB9O1xuXG4gIGRlZmluZShEaXJlY3Rpb24sICd2YWx1ZScsIHtcbiAgICAvKipcbiAgICAgKiBHZXRzIHZhbHVlIG9mIHRoZSBkaXJlY3Rpb24uXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7TnVtYmVyfVxuICAgICAqL1xuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIERpcmVjdGlvbi5fdjtcbiAgICB9LFxuXG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHZhbHVlIG9mIHRoZSBkaXJlY3Rpb24uXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdmFsdWVcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIHNldDogZnVuY3Rpb24gc2V0KHZhbHVlKSB7XG4gICAgICBpZiAoVkFMSURfRElSRUNUSU9OUy5pbmRleE9mKHZhbHVlKSA+IC0xKSB7XG4gICAgICAgIERpcmVjdGlvbi5fdiA9IHZhbHVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgd2FybignRGlyZWN0aW9uIHZhbHVlIG11c3QgYmUgYGx0cmAgb3IgYHJ0bGAnKTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gIC8qKlxuICAgKiBDbGVhciBkaXJlY3Rpb24gY2xhc3M6XG4gICAqIC0gb24gZGVzdHJveSB0byBicmluZyBIVE1MIHRvIGl0cyBpbml0aWFsIHN0YXRlXG4gICAqIC0gb24gdXBkYXRlIHRvIHJlbW92ZSBjbGFzcyBiZWZvcmUgcmVhcHBsaW5nIGJlbGxvd1xuICAgKi9cbiAgRXZlbnRzLm9uKFsnZGVzdHJveScsICd1cGRhdGUnXSwgZnVuY3Rpb24gKCkge1xuICAgIERpcmVjdGlvbi5yZW1vdmVDbGFzcygpO1xuICB9KTtcblxuICAvKipcbiAgICogUmVtb3VudCBjb21wb25lbnQ6XG4gICAqIC0gb24gdXBkYXRlIHRvIHJlZmxlY3QgY2hhbmdlcyBpbiBkaXJlY3Rpb24gdmFsdWVcbiAgICovXG4gIEV2ZW50cy5vbigndXBkYXRlJywgZnVuY3Rpb24gKCkge1xuICAgIERpcmVjdGlvbi5tb3VudCgpO1xuICB9KTtcblxuICAvKipcbiAgICogQXBwbHkgZGlyZWN0aW9uIGNsYXNzOlxuICAgKiAtIGJlZm9yZSBidWlsZGluZyB0byBhcHBseSBjbGFzcyBmb3IgdGhlIGZpcnN0IHRpbWVcbiAgICogLSBvbiB1cGRhdGluZyB0byByZWFwcGx5IGRpcmVjdGlvbiBjbGFzcyB0aGF0IG1heSBjaGFuZ2VkXG4gICAqL1xuICBFdmVudHMub24oWydidWlsZC5iZWZvcmUnLCAndXBkYXRlJ10sIGZ1bmN0aW9uICgpIHtcbiAgICBEaXJlY3Rpb24uYWRkQ2xhc3MoKTtcbiAgfSk7XG5cbiAgcmV0dXJuIERpcmVjdGlvbjtcbn1cblxuLyoqXG4gKiBSZWZsZWN0cyB2YWx1ZSBvZiBnbGlkZSBtb3ZlbWVudC5cbiAqXG4gKiBAcGFyYW0gIHtPYmplY3R9IEdsaWRlXG4gKiBAcGFyYW0gIHtPYmplY3R9IENvbXBvbmVudHNcbiAqIEByZXR1cm4ge09iamVjdH1cbiAqL1xuZnVuY3Rpb24gUnRsIChHbGlkZSwgQ29tcG9uZW50cykge1xuICByZXR1cm4ge1xuICAgIC8qKlxuICAgICAqIE5lZ2F0ZXMgdGhlIHBhc3NlZCB0cmFuc2xhdGUgaWYgZ2xpZGUgaXMgaW4gUlRMIG9wdGlvbi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAge051bWJlcn0gdHJhbnNsYXRlXG4gICAgICogQHJldHVybiB7TnVtYmVyfVxuICAgICAqL1xuICAgIG1vZGlmeTogZnVuY3Rpb24gbW9kaWZ5KHRyYW5zbGF0ZSkge1xuICAgICAgaWYgKENvbXBvbmVudHMuRGlyZWN0aW9uLmlzKCdydGwnKSkge1xuICAgICAgICByZXR1cm4gLXRyYW5zbGF0ZTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRyYW5zbGF0ZTtcbiAgICB9XG4gIH07XG59XG5cbi8qKlxuICogVXBkYXRlcyBnbGlkZSBtb3ZlbWVudCB3aXRoIGEgYGdhcGAgc2V0dGluZ3MuXG4gKlxuICogQHBhcmFtICB7T2JqZWN0fSBHbGlkZVxuICogQHBhcmFtICB7T2JqZWN0fSBDb21wb25lbnRzXG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKi9cbmZ1bmN0aW9uIEdhcCAoR2xpZGUsIENvbXBvbmVudHMpIHtcbiAgcmV0dXJuIHtcbiAgICAvKipcbiAgICAgKiBNb2RpZmllcyBwYXNzZWQgdHJhbnNsYXRlIHZhbHVlIHdpdGggbnVtYmVyIGluIHRoZSBgZ2FwYCBzZXR0aW5ncy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAge051bWJlcn0gdHJhbnNsYXRlXG4gICAgICogQHJldHVybiB7TnVtYmVyfVxuICAgICAqL1xuICAgIG1vZGlmeTogZnVuY3Rpb24gbW9kaWZ5KHRyYW5zbGF0ZSkge1xuICAgICAgcmV0dXJuIHRyYW5zbGF0ZSArIENvbXBvbmVudHMuR2Fwcy52YWx1ZSAqIEdsaWRlLmluZGV4O1xuICAgIH1cbiAgfTtcbn1cblxuLyoqXG4gKiBVcGRhdGVzIGdsaWRlIG1vdmVtZW50IHdpdGggd2lkdGggb2YgYWRkaXRpb25hbCBjbG9uZXMgd2lkdGguXG4gKlxuICogQHBhcmFtICB7T2JqZWN0fSBHbGlkZVxuICogQHBhcmFtICB7T2JqZWN0fSBDb21wb25lbnRzXG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKi9cbmZ1bmN0aW9uIEdyb3cgKEdsaWRlLCBDb21wb25lbnRzKSB7XG4gIHJldHVybiB7XG4gICAgLyoqXG4gICAgICogQWRkcyB0byB0aGUgcGFzc2VkIHRyYW5zbGF0ZSB3aWR0aCBvZiB0aGUgaGFsZiBvZiBjbG9uZXMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtOdW1iZXJ9IHRyYW5zbGF0ZVxuICAgICAqIEByZXR1cm4ge051bWJlcn1cbiAgICAgKi9cbiAgICBtb2RpZnk6IGZ1bmN0aW9uIG1vZGlmeSh0cmFuc2xhdGUpIHtcbiAgICAgIHJldHVybiB0cmFuc2xhdGUgKyBDb21wb25lbnRzLkNsb25lcy5ncm93IC8gMjtcbiAgICB9XG4gIH07XG59XG5cbi8qKlxuICogVXBkYXRlcyBnbGlkZSBtb3ZlbWVudCB3aXRoIGEgYHBlZWtgIHNldHRpbmdzLlxuICpcbiAqIEBwYXJhbSAge09iamVjdH0gR2xpZGVcbiAqIEBwYXJhbSAge09iamVjdH0gQ29tcG9uZW50c1xuICogQHJldHVybiB7T2JqZWN0fVxuICovXG5mdW5jdGlvbiBQZWVraW5nIChHbGlkZSwgQ29tcG9uZW50cykge1xuICByZXR1cm4ge1xuICAgIC8qKlxuICAgICAqIE1vZGlmaWVzIHBhc3NlZCB0cmFuc2xhdGUgdmFsdWUgd2l0aCBhIGBwZWVrYCBzZXR0aW5nLlxuICAgICAqXG4gICAgICogQHBhcmFtICB7TnVtYmVyfSB0cmFuc2xhdGVcbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9XG4gICAgICovXG4gICAgbW9kaWZ5OiBmdW5jdGlvbiBtb2RpZnkodHJhbnNsYXRlKSB7XG4gICAgICBpZiAoR2xpZGUuc2V0dGluZ3MuZm9jdXNBdCA+PSAwKSB7XG4gICAgICAgIHZhciBwZWVrID0gQ29tcG9uZW50cy5QZWVrLnZhbHVlO1xuXG4gICAgICAgIGlmIChpc09iamVjdChwZWVrKSkge1xuICAgICAgICAgIHJldHVybiB0cmFuc2xhdGUgLSBwZWVrLmJlZm9yZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0cmFuc2xhdGUgLSBwZWVrO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdHJhbnNsYXRlO1xuICAgIH1cbiAgfTtcbn1cblxuLyoqXG4gKiBVcGRhdGVzIGdsaWRlIG1vdmVtZW50IHdpdGggYSBgZm9jdXNBdGAgc2V0dGluZ3MuXG4gKlxuICogQHBhcmFtICB7T2JqZWN0fSBHbGlkZVxuICogQHBhcmFtICB7T2JqZWN0fSBDb21wb25lbnRzXG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKi9cbmZ1bmN0aW9uIEZvY3VzaW5nIChHbGlkZSwgQ29tcG9uZW50cykge1xuICByZXR1cm4ge1xuICAgIC8qKlxuICAgICAqIE1vZGlmaWVzIHBhc3NlZCB0cmFuc2xhdGUgdmFsdWUgd2l0aCBpbmRleCBpbiB0aGUgYGZvY3VzQXRgIHNldHRpbmcuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtOdW1iZXJ9IHRyYW5zbGF0ZVxuICAgICAqIEByZXR1cm4ge051bWJlcn1cbiAgICAgKi9cbiAgICBtb2RpZnk6IGZ1bmN0aW9uIG1vZGlmeSh0cmFuc2xhdGUpIHtcbiAgICAgIHZhciBnYXAgPSBDb21wb25lbnRzLkdhcHMudmFsdWU7XG4gICAgICB2YXIgd2lkdGggPSBDb21wb25lbnRzLlNpemVzLndpZHRoO1xuICAgICAgdmFyIGZvY3VzQXQgPSBHbGlkZS5zZXR0aW5ncy5mb2N1c0F0O1xuICAgICAgdmFyIHNsaWRlV2lkdGggPSBDb21wb25lbnRzLlNpemVzLnNsaWRlV2lkdGg7XG5cbiAgICAgIGlmIChmb2N1c0F0ID09PSAnY2VudGVyJykge1xuICAgICAgICByZXR1cm4gdHJhbnNsYXRlIC0gKHdpZHRoIC8gMiAtIHNsaWRlV2lkdGggLyAyKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRyYW5zbGF0ZSAtIHNsaWRlV2lkdGggKiBmb2N1c0F0IC0gZ2FwICogZm9jdXNBdDtcbiAgICB9XG4gIH07XG59XG5cbi8qKlxuICogQXBwbGllcyBkaWZmcmVudCB0cmFuc2Zvcm1lcnMgb24gdHJhbnNsYXRlIHZhbHVlLlxuICpcbiAqIEBwYXJhbSAge09iamVjdH0gR2xpZGVcbiAqIEBwYXJhbSAge09iamVjdH0gQ29tcG9uZW50c1xuICogQHJldHVybiB7T2JqZWN0fVxuICovXG5mdW5jdGlvbiBtdXRhdG9yIChHbGlkZSwgQ29tcG9uZW50cywgRXZlbnRzKSB7XG4gIC8qKlxuICAgKiBNZXJnZSBpbnN0YW5jZSB0cmFuc2Zvcm1lcnMgd2l0aCBjb2xsZWN0aW9uIG9mIGRlZmF1bHQgdHJhbnNmb3JtZXJzLlxuICAgKiBJdCdzIGltcG9ydGFudCB0aGF0IHRoZSBSdGwgY29tcG9uZW50IGJlIGxhc3Qgb24gdGhlIGxpc3QsXG4gICAqIHNvIGl0IHJlZmxlY3RzIGFsbCBwcmV2aW91cyB0cmFuc2Zvcm1hdGlvbnMuXG4gICAqXG4gICAqIEB0eXBlIHtBcnJheX1cbiAgICovXG4gIHZhciBUUkFOU0ZPUk1FUlMgPSBbR2FwLCBHcm93LCBQZWVraW5nLCBGb2N1c2luZ10uY29uY2F0KEdsaWRlLl90LCBbUnRsXSk7XG5cbiAgcmV0dXJuIHtcbiAgICAvKipcbiAgICAgKiBQaXBsaW5lcyB0cmFuc2xhdGUgdmFsdWUgd2l0aCByZWdpc3RlcmVkIHRyYW5zZm9ybWVycy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAge051bWJlcn0gdHJhbnNsYXRlXG4gICAgICogQHJldHVybiB7TnVtYmVyfVxuICAgICAqL1xuICAgIG11dGF0ZTogZnVuY3Rpb24gbXV0YXRlKHRyYW5zbGF0ZSkge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBUUkFOU0ZPUk1FUlMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIHRyYW5zZm9ybWVyID0gVFJBTlNGT1JNRVJTW2ldO1xuXG4gICAgICAgIGlmIChpc0Z1bmN0aW9uKHRyYW5zZm9ybWVyKSAmJiBpc0Z1bmN0aW9uKHRyYW5zZm9ybWVyKCkubW9kaWZ5KSkge1xuICAgICAgICAgIHRyYW5zbGF0ZSA9IHRyYW5zZm9ybWVyKEdsaWRlLCBDb21wb25lbnRzLCBFdmVudHMpLm1vZGlmeSh0cmFuc2xhdGUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHdhcm4oJ1RyYW5zZm9ybWVyIHNob3VsZCBiZSBhIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyBhbiBvYmplY3Qgd2l0aCBgbW9kaWZ5KClgIG1ldGhvZCcpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0cmFuc2xhdGU7XG4gICAgfVxuICB9O1xufVxuXG5mdW5jdGlvbiBUcmFuc2xhdGUgKEdsaWRlLCBDb21wb25lbnRzLCBFdmVudHMpIHtcbiAgdmFyIFRyYW5zbGF0ZSA9IHtcbiAgICAvKipcbiAgICAgKiBTZXRzIHZhbHVlIG9mIHRyYW5zbGF0ZSBvbiBIVE1MIGVsZW1lbnQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gdmFsdWVcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIHNldDogZnVuY3Rpb24gc2V0KHZhbHVlKSB7XG4gICAgICB2YXIgdHJhbnNmb3JtID0gbXV0YXRvcihHbGlkZSwgQ29tcG9uZW50cykubXV0YXRlKHZhbHVlKTtcblxuICAgICAgQ29tcG9uZW50cy5IdG1sLndyYXBwZXIuc3R5bGUudHJhbnNmb3JtID0gJ3RyYW5zbGF0ZTNkKCcgKyAtMSAqIHRyYW5zZm9ybSArICdweCwgMHB4LCAwcHgpJztcbiAgICB9LFxuXG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIHZhbHVlIG9mIHRyYW5zbGF0ZSBmcm9tIEhUTUwgZWxlbWVudC5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICBDb21wb25lbnRzLkh0bWwud3JhcHBlci5zdHlsZS50cmFuc2Zvcm0gPSAnJztcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIFNldCBuZXcgdHJhbnNsYXRlIHZhbHVlOlxuICAgKiAtIG9uIG1vdmUgdG8gcmVmbGVjdCBpbmRleCBjaGFuZ2VcbiAgICogLSBvbiB1cGRhdGluZyB2aWEgQVBJIHRvIHJlZmxlY3QgcG9zc2libGUgY2hhbmdlcyBpbiBvcHRpb25zXG4gICAqL1xuICBFdmVudHMub24oJ21vdmUnLCBmdW5jdGlvbiAoY29udGV4dCkge1xuICAgIHZhciBnYXAgPSBDb21wb25lbnRzLkdhcHMudmFsdWU7XG4gICAgdmFyIGxlbmd0aCA9IENvbXBvbmVudHMuU2l6ZXMubGVuZ3RoO1xuICAgIHZhciB3aWR0aCA9IENvbXBvbmVudHMuU2l6ZXMuc2xpZGVXaWR0aDtcblxuICAgIGlmIChHbGlkZS5pc1R5cGUoJ2Nhcm91c2VsJykgJiYgQ29tcG9uZW50cy5SdW4uaXNPZmZzZXQoJzwnKSkge1xuICAgICAgQ29tcG9uZW50cy5UcmFuc2l0aW9uLmFmdGVyKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgRXZlbnRzLmVtaXQoJ3RyYW5zbGF0ZS5qdW1wJyk7XG5cbiAgICAgICAgVHJhbnNsYXRlLnNldCh3aWR0aCAqIChsZW5ndGggLSAxKSk7XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIFRyYW5zbGF0ZS5zZXQoLXdpZHRoIC0gZ2FwICogbGVuZ3RoKTtcbiAgICB9XG5cbiAgICBpZiAoR2xpZGUuaXNUeXBlKCdjYXJvdXNlbCcpICYmIENvbXBvbmVudHMuUnVuLmlzT2Zmc2V0KCc+JykpIHtcbiAgICAgIENvbXBvbmVudHMuVHJhbnNpdGlvbi5hZnRlcihmdW5jdGlvbiAoKSB7XG4gICAgICAgIEV2ZW50cy5lbWl0KCd0cmFuc2xhdGUuanVtcCcpO1xuXG4gICAgICAgIFRyYW5zbGF0ZS5zZXQoMCk7XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIFRyYW5zbGF0ZS5zZXQod2lkdGggKiBsZW5ndGggKyBnYXAgKiBsZW5ndGgpO1xuICAgIH1cblxuICAgIHJldHVybiBUcmFuc2xhdGUuc2V0KGNvbnRleHQubW92ZW1lbnQpO1xuICB9KTtcblxuICAvKipcbiAgICogUmVtb3ZlIHRyYW5zbGF0ZTpcbiAgICogLSBvbiBkZXN0cm95aW5nIHRvIGJyaW5nIG1hcmt1cCB0byBpdHMgaW5pdGFsIHN0YXRlXG4gICAqL1xuICBFdmVudHMub24oJ2Rlc3Ryb3knLCBmdW5jdGlvbiAoKSB7XG4gICAgVHJhbnNsYXRlLnJlbW92ZSgpO1xuICB9KTtcblxuICByZXR1cm4gVHJhbnNsYXRlO1xufVxuXG5mdW5jdGlvbiBUcmFuc2l0aW9uIChHbGlkZSwgQ29tcG9uZW50cywgRXZlbnRzKSB7XG4gIC8qKlxuICAgKiBIb2xkcyBpbmFjdGl2aXR5IHN0YXR1cyBvZiB0cmFuc2l0aW9uLlxuICAgKiBXaGVuIHRydWUgdHJhbnNpdGlvbiBpcyBub3QgYXBwbGllZC5cbiAgICpcbiAgICogQHR5cGUge0Jvb2xlYW59XG4gICAqL1xuICB2YXIgZGlzYWJsZWQgPSBmYWxzZTtcblxuICB2YXIgVHJhbnNpdGlvbiA9IHtcbiAgICAvKipcbiAgICAgKiBDb21wb3NlcyBzdHJpbmcgb2YgdGhlIENTUyB0cmFuc2l0aW9uLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHByb3BlcnR5XG4gICAgICogQHJldHVybiB7U3RyaW5nfVxuICAgICAqL1xuICAgIGNvbXBvc2U6IGZ1bmN0aW9uIGNvbXBvc2UocHJvcGVydHkpIHtcbiAgICAgIHZhciBzZXR0aW5ncyA9IEdsaWRlLnNldHRpbmdzO1xuXG4gICAgICBpZiAoIWRpc2FibGVkKSB7XG4gICAgICAgIHJldHVybiBwcm9wZXJ0eSArICcgJyArIHRoaXMuZHVyYXRpb24gKyAnbXMgJyArIHNldHRpbmdzLmFuaW1hdGlvblRpbWluZ0Z1bmM7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBwcm9wZXJ0eSArICcgMG1zICcgKyBzZXR0aW5ncy5hbmltYXRpb25UaW1pbmdGdW5jO1xuICAgIH0sXG5cblxuICAgIC8qKlxuICAgICAqIFNldHMgdmFsdWUgb2YgdHJhbnNpdGlvbiBvbiBIVE1MIGVsZW1lbnQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZz19IHByb3BlcnR5XG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICBzZXQ6IGZ1bmN0aW9uIHNldCgpIHtcbiAgICAgIHZhciBwcm9wZXJ0eSA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDogJ3RyYW5zZm9ybSc7XG5cbiAgICAgIENvbXBvbmVudHMuSHRtbC53cmFwcGVyLnN0eWxlLnRyYW5zaXRpb24gPSB0aGlzLmNvbXBvc2UocHJvcGVydHkpO1xuICAgIH0sXG5cblxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgdmFsdWUgb2YgdHJhbnNpdGlvbiBmcm9tIEhUTUwgZWxlbWVudC5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICBDb21wb25lbnRzLkh0bWwud3JhcHBlci5zdHlsZS50cmFuc2l0aW9uID0gJyc7XG4gICAgfSxcblxuXG4gICAgLyoqXG4gICAgICogUnVucyBjYWxsYmFjayBhZnRlciBhbmltYXRpb24uXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIGFmdGVyOiBmdW5jdGlvbiBhZnRlcihjYWxsYmFjaykge1xuICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICB9LCB0aGlzLmR1cmF0aW9uKTtcbiAgICB9LFxuXG5cbiAgICAvKipcbiAgICAgKiBFbmFibGUgdHJhbnNpdGlvbi5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgZW5hYmxlOiBmdW5jdGlvbiBlbmFibGUoKSB7XG4gICAgICBkaXNhYmxlZCA9IGZhbHNlO1xuXG4gICAgICB0aGlzLnNldCgpO1xuICAgIH0sXG5cblxuICAgIC8qKlxuICAgICAqIERpc2FibGUgdHJhbnNpdGlvbi5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgZGlzYWJsZTogZnVuY3Rpb24gZGlzYWJsZSgpIHtcbiAgICAgIGRpc2FibGVkID0gdHJ1ZTtcblxuICAgICAgdGhpcy5zZXQoKTtcbiAgICB9XG4gIH07XG5cbiAgZGVmaW5lKFRyYW5zaXRpb24sICdkdXJhdGlvbicsIHtcbiAgICAvKipcbiAgICAgKiBHZXRzIGR1cmF0aW9uIG9mIHRoZSB0cmFuc2l0aW9uIGJhc2VkXG4gICAgICogb24gY3VycmVudGx5IHJ1bm5pbmcgYW5pbWF0aW9uIHR5cGUuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9XG4gICAgICovXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICB2YXIgc2V0dGluZ3MgPSBHbGlkZS5zZXR0aW5ncztcblxuICAgICAgaWYgKEdsaWRlLmlzVHlwZSgnc2xpZGVyJykgJiYgQ29tcG9uZW50cy5SdW4ub2Zmc2V0KSB7XG4gICAgICAgIHJldHVybiBzZXR0aW5ncy5yZXdpbmREdXJhdGlvbjtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHNldHRpbmdzLmFuaW1hdGlvbkR1cmF0aW9uO1xuICAgIH1cbiAgfSk7XG5cbiAgLyoqXG4gICAqIFNldCB0cmFuc2l0aW9uIGBzdHlsZWAgdmFsdWU6XG4gICAqIC0gb24gZWFjaCBtb3ZpbmcsIGJlY2F1c2UgaXQgbWF5IGJlIGNsZWFyZWQgYnkgb2Zmc2V0IG1vdmVcbiAgICovXG4gIEV2ZW50cy5vbignbW92ZScsIGZ1bmN0aW9uICgpIHtcbiAgICBUcmFuc2l0aW9uLnNldCgpO1xuICB9KTtcblxuICAvKipcbiAgICogRGlzYWJsZSB0cmFuc2l0aW9uOlxuICAgKiAtIGJlZm9yZSBpbml0aWFsIGJ1aWxkIHRvIGF2b2lkIHRyYW5zaXRpb25pbmcgZnJvbSBgMGAgdG8gYHN0YXJ0QXRgIGluZGV4XG4gICAqIC0gd2hpbGUgcmVzaXppbmcgd2luZG93IGFuZCByZWNhbGN1bGF0aW5nIGRpbWVudGlvbnNcbiAgICogLSBvbiBqdW1waW5nIGZyb20gb2Zmc2V0IHRyYW5zaXRpb24gYXQgc3RhcnQgYW5kIGVuZCBlZGdlcyBpbiBgY2Fyb3VzZWxgIHR5cGVcbiAgICovXG4gIEV2ZW50cy5vbihbJ2J1aWxkLmJlZm9yZScsICdyZXNpemUnLCAndHJhbnNsYXRlLmp1bXAnXSwgZnVuY3Rpb24gKCkge1xuICAgIFRyYW5zaXRpb24uZGlzYWJsZSgpO1xuICB9KTtcblxuICAvKipcbiAgICogRW5hYmxlIHRyYW5zaXRpb246XG4gICAqIC0gb24gZWFjaCBydW5uaW5nLCBiZWNhdXNlIGl0IG1heSBiZSBkaXNhYmxlZCBieSBvZmZzZXQgbW92ZVxuICAgKi9cbiAgRXZlbnRzLm9uKCdydW4nLCBmdW5jdGlvbiAoKSB7XG4gICAgVHJhbnNpdGlvbi5lbmFibGUoKTtcbiAgfSk7XG5cbiAgLyoqXG4gICAqIFJlbW92ZSB0cmFuc2l0aW9uOlxuICAgKiAtIG9uIGRlc3Ryb3lpbmcgdG8gYnJpbmcgbWFya3VwIHRvIGl0cyBpbml0YWwgc3RhdGVcbiAgICovXG4gIEV2ZW50cy5vbignZGVzdHJveScsIGZ1bmN0aW9uICgpIHtcbiAgICBUcmFuc2l0aW9uLnJlbW92ZSgpO1xuICB9KTtcblxuICByZXR1cm4gVHJhbnNpdGlvbjtcbn1cblxuLyoqXG4gKiBUZXN0IHZpYSBhIGdldHRlciBpbiB0aGUgb3B0aW9ucyBvYmplY3QgdG8gc2VlXG4gKiBpZiB0aGUgcGFzc2l2ZSBwcm9wZXJ0eSBpcyBhY2Nlc3NlZC5cbiAqXG4gKiBAc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9XSUNHL0V2ZW50TGlzdGVuZXJPcHRpb25zL2Jsb2IvZ2gtcGFnZXMvZXhwbGFpbmVyLm1kI2ZlYXR1cmUtZGV0ZWN0aW9uXG4gKi9cblxudmFyIHN1cHBvcnRzUGFzc2l2ZSA9IGZhbHNlO1xuXG50cnkge1xuICB2YXIgb3B0cyA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh7fSwgJ3Bhc3NpdmUnLCB7XG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICBzdXBwb3J0c1Bhc3NpdmUgPSB0cnVlO1xuICAgIH1cbiAgfSk7XG5cbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Rlc3RQYXNzaXZlJywgbnVsbCwgb3B0cyk7XG4gIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCd0ZXN0UGFzc2l2ZScsIG51bGwsIG9wdHMpO1xufSBjYXRjaCAoZSkge31cblxudmFyIHN1cHBvcnRzUGFzc2l2ZSQxID0gc3VwcG9ydHNQYXNzaXZlO1xuXG52YXIgU1RBUlRfRVZFTlRTID0gWyd0b3VjaHN0YXJ0JywgJ21vdXNlZG93biddO1xudmFyIE1PVkVfRVZFTlRTID0gWyd0b3VjaG1vdmUnLCAnbW91c2Vtb3ZlJ107XG52YXIgRU5EX0VWRU5UUyA9IFsndG91Y2hlbmQnLCAndG91Y2hjYW5jZWwnLCAnbW91c2V1cCcsICdtb3VzZWxlYXZlJ107XG52YXIgTU9VU0VfRVZFTlRTID0gWydtb3VzZWRvd24nLCAnbW91c2Vtb3ZlJywgJ21vdXNldXAnLCAnbW91c2VsZWF2ZSddO1xuXG5mdW5jdGlvbiBTd2lwZSAoR2xpZGUsIENvbXBvbmVudHMsIEV2ZW50cykge1xuICAvKipcbiAgICogSW5zdGFuY2Ugb2YgdGhlIGJpbmRlciBmb3IgRE9NIEV2ZW50cy5cbiAgICpcbiAgICogQHR5cGUge0V2ZW50c0JpbmRlcn1cbiAgICovXG4gIHZhciBCaW5kZXIgPSBuZXcgRXZlbnRzQmluZGVyKCk7XG5cbiAgdmFyIHN3aXBlU2luID0gMDtcbiAgdmFyIHN3aXBlU3RhcnRYID0gMDtcbiAgdmFyIHN3aXBlU3RhcnRZID0gMDtcbiAgdmFyIGRpc2FibGVkID0gZmFsc2U7XG4gIHZhciBjYXB0dXJlID0gc3VwcG9ydHNQYXNzaXZlJDEgPyB7IHBhc3NpdmU6IHRydWUgfSA6IGZhbHNlO1xuXG4gIHZhciBTd2lwZSA9IHtcbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXplcyBzd2lwZSBiaW5kaW5ncy5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgbW91bnQ6IGZ1bmN0aW9uIG1vdW50KCkge1xuICAgICAgdGhpcy5iaW5kU3dpcGVTdGFydCgpO1xuICAgIH0sXG5cblxuICAgIC8qKlxuICAgICAqIEhhbmRsZXIgZm9yIGBzd2lwZXN0YXJ0YCBldmVudC4gQ2FsY3VsYXRlcyBlbnRyeSBwb2ludHMgb2YgdGhlIHVzZXIncyB0YXAuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZXZlbnRcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIHN0YXJ0OiBmdW5jdGlvbiBzdGFydChldmVudCkge1xuICAgICAgaWYgKCFkaXNhYmxlZCAmJiAhR2xpZGUuZGlzYWJsZWQpIHtcbiAgICAgICAgdGhpcy5kaXNhYmxlKCk7XG5cbiAgICAgICAgdmFyIHN3aXBlID0gdGhpcy50b3VjaGVzKGV2ZW50KTtcblxuICAgICAgICBzd2lwZVNpbiA9IG51bGw7XG4gICAgICAgIHN3aXBlU3RhcnRYID0gdG9JbnQoc3dpcGUucGFnZVgpO1xuICAgICAgICBzd2lwZVN0YXJ0WSA9IHRvSW50KHN3aXBlLnBhZ2VZKTtcblxuICAgICAgICB0aGlzLmJpbmRTd2lwZU1vdmUoKTtcbiAgICAgICAgdGhpcy5iaW5kU3dpcGVFbmQoKTtcblxuICAgICAgICBFdmVudHMuZW1pdCgnc3dpcGUuc3RhcnQnKTtcbiAgICAgIH1cbiAgICB9LFxuXG5cbiAgICAvKipcbiAgICAgKiBIYW5kbGVyIGZvciBgc3dpcGVtb3ZlYCBldmVudC4gQ2FsY3VsYXRlcyB1c2VyJ3MgdGFwIGFuZ2xlIGFuZCBkaXN0YW5jZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBldmVudFxuICAgICAqL1xuICAgIG1vdmU6IGZ1bmN0aW9uIG1vdmUoZXZlbnQpIHtcbiAgICAgIGlmICghR2xpZGUuZGlzYWJsZWQpIHtcbiAgICAgICAgdmFyIF9HbGlkZSRzZXR0aW5ncyA9IEdsaWRlLnNldHRpbmdzLFxuICAgICAgICAgICAgdG91Y2hBbmdsZSA9IF9HbGlkZSRzZXR0aW5ncy50b3VjaEFuZ2xlLFxuICAgICAgICAgICAgdG91Y2hSYXRpbyA9IF9HbGlkZSRzZXR0aW5ncy50b3VjaFJhdGlvLFxuICAgICAgICAgICAgY2xhc3NlcyA9IF9HbGlkZSRzZXR0aW5ncy5jbGFzc2VzO1xuXG5cbiAgICAgICAgdmFyIHN3aXBlID0gdGhpcy50b3VjaGVzKGV2ZW50KTtcblxuICAgICAgICB2YXIgc3ViRXhTeCA9IHRvSW50KHN3aXBlLnBhZ2VYKSAtIHN3aXBlU3RhcnRYO1xuICAgICAgICB2YXIgc3ViRXlTeSA9IHRvSW50KHN3aXBlLnBhZ2VZKSAtIHN3aXBlU3RhcnRZO1xuICAgICAgICB2YXIgcG93RVggPSBNYXRoLmFicyhzdWJFeFN4IDw8IDIpO1xuICAgICAgICB2YXIgcG93RVkgPSBNYXRoLmFicyhzdWJFeVN5IDw8IDIpO1xuICAgICAgICB2YXIgc3dpcGVIeXBvdGVudXNlID0gTWF0aC5zcXJ0KHBvd0VYICsgcG93RVkpO1xuICAgICAgICB2YXIgc3dpcGVDYXRoZXR1cyA9IE1hdGguc3FydChwb3dFWSk7XG5cbiAgICAgICAgc3dpcGVTaW4gPSBNYXRoLmFzaW4oc3dpcGVDYXRoZXR1cyAvIHN3aXBlSHlwb3RlbnVzZSk7XG5cbiAgICAgICAgaWYgKHN3aXBlU2luICogMTgwIC8gTWF0aC5QSSA8IHRvdWNoQW5nbGUpIHtcbiAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgICAgIENvbXBvbmVudHMuTW92ZS5tYWtlKHN1YkV4U3ggKiB0b0Zsb2F0KHRvdWNoUmF0aW8pKTtcblxuICAgICAgICAgIENvbXBvbmVudHMuSHRtbC5yb290LmNsYXNzTGlzdC5hZGQoY2xhc3Nlcy5kcmFnZ2luZyk7XG5cbiAgICAgICAgICBFdmVudHMuZW1pdCgnc3dpcGUubW92ZScpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cblxuICAgIC8qKlxuICAgICAqIEhhbmRsZXIgZm9yIGBzd2lwZWVuZGAgZXZlbnQuIEZpbml0aWFsaXplcyB1c2VyJ3MgdGFwIGFuZCBkZWNpZGVzIGFib3V0IGdsaWRlIG1vdmUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZXZlbnRcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIGVuZDogZnVuY3Rpb24gZW5kKGV2ZW50KSB7XG4gICAgICBpZiAoIUdsaWRlLmRpc2FibGVkKSB7XG4gICAgICAgIHZhciBzZXR0aW5ncyA9IEdsaWRlLnNldHRpbmdzO1xuXG4gICAgICAgIHZhciBzd2lwZSA9IHRoaXMudG91Y2hlcyhldmVudCk7XG4gICAgICAgIHZhciB0aHJlc2hvbGQgPSB0aGlzLnRocmVzaG9sZChldmVudCk7XG5cbiAgICAgICAgdmFyIHN3aXBlRGlzdGFuY2UgPSBzd2lwZS5wYWdlWCAtIHN3aXBlU3RhcnRYO1xuICAgICAgICB2YXIgc3dpcGVEZWcgPSBzd2lwZVNpbiAqIDE4MCAvIE1hdGguUEk7XG4gICAgICAgIHZhciBzdGVwcyA9IE1hdGgucm91bmQoc3dpcGVEaXN0YW5jZSAvIENvbXBvbmVudHMuU2l6ZXMuc2xpZGVXaWR0aCk7XG5cbiAgICAgICAgdGhpcy5lbmFibGUoKTtcblxuICAgICAgICBpZiAoc3dpcGVEaXN0YW5jZSA+IHRocmVzaG9sZCAmJiBzd2lwZURlZyA8IHNldHRpbmdzLnRvdWNoQW5nbGUpIHtcbiAgICAgICAgICAvLyBXaGlsZSBzd2lwZSBpcyBwb3NpdGl2ZSBhbmQgZ3JlYXRlciB0aGFuIHRocmVzaG9sZCBtb3ZlIGJhY2t3YXJkLlxuICAgICAgICAgIGlmIChzZXR0aW5ncy5wZXJUb3VjaCkge1xuICAgICAgICAgICAgc3RlcHMgPSBNYXRoLm1pbihzdGVwcywgdG9JbnQoc2V0dGluZ3MucGVyVG91Y2gpKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoQ29tcG9uZW50cy5EaXJlY3Rpb24uaXMoJ3J0bCcpKSB7XG4gICAgICAgICAgICBzdGVwcyA9IC1zdGVwcztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBDb21wb25lbnRzLlJ1bi5tYWtlKENvbXBvbmVudHMuRGlyZWN0aW9uLnJlc29sdmUoJzwnICsgc3RlcHMpKTtcbiAgICAgICAgfSBlbHNlIGlmIChzd2lwZURpc3RhbmNlIDwgLXRocmVzaG9sZCAmJiBzd2lwZURlZyA8IHNldHRpbmdzLnRvdWNoQW5nbGUpIHtcbiAgICAgICAgICAvLyBXaGlsZSBzd2lwZSBpcyBuZWdhdGl2ZSBhbmQgbG93ZXIgdGhhbiBuZWdhdGl2ZSB0aHJlc2hvbGQgbW92ZSBmb3J3YXJkLlxuICAgICAgICAgIGlmIChzZXR0aW5ncy5wZXJUb3VjaCkge1xuICAgICAgICAgICAgc3RlcHMgPSBNYXRoLm1heChzdGVwcywgLXRvSW50KHNldHRpbmdzLnBlclRvdWNoKSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKENvbXBvbmVudHMuRGlyZWN0aW9uLmlzKCdydGwnKSkge1xuICAgICAgICAgICAgc3RlcHMgPSAtc3RlcHM7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgQ29tcG9uZW50cy5SdW4ubWFrZShDb21wb25lbnRzLkRpcmVjdGlvbi5yZXNvbHZlKCc+JyArIHN0ZXBzKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gV2hpbGUgc3dpcGUgZG9uJ3QgcmVhY2ggZGlzdGFuY2UgYXBwbHkgcHJldmlvdXMgdHJhbnNmb3JtLlxuICAgICAgICAgIENvbXBvbmVudHMuTW92ZS5tYWtlKCk7XG4gICAgICAgIH1cblxuICAgICAgICBDb21wb25lbnRzLkh0bWwucm9vdC5jbGFzc0xpc3QucmVtb3ZlKHNldHRpbmdzLmNsYXNzZXMuZHJhZ2dpbmcpO1xuXG4gICAgICAgIHRoaXMudW5iaW5kU3dpcGVNb3ZlKCk7XG4gICAgICAgIHRoaXMudW5iaW5kU3dpcGVFbmQoKTtcblxuICAgICAgICBFdmVudHMuZW1pdCgnc3dpcGUuZW5kJyk7XG4gICAgICB9XG4gICAgfSxcblxuXG4gICAgLyoqXG4gICAgICogQmluZHMgc3dpcGUncyBzdGFydGluZyBldmVudC5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgYmluZFN3aXBlU3RhcnQ6IGZ1bmN0aW9uIGJpbmRTd2lwZVN0YXJ0KCkge1xuICAgICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgICAgdmFyIHNldHRpbmdzID0gR2xpZGUuc2V0dGluZ3M7XG5cbiAgICAgIGlmIChzZXR0aW5ncy5zd2lwZVRocmVzaG9sZCkge1xuICAgICAgICBCaW5kZXIub24oU1RBUlRfRVZFTlRTWzBdLCBDb21wb25lbnRzLkh0bWwud3JhcHBlciwgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgX3RoaXMuc3RhcnQoZXZlbnQpO1xuICAgICAgICB9LCBjYXB0dXJlKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHNldHRpbmdzLmRyYWdUaHJlc2hvbGQpIHtcbiAgICAgICAgQmluZGVyLm9uKFNUQVJUX0VWRU5UU1sxXSwgQ29tcG9uZW50cy5IdG1sLndyYXBwZXIsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgIF90aGlzLnN0YXJ0KGV2ZW50KTtcbiAgICAgICAgfSwgY2FwdHVyZSk7XG4gICAgICB9XG4gICAgfSxcblxuXG4gICAgLyoqXG4gICAgICogVW5iaW5kcyBzd2lwZSdzIHN0YXJ0aW5nIGV2ZW50LlxuICAgICAqXG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICB1bmJpbmRTd2lwZVN0YXJ0OiBmdW5jdGlvbiB1bmJpbmRTd2lwZVN0YXJ0KCkge1xuICAgICAgQmluZGVyLm9mZihTVEFSVF9FVkVOVFNbMF0sIENvbXBvbmVudHMuSHRtbC53cmFwcGVyLCBjYXB0dXJlKTtcbiAgICAgIEJpbmRlci5vZmYoU1RBUlRfRVZFTlRTWzFdLCBDb21wb25lbnRzLkh0bWwud3JhcHBlciwgY2FwdHVyZSk7XG4gICAgfSxcblxuXG4gICAgLyoqXG4gICAgICogQmluZHMgc3dpcGUncyBtb3ZpbmcgZXZlbnQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIGJpbmRTd2lwZU1vdmU6IGZ1bmN0aW9uIGJpbmRTd2lwZU1vdmUoKSB7XG4gICAgICB2YXIgX3RoaXMyID0gdGhpcztcblxuICAgICAgQmluZGVyLm9uKE1PVkVfRVZFTlRTLCBDb21wb25lbnRzLkh0bWwud3JhcHBlciwgdGhyb3R0bGUoZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIF90aGlzMi5tb3ZlKGV2ZW50KTtcbiAgICAgIH0sIEdsaWRlLnNldHRpbmdzLnRocm90dGxlKSwgY2FwdHVyZSk7XG4gICAgfSxcblxuXG4gICAgLyoqXG4gICAgICogVW5iaW5kcyBzd2lwZSdzIG1vdmluZyBldmVudC5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgdW5iaW5kU3dpcGVNb3ZlOiBmdW5jdGlvbiB1bmJpbmRTd2lwZU1vdmUoKSB7XG4gICAgICBCaW5kZXIub2ZmKE1PVkVfRVZFTlRTLCBDb21wb25lbnRzLkh0bWwud3JhcHBlciwgY2FwdHVyZSk7XG4gICAgfSxcblxuXG4gICAgLyoqXG4gICAgICogQmluZHMgc3dpcGUncyBlbmRpbmcgZXZlbnQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIGJpbmRTd2lwZUVuZDogZnVuY3Rpb24gYmluZFN3aXBlRW5kKCkge1xuICAgICAgdmFyIF90aGlzMyA9IHRoaXM7XG5cbiAgICAgIEJpbmRlci5vbihFTkRfRVZFTlRTLCBDb21wb25lbnRzLkh0bWwud3JhcHBlciwgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIF90aGlzMy5lbmQoZXZlbnQpO1xuICAgICAgfSk7XG4gICAgfSxcblxuXG4gICAgLyoqXG4gICAgICogVW5iaW5kcyBzd2lwZSdzIGVuZGluZyBldmVudC5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgdW5iaW5kU3dpcGVFbmQ6IGZ1bmN0aW9uIHVuYmluZFN3aXBlRW5kKCkge1xuICAgICAgQmluZGVyLm9mZihFTkRfRVZFTlRTLCBDb21wb25lbnRzLkh0bWwud3JhcHBlcik7XG4gICAgfSxcblxuXG4gICAgLyoqXG4gICAgICogTm9ybWFsaXplcyBldmVudCB0b3VjaGVzIHBvaW50cyBhY2NvcnRpbmcgdG8gZGlmZmVyZW50IHR5cGVzLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGV2ZW50XG4gICAgICovXG4gICAgdG91Y2hlczogZnVuY3Rpb24gdG91Y2hlcyhldmVudCkge1xuICAgICAgaWYgKE1PVVNFX0VWRU5UUy5pbmRleE9mKGV2ZW50LnR5cGUpID4gLTEpIHtcbiAgICAgICAgcmV0dXJuIGV2ZW50O1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gZXZlbnQudG91Y2hlc1swXSB8fCBldmVudC5jaGFuZ2VkVG91Y2hlc1swXTtcbiAgICB9LFxuXG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHZhbHVlIG9mIG1pbmltdW0gc3dpcGUgZGlzdGFuY2Ugc2V0dGluZ3MgYmFzZWQgb24gZXZlbnQgdHlwZS5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge051bWJlcn1cbiAgICAgKi9cbiAgICB0aHJlc2hvbGQ6IGZ1bmN0aW9uIHRocmVzaG9sZChldmVudCkge1xuICAgICAgdmFyIHNldHRpbmdzID0gR2xpZGUuc2V0dGluZ3M7XG5cbiAgICAgIGlmIChNT1VTRV9FVkVOVFMuaW5kZXhPZihldmVudC50eXBlKSA+IC0xKSB7XG4gICAgICAgIHJldHVybiBzZXR0aW5ncy5kcmFnVGhyZXNob2xkO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gc2V0dGluZ3Muc3dpcGVUaHJlc2hvbGQ7XG4gICAgfSxcblxuXG4gICAgLyoqXG4gICAgICogRW5hYmxlcyBzd2lwZSBldmVudC5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge3NlbGZ9XG4gICAgICovXG4gICAgZW5hYmxlOiBmdW5jdGlvbiBlbmFibGUoKSB7XG4gICAgICBkaXNhYmxlZCA9IGZhbHNlO1xuXG4gICAgICBDb21wb25lbnRzLlRyYW5zaXRpb24uZW5hYmxlKCk7XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cblxuICAgIC8qKlxuICAgICAqIERpc2FibGVzIHN3aXBlIGV2ZW50LlxuICAgICAqXG4gICAgICogQHJldHVybiB7c2VsZn1cbiAgICAgKi9cbiAgICBkaXNhYmxlOiBmdW5jdGlvbiBkaXNhYmxlKCkge1xuICAgICAgZGlzYWJsZWQgPSB0cnVlO1xuXG4gICAgICBDb21wb25lbnRzLlRyYW5zaXRpb24uZGlzYWJsZSgpO1xuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIEFkZCBjb21wb25lbnQgY2xhc3M6XG4gICAqIC0gYWZ0ZXIgaW5pdGlhbCBidWlsZGluZ1xuICAgKi9cbiAgRXZlbnRzLm9uKCdidWlsZC5hZnRlcicsIGZ1bmN0aW9uICgpIHtcbiAgICBDb21wb25lbnRzLkh0bWwucm9vdC5jbGFzc0xpc3QuYWRkKEdsaWRlLnNldHRpbmdzLmNsYXNzZXMuc3dpcGVhYmxlKTtcbiAgfSk7XG5cbiAgLyoqXG4gICAqIFJlbW92ZSBzd2lwaW5nIGJpbmRpbmdzOlxuICAgKiAtIG9uIGRlc3Ryb3lpbmcsIHRvIHJlbW92ZSBhZGRlZCBFdmVudExpc3RlbmVyc1xuICAgKi9cbiAgRXZlbnRzLm9uKCdkZXN0cm95JywgZnVuY3Rpb24gKCkge1xuICAgIFN3aXBlLnVuYmluZFN3aXBlU3RhcnQoKTtcbiAgICBTd2lwZS51bmJpbmRTd2lwZU1vdmUoKTtcbiAgICBTd2lwZS51bmJpbmRTd2lwZUVuZCgpO1xuICAgIEJpbmRlci5kZXN0cm95KCk7XG4gIH0pO1xuXG4gIHJldHVybiBTd2lwZTtcbn1cblxuZnVuY3Rpb24gSW1hZ2VzIChHbGlkZSwgQ29tcG9uZW50cywgRXZlbnRzKSB7XG4gIC8qKlxuICAgKiBJbnN0YW5jZSBvZiB0aGUgYmluZGVyIGZvciBET00gRXZlbnRzLlxuICAgKlxuICAgKiBAdHlwZSB7RXZlbnRzQmluZGVyfVxuICAgKi9cbiAgdmFyIEJpbmRlciA9IG5ldyBFdmVudHNCaW5kZXIoKTtcblxuICB2YXIgSW1hZ2VzID0ge1xuICAgIC8qKlxuICAgICAqIEJpbmRzIGxpc3RlbmVyIHRvIGdsaWRlIHdyYXBwZXIuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIG1vdW50OiBmdW5jdGlvbiBtb3VudCgpIHtcbiAgICAgIHRoaXMuYmluZCgpO1xuICAgIH0sXG5cblxuICAgIC8qKlxuICAgICAqIEJpbmRzIGBkcmFnc3RhcnRgIGV2ZW50IG9uIHdyYXBwZXIgdG8gcHJldmVudCBkcmFnZ2luZyBpbWFnZXMuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIGJpbmQ6IGZ1bmN0aW9uIGJpbmQoKSB7XG4gICAgICBCaW5kZXIub24oJ2RyYWdzdGFydCcsIENvbXBvbmVudHMuSHRtbC53cmFwcGVyLCB0aGlzLmRyYWdzdGFydCk7XG4gICAgfSxcblxuXG4gICAgLyoqXG4gICAgICogVW5iaW5kcyBgZHJhZ3N0YXJ0YCBldmVudCBvbiB3cmFwcGVyLlxuICAgICAqXG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICB1bmJpbmQ6IGZ1bmN0aW9uIHVuYmluZCgpIHtcbiAgICAgIEJpbmRlci5vZmYoJ2RyYWdzdGFydCcsIENvbXBvbmVudHMuSHRtbC53cmFwcGVyKTtcbiAgICB9LFxuXG5cbiAgICAvKipcbiAgICAgKiBFdmVudCBoYW5kbGVyLiBQcmV2ZW50cyBkcmFnZ2luZy5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgZHJhZ3N0YXJ0OiBmdW5jdGlvbiBkcmFnc3RhcnQoZXZlbnQpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBSZW1vdmUgYmluZGluZ3MgZnJvbSBpbWFnZXM6XG4gICAqIC0gb24gZGVzdHJveWluZywgdG8gcmVtb3ZlIGFkZGVkIEV2ZW50TGlzdGVuZXJzXG4gICAqL1xuICBFdmVudHMub24oJ2Rlc3Ryb3knLCBmdW5jdGlvbiAoKSB7XG4gICAgSW1hZ2VzLnVuYmluZCgpO1xuICAgIEJpbmRlci5kZXN0cm95KCk7XG4gIH0pO1xuXG4gIHJldHVybiBJbWFnZXM7XG59XG5cbmZ1bmN0aW9uIEFuY2hvcnMgKEdsaWRlLCBDb21wb25lbnRzLCBFdmVudHMpIHtcbiAgLyoqXG4gICAqIEluc3RhbmNlIG9mIHRoZSBiaW5kZXIgZm9yIERPTSBFdmVudHMuXG4gICAqXG4gICAqIEB0eXBlIHtFdmVudHNCaW5kZXJ9XG4gICAqL1xuICB2YXIgQmluZGVyID0gbmV3IEV2ZW50c0JpbmRlcigpO1xuXG4gIC8qKlxuICAgKiBIb2xkcyBkZXRhY2hpbmcgc3RhdHVzIG9mIGFuY2hvcnMuXG4gICAqIFByZXZlbnRzIGRldGFjaGluZyBvZiBhbHJlYWR5IGRldGFjaGVkIGFuY2hvcnMuXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqIEB0eXBlIHtCb29sZWFufVxuICAgKi9cbiAgdmFyIGRldGFjaGVkID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIEhvbGRzIHByZXZlbnRpbmcgc3RhdHVzIG9mIGFuY2hvcnMuXG4gICAqIElmIGB0cnVlYCByZWRpcmVjdGlvbiBhZnRlciBjbGljayB3aWxsIGJlIGRpc2FibGVkLlxuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKiBAdHlwZSB7Qm9vbGVhbn1cbiAgICovXG4gIHZhciBwcmV2ZW50ZWQgPSBmYWxzZTtcblxuICB2YXIgQW5jaG9ycyA9IHtcbiAgICAvKipcbiAgICAgKiBTZXR1cHMgYSBpbml0aWFsIHN0YXRlIG9mIGFuY2hvcnMgY29tcG9uZW50LlxuICAgICAqXG4gICAgICogQHJldHVybnMge1ZvaWR9XG4gICAgICovXG4gICAgbW91bnQ6IGZ1bmN0aW9uIG1vdW50KCkge1xuICAgICAgLyoqXG4gICAgICAgKiBIb2xkcyBjb2xsZWN0aW9uIG9mIGFuY2hvcnMgZWxlbWVudHMuXG4gICAgICAgKlxuICAgICAgICogQHByaXZhdGVcbiAgICAgICAqIEB0eXBlIHtIVE1MQ29sbGVjdGlvbn1cbiAgICAgICAqL1xuICAgICAgdGhpcy5fYSA9IENvbXBvbmVudHMuSHRtbC53cmFwcGVyLnF1ZXJ5U2VsZWN0b3JBbGwoJ2EnKTtcblxuICAgICAgdGhpcy5iaW5kKCk7XG4gICAgfSxcblxuXG4gICAgLyoqXG4gICAgICogQmluZHMgZXZlbnRzIHRvIGFuY2hvcnMgaW5zaWRlIGEgdHJhY2suXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIGJpbmQ6IGZ1bmN0aW9uIGJpbmQoKSB7XG4gICAgICBCaW5kZXIub24oJ2NsaWNrJywgQ29tcG9uZW50cy5IdG1sLndyYXBwZXIsIHRoaXMuY2xpY2spO1xuICAgIH0sXG5cblxuICAgIC8qKlxuICAgICAqIFVuYmluZHMgZXZlbnRzIGF0dGFjaGVkIHRvIGFuY2hvcnMgaW5zaWRlIGEgdHJhY2suXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIHVuYmluZDogZnVuY3Rpb24gdW5iaW5kKCkge1xuICAgICAgQmluZGVyLm9mZignY2xpY2snLCBDb21wb25lbnRzLkh0bWwud3JhcHBlcik7XG4gICAgfSxcblxuXG4gICAgLyoqXG4gICAgICogSGFuZGxlciBmb3IgY2xpY2sgZXZlbnQuIFByZXZlbnRzIGNsaWNrcyB3aGVuIGdsaWRlIGlzIGluIGBwcmV2ZW50YCBzdGF0dXMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9IGV2ZW50XG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICBjbGljazogZnVuY3Rpb24gY2xpY2soZXZlbnQpIHtcbiAgICAgIGlmIChwcmV2ZW50ZWQpIHtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB9XG4gICAgfSxcblxuXG4gICAgLyoqXG4gICAgICogRGV0YWNoZXMgYW5jaG9ycyBjbGljayBldmVudCBpbnNpZGUgZ2xpZGUuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtzZWxmfVxuICAgICAqL1xuICAgIGRldGFjaDogZnVuY3Rpb24gZGV0YWNoKCkge1xuICAgICAgcHJldmVudGVkID0gdHJ1ZTtcblxuICAgICAgaWYgKCFkZXRhY2hlZCkge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuaXRlbXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICB0aGlzLml0ZW1zW2ldLmRyYWdnYWJsZSA9IGZhbHNlO1xuXG4gICAgICAgICAgdGhpcy5pdGVtc1tpXS5zZXRBdHRyaWJ1dGUoJ2RhdGEtaHJlZicsIHRoaXMuaXRlbXNbaV0uZ2V0QXR0cmlidXRlKCdocmVmJykpO1xuXG4gICAgICAgICAgdGhpcy5pdGVtc1tpXS5yZW1vdmVBdHRyaWJ1dGUoJ2hyZWYnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGRldGFjaGVkID0gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuXG4gICAgLyoqXG4gICAgICogQXR0YWNoZXMgYW5jaG9ycyBjbGljayBldmVudHMgaW5zaWRlIGdsaWRlLlxuICAgICAqXG4gICAgICogQHJldHVybiB7c2VsZn1cbiAgICAgKi9cbiAgICBhdHRhY2g6IGZ1bmN0aW9uIGF0dGFjaCgpIHtcbiAgICAgIHByZXZlbnRlZCA9IGZhbHNlO1xuXG4gICAgICBpZiAoZGV0YWNoZWQpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLml0ZW1zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgdGhpcy5pdGVtc1tpXS5kcmFnZ2FibGUgPSB0cnVlO1xuXG4gICAgICAgICAgdGhpcy5pdGVtc1tpXS5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCB0aGlzLml0ZW1zW2ldLmdldEF0dHJpYnV0ZSgnZGF0YS1ocmVmJykpO1xuICAgICAgICB9XG5cbiAgICAgICAgZGV0YWNoZWQgPSBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICB9O1xuXG4gIGRlZmluZShBbmNob3JzLCAnaXRlbXMnLCB7XG4gICAgLyoqXG4gICAgICogR2V0cyBjb2xsZWN0aW9uIG9mIHRoZSBhcnJvd3MgSFRNTCBlbGVtZW50cy5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge0hUTUxFbGVtZW50W119XG4gICAgICovXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gQW5jaG9ycy5fYTtcbiAgICB9XG4gIH0pO1xuXG4gIC8qKlxuICAgKiBEZXRhY2ggYW5jaG9ycyBpbnNpZGUgc2xpZGVzOlxuICAgKiAtIG9uIHN3aXBpbmcsIHNvIHRoZXkgd29uJ3QgcmVkaXJlY3QgdG8gaXRzIGBocmVmYCBhdHRyaWJ1dGVzXG4gICAqL1xuICBFdmVudHMub24oJ3N3aXBlLm1vdmUnLCBmdW5jdGlvbiAoKSB7XG4gICAgQW5jaG9ycy5kZXRhY2goKTtcbiAgfSk7XG5cbiAgLyoqXG4gICAqIEF0dGFjaCBhbmNob3JzIGluc2lkZSBzbGlkZXM6XG4gICAqIC0gYWZ0ZXIgc3dpcGluZyBhbmQgdHJhbnNpdGlvbnMgZW5kcywgc28gdGhleSBjYW4gcmVkaXJlY3QgYWZ0ZXIgY2xpY2sgYWdhaW5cbiAgICovXG4gIEV2ZW50cy5vbignc3dpcGUuZW5kJywgZnVuY3Rpb24gKCkge1xuICAgIENvbXBvbmVudHMuVHJhbnNpdGlvbi5hZnRlcihmdW5jdGlvbiAoKSB7XG4gICAgICBBbmNob3JzLmF0dGFjaCgpO1xuICAgIH0pO1xuICB9KTtcblxuICAvKipcbiAgICogVW5iaW5kIGFuY2hvcnMgaW5zaWRlIHNsaWRlczpcbiAgICogLSBvbiBkZXN0cm95aW5nLCB0byBicmluZyBhbmNob3JzIHRvIGl0cyBpbml0aWFsIHN0YXRlXG4gICAqL1xuICBFdmVudHMub24oJ2Rlc3Ryb3knLCBmdW5jdGlvbiAoKSB7XG4gICAgQW5jaG9ycy5hdHRhY2goKTtcbiAgICBBbmNob3JzLnVuYmluZCgpO1xuICAgIEJpbmRlci5kZXN0cm95KCk7XG4gIH0pO1xuXG4gIHJldHVybiBBbmNob3JzO1xufVxuXG52YXIgTkFWX1NFTEVDVE9SID0gJ1tkYXRhLWdsaWRlLWVsPVwiY29udHJvbHNbbmF2XVwiXSc7XG52YXIgQ09OVFJPTFNfU0VMRUNUT1IgPSAnW2RhdGEtZ2xpZGUtZWxePVwiY29udHJvbHNcIl0nO1xuXG5mdW5jdGlvbiBDb250cm9scyAoR2xpZGUsIENvbXBvbmVudHMsIEV2ZW50cykge1xuICAvKipcbiAgICogSW5zdGFuY2Ugb2YgdGhlIGJpbmRlciBmb3IgRE9NIEV2ZW50cy5cbiAgICpcbiAgICogQHR5cGUge0V2ZW50c0JpbmRlcn1cbiAgICovXG4gIHZhciBCaW5kZXIgPSBuZXcgRXZlbnRzQmluZGVyKCk7XG5cbiAgdmFyIGNhcHR1cmUgPSBzdXBwb3J0c1Bhc3NpdmUkMSA/IHsgcGFzc2l2ZTogdHJ1ZSB9IDogZmFsc2U7XG5cbiAgdmFyIENvbnRyb2xzID0ge1xuICAgIC8qKlxuICAgICAqIEluaXRzIGFycm93cy4gQmluZHMgZXZlbnRzIGxpc3RlbmVyc1xuICAgICAqIHRvIHRoZSBhcnJvd3MgSFRNTCBlbGVtZW50cy5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgbW91bnQ6IGZ1bmN0aW9uIG1vdW50KCkge1xuICAgICAgLyoqXG4gICAgICAgKiBDb2xsZWN0aW9uIG9mIG5hdmlnYXRpb24gSFRNTCBlbGVtZW50cy5cbiAgICAgICAqXG4gICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICogQHR5cGUge0hUTUxDb2xsZWN0aW9ufVxuICAgICAgICovXG4gICAgICB0aGlzLl9uID0gQ29tcG9uZW50cy5IdG1sLnJvb3QucXVlcnlTZWxlY3RvckFsbChOQVZfU0VMRUNUT1IpO1xuXG4gICAgICAvKipcbiAgICAgICAqIENvbGxlY3Rpb24gb2YgY29udHJvbHMgSFRNTCBlbGVtZW50cy5cbiAgICAgICAqXG4gICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICogQHR5cGUge0hUTUxDb2xsZWN0aW9ufVxuICAgICAgICovXG4gICAgICB0aGlzLl9jID0gQ29tcG9uZW50cy5IdG1sLnJvb3QucXVlcnlTZWxlY3RvckFsbChDT05UUk9MU19TRUxFQ1RPUik7XG5cbiAgICAgIHRoaXMuYWRkQmluZGluZ3MoKTtcbiAgICB9LFxuXG5cbiAgICAvKipcbiAgICAgKiBTZXRzIGFjdGl2ZSBjbGFzcyB0byBjdXJyZW50IHNsaWRlLlxuICAgICAqXG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICBzZXRBY3RpdmU6IGZ1bmN0aW9uIHNldEFjdGl2ZSgpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5fbi5sZW5ndGg7IGkrKykge1xuICAgICAgICB0aGlzLmFkZENsYXNzKHRoaXMuX25baV0uY2hpbGRyZW4pO1xuICAgICAgfVxuICAgIH0sXG5cblxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgYWN0aXZlIGNsYXNzIHRvIGN1cnJlbnQgc2xpZGUuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIHJlbW92ZUFjdGl2ZTogZnVuY3Rpb24gcmVtb3ZlQWN0aXZlKCkge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLl9uLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlQ2xhc3ModGhpcy5fbltpXS5jaGlsZHJlbik7XG4gICAgICB9XG4gICAgfSxcblxuXG4gICAgLyoqXG4gICAgICogVG9nZ2xlcyBhY3RpdmUgY2xhc3Mgb24gaXRlbXMgaW5zaWRlIG5hdmlnYXRpb24uXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtIVE1MRWxlbWVudH0gY29udHJvbHNcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIGFkZENsYXNzOiBmdW5jdGlvbiBhZGRDbGFzcyhjb250cm9scykge1xuICAgICAgdmFyIHNldHRpbmdzID0gR2xpZGUuc2V0dGluZ3M7XG4gICAgICB2YXIgaXRlbSA9IGNvbnRyb2xzW0dsaWRlLmluZGV4XTtcblxuICAgICAgaWYgKGl0ZW0pIHtcbiAgICAgICAgaXRlbS5jbGFzc0xpc3QuYWRkKHNldHRpbmdzLmNsYXNzZXMuYWN0aXZlTmF2KTtcblxuICAgICAgICBzaWJsaW5ncyhpdGVtKS5mb3JFYWNoKGZ1bmN0aW9uIChzaWJsaW5nKSB7XG4gICAgICAgICAgc2libGluZy5jbGFzc0xpc3QucmVtb3ZlKHNldHRpbmdzLmNsYXNzZXMuYWN0aXZlTmF2KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSxcblxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyBhY3RpdmUgY2xhc3MgZnJvbSBhY3RpdmUgY29udHJvbC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAge0hUTUxFbGVtZW50fSBjb250cm9sc1xuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgcmVtb3ZlQ2xhc3M6IGZ1bmN0aW9uIHJlbW92ZUNsYXNzKGNvbnRyb2xzKSB7XG4gICAgICB2YXIgaXRlbSA9IGNvbnRyb2xzW0dsaWRlLmluZGV4XTtcblxuICAgICAgaWYgKGl0ZW0pIHtcbiAgICAgICAgaXRlbS5jbGFzc0xpc3QucmVtb3ZlKEdsaWRlLnNldHRpbmdzLmNsYXNzZXMuYWN0aXZlTmF2KTtcbiAgICAgIH1cbiAgICB9LFxuXG5cbiAgICAvKipcbiAgICAgKiBBZGRzIGhhbmRsZXMgdG8gdGhlIGVhY2ggZ3JvdXAgb2YgY29udHJvbHMuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIGFkZEJpbmRpbmdzOiBmdW5jdGlvbiBhZGRCaW5kaW5ncygpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5fYy5sZW5ndGg7IGkrKykge1xuICAgICAgICB0aGlzLmJpbmQodGhpcy5fY1tpXS5jaGlsZHJlbik7XG4gICAgICB9XG4gICAgfSxcblxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyBoYW5kbGVzIGZyb20gdGhlIGVhY2ggZ3JvdXAgb2YgY29udHJvbHMuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIHJlbW92ZUJpbmRpbmdzOiBmdW5jdGlvbiByZW1vdmVCaW5kaW5ncygpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5fYy5sZW5ndGg7IGkrKykge1xuICAgICAgICB0aGlzLnVuYmluZCh0aGlzLl9jW2ldLmNoaWxkcmVuKTtcbiAgICAgIH1cbiAgICB9LFxuXG5cbiAgICAvKipcbiAgICAgKiBCaW5kcyBldmVudHMgdG8gYXJyb3dzIEhUTUwgZWxlbWVudHMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0hUTUxDb2xsZWN0aW9ufSBlbGVtZW50c1xuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgYmluZDogZnVuY3Rpb24gYmluZChlbGVtZW50cykge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBlbGVtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICBCaW5kZXIub24oJ2NsaWNrJywgZWxlbWVudHNbaV0sIHRoaXMuY2xpY2spO1xuICAgICAgICBCaW5kZXIub24oJ3RvdWNoc3RhcnQnLCBlbGVtZW50c1tpXSwgdGhpcy5jbGljaywgY2FwdHVyZSk7XG4gICAgICB9XG4gICAgfSxcblxuXG4gICAgLyoqXG4gICAgICogVW5iaW5kcyBldmVudHMgYmluZGVkIHRvIHRoZSBhcnJvd3MgSFRNTCBlbGVtZW50cy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7SFRNTENvbGxlY3Rpb259IGVsZW1lbnRzXG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICB1bmJpbmQ6IGZ1bmN0aW9uIHVuYmluZChlbGVtZW50cykge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBlbGVtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICBCaW5kZXIub2ZmKFsnY2xpY2snLCAndG91Y2hzdGFydCddLCBlbGVtZW50c1tpXSk7XG4gICAgICB9XG4gICAgfSxcblxuXG4gICAgLyoqXG4gICAgICogSGFuZGxlcyBgY2xpY2tgIGV2ZW50IG9uIHRoZSBhcnJvd3MgSFRNTCBlbGVtZW50cy5cbiAgICAgKiBNb3ZlcyBzbGlkZXIgaW4gZHJpZWN0aW9uIHByZWNpc2VkIGluXG4gICAgICogYGRhdGEtZ2xpZGUtZGlyYCBhdHRyaWJ1dGUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZXZlbnRcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIGNsaWNrOiBmdW5jdGlvbiBjbGljayhldmVudCkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgQ29tcG9uZW50cy5SdW4ubWFrZShDb21wb25lbnRzLkRpcmVjdGlvbi5yZXNvbHZlKGV2ZW50LmN1cnJlbnRUYXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLWdsaWRlLWRpcicpKSk7XG4gICAgfVxuICB9O1xuXG4gIGRlZmluZShDb250cm9scywgJ2l0ZW1zJywge1xuICAgIC8qKlxuICAgICAqIEdldHMgY29sbGVjdGlvbiBvZiB0aGUgY29udHJvbHMgSFRNTCBlbGVtZW50cy5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge0hUTUxFbGVtZW50W119XG4gICAgICovXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gQ29udHJvbHMuX2M7XG4gICAgfVxuICB9KTtcblxuICAvKipcbiAgICogU3dhcCBhY3RpdmUgY2xhc3Mgb2YgY3VycmVudCBuYXZpZ2F0aW9uIGl0ZW06XG4gICAqIC0gYWZ0ZXIgbW91bnRpbmcgdG8gc2V0IGl0IHRvIGluaXRpYWwgaW5kZXhcbiAgICogLSBhZnRlciBlYWNoIG1vdmUgdG8gdGhlIG5ldyBpbmRleFxuICAgKi9cbiAgRXZlbnRzLm9uKFsnbW91bnQuYWZ0ZXInLCAnbW92ZS5hZnRlciddLCBmdW5jdGlvbiAoKSB7XG4gICAgQ29udHJvbHMuc2V0QWN0aXZlKCk7XG4gIH0pO1xuXG4gIC8qKlxuICAgKiBSZW1vdmUgYmluZGluZ3MgYW5kIEhUTUwgQ2xhc3NlczpcbiAgICogLSBvbiBkZXN0cm95aW5nLCB0byBicmluZyBtYXJrdXAgdG8gaXRzIGluaXRpYWwgc3RhdGVcbiAgICovXG4gIEV2ZW50cy5vbignZGVzdHJveScsIGZ1bmN0aW9uICgpIHtcbiAgICBDb250cm9scy5yZW1vdmVCaW5kaW5ncygpO1xuICAgIENvbnRyb2xzLnJlbW92ZUFjdGl2ZSgpO1xuICAgIEJpbmRlci5kZXN0cm95KCk7XG4gIH0pO1xuXG4gIHJldHVybiBDb250cm9scztcbn1cblxuZnVuY3Rpb24gS2V5Ym9hcmQgKEdsaWRlLCBDb21wb25lbnRzLCBFdmVudHMpIHtcbiAgLyoqXG4gICAqIEluc3RhbmNlIG9mIHRoZSBiaW5kZXIgZm9yIERPTSBFdmVudHMuXG4gICAqXG4gICAqIEB0eXBlIHtFdmVudHNCaW5kZXJ9XG4gICAqL1xuICB2YXIgQmluZGVyID0gbmV3IEV2ZW50c0JpbmRlcigpO1xuXG4gIHZhciBLZXlib2FyZCA9IHtcbiAgICAvKipcbiAgICAgKiBCaW5kcyBrZXlib2FyZCBldmVudHMgb24gY29tcG9uZW50IG1vdW50LlxuICAgICAqXG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICBtb3VudDogZnVuY3Rpb24gbW91bnQoKSB7XG4gICAgICBpZiAoR2xpZGUuc2V0dGluZ3Mua2V5Ym9hcmQpIHtcbiAgICAgICAgdGhpcy5iaW5kKCk7XG4gICAgICB9XG4gICAgfSxcblxuXG4gICAgLyoqXG4gICAgICogQWRkcyBrZXlib2FyZCBwcmVzcyBldmVudHMuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIGJpbmQ6IGZ1bmN0aW9uIGJpbmQoKSB7XG4gICAgICBCaW5kZXIub24oJ2tleXVwJywgZG9jdW1lbnQsIHRoaXMucHJlc3MpO1xuICAgIH0sXG5cblxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMga2V5Ym9hcmQgcHJlc3MgZXZlbnRzLlxuICAgICAqXG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICB1bmJpbmQ6IGZ1bmN0aW9uIHVuYmluZCgpIHtcbiAgICAgIEJpbmRlci5vZmYoJ2tleXVwJywgZG9jdW1lbnQpO1xuICAgIH0sXG5cblxuICAgIC8qKlxuICAgICAqIEhhbmRsZXMga2V5Ym9hcmQncyBhcnJvd3MgcHJlc3MgYW5kIG1vdmluZyBnbGlkZSBmb3dhcmQgYW5kIGJhY2t3YXJkLlxuICAgICAqXG4gICAgICogQHBhcmFtICB7T2JqZWN0fSBldmVudFxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgcHJlc3M6IGZ1bmN0aW9uIHByZXNzKGV2ZW50KSB7XG4gICAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gMzkpIHtcbiAgICAgICAgQ29tcG9uZW50cy5SdW4ubWFrZShDb21wb25lbnRzLkRpcmVjdGlvbi5yZXNvbHZlKCc+JykpO1xuICAgICAgfVxuXG4gICAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gMzcpIHtcbiAgICAgICAgQ29tcG9uZW50cy5SdW4ubWFrZShDb21wb25lbnRzLkRpcmVjdGlvbi5yZXNvbHZlKCc8JykpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogUmVtb3ZlIGJpbmRpbmdzIGZyb20ga2V5Ym9hcmQ6XG4gICAqIC0gb24gZGVzdHJveWluZyB0byByZW1vdmUgYWRkZWQgZXZlbnRzXG4gICAqIC0gb24gdXBkYXRpbmcgdG8gcmVtb3ZlIGV2ZW50cyBiZWZvcmUgcmVtb3VudGluZ1xuICAgKi9cbiAgRXZlbnRzLm9uKFsnZGVzdHJveScsICd1cGRhdGUnXSwgZnVuY3Rpb24gKCkge1xuICAgIEtleWJvYXJkLnVuYmluZCgpO1xuICB9KTtcblxuICAvKipcbiAgICogUmVtb3VudCBjb21wb25lbnRcbiAgICogLSBvbiB1cGRhdGluZyB0byByZWZsZWN0IHBvdGVudGlhbCBjaGFuZ2VzIGluIHNldHRpbmdzXG4gICAqL1xuICBFdmVudHMub24oJ3VwZGF0ZScsIGZ1bmN0aW9uICgpIHtcbiAgICBLZXlib2FyZC5tb3VudCgpO1xuICB9KTtcblxuICAvKipcbiAgICogRGVzdHJveSBiaW5kZXI6XG4gICAqIC0gb24gZGVzdHJveWluZyB0byByZW1vdmUgbGlzdGVuZXJzXG4gICAqL1xuICBFdmVudHMub24oJ2Rlc3Ryb3knLCBmdW5jdGlvbiAoKSB7XG4gICAgQmluZGVyLmRlc3Ryb3koKTtcbiAgfSk7XG5cbiAgcmV0dXJuIEtleWJvYXJkO1xufVxuXG5mdW5jdGlvbiBBdXRvcGxheSAoR2xpZGUsIENvbXBvbmVudHMsIEV2ZW50cykge1xuICAvKipcbiAgICogSW5zdGFuY2Ugb2YgdGhlIGJpbmRlciBmb3IgRE9NIEV2ZW50cy5cbiAgICpcbiAgICogQHR5cGUge0V2ZW50c0JpbmRlcn1cbiAgICovXG4gIHZhciBCaW5kZXIgPSBuZXcgRXZlbnRzQmluZGVyKCk7XG5cbiAgdmFyIEF1dG9wbGF5ID0ge1xuICAgIC8qKlxuICAgICAqIEluaXRpYWxpemVzIGF1dG9wbGF5aW5nIGFuZCBldmVudHMuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIG1vdW50OiBmdW5jdGlvbiBtb3VudCgpIHtcbiAgICAgIHRoaXMuc3RhcnQoKTtcblxuICAgICAgaWYgKEdsaWRlLnNldHRpbmdzLmhvdmVycGF1c2UpIHtcbiAgICAgICAgdGhpcy5iaW5kKCk7XG4gICAgICB9XG4gICAgfSxcblxuXG4gICAgLyoqXG4gICAgICogU3RhcnRzIGF1dG9wbGF5aW5nIGluIGNvbmZpZ3VyZWQgaW50ZXJ2YWwuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW58TnVtYmVyfSBmb3JjZSBSdW4gYXV0b3BsYXlpbmcgd2l0aCBwYXNzZWQgaW50ZXJ2YWwgcmVnYXJkbGVzcyBvZiBgYXV0b3BsYXlgIHNldHRpbmdzXG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICBzdGFydDogZnVuY3Rpb24gc3RhcnQoKSB7XG4gICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgICBpZiAoR2xpZGUuc2V0dGluZ3MuYXV0b3BsYXkpIHtcbiAgICAgICAgaWYgKGlzVW5kZWZpbmVkKHRoaXMuX2kpKSB7XG4gICAgICAgICAgdGhpcy5faSA9IHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIF90aGlzLnN0b3AoKTtcblxuICAgICAgICAgICAgQ29tcG9uZW50cy5SdW4ubWFrZSgnPicpO1xuXG4gICAgICAgICAgICBfdGhpcy5zdGFydCgpO1xuICAgICAgICAgIH0sIHRoaXMudGltZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG5cbiAgICAvKipcbiAgICAgKiBTdG9wcyBhdXRvcnVubmluZyBvZiB0aGUgZ2xpZGUuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIHN0b3A6IGZ1bmN0aW9uIHN0b3AoKSB7XG4gICAgICB0aGlzLl9pID0gY2xlYXJJbnRlcnZhbCh0aGlzLl9pKTtcbiAgICB9LFxuXG5cbiAgICAvKipcbiAgICAgKiBTdG9wcyBhdXRvcGxheWluZyB3aGlsZSBtb3VzZSBpcyBvdmVyIGdsaWRlJ3MgYXJlYS5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgYmluZDogZnVuY3Rpb24gYmluZCgpIHtcbiAgICAgIHZhciBfdGhpczIgPSB0aGlzO1xuXG4gICAgICBCaW5kZXIub24oJ21vdXNlb3ZlcicsIENvbXBvbmVudHMuSHRtbC5yb290LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIF90aGlzMi5zdG9wKCk7XG4gICAgICB9KTtcblxuICAgICAgQmluZGVyLm9uKCdtb3VzZW91dCcsIENvbXBvbmVudHMuSHRtbC5yb290LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIF90aGlzMi5zdGFydCgpO1xuICAgICAgfSk7XG4gICAgfSxcblxuXG4gICAgLyoqXG4gICAgICogVW5iaW5kIG1vdXNlb3ZlciBldmVudHMuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7Vm9pZH1cbiAgICAgKi9cbiAgICB1bmJpbmQ6IGZ1bmN0aW9uIHVuYmluZCgpIHtcbiAgICAgIEJpbmRlci5vZmYoWydtb3VzZW92ZXInLCAnbW91c2VvdXQnXSwgQ29tcG9uZW50cy5IdG1sLnJvb3QpO1xuICAgIH1cbiAgfTtcblxuICBkZWZpbmUoQXV0b3BsYXksICd0aW1lJywge1xuICAgIC8qKlxuICAgICAqIEdldHMgdGltZSBwZXJpb2QgdmFsdWUgZm9yIHRoZSBhdXRvcGxheSBpbnRlcnZhbC4gUHJpb3JpdGl6ZXNcbiAgICAgKiB0aW1lcyBpbiBgZGF0YS1nbGlkZS1hdXRvcGxheWAgYXR0cnVidXRlcyBvdmVyIG9wdGlvbnMuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9XG4gICAgICovXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICB2YXIgYXV0b3BsYXkgPSBDb21wb25lbnRzLkh0bWwuc2xpZGVzW0dsaWRlLmluZGV4XS5nZXRBdHRyaWJ1dGUoJ2RhdGEtZ2xpZGUtYXV0b3BsYXknKTtcblxuICAgICAgaWYgKGF1dG9wbGF5KSB7XG4gICAgICAgIHJldHVybiB0b0ludChhdXRvcGxheSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0b0ludChHbGlkZS5zZXR0aW5ncy5hdXRvcGxheSk7XG4gICAgfVxuICB9KTtcblxuICAvKipcbiAgICogU3RvcCBhdXRvcGxheWluZyBhbmQgdW5iaW5kIGV2ZW50czpcbiAgICogLSBvbiBkZXN0cm95aW5nLCB0byBjbGVhciBkZWZpbmVkIGludGVydmFsXG4gICAqIC0gb24gdXBkYXRpbmcgdmlhIEFQSSB0byByZXNldCBpbnRlcnZhbCB0aGF0IG1heSBjaGFuZ2VkXG4gICAqL1xuICBFdmVudHMub24oWydkZXN0cm95JywgJ3VwZGF0ZSddLCBmdW5jdGlvbiAoKSB7XG4gICAgQXV0b3BsYXkudW5iaW5kKCk7XG4gIH0pO1xuXG4gIC8qKlxuICAgKiBTdG9wIGF1dG9wbGF5aW5nOlxuICAgKiAtIGJlZm9yZSBlYWNoIHJ1biwgdG8gcmVzdGFydCBhdXRvcGxheWluZ1xuICAgKiAtIG9uIHBhdXNpbmcgdmlhIEFQSVxuICAgKiAtIG9uIGRlc3Ryb3lpbmcsIHRvIGNsZWFyIGRlZmluZWQgaW50ZXJ2YWxcbiAgICogLSB3aGlsZSBzdGFydGluZyBhIHN3aXBlXG4gICAqIC0gb24gdXBkYXRpbmcgdmlhIEFQSSB0byByZXNldCBpbnRlcnZhbCB0aGF0IG1heSBjaGFuZ2VkXG4gICAqL1xuICBFdmVudHMub24oWydydW4uYmVmb3JlJywgJ3BhdXNlJywgJ2Rlc3Ryb3knLCAnc3dpcGUuc3RhcnQnLCAndXBkYXRlJ10sIGZ1bmN0aW9uICgpIHtcbiAgICBBdXRvcGxheS5zdG9wKCk7XG4gIH0pO1xuXG4gIC8qKlxuICAgKiBTdGFydCBhdXRvcGxheWluZzpcbiAgICogLSBhZnRlciBlYWNoIHJ1biwgdG8gcmVzdGFydCBhdXRvcGxheWluZ1xuICAgKiAtIG9uIHBsYXlpbmcgdmlhIEFQSVxuICAgKiAtIHdoaWxlIGVuZGluZyBhIHN3aXBlXG4gICAqL1xuICBFdmVudHMub24oWydydW4uYWZ0ZXInLCAncGxheScsICdzd2lwZS5lbmQnXSwgZnVuY3Rpb24gKCkge1xuICAgIEF1dG9wbGF5LnN0YXJ0KCk7XG4gIH0pO1xuXG4gIC8qKlxuICAgKiBSZW1vdW50IGF1dG9wbGF5aW5nOlxuICAgKiAtIG9uIHVwZGF0aW5nIHZpYSBBUEkgdG8gcmVzZXQgaW50ZXJ2YWwgdGhhdCBtYXkgY2hhbmdlZFxuICAgKi9cbiAgRXZlbnRzLm9uKCd1cGRhdGUnLCBmdW5jdGlvbiAoKSB7XG4gICAgQXV0b3BsYXkubW91bnQoKTtcbiAgfSk7XG5cbiAgLyoqXG4gICAqIERlc3Ryb3kgYSBiaW5kZXI6XG4gICAqIC0gb24gZGVzdHJveWluZyBnbGlkZSBpbnN0YW5jZSB0byBjbGVhcnVwIGxpc3RlbmVyc1xuICAgKi9cbiAgRXZlbnRzLm9uKCdkZXN0cm95JywgZnVuY3Rpb24gKCkge1xuICAgIEJpbmRlci5kZXN0cm95KCk7XG4gIH0pO1xuXG4gIHJldHVybiBBdXRvcGxheTtcbn1cblxuLyoqXG4gKiBTb3J0cyBrZXlzIG9mIGJyZWFrcG9pbnQgb2JqZWN0IHNvIHRoZXkgd2lsbCBiZSBvcmRlcmVkIGZyb20gbG93ZXIgdG8gYmlnZ2VyLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBwb2ludHNcbiAqIEByZXR1cm5zIHtPYmplY3R9XG4gKi9cbmZ1bmN0aW9uIHNvcnRCcmVha3BvaW50cyhwb2ludHMpIHtcbiAgaWYgKGlzT2JqZWN0KHBvaW50cykpIHtcbiAgICByZXR1cm4gc29ydEtleXMocG9pbnRzKTtcbiAgfSBlbHNlIHtcbiAgICB3YXJuKCdCcmVha3BvaW50cyBvcHRpb24gbXVzdCBiZSBhbiBvYmplY3QnKTtcbiAgfVxuXG4gIHJldHVybiB7fTtcbn1cblxuZnVuY3Rpb24gQnJlYWtwb2ludHMgKEdsaWRlLCBDb21wb25lbnRzLCBFdmVudHMpIHtcbiAgLyoqXG4gICAqIEluc3RhbmNlIG9mIHRoZSBiaW5kZXIgZm9yIERPTSBFdmVudHMuXG4gICAqXG4gICAqIEB0eXBlIHtFdmVudHNCaW5kZXJ9XG4gICAqL1xuICB2YXIgQmluZGVyID0gbmV3IEV2ZW50c0JpbmRlcigpO1xuXG4gIC8qKlxuICAgKiBIb2xkcyByZWZlcmVuY2UgdG8gc2V0dGluZ3MuXG4gICAqXG4gICAqIEB0eXBlIHtPYmplY3R9XG4gICAqL1xuICB2YXIgc2V0dGluZ3MgPSBHbGlkZS5zZXR0aW5ncztcblxuICAvKipcbiAgICogSG9sZHMgcmVmZXJlbmNlIHRvIGJyZWFrcG9pbnRzIG9iamVjdCBpbiBzZXR0aW5ncy4gU29ydHMgYnJlYWtwb2ludHNcbiAgICogZnJvbSBzbWFsbGVyIHRvIGxhcmdlci4gSXQgaXMgcmVxdWlyZWQgaW4gb3JkZXIgdG8gcHJvcGVyXG4gICAqIG1hdGNoaW5nIGN1cnJlbnRseSBhY3RpdmUgYnJlYWtwb2ludCBzZXR0aW5ncy5cbiAgICpcbiAgICogQHR5cGUge09iamVjdH1cbiAgICovXG4gIHZhciBwb2ludHMgPSBzb3J0QnJlYWtwb2ludHMoc2V0dGluZ3MuYnJlYWtwb2ludHMpO1xuXG4gIC8qKlxuICAgKiBDYWNoZSBpbml0aWFsIHNldHRpbmdzIGJlZm9yZSBvdmVyd3JpdHRpbmcuXG4gICAqXG4gICAqIEB0eXBlIHtPYmplY3R9XG4gICAqL1xuICB2YXIgZGVmYXVsdHMgPSBfZXh0ZW5kcyh7fSwgc2V0dGluZ3MpO1xuXG4gIHZhciBCcmVha3BvaW50cyA9IHtcbiAgICAvKipcbiAgICAgKiBNYXRjaGVzIHNldHRpbmdzIGZvciBjdXJyZWN0bHkgbWF0Y2hpbmcgbWVkaWEgYnJlYWtwb2ludC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBwb2ludHNcbiAgICAgKiBAcmV0dXJucyB7T2JqZWN0fVxuICAgICAqL1xuICAgIG1hdGNoOiBmdW5jdGlvbiBtYXRjaChwb2ludHMpIHtcbiAgICAgIGlmICh0eXBlb2Ygd2luZG93Lm1hdGNoTWVkaWEgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIGZvciAodmFyIHBvaW50IGluIHBvaW50cykge1xuICAgICAgICAgIGlmIChwb2ludHMuaGFzT3duUHJvcGVydHkocG9pbnQpKSB7XG4gICAgICAgICAgICBpZiAod2luZG93Lm1hdGNoTWVkaWEoJyhtYXgtd2lkdGg6ICcgKyBwb2ludCArICdweCknKS5tYXRjaGVzKSB7XG4gICAgICAgICAgICAgIHJldHVybiBwb2ludHNbcG9pbnRdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gZGVmYXVsdHM7XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBPdmVyd3JpdGUgaW5zdGFuY2Ugc2V0dGluZ3Mgd2l0aCBjdXJyZW50bHkgbWF0Y2hpbmcgYnJlYWtwb2ludCBzZXR0aW5ncy5cbiAgICogVGhpcyBoYXBwZW5zIHJpZ2h0IGFmdGVyIGNvbXBvbmVudCBpbml0aWFsaXphdGlvbi5cbiAgICovXG4gIF9leHRlbmRzKHNldHRpbmdzLCBCcmVha3BvaW50cy5tYXRjaChwb2ludHMpKTtcblxuICAvKipcbiAgICogVXBkYXRlIGdsaWRlIHdpdGggc2V0dGluZ3Mgb2YgbWF0Y2hlZCBicmVrcG9pbnQ6XG4gICAqIC0gd2luZG93IHJlc2l6ZSB0byB1cGRhdGUgc2xpZGVyXG4gICAqL1xuICBCaW5kZXIub24oJ3Jlc2l6ZScsIHdpbmRvdywgdGhyb3R0bGUoZnVuY3Rpb24gKCkge1xuICAgIEdsaWRlLnNldHRpbmdzID0gbWVyZ2VPcHRpb25zKHNldHRpbmdzLCBCcmVha3BvaW50cy5tYXRjaChwb2ludHMpKTtcbiAgfSwgR2xpZGUuc2V0dGluZ3MudGhyb3R0bGUpKTtcblxuICAvKipcbiAgICogUmVzb3J0IGFuZCB1cGRhdGUgZGVmYXVsdCBzZXR0aW5nczpcbiAgICogLSBvbiByZWluaXQgdmlhIEFQSSwgc28gYnJlYWtwb2ludCBtYXRjaGluZyB3aWxsIGJlIHBlcmZvcm1lZCB3aXRoIG9wdGlvbnNcbiAgICovXG4gIEV2ZW50cy5vbigndXBkYXRlJywgZnVuY3Rpb24gKCkge1xuICAgIHBvaW50cyA9IHNvcnRCcmVha3BvaW50cyhwb2ludHMpO1xuXG4gICAgZGVmYXVsdHMgPSBfZXh0ZW5kcyh7fSwgc2V0dGluZ3MpO1xuICB9KTtcblxuICAvKipcbiAgICogVW5iaW5kIHJlc2l6ZSBsaXN0ZW5lcjpcbiAgICogLSBvbiBkZXN0cm95aW5nLCB0byBicmluZyBtYXJrdXAgdG8gaXRzIGluaXRpYWwgc3RhdGVcbiAgICovXG4gIEV2ZW50cy5vbignZGVzdHJveScsIGZ1bmN0aW9uICgpIHtcbiAgICBCaW5kZXIub2ZmKCdyZXNpemUnLCB3aW5kb3cpO1xuICB9KTtcblxuICByZXR1cm4gQnJlYWtwb2ludHM7XG59XG5cbnZhciBDT01QT05FTlRTID0ge1xuICAvLyBSZXF1aXJlZFxuICBIdG1sOiBIdG1sLFxuICBUcmFuc2xhdGU6IFRyYW5zbGF0ZSxcbiAgVHJhbnNpdGlvbjogVHJhbnNpdGlvbixcbiAgRGlyZWN0aW9uOiBEaXJlY3Rpb24sXG4gIFBlZWs6IFBlZWssXG4gIFNpemVzOiBTaXplcyxcbiAgR2FwczogR2FwcyxcbiAgTW92ZTogTW92ZSxcbiAgQ2xvbmVzOiBDbG9uZXMsXG4gIFJlc2l6ZTogUmVzaXplLFxuICBCdWlsZDogQnVpbGQsXG4gIFJ1bjogUnVuLFxuXG4gIC8vIE9wdGlvbmFsXG4gIFN3aXBlOiBTd2lwZSxcbiAgSW1hZ2VzOiBJbWFnZXMsXG4gIEFuY2hvcnM6IEFuY2hvcnMsXG4gIENvbnRyb2xzOiBDb250cm9scyxcbiAgS2V5Ym9hcmQ6IEtleWJvYXJkLFxuICBBdXRvcGxheTogQXV0b3BsYXksXG4gIEJyZWFrcG9pbnRzOiBCcmVha3BvaW50c1xufTtcblxudmFyIEdsaWRlJDEgPSBmdW5jdGlvbiAoX0NvcmUpIHtcbiAgaW5oZXJpdHMoR2xpZGUkJDEsIF9Db3JlKTtcblxuICBmdW5jdGlvbiBHbGlkZSQkMSgpIHtcbiAgICBjbGFzc0NhbGxDaGVjayh0aGlzLCBHbGlkZSQkMSk7XG4gICAgcmV0dXJuIHBvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgKEdsaWRlJCQxLl9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoR2xpZGUkJDEpKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgfVxuXG4gIGNyZWF0ZUNsYXNzKEdsaWRlJCQxLCBbe1xuICAgIGtleTogJ21vdW50JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gbW91bnQoKSB7XG4gICAgICB2YXIgZXh0ZW5zaW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDoge307XG5cbiAgICAgIHJldHVybiBnZXQoR2xpZGUkJDEucHJvdG90eXBlLl9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoR2xpZGUkJDEucHJvdG90eXBlKSwgJ21vdW50JywgdGhpcykuY2FsbCh0aGlzLCBfZXh0ZW5kcyh7fSwgQ09NUE9ORU5UUywgZXh0ZW5zaW9ucykpO1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gR2xpZGUkJDE7XG59KEdsaWRlKTtcblxuZXhwb3J0IGRlZmF1bHQgR2xpZGUkMTtcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5pbXBvcnQgeyB1c2VCdXJnZXJNZW51IH0gZnJvbSBcIi4vc2NyaXB0cy9idXJnZXJcIjtcclxuaW1wb3J0IHsgc2xvd1ZpZGVvIH0gZnJvbSBcIi4vc2NyaXB0cy92aWRlb1wiO1xyXG5pbXBvcnQgeyBjaGFuZ2VCRyB9IGZyb20gXCIuL3NjcmlwdHMvYmdcIjtcclxuaW1wb3J0IHsgZ2V0UmVzcG9uc2UgfSBmcm9tIFwiLi9zY3JpcHRzL2FwaVwiO1xyXG5cclxuc2xvd1ZpZGVvKCk7XHJcbnVzZUJ1cmdlck1lbnUoKTtcclxuY2hhbmdlQkcoKTtcclxuZ2V0UmVzcG9uc2UoKTtcclxuXHJcbmltcG9ydCBHbGlkZSBmcm9tIFwiQGdsaWRlanMvZ2xpZGVcIjtcclxuY29uc3QgY29uZmlnID0ge1xyXG4gIHR5cGU6IFwiY2Fyb3VzZWxcIixcclxufTtcclxubmV3IEdsaWRlKFwiLmdsaWRlXCIsIGNvbmZpZykubW91bnQoKTtcclxuIl0sIm5hbWVzIjpbInVzZUJ1cmdlck1lbnUiLCIkYnVyZ2VyQnRuIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsIiRidXJnZXJTdHJpcGVzIiwiY2hpbGRyZW4iLCIkYnVyZ2VyTWVudSIsIiRmaXJzdFN0cmlwZSIsIiRzZWNvbmRTdHJpcGUiLCIkdGhpcmRTdHJpcGUiLCIkYnVyZ2VyTWVudUxpc3RJdGVtcyIsInRvcENvdW50ZXIiLCJyaWdodENvdW50ZXIiLCJjb3VudCIsImNoYW5nZVZpc2liaWxpdHlUb2hpZGRlbiIsInN0eWxlIiwiZGlzcGxheSIsImNoYW5nZVZpc2liaWxpdHlUb1Zpc2libGUiLCJyZXR1cm5EaXJlY3Rpb24iLCJ0b3AiLCJyaWdodCIsIm1vdmVUb3AiLCJzZXRUaW1lb3V0IiwiYW5pbWF0ZU1lbnVCYWNrIiwiYW5pbWF0ZU1lbnVGb3J3YXJkIiwicmVtb3ZlU3RyaXBlc0NoYW5nZXMiLCJjbGFzc0xpc3QiLCJyZW1vdmUiLCJhZGRTdHJpcGVDaGFuZ2VzIiwiYWRkIiwidXNlQnVyZ2VyIiwiYWRkRXZlbnRMaXN0ZW5lciIsImV2ZW50IiwidGFyZ2V0Iiwic2xvd1ZpZGVvIiwicGxheWVyIiwicGxheWJhY2tSYXRlIiwiY2hhbmdlQkciLCIkYnV0dG9uU3VubnkiLCIkYnV0dG9uUmFpbnkiLCIkYnV0dG9uRm9nZ3kiLCIkYnV0dG9uVGh1bmRlciIsIiR2aWRlb1NvdXJjZSIsIiR2aWRlbyIsInNyYyIsInBvc3RlciIsInNob3dXZWF0aGVySW5mbyIsImRhdGEiLCIkY2l0eU5hbWUiLCJjaXR5TmFtZSIsIm5hbWUiLCJjaXR5Q291bnRyeSIsInN5cyIsImNvdW50cnkiLCIkdGVtcGVyYXR1cmUiLCJjdXJyZW50VGVtcCIsIk1hdGgiLCJyb3VuZCIsIm1haW4iLCJ0ZW1wIiwiJGh1bWlkaXR5SW5mbyIsImh1bWlkaXR5IiwiJHByZXNzdXJlSW5mbyIsInByZXNzdXJlIiwiY3VycmVudFdlYXRoZXIiLCJ3ZWF0aGVyIiwiJHdpbmREaXJJbmZvIiwid2luZERpcmVjdGlvbiIsIndpbmQiLCJkZWciLCIkd2luZFNwZWVkSW5mbyIsIndpbmRTcGVlZCIsInNwZWVkIiwiJHdlYXRoZXJJY29uQmlnIiwiaWNvbiIsImlubmVyVGV4dCIsInVuZGVmaW5lZCIsImlubmVySFRNTCIsInNldEF0dHJpYnV0ZSIsInNob3dXZWF0aGVySG91cmx5SW5mbyIsIiRkYXRlVGltZUZpcnN0IiwibGlzdCIsImR0X3R4dCIsIiRob3VybHlIdW1pZGl0eUZpcnN0IiwiJGhvdXJseVByZXNzdXJlRmlyc3QiLCIkaG91cmx5V2RpckZpcnN0IiwiJGhvdXJseVdzcGVlZEZpcnN0IiwiJGhvdXJseVRlbXBlcmF0dXJlRmlyc3QiLCIkaG91cmx5SWNvbkZpcnN0IiwiJGRhdGVUaW1lU2Vjb25kIiwiJGhvdXJseUh1bWlkaXR5c2Vjb25kIiwiJGhvdXJseVByZXNzdXJlc2Vjb25kIiwiJGhvdXJseVdkaXJzZWNvbmQiLCIkaG91cmx5V3NwZWVkc2Vjb25kIiwiJGhvdXJseVRlbXBlcmF0dXJlc2Vjb25kIiwiJGhvdXJseUljb25zZWNvbmQiLCIkZGF0ZVRpbWVUaGlyZCIsIiRob3VybHlIdW1pZGl0eVRoaXJkIiwiJGhvdXJseVByZXNzdXJlVGhpcmQiLCIkaG91cmx5V2RpclRoaXJkIiwiJGhvdXJseVdzcGVlZFRoaXJkIiwiJGhvdXJseVRlbXBlcmF0dXJlVGhpcmQiLCIkaG91cmx5SWNvblRoaXJkIiwiJGRhdGVUaW1lRm91cnRoIiwiJGhvdXJseUh1bWlkaXR5Rm91cnRoIiwiJGhvdXJseVByZXNzdXJlRm91cnRoIiwiJGhvdXJseVdkaXJGb3VydGgiLCIkaG91cmx5V3NwZWVkRm91cnRoIiwiJGhvdXJseVRlbXBlcmF0dXJlRm91cnRoIiwiJGhvdXJseUljb25Gb3VydGgiLCIkZGF0ZVRpbWVMYXN0IiwiJGhvdXJseUh1bWlkaXR5TGFzdCIsIiRob3VybHlQcmVzc3VyZUxhc3QiLCIkaG91cmx5V2Rpckxhc3QiLCIkaG91cmx5V3NwZWVkTGFzdCIsIiRob3VybHlUZW1wZXJhdHVyZUxhc3QiLCIkaG91cmx5SWNvbkxhc3QiLCJnZXRHZW8iLCJzdWNjZXNzIiwicG9zIiwiY3JkIiwiY29vcmRzIiwiQVBJX0tFWV9DUkQiLCJnZW9MaW5rIiwibGF0aXR1ZGUiLCJsb25naXR1ZGUiLCJob3VybHlHZW9MaW5rIiwiZ2V0UmVzcG9uc2UiLCJmZXRjaCIsInRoZW4iLCJyZXMiLCJqc29uIiwiY29uc29sZSIsImxvZyIsImNhdGNoIiwiZXJyIiwiZ2V0UmVzcG9uc2VGb3JEYXlzIiwibmF2aWdhdG9yIiwiZ2VvbG9jYXRpb24iLCJnZXRDdXJyZW50UG9zaXRpb24iLCJBUElfS0VZIiwiQkFTRV9VUkwiLCJTRUNPTkRBUllfVVJMIiwiJGNhcmRzIiwiJGNhcmRzSW5mbyIsIiRpbmZvRGV0YWlscyIsIiRpbmZvVGl0bGUiLCIkaW5wdXQiLCJkYWlseUluZm9JdGVtcyIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCIkc2VhcmNoQnV0dG9uIiwiJHNlYXJjaEljb24iLCJnZXRTZWFyY2hVcmwiLCJjaXR5IiwiZ2V0U2VhcmNoVXJsRm9yRGF5cyIsInF1ZXJ5IiwidmFsdWUiLCJ0b0xvd2VyQ2FzZSIsImNvZGUiLCJkZWZhdWx0cyIsInR5cGUiLCJzdGFydEF0IiwicGVyVmlldyIsImZvY3VzQXQiLCJnYXAiLCJhdXRvcGxheSIsImhvdmVycGF1c2UiLCJrZXlib2FyZCIsImJvdW5kIiwic3dpcGVUaHJlc2hvbGQiLCJkcmFnVGhyZXNob2xkIiwicGVyVG91Y2giLCJ0b3VjaFJhdGlvIiwidG91Y2hBbmdsZSIsImFuaW1hdGlvbkR1cmF0aW9uIiwicmV3aW5kIiwicmV3aW5kRHVyYXRpb24iLCJhbmltYXRpb25UaW1pbmdGdW5jIiwidGhyb3R0bGUiLCJkaXJlY3Rpb24iLCJwZWVrIiwiYnJlYWtwb2ludHMiLCJjbGFzc2VzIiwibHRyIiwicnRsIiwic2xpZGVyIiwiY2Fyb3VzZWwiLCJzd2lwZWFibGUiLCJkcmFnZ2luZyIsImNsb25lU2xpZGUiLCJhY3RpdmVOYXYiLCJhY3RpdmVTbGlkZSIsImRpc2FibGVkQXJyb3ciLCJ3YXJuIiwibXNnIiwiZXJyb3IiLCJfdHlwZW9mIiwiU3ltYm9sIiwiaXRlcmF0b3IiLCJvYmoiLCJjb25zdHJ1Y3RvciIsInByb3RvdHlwZSIsImNsYXNzQ2FsbENoZWNrIiwiaW5zdGFuY2UiLCJDb25zdHJ1Y3RvciIsIlR5cGVFcnJvciIsImNyZWF0ZUNsYXNzIiwiZGVmaW5lUHJvcGVydGllcyIsInByb3BzIiwiaSIsImxlbmd0aCIsImRlc2NyaXB0b3IiLCJlbnVtZXJhYmxlIiwiY29uZmlndXJhYmxlIiwid3JpdGFibGUiLCJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsImtleSIsInByb3RvUHJvcHMiLCJzdGF0aWNQcm9wcyIsIl9leHRlbmRzIiwiYXNzaWduIiwiYXJndW1lbnRzIiwic291cmNlIiwiaGFzT3duUHJvcGVydHkiLCJjYWxsIiwiZ2V0Iiwib2JqZWN0IiwicHJvcGVydHkiLCJyZWNlaXZlciIsIkZ1bmN0aW9uIiwiZGVzYyIsImdldE93blByb3BlcnR5RGVzY3JpcHRvciIsInBhcmVudCIsImdldFByb3RvdHlwZU9mIiwiZ2V0dGVyIiwiaW5oZXJpdHMiLCJzdWJDbGFzcyIsInN1cGVyQ2xhc3MiLCJjcmVhdGUiLCJzZXRQcm90b3R5cGVPZiIsIl9fcHJvdG9fXyIsInBvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4iLCJzZWxmIiwiUmVmZXJlbmNlRXJyb3IiLCJ0b0ludCIsInBhcnNlSW50IiwidG9GbG9hdCIsInBhcnNlRmxvYXQiLCJpc1N0cmluZyIsImlzT2JqZWN0IiwiaXNOdW1iZXIiLCJpc0Z1bmN0aW9uIiwiaXNVbmRlZmluZWQiLCJpc0FycmF5IiwiQXJyYXkiLCJtb3VudCIsImdsaWRlIiwiZXh0ZW5zaW9ucyIsImV2ZW50cyIsImNvbXBvbmVudHMiLCJfbmFtZSIsImRlZmluZSIsInByb3AiLCJkZWZpbml0aW9uIiwic29ydEtleXMiLCJrZXlzIiwic29ydCIsInJlZHVjZSIsInIiLCJrIiwibWVyZ2VPcHRpb25zIiwic2V0dGluZ3MiLCJvcHRpb25zIiwiRXZlbnRzQnVzIiwiaG9wIiwib24iLCJoYW5kbGVyIiwiaW5kZXgiLCJwdXNoIiwiZW1pdCIsImNvbnRleHQiLCJmb3JFYWNoIiwiaXRlbSIsIkdsaWRlIiwic2VsZWN0b3IiLCJfYyIsIl90IiwiX2UiLCJkaXNhYmxlZCIsIm1vdW50JCQxIiwibXV0YXRlIiwidHJhbnNmb3JtZXJzIiwidXBkYXRlIiwiZ28iLCJwYXR0ZXJuIiwiUnVuIiwibWFrZSIsIm1vdmUiLCJkaXN0YW5jZSIsIlRyYW5zaXRpb24iLCJkaXNhYmxlIiwiTW92ZSIsImRlc3Ryb3kiLCJwbGF5IiwiaW50ZXJ2YWwiLCJwYXVzZSIsImVuYWJsZSIsImlzVHlwZSIsImdldCQkMSIsIl9vIiwic2V0Iiwic2V0JCQxIiwibyIsIl9pIiwiX2QiLCJzdGF0dXMiLCJDb21wb25lbnRzIiwiRXZlbnRzIiwiX3RoaXMiLCJjYWxjdWxhdGUiLCJhZnRlciIsImlzU3RhcnQiLCJpc0VuZCIsImlzT2Zmc2V0Iiwic3RlcHMiLCJjb3VudGFibGVTdGVwcyIsIm1pbiIsIl9tIiwic3RlcCIsInN1YnN0ciIsIkh0bWwiLCJzbGlkZXMiLCJub3ciLCJEYXRlIiwiZ2V0VGltZSIsImZ1bmMiLCJ3YWl0IiwidGltZW91dCIsImFyZ3MiLCJyZXN1bHQiLCJwcmV2aW91cyIsImxhdGVyIiwibGVhZGluZyIsImFwcGx5IiwidGhyb3R0bGVkIiwiYXQiLCJyZW1haW5pbmciLCJjbGVhclRpbWVvdXQiLCJ0cmFpbGluZyIsImNhbmNlbCIsIk1BUkdJTl9UWVBFIiwiR2FwcyIsImxlbiIsIkRpcmVjdGlvbiIsIm1hcmdpbkxlZnQiLCJtYXJnaW5SaWdodCIsIlNpemVzIiwid3JhcHBlciIsInNpYmxpbmdzIiwibm9kZSIsInBhcmVudE5vZGUiLCJuIiwiZmlyc3RDaGlsZCIsIm1hdGNoZWQiLCJuZXh0U2libGluZyIsIm5vZGVUeXBlIiwiZXhpc3QiLCJ3aW5kb3ciLCJIVE1MRWxlbWVudCIsIlRSQUNLX1NFTEVDVE9SIiwicm9vdCIsInRyYWNrIiwicXVlcnlTZWxlY3RvciIsInNsaWNlIiwiZmlsdGVyIiwic2xpZGUiLCJjb250YWlucyIsIl9yIiwidCIsIlBlZWsiLCJfdiIsImJlZm9yZSIsIm9mZnNldCIsIm1vdmVtZW50Iiwic2xpZGVXaWR0aCIsInRyYW5zbGF0ZSIsImlzIiwic2V0dXBTbGlkZXMiLCJ3aWR0aCIsInNldHVwV3JhcHBlciIsImRpbWVudGlvbiIsIndyYXBwZXJTaXplIiwib2Zmc2V0V2lkdGgiLCJncm93IiwiQ2xvbmVzIiwicmVkdWN0b3IiLCJCdWlsZCIsInR5cGVDbGFzcyIsImFjdGl2ZUNsYXNzIiwic2libGluZyIsInJlbW92ZUNsYXNzZXMiLCJpdGVtcyIsImNvbGxlY3QiLCJfR2xpZGUkc2V0dGluZ3MiLCJwZWVrSW5jcmVtZW50ZXIiLCJwYXJ0Iiwic3RhcnQiLCJlbmQiLCJtYXgiLCJmbG9vciIsImNsb25lIiwiY2xvbmVOb2RlIiwiX2Nsb25lIiwidW5zaGlmdCIsImFwcGVuZCIsIl9Db21wb25lbnRzJEh0bWwiLCJoYWxmIiwicHJlcGVuZCIsInJldmVyc2UiLCJhcHBlbmRDaGlsZCIsIl9pMiIsImluc2VydEJlZm9yZSIsIl9pMyIsInJlbW92ZUNoaWxkIiwiRXZlbnRzQmluZGVyIiwibGlzdGVuZXJzIiwiZWwiLCJjbG9zdXJlIiwiY2FwdHVyZSIsIm9mZiIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJSZXNpemUiLCJCaW5kZXIiLCJiaW5kIiwidW5iaW5kIiwiVkFMSURfRElSRUNUSU9OUyIsIkZMSVBFRF9NT1ZFTUVOVFMiLCJyZXNvbHZlIiwidG9rZW4iLCJzcGxpdCIsImpvaW4iLCJhZGRDbGFzcyIsInJlbW92ZUNsYXNzIiwiaW5kZXhPZiIsIlJ0bCIsIm1vZGlmeSIsIkdhcCIsIkdyb3ciLCJQZWVraW5nIiwiRm9jdXNpbmciLCJtdXRhdG9yIiwiVFJBTlNGT1JNRVJTIiwiY29uY2F0IiwidHJhbnNmb3JtZXIiLCJUcmFuc2xhdGUiLCJ0cmFuc2Zvcm0iLCJjb21wb3NlIiwiZHVyYXRpb24iLCJ0cmFuc2l0aW9uIiwiY2FsbGJhY2siLCJzdXBwb3J0c1Bhc3NpdmUiLCJvcHRzIiwiZSIsInN1cHBvcnRzUGFzc2l2ZSQxIiwiU1RBUlRfRVZFTlRTIiwiTU9WRV9FVkVOVFMiLCJFTkRfRVZFTlRTIiwiTU9VU0VfRVZFTlRTIiwiU3dpcGUiLCJzd2lwZVNpbiIsInN3aXBlU3RhcnRYIiwic3dpcGVTdGFydFkiLCJwYXNzaXZlIiwiYmluZFN3aXBlU3RhcnQiLCJzd2lwZSIsInRvdWNoZXMiLCJwYWdlWCIsInBhZ2VZIiwiYmluZFN3aXBlTW92ZSIsImJpbmRTd2lwZUVuZCIsInN1YkV4U3giLCJzdWJFeVN5IiwicG93RVgiLCJhYnMiLCJwb3dFWSIsInN3aXBlSHlwb3RlbnVzZSIsInNxcnQiLCJzd2lwZUNhdGhldHVzIiwiYXNpbiIsIlBJIiwic3RvcFByb3BhZ2F0aW9uIiwidGhyZXNob2xkIiwic3dpcGVEaXN0YW5jZSIsInN3aXBlRGVnIiwidW5iaW5kU3dpcGVNb3ZlIiwidW5iaW5kU3dpcGVFbmQiLCJ1bmJpbmRTd2lwZVN0YXJ0IiwiX3RoaXMyIiwiX3RoaXMzIiwiY2hhbmdlZFRvdWNoZXMiLCJJbWFnZXMiLCJkcmFnc3RhcnQiLCJwcmV2ZW50RGVmYXVsdCIsIkFuY2hvcnMiLCJkZXRhY2hlZCIsInByZXZlbnRlZCIsIl9hIiwicXVlcnlTZWxlY3RvckFsbCIsImNsaWNrIiwiZGV0YWNoIiwiZHJhZ2dhYmxlIiwiZ2V0QXR0cmlidXRlIiwicmVtb3ZlQXR0cmlidXRlIiwiYXR0YWNoIiwiTkFWX1NFTEVDVE9SIiwiQ09OVFJPTFNfU0VMRUNUT1IiLCJDb250cm9scyIsIl9uIiwiYWRkQmluZGluZ3MiLCJzZXRBY3RpdmUiLCJyZW1vdmVBY3RpdmUiLCJjb250cm9scyIsInJlbW92ZUJpbmRpbmdzIiwiZWxlbWVudHMiLCJjdXJyZW50VGFyZ2V0IiwiS2V5Ym9hcmQiLCJwcmVzcyIsImtleUNvZGUiLCJBdXRvcGxheSIsInNldEludGVydmFsIiwic3RvcCIsInRpbWUiLCJjbGVhckludGVydmFsIiwic29ydEJyZWFrcG9pbnRzIiwicG9pbnRzIiwiQnJlYWtwb2ludHMiLCJtYXRjaCIsIm1hdGNoTWVkaWEiLCJwb2ludCIsIm1hdGNoZXMiLCJDT01QT05FTlRTIiwiR2xpZGUkMSIsIl9Db3JlIiwiR2xpZGUkJDEiLCJjb25maWciXSwibWFwcGluZ3MiOiI7OztFQUNPLFNBQVNBLGFBQVQsR0FBeUI7RUFDOUIsUUFBTUMsVUFBVSxHQUFHQyxRQUFRLENBQUNDLGNBQVQsQ0FBd0IsUUFBeEIsQ0FBbkI7RUFDQSxRQUFNQyxjQUFjLEdBQUdILFVBQVUsQ0FBQ0ksUUFBbEM7RUFDQSxRQUFNQyxXQUFXLEdBQUdKLFFBQVEsQ0FBQ0MsY0FBVCxDQUF3QixhQUF4QixDQUFwQjtFQUNBLFFBQU1JLFlBQVksR0FBR0wsUUFBUSxDQUFDQyxjQUFULENBQXdCLGNBQXhCLENBQXJCO0VBQ0EsUUFBTUssYUFBYSxHQUFHTixRQUFRLENBQUNDLGNBQVQsQ0FBd0IsZUFBeEIsQ0FBdEI7RUFDQSxRQUFNTSxZQUFZLEdBQUdQLFFBQVEsQ0FBQ0MsY0FBVCxDQUF3QixjQUF4QixDQUFyQjtFQUNBLFFBQU1PLG9CQUFvQixHQUFHUixRQUFRLENBQUNDLGNBQVQsQ0FBd0IsV0FBeEIsQ0FBN0I7RUFDQSxNQUFJUSxVQUFVLEdBQUcsQ0FBQyxFQUFsQjtFQUNBLE1BQUlDLFlBQVksR0FBRyxFQUFuQjtFQUNBLE1BQUlDLEtBQUssR0FBRyxFQUFaOztFQUVBLFdBQVNDLHdCQUFULEdBQW9DO0VBQ2xDUixJQUFBQSxXQUFXLENBQUNTLEtBQVosQ0FBa0JDLE9BQWxCLEdBQTRCLE1BQTVCO0VBQ0Q7O0VBQ0QsV0FBU0MseUJBQVQsR0FBcUM7RUFDbkNYLElBQUFBLFdBQVcsQ0FBQ1MsS0FBWixDQUFrQkMsT0FBbEIsR0FBNEIsTUFBNUI7RUFDRDs7RUFDRCxXQUFTRSxlQUFULEdBQTJCO0VBQ3pCUCxJQUFBQSxVQUFVLEdBQUcsQ0FBQyxFQUFkO0VBQ0FDLElBQUFBLFlBQVksR0FBRyxFQUFm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
