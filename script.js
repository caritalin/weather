
let weather = {
  apiKey: "a240e2ff1c9c0d936c91e2a04f73beab",  // My personal API key for fetching weather from Openweathermap website
  fetchWeatherData: function (city) {
    fetch(              // Forming an URL code for fetching weather from the site using city and API key
      "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=" + this.apiKey
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => this.displayWeather(data));
  },
  displayWeather: function (data) {   // Collecting data from Openweathermap for the top part that shows todays weather
    const { name } = data;
    const { country } = data.sys
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    document.querySelector(".city").innerText = name + ", " + country;    // Show city and country where the data is from
    document.querySelector(".icon").src =             // Collect icons for weather
      "https://openweathermap.org/img/w/" + icon + ".png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = Math.round(temp) + "°C";
    document.querySelector(".humidity").innerText =
      "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText =
      "Wind speed: " + speed + " m/s";
    document.querySelector(".weather").classList.remove("loading");
  },
};
weather.fetchWeatherData("Tampere");      // Collecting data for the next three days part
const apiKey = "a240e2ff1c9c0d936c91e2a04f73beab";
const cities = "Tampere,FI";
const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cities}&appid=${apiKey}&units=metric`;
fetch(apiUrl)           // Fetch data for next three days part
  .then(response => response.json())
  .then(data => {
    const dailyWeather = {};
    data.list.forEach(weather => {
      const date = new Date(weather.dt * 1000);
      const hour = date.getHours();
      const day = date.toLocaleDateString("en-US", {day: "2-digit", month: "2-digit", year: "numeric"}); // Show date information in 2-digit
      if (hour >= 8 && hour <= 22) { // Only add temperatures between 8 am and 10 pm

        if (!dailyWeather[day]) {
          dailyWeather[day] = {temperatures: [], icon: weather.weather[0].icon};
        }
      dailyWeather[day].temperatures.push(weather.main.temp);
      }
    });
    
    const weatherDiv = document.getElementById("weather_2");
const today = new Date().toLocaleDateString("en-US", {day: "2-digit", month: "2-digit", year: "numeric"});
let daysShown = 0;

Object.keys(dailyWeather).forEach(day => {
if (day !== today && daysShown < 3) {     // From here you can choose how many days program will show
const temperatures = dailyWeather[day].temperatures;
const icon = `http://openweathermap.org/img/w/${dailyWeather[day].icon}.png`;
const averageTemp = Math.round(temperatures.reduce((total, temp) => total + temp, 0) / temperatures.length); // Round temperature to show only rounded value
const weatherBox = document.createElement("div");
weatherBox.classList.add("weather-box");
const date = new Date(day);
const weekday = date.toLocaleDateString("en-US", {weekday: "short"});
const monthDay = date.toLocaleDateString("fi-FI", { day: "2-digit", month: "numeric" }).replace(/(\d{2})\/(\d{2})/, "$2.$1"); // Show which dates weather is showing 
const dateTime = document.createElement("p");
dateTime.innerHTML = `${weekday} ${monthDay}`;
const temp = document.createElement("div");
temp.classList.add("temp-hourly");
temp.innerHTML = `${averageTemp} &deg;C`;
const weatherIcon = document.createElement("img");
weatherIcon.src = icon;
weatherBox.appendChild(dateTime);
weatherBox.appendChild(temp);
weatherBox.appendChild(weatherIcon);
weatherDiv.appendChild(weatherBox);
daysShown++;
}
});

    
  })
  .catch(error => console.log(error));
  
// refresh data every 5 minutes
setTimeout(function() { window.location=window.location;}, 300000);
