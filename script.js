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
const Url = "https://api.openweathermap.org/data/2.5/weather?q=";
const Key = "&appid=f2799a9007994daa45c68492bae50498&units=metric";
const apiKod = "http://kodpocztowy.intami.pl/city/";
const city = wrotenCity;
// End of variables
function handleform(event) {
  event.preventDefault();
}
form.addEventListener("click", handleform);

date.innerHTML = `, ${today}`;
cisnienie.innerHTML = `, ${today}`;
wilgotnosc.innerHTML = `, ${today}`;
smog.innerHTML = `, ${today}`;
console.log(today);

fetch(
  "https://airapi.airly.eu/v2/measurements/installation?installationId=8824TEST",
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

function changeCity(apiUrl, apiKey, searchParam) {
  cityName.innerHTML = `${city.value}, ${today}`;
  fetch(apiUrl + city.value + apiKey)
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
  //   });
}
function changePostal(Url, Key) {}
form.addEventListener("click", function () {
  changeCity(Url, Key, city);
});
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
