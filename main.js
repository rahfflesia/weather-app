const city = document.querySelector(".city");
const cors = {
  mode: "cors",
};

getWeather();

async function getWeather(city = "Madrid") {
  const WEATHER_API_KEY = "YHEWGDPFK4AWAL7FD9WY4RRVZ";
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=${WEATHER_API_KEY}&contentType=json`,
      cors
    );
    const weatherData = await response.json();
    displayMainInfo(weatherData);
    displayDetails(weatherData);
    getImage(weatherData.days[0].conditions);
  } catch (error) {
    console.log(error);
  }
}

async function getImage(weather) {
  const IMAGE_API_KEY = "47820586-1bbcb8dfd700ccd5c12e5d9e1";
  try {
    const response = await fetch(
      `https://pixabay.com/api/?key=${IMAGE_API_KEY}&q=${weather}+weather`,
      cors
    );
    const imageData = await response.json();
    changeBackground(imageData.hits[0].largeImageURL);
  } catch (error) {
    console.log(error);
  }
}

function clearInput(input) {
  input.value = "";
}

function displayMainInfo(weatherData) {
  const currentCity = document.querySelector(".indexed-city");
  currentCity.textContent = weatherData.resolvedAddress;

  const currentWeather = document.querySelector(".current-weather");
  currentWeather.textContent = weatherData.days[0].conditions;

  const currentTemp = document.querySelector(".current-temp");
  currentTemp.textContent = Math.round(weatherData.days[0].temp) + "°C";

  const temps = document.querySelector(".temps");
  temps.textContent =
    Math.round(weatherData.days[0].tempmax) +
    "°C" +
    "/" +
    Math.round(weatherData.days[0].tempmin) +
    "°C";

  const desc = document.querySelector(".description");
  desc.textContent = weatherData.description;
}

function displayDetails(weatherData) {
  const windSpeed = document.querySelector(".wind-speed");
  windSpeed.textContent =
    "Wind speed: " + weatherData.days[0].windspeed + " km/h";

  const humidity = document.querySelector(".humidity");
  humidity.textContent = "Humidity: " + weatherData.days[0].humidity + "%";

  const dewPoint = document.querySelector(".dew-point");
  dewPoint.textContent = "Dew point: " + weatherData.days[0].dew + "°C";

  const feelsLike = document.querySelector(".etc");
  feelsLike.textContent =
    "Feels like: " + Math.round(weatherData.days[0].feelslike) + "°C";
}

function changeBackground(url) {
  const body = document.querySelector("body");
  body.style.backgroundImage = `url(${url})`;
}

function getCity(cityInput) {
  return cityInput.value;
}

city.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    const weather = getWeather(getCity(city));
    console.log(weather);
    clearInput(city);
  }
});
