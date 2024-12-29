const city = document.querySelector(".city");
const cors = {
  mode: "cors",
};

let w;

getWeather();

async function getWeather(city = "Madrid") {
  const WEATHER_API_KEY = "YHEWGDPFK4AWAL7FD9WY4RRVZ";
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=${WEATHER_API_KEY}&contentType=json`,
      cors
    );
    const weatherData = await response.json();
    getImage(weatherData.days[0].conditions);
    w = weatherData;
    displayInformation();
    convert(Math.round, "°C");
    changeSelectValue(document.querySelector(".convert"), "Celsius");
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
    const randomValue = getRandomValue(imageData.hits.length);
    changeBackground(imageData.hits[randomValue].largeImageURL);
  } catch (error) {
    console.log(error);
  }
}

function getWeatherObject(object) {
  return {
    temp: object.days[0].temp,
    maxTemp: object.days[0].tempmax,
    minTemp: object.days[0].tempmin,
    dewPoint: object.days[0].dew,
    feelsLike: object.days[0].feelslike,
    windSpeed: object.days[0].windspeed,
    humidity: object.days[0].humidity,
    currentCity: object.resolvedAddress,
    currentWeather: object.days[0].conditions,
    description: object.description,
  };
}

function changeSelectValue(select, optionValue) {
  select.value = optionValue;
}

function displayInformation() {
  const weatherObj = getWeatherObject(w);
  document.querySelector(".indexed-city").textContent =
    weatherObj["currentCity"];
  document.querySelector(".current-weather").textContent =
    weatherObj["currentWeather"];
  document.querySelector(".current-temp").textContent = Math.round(
    weatherObj["temp"]
  );
  document.querySelector(".max-temp").textContent = Math.round(
    weatherObj["maxTemp"]
  );
  document.querySelector(".min-temp").textContent = Math.round(
    weatherObj["minTemp"]
  );
  document.querySelector(".wind-speed").textContent =
    "Wind speed: " + weatherObj["windSpeed"] + " km/h";
  document.querySelector(".humidity").textContent =
    "Humidity: " + weatherObj["humidity"] + " %";
  document.querySelector(".dew-point").textContent = Math.round(
    weatherObj["dewPoint"]
  );
  document.querySelector(".etc").textContent = Math.round(
    weatherObj["feelsLike"]
  );
}

function clearInput(input) {
  input.value = "";
}

function changeBackground(url) {
  const body = document.querySelector("body");
  body.style.backgroundImage = `url(${url})`;
}

function getCity(cityInput) {
  return cityInput.value;
}

function getRandomValue(upperBound) {
  return Math.floor(Math.random() * upperBound);
}

function convertToFahrenheit(celsius) {
  return Math.round((celsius * 9) / 5 + 32);
}

function convertToCelsius(fahr) {
  return Math.round(((fahr - 32) * 5) / 9);
}

function changeUnit(arr, unit = "°C") {
  arr.map((node) => (node.lastChild.textContent = unit));
}

city.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    getWeather(getCity(city));
    clearInput(city);
  }
});

const celsius = document.querySelector(".celsius");
const fahrenheit = document.querySelector(".fahrenheit");

function convert(mapFunction, unit) {
  const [...temps] = document.querySelectorAll(".weather");
  const [...containers] = document.querySelectorAll(".container");
  const obj = getWeatherObject(w);
  const data = [
    obj["temp"],
    obj["maxTemp"],
    obj["minTemp"],
    obj["dewPoint"],
    obj["feelsLike"],
  ];
  const result = data.map(mapFunction, unit);
  for (let i = 0; i < temps.length; i++) {
    temps[i].textContent = result[i];
  }
  changeUnit(containers, unit);
}

celsius.addEventListener("click", () => {
  convert(Math.round, "°C");
});

fahrenheit.addEventListener("click", () => {
  convert(convertToFahrenheit, "°F");
});
