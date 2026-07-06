// ==============================
// OpenWeather API Key
// ==============================

const apiKey = "1bdc33afe6e2b0dfb635f56f4d50d301";

// ==============================
// HTML ELEMENTS
// ==============================

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");

const temperature = document.getElementById("temperature");
const cityName = document.getElementById("cityName");
const weatherDescription = document.getElementById("weatherDescription");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const weatherIcon = document.getElementById("weatherIcon");
const error = document.getElementById("error");
const locationText = document.getElementById("locationText");
const mapFrame = document.getElementById("mapFrame");

// ==============================
// EVENTS
// ==============================

searchBtn.addEventListener("click", getWeather);

cityInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    getWeather();
  }
});

// ==============================
// MAIN FUNCTION
// ==============================

async function getWeather() {
  const city = cityInput.value.trim();

  if (!city) {
    error.textContent = "Please enter a city name.";
    return;
  }

  error.textContent = "";

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
    city,
  )}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    console.log(data);

    // API ERROR HANDLING
    if (data.cod !== 200) {
      throw new Error(data.message || "City not found");
    }

    // ==============================
    // UPDATE UI
    // ==============================

    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    cityName.textContent = `${data.name}, ${data.sys.country}`;
    weatherDescription.textContent = data.weather[0].description;
    humidity.textContent = `${data.main.humidity}%`;
    wind.textContent = `${data.wind.speed} km/h`;
    locationText.textContent = `${data.name}, ${data.sys.country}`;

    mapFrame.src = `https://www.google.com/maps?q=${data.coord.lat},${data.coord.lon}&output=embed`;

    // ==============================
    // RESET BACKGROUNDS
    // ==============================

    document.body.classList.remove("sunny", "cloudy", "rainy", "snow", "mist");

    // ==============================
    // WEATHER DETECTION (FIXED LOGIC)
    // ==============================

    const weather = data.weather[0].main.toLowerCase();
    const desc = data.weather[0].description.toLowerCase();

    // SUNNY
    if (weather === "clear") {
      weatherIcon.textContent = "☀️";
      document.body.classList.add("sunny");
    }

    // CLOUDS
    else if (weather === "clouds") {
      weatherIcon.textContent = "☁️";
      document.body.classList.add("cloudy");
    }

    // RAIN / DRIZZLE
    else if (
      weather.includes("rain") ||
      weather === "drizzle" ||
      desc.includes("rain")
    ) {
      weatherIcon.textContent = "🌧️";
      document.body.classList.add("rainy");
    }

    // THUNDERSTORM
    else if (weather === "thunderstorm") {
      weatherIcon.textContent = "⛈️";
      document.body.classList.add("rainy");
    }

    // SNOW
    else if (weather === "snow") {
      weatherIcon.textContent = "❄️";
      document.body.classList.add("snow");
    }

    // MIST / FOG / HAZE / SMOKE
    else if (
      weather === "mist" ||
      weather === "fog" ||
      weather === "haze" ||
      weather === "smoke" ||
      desc.includes("fog") ||
      desc.includes("haze") ||
      desc.includes("smoke")
    ) {
      weatherIcon.textContent = "🌫️";
      document.body.classList.add("mist");
    }

    // DUST / SAND / ASH
    else if (weather === "dust" || weather === "sand" || weather === "ash") {
      weatherIcon.textContent = "🌫️";
      document.body.classList.add("mist");
    }

    // DEFAULT
    else {
      weatherIcon.textContent = "🌍";
      document.body.classList.add("cloudy");
    }
  } catch (err) {
    console.error(err);

    error.textContent = err.message;

    temperature.textContent = "--°C";
    cityName.textContent = "City";
    weatherDescription.textContent = "";
    humidity.textContent = "--%";
    wind.textContent = "-- km/h";
    locationText.textContent = "";
    weatherIcon.textContent = "❌";
    mapFrame.src = "";
  }
}
