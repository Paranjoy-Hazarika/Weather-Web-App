fetch('/src/sample_data/sample_data.json')
    .then(response => {
    
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }
    
        return response.json()
    })
    .then(data => console.log(data))
    .catch(error => console.error('Error occurred: ', error))


document.querySelector(".search-btn").addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector(".search-container").classList.toggle("active");
    document.querySelector(".search-bar").classList.toggle("active")
})