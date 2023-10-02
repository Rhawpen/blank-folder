"use strict";

var apiKey = "ff304a92t9c244dc46fb12f2cefo3e03";

function searchCity(city) {
  var apiUrl = "https://api.shecodes.io/weather/v1/current?query=".concat(city, "&key=").concat(apiKey);
  console.log(apiUrl);
  axios.get(apiUrl).then(showWeather);
}

function formatDay(timestamp) {
  var date = new Date(timestamp * 1000);
  var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  var day = days[date.getDay()];
  return day;
}

function displayForecast(response) {
  var forecastElement = document.getElementById("forecast");
  var forecast = response.data.daily;
  var forecastHtml = "<div>";
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHtml += "\n  <ul>\n    <li class=\"forecast-day\">".concat(formatDay(forecastDay.time), "</li>\n    <li class=\"forecast-icon\"><img src=\"http://shecodes-assets.s3.amazonaws.com/api/weather/icons/").concat(forecastDay.condition.icon, ".png\" alt=\"forecastDay.condition.description\">\n    </li>\n    <li class=\"forecast-temperature\">\n      <span class=\"min-temperature\">").concat(Math.round(forecastDay.temperature.minimum), "</span>\xB0\n      <span class=\"max-temperature\">").concat(Math.round(forecastDay.temperature.maximum), "</span>\xB0\n    </li>\n  </ul>\n  ");
    }
  });
  forecastHtml += "</div>";
  forecastElement.innerHTML = forecastHtml;
}

function getForecast(coordinates) {
  var apiUrl = "https://api.shecodes.io/weather/v1/forecast?lon=".concat(coordinates.longitude, "&lat=").concat(coordinates.latitude, "&key=").concat(apiKey);
  axios.get(apiUrl).then(displayForecast);
}

function showWeather(response) {
  document.querySelector("#city").innerHTML = response.data.city;
  temperature = Math.round(response.data.temperature.current);
  document.querySelector("#temperature").innerHTML = temperature;
  var icon = response.data.condition.icon;
  var description = response.data.condition.description;
  document.querySelector("#weather-icon").innerHTML = "<img src=\"http://shecodes-assets.s3.amazonaws.com/api/weather/icons/".concat(icon, ".png\" alt=\"").concat(description, "\" id=\"weather-icon\">");
  document.querySelector("#humidity").innerHTML = response.data.temperature.humidity;
  document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
  document.querySelector("#description").innerHTML = description;
  getForecast(response.data.coordinates);
}

function showCity(event) {
  event.preventDefault();
  var city = document.querySelector("#search-input").value;
  searchCity(city);
}

function getThisPosition() {
  navigator.geolocation.getCurrentPosition(function (position) {
    var apiUrl = "https://api.shecodes.io/weather/v1/current?lon=".concat(position.coords.longitude, "&lat=").concat(position.coords.latitude, "&key=").concat(apiKey, "&units=metric");
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
