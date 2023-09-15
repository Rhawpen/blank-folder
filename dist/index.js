function searchCity(city){
  let apiKey = "2db5d5b656f561f30006eb6878ed720d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showWeather);
}

function showWeather(response) {
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(response.data.main.temp);
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#weather").innerHTML = response.data.weather[0].main;
}

function showCity(event) {
  event.preventDefault();

  let city = document.querySelector("#search-input").value;
  searchCity(city)
}


function getPosition(position)
{
  let apiKey = "2db5d5b656f561f30006eb6878ed720d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  
  axios.get(apiUrl).then(showWeather);
}

function showCurrentPosition(event){
  event.preventDefault()
  navigator.geolocation.getCurrentPosition(getPosition);
}


let date = new Date();
let hour = date.getHours();
let minute = date.getMinutes();
let fullTime = `${hour}:${minute}`;


let form = document.querySelector("form");
form.addEventListener('submit', showCity)

let current = document.querySelector("#current");
current.addEventListener('click', showCurrentPosition);

document.querySelector("#day").innerHTML = date.toLocaleDateString(
  "en-EN",
  { weekday: "long" }
);
document.querySelector("#time").innerHTML = fullTime;

// DEFAULT LOCATION
searchCity('Nigeria')

