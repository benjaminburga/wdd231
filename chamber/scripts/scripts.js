document.addEventListener('DOMContentLoaded', async () => {
    const currentYear = new Date().getFullYear();
    document.getElementById('currentyear').textContent = currentYear;
    document.getElementById('lastModified').textContent = `Last Modified: ${document.lastModified}`;

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
            forecastList.innerHTML = ''; 

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

    // Function to fetch and display spotlight members
    async function fetchSpotlightMembers() {
        try {
            const response = await fetch('members.json'); 
            if (!response.ok) {
                throw new Error('Failed to fetch members data');
            }
            const members = await response.json();

            const qualifiedMembers = members.filter(member => {
                return member.membership === 'gold' || member.membership === 'silver';
            });

            // Shuffle the array of qualified members
            shuffleArray(qualifiedMembers);

            // Display two or three qualified members as spotlights
            const spotlightList = document.getElementById('spotlight-list');
            spotlightList.innerHTML = ''; 

            qualifiedMembers.slice(0, 3).forEach(member => {
                const spotlight = createSpotlightElement(member);
                spotlightList.appendChild(spotlight);
            });
        } catch (error) {
            console.error('Error fetching and displaying spotlight members:', error);
        }
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    // Helper function to create spotlight element for a member
    function createSpotlightElement(member) {
        const spotlight = document.createElement('div');
        spotlight.classList.add('spotlight');

        const image = document.createElement('img');
        image.src = member.image;
        image.alt = member.name;
        spotlight.appendChild(image);

        const name = document.createElement('h3');
        name.textContent = member.name;
        spotlight.appendChild(name);

        const description = document.createElement('p');
        description.textContent = member.description;
        spotlight.appendChild(description);

        return spotlight;
    }

    // Fetch weather data and spotlight members on page load
    fetchWeather();
    fetchSpotlightMembers();

    // Event listener for nav toggle
    const navToggle = document.querySelector('.nav-toggle');
    const nav = document.querySelector('nav');

    navToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
    });
});
