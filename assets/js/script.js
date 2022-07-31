// find current day/month/year
var timeDisplayEl = document.querySelector("#time-display");
timeDisplayEl.textContent = moment().format("dddd MMMM Mo YYYY");

// save tasks to local storage upon clicking save icon
$(document).ready(function () { 
  $('.saveBtn').on('click', function () {
    var tasks = $(this).siblings(".textarea").val();
    var time = $(this).parent().attr('id');

    // save tasks
    localStorage.setItem(time, tasks);
  })

  function timeBlocks() {
    // get current hour
    var currentHour = moment().hour();

    // check each time block and reference to current hour
    $(".time-block").each(function () {
      // split id so that hour in timeblock can be used as numerical value
      var timeSplit = parseInt($(this).attr("id").split("-")[1]);

      // timeblock is in the past
      if (timeSplit < currentHour) {
        $(this).removeClass("present");
        $(this).removeClass("future");
        $(this).addClass("past");

      // timeblock is in the present  
      } else if (timeSplit === currentHour) {
        $(this).removeClass("past");
        $(this).removeClass("future");
        $(this).addClass("present");
        
      // timeblock is in the future  
      } else {
        $(this).removeClass("past");
        $(this).removeClass("present");
        $(this).addClass("future");
      }
    })
  }

    // grab tasks from local storage and place them in timeblock upon refresh
    $("#hour-9 .textarea").val(localStorage.getItem("hour-9"));
    $("#hour-10 .textarea").val(localStorage.getItem("hour-10"));
    $("#hour-11 .textarea").val(localStorage.getItem("hour-11"));
    $("#hour-12 .textarea").val(localStorage.getItem("hour-12"));
    $("#hour-13 .textarea").val(localStorage.getItem("hour-13"));
    $("#hour-14 .textarea").val(localStorage.getItem("hour-14"));
    $("#hour-15 .textarea").val(localStorage.getItem("hour-15"));
    $("#hour-16 .textarea").val(localStorage.getItem("hour-16"));
    $("#hour-17 .textarea").val(localStorage.getItem("hour-17"));

// call main function for timeblocks 
timeBlocks();
});




function getWeather(cityName) {
  // Execute a current weather get request from open weather api
  let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIKey;
  axios.get(queryURL)
      .then(function (response) {

          todayweatherEl.classList.remove("d-none");

          // Parse response to display current weather
          const currentDate = new Date(response.data.dt * 1000);
          const day = currentDate.getDate();
          const month = currentDate.getMonth() + 1;
          const year = currentDate.getFullYear();
          nameEl.innerHTML = response.data.name + " (" + month + "/" + day + "/" + year + ") ";
          let weatherPic = response.data.weather[0].icon;
          currentPicEl.setAttribute("src", "https://openweathermap.org/img/wn/" + weatherPic + "@2x.png");
          currentPicEl.setAttribute("alt", response.data.weather[0].description);
          currentTempEl.innerHTML = "Temperature: " + k2f(response.data.main.temp) + " &#176F";
          currentHumidityEl.innerHTML = "Humidity: " + response.data.main.humidity + "%";
          currentWindEl.innerHTML = "Wind Speed: " + response.data.wind.speed + " MPH";
          
          // Get UV Index
          let lat = response.data.coord.lat;
          let lon = response.data.coord.lon;
          let UVQueryURL = "https://api.openweathermap.org/data/2.5/uvi/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey + "&cnt=1";
          axios.get(UVQueryURL)
              .then(function (response) {
                  let UVIndex = document.createElement("span");
                  
                  // When UV Index is good, shows green, when ok shows yellow, when bad shows red
                  if (response.data[0].value < 4 ) {
                      UVIndex.setAttribute("class", "badge badge-success");
                  }
                  else if (response.data[0].value < 8) {
                      UVIndex.setAttribute("class", "badge badge-warning");
                  }
                  else {
                      UVIndex.setAttribute("class", "badge badge-danger");
                  }
                  console.log(response.data[0].value)
                  UVIndex.innerHTML = response.data[0].value;
                  currentUVEl.innerHTML = "UV Index: ";
                  currentUVEl.append(UVIndex);
              });
          
          // Get 5 day forecast for this city
          let cityID = response.data.id;
          let forecastQueryURL = "https://api.openweathermap.org/data/2.5/forecast?id=" + cityID + "&appid=" + APIKey;
          axios.get(forecastQueryURL)
              .then(function (response) {
                  fivedayEl.classList.remove("d-none");
                  
                  //  Parse response to display forecast for next 5 days
                  const forecastEls = document.querySelectorAll(".forecast");
                  for (i = 0; i < forecastEls.length; i++) {
                      forecastEls[i].innerHTML = "";
                      const forecastIndex = i * 8 + 4;
                      const forecastDate = new Date(response.data.list[forecastIndex].dt * 1000);
                      const forecastDay = forecastDate.getDate();
                      const forecastMonth = forecastDate.getMonth() + 1;
                      const forecastYear = forecastDate.getFullYear();
                      const forecastDateEl = document.createElement("p");
                      forecastDateEl.setAttribute("class", "mt-3 mb-0 forecast-date");
                      forecastDateEl.innerHTML = forecastMonth + "/" + forecastDay + "/" + forecastYear;
                      forecastEls[i].append(forecastDateEl);

                      // Icon for current weather
                      const forecastWeatherEl = document.createElement("img");
                      forecastWeatherEl.setAttribute("src", "https://openweathermap.org/img/wn/" + response.data.list[forecastIndex].weather[0].icon + "@2x.png");
                      forecastWeatherEl.setAttribute("alt", response.data.list[forecastIndex].weather[0].description);
                      forecastEls[i].append(forecastWeatherEl);
                      const forecastTempEl = document.createElement("p");
                      forecastTempEl.innerHTML = "Temp: " + k2f(response.data.list[forecastIndex].main.temp) + " &#176F";
                      forecastEls[i].append(forecastTempEl);
                      const forecastHumidityEl = document.createElement("p");
                      forecastHumidityEl.innerHTML = "Humidity: " + response.data.list[forecastIndex].main.humidity + "%";
                      forecastEls[i].append(forecastHumidityEl);
                  }
              })
      });
}


function initPage() {
  const cityEl = document.getElementById("enter-city");
  const searchEl = document.getElementById("search-button");
  const clearEl = document.getElementById("clear-history");
  const nameEl = document.getElementById("city-name");
  const currentPicEl = document.getElementById("current-pic");
  const currentTempEl = document.getElementById("temperature");
  const currentHumidityEl = document.getElementById("humidity");
  const currentWindEl = document.getElementById("wind-speed");
  const currentUVEl = document.getElementById("UV-index");
  const historyEl = document.getElementById("history");
  var fivedayEl = document.getElementById("fiveday-header");
  var todayweatherEl = document.getElementById("today-weather");
  let searchHistory = JSON.parse(localStorage.getItem("search")) || [];

  // Assigning a unique API to a variable
  const APIKey = "84b79da5e5d7c92085660485702f4ce8";

  function getWeather(cityName) {
      // Execute a current weather get request from open weather api
      let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIKey;
      axios.get(queryURL)
          .then(function (response) {

              todayweatherEl.classList.remove("d-none");

              // Parse response to display current weather
              const currentDate = new Date(response.data.dt * 1000);
              const day = currentDate.getDate();
              const month = currentDate.getMonth() + 1;
              const year = currentDate.getFullYear();
              nameEl.innerHTML = response.data.name + " (" + month + "/" + day + "/" + year + ") ";
              let weatherPic = response.data.weather[0].icon;
              currentPicEl.setAttribute("src", "https://openweathermap.org/img/wn/" + weatherPic + "@2x.png");
              currentPicEl.setAttribute("alt", response.data.weather[0].description);
              currentTempEl.innerHTML = "Temperature: " + k2f(response.data.main.temp) + " &#176F";
              currentHumidityEl.innerHTML = "Humidity: " + response.data.main.humidity + "%";
              currentWindEl.innerHTML = "Wind Speed: " + response.data.wind.speed + " MPH";
              
              // Get UV Index
              let lat = response.data.coord.lat;
              let lon = response.data.coord.lon;
              let UVQueryURL = "https://api.openweathermap.org/data/2.5/uvi/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey + "&cnt=1";
              axios.get(UVQueryURL)
                  .then(function (response) {
                      let UVIndex = document.createElement("span");
                      
                      // When UV Index is good, shows green, when ok shows yellow, when bad shows red
                      if (response.data[0].value < 4 ) {
                          UVIndex.setAttribute("class", "badge badge-success");
                      }
                      else if (response.data[0].value < 8) {
                          UVIndex.setAttribute("class", "badge badge-warning");
                      }
                      else {
                          UVIndex.setAttribute("class", "badge badge-danger");
                      }
                      console.log(response.data[0].value)
                      UVIndex.innerHTML = response.data[0].value;
                      currentUVEl.innerHTML = "UV Index: ";
                      currentUVEl.append(UVIndex);
                  });
              
              // Get 5 day forecast for this city
              let cityID = response.data.id;
              let forecastQueryURL = "https://api.openweathermap.org/data/2.5/forecast?id=" + cityID + "&appid=" + APIKey;
              axios.get(forecastQueryURL)
                  .then(function (response) {
                      fivedayEl.classList.remove("d-none");
                      
                      //  Parse response to display forecast for next 5 days
                      const forecastEls = document.querySelectorAll(".forecast");
                      for (i = 0; i < forecastEls.length; i++) {
                          forecastEls[i].innerHTML = "";
                          const forecastIndex = i * 8 + 4;
                          const forecastDate = new Date(response.data.list[forecastIndex].dt * 1000);
                          const forecastDay = forecastDate.getDate();
                          const forecastMonth = forecastDate.getMonth() + 1;
                          const forecastYear = forecastDate.getFullYear();
                          const forecastDateEl = document.createElement("p");
                          forecastDateEl.setAttribute("class", "mt-3 mb-0 forecast-date");
                          forecastDateEl.innerHTML = forecastMonth + "/" + forecastDay + "/" + forecastYear;
                          forecastEls[i].append(forecastDateEl);

                          // Icon for current weather
                          const forecastWeatherEl = document.createElement("img");
                          forecastWeatherEl.setAttribute("src", "https://openweathermap.org/img/wn/" + response.data.list[forecastIndex].weather[0].icon + "@2x.png");
                          forecastWeatherEl.setAttribute("alt", response.data.list[forecastIndex].weather[0].description);
                          forecastEls[i].append(forecastWeatherEl);
                          const forecastTempEl = document.createElement("p");
                          forecastTempEl.innerHTML = "Temp: " + k2f(response.data.list[forecastIndex].main.temp) + " &#176F";
                          forecastEls[i].append(forecastTempEl);
                          const forecastHumidityEl = document.createElement("p");
                          forecastHumidityEl.innerHTML = "Humidity: " + response.data.list[forecastIndex].main.humidity + "%";
                          forecastEls[i].append(forecastHumidityEl);
                      }
                  })
          });
  }

  // Get history from local storage if any
  searchEl.addEventListener("click", function () {
      const searchTerm = cityEl.value;
      getWeather(searchTerm);
      searchHistory.push(searchTerm);
      localStorage.setItem("search", JSON.stringify(searchHistory));
      renderSearchHistory();
  })

  // Clear History button
  clearEl.addEventListener("click", function () {
      localStorage.clear();
      searchHistory = [];
      renderSearchHistory();
  })

  function k2f(K) {
      return Math.floor((K - 273.15) * 1.8 + 32);
  }

  function renderSearchHistory() {
      historyEl.innerHTML = "";
      for (let i = 0; i < searchHistory.length; i++) {
          const historyItem = document.createElement("input");
          historyItem.setAttribute("type", "text");
          historyItem.setAttribute("readonly", true);
          historyItem.setAttribute("class", "form-control d-block bg-white");
          historyItem.setAttribute("value", searchHistory[i]);
          historyItem.addEventListener("click", function () {
              getWeather(historyItem.value);
          })
          historyEl.append(historyItem);
      }
  }

  renderSearchHistory();
  if (searchHistory.length > 0) {
      getWeather(searchHistory[searchHistory.length - 1]);
  }
  
}

initPage();