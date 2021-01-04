let weatherApiKey = "802540f702d19dfc355b50bb670f1cc5";
//let oneCallWeatherApiKey = "2204e2f50737e4cd706dca2096135d4e";

function displayCurrentDay() {
  let today = new Date();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[today.getDay()];

  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[today.getMonth()];

  let date = today.getDate();

  let currentDay = `${day}, ${month} ${date}`;

  let currentDayInner = document.getElementById("current-day");
  currentDayInner.innerHTML = currentDay;
}

function displayTime() {
  let today = new Date();
  let hour = today.getHours();
  let minute = today.getMinutes();
  console.log(minute);
  let m = "";

  if (hour === 0) {
    hour = 12;
    m = "AM";
  } else {
    if (0 < hour && hour < 12) {
      m = "AM";
    } else {
      if (hour === 12) {
        m = "PM";
      } else {
        hour = hour - 12;
        m = "PM";
      }
    }
  }

  let currentTime = `${hour} ${m}`;
  let currentTimeInner = document.getElementById("current-time");
  currentTimeInner.innerHTML = currentTime;
}

function displayCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(pullPosition);
}

function pullPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weatherApiKey}&units=imperial`;
  let forecastApiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${weatherApiKey}&units=imperial`;
  axios.get(apiUrl).then(displayWeather);
  axios.get(forecastApiUrl).then(displayForecast);
}

function displayWeather(response) {
  let city = response.data.name;
  let temp = Math.round(response.data.main.temp);

  let cityDisplay = document.getElementById("city-display");
  let currentTempDisplay = document.getElementById("current-temp");

  cityDisplay.innerHTML = city;
  currentTempDisplay.innerHTML = temp;
}

function displayForecast(response) {
  console.log(response);
  let forecast = response.data.list[0];

  let forecastDisplay = document.getElementById("forecast");
  forecastDisplay.innerHTML = `
  <div class="col mb-5">
    <div class="card border border-secondary rounded-sm h-100 days day1">
      <div class="card-body">
        <h5 class="card-title">
          <strong>${Math.round(forecast.main.temp_max)} ℉</strong> ${Math.round(
    forecast.main.temp_min
  )} ℉
          <br />
          <i class="far fa-sun"></i>
        </h5>
        <p class="card-text">
          Tuesday
          <br />
          11/3
        </p>
      </div>
    </div>
  </div>`;
}

function weatherSearch(event) {
  event.preventDefault();

  let cityInput = document.getElementById("city-input");
  let city = cityInput.value.trim().toLowerCase();

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherApiKey}&units=imperial`;

  let forecastApiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${weatherApiKey}&units=imperial`;
  axios.get(apiUrl).then(displayWeather);
  axios.get(forecastApiUrl).then(displayForecast);
}

function fahrenheitToCelsius(event) {
  event.preventDefault();

  let currentTemp = document.getElementById("current-temp");
  let fahrenheitTemp = currentTemp.innerText;

  let celsiusTemp = Math.round((fahrenheitTemp - 32) * (5 / 9));

  currentTemp.innerHTML = celsiusTemp;

  let fahrenheit = document.getElementById("fahrenheit");
  fahrenheit.innerHTML = "<a href=''> ℉ </a>";

  let celsius = document.getElementById("celsius");
  celsius.innerHTML = "<strong> ℃ </strong>";

  fahrenheit.addEventListener("click", celsiusToFahrenheit);
}

function celsiusToFahrenheit(event) {
  event.preventDefault();

  let currentTemp = document.getElementById("current-temp");
  let celsiusTemp = currentTemp.innerText;

  let fahrenheitTemp = Math.round(celsiusTemp * (9 / 5) + 32);

  currentTemp.innerHTML = fahrenheitTemp;

  let celsius = document.getElementById("celsius");
  celsius.innerHTML = "<a href=''> ℃ </a>";

  let fahrenheit = document.getElementById("fahrenheit");
  fahrenheit.innerHTML = "<strong> ℉ </strong>";

  celsius.addEventListener("click", fahrenheitToCelsius);
}

window.addEventListener("load", displayCurrentDay);
window.addEventListener("load", displayTime);
window.addEventListener("load", displayCurrentLocation);
window.addEventListener("load", displayForecast);

let form = document.getElementById("form");
form.addEventListener("submit", weatherSearch);

let button = document.getElementById("current-location");
button.addEventListener("click", displayCurrentLocation);

let celsius = document.getElementById("celsius");
celsius.addEventListener("click", fahrenheitToCelsius);
