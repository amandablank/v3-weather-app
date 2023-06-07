function getForecast(city) {
  let apiKey = "f5a9f38100065t0934bo1b43d42ba03a";
  let units = "metric";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayForecast);
}

function displayTemp(response) {
  console.log(response);
  let celsiusTemperature = Math.round(response.data.temperature.current);
  let temp = document.querySelector("#city-current-temperature");
  temp.innerHTML = `${celsiusTemperature}˚C`;

  let currentCity = document.querySelector("#city-search-result");
  currentCity.innerHTML = response.data.city;

  let weatherDescription = document.querySelector("#description");
  weatherDescription.innerHTML = `<img
            src="${response.data.condition.icon_url}"
            alt="${response.data.condition.icon}"
            width="80"
          />${response.data.condition.description}`;

  //let weatherIcon = document.querySelector("#icon");
  //weatherIcon.setAttribute("src", `${response.data.condition.icon_url}`);
  //weatherIcon.setAttribute("alt", response.data.condition.description);

  getForecast(response.data.city);
  updateDate(response.data.time);
}

function searchLocation(city) {
  let apiKey = "f5a9f38100065t0934bo1b43d42ba03a";
  let units = "metric";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayTemp);
}

function getData(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchLocation(city);
}

let searchingForm = document.querySelector("#city-search-form");
searchingForm.addEventListener("submit", getData);

function getDayOfTheWeek(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let daysOfTheWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return daysOfTheWeek[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let maximumTemperature = document.querySelector("#maximum");
  maximumTemperature.innerHTML = `<i class="fa-solid fa-temperature-arrow-up"></i> ${Math.round(
    forecast[0].temperature.maximum
  )}˚C`;

  let minimumTemperature = document.querySelector("#minimum");
  minimumTemperature.innerHTML = `<i class="fa-solid fa-temperature-arrow-down"></i> ${Math.round(
    forecast[0].temperature.minimum
  )}˚C`;

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index > 0 && index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col"><strong>${getDayOfTheWeek(
          forecastDay.time
        )}</strong></div>`;
    }
  });

  forecastHTML = forecastHTML + `</div> <div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index > 0 && index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col">     
        ${Math.round(forecastDay.temperature.maximum)}°C</div>`;
    }
  });

  forecastHTML = forecastHTML + `</div> <div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index > 0 && index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col">${Math.round(
          forecastDay.temperature.minimum
        )}°C</div>`;
    }
  });

  forecastHTML = forecastHTML + `</div> <div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index > 0 && index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col">
          <img
            src="${forecastDay.condition.icon_url}"
            alt="${forecastDay.condition.icon}"
            width="62"
          />
        </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHTML;
}

function searchCoordinates(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "f5a9f38100065t0934bo1b43d42ba03a";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${longitude}&lat=${latitude}&key=${apiKey}`;
  axios.get(apiUrl).then(displayTemp);
}

function getCurrentPosition(event) {
  navigator.geolocation.getCurrentPosition(searchCoordinates);
}

let locationButton = document.querySelector("#local-timezone");
locationButton.addEventListener("click", getCurrentPosition);
