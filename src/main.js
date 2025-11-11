import sample_data from './sample_data/sample_data.json';

import "/node_modules/bootstrap-icons/font/bootstrap-icons.min.css";

import { apiHandling } from './scripts/api.js'


// API CALLS

//  First Api call to geocoding api: http://api.openweathermap.org/geo/1.0/direct?q=Stockholm&limit={number of outcomes: 1 preferred}&appid={API_KEY}
// - to get the lat and lon of that place

//  Then the weather api: https://api.openweathermap.org/data/2.5/weather?lat=59.3251172&lon=18.0710935&appid=API_KEY
// - with the values we get for lon and lat from the  earlier api call to get the place's weather

//


console.log(sample_data) // only for a fixed data (use fetch when using an actual api key)


// fetch(sample_data)
//     .then(response => {
    
//         if (!response.ok) {
//             throw new Error(`HTTP error: ${response.status}`);
//         }
    
//         return response.json()
//     })
//     .then(data => console.log(data))
//     .catch(error => console.error('Error occurred: ', error))


const searchBtn = document.querySelector(".search-btn")
const searchIcon = document.querySelector("#search-icon");
const searchContainer = document.querySelector(".search-container");
const blurContainer = document.querySelector(".blur-container");

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

searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    
    toggleSection();
    toggleIcons();
})

const searchInput = document.getElementById("search-input")
const searchBar = document.querySelector(".search-bar")
let value;

const city = document.getElementById("city");
const date = document.getElementById("date")

searchBar.addEventListener("submit", (e) => {
    e.preventDefault();

    value = searchInput.value;
    console.log(`Submitted: ${value}`);
    
    loadWeather(value);
    toggleSection();
    toggleIcons();

    // apiHandling(value, city);
    
    searchInput.value = "";
})

const calendarBtn = document.querySelector(".calendar-btn");
const nextDaysSection = document.querySelector(".days-section")

calendarBtn.addEventListener("click", (e) => {
    nextDaysSection.classList.toggle("hidden");
    nextDaysSection.style.left = "0%";
})

const backToMain = document.querySelector(".back-btn");

backToMain.addEventListener("click", () => {
    nextDaysSection.classList.toggle("hidden");
    nextDaysSection.style.left = "100%";
})


const loadWeather = (cityName) => {
    city.innerText = `${cityName}`;
}
