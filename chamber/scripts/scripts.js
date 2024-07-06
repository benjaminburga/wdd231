// weather.js

document.addEventListener('DOMContentLoaded', () => {
    const apiKey = 'edd374f3ab63378e96b1e547712e3509'; 

    const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Lima,pe&appid=${apiKey}&units=metric`;

    async function fetchWeather() {
        try {
            const response = await fetch(weatherApiUrl);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();

            // Obtener datos relevantes del clima
            const currentTemp = data.main.temp;
            const weatherDescription = data.weather[0].description;

            // Mostrar datos en la interfaz
            document.getElementById('current-temp').textContent = `${currentTemp}°C`;
            document.getElementById('weather-description').textContent = weatherDescription;

            // Obtener previsión de temperatura para los próximos 3 días
            const forecastApiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=Lima,pe&appid=${apiKey}&units=metric`;
            const forecastResponse = await fetch(forecastApiUrl);
            const forecastData = await forecastResponse.json();
            const dailyForecasts = forecastData.list.filter((forecast, index) => index % 8 === 0); // Obtener un pronóstico por día (cada 8 ítems)

            const forecastList = document.getElementById('forecast');
            forecastList.innerHTML = ''; // Limpia contenido previo

            dailyForecasts.forEach(forecast => {
                const forecastDate = new Date(forecast.dt * 1000);
                const dayOfWeek = forecastDate.toLocaleDateString('en-US', { weekday: 'short' });
                const forecastTemp = forecast.main.temp;
                const forecastDescription = forecast.weather[0].description;

                const listItem = document.createElement('li');
                listItem.textContent = `${dayOfWeek}: ${forecastTemp}°C - ${forecastDescription}`;
                forecastList.appendChild(listItem);
            });

        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    }

    fetchWeather();
});
