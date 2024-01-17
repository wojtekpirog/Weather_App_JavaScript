const input = document.querySelector("input");
const button = document.querySelector("button");
const photo = document.querySelector("img");
const cityName = document.querySelector(".city-name");
const warning = document.querySelector(".warning");
const weather = document.querySelector(".weather-info > div:nth-child(1)");
const temperature = document.querySelector(".weather-info > div:nth-child(2)");
const humidity = document.querySelector(".weather-info > div:nth-child(3)");

// const API_COORDINATES = "http://api.openweathermap.org/geo/1.0/direct?q=";
const API_LINK = "https://api.openweathermap.org/data/2.5/weather?q=";
const API_KEY = "&appid=f6281811f04f09446c1a8be4d0223a47";
const API_UNITS = "&units=metric";

const getWeather = () => {
  const cityName = input.value || "Wrocław";
  const URL = API_LINK + cityName + API_KEY + API_UNITS;

  axios.get(URL)
    .then(res => {
      console.log(res);
      const temp = res.data.main.temp;
      const weather = res.data.weather[0].description;
      const humidity = res.data.main.humidity;

      cityName.textContent = res.data.name;
    })
}

button.addEventListener("click", getWeather);