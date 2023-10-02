let apiKey = "ff304a92t9c244dc46fb12f2cefo3e03";

function searchCity(city) {
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  console.log(apiUrl)

  axios.get(apiUrl).then(showWeather);
}

function formatDay(timestamp){
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[date.getDay()];

  return day;
}

function displayForecast(response){
  let forecastElement = document.getElementById("forecast");
  let forecast = response.data.daily;
  let forecastHtml = "<div>";

  forecast.forEach(function (forecastDay, index) {
    if (index < 5){
      forecastHtml += `
  <ul>
    <li class="forecast-day">${formatDay(forecastDay.time)}</li>
    <li class="forecast-icon"><img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
      forecastDay.condition.icon
    }.png" alt="forecastDay.condition.description">
    </li>
    <li class="forecast-temperature">
      <span class="min-temperature">${Math.round(
        forecastDay.temperature.minimum
      )}</span>°
      <span class="max-temperature">${Math.round(
        forecastDay.temperature.maximum
      )}</span>°
    </li>
  </ul>
  `;
    }
    
  });
  forecastHtml += "</div>";
  forecastElement.innerHTML = forecastHtml;
}

function getForecast(coordinates){
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}`;

  axios.get(apiUrl).then(displayForecast)

}


function showWeather(response) {
  document.querySelector("#city").innerHTML = response.data.city;
  temperature = Math.round(response.data.temperature.current);
  document.querySelector("#temperature").innerHTML = temperature;
  let icon = response.data.condition.icon;
  let description =  response.data.condition.description;
  document.querySelector(
    "#weather-icon"
  ).innerHTML = `<img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${icon}.png" alt="${description}" id="weather-icon">`;
  document.querySelector("#humidity").innerHTML = response.data.temperature.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML = description;

  getForecast(response.data.coordinates);
}

function showCity(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;

  searchCity(city);
}

function getThisPosition() {
  navigator.geolocation.getCurrentPosition((position) => {
    let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${position.coords.longitude}&lat=${position.coords.latitude}&key=${apiKey}&units=metric`;

    axios.get(apiUrl).then(showWeather);
  });
}

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", function (event) {
  event.preventDefault();
  let celsiusToFahrenheit = document.querySelector("#temperature");
  celsiusToFahrenheit.innerHTML = Math.round((temperature * 9) / 5 + 32);
  fahrenheit.classList.add("active");
  celsius.classList.remove("active");
});

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", function (event) {
  event.preventDefault();
  document.querySelector("#temperature").innerHTML = temperature;
  fahrenheit.classList.remove("active");
  celsius.classList.add("active");
});

let temperature = null;
let date = new Date();
let hour = date.getHours();
if (hour < 12) {
  document.getElementById("day-time").innerHTML = "AM";
} else if (hour === 12) {
  document.getElementById("day-time").innerHTML = "PM";
}
let minute = date.getMinutes();
if (minute < 10) {
  minute = `0${minute}`;
}
let fullTime = `${hour}:${minute}`;

let form = document.querySelector("form");
form.addEventListener("submit", showCity);

document.querySelector("#day").innerHTML = date.toLocaleDateString("en-EN", {
  weekday: "long",
});
document.querySelector("#time").innerHTML = fullTime;

// DEFAULT LOCATION
getThisPosition();
