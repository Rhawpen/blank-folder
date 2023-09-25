let apiKey = "2db5d5b656f561f30006eb6878ed720d";

function searchCity(city){
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showWeather);
}

function showWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  temperature = Math.round(response.data.main.temp);
  document.querySelector("#temperature").innerHTML = temperature;
  let icon = response.data.weather[0].icon;
  document.querySelector(
    "#weather-icon"
  ).innerHTML = `<img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="" id="weather-icon">`;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML = response.data.weather[0].description;
}

function showCity(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  
  searchCity(city)
}

function getThisPosition(){
  navigator.geolocation.getCurrentPosition(position => {
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

      axios.get(apiUrl).then(showWeather);
  });
}

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener('click', function (event){
  event.preventDefault()
  let celsiusToFahrenheit = document.querySelector("#temperature");
  celsiusToFahrenheit.innerHTML = Math.round((temperature * 9) / 5 + 32);
  fahrenheit.classList.add('active');
  celsius.classList.remove('active')
});

let celsius = document.querySelector("#celsius");
celsius.addEventListener('click', function (event){
  event.preventDefault()
  document.querySelector("#temperature").innerHTML = temperature;
  fahrenheit.classList.remove("active");
  celsius.classList.add("active");
});

let temperature = null;
let date = new Date();
let hour = date.getHours();
if (hour < 12){
  document.getElementById('day-time').innerHTML = 'AM'
}else if (hour === 12){
  document.getElementById("day-time").innerHTML = "PM";
}
let minute = date.getMinutes();
if (minute < 10){
  minute = `0${minute}`
}
let fullTime = `${hour}:${minute}`;

let form = document.querySelector("form");
form.addEventListener('submit', showCity)

document.querySelector("#day").innerHTML = date.toLocaleDateString(
  "en-EN",
  { weekday: "long" }
);
document.querySelector("#time").innerHTML = fullTime;

// DEFAULT LOCATION
getThisPosition();
