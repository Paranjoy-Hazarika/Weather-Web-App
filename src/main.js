import sample_data from './sample_data/sample_data.json';

import "/node_modules/bootstrap-icons/font/bootstrap-icons.min.css";

// Buttons & Containers

const searchBtn = document.querySelector(".search-btn")
const searchIcon = document.querySelector("#search-icon");
const searchContainer = document.querySelector(".search-container");
const searchInput = document.getElementById("search-input")
const searchBar = document.querySelector(".search-bar")
const blurContainer = document.querySelector(".blur-container");
const calendarBtn = document.querySelector(".calendar-btn");
const nextDaysSection = document.querySelector(".days-section")
const backToMain = document.querySelector(".back-btn");

const cityBox = document.getElementById("city");
const dateBox = document.getElementById("date");
const tempBox = document.getElementById("current-temp");
const weatherBox = document.getElementById("current-conds");
const rain = document.getElementById("rain-data")
const humidity = document.getElementById("humidity-data")
const wind = document.getElementById("wind-data")

const API_KEY = '75b1486f1ab3fddbcfce6813e460be82'

const date = new Date()
let cityInput;

const currentDate = date.toLocaleString('en-US', { weekday: 'short', month: 'short', day: '2-digit' });

// API CALLS

//  First Api call to geocoding api: http://api.openweathermap.org/geo/1.0/direct?q=Stockholm&limit={number of outcomes: 1 preferred}&appid={API_KEY}
// - to get the lat and lon of that place

//  Then the weather api: https://api.openweathermap.org/data/2.5/weather?lat=59.3251172&lon=18.0710935&appid=API_KEY
// - with the values we get for lon and lat from the  earlier api call to get the place's weather

//

dateBox.innerText = `${currentDate}`

// Icon and Hidden Section Toggle

const toggleSection = () => {
    searchContainer.classList.toggle("hidden");
    blurContainer.classList.toggle("hidden");
}

const toggleIcons = () => {
    if (searchIcon.classList.contains("bi-search")) {
        searchIcon.classList.remove("bi-search");
        searchIcon.classList.add("bi-arrow-left");
    } else if (searchIcon.classList.contains("bi-arrow-left")) {
        searchIcon.classList.remove("bi-arrow-left");
        searchIcon.classList.add("bi-search");
    }
}

// Event Listener

searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    
    toggleSection();
    toggleIcons();
})

searchBar.addEventListener("submit", (e) => {
    e.preventDefault();

    cityInput = searchInput.value;
    console.log(`Submitted: ${cityInput}`);
    
    loadWeather(cityInput);
    toggleSection();
    toggleIcons();

    apiHandling(cityInput);
    
    searchInput.value = "";
})


calendarBtn.addEventListener("click", (e) => {
    nextDaysSection.classList.toggle("hidden");
    nextDaysSection.style.left = "0%";
})


backToMain.addEventListener("click", () => {
    nextDaysSection.classList.toggle("hidden");
    nextDaysSection.style.left = "100%";
})

const loadWeather = (cityName) => {
    cityBox.innerText = `${cityName}`;
}


// Handling API

const apiHandling = (cityName) => {
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTPS error: ${response.status}`)
            }

            return response.json()
        })
        .then(data => {
            console.log(data)
            let lat = data[0].lat;
            let lon = data[0].lon;

            weatherHandling(lat, lon)
            
        })
        .catch(error => console.error(`Error occurred: ${error}`))
}

const weatherHandling = (lat, lon) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
        .then(response => {
            
            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`)
            }

            return response.json();
        })
        .then(data => {
        
            console.log(data)
            
            const stateName = data.name;
            const countryCode = data.sys.country;
            const countryName = new Intl.DisplayNames(["en"], { type: "region" }).of(countryCode);
            const currentTemp = data.main.temp;
            const weatherConds = data.weather[0].main;
            const rainMeasure = data.rain ? data.rain["1h"] || data.rain["3h"] || 0 : 0;
            const windMeasure = data.wind.speed;
            const humidityMeasure = data.main.humidity;

            uiUpdate(stateName, countryName, currentTemp, weatherConds, rainMeasure, windMeasure, humidityMeasure);
            
        })
        .catch(error => console.error(`Error occurred: ${error}`))
    }
    
const uiUpdate = (stateName, countryName, current_temp, weather_cond, rain_measure, wind_measure, humidity_measure) => {
    cityBox.innerHTML = `${stateName}, <br> ${countryName}`;    
    
    tempBox.innerText = `${Math.round(current_temp)}`
    weatherBox.innerText = `${weather_cond}`
    
    rain.innerText = `${rain_measure} mm`
    wind.innerText = `${wind_measure.toFixed(1)} m/s`;
    humidity.innerText = `${humidity_measure} %`;

}

// Dummy Practice
