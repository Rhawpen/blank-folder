"use strict";

var apiKey = "2db5d5b656f561f30006eb6878ed720d";

function searchCity(city) {
  var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=".concat(city, "&appid=").concat(apiKey, "&units=metric");
  axios.get(apiUrl).then(showWeather);
}

function showWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  temperature = Math.round(response.data.main.temp);
  document.querySelector("#temperature").innerHTML = temperature;
  var icon = response.data.weather[0].icon;
  document.querySelector("#weather-icon").innerHTML = "<img src=\"https://openweathermap.org/img/wn/".concat(icon, "@2x.png\" alt=\"\" id=\"weather-icon\">");
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
  document.querySelector("#description").innerHTML = response.data.weather[0].description;
}

function showCity(event) {
  event.preventDefault();
  var city = document.querySelector("#search-input").value;
  searchCity(city);
}

function getThisPosition() {
  navigator.geolocation.getCurrentPosition(function (position) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?lat=".concat(position.coords.latitude, "&lon=").concat(position.coords.longitude, "&appid=").concat(apiKey, "&units=metric");
    axios.get(apiUrl).then(showWeather);
  });
}

var fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", function (event) {
  event.preventDefault();
  var celsiusToFahrenheit = document.querySelector("#temperature");
  celsiusToFahrenheit.innerHTML = Math.round(temperature * 9 / 5 + 32);
  fahrenheit.classList.add("active");
  celsius.classList.remove("active");
});
var celsius = document.querySelector("#celsius");
celsius.addEventListener("click", function (event) {
  event.preventDefault();
  document.querySelector("#temperature").innerHTML = temperature;
  fahrenheit.classList.remove("active");
  celsius.classList.add("active");
});
var temperature = null;
var date = new Date();
var hour = date.getHours();

if (hour < 12) {
  document.getElementById("day-time").innerHTML = "AM";
} else if (hour === 12) {
  document.getElementById("day-time").innerHTML = "PM";
}

var minute = date.getMinutes();

if (minute < 10) {
  minute = "0".concat(minute);
}

var fullTime = "".concat(hour, ":").concat(minute);
var form = document.querySelector("form");
form.addEventListener("submit", showCity);
document.querySelector("#day").innerHTML = date.toLocaleDateString("en-EN", {
  weekday: "long"
});
document.querySelector("#time").innerHTML = fullTime; // DEFAULT LOCATION

getThisPosition();
//# sourceMappingURL=index.dev.js.map
