document.addEventListener('DOMContentLoaded', function() {
    const weatherContainer = document.getElementById('weather-container');
    const apiKey = 'a699049b0b45b54ba8a2c400887c288d';
    const city = 'LIMA'; 
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const weatherHTML = `
                <div class="weather-item">
                    <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="${data.weather[0].description}">
                    <p>${data.name}</p>
                    <p>${data.main.temp} °C</p>
                    <p>${data.weather[0].description}</p>
                </div>
            `;
            weatherContainer.innerHTML = weatherHTML;
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            weatherContainer.innerHTML = '<p>Unable to retrieve weather data at this time.</p>';
        });

    // Trefle API
    const plantsContainer = document.getElementById('plants-container');
    const trefleApiKey = 'pFHa1krx2STxoGmw5K0Hu3QDF1VJRbxWZdDvTz4tsfg'; 
    const trefleUrl = `https://trefle.io/api/v1/plants?token=${trefleApiKey}`;

    fetch(trefleUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (!data.data || data.data.length === 0) {
                throw new Error('No plant data found');
            }
            let plantsHTML = '';
            data.data.forEach(plant => {
                plantsHTML += `
                    <div class="plant-item">
                        <img src="${plant.image_url}" alt="${plant.common_name}">
                        <h3>${plant.common_name}</h3>
                        <p>${plant.scientific_name}</p>
                    </div>
                `;
            });
            plantsContainer.innerHTML = plantsHTML;
        })
        .catch(error => {
            console.error('Error fetching plants data:', error);
            plantsContainer.innerHTML = '<p>Unable to retrieve plants data at this time.</p>';
        });
});
