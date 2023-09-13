"use strict";

function searchCity(city) {
  var apiKey = "2db5d5b656f561f30006eb6878ed720d";
  var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=".concat(city, "&appid=").concat(apiKey, "&units=metric");
  axios.get(apiUrl).then(showWeather);
}

function showWeather(response) {
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(response.data.main.temp);
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
  document.querySelector("#weather").innerHTML = response.data.weather[0].main;
}

function showCity(event) {
  event.preventDefault();
  var city = document.querySelector("#search-input").value;
  searchCity(city);
}

function getPosition(position) {
  var apiKey = "2db5d5b656f561f30006eb6878ed720d";
  var apiUrl = "https://api.openweathermap.org/data/2.5/weather?lat=".concat(position.coords.latitude, "&lon=").concat(position.coords.longitude, "&appid=").concat(apiKey, "&units=metric");
  axios.get(apiUrl).then(showWeather);
}

function showCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getPosition);
}

var date = new Date();
var hour = date.getHours();
var minute = date.getMinutes();
var fullTime = "".concat(hour, ":").concat(minute);
var form = document.querySelector("form");
form.addEventListener('submit', showCity);
var current = document.querySelector("#current");
current.addEventListener('click', showCurrentPosition);
document.querySelector("#day").innerHTML = date.toLocaleDateString("en-EN", {
  weekday: "long"
});
document.querySelector("#time").innerHTML = fullTime; // DEFAULT LOCATION

searchCity('Nigeria');
//# sourceMappingURL=script.dev.js.map
