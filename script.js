let input;
let button;
let photo;
let cityName;
let warning;
let weather;
let temperature;
let humidity;

const API_LINK = "https://api.openweathermap.org/data/2.5/weather?q=";
const API_KEY = "&appid=f6281811f04f09446c1a8be4d0223a47";
const API_UNITS = "&units=metric";

const main = () => {
  prepareDOMElements();
  prepareDOMEvents();
}

const prepareDOMElements = () => {
  input = document.querySelector("input");
  button = document.querySelector("button");
  photo = document.querySelector("img");
  cityName = document.querySelector(".city-name");
  warning = document.querySelector(".warning");
  weather = document.querySelector(".weather-info > div:nth-child(1)");
  temperature = document.querySelector(".weather-info > div:nth-child(2)");
  humidity = document.querySelector(".weather-info > div:nth-child(3)");
}

const prepareDOMEvents = () => {
  input.addEventListener("keydown", getWeatherOnEnterClick);
  button.addEventListener("click", getWeather);
}

const getWeatherOnEnterClick = (e) => {
  if (e.key === "Enter") getWeather();
}

const displayDetails = (response) => {
  const status = Object.assign({}, ...response.data.weather);
  
  if (status.id >= 200 && status.id <= 232) {
    photo.setAttribute("src", "./assets/images/thunderstorm.png");
  } else if (status.id >= 300 && status.id <= 321) {
    photo.setAttribute("src", "./assets/images/drizzle.png");
  } else if (status.id >= 500 && status.id <= 531) {
    photo.setAttribute("src", "./assets/images/rain.png");
  } else if (status.id >= 600 && status.id <= 622) {
    photo.setAttribute("src", "./assets/images/ice.png");
  } else if (status.id === 701 || status.id === 741) {
    photo.setAttribute("src", "./assets/images/fog.png");
  } else if (status.id === 800) {
    photo.setAttribute("src", "./assets/images/sun.png");
  } else if (status.id > 800) {
    photo.setAttribute("src", "./assets/images/cloud.png");
  } else {
    photo.setAttribute("src", "./assets/images/unknown.png");
  }
  
  cityName.textContent = input.value;
  weather.textContent = status.main;
  temperature.textContent = Math.floor(response.data.main.temp) + " ºC";
  humidity.textContent = response.data.main.humidity + " %"; 
}

const displayError = (error) => {
  warning.textContent = "Podano niepoprawną nazwę miasta!";
}

const getWeather = () => {
  if (input.value) {
    const URL = API_LINK + input.value + API_KEY + API_UNITS;

    axios.get(URL)
      .then(response => {
        displayDetails(response);
        input.value = "";
        warning.textContent = "";        
      })
      .catch(error => displayError(error));
  } else {
    warning.textContent = "Nie podano nazwy miasta!";
  }
}

document.addEventListener("DOMContentLoaded", main);