const searchButton = document.getElementById('search-btn');
const locationInput = document.getElementById('location');
const weatherData = document.getElementById('weather-data');

searchButton.addEventListener('click', () => {
  const location = locationInput.value.trim();
  if (location !== '') {
    getWeatherData(location);
  }
});

async function getWeatherData(location) {
  const apiKey = 'YOUR_API_KEY';
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (response.ok) {
      displayWeatherData(data);
    } else {
      weatherData.textContent = 'Location not found';
    }
  } catch (error) {
    console.error('Error fetching weather data:', error);
    weatherData.textContent = 'An error occurred. Please try again later.';
  }
}

function displayWeatherData(data) {
  const temperature = data.main.temp;
  const description = data.weather[0].description;
  const icon = data.weather[0].icon;

  weatherData.innerHTML = `
    <img src="http://openweathermap.org/img/wn/${icon}.png" alt="${description}">
    <p>Temperature: ${temperature}°C</p>
    <p>Description: ${description}</p>
  `;
}
