const cityInput = document.querySelector('#cityInput');
const searchBtn = document.querySelector('.search-btn'); 
const weatherIcon = document.querySelector('#weatherIcon');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidityValue');
const wind_speed = document.getElementById('windValue');
const weatherBox = document.querySelector('.WeatherBox');


const API_KEY = '8a0cbd3982aeaf3ac38a770584fb37a0';

searchBtn.addEventListener('click', async () => {
    const city = cityInput.value.trim();
    if (!city) return alert('Please enter a city name.');

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();

       if (data.cod === '404') {
            weatherBox.style.display = 'block';
            temperature.innerHTML = '';
            description.innerHTML = 'City not found';
            humidity.innerHTML = '0';
            wind_speed.innerHTML = '0';
            weatherIcon.src = 'img/404.png';
            return;
        }

        weatherBox.style.display = 'block';
        temperature.innerHTML = `${Math.round(data.main.temp)}<sup>°C</sup>`;
        description.innerHTML = data.weather[0].description;
        humidity.innerHTML = data.main.humidity;
        wind_speed.innerHTML = data.wind.speed;

        
        const mainWeather = data.weather[0].main.toLowerCase();

        let iconPath = 'img/clear.png'; 

        if (mainWeather.includes('cloud')) {
            iconPath = 'img/cloud.png';
        } else if (mainWeather.includes('rain')) {
            iconPath = 'img/rain.png';
        } else if (mainWeather.includes('snow')) {
            iconPath = 'img/snow.png';
        } else if (mainWeather.includes('mist') || mainWeather.includes('fog')) {
            iconPath = 'img/mist.png';
        } else if (mainWeather.includes('clear')) {
            iconPath = 'img/clear.png';
        }

        weatherIcon.src = iconPath;

        //  const iconCode = data.weather[0].icon;
        // weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    } catch (error) {
        console.error('Error:', error);
        weatherBox.style.display = 'block';
        temperature.innerHTML = '';
        description.innerHTML = 'Error fetching data';
        humidity.innerHTML = '0';
        wind_speed.innerHTML = '0';
        weatherIcon.src = 'img/404.png';
    }
});
