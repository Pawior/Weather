const today = new Date().toLocaleDateString();
const date = document.querySelector(".date");
const temp = document.querySelector(".temp");
const pressure = document.querySelector(".pressureP");
const wiatr = document.querySelector(".wiatrP");
const humidity = document.querySelector(".humidityP");
const smog = document.querySelector(".smogP");
const advice = document.querySelector(".adviceP");
const form = document.querySelector(".btn");
const cityName = document.querySelector(".city");
const wrotenCity = document.querySelector(".form-control");
const url = "https://api.openweathermap.org/data/2.5/weather?q=";
const urlLonLat = "https://api.openweathermap.org/data/2.5/weather?";
// const key = "&appid=f2799a9007994daa45c68492bae50498&units=metric"; // Stara zmienna, gdy nie pobierałem z pliku
const apiKod = "http://kodpocztowy.intami.pl/city/";
const city = wrotenCity;
import { apiKey } from "../data/config.js";
console.log(apiKey);
const key = apiKey;
// counter variables
let startMinutes = 1;
let timeCounter = startMinutes * 60;
const timer = document.querySelector(".time p");
// End of variables
setInterval(counter, 1000);
function counter() {
  let minutes = Math.floor(timeCounter / 60);
  let seconds = timeCounter % 60;
  if (seconds == 0) {
    seconds = "00";
    // minutes = minutes - 1;
  }

  if (seconds == 0 && minutes == 0) {
    const cityOnly = document.querySelector(".cityOnly");
    console.log(cityOnly.textContent);
    changeCity(url, key, cityOnly.textContent);
    timeCounter = 300;
  }
  timeCounter--;
  if (seconds < 10) {
    timer.innerHTML = `Aktualizacja za: ${minutes}:0${seconds}`;
  } else {
    timer.innerHTML = `Aktualizacja za: ${minutes}:${seconds}`;
  }
}
// Funkcja, żeby button nie odświeżał strony po kliknięciu go
function handleform(event) {
  event.preventDefault();
}
form.addEventListener("click", handleform);
// Get Geolocation
navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
function geoSuccess(pos) {
  const position = pos.coords;
  console.log(position.latitude);
  console.log(position.longitude);
  const searchParam = `lat=${position.latitude}&lon=${position.longitude}`;
  changeCity(urlLonLat, key, searchParam);
}
function geoError() {
  alert("Problem with geolocation");
}

// // Data
date.innerHTML = `, ${today}`; // Ustawienie daty

// Funkcja znajdywania po mieście
function changeCity(apiUrl, apiKey, searchParam, searchParamLontitude) {
  // cityName.innerHTML = `${searchParam}, ${today}`;
  fetch(apiUrl + searchParam + apiKey)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      temp.innerHTML = `${Math.round(data.main.temp)} °C`;
      humidity.innerHTML = `${Math.round(data.main.humidity)} %`;
      pressure.innerHTML = `${Math.round(data.main.pressure)} hPa`;
      const coordLon = data.coord.lon;
      const coordLat = data.coord.lat;
      cityName.innerHTML = `<span class="cityOnly">${data.name}</span>, ${today}`;

      // console.log(coordLon + " ///" + coordLat);
      fetch(
        `https://api.openweathermap.org/data/2.5/air_pollution?lat=${coordLat}&lon=${coordLon}&appid=f2799a9007994daa45c68492bae50498`
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          smog.innerHTML = `${Math.round(
            data.list[0].components.pm2_5
          )}  µg/m³`;
        });
    });
  // fetch(`http://kodpocztowy.intami.pl/api/${city.value}`) STARE API
  //   .then((response) => {
  //     return response.json();
  //   })
  //   .then((data) => {
  //     console.log(data);
  //     const cityFromPostal = data[0].miejscowosc;

  //   });
}

// Funkcja znajdywania po kodzie pocztowym
function changePostal(apiUrl, apiKey, searchParam) {
  fetch(
    `https://app.zipcodebase.com/api/v1/search?apikey=625df870-6187-11eb-a3e5-53ae15918210&codes=${searchParam.value}`
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      const cityFromPostal = data.results[searchParam.value][0].city;
      cityName.innerHTML = `<span class="cityOnly">${cityFromPostal}</span>, ${today}`;
      fetch(apiUrl + cityFromPostal + apiKey)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          temp.innerHTML = `${Math.round(data.main.temp)} °C`;
          humidity.innerHTML = `${Math.round(data.main.humidity)} %`;
          pressure.innerHTML = `${Math.round(data.main.pressure)} hPa`;
          const coordLon = data.coord.lon;
          const coordLat = data.coord.lat;
          // console.log(coordLon + " ///" + coordLat);
          fetch(
            `https://api.openweathermap.org/data/2.5/air_pollution?lat=${coordLat}&lon=${coordLon}&appid=f2799a9007994daa45c68492bae50498`
          )
            .then((response) => {
              return response.json();
            })
            .then((data) => {
              console.log(data);
              smog.innerHTML = `${Math.round(
                data.list[0].components.pm2_5
              )}  µg/m³`;
            });
        });
    });
}
// Funkcja sprawdzająca czy wpisany tekst ma numer w sobie, czyli czy to jest kod pocztowy czy nazwa miasta
function checkRequest(arg) {
  return /\d/g.test(arg.value);
}
// Event po kliknięciu buttona
form.addEventListener("click", function () {
  if (checkRequest(city)) {
    changePostal(url, key, city);
  } else {
    changeCity(url, key, city.value);
  }
});
// Linki do api
//  "https://api.openweathermap.org/data/2.5/weather?q=" +
// city.value +
// "&appid=f2799a9007994daa45c68492bae50498&units=metric"
//
//
// 52.235231, 21.017857 id: 337/259?
// "https://airapi.airly.eu/v2/installations/nearest?lat=52.235231&lng=21.017857&maxDistanceKM=5&maxResults=3"
//
// 8824 z https://airapi.airly.eu/v2/installations/nearest?lat=52.242802&lng=20.983483&maxDistanceKM=5&maxResults=5
// https://airapi.airly.eu/v2/measurements/installation?installationId=8824
// API KODY POCZTOWE HTTPS
// GET https://app.zipcodebase.com/api/v1/search?apikey=625df870-6187-11eb-a3e5-53ae15918210&codes=10005
