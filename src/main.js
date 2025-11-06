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
        searchIcon.src = "/src/assets/icons/ui/arrow-left.svg";
    } else {
        searchIcon.src = "/src/assets/icons/ui/search.svg"
    }

    toggle = !toggle;
})