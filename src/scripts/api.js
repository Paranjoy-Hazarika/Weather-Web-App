const API_KEY = '123'

export const apiHandling = (cityName, city) => {
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTPS error: ${response.status}`)
            }

            return response.json()
        })
        .then(data => {
            console.log(data)
            city.innerHTML = `${data[0].name} <br> ${data[0].state}`
        })
        .catch(error => console.error(`Error occurred: ${error}`))
}

const weatherHandling = () => {

}