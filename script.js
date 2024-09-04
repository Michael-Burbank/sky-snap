let weather = {
  apiKey: "c3ba1e077073d676fb8ce4f9235c263f",
  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&appid=" +
        this.apiKey
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("City not found!");
        }
        return response.json();
      })
      .then((data) => this.displayWeather(data))
      .catch((error) => this.displayError(error));
  },
  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    document.querySelector(".city").innerText = "Weather in " + name;
    document.querySelector(".temp").innerText =
      Math.round(temp - 273.15) + "°C";
    document.querySelector(".icon").src =
      "http://openweathermap.org/img/w/" + icon + ".png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".humidity").innerText =
      "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText =
      "Wind speed: " + Math.round(speed * 3.6) + " km/h";
    document.querySelector(".weather").classList.remove("loading");
  },
  displayError: function (error) {
    document.querySelector(".city").innerText = error.message;
    document.querySelector(".temp").innerText = "";
    document.querySelector(".icon").src = "";
    document.querySelector(".description").innerText = "";
    document.querySelector(".humidity").innerText = "";
    document.querySelector(".wind").innerText = "";
    document.querySelector(".weather").classList.remove("loading");
  },
  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
};

document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});
document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });

weather.fetchWeather("Karachi");

// Toggling the light dark mode switch

const switchBtn = document.querySelector(".switch");
const lightBtn = document.querySelector("#light");
const darkBtn = document.querySelector("#dark");
const body = document.querySelector("body");
const card = document.querySelector(".card");
const heroText = document.querySelector(".hero-text");

// Set initial state
let isLightMode = true; // Assuming light mode is the initial state

switchBtn.addEventListener("click", function () {
  if (isLightMode) {
    // Switch to dark mode
    lightBtn.style.opacity = 0;
    darkBtn.style.opacity = 1;
    body.style.background =
      "url('https://images.unsplash.com/photo-1540582685196-7f031fa5354e?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')";
    card.style.background =
      "url('https://images.unsplash.com/photo-1585517342886-1f076085742a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')";

    function updateColors() {
      document.documentElement.style.setProperty(
        "--search-bg-color",
        "#445C7F"
      );
      document.documentElement.style.setProperty(
        "--btn-hover-color",
        "#5a7399"
      );
      card.style.border = "1px solid #cbd0de";
      heroText.style.color = "#224769";
    }

    // Call the function to apply the new colors
    updateColors();
  } else {
    // Switch to light mode
    lightBtn.style.opacity = 1;
    darkBtn.style.opacity = 0;
    body.style.background =
      "url('https://images.unsplash.com/photo-1499988921418-b7df40ff03f9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')";
    card.style.background =
      "url('https://images.pexels.com/photos/7130557/pexels-photo-7130557.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')";
    function unUpdateColors() {
      document.documentElement.style.setProperty(
        "--search-bg-color",
        "#d08677"
      );
      document.documentElement.style.setProperty(
        "--btn-hover-color",
        "#e69e90"
      );
      card.style.border = "2px solid #f0d1cb";
      heroText.style.color = "#d1d8e6";
    }
    unUpdateColors();
  }

  body.style.backgroundSize = "cover";
  card.style.backgroundSize = "cover"; // Ensure the card background also covers

  // Toggle the mode
  isLightMode = !isLightMode;
});
