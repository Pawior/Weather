let today = new Date().toLocaleDateString();
const date = document.querySelector(".date");
let temp = document.querySelector(".temp");
const cisnienie = document.querySelector(".cisnienieP");
const wiatr = document.querySelector(".wiatrP");
const wilgotnosc = document.querySelector(".wilgotnoscP");
const smog = document.querySelector(".smogP");
const advice = document.querySelector(".adviceP");

date.innerHTML = `, ${today}`;
cisnienie.innerHTML = `, ${today}`;
wilgotnosc.innerHTML = `, ${today}`;
smog.innerHTML = `, ${today}`;
console.log(today);

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
    advice.innerHTML = `${data.current.indexes[0].advice} `;
  });
// 52.235231, 21.017857 id: 337/259?
// "https://airapi.airly.eu/v2/installations/nearest?lat=52.235231&lng=21.017857&maxDistanceKM=5&maxResults=3"
//
// 8824 z https://airapi.airly.eu/v2/installations/nearest?lat=52.242802&lng=20.983483&maxDistanceKM=5&maxResults=5
// https://airapi.airly.eu/v2/measurements/installation?installationId=8824
