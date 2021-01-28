const today = new Date().toLocaleDateString();
const date = document.querySelector(".date");
const temp = document.querySelector(".temp");
const cisnienie = document.querySelector(".cisnienieP");
const wiatr = document.querySelector(".wiatrP");
const wilgotnosc = document.querySelector(".wilgotnoscP");
const smog = document.querySelector(".smogP");
const advice = document.querySelector(".adviceP");
const form = document.querySelector(".btn");
const cityName = document.querySelector(".city");
const wrotenCity = document.querySelector(".form-control");
const url = "https://api.openweathermap.org/data/2.5/weather?q=";
const key = "&appid=f2799a9007994daa45c68492bae50498&units=metric";
const apiKod = "http://kodpocztowy.intami.pl/city/";
const city = wrotenCity;
// End of variables

// Funkcja, żeby button nie odświeżał strony po kliknięciu go
function handleform(event) {
  event.preventDefault();
}
form.addEventListener("click", handleform);

date.innerHTML = `, ${today}`; // Ustawienie daty
// Pobieranie danych domyślnie po włączeniu strony
fetch(
  "https://airapi.airly.eu/v2/measurements/installation?installationId=8824",
  {
    method: "GET",
    headers: {
      Accept: "application/json",
      apikey: "jXFSvsuig02RrkGOoHoAXTUbnbw5wiHo",
    },
  }
)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(data);
    console.log(data.current.values[5].value);
    temp.innerHTML = `${Math.round(data.current.values[5].value)} °C`;
    cisnienie.innerHTML = `${Math.round(data.current.values[3].value)} hPa`;
    wilgotnosc.innerHTML = `${Math.round(data.current.values[4].value)} %`;
    smog.innerHTML = `${Math.round(data.current.values[1].value)} µg/m³`;
    // advice.innerHTML = `${data.current.indexes[0].advice} `; Brak w api openweather
  });
// Funkcja znajdywania po mieście
function changeCity(apiUrl, apiKey, searchParam) {
  cityName.innerHTML = `${searchParam.value}, ${today}`;
  fetch(apiUrl + searchParam.value + apiKey)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      temp.innerHTML = `${Math.round(data.main.temp)} °C`;
      wilgotnosc.innerHTML = `${Math.round(data.main.humidity)} %`;
      cisnienie.innerHTML = `${Math.round(data.main.pressure)} hPa`;
      const coordLon = data.coord.lon;
      const coordLat = data.coord.lat;
      // console.log(coordLon + " ///" + coordLat);
      fetch(
        `http://api.openweathermap.org/data/2.5/air_pollution?lat=${coordLat}&lon=${coordLon}&appid=f2799a9007994daa45c68492bae50498`
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
  // fetch(`http://kodpocztowy.intami.pl/api/${city.value}`)
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
  fetch(`http://kodpocztowy.intami.pl/api/${searchParam.value}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      const cityFromPostal = data[0].miejscowosc;
      cityName.innerHTML = `${cityFromPostal}, ${today}`;
      fetch(apiUrl + cityFromPostal + apiKey)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          temp.innerHTML = `${Math.round(data.main.temp)} °C`;
          wilgotnosc.innerHTML = `${Math.round(data.main.humidity)} %`;
          cisnienie.innerHTML = `${Math.round(data.main.pressure)} hPa`;
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
    changeCity(url, key, city);
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
