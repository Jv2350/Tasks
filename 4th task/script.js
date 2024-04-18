const apiKey = "80d0aa23fd84b45cf1ccc482926c292c"
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=bangalore";

async function checkWeather() {
  const response = await fetch(apiUrl + `&appid=${apikey}`);
  var data = await response.json();
  console.log(data)

  document.querySelector(".city").innerHTML = data.name;
  document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "℃";
  document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
  document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
}
checkWeather();