import searchImg from "./assets/icons/ui/search.svg"
import arrowImg from "./assets/icons/ui/arrow-left.svg.svg"

fetch('/src/sample_data/sample_data.json')
    .then(response => {
    
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }
    
        return response.json()
    })
    .then(data => console.log(data))
    .catch(error => console.error('Error occurred: ', error))

const searchBtn = document.querySelector(".search-btn")
const searchIcon = document.querySelector("#search-icon")

let toggle = false

searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector(".search-container").classList.toggle("hidden");
    document.querySelector(".blur-container").classList.toggle("hidden");

    let searchIconSrc = searchIcon.src
    console.log(searchIconSrc)

    if (!toggle) {
        searchIcon.src = searchImg;
    } else {
        searchIcon.src = arrowImg;
    }

    toggle = !toggle;
})

const searchInput = document.getElementById("search-input")
const searchBar = document.querySelector(".search-bar")
let value;

searchBar.addEventListener("submit", (e) => {
    e.preventDefault();

    value = searchInput.value;
    console.log(`Submitted: ${value}`);
    searchInput.value = "";

    document.querySelector(".search-container").classList.toggle("hidden");
    document.querySelector(".blur-container").classList.toggle("hidden");

    if (!toggle) {
        searchIcon.src = arrowImg;
    } else {
        searchIcon.src = searchImg;
    }

    toggle = !toggle;
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