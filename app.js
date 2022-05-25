let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const formElem = document.querySelector('form')
const searchInputElem = document.querySelector('.search-box')
const tempElem = document.querySelector('.temp')
const weatherElem = document.querySelector('.weather')
const hiLowElem = document.querySelector('.hi-low')
const cityNameElem = document.querySelector('.city')
const dateElem = document.querySelector('.date')
let date = new Date()

formElem.addEventListener('submit', e => {
    e.preventDefault()
    let inputValue = searchInputElem.value

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=9523af26c1cd256d33645f9228a57db8`)
        .then(response => {

            if (response.status == 404) {
                alert('please enter a true name')
            } else {
                return response.json()
            }

        })
        .then(finalData => {

            cityNameElem.textContent = ''
            cityNameElem.textContent = finalData.name + ', ' + finalData.sys.country

            weatherElem.textContent = ''
            weatherElem.textContent = finalData.weather[0].main

            dateElem.textContent = ''
            dateElem.textContent = days[date.getDay()] + ' ' + date.getDate() + ' ' + months[date.getMonth()] + ' ' + date.getFullYear()

            tempElem.textContent = ''
            tempElem.textContent = (finalData.main.temp - 273.15).toFixed(2) + '° C'

            hiLowElem.textContent = ''
            hiLowElem.textContent = (finalData.main.temp_min - 273.15).toFixed(2) + '° C / ' + (finalData.main.temp_max - 273.15).toFixed(2) + '° C'


        })
    searchInputElem.value = ''

})